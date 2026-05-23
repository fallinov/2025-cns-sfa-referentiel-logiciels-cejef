#!/usr/bin/env tsx
/**
 * Ajoute un slug Iconify (`icon`) à chaque logiciel du référentiel.
 *
 * Stratégie :
 * 1. Mapping explicite pour les marques connues (Microsoft, Adobe, Google…)
 * 2. Heuristique sur les marques détectées dans le nom (Microsoft X, Adobe Y → marque mère)
 * 3. Fallback générique `i-lucide-app-window` pour les inconnus
 *
 * Usage:
 *   tsx scripts/add-icons.ts --dry-run     # Affiche le mapping sans écrire
 *   tsx scripts/add-icons.ts               # Applique les mises à jour
 *   tsx scripts/add-icons.ts --force       # Écrase même les icônes existantes
 */

import { config } from "dotenv"

config()

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error("ERREUR: DIRECTUS_URL et DIRECTUS_TOKEN requis dans .env")
  process.exit(1)
}

const DRY_RUN = process.argv.includes("--dry-run")
const FORCE = process.argv.includes("--force")

interface Software {
  id: string
  name: string
  icon: string | null
}

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
 * Mappings explicites par nom normalisé (lowercase, sans parenthèses ni "app").
 * Le slug est sans le préfixe `i-` qui sera ajouté à la sortie.
 */
const EXPLICIT_ICONS: Record<string, string> = {
  // Adobe
  "adobe acrobat": "simple-icons-adobeacrobatreader",
  "adobe express": "simple-icons-adobe",
  "adobe creative cloud": "simple-icons-adobecreativecloud",
  // Microsoft
  "microsoft teams": "simple-icons-microsoftteams",
  "microsoft excel": "simple-icons-microsoftexcel",
  "microsoft word": "simple-icons-microsoftword",
  "microsoft powerpoint": "simple-icons-microsoftpowerpoint",
  "microsoft outlook": "simple-icons-microsoftoutlook",
  "microsoft onedrive": "simple-icons-microsoftonedrive",
  "microsoft 365": "simple-icons-microsoft365",
  "onedrive": "simple-icons-microsoftonedrive",
  "outlook": "simple-icons-microsoftoutlook",
  "skype": "simple-icons-skype",
  "office": "simple-icons-microsoft",
  // Google
  "google": "simple-icons-google",
  "google chrome": "simple-icons-googlechrome",
  "google docs": "simple-icons-googledocs",
  "google drive": "simple-icons-googledrive",
  "google translate": "simple-icons-googletranslate",
  "google meet": "simple-icons-googlemeet",
  "google classroom": "simple-icons-googleclassroom",
  "google forms": "simple-icons-googleforms",
  "google maps": "simple-icons-googlemaps",
  "google earth": "simple-icons-googleearth",
  "google scholar": "simple-icons-googlescholar",
  "youtube": "simple-icons-youtube",
  "youtube kids": "simple-icons-youtubekids",
  // Atlassian
  "atlassian": "simple-icons-atlassian",
  "atlassian (jira, confluence, trello)": "simple-icons-atlassian",
  "trello": "simple-icons-trello",
  "jira": "simple-icons-jira",
  "confluence": "simple-icons-confluence",
  // Design / créa
  "canva": "simple-icons-canva",
  "figma": "simple-icons-figma",
  "miro": "simple-icons-miro",
  "framer": "simple-icons-framer",
  // Vidéo / musique
  "spotify": "simple-icons-spotify",
  "vimeo": "simple-icons-vimeo",
  "soundtrap education": "simple-icons-soundtrap",
  "soundcloud": "simple-icons-soundcloud",
  "suno.ai": "lucide-music",
  // Communication
  "slack": "simple-icons-slack",
  "discord": "simple-icons-discord",
  "whatsapp": "simple-icons-whatsapp",
  "threema education": "simple-icons-threema",
  "telegram": "simple-icons-telegram",
  "zoom": "simple-icons-zoom",
  "signal": "simple-icons-signal",
  // Email / mozilla
  "thunderbird": "simple-icons-thunderbird",
  "firefox": "simple-icons-firefox",
  "mozilla": "simple-icons-mozilla",
  // Dev
  "github": "simple-icons-github",
  "gitlab": "simple-icons-gitlab",
  "notion": "simple-icons-notion",
  "obsidian": "simple-icons-obsidian",
  "evernote": "simple-icons-evernote",
  // PDF
  "soda pdf": "lucide-file-text",
  "remarkable integration onedrive": "lucide-tablet",
  // Quiz / éducation
  "kahoot": "lucide-gamepad-2",
  "quizlet": "lucide-graduation-cap",
  "quizizz": "lucide-graduation-cap",
  "wayground (anc. quizizz)": "lucide-graduation-cap",
  "wooclap": "lucide-vote",
  "wooflash": "lucide-zap",
  "wordwall": "lucide-grid-3x3",
  "plickers": "lucide-vote",
  "prezi": "lucide-presentation",
  "wakelet": "lucide-bookmark",
  // IA
  "chatgpt": "simple-icons-openai",
  "openai": "simple-icons-openai",
  "claude": "lucide-bot",
  "school ai": "lucide-bot",
  "deepl": "simple-icons-deepl",
  // Apple
  "apple": "simple-icons-apple",
  "icloud": "simple-icons-icloud",
  "imovie": "simple-icons-imovie",
  "garageband": "lucide-music",
  // Samsung
  "samsung email": "simple-icons-samsung",
  "samsung notes": "simple-icons-samsung",
  // Outils techniques
  "teamviewer": "simple-icons-teamviewer",
  "zapier et zapier outlook": "simple-icons-zapier",
  "trimble inc.": "lucide-ruler",
  // Apprentissage langues
  "babbel": "lucide-languages",
  "duolingo": "simple-icons-duolingo",
  // Spécifique Suisse/éducation
  "taptouche": "lucide-keyboard",
  "projet voltaire": "lucide-pen-line",
  "lumio": "lucide-presentation",
  "smart tech : lumio": "lucide-presentation",
  "bdnf (application)": "lucide-book-open",
  "scholarvox": "lucide-library",
  "vittascience": "lucide-flask-conical",
  "vokapi (app)": "lucide-languages",
  "vasco translator v4 (appareil)": "lucide-languages",
  "azendoo (app)": "lucide-layout-dashboard",
  "spark": "lucide-sparkles",
  // Traduction
  "deepl pro": "simple-icons-deepl",
  "deepl standard": "simple-icons-deepl",
  // Réseaux sociaux
  "linkedin": "simple-icons-linkedin",
  "pinterest": "simple-icons-pinterest",
  // Math / sciences
  "geogebra": "simple-icons-geogebra",
  "fizziq": "lucide-flask-conical",
  "flora incognita (app)": "lucide-leaf",
  "phyphox": "lucide-activity",
  // Lecture / PDF
  "foxit reader": "lucide-file-text",
  "pdf expert": "lucide-file-text",
  "claro speak plus ios et claro pdf pro ios": "lucide-file-audio",
  "edubase reader": "lucide-book-open",
  "glose": "lucide-book-open",
  "jstor": "lucide-library",
  "knowt": "lucide-notebook",
  "notebooklm": "lucide-notebook-pen",
  "bookili": "lucide-book",
  "book creator": "lucide-book-plus",
  // Calendrier / planification
  "calendly": "simple-icons-calendly",
  "doodle": "lucide-calendar-clock",
  "one calendar": "lucide-calendar",
  "calengoo": "lucide-calendar",
  "plandeclasse.ca": "lucide-users",
  // Image / vidéo
  "photopea": "lucide-image",
  "pixton": "lucide-image",
  "capcut": "lucide-film",
  // Storage / cloud
  "drive infomaniak": "simple-icons-infomaniak",
  "pcloud": "simple-icons-pcloud",
  // Communication / sondages
  "padlet": "lucide-sticky-note",
  "kialo edu": "lucide-messages-square",
  "mindmeister": "lucide-network",
  "mural": "lucide-network",
  // Code / dev
  "code.org": "lucide-code",
  "code combat": "lucide-code",
  "framasoft": "simple-icons-framasoft",
  "lockee.fr": "lucide-lock",
  // Jeux pédagogiques
  "gimkit": "lucide-gamepad-2",
  "classcraft": "lucide-swords",
  "minecraft : education edition": "simple-icons-minecraft",
  // Langues
  "lingodeer": "lucide-languages",
  "memrise": "lucide-languages",
  "lyricstraining": "lucide-languages",
  // Quiz / éducation
  "classtime": "lucide-clock",
  "classroomscreen": "lucide-monitor",
  "exam.net": "lucide-file-check",
  "edpuzzle": "lucide-puzzle",
  "educaplay": "lucide-gamepad",
  "learningapps": "lucide-graduation-cap",
  "learningview.org": "lucide-graduation-cap",
  "learnlab": "lucide-graduation-cap",
  "card2brain": "lucide-square-stack",
  // IA
  "magicschool.ai": "lucide-bot",
  "jungleai": "lucide-bot",
  // Écriture / orthographe
  "druide, antidote": "lucide-spell-check",
  "orthohphore": "lucide-spell-check",
  "dictaly": "lucide-mic",
  "phonowriter": "lucide-mic",
  "ecrivor": "lucide-pen-line",
  "dynamilis": "lucide-pen-tool",
  // Mail
  "bluemail": "lucide-mail",
  // Présentation
  "genially": "lucide-presentation",
  // Sport
  "garmin connect": "simple-icons-garmin"
}

/**
 * Marques détectées par mot-clé dans le nom — utilisé si pas de match explicite.
 */
const BRAND_KEYWORDS: Array<{ pattern: RegExp, icon: string }> = [
  { pattern: /\badobe\b/i, icon: "simple-icons-adobe" },
  { pattern: /\bmicrosoft\b/i, icon: "simple-icons-microsoft" },
  { pattern: /\bgoogle\b/i, icon: "simple-icons-google" },
  { pattern: /\bapple\b/i, icon: "simple-icons-apple" },
  { pattern: /\bsamsung\b/i, icon: "simple-icons-samsung" },
  { pattern: /\bopenai\b/i, icon: "simple-icons-openai" },
  { pattern: /\batlassian\b/i, icon: "simple-icons-atlassian" },
  { pattern: /\bcanva\b/i, icon: "simple-icons-canva" },
  { pattern: /\bfigma\b/i, icon: "simple-icons-figma" },
  { pattern: /\bnotion\b/i, icon: "simple-icons-notion" },
  { pattern: /\bslack\b/i, icon: "simple-icons-slack" },
  { pattern: /\bgithub\b/i, icon: "simple-icons-github" },
  { pattern: /\bzoom\b/i, icon: "simple-icons-zoom" },
  { pattern: /\bmozilla\b/i, icon: "simple-icons-mozilla" }
]

/**
 * Icône fallback générique pour un logiciel pédagogique sans marque reconnue.
 */
const FALLBACK_ICON = "lucide-app-window"

function normalize(name: string): string {
  return name.trim().toLowerCase()
}

function pickIcon(name: string): { icon: string, source: "explicit" | "brand" | "fallback" } {
  const norm = normalize(name)

  // 1. Mapping explicite
  if (EXPLICIT_ICONS[norm]) {
    return { icon: EXPLICIT_ICONS[norm], source: "explicit" }
  }

  // 2. Détection marque par mot-clé
  for (const { pattern, icon } of BRAND_KEYWORDS) {
    if (pattern.test(name)) {
      return { icon, source: "brand" }
    }
  }

  // 3. Fallback
  return { icon: FALLBACK_ICON, source: "fallback" }
}

async function main(): Promise<void> {
  const items = await directusRequest<Software[]>(
    "/items/software?fields=id,name,icon&limit=-1"
  )
  console.log(`${items.length} logiciels récupérés${DRY_RUN ? " (DRY RUN)" : ""}${FORCE ? " (FORCE)" : ""}`)
  console.log("")

  let updated = 0
  let skipped = 0
  let failed = 0
  const stats: Record<string, number> = { explicit: 0, brand: 0, fallback: 0 }

  for (const sw of items) {
    if (sw.icon && !FORCE) {
      skipped++
      continue
    }

    const { icon, source } = pickIcon(sw.name)
    stats[source]++
    const fullSlug = `i-${icon}`

    if (DRY_RUN) {
      console.log(`[DRY] ${sw.name.padEnd(45)} → ${fullSlug} (${source})`)
      continue
    }

    try {
      await directusRequest(`/items/software/${sw.id}`, "PATCH", { icon: fullSlug })
      console.log(`OK   ${sw.name.padEnd(45)} → ${fullSlug} (${source})`)
      updated++
    } catch (e) {
      failed++
      const msg = e instanceof Error ? e.message : String(e)
      console.error(`KO   ${sw.name}: ${msg}`)
    }
  }

  console.log("")
  console.log(`Stats sources : ${stats.explicit} explicit / ${stats.brand} brand / ${stats.fallback} fallback`)
  console.log(`Résultat : ${updated} update / ${skipped} skip / ${failed} échec sur ${items.length} logiciels`)
}

main().catch((e) => {
  console.error("Erreur fatale:", e)
  process.exit(1)
})
