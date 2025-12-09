<script setup lang="ts">
/**
 * SearchBar Component - Barre de recherche inline avec fuzzy search
 * Optimisé pour UX mobile et desktop avec navigation clavier simplifiée
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

// Refs
const root = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const suggestionsContainer = ref<HTMLElement | null>(null)

// Focus state
const isFocused = ref(false)
const isMobileFocused = ref(false)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

// Detect mobile size
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640) // sm breakpoint

// Watch focus and mobile state to trigger fullscreen mode
watch([isFocused, isMobile], ([focused, mobile]) => {
  if (focused && mobile) {
    isMobileFocused.value = true
    document.body.style.overflow = "hidden" // Prevent background scrolling
  } else if (!focused) {
    // Delay slightly to allow click events to register
    setTimeout(() => {
      isMobileFocused.value = false
      document.body.style.overflow = ""
    }, 200)
  }
})

// Clean up on unmount
onUnmounted(() => {
  document.body.style.overflow = ""
})

// Popular searches (suggestions when field is empty)
const popularSearches = [
  { type: "category", label: "Bureautique", icon: "i-lucide-file-text" },
  { type: "category", label: "Programmation", icon: "i-lucide-code" },
  { type: "category", label: "Langues", icon: "i-lucide-languages" },
  { type: "category", label: "Gestion de projet", icon: "i-lucide-folder-kanban" },
  { type: "category", label: "Intelligence artificielle", icon: "i-lucide-brain-circuit" },
  { type: "category", label: "Communication", icon: "i-lucide-message-square" }
]

// Selected category filter (emitted to parent)
const emit = defineEmits<{
  filterByCategory: [category: string]
  filterByDiscipline: [discipline: string]
  filterByActivity: [activity: string]
  search: [query: string]
  clear: []
}>()

// Suggestions calculées via composable avec fuzzy search
const { suggestions, hasSuggestions } = useSearchSuggestions(search)

// Calculer le nombre total d'items suggérés
const allSuggestionItems = computed(() => {
  const items: Array<{ type: string, value: string, index: number }> = []
  let globalIndex = 0

  suggestions.value.categories.forEach((cat) => {
    items.push({ type: "category", value: cat, index: globalIndex++ })
  })

  suggestions.value.disciplines.forEach((disc) => {
    items.push({ type: "discipline", value: disc, index: globalIndex++ })
  })

  suggestions.value.activities.forEach((act) => {
    items.push({ type: "activity", value: act, index: globalIndex++ })
  })

  suggestions.value.software.forEach((soft) => {
    items.push({ type: "software", value: soft.id, index: globalIndex++ })
  })

  return items
})

// Gestion des clics
const handleSoftwareClick = (softwareId: string) => {
  navigateTo(`/logiciels/${softwareId}`)
  closeSuggestions()
}

const handleCategoryClick = (category: string) => {
  emit("filterByCategory", category)
  search.value = category
  closeSuggestions()
  searchInput.value?.blur()
}

const handleDisciplineClick = (discipline: string) => {
  emit("filterByDiscipline", discipline)
  search.value = discipline
  closeSuggestions()
  searchInput.value?.blur()
}

const handleActivityClick = (activity: string) => {
  emit("filterByActivity", activity)
  search.value = activity
  closeSuggestions()
  searchInput.value?.blur()
}

const closeSuggestions = () => {
  showSuggestions.value = false
  selectedIndex.value = -1
}

// Sélectionner un item par son index global
const selectItemAtIndex = (index: number) => {
  const item = allSuggestionItems.value[index]
  if (!item) return

  switch (item.type) {
    case "category":
      handleCategoryClick(item.value)
      break
    case "discipline":
      handleDisciplineClick(item.value)
      break
    case "activity":
      handleActivityClick(item.value)
      break
    case "software":
      handleSoftwareClick(item.value)
      break
  }
}

// Navigation clavier simplifiée (sans le composable de 230 lignes)
const handleKeyDown = (event: KeyboardEvent) => {
  if (!showSuggestions.value) return

  const totalItems = allSuggestionItems.value.length

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      selectedIndex.value = selectedIndex.value < totalItems - 1
        ? selectedIndex.value + 1
        : 0
      break

    case "ArrowUp":
      event.preventDefault()
      selectedIndex.value = selectedIndex.value > 0
        ? selectedIndex.value - 1
        : totalItems - 1
      break

    case "Enter":
      event.preventDefault()
      if (selectedIndex.value >= 0 && selectedIndex.value < totalItems) {
        selectItemAtIndex(selectedIndex.value)
      } else {
        handleSearchSubmit()
      }
      break

    case "Escape":
      event.preventDefault()
      closeSuggestions()
      break
  }
}

// Helper pour vérifier si un item est sélectionné
const isItemSelected = (type: string, localIndex: number) => {
  let currentGlobalIndex = 0

  // Calculer l'index global de cet item
  if (type === "category") {
    return selectedIndex.value === currentGlobalIndex + localIndex
  }

  currentGlobalIndex += suggestions.value.categories.length

  if (type === "discipline") {
    return selectedIndex.value === currentGlobalIndex + localIndex
  }

  currentGlobalIndex += suggestions.value.disciplines.length

  if (type === "activity") {
    return selectedIndex.value === currentGlobalIndex + localIndex
  }

  currentGlobalIndex += suggestions.value.activities.length

  if (type === "software") {
    return selectedIndex.value === currentGlobalIndex + localIndex
  }

  return false
}

// Gestion du focus
const handleFocus = () => {
  isFocused.value = true
  // Clear search on focus
  search.value = ""
  // Always show suggestions on focus (popular searches or results)
  showSuggestions.value = true
}

const handleMobileBack = () => {
  isFocused.value = false
  isMobileFocused.value = false
  searchInput.value?.blur()
  document.body.style.overflow = ""
}

const handleBlur = () => {
  // Délai pour permettre le clic sur les suggestions
  setTimeout(() => {
    isFocused.value = false
    closeSuggestions()
  }, 200)
}

// Afficher les suggestions quand la recherche change
watch(search, (newValue) => {
  // Afficher les suggestions si recherche vide (populaires) OU si >= 2 caractères
  showSuggestions.value = isFocused.value && (newValue.length === 0 || newValue.length >= 2)
  selectedIndex.value = -1
})

// Scroll vers l'élément sélectionné
watch(selectedIndex, async (newIndex) => {
  if (newIndex === -1 || !suggestionsContainer.value) return

  await nextTick()
  const selectedElement = suggestionsContainer.value.querySelector(`[aria-selected="true"]`) as HTMLElement

  if (selectedElement) {
    selectedElement.scrollIntoView({ block: "nearest" })
  }
})

// Typewriter Effect (disabled when focused)
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

// Show static placeholder when focused, typewriter effect when not
const displayPlaceholder = computed(() => {
  return isFocused.value ? "Rechercher..." : placeholderText.value
})

const handleSearchSubmit = () => {
  if (!search.value) {
    searchInput.value?.focus()
    return
  }
  closeSuggestions()
  searchInput.value?.blur()
  emit("search", search.value)
}

const handleClear = () => {
  search.value = ""
  emit("clear")
  searchInput.value?.focus()
}
</script>

<template>
  <div
    ref="root"
    class="w-full transition-all duration-300 ease-in-out"
    :class="[
      compact ? '' : 'max-w-3xl mx-auto',
      isMobileFocused ? 'fixed inset-0 z-[9999] bg-gray-50 dark:bg-gray-950/90 backdrop-blur-sm' : 'relative'
    ]"
  >
    <label
      for="software-search"
      class="sr-only"
    >
      Rechercher un logiciel
    </label>

    <div
      class="group"
      :class="isMobileFocused ? 'flex flex-col h-full' : 'relative flex items-stretch'"
    >

      <!-- Input Layer -->
      <div
        :class="[
          isMobileFocused ? 'shrink-0 p-3 bg-white dark:bg-gray-900 flex items-center gap-3' : 'relative flex-1 transition-all duration-200'
        ]"
      >
        <!-- The Input Pill -->
        <div
          class="flex-1"
          :class="[
            'relative z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md rounded-full',
             isMobileFocused ? 'shadow-none' : ''
          ]"
        >
          <input
            id="software-search"
            ref="searchInput"
            v-model="search"
            type="search"
            autocomplete="off"
            :placeholder="displayPlaceholder"
            class="w-full h-14 pl-6 pr-28 text-base text-slate-900 dark:text-slate-100 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 [&::-webkit-search-cancel-button]:appearance-none bg-transparent rounded-full"
            aria-label="Rechercher un logiciel"
            :aria-expanded="showSuggestions && hasSuggestions"
            aria-autocomplete="list"
            role="combobox"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeyDown"
          />

          <!-- Right Actions (Inside Pill) -->
          <div class="absolute top-0 right-0 h-14 flex items-center pr-3 gap-3">
            <!-- Clear Button -->
            <button
              v-if="search"
              type="button"
              class="flex items-center justify-center w-11 h-11 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
              aria-label="Effacer la recherche"
              @click="handleClear"
            >
              <UIcon name="i-lucide-x" class="w-5 h-5" />
            </button>

            <!-- Search Button (Icon) -->
            <button
              type="button"
              class="flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-all shadow-sm hover:bg-slate-800 dark:hover:bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Lancer la recherche"
              @click="handleSearchSubmit"
            >
              <UIcon name="i-lucide-search" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Mobile Close Button (Outside Pill) -->
        <button
          v-if="isMobileFocused"
          type="button"
          class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          @click="handleMobileBack"
        >
          <UIcon name="i-lucide-arrow-left" class="w-6 h-6" />
        </button>
      </div>

      <!-- Suggestions Layer -->
      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="showSuggestions"
          role="listbox"
          :class="[
            isMobileFocused
              ? 'flex-1 overflow-y-auto custom-scrollbar relative w-full h-full bg-white dark:bg-gray-900'
              : 'absolute z-10 left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl pb-2 overflow-hidden'
          ]"
        >
          <div
            ref="suggestionsContainer"
            :class="[
              'overflow-y-auto custom-scrollbar',
              isMobileFocused ? 'min-h-full py-4' : 'max-h-96 py-2'
            ]"
          >
            <!-- Popular searches (when search is empty) -->
            <div v-if="search.length === 0">
              <button
                v-for="(item, index) in popularSearches"
                :key="`popular-${index}`"
                type="button"
                role="option"
                :aria-selected="selectedIndex === index"
                :class="[
                  'w-full text-left px-5 py-2.5 transition-colors flex items-center gap-4',
                  selectedIndex === index
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                ]"
                @click="handleCategoryClick(item.label)"
              >
                <UIcon
                  :name="item.icon"
                  class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
                />
                <span class="text-sm text-gray-900 dark:text-white">{{ item.label }}</span>
                <span class="ml-auto text-xs text-gray-400">Recherche populaire</span>
              </button>
            </div>

            <!-- Regular search results (when typing) -->
            <div v-else-if="search.length >= 2 && hasSuggestions">
              <div v-if="suggestions.categories.length > 0">
                <div class="px-5 py-2 mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégories
                </div>
                  <button
                    v-for="(category, index) in suggestions.categories"
                    :key="`category-${category}`"
                    type="button"
                    role="option"
                    :aria-selected="isItemSelected('category', index)"
                    :class="[
                      'w-full text-left px-5 py-2.5 transition-colors flex items-center gap-4',
                      isItemSelected('category', index)
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    ]"
                    @click="handleCategoryClick(category)"
                  >
                    <UIcon
                      name="i-lucide-tag"
                      class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
                    />
                    <span class="text-sm text-gray-900 dark:text-white">{{ category }}</span>
                  </button>
                </div>

                <div v-if="suggestions.disciplines.length > 0">
                  <div class="px-5 py-2 mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Disciplines
                  </div>
                  <button
                    v-for="(discipline, index) in suggestions.disciplines"
                    :key="`discipline-${discipline}`"
                    type="button"
                    role="option"
                    :aria-selected="isItemSelected('discipline', index)"
                    :class="[
                      'w-full text-left px-5 py-2.5 transition-colors flex items-center gap-4',
                      isItemSelected('discipline', index)
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    ]"
                    @click="handleDisciplineClick(discipline)"
                  >
                    <UIcon
                      name="i-lucide-book-open"
                      class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
                    />
                    <span class="text-sm text-gray-900 dark:text-white">{{ discipline }}</span>
                  </button>
                </div>

                <div v-if="suggestions.activities.length > 0">
                  <div class="px-5 py-2 mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Activités
                  </div>
                  <button
                    v-for="(activity, index) in suggestions.activities"
                    :key="`activity-${activity}`"
                    type="button"
                    role="option"
                    :aria-selected="isItemSelected('activity', index)"
                    :class="[
                      'w-full text-left px-5 py-2.5 transition-colors flex items-center gap-4',
                      isItemSelected('activity', index)
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    ]"
                    @click="handleActivityClick(activity)"
                  >
                    <UIcon
                      name="i-lucide-graduation-cap"
                      class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
                    />
                    <span class="text-sm text-gray-900 dark:text-white">{{ activity }}</span>
                  </button>
                </div>

                <div v-if="suggestions.software.length > 0">
                  <div class="px-5 py-2 mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Logiciels
                  </div>
                  <button
                    v-for="(software, index) in suggestions.software"
                    :key="`software-${software.id}`"
                    type="button"
                    role="option"
                    :aria-selected="isItemSelected('software', index)"
                    :class="[
                      'w-full text-left px-5 py-3 transition-colors flex items-start gap-4',
                      isItemSelected('software', index)
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    ]"
                    @click="handleSoftwareClick(software.id)"
                  >
                    <UIcon
                      :name="software.icon || 'i-lucide-package'"
                      class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5"
                    />
                    <div class="flex-1 min-w-0">
                      <div class="text-sm text-gray-900 dark:text-white truncate">
                        {{ software.name }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {{ software.shortDescription }}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Empty state (when no results) -->
              <div v-else-if="search.length >= 2 && !hasSuggestions">
                <div class="p-8 text-center">
                  <UIcon
                    name="i-lucide-search-x"
                    class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3"
                  />
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    Aucun résultat pour "{{ search }}"
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar for Webkit (Chrome, Safari, Edge) */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0; /* gray-200 */
  border-radius: 20px;
  border: 3px solid transparent;
  background-clip: content-box;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* gray-300 */
}

/* Dark mode */
:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #374151; /* gray-700 */
}

:global(.dark) .custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #4b5563; /* gray-600 */
}
</style>
