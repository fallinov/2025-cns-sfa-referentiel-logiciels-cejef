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
        "server/api/**/*.ts",
        "server/utils/**/*.ts",
        "types/**/*.ts"
      ],
      exclude: [
        "app/data/**",
        "**/node_modules/**",
        "**/*.d.ts",
        ".nuxt/**",
        ".output/**"
      ],
      // Seuils minimum : un peu en dessous des valeurs atteintes (74.7/58.9/77.4/76.8)
      // pour garder une marge sans casser la CI au moindre ajout. À augmenter quand
      // useTypewriter / useSoftwareNavigation / useSearchSuggestions seront mieux testés.
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 55,
        statements: 70
      }
    }
  }
})
