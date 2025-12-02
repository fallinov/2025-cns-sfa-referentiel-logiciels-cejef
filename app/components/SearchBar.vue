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

// Keyboard navigation
const selectedIndex = ref(-1)
const selectedType = ref<"search" | "category" | "discipline" | "activity" | "software">("search")
const maxCategoryIndex = computed(() => suggestions.value.categories.length - 1)
const maxDisciplineIndex = computed(() => suggestions.value.disciplines.length - 1)
const maxActivityIndex = computed(() => suggestions.value.activities.length - 1)
const maxSoftwareIndex = computed(() => suggestions.value.software.length - 1)

// Suggestions calculées via composable
const { suggestions, hasSuggestions } = useSearchSuggestions(search)

// Gestion des clics
const handleSoftwareClick = (softwareId: string) => {
  navigateTo(`/logiciels/${softwareId}`)
  showSuggestions.value = false
  search.value = ""
  selectedIndex.value = -1
}

const handleCategoryClick = (category: string) => {
  emit("filterByCategory", category)
  showSuggestions.value = false
  search.value = category
  selectedIndex.value = -1
}

const handleDisciplineClick = (discipline: string) => {
  emit("filterByDiscipline", discipline)
  showSuggestions.value = false
  search.value = discipline
  selectedIndex.value = -1
}

const handleActivityClick = (activity: string) => {
  emit("filterByActivity", activity)
  showSuggestions.value = false
  search.value = activity
  selectedIndex.value = -1
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
    selectedIndex.value = -1
  }, 200)
}

// Navigation au clavier
const handleKeyDown = (event: KeyboardEvent) => {
  if (!showSuggestions.value) return

  const hasCategories = suggestions.value.categories.length > 0
  const hasDisciplines = suggestions.value.disciplines.length > 0
  const hasActivities = suggestions.value.activities.length > 0
  const hasSoftware = suggestions.value.software.length > 0

  if (!hasCategories && !hasDisciplines && !hasActivities && !hasSoftware) return

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      if (selectedType.value === "search") {
        if (hasCategories) {
          selectedType.value = "category"
          selectedIndex.value = 0
        } else if (hasDisciplines) {
          selectedType.value = "discipline"
          selectedIndex.value = 0
        } else if (hasActivities) {
          selectedType.value = "activity"
          selectedIndex.value = 0
        } else if (hasSoftware) {
          selectedType.value = "software"
          selectedIndex.value = 0
        }
      } else if (selectedType.value === "category") {
        if (selectedIndex.value < maxCategoryIndex.value) {
          selectedIndex.value++
        } else {
          // Try next sections
          if (hasDisciplines) {
            selectedType.value = "discipline"
            selectedIndex.value = 0
          } else if (hasActivities) {
            selectedType.value = "activity"
            selectedIndex.value = 0
          } else if (hasSoftware) {
            selectedType.value = "software"
            selectedIndex.value = 0
          }
        }
      } else if (selectedType.value === "discipline") {
        if (selectedIndex.value < maxDisciplineIndex.value) {
          selectedIndex.value++
        } else {
          if (hasActivities) {
            selectedType.value = "activity"
            selectedIndex.value = 0
          } else if (hasSoftware) {
            selectedType.value = "software"
            selectedIndex.value = 0
          }
        }
      } else if (selectedType.value === "activity") {
        if (selectedIndex.value < maxActivityIndex.value) {
          selectedIndex.value++
        } else {
          if (hasSoftware) {
            selectedType.value = "software"
            selectedIndex.value = 0
          }
        }
      } else {
        // Software
        if (selectedIndex.value < maxSoftwareIndex.value) {
          selectedIndex.value++
        }
      }
      break

    case "ArrowUp":
      event.preventDefault()
      if (selectedType.value === "software") {
        if (selectedIndex.value > 0) {
          selectedIndex.value--
        } else {
          // Go back to previous sections
          if (hasActivities) {
            selectedType.value = "activity"
            selectedIndex.value = maxActivityIndex.value
          } else if (hasDisciplines) {
            selectedType.value = "discipline"
            selectedIndex.value = maxDisciplineIndex.value
          } else if (hasCategories) {
            selectedType.value = "category"
            selectedIndex.value = maxCategoryIndex.value
          } else {
            selectedType.value = "search"
            selectedIndex.value = -1
          }
        }
      } else if (selectedType.value === "activity") {
        if (selectedIndex.value > 0) {
          selectedIndex.value--
        } else {
          if (hasDisciplines) {
            selectedType.value = "discipline"
            selectedIndex.value = maxDisciplineIndex.value
          } else if (hasCategories) {
            selectedType.value = "category"
            selectedIndex.value = maxCategoryIndex.value
          } else {
            selectedType.value = "search"
            selectedIndex.value = -1
          }
        }
      } else if (selectedType.value === "discipline") {
        if (selectedIndex.value > 0) {
          selectedIndex.value--
        } else {
          if (hasCategories) {
            selectedType.value = "category"
            selectedIndex.value = maxCategoryIndex.value
          } else {
            selectedType.value = "search"
            selectedIndex.value = -1
          }
        }
      } else if (selectedType.value === "category") {
        if (selectedIndex.value > 0) {
          selectedIndex.value--
        } else {
          selectedType.value = "search"
          selectedIndex.value = -1
        }
      }
      break

    case "Enter":
      event.preventDefault()
      if (selectedIndex.value === -1) {
        // Si aucun élément n'est sélectionné, on valide la recherche textuelle
        showSuggestions.value = false
        // Le filtre est déjà appliqué via v-model, on enlève juste le focus pour masquer le clavier sur mobile
        const input = document.getElementById("software-search")
        if (input) input.blur()
      } else if (selectedType.value === "category") {
        const category = suggestions.value.categories[selectedIndex.value]
        if (category) {
          handleCategoryClick(category)
        }
      } else if (selectedType.value === "discipline") {
        const discipline = suggestions.value.disciplines[selectedIndex.value]
        if (discipline) handleDisciplineClick(discipline)
      } else if (selectedType.value === "activity") {
        const activity = suggestions.value.activities[selectedIndex.value]
        if (activity) handleActivityClick(activity)
      } else if (selectedType.value === "software") {
        const software = suggestions.value.software[selectedIndex.value]
        if (software) {
          handleSoftwareClick(software.id)
        }
      }
      break

    case "Escape":
      showSuggestions.value = false
      selectedIndex.value = -1
      selectedType.value = "search"
      break
  }
}

// Afficher les suggestions quand la recherche change
watch(search, (newValue) => {
  showSuggestions.value = newValue.length >= 2 && isFocused.value
  selectedIndex.value = -1
  selectedType.value = "category" // Reset to first potential section, logic in render will handle empty sections
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

onMounted(() => {
  // Focus input on mount
  setTimeout(() => {
    searchInput.value?.focus()
  }, 100)
})
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
          class="w-full h-14 pl-6 pr-24 text-lg font-medium tracking-wide text-slate-900 dark:text-slate-100 rounded-[28px] focus:outline-none transition-all placeholder-slate-900/50 dark:placeholder-slate-100/50 [&::-webkit-search-cancel-button]:appearance-none bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/70 backdrop-blur-2xl ring-2 ring-inset ring-slate-900 dark:ring-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_32px_0_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] focus:ring-2 focus:ring-primary-500/50"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeyDown"
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
            class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white transition-all shadow-sm hover:bg-slate-800"
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
          class="absolute top-full left-0 right-0 mt-2 rounded-[24px] overflow-hidden z-20 bg-gradient-to-b from-white/90 via-white/80 to-white/60 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/60 backdrop-blur-2xl ring-1 ring-inset ring-white/50 dark:ring-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_32px_0_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
        >
          <div class="p-2 space-y-2 max-h-96 overflow-y-auto">
            <!-- Search query avec nombre de résultats -->
            <div class="px-3 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm"></div>
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
