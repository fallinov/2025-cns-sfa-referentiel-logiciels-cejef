<script setup lang="ts">
/**
 * SearchBar Component - Barre de recherche avec autocomplétion intelligente
 * Suggère des logiciels
 */

interface Props {
  compact?: boolean
}

withDefaults(defineProps<Props>(), {
  compact: false
})

const search = defineModel<string>("search", { default: "" })

const { getSoftwareList } = useSoftware()
const softwareList = getSoftwareList()
const router = useRouter()

// Focus state
const isFocused = ref(false)
const showSuggestions = ref(false)

// Suggestions calculées
const suggestions = computed(() => {
  if (!search.value || search.value.length < 2) {
    return []
  }

  const query = search.value.toLowerCase().trim()

  // Suggestions de logiciels
  return softwareList
    .filter(s =>
      s.name.toLowerCase().includes(query)
      || s.shortDescription.toLowerCase().includes(query)
    )
    .slice(0, 8)
})

const hasSuggestions = computed(() => suggestions.value.length > 0)

// Gestion des clics
const handleSoftwareClick = (softwareId: string) => {
  router.push(`/logiciels/${softwareId}`)
  showSuggestions.value = false
  search.value = ""
}

// Gestion du focus
const handleFocus = () => {
  isFocused.value = true
  if (search.value.length >= 2) {
    showSuggestions.value = true
  }
}

const handleBlur = () => {
  isFocused.value = false
  // Délai pour permettre le clic sur les suggestions
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// Afficher les suggestions quand la recherche change
watch(search, (newValue) => {
  showSuggestions.value = newValue.length >= 2 && isFocused.value
})
</script>

<template>
  <div class="w-full relative" :class="compact ? '' : 'max-w-3xl mx-auto'">
    <label
      v-if="!compact"
      for="software-search"
      class="block text-lg font-semibold text-gray-900 dark:text-white mb-3"
    >
      Rechercher un logiciel
    </label>
    <div class="relative">
      <div :class="compact ? 'pl-3' : 'pl-4'" class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-10">
        <UIcon
          name="i-lucide-search"
          :class="compact ? 'w-5 h-5' : 'w-6 h-6'"
          class="text-gray-400 dark:text-gray-500"
        />
      </div>
      <input
        id="software-search"
        v-model="search"
        type="search"
        autocomplete="off"
        :placeholder="compact ? 'Rechercher…' : 'Rechercher un logiciel, une catégorie, une discipline…'"
        :class="[
          'w-full pr-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all relative z-10',
          '[&::-webkit-search-cancel-button]:appearance-none',
          compact
            ? 'pl-10 py-2 text-base rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500'
            : 'pl-12 py-4 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-primary-500/40 focus:border-primary-500',
          {
            'ring-2 ring-primary-500/40 border-primary-500': isFocused && compact,
            'ring-4 ring-primary-500/40 border-primary-500': isFocused && !compact,
            'rounded-b-none': showSuggestions && hasSuggestions
          }
        ]"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button
        v-if="search"
        type="button"
        :class="compact ? 'pr-3' : 'pr-4'"
        class="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full z-10"
        aria-label="Effacer la recherche"
        @click="search = ''"
      >
        <UIcon :class="compact ? 'w-5 h-5' : 'w-6 h-6'" name="i-lucide-x" />
      </button>

      <!-- Suggestions dropdown -->
      <div
        v-if="showSuggestions && hasSuggestions"
        class="absolute top-full left-0 right-0 -mt-2 bg-white dark:bg-gray-900 border-2 border-t-0 border-gray-300 dark:border-gray-700 rounded-b-2xl shadow-xl max-h-96 overflow-y-auto z-20"
      >
        <!-- Suggestions de logiciels -->
        <div class="p-2">
          <button
            v-for="software in suggestions"
            :key="software.id"
            type="button"
            class="w-full text-left px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-start gap-3"
            @click="handleSoftwareClick(software.id)"
          >
            <UIcon
              :name="software.icon || 'i-lucide-package'"
              class="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0 mt-0.5"
            />
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-gray-900 dark:text-white truncate">
                {{ software.name }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {{ software.shortDescription }}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
