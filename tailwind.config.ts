import type { Config } from "tailwindcss"
import scrollbarHide from "tailwind-scrollbar-hide"

/**
 * Configuration Tailwind CSS pour le Référentiel Logiciels CEJEF
 *
 * Ce fichier documente la configuration des couleurs personnalisées CEJEF
 * qui remplacent les couleurs par défaut de Tailwind CSS.
 *
 * IMPORTANT : Les couleurs sont définies dans app/assets/css/main.css
 * via @theme static pour surcharger les couleurs par défaut de Tailwind.
 *
 * Architecture des couleurs :
 *
 * 1. Niveau Tailwind (main.css avec @theme static) :
 *    - Définit les palettes complètes (50-950) pour red, green, orange
 *    - Utilise les couleurs de la charte graphique CEJEF
 *
 * 2. Niveau Nuxt UI (app.config.ts) :
 *    - Mappe les couleurs Tailwind vers des noms sémantiques :
 *      • primary: 'red'    → Rouge CEJEF (#9A211F)
 *      • success: 'green'  → Vert CEJEF (#1D7A3F)
 *      • warning: 'orange' → Orange CEJEF (#946017)
 *      • error: 'red'      → Rouge CEJEF (#9A211F)
 *      • info: 'blue'      → Bleu info (#2563EB)
 *
 * 3. Niveau Composants :
 *    - Utilisent les noms sémantiques (primary, success, warning, error, info)
 *    - Exemple : <UButton color="primary" /> → utilise le rouge CEJEF
 *
 * Couleurs CEJEF définies :
 * - Rouge (red-600) : Couleur d'accent principale - #9A211F (WCAG AAA)
 * - Vert (green-700) : Statut "Autorisé" - #1D7A3F (WCAG AA)
 * - Orange (orange-700) : Statut "Attention" - #946017 (WCAG AA)
 * - Bleu (blue-600) : Info - #2563EB (WCAG AA)
 *
 * @see app/assets/css/main.css - Définition des couleurs avec @theme static
 * @see app/app.config.ts - Mapping des couleurs sémantiques Nuxt UI
 * @see https://tailwindcss.com/docs/customizing-colors
 * @see https://ui.nuxt.com/getting-started/theme/design-system
 */
export default {
  plugins: [scrollbarHide],
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
      // Délais d'animation pour les effets blob décalés
      animationDelay: {
        2000: "2s",
        4000: "4s"
      },
      borderColor: {
        DEFAULT: "#E5E7EB"
      },
      borderWidth: {
        DEFAULT: "1px"
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
