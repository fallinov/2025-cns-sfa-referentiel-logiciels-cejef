/**
 * Types pour le référentiel logiciels CEJEF
 */

export type Platform = 'web' | 'windows' | 'mac' | 'smartphone' | 'tablet'
export type CostType = 'Gratuit' | 'Freemium' | 'Payant'

/**
 * Classification LGPD (Loi sur la protection des données)
 * Valeurs numériques: 1 = OK, 2 = Danger, 3 = Interdit
 */
export interface LgpdClassification {
  /** Localisation de l'hébergement des données (1 = OK, 2 = Danger, 3 = Interdit) */
  hosting: 1 | 2 | 3
  /** Conformité RGPD (1 = OK, 2 = Danger, 3 = Interdit) */
  rgpd: 1 | 2 | 3
  /** Niveau de collecte de données (1 = OK, 2 = Danger, 3 = Interdit) */
  dataCollection: 1 | 2 | 3
}

/**
 * Interface principale d'un logiciel pédagogique
 */
export interface Software {
  /** Identifiant unique */
  id: string
  /** Nom du logiciel */
  name: string
  /** Logo SVG (nom du fichier) */
  logo: string
  /** Icône (Simple Icons) */
  icon?: string
  /** Description courte */
  shortDescription: string

  /** Classification LGPD (1 = OK, 2 = Danger, 3 = Interdit) */
  lgpd: LgpdClassification
  /** Utilisation de données personnelles */
  personalData: boolean

  /** Pris en charge par le CEJEF */
  supportedByCEJEF: boolean
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
  /** Niveau technique requis (1 = Débutant, 2 = Intermédiaire, 3 = Expert) */
  technicalLevel: 1 | 2 | 3
  /** Connexion obligatoire */
  accountRequired: boolean
  /** Langues de l'interface (codes ISO: fr, en, de, etc.) */
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
