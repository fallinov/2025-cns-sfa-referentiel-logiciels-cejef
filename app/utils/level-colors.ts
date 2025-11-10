/**
 * Fonctions utilitaires pour obtenir les couleurs CSS en fonction des niveaux
 * Niveaux: 1 = OK (vert), 2 = Attention (orange), 3 = Interdit (rouge)
 */

export type Level = 1 | 2 | 3 | null

/**
 * Retourne les classes CSS de couleur de texte selon le niveau
 */
export function getLevelTextColor(level: Level): string {
  if (!level) return ''
  const colors: Record<NonNullable<Level>, string> = {
    1: 'text-green-600 dark:text-green-400',
    2: 'text-orange-600 dark:text-orange-400',
    3: 'text-red-600 dark:text-red-400'
  }
  return colors[level]
}

/**
 * Retourne les classes CSS de couleur de fond selon le niveau
 */
export function getLevelBgColor(level: Level): string {
  if (!level) return ''
  const colors: Record<NonNullable<Level>, string> = {
    1: 'bg-green-50 dark:bg-green-950/30',
    2: 'bg-orange-50 dark:bg-orange-950/30',
    3: 'bg-red-50 dark:bg-red-950/30'
  }
  return colors[level]
}

/**
 * Retourne les classes CSS de couleur de bordure selon le niveau
 */
export function getLevelBorderColor(level: Level): string {
  if (!level) return ''
  const colors: Record<NonNullable<Level>, string> = {
    1: 'border-green-500',
    2: 'border-orange-500',
    3: 'border-red-500'
  }
  return colors[level]
}

/**
 * Retourne le nom de la couleur (pour les composants Nuxt UI) selon le niveau
 */
export function getLevelColorName(level: Level): 'success' | 'warning' | 'error' | undefined {
  if (!level) return undefined
  const colors: Record<NonNullable<Level>, 'success' | 'warning' | 'error'> = {
    1: 'success',
    2: 'warning',
    3: 'error'
  }
  return colors[level]
}

/**
 * Retourne le nom de la couleur Tailwind CSS selon le niveau
 */
export function getLevelTailwindColor(level: Level): 'green' | 'orange' | 'red' | undefined {
  if (!level) return undefined
  const colors: Record<NonNullable<Level>, 'green' | 'orange' | 'red'> = {
    1: 'green',
    2: 'orange',
    3: 'red'
  }
  return colors[level]
}

/**
 * Retourne l'icône appropriée selon le niveau
 */
export function getLevelIcon(level: Level): string {
  if (!level) return ''
  const icons: Record<NonNullable<Level>, string> = {
    1: 'i-lucide-circle-check',
    2: 'i-lucide-triangle-alert',
    3: 'i-lucide-circle-x'
  }
  return icons[level]
}

/**
 * Retourne le label textuel selon le niveau
 */
export function getLevelLabel(level: Level): string {
  if (!level) return ''
  const labels: Record<NonNullable<Level>, string> = {
    1: 'OK',
    2: 'Attention',
    3: 'Interdit'
  }
  return labels[level]
}
