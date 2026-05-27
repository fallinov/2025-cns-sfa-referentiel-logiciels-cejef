/**
 * Client Directus configuré côté serveur Nuxt.
 *
 * Utilise le token statique (server-only) injecté via runtimeConfig.
 * Jamais exposé au client — toujours appelé depuis un endpoint /server/api/.
 */

import { createDirectus, rest, staticToken } from "@directus/sdk"
import type {
  CategoryRef,
  ContractualSafeguard,
  PedagogicalActivityRef,
  Software
} from "~~/types/software"

type LgpdValue = 0 | 1 | 2 | 3

const CONTRACTUAL_SAFEGUARD_VALUES: readonly ContractualSafeguard[] = [
  "dpa",
  "eu_data_boundary",
  "scc",
  "dpf",
  "independent_audit",
  "guaranteed_hosting"
] as const

export interface DirectusSoftware {
  id: string
  status: "draft" | "pending" | "published" | "archived"
  name: string
  icon: string | null
  short_description: string
  description: string | null
  lgpd_hosting: LgpdValue | null
  lgpd_rgpd: LgpdValue | null
  lgpd_data_collection: LgpdValue | null
  data_location: string | null
  cost: string | null
  funded_by_cejef: boolean | null
  funded_by_sen: boolean | null
  target_audience: "élèves" | "enseignants" | "enseignants et élèves" | null
  tool_url: string
  doc_url: string | null
  notes: string | null
  requires_parental_consent: boolean
  requires_edu_account: boolean
  requires_edulog: boolean
  approved_by_sen: boolean
  approved_by_cejef: boolean
  contractual_safeguards: string[] | null
  date_created: string | null
  date_updated: string | null
  categories?: Array<{ category_id: { id: string, name: string, icon: string | null } | null }>
  pedagogical_activities?: Array<{ pedagogical_activity_id: { id: string, name: string, icon: string | null } | null }>
  alternatives?: Array<{ alternative_id: { id: string } | null }>
}

export interface DirectusSchema {
  software: DirectusSoftware[]
  category: { id: string, name: string, description: string | null, icon: string | null }[]
  pedagogical_activity: { id: string, name: string, description: string | null, icon: string | null }[]
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
    case "united_states":
      return "États-Unis"
    case "us_dpf":
      // V1.4: deprecated, kept for backward compatibility (migrated to united_states)
      return "États-Unis"
    case "us_no_dpf":
      // V1.4: deprecated, kept for backward compatibility (migrated to united_states)
      return "États-Unis"
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
  "categories.category_id.icon",
  "pedagogical_activities.pedagogical_activity_id.id",
  "pedagogical_activities.pedagogical_activity_id.name",
  "pedagogical_activities.pedagogical_activity_id.icon",
  "alternatives.alternative_id.id"
] as const

/**
 * Mappe un logiciel Directus (snake_case + lgpd plat) vers le format
 * `Software` attendu par le frontend (camelCase + lgpd imbriqué +
 * certificationLevel calculé).
 *
 * Fonction pure — facile à tester unitairement sans monter Nuxt.
 */
/**
 * Normalise un score LGPD : null Directus → 0 (Non évaluée).
 * Évite d'avoir à gérer null partout côté frontend.
 */
function normalizeLgpd(value: LgpdValue | null): LgpdValue {
  return value ?? 0
}

export function mapSoftware(item: DirectusSoftware): Software {
  const hosting = normalizeLgpd(item.lgpd_hosting)
  const rgpd = normalizeLgpd(item.lgpd_rgpd)
  const dataCollection = normalizeLgpd(item.lgpd_data_collection)

  // Règle conservatrice : si au moins un axe est Non évalué (0),
  // le niveau global est 0. Sinon, max des 3 axes.
  const values = [hosting, rgpd, dataCollection]
  const certificationLevel = values.some(v => v === 0)
    ? 0
    : (Math.max(...values) as 1 | 2 | 3)

  const categories: CategoryRef[] = (item.categories ?? [])
    .map(c => c.category_id)
    .filter((c): c is { id: string, name: string, icon: string | null } => Boolean(c))
    .map(c => ({ name: c.name, icon: c.icon }))

  const activities: PedagogicalActivityRef[] = (item.pedagogical_activities ?? [])
    .map(a => a.pedagogical_activity_id)
    .filter((a): a is { id: string, name: string, icon: string | null } => Boolean(a))
    .map(a => ({ name: a.name, icon: a.icon }))

  const alternativeIds = (item.alternatives ?? [])
    .map(a => a.alternative_id?.id)
    .filter((id): id is string => Boolean(id))

  const contractualSafeguards = (item.contractual_safeguards ?? [])
    .filter((v): v is ContractualSafeguard => CONTRACTUAL_SAFEGUARD_VALUES.includes(v as ContractualSafeguard))

  return {
    id: item.id,
    name: item.name,
    icon: item.icon,
    shortDescription: item.short_description,
    description: item.description,
    lgpd: { hosting, rgpd, dataCollection },
    certificationLevel,
    dataLocation: mapDataLocationLabel(item.data_location) as Software["dataLocation"],
    requiresEduAccount: item.requires_edu_account,
    requiresEdulog: item.requires_edulog,
    approvedBySEN: item.approved_by_sen,
    approvedByCEJEF: item.approved_by_cejef,
    cost: (item.cost ?? "Gratuit") as Software["cost"],
    fundedByCejef: item.funded_by_cejef ?? false,
    fundedBySEN: item.funded_by_sen ?? false,
    contractualSafeguards,
    toolUrl: item.tool_url,
    documentation: item.doc_url,
    targetAudience: item.target_audience,
    requiresParentalConsent: item.requires_parental_consent,
    usageNotes: item.notes,
    categories,
    pedagogicalActivities: activities,
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
