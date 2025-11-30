<script setup lang="ts">
/**
 * Badge personnalisé avec effet Liquid Glass (glassmorphism)
 * Alternative à UBadge pour un contrôle total sur le style
 *
 * Style inspiré du design Google AI Studio avec:
 * - Fond translucide blanc (bg-white/30)
 * - Bordure semi-transparente (border-white/40)
 * - Padding confortable pour texte 16px minimum
 * - Effet backdrop-blur pour glassmorphism
 *
 * Comportement des couleurs:
 * - Par défaut: texte et icônes foncés (slate-900) sur fond clair
 * - Avec forceWhite: texte et icônes toujours blanc
 * - Sur fond coloré (cards avec group-hover): devient blanc au survol
 */

interface Props {
  /** Taille du badge */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  /** Force le texte blanc (utile pour badges d'entête sur fond coloré) */
  forceWhite?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  forceWhite: false
})

// Tailles avec padding réduit et tailles de texte >= 16px
const sizeClasses = {
  xs: "px-2 py-0.5 text-xs gap-1", // Très petit
  sm: "px-2.5 py-1 text-sm gap-1.5", // Plus petit mais toujours lisible
  md: "px-3 py-1.5 text-base gap-2", // Taille par défaut - 16px avec padding réduit
  lg: "px-4 py-2 text-lg gap-2.5", // Plus grand
  xl: "px-5 py-2.5 text-xl gap-3" // Extra large
}
</script>

<template>
  <span
    :class="[
      // Structure de base
      'inline-flex items-center',
      // Effet liquid glass - fond translucide uni (pas de gradient)
      'bg-white/30 dark:bg-white/10',
      // Bordure semi-transparente
      'border border-white/40 dark:border-white/20',
      // Effet glassmorphism - backdrop blur essentiel
      'backdrop-blur-md',
      // Ombre douce pour la profondeur
      'shadow-sm',
      // Forme arrondie (pill shape)
      'rounded-full',
      // Transition douce
      'transition-all',
      // Effet de survol - plus de transparence et bordure plus visible
      'hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20',
      // Taille avec gap intégré
      sizeClasses[props.size],
      // Texte - toujours bold, uppercase, tracking large
      'font-bold uppercase tracking-widest',
      // Couleur du texte: blanc si forceWhite, foncé par défaut, blanc au survol de la carte
      forceWhite ? 'text-white' : 'text-slate-900 dark:text-slate-100 group-hover:text-white',
      // Transition des couleurs
      'transition-colors duration-300'
    ]"
  >
    <!-- Icône ou contenu avant le texte -->
    <span
      v-if="$slots.leading"
      :class="[
        'flex-shrink-0 flex items-center transition-colors duration-300',
        forceWhite ? 'text-white' : 'text-slate-900 dark:text-slate-100 group-hover:text-white'
      ]"
    >
      <slot name="leading"></slot>
    </span>

    <!-- Texte principal -->
    <span class="flex-shrink-0 flex items-center">
      <slot></slot>
    </span>

    <!-- Icône ou contenu après le texte -->
    <span
      v-if="$slots.trailing"
      :class="[
        'flex-shrink-0 flex items-center transition-colors duration-300',
        forceWhite ? 'text-white' : 'text-slate-900 dark:text-slate-100 group-hover:text-white'
      ]"
    >
      <slot name="trailing"></slot>
    </span>
  </span>
</template>
