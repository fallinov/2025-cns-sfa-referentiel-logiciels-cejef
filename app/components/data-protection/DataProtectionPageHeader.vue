<script setup lang="ts">
interface Props {
  searchQuery: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  "update:searchQuery": [value: string]
}>()

const localSearch = ref(props.searchQuery)
const isFocused = ref(false)

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

const phrases = [
  "Microsoft 365...",
  "Sécurité réseau...",
  "Téléphone portable...",
  "Droit à l'image...",
  "Intelligence artificielle...",
  "edu.jura.ch...",
  "WebUntis...",
  "Edulog...",
  "Diagnophish..."
]

const { placeholderText } = useTypewriter(phrases)

const displayPlaceholder = computed(() => {
  return isFocused.value ? "Rechercher..." : placeholderText.value
})
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

    <div class="max-w-2xl mx-auto">
      <!-- Search pill avec typewriter -->
      <div class="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md rounded-full transition-shadow">
        <input
          v-model="localSearch"
          type="search"
          :placeholder="displayPlaceholder"
          class="w-full h-12 sm:h-14 pl-12 pr-12 text-base text-slate-900 dark:text-slate-100 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 [&::-webkit-search-cancel-button]:appearance-none bg-transparent rounded-full"
          aria-label="Rechercher un thème de protection des données"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
        <div class="absolute top-0 left-0 h-12 sm:h-14 flex items-center pl-4">
          <UIcon name="i-lucide-search" class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
        <div v-if="localSearch" class="absolute top-0 right-0 h-12 sm:h-14 flex items-center pr-3">
          <button
            type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Effacer la recherche"
            @click="handleClear"
          >
            <UIcon name="i-lucide-x" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
