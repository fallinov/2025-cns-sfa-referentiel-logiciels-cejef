/**
 * Client Directus configuré côté serveur Nuxt.
 *
 * Utilise le token statique (server-only) injecté via runtimeConfig.
 * Jamais exposé au client — toujours appelé depuis un endpoint /server/api/.
 */

import { createDirectus, rest, staticToken } from "@directus/sdk"

export interface DirectusSoftware {
  id: string
  status: "draft" | "pending" | "published" | "archived"
  name: string
  icon: string | null
  logo: string | null
  short_description: string
  description: string | null
  lgpd_hosting: 1 | 2 | 3
  lgpd_rgpd: 1 | 2 | 3
  lgpd_data_collection: 1 | 2 | 3
  data_location: string | null
  cost: string | null
  funding: string[] | null
  target_audience: "élèves" | "enseignants" | "tous" | null
  tool_url: string
  doc_url: string | null
  notes: string | null
  requires_parental_consent: boolean
  requires_edu_account: boolean
  requires_edulog: boolean
  approved_by_sen: boolean
  approved_by_sfp: boolean
  contractual_safeguards: string[] | null
  date_created: string | null
  date_updated: string | null
  categories?: Array<{ category_id: { id: string, name: string } | null }>
  pedagogical_activities?: Array<{ pedagogical_activity_id: { id: string, name: string } | null }>
  alternatives?: Array<{ alternative_id: { id: string } | null }>
}

export interface DirectusSchema {
  software: DirectusSoftware[]
  category: { id: string, name: string, description: string | null }[]
  pedagogical_activity: { id: string, name: string, description: string | null }[]
}

/**
 * Convertit la valeur technique Directus de `data_location` en label
 * lisible pour les visiteurs du référentiel.
 *
 * Aligné sur les `text` des choices Directus (radios du formulaire de saisie).
 */
export function mapDataLocationLabel(value: string | null): string {
  switch (value) {
    case "switzerland":
      return "Suisse"
    case "eu_eea":
      return "Union européenne / EEE"
    case "adequate":
      return "Pays adéquat (UK, Canada, Japon, Corée du Sud…)"
    case "us_dpf":
      return "États-Unis (avec certification DPF)"
    case "multi_or_partial":
      return "Hébergement multi-régions / réparti"
    case "other":
      return "Autre / non adéquat / inconnu"
    default:
      return "Non renseigné"
  }
}

/**
 * Crée un client Directus pour le serveur Nuxt.
 *
 * - DIRECTUS_URL est obligatoire.
 * - DIRECTUS_TOKEN est optionnel : si présent, on l'utilise (utile en dev
 *   pour lire les drafts ou écrire). Sinon, on appelle Directus en anonyme
 *   et on s'appuie sur les permissions publiques (lecture des `software`
 *   publiés + catégories + activités). C'est le mode utilisé par le build
 *   statique GitHub Pages.
 */
export function useDirectusClient() {
  const config = useRuntimeConfig()
  const url = config.directusUrl || "http://46.140.144.167:8055"
  const client = createDirectus<DirectusSchema>(url).with(rest())
  if (config.directusToken) {
    return client.with(staticToken(config.directusToken))
  }
  return client
}
