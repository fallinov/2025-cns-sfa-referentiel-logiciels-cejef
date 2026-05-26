import Fuse from "fuse.js"
import type { FuseResultMatch } from "fuse.js"
import type { Software } from "~~/types/software"

/**
 * Une suggestion enrichie d'informations sur le match (pour le highlight des
 * segments matchant dans le rendu). `matches` est fourni par Fuse quand on
 * active `includeMatches`.
 */
export interface SoftwareSuggestion {
  software: Software
  matches: readonly FuseResultMatch[]
  /** True si la query est un préfixe du nom (entité reconnue → priorité absolue). */
  isPrefixMatch: boolean
}

export interface SearchSuggestions {
  query: string
  totalResults: number
  /** Catégories agrégées des logiciels matchants (3 max). */
  categories: string[]
  /** Activités pédagogiques agrégées (2 max). */
  activities: string[]
  /** Logiciels matchants enrichis du contexte de match (5 max). */
  software: SoftwareSuggestion[]
}

/**
 * Bonnes pratiques UX 2026 appliquées (Nielsen Norman, Baymard, Algolia) :
 *   1. **Detect intent** : si la query est un préfixe du nom d'un logiciel,
 *      ce logiciel devient prioritaire absolu (l'utilisateur sait ce qu'il cherche).
 *   2. **Logiciels d'abord** : la cible primaire d'une recherche par nom doit être
 *      en haut, pas les filtres taxonomiques.
 *   3. **Highlight** : segments matchant retournés via `includeMatches` Fuse pour
 *      surlignage côté UI.
 *   4. **Loi de Hick** : 8 résultats max total (5 logiciels + 2 catégories + 1 activité).
 */
export const useSearchSuggestions = (searchQuery: Ref<string>) => {
  const { getSoftwareList } = useSoftware()
  const softwareList = getSoftwareList()

  const fuseOptions = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    keys: [
      { name: "name", weight: 2 },
      { name: "shortDescription", weight: 1.5 },
      { name: "categories.name", weight: 1 },
      { name: "pedagogicalActivities.name", weight: 0.8 }
    ]
  }

  const safeSoftwareList = softwareList || []
  const fuse = new Fuse(safeSoftwareList, fuseOptions)

  const debouncedQuery = refDebounced(searchQuery, 300)

  const emptyResult: SearchSuggestions = {
    query: "",
    totalResults: 0,
    categories: [],
    activities: [],
    software: []
  }

  const suggestions = computed<SearchSuggestions>(() => {
    if (!searchQuery.value || searchQuery.value.length < 2) {
      return emptyResult
    }

    const query = debouncedQuery.value.trim()
    if (!query) {
      return { ...emptyResult, query: searchQuery.value }
    }

    const normalizedQuery = query.toLowerCase()
    const fuseResults = fuse.search(query)

    // Boost « préfixe nom » : on remonte en tête les logiciels dont le nom
    // commence exactement par la query (intent detection). Ces résultats
    // gardent leur ordre Fuse interne entre eux.
    const prefixMatches: SoftwareSuggestion[] = []
    const otherMatches: SoftwareSuggestion[] = []

    for (const result of fuseResults) {
      const isPrefixMatch = result.item.name.toLowerCase().startsWith(normalizedQuery)
      const enriched: SoftwareSuggestion = {
        software: result.item,
        matches: result.matches ?? [],
        isPrefixMatch
      }
      if (isPrefixMatch) {
        prefixMatches.push(enriched)
      } else {
        otherMatches.push(enriched)
      }
    }

    // Logiciels : 5 max (loi de Hick), préfixes d'abord
    const software = [...prefixMatches, ...otherMatches].slice(0, 5)

    // Catégories & activités : agrégées sur les logiciels matchants, limitées
    // pour ne pas noyer les résultats principaux (3 cat + 2 act = 5 secondaires).
    const categoriesSet = new Set<string>()
    const activitiesSet = new Set<string>()
    for (const s of software) {
      s.software.categories?.forEach(cat => categoriesSet.add(cat.name))
      s.software.pedagogicalActivities?.forEach(act => activitiesSet.add(act.name))
    }

    return {
      query: searchQuery.value,
      totalResults: fuseResults.length,
      categories: Array.from(categoriesSet).slice(0, 3),
      activities: Array.from(activitiesSet).slice(0, 2),
      software
    }
  })

  const hasSuggestions = computed(() => suggestions.value.totalResults > 0)

  return {
    suggestions,
    hasSuggestions
  }
}
