import type { ThemeAudience, DataProtectionTheme } from "~~/types/data-protection"
import { dataProtectionThemes } from "~/data/data-protection-themes"
import { normalizeText, matchesSearch } from "~/utils/search"

export function useDataProtection() {
  const searchQuery = ref("")
  const audienceFilter = ref<ThemeAudience | "all">("all")

  const filteredThemes = computed(() => {
    return dataProtectionThemes
      .map((theme) => {
        const filteredSubThemes = theme.subThemes.filter((sub) => {
          if (audienceFilter.value !== "all"
            && sub.audience !== "both"
            && sub.audience !== audienceFilter.value) {
            return false
          }

          if (!searchQuery.value.trim()) return true

          const searchTerms = [normalizeText(searchQuery.value.trim())]
          const searchableText = [
            sub.title,
            sub.description,
            ...sub.resources.map(r => r.title),
            ...sub.resources.map(r => r.source)
          ].join(" ")

          return matchesSearch(searchableText, searchTerms)
        })

        if (filteredSubThemes.length === 0) return null

        if (audienceFilter.value !== "all"
          && theme.audience !== "both"
          && theme.audience !== audienceFilter.value) {
          return null
        }

        return { ...theme, subThemes: filteredSubThemes }
      })
      .filter((t): t is DataProtectionTheme => t !== null)
  })

  const hasResults = computed(() => filteredThemes.value.length > 0)

  return {
    searchQuery,
    audienceFilter,
    filteredThemes,
    hasResults
  }
}
