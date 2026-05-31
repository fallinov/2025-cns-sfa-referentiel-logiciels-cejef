/**
 * Types pour le référentiel logiciels CEJEF (source unique)
 */

export type CostType = "Gratuit" | "Payant" | "Freemium"

export type ContractualSafeguard
  = | "dpa"
    | "eu_data_boundary"
    | "scc"
    | "dpf"
    | "independent_audit"
    | "guaranteed_hosting"

/**
 * Localisation d'hébergement — grille V1.4.1.
 *
 * Les 6 libellés sont alignés sur les valeurs `data_location` Directus
 * (switzerland / eu_eea / adequate / united_states / multi_or_partial /
 * other) traduites en français par `server/utils/directus.ts:mapDataLocationLabel`.
 * Un 7e libellé « Non renseigné » couvre le cas null / undefined.
 */
export type DataLocation
  = | "Suisse"
    | "Union européenne / EEE"
    | "Pays adéquat (UK, Canada, Japon, Corée du Sud…)"
    | "États-Unis"
    | "Hébergement multi-régions / réparti"
    | "Autre / non adéquat / inconnu"
    | "Non renseigné"

export type TargetAudience = "élèves" | "enseignants" | "enseignants et élèves"

/**
 * Référence d'une catégorie pédagogique (nom + icône Lucide optionnelle).
 * Provient de la collection Directus `category`.
 */
export interface CategoryRef {
  name: string
  icon: string | null
}

/**
 * Référence d'une activité pédagogique (nom + icône Lucide optionnelle).
 * Provient de la collection Directus `pedagogical_activity`.
 */
export interface PedagogicalActivityRef {
  name: string
  icon: string | null
}

/**
 * Classification LPD (Loi sur la protection des données)
 * Valeurs numériques: 0 = Non évaluée, 1 = Validé, 2 = Vigilance, 3 = Interdit
 */
export interface LgpdClassification {
  hosting: 0 | 1 | 2 | 3
  rgpd: 0 | 1 | 2 | 3
  dataCollection: 0 | 1 | 2 | 3
}

/**
 * Niveau de certification CEJEF :
 * null = pas de classification du tout, 0 = au moins un axe Non évalué (prudence),
 * 1 = Validé, 2 = Vigilance, 3 = Interdit
 */
export type CertificationLevel = 0 | 1 | 2 | 3 | null

/**
 * Calcule le niveau de certification global à partir de la classification LPD.
 * Règle conservatrice : si au moins un axe est Non évalué (0), le niveau global
 * est 0 (Non évaluée) — on ne donne pas une fausse sécurité en ignorant un
 * axe manquant. Sinon, max des 3 axes.
 */
export function getCertificationLevel(lgpd?: LgpdClassification): CertificationLevel {
  if (!lgpd) return null
  const values = [lgpd.hosting, lgpd.rgpd, lgpd.dataCollection]
  if (values.some(v => v === 0)) return 0
  return (Math.max(...values) as CertificationLevel)
}

/**
 * Interface principale d'un logiciel pédagogique — schéma V1 aligné sur Directus
 * (voir collection `software` du référentiel CEJEF).
 */
export interface Software {
  // IDENTIFICATION
  id: string
  name: string
  icon?: string | null

  // DESCRIPTION
  shortDescription: string
  description?: string | null

  // CLASSIFICATION & LOCALISATION
  lgpd: LgpdClassification
  certificationLevel?: CertificationLevel
  dataLocation: DataLocation

  // CONDITIONS / APPROBATIONS
  requiresEduAccount?: boolean
  requiresEdulog?: boolean
  approvedBySEN?: boolean
  approvedBySFP?: boolean

  // COÛT & PRISE EN CHARGE
  cost: CostType
  fundedBySFP?: boolean
  fundedBySEN?: boolean

  // GARANTIES CONTRACTUELLES (V1.4 — justifient un score 🟢 malgré l'origine)
  contractualSafeguards?: ContractualSafeguard[]

  // LIENS
  toolUrl: string
  documentation?: string | null

  // USAGE
  targetAudience?: TargetAudience | null
  requiresParentalConsent?: boolean
  usageNotes?: string | null

  // CLASSIFICATION PÉDAGOGIQUE
  categories?: CategoryRef[]
  pedagogicalActivities?: PedagogicalActivityRef[]

  // ALTERNATIVES RECOMMANDÉES
  // Liste d'UUIDs de logiciels proposés comme alternatives (niveau 1 ou 2).
  // Saisie manuelle dans Directus (junction software_alternative), relation
  // unidirectionnelle. Vide si rien n'a été validé pour ce logiciel.
  alternatives?: string[]

  // DATES
  createdAt?: number
  updatedAt?: number
}
