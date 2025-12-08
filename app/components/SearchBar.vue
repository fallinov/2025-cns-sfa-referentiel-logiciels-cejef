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

// Focus state
const isFocused = ref(false)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

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
}

const handleDisciplineClick = (discipline: string) => {
  emit("filterByDiscipline", discipline)
  search.value = discipline
  closeSuggestions()
}

const handleActivityClick = (activity: string) => {
  emit("filterByActivity", activity)
  search.value = activity
  closeSuggestions()
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
  if (search.value.length >= 2) {
    showSuggestions.value = true
  }
}

const handleBlur = () => {
  isFocused.value = false
  // Délai pour permettre le clic sur les suggestions
  setTimeout(() => {
    closeSuggestions()
  }, 200)
}

// Afficher les suggestions quand la recherche change
watch(search, (newValue) => {
  showSuggestions.value = newValue.length >= 2 && isFocused.value
  selectedIndex.value = -1
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
  closeSuggestions()
  searchInput.value?.blur()
  emit("search", search.value)
}

const handleClear = () => {
  search.value = ""
  emit("clear")
  searchInput.value?.focus()
}

const searchInput = ref<HTMLInputElement | null>(null)
</script>

<template>
  <div
    class="w-full relative"
    :class="compact ? '' : 'max-w-3xl mx-auto'"
  >
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
          class="w-full h-14 pl-6 pr-28 text-lg font-medium tracking-wide text-slate-900 dark:text-slate-100 rounded-[28px] focus:outline-none transition-all placeholder-black dark:placeholder-white [&::-webkit-search-cancel-button]:appearance-none bg-white dark:bg-gray-800 ring-2 ring-black dark:ring-white shadow-sm focus:ring-2 focus:ring-primary-500"
          aria-label="Rechercher un logiciel"
          :aria-expanded="showSuggestions && hasSuggestions"
          aria-autocomplete="list"
          role="combobox"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeyDown"
        />

        <!-- Right Actions -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 gap-3">
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

          <!-- Search Button -->
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
          role="listbox"
          class="absolute top-full left-0 right-0 mt-2 rounded-[var(--ui-radius)] overflow-hidden z-20 bg-white dark:bg-gray-800 border border-[#1C293C] dark:border-gray-700 shadow-lg"
        >
          <div class="p-2 space-y-2 max-h-96 overflow-y-auto">
            <!-- Catégories correspondantes -->
            <div v-if="suggestions.categories.length > 0">
              <div class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Filtrer par catégorie
              </div>
              <div class="space-y-1">
                <button
                  v-for="(category, index) in suggestions.categories"
                  :key="`category-${category}`"
                  type="button"
                  role="option"
                  :aria-selected="isItemSelected('category', index)"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group',
                    isItemSelected('category', index)
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  ]"
                  @click="handleCategoryClick(category)"
                >
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-tag"
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    />
                    <span class="font-medium text-gray-900 dark:text-white">{{ category }}</span>
                  </div>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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
                  :key="`discipline-${discipline}`"
                  type="button"
                  role="option"
                  :aria-selected="isItemSelected('discipline', index)"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group',
                    isItemSelected('discipline', index)
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  ]"
                  @click="handleDisciplineClick(discipline)"
                >
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-book-open"
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    />
                    <span class="font-medium text-gray-900 dark:text-white">{{ discipline }}</span>
                  </div>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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
                  :key="`activity-${activity}`"
                  type="button"
                  role="option"
                  :aria-selected="isItemSelected('activity', index)"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group',
                    isItemSelected('activity', index)
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  ]"
                  @click="handleActivityClick(activity)"
                >
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-graduation-cap"
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    />
                    <span class="font-medium text-gray-900 dark:text-white">{{ activity }}</span>
                  </div>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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
                  :key="`software-${software.id}`"
                  type="button"
                  role="option"
                  :aria-selected="isItemSelected('software', index)"
                  :class="[
                    'w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-start gap-3',
                    isItemSelected('software', index)
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
