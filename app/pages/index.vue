<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import type { CostType, Software, CertificationLevel } from "~~/types/software"
import { CERTIFICATION_LEVELS } from "../constants/certification-levels"

const { getSoftwareList } = useSoftware()
const { setFilteredList } = useSoftwareNavigation()
const softwareList = getSoftwareList()

// Search functionality
const searchQuery = ref("")
const selectedCategory = ref<string | null>(null)

// Filter functionality
const selectedCosts = ref<CostType[]>([])
const selectedCertifications = ref<Exclude<CertificationLevel, null>[]>([])
const selectedCategories = ref<string[]>([])
const selectedDisciplines = ref<string[]>([])
const selectedActivities = ref<string[]>([])
const selectedPopularFilters = ref<string[]>([])

// Handle category filter from search bar
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

// Extract unique values for dropdowns
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
}

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

  // Apply cost filters
  if (selectedCosts.value.length > 0) {
    filtered = filtered.filter(software =>
      selectedCosts.value.includes(software.cost)
    )
  }

  // Apply certification filters
  if (selectedCertifications.value.length > 0) {
    const selectedValues = selectedCertifications.value.map((c: any) => c.value ?? c)
    filtered = filtered.filter((software) => {
      const level
        = software.certificationLevel ?? getCertificationLevel(software.lgpd)
      return level !== null && selectedValues.includes(level)
    })
  }

  return filtered
})

// Watch filteredSoftwareList and update navigation composable
watch(
  filteredSoftwareList,
  (newList) => {
    setFilteredList(newList)
  },
  { immediate: true }
)

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

// Compute counts for each certification level

const certificationDropdownItems = computed(() =>
  CERTIFICATION_LEVELS.map(level => ({
    label: level.label,
    value: level.value,
    icon: level.icon
  }))
)
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Background gradient with blobs -->
    <BackgroundGradient />

    <!-- Content with higher z-index -->
    <UContainer class="relative z-10 py-8 sm:py-12">
      <!-- Ricardo Style Search & Filters -->
      <div class="mb-8">
        <!-- Search Bar Area -->
        <div class="mb-4">
          <SearchBar
            v-model:search="searchQuery"
            @filter-by-category="handleCategoryFilter"
            @filter-by-discipline="handleDisciplineFilter"
            @filter-by-activity="handleActivityFilter"
          />
        </div>

        <!-- Horizontal Filter Bar -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          <!-- Categories Dropdown -->
          <USelectMenu
            v-model="selectedCategories"
            :items="uniqueCategories"
            multiple
            :searchable="false"
            icon="i-lucide-layout-grid"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              base: 'hover:bg-transparent dark:hover:bg-transparent',
              leadingIcon: 'text-inherit dark:text-inherit',
              trailingIcon: 'text-inherit dark:text-inherit',
              input: 'hidden'
            }"
            :class="[
              'ring-0 shadow-none inline-flex items-center px-3 py-1.5 text-base gap-2 rounded-full transition-all duration-300 backdrop-blur-md font-bold uppercase tracking-widest',
              selectedCategories.length > 0
                ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
                : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
            ]"
            :popper="{ placement: 'bottom-start', strategy: 'fixed' }"
          >
            <template #default>
              <span class="truncate">Catégories</span>
              <span v-if="selectedCategories.length > 0" class="ml-0.5">({{ selectedCategories.length }})</span>
            </template>
          </USelectMenu>

          <!-- Disciplines Dropdown -->
          <USelectMenu
            v-model="selectedDisciplines"
            :items="uniqueDisciplines"
            multiple
            :searchable="false"
            icon="i-lucide-book-open"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              base: 'hover:bg-transparent dark:hover:bg-transparent',
              leadingIcon: 'text-inherit dark:text-inherit',
              trailingIcon: 'text-inherit dark:text-inherit',
              input: 'hidden'
            }"
            :class="[
              'ring-0 shadow-none inline-flex items-center px-3 py-1.5 text-base gap-2 rounded-full transition-all duration-300 backdrop-blur-md font-bold uppercase tracking-widest',
              selectedDisciplines.length > 0
                ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
                : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
            ]"
            :popper="{ placement: 'bottom-start', strategy: 'fixed' }"
          >
            <template #default>
              <span class="truncate">Disciplines</span>
              <span v-if="selectedDisciplines.length > 0" class="ml-0.5">({{ selectedDisciplines.length }})</span>
            </template>
          </USelectMenu>

          <!-- Activities Dropdown -->
          <USelectMenu
            v-model="selectedActivities"
            :items="uniqueActivities"
            multiple
            :searchable="false"
            icon="i-lucide-shapes"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              base: 'hover:bg-transparent dark:hover:bg-transparent',
              leadingIcon: 'text-inherit dark:text-inherit',
              trailingIcon: 'text-inherit dark:text-inherit',
              input: 'hidden'
            }"
            :class="[
              'ring-0 shadow-none inline-flex items-center px-3 py-1.5 text-base gap-2 rounded-full transition-all duration-300 backdrop-blur-md font-bold uppercase tracking-widest',
              selectedActivities.length > 0
                ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
                : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
            ]"
            :popper="{ placement: 'bottom-start', strategy: 'fixed' }"
          >
            <template #default>
              <span class="truncate">Activités</span>
              <span v-if="selectedActivities.length > 0" class="ml-0.5">({{ selectedActivities.length }})</span>
            </template>
          </USelectMenu>
          <!-- Certification Dropdown -->
          <USelectMenu
            v-model="(selectedCertifications as any)"
            :items="certificationDropdownItems"
            multiple
            :searchable="false"
            icon="i-lucide-shield-check"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              base: 'hover:bg-transparent dark:hover:bg-transparent',
              leadingIcon: 'text-inherit dark:text-inherit',
              trailingIcon: 'text-inherit dark:text-inherit',
              input: 'hidden'
            }"
            :class="[
              'ring-0 shadow-none inline-flex items-center px-3 py-1.5 text-base gap-2 rounded-full transition-all duration-300 backdrop-blur-md font-bold uppercase tracking-widest',
              selectedCertifications.length > 0
                ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
                : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
            ]"
            :popper="{ placement: 'bottom-start', strategy: 'fixed' }"
            value-attribute="value"
          >
            <template #default>
              <span class="truncate">Certification</span>
              <span v-if="selectedCertifications.length > 0" class="ml-0.5">({{ selectedCertifications.length }})</span>
            </template>
          </USelectMenu>

          <!-- Filter Buttons -->
          <button
            v-for="filter in popularFilters"
            :key="filter.id"
            type="button"
            :class="[
              'inline-flex items-center px-3 py-1.5 text-base gap-2 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm font-bold uppercase tracking-widest',
              selectedPopularFilters.includes(filter.id)
                ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
                : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
            ]"
            @click="togglePopularFilter(filter.id)"
          >
            {{ filter.label }}
          </button>

          <button
            v-if="hasActiveFilters || selectedCategory"
            type="button"
            :class="[
              'ml-auto inline-flex items-center px-3 py-1.5 text-sm gap-2 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm font-bold uppercase tracking-widest',
              'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-red-500/10 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-500/20 dark:hover:text-red-400'
            ]"
            @click="clearAllFilters"
          >
            Tout effacer
          </button>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6 text-sm text-gray-600 dark:text-gray-400">
        {{ filteredSoftwareList.length }} logiciel{{ filteredSoftwareList.length > 1 ? "s" : "" }} trouvé{{ filteredSoftwareList.length > 1 ? "s" : "" }}
      </div>

      <!-- Software Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardLiquidGlass
          v-for="software in filteredSoftwareList"
          :key="software.id"
          :software="software"
          shape="curve"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredSoftwareList.length === 0"
        class="text-center py-16"
      >
        <UIcon
          name="i-lucide-search-x"
          class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
        />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun logiciel trouvé
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Essayez de modifier vos critères de recherche ou de supprimer des filtres
        </p>
        <UButton
          v-if="hasActiveFilters"
          color="primary"
          @click="clearAllFilters"
        >
          Réinitialiser les filtres
        </UButton>
      </div>

      <!-- Filters Slideover -->
    </UContainer>
  </div>
</template>
