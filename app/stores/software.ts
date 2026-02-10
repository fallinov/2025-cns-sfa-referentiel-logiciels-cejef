import { defineStore } from "pinia"
import type { CostType, Software } from "~~/types/software"
import { getCertificationLevel } from "~~/types/software"
import { expandSearchQuery, matchesSearch } from "~/utils/search"

export const useSoftwareStore = defineStore("software", () => {
  const { getSoftwareList } = useSoftware()
  const softwareList = getSoftwareList()

  // State
  const searchQuery = ref("")
  const selectedCategory = ref<string | null>(null)
  const selectedCosts = ref<CostType[]>([])
  const selectedCertifications = ref<number[]>([])
  const selectedCategories = ref<string[]>([])
  const selectedDisciplines = ref<string[]>([])
  const selectedActivities = ref<string[]>([])
  const selectedPopularFilters = ref<string[]>([])
  const selectedLgpdLevel = ref<number | null>(null)
  const sortBy = ref("recommended")
  const isFiltersDrawerOpen = ref(false)

  // Helper function to check if software is "Approuvé CEJEF"
  const isApprovedCejef = (software: Software): boolean => {
    const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
    return software.supportedByCEJEF && software.campusTraining && level === 1
  }

  // Popular Filters Configuration
  const popularFilters = [
    {
      id: "approved-cejef",
      label: "Approuvé CEJEF",
      icon: "i-lucide-badge-check",
      predicate: (software: Software) => isApprovedCejef(software)
    },
    {
      id: "student-data-allowed",
      label: "Données élèves autorisées",
      icon: "i-lucide-user-check",
      predicate: (software: Software) => {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        return level === 1
      }
    },
    {
      id: "supported-cejef",
      label: "Support CEJEF",
      icon: "i-lucide-headset",
      predicate: (software: Software) => software.supportedByCEJEF
    },
    {
      id: "campus-training",
      label: "Formation CAMPUS",
      icon: "i-lucide-graduation-cap",
      predicate: (software: Software) => software.campusTraining
    }
  ] as const

  const popularFilterMap = popularFilters.reduce(
    (acc, filter) => {
      acc[filter.id] = filter
      return acc
    },
    {} as Record<string, (typeof popularFilters)[number]>
  )

  // Getters
  const uniqueCategories = computed(() => {
    const categories = new Set<string>()
    softwareList.forEach(s => s.categories?.forEach(c => categories.add(c)))
    return Array.from(categories).sort()
  })

  const uniqueDisciplines = computed(() => {
    const disciplines = new Set<string>()
    softwareList.forEach(s => s.disciplines?.forEach(d => disciplines.add(d)))
    return Array.from(disciplines).sort()
  })

  const uniqueActivities = computed(() => {
    const activities = new Set<string>()
    softwareList.forEach(s => s.pedagogicalActivities?.forEach(a => activities.add(a)))
    return Array.from(activities).sort()
  })

  const filteredSoftwareList = computed(() => {
    let filtered = [...softwareList]

    // Apply category filter
    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter(software =>
        software.categories?.some(c => selectedCategories.value.includes(c))
      )
    }

    // Apply discipline filter
    if (selectedDisciplines.value.length > 0) {
      filtered = filtered.filter(software =>
        software.disciplines?.some(d => selectedDisciplines.value.includes(d))
      )
    }

    // Apply activity filter
    if (selectedActivities.value.length > 0) {
      filtered = filtered.filter(software =>
        software.pedagogicalActivities?.some(a => selectedActivities.value.includes(a))
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
        || (selectedDisciplines.value.length === 1 && selectedDisciplines.value[0] === searchQuery.value)
        || (selectedActivities.value.length === 1 && selectedActivities.value[0] === searchQuery.value)

    if (searchQuery.value && !isExactFilterMatch) {
      const searchTerms = expandSearchQuery(searchQuery.value)

      filtered = filtered.filter((software) => {
        const searchableText = [
          software.name,
          software.shortDescription,
          ...(software.categories || []),
          ...(software.pedagogicalActivities || []),
          ...(software.disciplines || [])
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

    // Apply LGPD level filter
    if (selectedLgpdLevel.value !== null) {
      filtered = filtered.filter((software) => {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        return level === selectedLgpdLevel.value
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const levelA = a.certificationLevel ?? getCertificationLevel(a.lgpd) ?? 99
      const levelB = b.certificationLevel ?? getCertificationLevel(b.lgpd) ?? 99
      const nameA = a.name || ""
      const nameB = b.name || ""
      const isApprovedA = isApprovedCejef(a)
      const isApprovedB = isApprovedCejef(b)

      switch (sortBy.value) {
        case "recommended":
          // Approuvé CEJEF en premier
          if (isApprovedA !== isApprovedB) return isApprovedA ? -1 : 1
          // Secondaire : par conformité (validé d'abord)
          if (levelA !== levelB) return levelA - levelB
          // Tertiaire : alphabétique
          return nameA.localeCompare(nameB)
        case "level-asc":
          // Validé (1) → Restreint (2) → Interdit (3)
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
      + selectedDisciplines.value.length
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
    selectedDisciplines.value = []
    selectedActivities.value = []
    searchQuery.value = ""
  }

  const resetFilters = () => {
    selectedCosts.value = []
    selectedCertifications.value = []
    selectedPopularFilters.value = []
    selectedLgpdLevel.value = null
    selectedCategories.value = []
    selectedDisciplines.value = []
    selectedActivities.value = []
    // Keep searchQuery
  }

  const handleCategoryFilter = (category: string) => {
    selectedCategories.value = [category]
    selectedDisciplines.value = []
    selectedActivities.value = []
    searchQuery.value = category
  }

  const handleDisciplineFilter = (discipline: string) => {
    selectedDisciplines.value = [discipline]
    selectedCategories.value = []
    selectedActivities.value = []
    searchQuery.value = discipline
  }

  const handleActivityFilter = (activity: string) => {
    selectedActivities.value = [activity]
    selectedCategories.value = []
    selectedDisciplines.value = []
    searchQuery.value = activity
  }

  return {
    // State
    searchQuery,
    selectedCategory,
    selectedCosts,
    selectedCertifications,
    selectedCategories,
    selectedDisciplines,
    selectedActivities,
    selectedPopularFilters,
    selectedLgpdLevel,
    sortBy,
    isFiltersDrawerOpen,
    popularFilters,

    // Getters
    uniqueCategories,
    uniqueDisciplines,
    uniqueActivities,
    filteredSoftwareList,
    activeFiltersCount,
    hasActiveFilters,
    // Actions
    togglePopularFilter,
    clearAllFilters,
    resetFilters,
    handleCategoryFilter,
    handleDisciplineFilter,
    handleActivityFilter
  }
})
