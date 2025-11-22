import type { Config } from "tailwindcss"

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
 *      • primary: 'red'    → Rouge CEJEF (#d1232a)
 *      • success: 'green'  → Vert CEJEF (#659157)
 *      • error: 'orange'   → Orange CEJEF (#f4b886)
 *
 * 3. Niveau Composants :
 *    - Utilisent les noms sémantiques (primary, success, error)
 *    - Exemple : <UButton color="primary" /> → utilise le rouge CEJEF
 *
 * Couleurs CEJEF définies :
 * - Rouge (red) : Couleur principale CEJEF - #d1232a (nuance 500)
 * - Vert (green) : Indicateurs de conformité - #659157 (nuance 500)
 * - Orange (orange) : Avertissements et alertes - #f4b886 (nuance 500)
 *
 * @see app/assets/css/main.css - Définition des couleurs avec @theme static
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
