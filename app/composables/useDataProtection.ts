import type { DataProtectionTheme } from "~~/types/data-protection"
import { dataProtectionThemes } from "~/data/data-protection-themes"
import { normalizeText, matchesSearch } from "~/utils/search"

export function useDataProtection() {
  const audienceStore = useAudienceStore()
  const searchQuery = ref("")

  const filteredThemes = computed(() => {
    return dataProtectionThemes
      .map((theme) => {
        const filteredSubThemes = theme.subThemes.filter((sub) => {
          if (sub.audience !== "both"
            && sub.audience !== audienceStore.audience) {
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

        if (theme.audience !== "both"
          && theme.audience !== audienceStore.audience) {
          return null
        }

        return { ...theme, subThemes: filteredSubThemes }
      })
      .filter((t): t is DataProtectionTheme => t !== null)
  })

  const hasResults = computed(() => filteredThemes.value.length > 0)

  const totalSubThemes = computed(() =>
    filteredThemes.value.reduce((sum, t) => sum + t.subThemes.length, 0)
  )

  return {
    searchQuery,
    audienceFilter: computed(() => audienceStore.audience),
    hasChosenAudience: computed(() => audienceStore.hasChosen),
    setAudience: audienceStore.setAudience,
    resetAudience: audienceStore.reset,
    filteredThemes,
    hasResults,
    totalSubThemes
  }
}
