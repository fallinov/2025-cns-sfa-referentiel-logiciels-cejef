/**
 * Mapping des 36 anciennes valeurs `dataLocation` (software-list.ts statique)
 * vers les 6 nouvelles catégories Directus.
 *
 * Aligné sur educa.ch et CNIL.
 *
 * Niveau 1 (Vert) : switzerland, eu_eea, adequate
 * Niveau 2 (Orange) : us_dpf, multi_or_partial
 * Niveau 3 (Rouge) : other
 *
 * Choix discutables (à valider avec NHE / Tifany Koller) :
 * - "Hongrie" → eu_eea (techniquement UE, mais souvent à risque)
 * - "Israël" → adequate (décision UE officielle d'adéquation)
 * - "Local" → switzerland (logiciels installés sur les machines CEJEF)
 */
const MAPPING: Record<string, string> = {
  // Niveau 1 — Suisse
  "Suisse": "switzerland",
  "Suisse/Luxembourg": "switzerland",
  "Local": "switzerland",
  "CEJEF": "switzerland",

  // Niveau 1 — UE/EEE
  "France": "eu_eea",
  "France/Union Européenne": "eu_eea",
  "Allemagne": "eu_eea",
  "Union Européenne": "eu_eea",
  "Union Européenne (AWS)": "eu_eea",
  "Union Européenne (option)": "eu_eea",
  "Union Européenne (configurable)": "eu_eea",
  "Hongrie": "eu_eea",

  // Niveau 1 — Pays adéquats
  "Royaume-Uni": "adequate",
  "Canada": "adequate",
  "Corée du Sud": "adequate",
  "Israël": "adequate",

  // Niveau 2 — USA (DPF)
  "États-Unis": "us_dpf",
  "États-Unis (option UE)": "us_dpf",
  "États-Unis (option UE Enterprise)": "us_dpf",
  "États-Unis (option UE/CH)": "us_dpf",
  "États-Unis (centres UE disponibles)": "us_dpf",
  "États-Unis (UE Enterprise)": "us_dpf",
  "États-Unis (SCCs UE)": "us_dpf",

  // Niveau 2 — Multi-régions
  "Union Européenne/États-Unis": "multi_or_partial",
  "Union Européenne/Global": "multi_or_partial",
  "Royaume-Uni/États-Unis": "multi_or_partial",
  "Canada/États-Unis": "multi_or_partial",
  "Local/États-Unis": "multi_or_partial",
  "États-Unis/Australie": "multi_or_partial",
  "États-Unis/Global": "multi_or_partial",
  "Australie/États-Unis": "multi_or_partial",

  // Niveau 3 — Autres / non adéquat / inconnu
  "Chine": "other",
  "Canada/Chine": "other",
  "Ukraine": "other",
  "Hors UE": "other",
  "Inconnu": "other"
}

export function mapDataLocation(legacy: string): string {
  const mapped = MAPPING[legacy]
  if (!mapped) {
    console.warn(`Mapping introuvable pour "${legacy}" → fallback "other"`)
    return "other"
  }
  return mapped
}
