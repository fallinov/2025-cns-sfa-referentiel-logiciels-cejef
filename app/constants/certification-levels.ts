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
  badgeColor: "green" | "warning" | "error"
  icon: string
}

export const CERTIFICATION_LEVELS: readonly CertificationLevelConfig[] = [
  {
    value: 1,
    label: "Niveau 1 · Conforme",
    description: "Hébergement CEJEF/CH et collecte limitée",
    badgeLabel: "Faible risque",
    badgeColor: "green",
    icon: "i-lucide-shield-check"
  },
  {
    value: 2,
    label: "Niveau 2 · Vigilance",
    description: "Conformité partielle ou collecte modérée",
    badgeLabel: "Point d'attention",
    badgeColor: "warning",
    icon: "i-lucide-alert-triangle"
  },
  {
    value: 3,
    label: "Niveau 3 · À éviter",
    description: "Hébergement hors UE / collecte extensive",
    badgeLabel: "Risque élevé",
    badgeColor: "orange",
    icon: "i-lucide-shield-off"
  }
] as const
