#!/usr/bin/env tsx
/**
 * Migration software-list.ts → Directus
 *
 * Usage:
 *   tsx scripts/migrate-to-directus.ts --dry-run         # Simulation sans écriture
 *   tsx scripts/migrate-to-directus.ts --limit=5         # Importer 5 logiciels
 *   tsx scripts/migrate-to-directus.ts                   # Tout importer
 *
 * Prérequis: DIRECTUS_URL et DIRECTUS_TOKEN dans .env
 */

import { config } from "dotenv"
import { softwareList } from "../app/data/software-list"
import type { Software } from "../types/software"
import { mapDataLocation } from "./data-location-mapping"

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

interface DirectusResponse<T> {
  data: T
}

async function directusRequest<T>(
  path: string,
  method: "GET" | "POST" | "PATCH" = "GET",
  body?: unknown
): Promise<T> {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": DIRECTUS_TOKEN!.startsWith("Bearer ")
        ? DIRECTUS_TOKEN!
        : `Bearer ${DIRECTUS_TOKEN}`
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

const categoryCache = new Map<string, string>()
const activityCache = new Map<string, string>()

async function ensureTaxonomy(
  collection: "category" | "pedagogical_activity",
  cache: Map<string, string>,
  name: string
): Promise<string> {
  const cached = cache.get(name)
  if (cached) return cached

  const encoded = encodeURIComponent(name)
  const existing = await directusRequest<Array<{ id: string }>>(
    `/items/${collection}?filter[name][_eq]=${encoded}&limit=1`
  )
  if (existing.length > 0) {
    const id = existing[0]!.id
    cache.set(name, id)
    return id
  }

  if (DRY_RUN) {
    const fakeId = `dry-${name}`
    cache.set(name, fakeId)
    return fakeId
  }

  const created = await directusRequest<{ id: string }>(
    `/items/${collection}`,
    "POST",
    { name }
  )
  cache.set(name, created.id)
  return created.id
}

const ensureCategory = (name: string) => ensureTaxonomy("category", categoryCache, name)
const ensureActivity = (name: string) => ensureTaxonomy("pedagogical_activity", activityCache, name)

async function importSoftware(s: Software): Promise<void> {
  const categoryIds = await Promise.all((s.categories ?? []).map(ensureCategory))
  const activityIds = await Promise.all((s.pedagogicalActivities ?? []).map(ensureActivity))

  // Fusion notes : usageNotes + remarque deviennent un seul champ
  const notes = [s.usageNotes, s.remarque]
    .filter((v): v is string => Boolean(v))
    .join(" — ") || null

  // Cost legacy "Financé CEJEF" → cost="Payant" + funding=["cejef"]
  const legacyFundedByCejef = s.cost === "Financé CEJEF"
  const cost = legacyFundedByCejef ? "Payant" : s.cost

  const payload = {
    name: s.name,
    icon: s.icon ?? null,
    short_description: s.shortDescription,
    description: s.description ?? null,
    lgpd_hosting: s.lgpd.hosting,
    lgpd_rgpd: s.lgpd.rgpd,
    lgpd_data_collection: s.lgpd.dataCollection,
    data_location: mapDataLocation(s.dataLocation),
    cost,
    funding: legacyFundedByCejef ? ["cejef"] : null,
    target_audience: s.targetAudience ?? null,
    tool_url: s.toolUrl,
    doc_url: s.documentation ?? null,
    notes,
    requires_parental_consent: s.requiresParentalConsent ?? false,
    requires_edu_account: s.requiresEduAccount ?? false,
    requires_edulog: s.requiresEdulog ?? false,
    approved_by_sen: s.approvedBySEN ?? false,
    approved_by_sfp: false, // Pas dans le legacy
    status: "draft" as const, // Toutes les fiches importées sont en brouillon
    categories: categoryIds.map(id => ({ category_id: id })),
    pedagogical_activities: activityIds.map(id => ({ pedagogical_activity_id: id }))
  }

  if (DRY_RUN) {
    console.log(`[DRY] ${s.name}`)
    console.log(`      data_location: ${s.dataLocation} → ${payload.data_location}`)
    console.log(`      cost: ${s.cost} → ${payload.cost}${payload.funding ? " + funding=cejef" : ""}`)
    console.log(`      categories: ${(s.categories ?? []).join(", ") || "—"}`)
    return
  }

  await directusRequest("/items/software", "POST", payload)
  console.log(`OK ${s.name}`)
}

async function main(): Promise<void> {
  const items = LIMIT ? softwareList.slice(0, LIMIT) : softwareList
  console.log(`Migration de ${items.length} logiciels vers ${DIRECTUS_URL}`)
  if (DRY_RUN) console.log("(DRY RUN — aucune écriture)")
  console.log("")

  let success = 0
  let failed = 0
  const errors: Array<{ name: string, error: string }> = []

  for (const sw of items) {
    try {
      await importSoftware(sw)
      success++
    } catch (e) {
      failed++
      const msg = e instanceof Error ? e.message : String(e)
      errors.push({ name: sw.name, error: msg })
      console.error(`KO ${sw.name}: ${msg}`)
    }
  }

  console.log("")
  console.log(`Résultat: ${success} OK / ${failed} échec`)
  console.log(`Taxonomies créées: ${categoryCache.size} catégories, ${activityCache.size} activités`)

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
