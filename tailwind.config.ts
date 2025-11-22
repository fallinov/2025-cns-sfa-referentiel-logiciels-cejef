import type { Config } from "tailwindcss"

/**
 * Configuration Tailwind CSS pour le Référentiel Logiciels CEJEF
 *
 * Architecture des couleurs Liquid Glass :
 *
 * 1. Couleurs Tailwind standard (utilisées directement) :
 *    - Rose : Palette complète rose (50-950) de Tailwind
 *    - Emerald : Palette complète emerald (50-950) de Tailwind
 *    - Amber : Palette complète amber (50-950) de Tailwind
 *
 * 2. Niveau Nuxt UI (app.config.ts) :
 *    - Mappe les couleurs Tailwind vers des noms sémantiques :
 *      • primary: "rose"    → Rose (#e11d48 - rose-600)
 *      • success: "emerald" → Emerald (#059669 - emerald-600)
 *      • warning: "amber"   → Amber (#d97706 - amber-600)
 *      • error: "red"       → Red standard Tailwind
 *
 * 3. Niveau Composants :
 *    - Utilisent les noms sémantiques (primary, success, warning)
 *    - Style Liquid Glass : glassmorphism, backdrop-blur, transparence
 *    - Exemple : <UButton color="primary" /> → utilise rose avec effet glass
 *
 * Palette Liquid Glass (basée sur les cartes de certification) :
 * - Rose (rose-600) : Couleur principale - Niveau 3 "Interdit"
 * - Emerald (emerald-600) : Indicateurs de conformité - Niveau 1 "Autorisé"
 * - Amber (amber-600) : Avertissements - Niveau 2 "Attention"
 *
 * @see app/assets/css/main.css - Police et animations
 * @see app/app.config.ts - Mapping des couleurs sémantiques Nuxt UI
 * @see https://tailwindcss.com/docs/customizing-colors
 * @see https://ui.nuxt.com/getting-started/theme/design-system
 */
export default {
  theme: {
    extend: {
      fontFamily: {
        // Police principale du CEJEF
        // Chargée automatiquement via @nuxt/fonts depuis Google Fonts
        sans: ["Public Sans", "sans-serif"]
      },
      // Animation pour l'effet "blob" dans les arrière-plans Aurora et Shapes
      animation: {
        blob: "blob 7s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)"
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          }
        }
      }
    }
  }
} satisfies Config
