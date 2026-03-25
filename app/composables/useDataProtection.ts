import type { DataProtectionTheme, DataProtectionSection, DataProtectionItem } from "~~/types/data-protection"
import { dataProtectionThemes } from "~/data/data-protection-themes"
import { normalizeText, matchesSearch } from "~/utils/search"

function matchesItem(item: DataProtectionItem, searchTerms: string[]): boolean {
  const text = [item.title, item.description, ...item.resources.map(r => r.title), ...item.resources.map(r => r.source)].join(" ")
  return matchesSearch(text, searchTerms)
}

export function useDataProtection() {
  const searchQuery = ref("")

  const filteredThemes = computed(() => {
    return dataProtectionThemes
      .map((theme) => {
        if (!searchQuery.value.trim()) return theme

        const searchTerms = [normalizeText(searchQuery.value.trim())]

        // Si le thème matche → tout afficher
        if (matchesSearch([theme.title, theme.description].join(" "), searchTerms)) {
          return theme
        }

        // Filtrer sections → items
        const filteredSections = theme.sections
          .map((section): DataProtectionSection | null => {
            // Si la section matche → garder tous ses items
            if (matchesSearch(section.title, searchTerms)) return section

            // Filtrer les items individuellement
            const filteredItems = section.items.filter(item => matchesItem(item, searchTerms))
            if (filteredItems.length > 0) return { ...section, items: filteredItems }

            return null
          })
          .filter((s): s is DataProtectionSection => s !== null)

        if (filteredSections.length === 0) return null
        return { ...theme, sections: filteredSections }
      })
      .filter((t): t is DataProtectionTheme => t !== null)
  })

  const hasResults = computed(() => filteredThemes.value.length > 0)

  const totalSections = computed(() =>
    filteredThemes.value.reduce((sum, t) => sum + t.sections.length, 0)
  )

  return {
    searchQuery,
    filteredThemes,
    hasResults,
    totalSections
  }
}
