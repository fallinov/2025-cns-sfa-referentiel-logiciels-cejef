/**
 * Types pour le référentiel logiciels CEJEF (source unique)
 */

export type Platform = "web" | "windows" | "mac" | "smartphone" | "tablet"
export type CostType = "Gratuit" | "Freemium" | "Payant"

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
  id: string
  name: string
  logo: string | null
  icon?: string | null
  shortDescription: string

  lgpd: LgpdClassification
  personalData: boolean

  supportedByCEJEF: boolean
  campusTraining: boolean
  platforms: Platform[]
  cost: CostType
  price?: string
  category: string
  disciplines: string[]
  activity: string
  technicalLevel: 1 | 2 | 3
  accountRequired: boolean
  languages: string[]
  licenseType: string
  toolUrl: string

  integrations?: string[]
  documentation?: string

  // certificationLevel : null = pas évalué, 1 = ok, 2 = Attention, 3 = Interdit
  certificationLevel?: CertificationLevel
}
