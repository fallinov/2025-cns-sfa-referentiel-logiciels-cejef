import { defineStore } from "pinia"
import type { CostType, Software } from "~~/types/software"
import { getCertificationLevel } from "~~/types/software"
import type { CategoryEntry } from "~~/server/api/categories.get"
import type { ActivityEntry } from "~~/server/api/pedagogical-activities.get"
import { expandSearchQuery, matchesSearch } from "~/utils/search"
import { isApprovedForAudience } from "~/utils/approval"

export const useSoftwareStore = defineStore("software", () => {
  // Source de vérité : ref alimenté par plugins/software-data.ts (fetch /api/software → Directus)
  const { softwareList } = useSoftware()
  // Liste complete des categories (incluant celles a count=0, affichees en
  // mode disabled dans les filtres au lieu d'etre masquees).
  const categoryList = useState<CategoryEntry[]>("category-list", () => [])
  // Idem pour les activites pedagogiques.
  const activityList = useState<ActivityEntry[]>("activity-list", () => [])

  // State
  const searchQuery = ref("")
  const selectedCategory = ref<string | null>(null)
  const selectedCosts = ref<CostType[]>([])
  const selectedCertifications = ref<number[]>([])
  const selectedCategories = ref<string[]>([])
  const selectedActivities = ref<string[]>([])
  const selectedPopularFilters = ref<string[]>([])
  const selectedLgpdLevel = ref<number | null>(null)
  const sortBy = ref("recommended")
  const isFiltersDrawerOpen = ref(false)

  // Popular Filters Configuration (V1 — schéma Directus)
  const audienceStore = useAudienceStore()

  const allPopularFilters = [
    {
      id: "approved-sen",
      label: "Approuvé SEN",
      icon: "i-lucide-badge-check",
      audience: "SEN" as const,
      predicate: (software: Software) => !!software.approvedBySEN
    },
    {
      id: "approved-cejef",
      label: "Approuvé SFP",
      icon: "i-lucide-badge-check",
      audience: "SFP" as const,
      predicate: (software: Software) => !!software.approvedBySFP
    },
    {
      id: "student-data-allowed",
      label: "Utilisable avec vos élèves",
      icon: "i-lucide-user-check",
      audience: null,
      predicate: (software: Software) => {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        return level === 1
      }
    }
  ]

  const popularFilters = computed(() =>
    allPopularFilters.filter(f => !f.audience || f.audience === audienceStore.audience)
  )

  const popularFilterMap = allPopularFilters.reduce(
    (acc, filter) => {
      acc[filter.id] = filter
      return acc
    },
    {} as Record<string, (typeof allPopularFilters)[number]>
  )

  // Getters
  // Liste complete des categories Directus (incluant celles a count=0).
  // Fallback sur l'extraction depuis les logiciels si la taxonomie n'a pas
  // ete chargee (compatibilite SSR pre-fetch, tests unit, etc.).
  const uniqueCategories = computed(() => {
    if (categoryList.value.length > 0) {
      return categoryList.value.map(c => c.name).sort()
    }
    const categories = new Set<string>()
    softwareList.value.forEach(s => s.categories?.forEach(c => categories.add(c.name)))
    return Array.from(categories).sort()
  })

  // Liste complete des activites pedagogiques Directus (incluant celles a
  // count=0). Fallback sur l'extraction depuis les logiciels si la taxonomie
  // n'a pas ete chargee (SSR pre-fetch, tests unit, etc.).
  const uniqueActivities = computed(() => {
    if (activityList.value.length > 0) {
      return activityList.value.map(a => a.name).sort()
    }
    const activities = new Set<string>()
    softwareList.value.forEach(s => s.pedagogicalActivities?.forEach(a => activities.add(a.name)))
    return Array.from(activities).sort()
  })

  // Compteurs : nombre de logiciels par catégorie / activité.
  // Calculés sur la liste totale (pas filtrée) — pertinence stable même quand
  // d'autres filtres sont actifs. Pattern Booking.com/Amazon.
  const categoryCounts = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = {}
    softwareList.value.forEach(s =>
      s.categories?.forEach((c) => {
        counts[c.name] = (counts[c.name] ?? 0) + 1
      })
    )
    return counts
  })

  const activityCounts = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = {}
    softwareList.value.forEach(s =>
      s.pedagogicalActivities?.forEach((a) => {
        counts[a.name] = (counts[a.name] ?? 0) + 1
      })
    )
    return counts
  })

  // Maps name -> icon pour les categories et activites (l'icone est fixe
  // par categorie/activite, definie dans Directus). Premier rencontre gagne.
  const categoryIcons = computed<Record<string, string | null>>(() => {
    const icons: Record<string, string | null> = {}
    // Source primaire : taxonomie complete (couvre les categories sans logiciel).
    categoryList.value.forEach((c) => {
      icons[c.name] = c.icon
    })
    // Fallback : extraction depuis les logiciels (compatibilite tests / pre-fetch).
    softwareList.value.forEach(s =>
      s.categories?.forEach((c) => {
        if (!(c.name in icons)) icons[c.name] = c.icon
      })
    )
    return icons
  })

  const activityIcons = computed<Record<string, string | null>>(() => {
    const icons: Record<string, string | null> = {}
    // Source primaire : taxonomie complete (couvre les activites sans logiciel).
    activityList.value.forEach((a) => {
      icons[a.name] = a.icon
    })
    // Fallback : extraction depuis les logiciels (compatibilite tests / pre-fetch).
    softwareList.value.forEach(s =>
      s.pedagogicalActivities?.forEach((a) => {
        if (!(a.name in icons)) icons[a.name] = a.icon
      })
    )
    return icons
  })

  const filteredSoftwareList = computed(() => {
    let filtered = [...softwareList.value]

    // Apply category filter
    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter(software =>
        software.categories?.some(c => selectedCategories.value.includes(c.name))
      )
    }

    // Apply activity filter
    if (selectedActivities.value.length > 0) {
      filtered = filtered.filter(software =>
        software.pedagogicalActivities?.some(a => selectedActivities.value.includes(a.name))
      )
    }

    // Apply certification filter
    if (selectedCertifications.value.length > 0) {
      filtered = filtered.filter((software) => {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        return level !== null && selectedCertifications.value.includes(level)
      })
    }

    // Apply text search
    // Only apply if the search query is NOT one of the active filters (to avoid double filtering)
    const isExactFilterMatch
      = (selectedCategories.value.length === 1 && selectedCategories.value[0] === searchQuery.value)
        || (selectedActivities.value.length === 1 && selectedActivities.value[0] === searchQuery.value)

    if (searchQuery.value && !isExactFilterMatch) {
      const searchTerms = expandSearchQuery(searchQuery.value)

      filtered = filtered.filter((software) => {
        const searchableText = [
          software.name,
          software.shortDescription,
          ...(software.categories?.map(c => c.name) || []),
          ...(software.pedagogicalActivities?.map(a => a.name) || [])
        ].join(" ")

        return matchesSearch(searchableText, searchTerms)
      })
    }

    // Apply popular filters
    if (selectedPopularFilters.value.length > 0) {
      filtered = filtered.filter((software) => {
        return selectedPopularFilters.value.every((filterId) => {
          const filter = popularFilterMap[filterId]
          return filter ? filter.predicate(software) : true
        })
      })
    }

    // Apply LPD level filter
    if (selectedLgpdLevel.value !== null) {
      filtered = filtered.filter((software) => {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        return level === selectedLgpdLevel.value
      })
    }

    // Apply sorting
    // Poids de tri : Validé (1) → Vigilance (2) → Interdit (3) → Non évaluée (0 → 4)
    // → Logiciel inconnu (null → 5). Les fiches sans verdict tombent en queue plutôt
    // qu'en tête, car elles ne sont pas exploitables pour un enseignant.
    const sortWeight = (lvl: number | null | undefined): number => {
      if (lvl === 1) return 1
      if (lvl === 2) return 2
      if (lvl === 3) return 3
      if (lvl === 0) return 4
      return 5
    }
    // Tri "recommandé" : seules les approbations de l'audience active (SEN/SFP)
    // remontent les logiciels. Lu hors du sort pour que Vue trace la
    // dépendance et recalcule le computed quand l'audience change.
    const activeAudience = audienceStore.audience
    const isApprovedForActiveAudience = (s: Software): boolean =>
      isApprovedForAudience(s, activeAudience)

    filtered.sort((a, b) => {
      const levelA = sortWeight(a.certificationLevel ?? getCertificationLevel(a.lgpd))
      const levelB = sortWeight(b.certificationLevel ?? getCertificationLevel(b.lgpd))
      const nameA = a.name || ""
      const nameB = b.name || ""
      const approvedA = isApprovedForActiveAudience(a) ? 1 : 0
      const approvedB = isApprovedForActiveAudience(b) ? 1 : 0

      switch (sortBy.value) {
        case "recommended":
          // Logiciels approuvés par l'audience active en premier
          if (approvedA !== approvedB) return approvedB - approvedA
          // Secondaire : par conformité (validé d'abord)
          if (levelA !== levelB) return levelA - levelB
          // Tertiaire : alphabétique
          return nameA.localeCompare(nameB)
        case "level-asc":
          // Validé (1) → Vigilance (2) → Interdit (3)
          if (levelA !== levelB) return levelA - levelB
          return nameA.localeCompare(nameB)
        case "name-asc":
          return nameA.localeCompare(nameB)
        case "date-desc":
          return (b.createdAt || 0) - (a.createdAt || 0)
        default:
          return 0
      }
    })

    return filtered
  })

  const activeFiltersCount = computed(
    () =>
      selectedCosts.value.length
      + selectedCertifications.value.length
      + selectedPopularFilters.value.length
      + (selectedLgpdLevel.value !== null ? 1 : 0)
      + selectedCategories.value.length
      + selectedActivities.value.length
  )

  const hasActiveFilters = computed(() => activeFiltersCount.value > 0)

  // Actions
  const togglePopularFilter = (filterId: string) => {
    // Standard toggle for filters
    if (selectedPopularFilters.value.includes(filterId)) {
      selectedPopularFilters.value = selectedPopularFilters.value.filter(
        id => id !== filterId
      )
    } else {
      selectedPopularFilters.value = [...selectedPopularFilters.value, filterId]
    }
  }

  const clearAllFilters = () => {
    selectedCosts.value = []
    selectedCertifications.value = []
    selectedPopularFilters.value = []
    selectedLgpdLevel.value = null
    selectedCategories.value = []
    selectedActivities.value = []
    searchQuery.value = ""
  }

  const resetFilters = () => {
    selectedCosts.value = []
    selectedCertifications.value = []
    selectedPopularFilters.value = []
    selectedLgpdLevel.value = null
    selectedCategories.value = []
    selectedActivities.value = []
    // Keep searchQuery
  }

  const handleCategoryFilter = (category: string) => {
    selectedCategories.value = [category]
    selectedActivities.value = []
    searchQuery.value = category
  }

  const handleActivityFilter = (activity: string) => {
    selectedActivities.value = [activity]
    selectedCategories.value = []
    searchQuery.value = activity
  }

  return {
    // State
    searchQuery,
    selectedCategory,
    selectedCosts,
    selectedCertifications,
    selectedCategories,
    selectedActivities,
    selectedPopularFilters,
    selectedLgpdLevel,
    sortBy,
    isFiltersDrawerOpen,
    popularFilters,

    // Data
    softwareList,
    // Getters
    uniqueCategories,
    uniqueActivities,
    categoryCounts,
    activityCounts,
    categoryIcons,
    activityIcons,
    filteredSoftwareList,
    activeFiltersCount,
    hasActiveFilters,
    // Actions
    togglePopularFilter,
    clearAllFilters,
    resetFilters,
    handleCategoryFilter,
    handleActivityFilter
  }
})
