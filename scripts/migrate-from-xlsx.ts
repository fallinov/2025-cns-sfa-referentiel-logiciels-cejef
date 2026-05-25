#!/usr/bin/env tsx
/**
 * Migration des logiciels depuis le fichier xlsx "Positionnement CEIJ - plateformes éducatives"
 * vers la collection Directus `software`.
 *
 * Usage:
 *   tsx scripts/migrate-from-xlsx.ts --dry-run         # Simulation sans écriture
 *   tsx scripts/migrate-from-xlsx.ts --limit=5         # Importer 5 logiciels
 *   tsx scripts/migrate-from-xlsx.ts                   # Tout importer (~104 logiciels)
 *
 * Stratégie de mapping :
 * - Toutes les fiches sont importées en `status: draft` (à valider manuellement)
 * - V/O/R → score LGPD identique pour les 3 axes (hosting, rgpd, data_collection)
 * - Si pas d'info ou hésitation → choix le plus mauvais (score 3, data_location: other)
 * - Notes = concaténation des colonnes "Données & politique", "Conditions", "Remarques", "M365"
 *
 * Prérequis : DIRECTUS_URL et DIRECTUS_TOKEN dans .env
 */

import { join } from "node:path"
import { config } from "dotenv"
import XLSX from "xlsx"

const { readFile, utils } = XLSX

config()

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error("ERREUR: DIRECTUS_URL et DIRECTUS_TOKEN requis dans .env")
  process.exit(1)
}

const DRY_RUN = process.argv.includes("--dry-run")
const LIMIT = (() => {
  const arg = process.argv.find(a => a.startsWith("--limit="))
  return arg ? Number.parseInt(arg.split("=")[1] ?? "0", 10) : null
})()

const XLSX_PATH = join(import.meta.dirname || __dirname, "..", "data", "positionnement-ceij.xlsx")
const SHEET_NAME = "liste en étude"

interface DirectusResponse<T> {
  data: T
}

async function directusRequest<T>(
  path: string,
  method: "GET" | "POST" = "GET",
  body?: unknown
): Promise<T> {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": DIRECTUS_TOKEN!.startsWith("Bearer ") ? DIRECTUS_TOKEN! : `Bearer ${DIRECTUS_TOKEN}`
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${method} ${path} → ${res.status}: ${text}`)
  }
  const json = (await res.json()) as DirectusResponse<T>
  return json.data
}

/**
 * V/O/R → score LGPD (1=OK, 2=Attention, 3=Interdit).
 * Si valeur inconnue/vide → score 3 (le pire) selon directive.
 */
function mapClassification(raw: unknown): 1 | 2 | 3 {
  if (raw === null || raw === undefined) return 3
  const v = String(raw).trim().toUpperCase()
  if (v === "V") return 1
  if (v.startsWith("O")) return 2 // "O", "O (sous conditions)"
  if (v === "R") return 3
  return 3 // "?" ou autre → le pire
}

/**
 * Localisation texte libre → une des 6 catégories data_location Directus.
 * Si pas d'info → "other" (le pire).
 */
function mapLocation(raw: unknown): string {
  if (raw === null || raw === undefined) return "other"
  const v = String(raw).toLowerCase()

  if (/(usa|états-unis|united states|america)/.test(v)) return "us_dpf"
  if (/(suisse|swiss|switzerland|zurich|bern|geneva|genève)/.test(v)) return "switzerland"
  if (/(france|allemagne|germany|pays-bas|netherlands|irlande|ireland|espagne|spain|italie|italy|belgique|belgium|portugal|autriche|austria|hongrie|hungary|sachsen|deutschland)/.test(v)) return "eu_eea"
  if (/(union européenne|union europ|\bue\b|\beu\b|eea|eee|europe)/.test(v)) return "eu_eea"
  if (/(royaume-uni|\buk\b|united kingdom|canada|japon|japan|corée|korea|israël|israel)/.test(v)) return "adequate"
  if (/(multi|global|worldwide)/.test(v)) return "multi_or_partial"

  return "other"
}

function buildNotes(...parts: Array<{ label: string, value: unknown }>): string | null {
  const filtered = parts.filter((p) => {
    if (p.value === null || p.value === undefined) return false
    const s = String(p.value).trim()
    return s.length > 0
  })
  if (filtered.length === 0) return null
  return filtered.map(p => `**${p.label}**\n${String(p.value).trim()}`).join("\n\n")
}

type XlsxRow = Array<string | number | null>

interface ImportResult {
  ok: boolean
  name: string
  error?: string
}

async function importRow(row: XlsxRow): Promise<ImportResult> {
  // Colonnes: [0]vide [1]Plateforme [2]Classif [3]Localisation
  //          [4]Données+politique [5]Conditions [6]Remarques
  //          [7]Changement statut [8]M365 [9]Date update
  const rawName = row[1]
  if (!rawName) return { ok: true, name: "(skip empty)" } // skip lignes vides
  const name = String(rawName).trim()

  const classif = row[2]
  const location = row[3]
  const dataPolicy = row[4]
  const conditions = row[5]
  const remarks = row[6]
  const m365 = row[8]

  const score = mapClassification(classif)
  const dataLoc = mapLocation(location)

  const notes = buildNotes(
    { label: "Données collectées & politique de confidentialité", value: dataPolicy },
    { label: "Conditions d'utilisation", value: conditions },
    { label: "Remarques", value: remarks },
    { label: "Statut M365", value: m365 },
    { label: "Classification d'origine (xlsx CEIJ)", value: classif },
    { label: "Localisation d'origine (xlsx CEIJ)", value: location }
  )

  const payload = {
    status: "draft",
    name,
    short_description: "À compléter — fiche importée depuis le fichier de positionnement CEIJ",
    description: null,
    lgpd_hosting: score,
    lgpd_rgpd: score,
    lgpd_data_collection: score,
    data_location: dataLoc,
    cost: null,
    funded_by_cejef: false,
    funded_by_sen: false,
    target_audience: null,
    tool_url: "https://placeholder.cejef.ch/a-completer",
    doc_url: null,
    notes,
    requires_parental_consent: false,
    requires_edu_account: false,
    requires_edulog: false,
    approved_by_sen: false,
    approved_by_sfp: false,
    contractual_safeguards: null
  }

  if (DRY_RUN) {
    console.log(`[DRY] ${name}`)
    console.log(`      classif: "${classif ?? "(vide)"}" → score ${score}`)
    console.log(`      location: "${String(location ?? "").slice(0, 50)}" → ${dataLoc}`)
    console.log(`      notes length: ${notes?.length ?? 0} chars`)
    return { ok: true, name }
  }

  try {
    await directusRequest("/items/software", "POST", payload)
    return { ok: true, name }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false, name, error: msg }
  }
}

async function main(): Promise<void> {
  console.log(`Lecture du fichier ${XLSX_PATH}`)
  const wb = readFile(XLSX_PATH)
  const ws = wb.Sheets[SHEET_NAME]
  if (!ws) {
    console.error(`Feuille "${SHEET_NAME}" introuvable. Feuilles disponibles: ${wb.SheetNames.join(", ")}`)
    process.exit(1)
  }
  const rows = utils.sheet_to_json<XlsxRow>(ws, { header: 1, defval: null })

  // Skip header row (row 0)
  const dataRows = rows.slice(1).filter(r => r[1]) // ne garde que les lignes avec un nom
  const toImport = LIMIT ? dataRows.slice(0, LIMIT) : dataRows

  // Idempotence : récupère les noms déjà présents pour skip
  const existingNames = DRY_RUN
    ? new Set<string>()
    : new Set((await directusRequest<Array<{ name: string }>>("/items/software?fields=name&limit=-1")).map(i => i.name))

  if (existingNames.size > 0) {
    console.log(`${existingNames.size} logiciels déjà présents dans Directus (seront skipés)`)
  }

  console.log(`${dataRows.length} logiciels détectés${LIMIT ? ` (limit: ${LIMIT})` : ""}`)
  console.log(`Vers: ${DIRECTUS_URL}`)
  if (DRY_RUN) console.log("(DRY RUN — aucune écriture)")
  console.log("")

  let success = 0
  let skipped = 0
  let failed = 0
  const errors: Array<{ name: string, error: string }> = []

  for (const row of toImport) {
    const rawName = row[1]
    if (rawName && existingNames.has(String(rawName).trim())) {
      skipped++
      console.log(`SKIP ${String(rawName).trim()} (déjà présent)`)
      continue
    }
    const result = await importRow(row)
    if (result.ok) {
      success++
      if (!DRY_RUN) console.log(`OK  ${result.name}`)
    } else {
      failed++
      errors.push({ name: result.name, error: result.error ?? "?" })
      console.error(`KO  ${result.name}: ${result.error}`)
    }
  }

  console.log("")
  console.log(`Résultat: ${success} OK / ${skipped} skip / ${failed} échec sur ${toImport.length} traités`)

  if (errors.length > 0) {
    console.log("\nErreurs:")
    errors.forEach(e => console.log(`  - ${e.name}: ${e.error}`))
    process.exit(1)
  }
}

main().catch((e) => {
  console.error("Erreur fatale:", e)
  process.exit(1)
})
