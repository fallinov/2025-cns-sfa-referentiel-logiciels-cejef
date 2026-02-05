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
  const selectedLgpdLevels = ref<number[]>([])
  const sortBy = ref("approuve-first")
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

  // LGPD Color Filters Configuration
  const lgpdColorFilters = [
    {
      id: "lgpd-green",
      label: "Validé",
      level: 1,
      color: "success" as const,
      icon: "i-lucide-circle-check"
    },
    {
      id: "lgpd-orange",
      label: "Restreint",
      level: 2,
      color: "warning" as const,
      icon: "i-lucide-circle-alert"
    },
    {
      id: "lgpd-red",
      label: "Interdit",
      level: 3,
      color: "error" as const,
      icon: "i-lucide-circle-x"
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

  // LGPD level counts for filter badges
  const lgpdLevelCounts = computed(() => {
    const counts = { 1: 0, 2: 0, 3: 0 }
    softwareList.forEach((software) => {
      const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
      if (level && counts[level as keyof typeof counts] !== undefined) {
        counts[level as keyof typeof counts]++
      }
    })
    return counts
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

    // Apply LGPD level filters
    if (selectedLgpdLevels.value.length > 0) {
      filtered = filtered.filter((software) => {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        return level !== null && selectedLgpdLevels.value.includes(level)
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
        case "approuve-first":
          // Approuvé CEJEF en premier
          if (isApprovedA !== isApprovedB) return isApprovedA ? -1 : 1
          // Secondaire : par certification (vert d'abord)
          if (levelA !== levelB) return levelA - levelB
          // Tertiaire : alphabétique
          return nameA.localeCompare(nameB)
        case "certification-asc":
          // Meilleur niveau (1) d'abord, donc ordre croissant
          return levelA - levelB
        case "certification-desc":
          // Moins bon niveau d'abord
          return levelB - levelA
        case "name-asc":
          return nameA.localeCompare(nameB)
        case "name-desc":
          return nameB.localeCompare(nameA)
        case "date-desc":
          return (b.createdAt || 0) - (a.createdAt || 0)
        case "date-asc":
          return (a.createdAt || 0) - (b.createdAt || 0)
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
      + selectedLgpdLevels.value.length
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

  const toggleLgpdLevel = (level: number) => {
    if (selectedLgpdLevels.value.includes(level)) {
      selectedLgpdLevels.value = selectedLgpdLevels.value.filter(l => l !== level)
    } else {
      selectedLgpdLevels.value = [...selectedLgpdLevels.value, level]
    }
  }

  const clearAllFilters = () => {
    selectedCosts.value = []
    selectedCertifications.value = []
    selectedPopularFilters.value = []
    selectedLgpdLevels.value = []
    selectedCategories.value = []
    selectedDisciplines.value = []
    selectedActivities.value = []
    searchQuery.value = ""
  }

  const resetFilters = () => {
    selectedCosts.value = []
    selectedCertifications.value = []
    selectedPopularFilters.value = []
    selectedLgpdLevels.value = []
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
    selectedLgpdLevels,
    sortBy,
    isFiltersDrawerOpen,
    popularFilters,
    lgpdColorFilters,

    // Getters
    uniqueCategories,
    uniqueDisciplines,
    uniqueActivities,
    filteredSoftwareList,
    activeFiltersCount,
    hasActiveFilters,
    lgpdLevelCounts,

    // Actions
    togglePopularFilter,
    toggleLgpdLevel,
    clearAllFilters,
    resetFilters,
    handleCategoryFilter,
    handleDisciplineFilter,
    handleActivityFilter
  }
})
