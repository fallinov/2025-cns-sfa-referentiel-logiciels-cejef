/**
 * Client Directus configuré côté serveur Nuxt.
 *
 * Utilise le token statique (server-only) injecté via runtimeConfig.
 * Jamais exposé au client — toujours appelé depuis un endpoint /server/api/.
 */

import { createDirectus, rest, staticToken } from "@directus/sdk"
import type { Software } from "~~/types/software"

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
 * Liste des champs Directus à demander pour pouvoir mapper proprement.
 * Centralisé pour cohérence entre les endpoints index et [id].
 */
export const SOFTWARE_FIELDS = [
  "*",
  "categories.category_id.id",
  "categories.category_id.name",
  "pedagogical_activities.pedagogical_activity_id.id",
  "pedagogical_activities.pedagogical_activity_id.name",
  "alternatives.alternative_id.id"
] as const

/**
 * Mappe un logiciel Directus (snake_case + lgpd plat) vers le format
 * `Software` attendu par le frontend (camelCase + lgpd imbriqué +
 * certificationLevel calculé).
 *
 * Fonction pure — facile à tester unitairement sans monter Nuxt.
 */
export function mapSoftware(item: DirectusSoftware): Software {
  const certificationLevel = Math.max(
    item.lgpd_hosting,
    item.lgpd_rgpd,
    item.lgpd_data_collection
  ) as 1 | 2 | 3

  const categoryNames = (item.categories ?? [])
    .map(c => c.category_id?.name)
    .filter((n): n is string => Boolean(n))

  const activityNames = (item.pedagogical_activities ?? [])
    .map(a => a.pedagogical_activity_id?.name)
    .filter((n): n is string => Boolean(n))

  const alternativeIds = (item.alternatives ?? [])
    .map(a => a.alternative_id?.id)
    .filter((id): id is string => Boolean(id))

  return {
    id: item.id,
    name: item.name,
    logo: item.logo,
    icon: item.icon,
    shortDescription: item.short_description,
    description: item.description,
    lgpd: {
      hosting: item.lgpd_hosting,
      rgpd: item.lgpd_rgpd,
      dataCollection: item.lgpd_data_collection
    },
    certificationLevel,
    dataLocation: mapDataLocationLabel(item.data_location) as Software["dataLocation"],
    requiresEduAccount: item.requires_edu_account,
    requiresEdulog: item.requires_edulog,
    approvedBySEN: item.approved_by_sen,
    approvedBySFP: item.approved_by_sfp,
    cost: (item.cost ?? "Gratuit") as Software["cost"],
    toolUrl: item.tool_url,
    documentation: item.doc_url,
    targetAudience: item.target_audience,
    requiresParentalConsent: item.requires_parental_consent,
    usageNotes: item.notes,
    categories: categoryNames,
    pedagogicalActivities: activityNames,
    alternatives: alternativeIds,
    createdAt: item.date_created ? new Date(item.date_created).getTime() : undefined,
    updatedAt: item.date_updated ? new Date(item.date_updated).getTime() : undefined
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
