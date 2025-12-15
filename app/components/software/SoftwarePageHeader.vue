<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const store = useSoftwareStore()
const {
  searchQuery
} = storeToRefs(store)

const {
  handleCategoryFilter,
  handleDisciplineFilter,
  handleActivityFilter,
  resetFilters
} = store

const isSearchFocused = ref(false)

const handleGlobalSearch = (query: string) => {
  resetFilters()
  searchQuery.value = query
}

const handleSearchClear = () => {
  searchQuery.value = ""
}
</script>

<template>
  <div
    class="relative mb-8 px-4 sm:px-0"
    :class="isSearchFocused ? 'z-[100]' : 'z-30'"
  >
    <!-- Search Bar Area -->
    <div class="mb-4">
      <SearchBar
        v-model:search="searchQuery"
        @filter-by-category="handleCategoryFilter"
        @filter-by-discipline="handleDisciplineFilter"
        @filter-by-activity="handleActivityFilter"
        @search="handleGlobalSearch"
        @clear="handleSearchClear"
        @focus-mode-change="isSearchFocused = $event"
      />
    </div>
  </div>
</template>
