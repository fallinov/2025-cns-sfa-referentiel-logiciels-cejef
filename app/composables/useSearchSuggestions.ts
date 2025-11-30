import { normalizeText } from "~/utils/search"
import type { Software } from "~~/types/software"

export interface SearchSuggestions {
  query: string
  totalResults: number
  categories: string[]
  disciplines: string[]
  activities: string[]
  software: Software[]
}

export const useSearchSuggestions = (searchQuery: Ref<string>) => {
  const { getSoftwareList } = useSoftware()
  const softwareList = getSoftwareList()

  const suggestions = computed<SearchSuggestions>(() => {
    if (!searchQuery.value || searchQuery.value.length < 2) {
      return {
        query: "",
        totalResults: 0,
        categories: [],
        disciplines: [],
        activities: [],
        software: []
      }
    }

    const query = normalizeText(searchQuery.value.trim())

    // Filtrer les logiciels correspondants
    const matchingSoftware = softwareList.filter(s =>
      normalizeText(s.name).includes(query)
      || normalizeText(s.shortDescription).includes(query)
      || s.categories?.some(cat => normalizeText(cat).includes(query))
      || s.disciplines?.some(disc => normalizeText(disc).includes(query))
      || s.pedagogicalActivities?.some(act => normalizeText(act).includes(query))
    )

    // Extraire les catégories uniques
    const categoriesSet = new Set<string>()
    const disciplinesSet = new Set<string>()
    const activitiesSet = new Set<string>()

    matchingSoftware.forEach((s) => {
      s.categories?.forEach((cat) => {
        if (normalizeText(cat).includes(query)) categoriesSet.add(cat)
      })
      s.disciplines?.forEach((disc) => {
        if (normalizeText(disc).includes(query)) disciplinesSet.add(disc)
      })
      s.pedagogicalActivities?.forEach((act) => {
        if (normalizeText(act).includes(query)) activitiesSet.add(act)
      })
    })

    return {
      query: searchQuery.value,
      totalResults: matchingSoftware.length,
      categories: Array.from(categoriesSet).slice(0, 3),
      disciplines: Array.from(disciplinesSet).slice(0, 3),
      activities: Array.from(activitiesSet).slice(0, 3),
      software: matchingSoftware.slice(0, 6)
    }
  })

  const hasSuggestions = computed(() => suggestions.value.totalResults > 0)

  return {
    suggestions,
    hasSuggestions
  }
}
