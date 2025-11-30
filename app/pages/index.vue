<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const { setFilteredList } = useSoftwareNavigation()

const store = useSoftwareStore()
const {
  searchQuery,
  selectedCategory,
  selectedCategories,
  selectedDisciplines,
  selectedActivities,
  selectedPopularFilters,
  sortBy,
  popularFilters,
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
  togglePopularFilter,
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

const viewMode = ref<"grid" | "list">("grid")
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
        <div class="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4 px-4 sm:px-0">
          <!-- Sort -->
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-arrow-up-down" class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <USelect
              v-model="sortBy"
              :items="[
                { label: 'Classification (Meilleur)', value: 'certification-asc' },
                { label: 'Classification (Moins bon)', value: 'certification-desc' },
                { label: 'Nom (A-Z)', value: 'name-asc' },
                { label: 'Nom (Z-A)', value: 'name-desc' },
                { label: 'Date (Plus récent)', value: 'date-desc' },
                { label: 'Date (Plus ancien)', value: 'date-asc' }
              ]"
              option-attribute="label"
              value-attribute="value"
              size="xl"
              class="w-56"
            />
          </div>

          <!-- View Toggle -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              :class="[
                'inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm',
                viewMode === 'grid'
                  ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
                  : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
              ]"
              aria-label="Vue grille"
              @click="viewMode = 'grid'"
            >
              <UIcon name="i-lucide-layout-grid" class="w-5 h-5" />
            </button>
            <button
              type="button"
              :class="[
                'inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm',
                viewMode === 'list'
                  ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
                  : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
              ]"
              aria-label="Vue liste"
              @click="viewMode = 'list'"
            >
              <UIcon name="i-lucide-list" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Software Grid/List -->
        <!-- Software Grid/List -->
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
