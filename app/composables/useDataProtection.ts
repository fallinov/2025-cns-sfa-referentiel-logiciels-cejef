import type { ThemeAudience, DataProtectionTheme } from "~~/types/data-protection"
import { dataProtectionThemes } from "~/data/data-protection-themes"
import { normalizeText, matchesSearch } from "~/utils/search"

const STORAGE_KEY = "referentiel-dp-audience"

export function useDataProtection() {
  const searchQuery = ref("")
  const audienceFilter = ref<ThemeAudience>("sen")
  const hasChosenAudience = ref(false)

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeAudience | null
    if (stored === "sen" || stored === "cejef") {
      audienceFilter.value = stored
      hasChosenAudience.value = true
    }
  })

  function setAudience(audience: ThemeAudience) {
    audienceFilter.value = audience
    hasChosenAudience.value = true
    localStorage.setItem(STORAGE_KEY, audience)
  }

  const filteredThemes = computed(() => {
    return dataProtectionThemes
      .map((theme) => {
        const filteredSubThemes = theme.subThemes.filter((sub) => {
          if (sub.audience !== "both"
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

        if (theme.audience !== "both"
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
    hasChosenAudience,
    setAudience,
    filteredThemes,
    hasResults
  }
}
