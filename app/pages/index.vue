<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import type { CostType, Software, CertificationLevel } from "~~/types/software"
import { CERTIFICATION_LEVELS } from "~/constants/certification-levels"

const { getSoftwareList } = useSoftware()
const { setFilteredList } = useSoftwareNavigation()
const softwareList = getSoftwareList()

// Search functionality
const searchQuery = ref("")
const selectedCategory = ref<string | null>(null)
const selectedDiscipline = ref<string | null>(null)
const selectedActivity = ref<string | null>(null)

// Filter functionality
const selectedCosts = ref<CostType[]>([])
const selectedCertifications = ref<CertificationLevel[]>([])
const selectedPopularFilters = ref<string[]>([])
const isFiltersSlideoverOpen = ref(false)

// Handle category filter from search bar
const handleCategoryFilter = (category: string) => {
  selectedCategory.value = category
  selectedDiscipline.value = null
  selectedActivity.value = null
  searchQuery.value = ""
}

const handleDisciplineFilter = (discipline: string) => {
  selectedDiscipline.value = discipline
  selectedCategory.value = null
  selectedActivity.value = null
  searchQuery.value = ""
}

const handleActivityFilter = (activity: string) => {
  selectedActivity.value = activity
  selectedCategory.value = null
  selectedDiscipline.value = null
  searchQuery.value = ""
}

const certificationLevelLabels = computed(() =>
  Object.fromEntries(
    CERTIFICATION_LEVELS.map(level => [level.value, level.label])
  )
)

const popularFilters = [
  {
    id: "certified-level-1",
    label: "Certifié CEJEF",
    icon: "i-lucide-shield-check",
    predicate: (software: Software) => {
      const level
        = software.certificationLevel ?? getCertificationLevel(software.lgpd)
      return level === 1
    }
  },
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

const appliedFilters = computed(() => {
  const filters: Array<{ id: string, label: string }> = []

  selectedPopularFilters.value.forEach((filterId) => {
    const filter = popularFilterMap[filterId]
    if (filter) {
      filters.push({
        id: `popular-${filter.id}`,
        label: filter.label
      })
    }
  })

  selectedCosts.value.forEach((cost) => {
    filters.push({
      id: `cost-${cost}`,
      label: cost
    })
  })

  selectedCertifications.value.forEach((level) => {
    if (level !== null) {
      filters.push({
        id: `cert-${level}`,
        label: `Certification : ${certificationLevelLabels.value[level] ?? level}`
      })
    }
  })

  return filters
})

const removeFilter = (filterId: string) => {
  if (filterId.startsWith("popular-")) {
    const popularFilterId = filterId.replace("popular-", "")
    selectedPopularFilters.value = selectedPopularFilters.value.filter(
      id => id !== popularFilterId
    )
  } else if (filterId.startsWith("cost-")) {
    const cost = filterId.replace("cost-", "") as CostType
    selectedCosts.value = selectedCosts.value.filter(c => c !== cost)
  } else if (filterId.startsWith("cert-")) {
    const level = Number.parseInt(filterId.replace("cert-", "")) as CertificationLevel
    selectedCertifications.value = selectedCertifications.value.filter(
      l => l !== level
    )
  }
}

const clearAllFilters = () => {
  selectedCosts.value = []
  selectedCertifications.value = []
  selectedPopularFilters.value = []
  selectedCategory.value = null
  selectedDiscipline.value = null
  selectedActivity.value = null
}

const filteredSoftwareList = computed(() => {
  let filtered = [...softwareList]

  // Apply category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(software =>
      software.categories?.includes(selectedCategory.value!)
    )
  }

  // Apply discipline filter
  if (selectedDiscipline.value) {
    filtered = filtered.filter(software =>
      software.disciplines?.includes(selectedDiscipline.value!)
    )
  }

  // Apply activity filter
  if (selectedActivity.value) {
    filtered = filtered.filter(software =>
      software.pedagogicalActivities?.includes(selectedActivity.value!)
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
    filtered = filtered.filter((software) => {
      const level
        = software.certificationLevel ?? getCertificationLevel(software.lgpd)
      return selectedCertifications.value.includes(level)
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
)

const hasActiveFilters = computed(() => activeFiltersCount.value > 0)

// Compute counts for each certification level
const certificationCounts = computed(() => {
  const counts: Record<number | "null", number> = { 1: 0, 2: 0, 3: 0, null: 0 }
  softwareList.forEach((software) => {
    const level
      = software.certificationLevel ?? getCertificationLevel(software.lgpd)
    const key = level ?? "null"
    counts[key]++
  })
  return counts
})
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
          <!-- Filter Buttons -->
          <UButton
            v-for="filter in popularFilters"
            :key="filter.id"
            :color="selectedPopularFilters.includes(filter.id) ? 'primary' : 'neutral'"
            :variant="selectedPopularFilters.includes(filter.id) ? 'solid' : 'outline'"
            class="rounded-full transition-all duration-300"
            size="md"
            @click="togglePopularFilter(filter.id)"
          >
            {{ filter.label }}
          </UButton>

          <!-- Advanced Filters Toggle -->
          <UButton
            color="neutral"
            variant="outline"
            class="rounded-full transition-all duration-300"
            size="md"
            @click="isFiltersSlideoverOpen = true"
          >
            <template #leading>
              <UIcon name="i-lucide-sliders-horizontal" class="w-4 h-4" />
            </template>
            Plus de filtres
            <span
              v-if="activeFiltersCount > 0"
              class="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
            >
              {{ activeFiltersCount }}
            </span>
          </UButton>

          <!-- Clear Filters -->
          <UButton
            v-if="hasActiveFilters || selectedCategory"
            color="neutral"
            variant="ghost"
            size="sm"
            class="ml-auto"
            @click="clearAllFilters"
          >
            Tout effacer
          </UButton>
        </div>

        <!-- Active Filters Display -->
        <div v-if="selectedCategory || selectedDiscipline || selectedActivity" class="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">Filtres actifs :</span>

          <!-- Category Badge -->
          <UBadge
            v-if="selectedCategory"
            color="primary"
            variant="subtle"
            size="md"
            class="flex items-center gap-1 pl-2 pr-1 py-1"
          >
            {{ selectedCategory }}
            <button
              type="button"
              class="ml-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full p-0.5 transition-colors"
              @click="selectedCategory = null"
            >
              <UIcon name="i-lucide-x" class="w-3 h-3" />
            </button>
          </UBadge>

          <!-- Discipline Badge -->
          <UBadge
            v-if="selectedDiscipline"
            color="blue"
            variant="subtle"
            size="md"
            class="flex items-center gap-1 pl-2 pr-1 py-1"
          >
            {{ selectedDiscipline }}
            <button
              type="button"
              class="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
              @click="selectedDiscipline = null"
            >
              <UIcon name="i-lucide-x" class="w-3 h-3" />
            </button>
          </UBadge>

          <!-- Activity Badge -->
          <UBadge
            v-if="selectedActivity"
            color="green"
            variant="subtle"
            size="md"
            class="flex items-center gap-1 pl-2 pr-1 py-1"
          >
            {{ selectedActivity }}
            <button
              type="button"
              class="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5 transition-colors"
              @click="selectedActivity = null"
            >
              <UIcon name="i-lucide-x" class="w-3 h-3" />
            </button>
          </UBadge>
        </div>
      </div>

      <!-- Applied Filters -->
      <div v-if="appliedFilters.length > 0" class="flex flex-wrap gap-2">
        <UBadge
          v-for="filter in appliedFilters"
          :key="filter.id"
          color="neutral"
          variant="outline"
          size="md"
        >
          {{ filter.label }}
          <template #trailing>
            <button
              type="button"
              class="ml-1 hover:text-red-600 dark:hover:text-red-400"
              @click="removeFilter(filter.id)"
            >
              <UIcon name="i-lucide-x" class="w-3 h-3" />
            </button>
          </template>
        </UBadge>
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
      <USlideover v-model:open="isFiltersSlideoverOpen" side="right">
        <template #body>
          <div class="p-6 space-y-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                Filtres avancés
              </h2>
              <UButton
                v-if="hasActiveFilters"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="clearAllFilters"
              >
                <template #leading>
                  <UIcon name="i-lucide-x" class="w-4 h-4" />
                </template>
                Tout effacer
              </UButton>
            </div>

            <!-- Cost Filter -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Coût
              </label>
              <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="selectedCosts"
                    type="checkbox"
                    value="Gratuit"
                    class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-900 dark:text-white">Gratuit</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="selectedCosts"
                    type="checkbox"
                    value="Freemium"
                    class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-900 dark:text-white">Freemium</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="selectedCosts"
                    type="checkbox"
                    value="Payant"
                    class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-900 dark:text-white">Payant</span>
                </label>
              </div>
            </div>

            <USeparator />

            <!-- Certification Level Filter -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Niveau de certification
              </label>
              <div class="space-y-2">
                <label
                  v-for="level in CERTIFICATION_LEVELS"
                  :key="level.value ?? 'null'"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    v-model="selectedCertifications"
                    type="checkbox"
                    :value="level.value"
                    class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-900 dark:text-white">
                    {{ level.label }} ({{ level.value !== null ? certificationCounts[level.value] : 0 }})
                  </span>
                </label>
              </div>
            </div>
          </div>
        </template>
      </USlideover>
    </UContainer>
  </div>
</template>
