// nuxt.config.ts
// Fichier de configuration principal de Nuxt
// https://nuxt.com/docs/api/nuxt-config

export default defineNuxtConfig({
  // ========================================
  // MODULES NUXT
  // ========================================
  // Modules = extensions qui ajoutent des fonctionnalités à Nuxt
  modules: [
    // Vérification de la qualité du code (linting)
    "@nuxt/eslint",
    // Bibliothèque de composants UI pré-stylés
    "@nuxt/ui",
    // Optimisation et chargement automatique des polices web
    "@nuxt/fonts",
    // Gestion de l'état global
    "@pinia/nuxt"
  ],

  // ========================================
  // OUTILS DE DÉVELOPPEMENT
  // ========================================
  devtools: {
    enabled: true // Active les DevTools Nuxt pour le débogage
  },

  // ========================================
  // CONFIGURATION DE L'APPLICATION
  // ========================================
  app: {
    // baseURL : Chemin de base de l'application
    // Important pour GitHub Pages qui héberge dans un sous-dossier
    // Exemple :
    //   - En local : '/' (racine)
    //   - GitHub Pages : '/mon-projet-nuxt/' (sous-dossier)
    //   - Production : '/' (racine du domaine)
    baseURL: process.env.NUXT_APP_BASE_URL || "/",

    // Configuration du <head> HTML (balises meta, favicon, etc.)
    head: {
      title: "Référentiel Logiciels CEJEF",
      meta: [
        {
          name: "description",
          content:
            "Référentiel de logiciels pédagogiques pour le CEJEF avec classification LGPD"
        },
        { name: "author", content: "CEJEF" },
        { name: "apple-mobile-web-app-title", content: "EduJura" }
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    }
  },

  // ========================================
  // STYLES CSS GLOBAUX
  // ========================================
  // Fichiers CSS appliqués à toutes les pages
  css: ["~/assets/css/main.css"],

  // ========================================
  // COMPATIBILITÉ
  // ========================================
  // Date de référence pour les comportements de Nuxt
  // Garantit la compatibilité avec les versions futures
  compatibilityDate: "2025-01-15",

  // ========================================
  // CONFIGURATION ESLINT
  // ========================================
  // Règles de style de code pour la cohérence du projet
  eslint: {
    config: {
      stylistic: {
        commaDangle: "never", // Pas de virgule finale (ex: [1, 2, 3] ✅ pas [1, 2, 3,] ❌)
        braceStyle: "1tbs" // Style d'accolades "One True Brace Style"
      }
    }
  },

  // ========================================
  // CONFIGURATION DES POLICES WEB
  // ========================================
  // @nuxt/fonts gère automatiquement le chargement des polices depuis Google Fonts
  // avec optimisation (preconnect, preload, font-display)
  fonts: {
    families: [
      {
        name: "Inter", // Police principale CEJEF
        provider: "google" // Chargée depuis Google Fonts
      }
    ]
  }
})
