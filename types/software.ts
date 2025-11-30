/**
 * Types pour le référentiel logiciels CEJEF (source unique)
 */

export type CostType = "Gratuit" | "Payant" | "Freemium" | "Financé CEJEF"

export type DataLocation = "Suisse" | "Union Européenne" | "Hors UE" | "CEJEF"

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

  // CLASSIFICATION & LOCALISATION
  lgpd: LgpdClassification
  certificationLevel?: CertificationLevel
  dataLocation: DataLocation

  // DONNÉES PERSONNELLES
  personalData: boolean

  // SUPPORT CEJEF
  supportedByCEJEF: boolean
  campusTraining: boolean

  // COÛT
  cost: CostType

  // LIENS
  toolUrl: string
  documentation?: string

  // USAGE
  targetAudience?: TargetAudience
  ageRestriction?: number
  usageNotes?: string

  // ALTERNATIVES VERTES (pour logiciels niveau 2 ou 3)
  greenAlternatives?: string[]

  // CLASSIFICATION PÉDAGOGIQUE
  categories?: string[]
  pedagogicalActivities?: string[]
  disciplines?: string[]

  // DATES
  createdAt?: number
  updatedAt?: number
}
