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
}

export interface DirectusSchema {
  software: DirectusSoftware[]
  category: { id: string, name: string, description: string | null }[]
  pedagogical_activity: { id: string, name: string, description: string | null }[]
}

/**
 * Crée un client Directus authentifié pour le serveur Nuxt.
 * @throws Error si DIRECTUS_URL ou DIRECTUS_TOKEN ne sont pas configurés.
 */
export function useDirectusClient() {
  const config = useRuntimeConfig()
  if (!config.directusUrl) {
    throw createError({ statusCode: 500, message: "DIRECTUS_URL non configuré" })
  }
  if (!config.directusToken) {
    throw createError({ statusCode: 500, message: "DIRECTUS_TOKEN non configuré" })
  }
  return createDirectus<DirectusSchema>(config.directusUrl)
    .with(rest())
    .with(staticToken(config.directusToken))
}
