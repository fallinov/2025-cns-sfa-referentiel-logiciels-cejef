import Fuse from "fuse.js"
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

  // Configuration Fuse.js pour fuzzy search
  const fuseOptions = {
    includeScore: true,
    threshold: 0.4, // 0 = exact match, 1 = match anything
    keys: [
      { name: "name", weight: 2 },
      { name: "shortDescription", weight: 1.5 },
      { name: "categories", weight: 1 },
      { name: "disciplines", weight: 1 },
      { name: "pedagogicalActivities", weight: 0.8 }
    ]
  }

  // Initialiser Fuse une seule fois
  const fuse = new Fuse(softwareList, fuseOptions)

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

    const query = searchQuery.value.trim()

    // Recherche fuzzy avec Fuse.js
    const results = fuse.search(query)
    const matchingSoftware = results.map(result => result.item)

    // Extraire les catégories, disciplines et activités uniques
    const categoriesSet = new Set<string>()
    const disciplinesSet = new Set<string>()
    const activitiesSet = new Set<string>()

    matchingSoftware.forEach((s) => {
      s.categories?.forEach(cat => categoriesSet.add(cat))
      s.disciplines?.forEach(disc => disciplinesSet.add(disc))
      s.pedagogicalActivities?.forEach(act => activitiesSet.add(act))
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
