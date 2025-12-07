<script setup lang="ts">
/**
 * SearchBar Component - Barre de recherche avec autocomplétion intelligente
 * Suggère des logiciels
 */

interface Props {
  compact?: boolean
  hero?: boolean
}

withDefaults(defineProps<Props>(), {
  compact: false,
  hero: false
})

const search = defineModel<string>("search", { default: "" })

// Focus state
const isFocused = ref(false)
const showSuggestions = ref(false)

// Selected category filter (emitted to parent)
const emit = defineEmits<{
  filterByCategory: [category: string]
  filterByDiscipline: [discipline: string]
  filterByActivity: [activity: string]
  search: [query: string]
  clear: []
}>()

// Suggestions calculées via composable
const { suggestions, hasSuggestions } = useSearchSuggestions(search)

// Gestion des clics
const handleSoftwareClick = (softwareId: string) => {
  navigateTo(`/logiciels/${softwareId}`)
  showSuggestions.value = false
  search.value = ""
}

const handleCategoryClick = (category: string) => {
  emit("filterByCategory", category)
  showSuggestions.value = false
  search.value = category
}

const handleDisciplineClick = (discipline: string) => {
  emit("filterByDiscipline", discipline)
  showSuggestions.value = false
  search.value = discipline
}

const handleActivityClick = (activity: string) => {
  emit("filterByActivity", activity)
  showSuggestions.value = false
  search.value = activity
}

// Keyboard navigation avec composable (doit être après les handlers)
const { selectedIndex, selectedType, handleKeyDown, resetSelection } = useKeyboardNavigation(
  suggestions,
  handleCategoryClick,
  handleDisciplineClick,
  handleActivityClick,
  handleSoftwareClick,
  () => {
    // Si aucun élément n'est sélectionné, on valide la recherche textuelle
    showSuggestions.value = false
    const input = document.getElementById("software-search")
    if (input) input.blur()
  }
)

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
    selectedIndex.value = -1
  }, 200)
}

// Navigation au clavier (gérée par le composable)
// Wrapper pour ajouter la logique de showSuggestions
const handleKeyDownWrapper = (event: KeyboardEvent) => {
  if (!showSuggestions.value) return
  handleKeyDown(event)

  // Gestion de l'Escape pour fermer les suggestions
  if (event.key === "Escape") {
    showSuggestions.value = false
  }
}

// Afficher les suggestions quand la recherche change
watch(search, (newValue) => {
  showSuggestions.value = newValue.length >= 2 && isFocused.value
  resetSelection()
})

// Typewriter Effect
const phrases = [
  "Que cherchez-vous ?",
  "Bureautique...",
  "Gestion de projet...",
  "Langues...",
  "Programmation...",
  "Canva...",
  "Code.org...",
  "Antidote...",
  "Taptouche..."
]

const { placeholderText } = useTypewriter(phrases)

const handleSearchSubmit = () => {
  if (!search.value) {
    searchInput.value?.focus()
    return
  }
  showSuggestions.value = false
  const input = document.getElementById("software-search")
  if (input) input.blur()
  emit("search", search.value)
}

const handleClear = () => {
  search.value = ""
  emit("clear")
}

const searchInput = ref<HTMLInputElement | null>(null)
</script>

<template>
  <div class="w-full relative" :class="compact ? '' : 'max-w-3xl mx-auto'">
    <label
      for="software-search"
      class="sr-only"
    >
      Rechercher un logiciel
    </label>
    <div class="relative group flex items-stretch">
      <div class="relative flex-1">
        <input
          id="software-search"
          ref="searchInput"
          v-model="search"
          type="search"
          autocomplete="off"
          :placeholder="placeholderText"
          class="w-full h-14 pl-6 pr-24 text-lg font-medium tracking-wide text-slate-900 dark:text-slate-100 rounded-[28px] focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 [&::-webkit-search-cancel-button]:appearance-none bg-white dark:bg-gray-800 ring-2 ring-black dark:ring-white shadow-sm focus:ring-2 focus:ring-primary-500"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeyDownWrapper"
        />

        <!-- Right Actions -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 gap-4">
          <!-- Clear Button -->
          <button
            v-if="search"
            type="button"
            class="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none"
            aria-label="Effacer la recherche"
            @click="handleClear"
          >
            <UIcon name="i-lucide-x" class="w-5 h-5" />
          </button>

          <!-- Search Button -->
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white transition-all shadow-sm hover:bg-slate-800 cursor-pointer"
            aria-label="Rechercher"
            @click="handleSearchSubmit"
          >
            <UIcon name="i-lucide-search" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Suggestions dropdown -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0 translate-y-2"
        enter-to-class="transform scale-100 opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100 translate-y-0"
        leave-to-class="transform scale-95 opacity-0 translate-y-2"
      >
        <div
          v-if="showSuggestions && hasSuggestions"
          class="absolute top-full left-0 right-0 mt-2 rounded-[var(--ui-radius)] overflow-hidden z-20 bg-white dark:bg-gray-800 border-2 border-[#1C293C] dark:border-gray-700 shadow-lg"
        >
          <div class="p-2 space-y-2 max-h-96 overflow-y-auto">
            <!-- Search query avec nombre de résultats -->
            <div class="px-3 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl"></div>
            <!-- Catégories correspondantes -->
            <div v-if="suggestions.categories.length > 0">
              <div class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Filtrer par catégorie
              </div>
              <div class="space-y-1">
                <button
                  v-for="(category, index) in suggestions.categories"
                  :key="category"
                  type="button"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group',
                    selectedType === 'category' && index === selectedIndex
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  ]"
                  @click="handleCategoryClick(category)"
                >
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-tag" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="font-medium text-gray-900 dark:text-white">{{ category }}</span>
                  </div>
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            <!-- Disciplines correspondantes -->
            <div v-if="suggestions.disciplines.length > 0">
              <div class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Filtrer par discipline
              </div>
              <div class="space-y-1">
                <button
                  v-for="(discipline, index) in suggestions.disciplines"
                  :key="discipline"
                  type="button"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group',
                    selectedType === 'discipline' && index === selectedIndex
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  ]"
                  @click="handleDisciplineClick(discipline)"
                >
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-book-open" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="font-medium text-gray-900 dark:text-white">{{ discipline }}</span>
                  </div>
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            <!-- Activités pédagogiques correspondantes -->
            <div v-if="suggestions.activities.length > 0">
              <div class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Filtrer par activité
              </div>
              <div class="space-y-1">
                <button
                  v-for="(activity, index) in suggestions.activities"
                  :key="activity"
                  type="button"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group',
                    selectedType === 'activity' && index === selectedIndex
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  ]"
                  @click="handleActivityClick(activity)"
                >
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-graduation-cap" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="font-medium text-gray-900 dark:text-white">{{ activity }}</span>
                  </div>
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            <!-- Logiciels correspondants -->
            <div v-if="suggestions.software.length > 0">
              <div class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Logiciels
              </div>
              <div class="space-y-1">
                <button
                  v-for="(software, index) in suggestions.software"
                  :key="software.id"
                  type="button"
                  :class="[
                    'w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-start gap-3',
                    selectedType === 'software' && index === selectedIndex
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  ]"
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
      </Transition>
    </div>
  </div>
</template>
