import type { DataProtectionTheme, DataProtectionSection, DataProtectionItem } from "~~/types/data-protection"
import { normalizeText, matchesSearch } from "~/utils/search"

function matchesItem(item: DataProtectionItem, searchTerms: string[]): boolean {
  const text = [item.title, item.description, ...item.resources.map(r => r.title), ...item.resources.map(r => r.source)].join(" ")
  return matchesSearch(text, searchTerms)
}

/**
 * Vrai si l'élément n'a pas d'audience renseignée (visible pour tous),
 * ou si l'audience courante est dans la liste de l'élément.
 *
 * Sans audience courante (l'utilisateur n'a pas encore choisi), on affiche tout.
 */
function matchesAudience(elementAudience: string[] | undefined, currentAudience: string | null): boolean {
  if (!currentAudience) return true
  if (!elementAudience || elementAudience.length === 0) return true
  return elementAudience.includes(currentAudience)
}

export function useDataProtection() {
  const audienceStore = useAudienceStore()
  const searchQuery = ref("")

  const currentAudience = computed<string | null>(() => audienceStore.hasChosen ? audienceStore.audience : null)

  // Map le code interne du store ("sen" | "cejef") vers le code Directus
  // ("SEN" | "SFP"), qui utilise les majuscules par convention métier.
  const audienceCode = computed<string | null>(() => {
    if (!currentAudience.value) return null
    return currentAudience.value === "cejef" ? "SFP" : "SEN"
  })

  const { data: themes, pending, refresh } = useFetch<DataProtectionTheme[]>("/api/data-protection/themes", {
    key: "data-protection-themes",
    default: () => []
  })

  const filteredThemes = computed(() => {
    const aud = audienceCode.value
    const list = themes.value ?? []
    return list
      .filter(theme => matchesAudience(theme.audience, aud))
      .map((theme) => {
        const themeWithFilteredAudience: DataProtectionTheme = {
          ...theme,
          sections: theme.sections
            .filter(section => matchesAudience(section.audience, aud))
            .map(section => ({
              ...section,
              items: section.items
                .filter(item => matchesAudience(item.audience, aud))
                .map(item => ({
                  ...item,
                  resources: item.resources.filter(r => matchesAudience(r.audience, aud))
                }))
            }))
        }

        if (!searchQuery.value.trim()) return themeWithFilteredAudience

        const searchTerms = [normalizeText(searchQuery.value.trim())]

        if (matchesSearch([theme.title, theme.description].join(" "), searchTerms)) {
          return themeWithFilteredAudience
        }

        const filteredSections = themeWithFilteredAudience.sections
          .map((section): DataProtectionSection | null => {
            if (matchesSearch(section.title, searchTerms)) return section
            const filteredItems = section.items.filter(item => matchesItem(item, searchTerms))
            if (filteredItems.length > 0) return { ...section, items: filteredItems }
            return null
          })
          .filter((s): s is DataProtectionSection => s !== null)

        if (filteredSections.length === 0) return null
        return { ...themeWithFilteredAudience, sections: filteredSections }
      })
      .filter((t): t is DataProtectionTheme => t !== null)
      .filter(t => t.sections.length > 0 || !searchQuery.value.trim())
  })

  const hasResults = computed(() => filteredThemes.value.length > 0)

  const totalSections = computed(() =>
    filteredThemes.value.reduce((sum, t) => sum + t.sections.length, 0)
  )

  return {
    searchQuery,
    filteredThemes,
    hasResults,
    totalSections,
    pending,
    refresh
  }
}
