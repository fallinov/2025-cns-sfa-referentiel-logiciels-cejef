<script setup lang="ts">
import { CERTIFICATION_LEVELS } from "../constants/certification-levels"
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const { setFilteredList } = useSoftwareNavigation()

const store = useSoftwareStore()
const {
  searchQuery,
  selectedCategory,
  selectedCertifications,
  selectedCategories,
  selectedDisciplines,
  selectedActivities,
  selectedPopularFilters,
  popularFilters,
  uniqueCategories,
  uniqueDisciplines,
  uniqueActivities,
  filteredSoftwareList,
  hasActiveFilters
} = storeToRefs(store)

const {
  togglePopularFilter,
  clearAllFilters,
  handleCategoryFilter,
  handleDisciplineFilter,
  handleActivityFilter
} = store

// Watch filteredSoftwareList and update navigation composable
watch(
  filteredSoftwareList,
  (newList) => {
    setFilteredList(newList)
  },
  { immediate: true }
)

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
          <FilterDropdown
            v-model="selectedCategories"
            :items="uniqueCategories"
            label="Catégories"
            icon="i-lucide-layout-grid"
          />

          <!-- Disciplines Dropdown -->
          <FilterDropdown
            v-model="selectedDisciplines"
            :items="uniqueDisciplines"
            label="Disciplines"
            icon="i-lucide-book-open"
          />

          <!-- Activities Dropdown -->
          <FilterDropdown
            v-model="selectedActivities"
            :items="uniqueActivities"
            label="Activités"
            icon="i-lucide-shapes"
          />

          <!-- Certification Dropdown -->
          <FilterDropdown
            v-model="selectedCertifications"
            :items="certificationDropdownItems"
            label="Certification"
            icon="i-lucide-shield-check"
            value-attribute="value"
          />

          <!-- Filter Buttons -->
          <FilterButton
            v-for="filter in popularFilters"
            :key="filter.id"
            :label="filter.label"
            :icon="filter.icon"
            :active="selectedPopularFilters.includes(filter.id)"
            @click="togglePopularFilter(filter.id)"
          />

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
