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

// Focus state
const isFocused = ref(false)
const showSuggestions = ref(false)

// Selected category filter (emitted to parent)
const emit = defineEmits<{
  filterByCategory: [category: string]
}>()

// Keyboard navigation
const selectedIndex = ref(-1)
const selectedType = ref<"search" | "category" | "software">("search")
const maxCategoryIndex = computed(() => suggestions.value.categories.length - 1)
const maxSoftwareIndex = computed(() => suggestions.value.software.length - 1)

// Normaliser le texte (enlever les accents et mettre en minuscules)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
}

// Suggestions calculées avec catégories
const suggestions = computed(() => {
  if (!search.value || search.value.length < 2) {
    return {
      query: "",
      totalResults: 0,
      categories: [],
      software: []
    }
  }

  const query = normalizeText(search.value.trim())

  // Filtrer les logiciels correspondants
  const matchingSoftware = softwareList.filter(s =>
    normalizeText(s.name).includes(query)
    || normalizeText(s.shortDescription).includes(query)
    || s.categories?.some(cat => normalizeText(cat).includes(query))
    || s.disciplines?.some(disc => normalizeText(disc).includes(query))
    || s.pedagogicalActivities?.some(act => normalizeText(act).includes(query))
  )

  // Extraire les catégories uniques des logiciels correspondants
  // Filtrer seulement celles qui contiennent le texte recherché
  const categoriesSet = new Set<string>()
  matchingSoftware.forEach((s) => {
    s.categories?.forEach((cat) => {
      if (normalizeText(cat).includes(query)) {
        categoriesSet.add(cat)
      }
    })
  })

  const matchingCategories = Array.from(categoriesSet).slice(0, 5)

  return {
    query: search.value,
    totalResults: matchingSoftware.length,
    categories: matchingCategories,
    software: matchingSoftware.slice(0, 6)
  }
})

const hasSuggestions = computed(() => suggestions.value.totalResults > 0)

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
  search.value = ""
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
  const hasSoftware = suggestions.value.software.length > 0

  if (!hasCategories && !hasSoftware) return

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      if (selectedType.value === "search") {
        // Depuis la recherche globale
        if (hasCategories) {
          selectedType.value = "category"
          selectedIndex.value = 0
        } else if (hasSoftware) {
          selectedType.value = "software"
          selectedIndex.value = 0
        }
      } else if (selectedType.value === "category") {
        if (selectedIndex.value < maxCategoryIndex.value) {
          selectedIndex.value++
        } else if (hasSoftware) {
          // Passer aux logiciels
          selectedType.value = "software"
          selectedIndex.value = 0
        }
      } else {
        // Dans les logiciels
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
        } else if (hasCategories) {
          // Revenir aux catégories
          selectedType.value = "category"
          selectedIndex.value = maxCategoryIndex.value
        } else {
          // Revenir à la recherche globale
          selectedType.value = "search"
          selectedIndex.value = -1
        }
      } else if (selectedType.value === "category") {
        // Dans les catégories
        if (selectedIndex.value > 0) {
          selectedIndex.value--
        } else {
          // Revenir à la recherche globale
          selectedType.value = "search"
          selectedIndex.value = -1
        }
      }
      break

    case "Enter":
      event.preventDefault()
      if (selectedType.value === "search") {
        // Appliquer la recherche (ne rien faire, le filtre est déjà actif)
        showSuggestions.value = false
      } else if (selectedType.value === "category" && selectedIndex.value >= 0) {
        const category = suggestions.value.categories[selectedIndex.value]
        if (category) {
          handleCategoryClick(category)
        }
      } else if (selectedType.value === "software" && selectedIndex.value >= 0) {
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
  selectedType.value = "category"
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
        @keydown="handleKeyDown"
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
        <div class="p-2 space-y-2">
          <!-- Search query avec nombre de résultats -->
          <div class="px-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-search" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ suggestions.query }}
                </span>
              </div>
              <UBadge color="primary" variant="soft" size="sm">
                {{ suggestions.totalResults }} résultat{{ suggestions.totalResults > 1 ? 's' : '' }}
              </UBadge>
            </div>
          </div>

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
    </div>
  </div>
</template>
