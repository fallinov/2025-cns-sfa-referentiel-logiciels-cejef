<script setup lang="ts">
/**
 * SearchBar Component - Orchestrator
 * Uses SearchInput and SearchSuggestions
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
const searchInputComponent = ref<{ focus: () => void, blur: () => void } | null>(null)

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

const emit = defineEmits<{
  "filterByCategory": [category: string]
  "filterByDiscipline": [discipline: string]
  "filterByActivity": [activity: string]
  "search": [query: string]
  "clear": []
  "focus-mode-change": [isFocused: boolean]
}>()

watch(isMobileFocused, (newValue) => {
  emit("focus-mode-change", newValue)
})

// Clean up on unmount
onUnmounted(() => {
  document.body.style.overflow = ""
})

// Popular searches
const popularSearches = [
  { type: "category", label: "Bureautique", icon: "i-lucide-file-text" },
  { type: "category", label: "Programmation", icon: "i-lucide-code" },
  { type: "category", label: "Langues", icon: "i-lucide-languages" },
  { type: "category", label: "Gestion de projet", icon: "i-lucide-folder-kanban" },
  { type: "category", label: "Intelligence artificielle", icon: "i-lucide-brain-circuit" },
  { type: "category", label: "Communication", icon: "i-lucide-message-square" }
]

// Suggestions via composable
const { suggestions, hasSuggestions } = useSearchSuggestions(search)

// Flattened items for keyboard navigation (Must match order in Suggestions.vue)
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

// Actions
const closeSuggestions = () => {
  showSuggestions.value = false
  selectedIndex.value = -1
}

const handleSoftwareClick = (softwareId: string) => {
  navigateTo(`/logiciels/${softwareId}`)
  closeSuggestions()
}

const handleCategoryClick = (category: string) => {
  emit("filterByCategory", category)
  search.value = category
  closeSuggestions()
  searchInputComponent.value?.blur()
}

const handleDisciplineClick = (discipline: string) => {
  emit("filterByDiscipline", discipline)
  search.value = discipline
  closeSuggestions()
  searchInputComponent.value?.blur()
}

const handleActivityClick = (activity: string) => {
  emit("filterByActivity", activity)
  search.value = activity
  closeSuggestions()
  searchInputComponent.value?.blur()
}

const handleSearchSubmit = () => {
  if (!search.value) {
    searchInputComponent.value?.focus()
    return
  }
  closeSuggestions()
  searchInputComponent.value?.blur()
  emit("search", search.value)
}

const handleClear = () => {
  search.value = ""
  emit("clear")
  searchInputComponent.value?.focus()
}

const handleMobileBack = () => {
  isFocused.value = false
  isMobileFocused.value = false
  searchInputComponent.value?.blur()
  document.body.style.overflow = ""
}

// Focus Handlers (received from SearchInput)
const onInputFocus = () => {
  isFocused.value = true
  // search.value = "" // Previously we cleared search on focus? Let's check original... yes we did: search.value = "" in handleFocus.
  // Actually, sometimes user wants to edit query. But original code did `search.value = ""` on focus. I will keep it for consistency.
  search.value = ""
  showSuggestions.value = true
}

const onInputBlur = () => {
  // Delay to allow click
  setTimeout(() => {
    isFocused.value = false
    closeSuggestions()
  }, 200)
}

// Watchers
watch(search, (newValue) => {
  showSuggestions.value = isFocused.value && (newValue.length === 0 || newValue.length >= 2)
  selectedIndex.value = -1
})

// Keyboard Navigation
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
</script>

<template>
  <div
    ref="root"
    class="w-full transition-all duration-300 ease-in-out"
    :class="[
      compact ? '' : 'max-w-3xl mx-auto',
      isMobileFocused ? 'fixed inset-0 z-[9999] bg-gray-100 dark:bg-gray-950/90 backdrop-blur-sm' : 'relative'
    ]"
  >
    <label for="software-search" class="sr-only">
      Rechercher un logiciel
    </label>

    <div
      class="group"
      :class="isMobileFocused ? 'flex flex-col h-full' : 'relative flex items-stretch'"
    >
      <!-- Input Component -->
      <SearchInput
        ref="searchInputComponent"
        v-model="search"
        :is-mobile-focused="isMobileFocused"
        :show-suggestions="showSuggestions"
        :has-suggestions="hasSuggestions"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keydown="handleKeyDown"
        @clear="handleClear"
        @submit="handleSearchSubmit"
        @mobile-back="handleMobileBack"
      />

      <!-- Suggestions Component -->
      <ClientOnly>
        <Transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <SearchSuggestions
            v-if="showSuggestions"
            :suggestions="suggestions"
            :popular-searches="popularSearches"
            :search="search"
            :has-suggestions="hasSuggestions"
            :selected-index="selectedIndex"
            :is-mobile-focused="isMobileFocused"
            @click-category="handleCategoryClick"
            @click-discipline="handleDisciplineClick"
            @click-activity="handleActivityClick"
            @click-software="handleSoftwareClick"
          />
        </Transition>
      </ClientOnly>
    </div>
  </div>
</template>
