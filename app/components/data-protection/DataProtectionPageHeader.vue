<script setup lang="ts">
import type { ThemeAudience } from "~~/types/data-protection"

interface Props {
  searchQuery: string
  audienceFilter: ThemeAudience
}

const props = defineProps<Props>()

const emit = defineEmits<{
  "update:searchQuery": [value: string]
  "update:audienceFilter": [value: ThemeAudience]
}>()

const localSearch = ref(props.searchQuery)

const { debounce } = useDebounce()

watch(localSearch, (val) => {
  debounce(() => emit("update:searchQuery", val), 300)
})

watch(() => props.searchQuery, (val) => {
  if (val !== localSearch.value) localSearch.value = val
})

function useDebounce() {
  let timer: ReturnType<typeof setTimeout> | null = null
  return {
    debounce(fn: () => void, ms: number) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(fn, ms)
    }
  }
}

const handleClear = () => {
  localSearch.value = ""
  emit("update:searchQuery", "")
}

const audienceOptions: { value: ThemeAudience, label: string }[] = [
  { value: "sen", label: "SEN" },
  { value: "cejef", label: "CEJEF" }
]
</script>

<template>
  <div class="mb-8 px-4 sm:px-0">
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Protection des données
      </h1>
      <p class="mt-2 text-base text-gray-600 dark:text-gray-400">
        Mesures prises par le Canton du Jura pour la protection des données dans l'enseignement.
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
      <!-- Search pill -->
      <div class="relative flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md rounded-full transition-shadow">
        <input
          v-model="localSearch"
          type="search"
          placeholder="Rechercher un thème..."
          class="w-full h-12 sm:h-14 pl-12 pr-12 text-base text-slate-900 dark:text-slate-100 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 [&::-webkit-search-cancel-button]:appearance-none bg-transparent rounded-full"
          aria-label="Rechercher un thème de protection des données"
        />
        <div class="absolute top-0 left-0 h-12 sm:h-14 flex items-center pl-4">
          <UIcon name="i-lucide-search" class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
        <div v-if="localSearch" class="absolute top-0 right-0 h-12 sm:h-14 flex items-center pr-3">
          <button
            type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full"
            aria-label="Effacer la recherche"
            @click="handleClear"
          >
            <UIcon name="i-lucide-x" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Audience toggle pills -->
      <div class="flex gap-2 justify-center sm:justify-start" role="group" aria-label="Filtrer par service">
        <button
          v-for="option in audienceOptions"
          :key="option.value"
          class="px-5 h-11 sm:h-auto sm:py-3 text-sm font-medium rounded-full border transition-all"
          :class="audienceFilter === option.value
            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600'"
          :aria-pressed="audienceFilter === option.value"
          @click="emit('update:audienceFilter', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>
