/**
 * Types pour le référentiel logiciels CEJEF (source unique)
 */

export type CostType = "Gratuit" | "Payant" | "Freemium" | "Financé CEJEF"

export type DataLocation =
  // Pays adéquats (niveau 1)
  | "Suisse"
  | "Suisse/Luxembourg"
  | "France"
  | "France/Union Européenne"
  | "Allemagne"
  | "Union Européenne"
  | "Union Européenne (AWS)"
  | "Union Européenne (option)"
  | "Union Européenne (configurable)"
  | "Union Européenne/États-Unis"
  | "Union Européenne/Global"
  | "Royaume-Uni"
  | "Royaume-Uni/États-Unis"
  | "Canada"
  | "Canada/États-Unis"
  | "Corée du Sud"
  | "Local"
  | "Local/États-Unis"
  | "CEJEF"
  // Pays avec DPF (niveau 2)
  | "États-Unis"
  | "États-Unis (option UE)"
  | "États-Unis (option UE Enterprise)"
  | "États-Unis (option UE/CH)"
  | "États-Unis (centres UE disponibles)"
  | "États-Unis (UE Enterprise)"
  | "États-Unis (SCCs UE)"
  | "États-Unis/Australie"
  | "États-Unis/Global"
  | "Australie/États-Unis"
  // Pays non adéquats (niveau 3)
  | "Chine"
  | "Canada/Chine"
  | "Hongrie"
  | "Israël"
  | "Ukraine"
  | "Hors UE"
  | "Inconnu"

export type TargetAudience = "élèves" | "enseignants" | "tous"

/**
 * Classification LGPD (Loi sur la protection des données)
 * Valeurs numériques: 1 = OK, 2 = Attention, 3 = Interdit
 */
export interface LgpdClassification {
  hosting: 1 | 2 | 3
  rgpd: 1 | 2 | 3
  dataCollection: 1 | 2 | 3
}

/**
 * Niveau de certification CEJEF :
 * null = pas évalué, 1 = OK, 2 = Attention, 3 = Interdit
 */
export type CertificationLevel = 1 | 2 | 3 | null

/**
 * Calcule le niveau de certification global à partir de la classification LGPD.
 * Retourne null si lgpd manquant.
 */
export function getCertificationLevel(lgpd?: LgpdClassification): CertificationLevel {
  if (!lgpd) return null
  const values = [lgpd.hosting, lgpd.rgpd, lgpd.dataCollection]
  const maxValue = Math.max(...values)
  return (maxValue as CertificationLevel)
}

/**
 * Interface principale d'un logiciel pédagogique
 */
export interface Software {
  // IDENTIFICATION
  id: string
  name: string
  logo: string | null
  icon?: string | null

  // DESCRIPTION
  shortDescription: string
  description?: string | null

  // CLASSIFICATION & LOCALISATION
  lgpd: LgpdClassification
  certificationLevel?: CertificationLevel
  dataLocation: DataLocation

  // DONNÉES PERSONNELLES
  personalData: boolean

  // SUPPORT CEJEF
  supportedByCEJEF: boolean
  cejefFavorite?: boolean
  campusTraining: boolean

  // COÛT
  cost: CostType

  // LIENS
  toolUrl: string
  documentation?: string | null

  // USAGE
  targetAudience?: TargetAudience | null
  ageRestriction?: number | null
  usageNotes?: string | null

  // ALTERNATIVES VERTES (pour logiciels niveau 2 ou 3)
  greenAlternatives?: string[]

  // CLASSIFICATION PÉDAGOGIQUE
  categories?: string[]
  pedagogicalActivities?: string[]
  disciplines?: string[]

  // DATES
  createdAt?: number
  updatedAt?: number

  // VALIDATION LGPD
  toValidate?: boolean
  remarque?: string
}
