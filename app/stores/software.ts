import { defineStore } from "pinia"
import type { CostType, Software } from "~~/types/software"
import { getCertificationLevel } from "~~/types/software"

export const useSoftwareStore = defineStore("software", () => {
  const { getSoftwareList } = useSoftware()
  const softwareList = getSoftwareList()

  // State
  const searchQuery = ref("")
  const selectedCategory = ref<string | null>(null)
  const selectedCosts = ref<CostType[]>([])
  const selectedCertifications = ref<any[]>([])
  const selectedCategories = ref<string[]>([])
  const selectedDisciplines = ref<string[]>([])
  const selectedActivities = ref<string[]>([])
  const selectedPopularFilters = ref<string[]>([])

  // Popular Filters Configuration
  const popularFilters = [
    {
      id: "personal-data",
      label: "Données élèves autorisées",
      icon: "i-lucide-user-check",
      predicate: (software: Software) => software.personalData
    },
    {
      id: "supported-cejef",
      label: "Support CEJEF",
      icon: "i-lucide-headset",
      predicate: (software: Software) => software.supportedByCEJEF
    },
    {
      id: "campus-training",
      label: "Formation disponible",
      icon: "i-lucide-graduation-cap",
      predicate: (software: Software) => software.campusTraining
    },
    {
      id: "free",
      label: "100% gratuit",
      icon: "i-lucide-coins",
      predicate: (software: Software) => software.cost === "Gratuit"
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

    // Apply search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      filtered = filtered.filter(
        software =>
          software.name.toLowerCase().includes(query)
          || software.shortDescription.toLowerCase().includes(query)
      )
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

    return filtered
  })

  const activeFiltersCount = computed(
    () =>
      selectedCosts.value.length
      + selectedCertifications.value.length
      + selectedPopularFilters.value.length
      + selectedCategories.value.length
      + selectedDisciplines.value.length
      + selectedActivities.value.length
  )

  const hasActiveFilters = computed(() => activeFiltersCount.value > 0)

  // Actions
  const togglePopularFilter = (filterId: string) => {
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
    selectedCategories.value = []
    selectedDisciplines.value = []
    selectedActivities.value = []
    searchQuery.value = ""
  }

  const handleCategoryFilter = (category: string) => {
    selectedCategories.value = [category]
    selectedDisciplines.value = []
    selectedActivities.value = []
    searchQuery.value = ""
  }

  const handleDisciplineFilter = (discipline: string) => {
    selectedDisciplines.value = [discipline]
    selectedCategories.value = []
    selectedActivities.value = []
    searchQuery.value = ""
  }

  const handleActivityFilter = (activity: string) => {
    selectedActivities.value = [activity]
    selectedCategories.value = []
    selectedDisciplines.value = []
    searchQuery.value = ""
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
    handleCategoryFilter,
    handleDisciplineFilter,
    handleActivityFilter
  }
})
