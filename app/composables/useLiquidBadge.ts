/**
 * Composable pour la configuration des badges avec effet Liquid Glass
 * Centralise la configuration réutilisable pour tous les badges de l'application
 * qui nécessitent l'effet liquid glass (fond semi-transparent avec backdrop-blur)
 *
 * Inspiré du glassmorphism moderne avec fond translucide, bordures subtiles,
 * et effet de flou d'arrière-plan pour créer un effet de verre liquide
 */
export const useLiquidBadge = () => {
  /**
   * Configuration UI pour UBadge avec effet Liquid Glass
   * Utilise la prop :ui de Nuxt UI pour surcharger complètement le style par défaut
   *
   * Structure UBadge de Nuxt UI :
   * - base: styles de base toujours appliqués (reset des couleurs par défaut)
   * - root: conteneur principal du badge
   * - label: texte du badge
   * - leadingIcon/trailingIcon: icônes avant/après le texte
   */
  const liquidBadgeUi = {
    // Reset complet des styles de base pour éviter les couleurs par défaut
    base: "inline-flex items-center",
    // Effet liquid glass sur le conteneur
    root: [
      // Fond translucide avec gradient subtil
      "bg-gradient-to-br from-white/25 to-white/10",
      "dark:from-white/20 dark:to-white/5",
      // Bordure légère pour définir les contours
      "border border-white/40 dark:border-white/20",
      // Effet de flou d'arrière-plan (glassmorphism)
      "backdrop-blur-md backdrop-saturate-150",
      // Ombres pour la profondeur
      "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
      "dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
      // Forme arrondie
      "rounded-full",
      // Espacement interne
      "px-4 py-2",
      // Transition douce au survol
      "transition-all duration-300",
      // Effet de survol
      "hover:bg-white/30 hover:border-white/50",
      "hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]"
    ].join(" "),
    // Style du texte
    label: "text-sm font-bold uppercase tracking-widest text-white drop-shadow-sm",
    // Style des icônes
    leadingIcon: "text-white",
    trailingIcon: "text-white"
  }

  return {
    liquidBadgeUi
  }
}
