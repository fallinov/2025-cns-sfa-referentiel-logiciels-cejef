import type { Software } from "~~/types/software"

/**
 * Slug Iconify utilisé en dernier recours quand un logiciel n'a ni icône
 * propre ni catégorie avec icône (cas marginal — la saisie Directus impose
 * normalement un slug, mais on garde un fallback pour ne jamais laisser
 * un trou visuel dans le catalogue).
 */
export const DEFAULT_SOFTWARE_ICON = "i-lucide-app-window"

/**
 * Cascade de fallback pour l'icône d'un logiciel :
 * 1. icône propre du logiciel (`software.icon`)
 * 2. icône de la première catégorie associée (sémantique « hérité »)
 * 3. icône générique `i-lucide-app-window`
 *
 * Retourne toujours un slug — les composants peuvent donc supprimer
 * leur `v-if="software.icon"` et passer le résultat directement à `<UIcon>`.
 */
export function getSoftwareIcon(
  software: Pick<Software, "icon" | "categories">
): string {
  if (software.icon) return software.icon
  const firstCategoryIcon = software.categories?.[0]?.icon
  if (firstCategoryIcon) return firstCategoryIcon
  return DEFAULT_SOFTWARE_ICON
}
