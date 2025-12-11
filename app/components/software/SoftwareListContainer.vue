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

const {
  clearAllFilters
} = store

const pageTitle = computed(() => {
  if (selectedCategories.value.length > 0) return `Catégorie «${selectedCategories.value[0]}»`
  if (selectedDisciplines.value.length > 0) return `Discipline «${selectedDisciplines.value[0]}»`
  if (selectedActivities.value.length > 0) return `Activité «${selectedActivities.value[0]}»`
  if (searchQuery.value) return `Résultats pour «${searchQuery.value}»`
  return ""
})

// Watch filteredSoftwareList and update navigation composable
watch(
  filteredSoftwareList,
  (newList) => {
    setFilteredList(newList)
  },
  { immediate: true }
)

const viewMode = useState<"grid" | "list">("viewMode", () => "grid")

// Pagination pour améliorer les performances (126 logiciels)
const itemsPerPage = 24
const displayedItems = useState("software-list-pagination", () => itemsPerPage)

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

// Réinitialiser la pagination seulement si les filtres changent explicitement
watch([searchQuery, selectedCategories, selectedDisciplines, selectedActivities, selectedPopularFilters], () => {
  displayedItems.value = itemsPerPage
})

// Load more observer
const loadMoreSentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
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

  // Initial observation
  if (loadMoreSentinel.value) {
    observer.observe(loadMoreSentinel.value)
  }

  // Watch for sentinel re-appearance
  watch(loadMoreSentinel, (newEl) => {
    if (newEl && observer) {
      observer.observe(newEl)
    }
  })
})

onActivated(() => {
  if (loadMoreSentinel.value && observer) {
    observer.observe(loadMoreSentinel.value)
  }
})

onDeactivated(() => {
  observer?.disconnect()
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div>
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

    <!-- Filter Bar Component -->
    <SoftwareFiltersBar />

    <!-- Sort & View Options -->
    <SoftwareListControls
      v-model:sort-by="sortBy"
      v-model:view-mode="viewMode"
    />

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 px-4 sm:px-0 items-stretch">
      <SoftwareCard
        v-for="software in paginatedSoftwareList"
        :key="software.id"
        :software="software"
      />
    </div>

    <!-- List View -->
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
        class="relative w-full overflow-hidden bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] shadow-md p-6 flex flex-col gap-6 isolate"
      >
        <div class="absolute top-5 right-5 z-20">
          <USkeleton class="h-6 w-6 rounded-full" />
        </div>
        <div class="relative z-10 w-12 h-12">
          <USkeleton class="h-full w-full rounded-lg" />
        </div>
        <div class="relative z-10 space-y-3 flex-1 w-full">
          <USkeleton class="h-7 w-3/4 rounded-md" />
          <div class="space-y-2 pt-1">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
            <USkeleton class="h-4 w-4/6" />
          </div>
        </div>
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
  </div>
</template>
