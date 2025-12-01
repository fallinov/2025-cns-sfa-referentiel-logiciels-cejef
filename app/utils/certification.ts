export interface CertificationConfig {
  fill: string
  label: string
  icon: string
  bg: string
  solidBg: string
  ring: string
  text: string
}

export const CERTIFICATION_LEVELS: Record<number, CertificationConfig> = {
  1: {
    fill: "text-green-600 dark:text-green-600",
    label: "Validé",
    icon: "i-lucide-circle-check-big",
    bg: "bg-green-50/10 dark:bg-green-950/10",
    solidBg: "bg-green-600 dark:bg-green-600",
    ring: "ring-green-500/20",
    text: "text-green-600 dark:text-green-400"
  },
  2: {
    fill: "text-orange-600 dark:text-orange-600",
    label: "Restreint",
    icon: "i-lucide-triangle-alert",
    bg: "bg-orange-50/10 dark:bg-orange-950/10",
    solidBg: "bg-orange-600 dark:bg-orange-600",
    ring: "ring-orange-500/20",
    text: "text-orange-600 dark:text-orange-400"
  },
  3: {
    fill: "text-red-600 dark:text-red-600",
    label: "Interdit",
    icon: "i-lucide-circle-x",
    bg: "bg-red-50/10 dark:bg-red-950/10",
    solidBg: "bg-red-600 dark:bg-red-600",
    ring: "ring-red-500/20",
    text: "text-red-600 dark:text-red-400"
  }
}

export const DEFAULT_CERTIFICATION: CertificationConfig = {
  fill: "text-gray-500 dark:text-gray-400",
  label: "Inconnu",
  icon: "i-lucide-help-circle",
  bg: "bg-gray-50/10 dark:bg-gray-950/10",
  solidBg: "bg-gray-500 dark:bg-gray-600",
  ring: "ring-gray-200 dark:ring-gray-700",
  text: "text-gray-500 dark:text-gray-400"
}

export function getCertificationConfig(level: number | null | undefined): CertificationConfig {
  if (!level) return DEFAULT_CERTIFICATION
  return CERTIFICATION_LEVELS[level] || DEFAULT_CERTIFICATION
}

/**
 * Retourne les classes de couleur pour un niveau de certification
 * Utilisé pour les badges, fonds et textes dans les listes similaires
 * @param level - Niveau de certification (1, 2 ou 3)
 * @returns Objet avec bg, bgLight et text
 */
export function getCertificationColors(level: number | null | undefined): { bg: string, bgLight: string, text: string } {
  const config = getCertificationConfig(level)
  return {
    bg: config.solidBg,
    bgLight: config.bg,
    text: config.text
  }
}

/**
 * Retourne l'icône correspondant à un niveau de certification
 * Version simplifiée pour mini badges
 * @param level - Niveau de certification (1, 2 ou 3)
 * @returns Nom de l'icône Lucide
 */
export function getCertificationIcon(level: number | null | undefined): string {
  switch (level) {
    case 1:
      return "i-lucide-check"
    case 2:
      return "i-lucide-alert-triangle"
    case 3:
      return "i-lucide-x"
    default:
      return "i-lucide-help-circle"
  }
}
