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
      ]
    }
  }
})
