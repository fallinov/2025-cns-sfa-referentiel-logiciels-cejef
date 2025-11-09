/**
 * Types pour le référentiel logiciels CEJEF
 */

export type HostingLocation = 'CH' | 'UE' | 'Hors-UE' | 'CEJEF' | 'Chine'
export type PersonalDataUsage = 'Autorisées' | 'Anonymisé' | 'Interdites'
export type RgpdCompliance = 'Conforme' | 'Partiel' | 'Non conforme'
export type DataCollection = 'Limitée' | 'Modérée' | 'Extensive'
export type Platform = 'web' | 'windows' | 'mac' | 'smartphone' | 'tablet'
export type CostType = 'Gratuit' | 'Freemium' | 'Payant'
export type TechnicalLevel = 'Débutant' | 'Intermédiaire' | 'Avancé'

/**
 * Classification LGPD (Loi sur la protection des données)
 * Approche iconographique (Option C)
 */
export interface LgpdClassification {
  /** Localisation de l'hébergement des données */
  hosting: HostingLocation
  /** Utilisation des données personnelles */
  personalData: PersonalDataUsage
  /** Conformité RGPD (Règlement Général sur la Protection des Données) */
  rgpd: RgpdCompliance
  /** Niveau de collecte de données */
  dataCollection: DataCollection
}

/**
 * Interface principale d'un logiciel pédagogique
 */
export interface Software {
  /** Identifiant unique */
  id: string
  /** Nom du logiciel */
  name: string
  /** Logo (emoji ou URL) - deprecated, utiliser icon */
  logo: string
  /** Icône SVG (format i-simple-icons-xxx ou i-lucide-xxx) */
  icon: string
  /** Description courte */
  shortDescription: string

  /** Classification LGPD (Option C - Iconographique) */
  lgpd: LgpdClassification

  /** Pris en charge par le CEJEF */
  supportedBy: 'CEJEF' | null
  /** Formation Campus disponible */
  campusTraining: boolean
  /** Plateformes supportées */
  platforms: Platform[]
  /** Type de coût */
  cost: CostType
  /** Prix (si payant) */
  price?: string
  /** Catégorie fonctionnelle */
  category: string
  /** Discipline(s) concernée(s) */
  disciplines: string[]
  /** Type d'activité pédagogique */
  activity: string
  /** Niveau technique requis */
  technicalLevel: TechnicalLevel
  /** Connexion obligatoire */
  accountRequired: boolean
  /** Langues de l'interface */
  languages: string[]
  /** Type de licence */
  licenseType: string
  /** URL vers l'outil */
  toolUrl: string

  /** Intégrations disponibles (optionnel) */
  integrations?: string[]
  /** Documentation (optionnel) */
  documentation?: string
}
