/**
 * Niveaux de certification LGPD
 * Configuration des niveaux de risque pour la classification des logiciels
 */

import type { CertificationLevel } from "~~/types/software"

export interface CertificationLevelConfig {
  value: CertificationLevel
  label: string
  description: string
  badgeLabel: string
  badgeColor: "success" | "warning" | "error"
  icon: string
}

export const CERTIFICATION_LEVELS: readonly CertificationLevelConfig[] = [
  {
    value: 1,
    label: "Utilisable avec vos élèves",
    description: "Les élèves peuvent créer un compte et utiliser l'outil avec leurs vraies données.",
    badgeLabel: "Utilisable avec vos élèves",
    badgeColor: "success",
    icon: "i-lucide-check"
  },
  {
    value: 2,
    label: "Réservé aux enseignants",
    description: "Pas de données d'élèves. Les élèves peuvent l'utiliser avec un compte anonyme (adresse e-mail alias).",
    badgeLabel: "Réservé aux enseignants",
    badgeColor: "warning",
    icon: "i-lucide-alert-triangle"
  },
  {
    value: 3,
    label: "Interdit",
    description: "Ne respecte pas les exigences de protection des données. Usage interdit.",
    badgeLabel: "Interdit",
    badgeColor: "error",
    icon: "i-lucide-x"
  }
] as const
