<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const { setFilteredList } = useSoftwareNavigation()

const store = useSoftwareStore()
const {
  searchQuery,
  selectedCategories,
  selectedDisciplines,
  selectedActivities,
  selectedPopularFilters,
  sortBy,
  filteredSoftwareList,
  hasActiveFilters
} = storeToRefs(store)

const pageTitle = computed(() => {
  if (selectedCategories.value.length > 0) return `Catégorie «${selectedCategories.value[0]}»`
  if (selectedDisciplines.value.length > 0) return `Discipline «${selectedDisciplines.value[0]}»`
  if (selectedActivities.value.length > 0) return `Activité «${selectedActivities.value[0]}»`
  if (searchQuery.value) return `Résultats pour «${searchQuery.value}»`
  return ""
})

const {
  clearAllFilters,
  resetFilters,
  handleCategoryFilter,
  handleDisciplineFilter,
  handleActivityFilter
} = store

const handleGlobalSearch = (query: string) => {
  resetFilters()
  searchQuery.value = query
}

// Watch filteredSoftwareList and update navigation composable
watch(
  filteredSoftwareList,
  (newList) => {
    setFilteredList(newList)
  },
  { immediate: true }
)

const viewMode = useState<"grid" | "list">("viewMode", () => "grid")
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Background gradient with blobs -->
    <BackgroundGradient />

    <!-- Content with higher z-index -->
    <UContainer class="relative z-10 py-8 sm:py-12 px-0 sm:px-6 lg:px-8">
      <!-- Ricardo Style Search & Filters -->
      <div class="mb-8 px-4 sm:px-0">
        <!-- Search Bar Area -->
        <div class="mb-4">
          <SearchBar
            v-model:search="searchQuery"
            @filter-by-category="handleCategoryFilter"
            @filter-by-discipline="handleDisciplineFilter"
            @filter-by-activity="handleActivityFilter"
            @search="handleGlobalSearch"
            @clear="clearAllFilters"
          />
        </div>
      </div>

      <!-- Search Results Title -->
      <div v-if="pageTitle" class="mb-6 px-4 sm:px-0">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
          {{ pageTitle }}
        </h1>
      </div>

      <!-- Header Row: Count & Reset -->
      <div class="flex items-center justify-between mb-4 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
          {{ filteredSoftwareList.length }} logiciel{{ filteredSoftwareList.length > 1 ? "s" : "" }}
        </h2>

        <button
          v-if="hasActiveFilters"
          type="button"
          class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium transition-colors"
          @click="clearAllFilters"
        >
          <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4" />
          Réinitialiser le filtre
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="mb-8 px-4 sm:px-0">
        <div class="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <FilterButton
            v-for="filter in store.popularFilters"
            :key="filter.id"
            :label="filter.label"
            :icon="filter.icon"
            :active="selectedPopularFilters.includes(filter.id)"
            @click="store.togglePopularFilter(filter.id)"
          />
        </div>
      </div>

      <!-- Sort & View Options -->
      <SoftwareListControls
        v-model:sort-by="sortBy"
        v-model:view-mode="viewMode"
      />

      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
        <CardLiquidGlass
          v-for="software in filteredSoftwareList"
          :key="software.id"
          :software="software"
          shape="curve"
        />
      </div>

      <div v-else class="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-none sm:rounded-[var(--ui-radius)] border-y sm:border border-white/20 dark:border-white/10 overflow-hidden">
        <UPageList divide>
          <SoftwareListItem
            v-for="software in filteredSoftwareList"
            :key="software.id"
            :software="software"
          />
        </UPageList>
      </div>

      <SoftwareListEmpty
        v-if="filteredSoftwareList.length === 0"
        :has-active-filters="hasActiveFilters"
        @clear="clearAllFilters"
      />

      <!-- Filters Slideover -->
    </UContainer>
  </div>
</template>
