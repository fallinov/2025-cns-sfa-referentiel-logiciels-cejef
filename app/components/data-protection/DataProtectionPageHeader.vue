<script setup lang="ts">
import type { ThemeAudience } from "~~/types/data-protection"

interface Props {
  searchQuery: string
  audienceFilter: ThemeAudience | "all"
}

const props = defineProps<Props>()

const emit = defineEmits<{
  "update:searchQuery": [value: string]
  "update:audienceFilter": [value: ThemeAudience | "all"]
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

const audienceOptions = [
  { value: "all" as const, label: "Tous" },
  { value: "sen" as const, label: "SEN" },
  { value: "cejef" as const, label: "CEJEF" }
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

    <div class="flex flex-col sm:flex-row gap-3">
      <UInput
        v-model="localSearch"
        icon="i-lucide-search"
        placeholder="Rechercher un thème..."
        class="flex-1"
        :ui="{ root: 'w-full' }"
      />

      <div class="flex rounded-[var(--ui-radius)] overflow-hidden border border-gray-200 dark:border-gray-700">
        <button
          v-for="option in audienceOptions"
          :key="option.value"
          class="px-4 py-2 text-sm font-medium transition-colors"
          :class="audienceFilter === option.value
            ? 'bg-primary-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
          @click="emit('update:audienceFilter', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>
