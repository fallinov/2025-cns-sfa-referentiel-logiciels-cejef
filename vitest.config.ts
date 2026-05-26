import { defineVitestConfig } from "@nuxt/test-utils/config"

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    include: ["tests/unit/**/*.test.ts"],
    environmentOptions: {
      nuxt: {
        domEnvironment: "happy-dom"
      }
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: [
        "app/composables/**/*.ts",
        "app/stores/**/*.ts",
        "app/utils/**/*.ts",
        "server/utils/**/*.ts",
        "types/**/*.ts"
      ],
      exclude: [
        "app/data/**",
        "**/node_modules/**",
        "**/*.d.ts",
        ".nuxt/**",
        ".output/**",
        // Endpoints Nuxt server : thin wrappers autour de Directus. La logique
        // metier (mapping, parsing) vit dans server/utils/directus.ts qui est
        // teste (84%). Tester les handlers eux-memes demanderait un mock complet
        // de l'environnement Nuxt server, sans gain.
        "server/api/**"
      ],
      // Seuils minimum : un peu en dessous des valeurs atteintes (74.6/67.1/68.7/77.1)
      // pour garder une marge sans casser la CI au moindre ajout. À augmenter quand
      // useTypewriter / useSoftwareNavigation / useSearchSuggestions seront mieux testés.
      thresholds: {
        lines: 70,
        functions: 65,
        branches: 55,
        statements: 70
      }
    }
  }
})
