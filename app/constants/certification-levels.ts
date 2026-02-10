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
    label: "Validé",
    description: "Usage autorisé sans restriction particulière",
    badgeLabel: "Validé",
    badgeColor: "success",
    icon: "i-lucide-check"
  },
  {
    value: 2,
    label: "Restreint",
    description: "Usage sous conditions (données sensibles à éviter)",
    badgeLabel: "Restreint",
    badgeColor: "warning",
    icon: "i-lucide-alert-triangle"
  },
  {
    value: 3,
    label: "Interdit",
    description: "Usage non autorisé pour les données personnelles",
    badgeLabel: "Interdit",
    badgeColor: "error",
    icon: "i-lucide-x"
  }
] as const
