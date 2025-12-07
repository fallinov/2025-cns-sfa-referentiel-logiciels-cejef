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
const isFiltersDrawerOpen = ref(false)

// Pagination pour améliorer les performances (126 logiciels)
const itemsPerPage = 24
const displayedItems = ref(itemsPerPage)

// Liste paginée
const paginatedSoftwareList = computed(() => {
  return filteredSoftwareList.value.slice(0, displayedItems.value)
})

// Y a-t-il plus d'items à charger ?
const hasMoreItems = computed(() => {
  return displayedItems.value < filteredSoftwareList.value.length
})

// Charger plus d'items
const loadMore = () => {
  displayedItems.value += itemsPerPage
}

// Réinitialiser la pagination quand les filtres changent
watch(filteredSoftwareList, () => {
  displayedItems.value = itemsPerPage
})

// Handle URL Query Parameters for filtering
const route = useRoute()
const loadMoreSentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (route.query.category) {
    handleCategoryFilter(route.query.category as string)
  } else if (route.query.discipline) {
    handleDisciplineFilter(route.query.discipline as string)
  } else if (route.query.activity) {
    handleActivityFilter(route.query.activity as string)
  }

  // Setup Intersection Observer for infinite scroll
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && hasMoreItems.value) {
      loadMore()
    }
  }, {
    root: null,
    rootMargin: "100px",
    threshold: 0.1
  })

  // Watch for sentinel element availability
  watch(loadMoreSentinel, (el) => {
    if (el && observer) {
      observer.observe(el)
    } else {
      observer?.disconnect()
    }
  }, { immediate: true })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F5] dark:bg-gray-900">
    <!-- Content -->
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8">
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
          class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium transition-colors cursor-pointer"
          @click="clearAllFilters"
        >
          <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4" />
          Réinitialiser le filtre
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="mb-8 px-4 sm:px-0">
        <!-- Mobile: Bouton d'ouverture du drawer -->
        <div class="sm:hidden">
          <UButton
            color="primary"
            variant="outline"
            size="lg"
            block
            @click="isFiltersDrawerOpen = true"
          >
            <template #leading>
              <UIcon name="i-lucide-filter" class="w-5 h-5" />
            </template>
            Filtres rapides
            <UBadge
              v-if="selectedPopularFilters.length > 0"
              color="primary"
              size="sm"
              class="ml-2"
            >
              {{ selectedPopularFilters.length }}
            </UBadge>
          </UButton>
        </div>

        <!-- Desktop/Tablet: Filtres visibles en ligne -->
        <div class="hidden sm:flex flex-wrap items-center gap-2">
          <UButton
            v-for="filter in store.popularFilters"
            :key="filter.id"
            :variant="selectedPopularFilters.includes(filter.id) ? 'solid' : 'outline'"
            :color="selectedPopularFilters.includes(filter.id) ? 'primary' : 'neutral'"
            size="xl"
            :class="[!selectedPopularFilters.includes(filter.id) ? 'text-black dark:text-white' : '', 'cursor-pointer']"
            @click="store.togglePopularFilter(filter.id)"
          >
            <template v-if="filter.icon" #leading>
              <UIcon :name="filter.icon" />
            </template>
            {{ filter.label }}
          </UButton>
        </div>

        <!-- Mobile: Drawer avec filtres -->
        <UDrawer
          v-model:open="isFiltersDrawerOpen"
          title="Filtres rapides"
          description="Sélectionnez un ou plusieurs filtres pour affiner votre recherche"
        >
          <template #content>
            <div class="flex flex-col gap-3 p-4">
              <UButton
                v-for="filter in store.popularFilters"
                :key="filter.id"
                :color="selectedPopularFilters.includes(filter.id) ? 'primary' : 'neutral'"
                :variant="selectedPopularFilters.includes(filter.id) ? 'solid' : 'outline'"
                size="xl"
                block
                class="justify-start min-h-[44px] cursor-pointer"
                @click="store.togglePopularFilter(filter.id)"
              >
                <template #leading>
                  <UIcon :name="filter.icon" class="w-5 h-5" />
                </template>
                {{ filter.label }}
              </UButton>

              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <UButton
                  v-if="selectedPopularFilters.length > 0"
                  color="neutral"
                  variant="ghost"
                  size="lg"
                  block
                  @click="selectedPopularFilters = []"
                >
                  <template #leading>
                    <UIcon name="i-lucide-x" class="w-5 h-5" />
                  </template>
                  Effacer les filtres
                </UButton>
              </div>
            </div>
          </template>
        </UDrawer>
      </div>

      <!-- Sort & View Options -->
      <SoftwareListControls
        v-model:sort-by="sortBy"
        v-model:view-mode="viewMode"
      />

      <div v-if="viewMode === 'grid'" class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 px-4 sm:px-0">
        <SoftwareCard
          v-for="software in paginatedSoftwareList"
          :key="software.id"
          :software="software"
        />
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-none sm:rounded-[var(--ui-radius)] overflow-hidden shadow-md">
        <div class="relative flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
          <SoftwareListItem
            v-for="software in paginatedSoftwareList"
            :key="software.id"
            :software="software"
          />
        </div>
      </div>

      <!-- Infinite Scroll Sentinel & Skeletons -->
      <div
        v-if="hasMoreItems && filteredSoftwareList.length > 0"
        ref="loadMoreSentinel"
        class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 px-4 sm:px-0 mt-6"
      >
        <div
          v-for="n in 4"
          :key="n"
          class="relative w-full overflow-hidden bg-white dark:bg-gray-800 rounded-[10px] shadow-md p-6 flex flex-col gap-6 isolate"
        >
          <!-- Certification Icon Skeleton (Absolute Top Right) -->
          <div class="absolute top-5 right-5 z-20">
            <USkeleton class="h-6 w-6 rounded-full" />
          </div>

          <!-- Logo Skeleton -->
          <div class="relative z-10 w-12 h-12">
            <USkeleton class="h-full w-full rounded-lg" />
          </div>

          <!-- Title & Description Skeleton -->
          <div class="relative z-10 space-y-3 flex-1 w-full">
            <USkeleton class="h-7 w-3/4 rounded-md" /> <!-- Title -->
            <div class="space-y-2 pt-1">
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-5/6" />
              <USkeleton class="h-4 w-4/6" />
            </div>
          </div>

          <!-- Badges Skeleton -->
          <div class="relative z-10 flex gap-2 mt-auto">
            <USkeleton class="h-6 w-24 rounded-md" />
            <USkeleton class="h-6 w-20 rounded-md" />
          </div>
        </div>
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
