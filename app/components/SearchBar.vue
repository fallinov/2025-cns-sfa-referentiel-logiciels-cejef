<script setup lang="ts">
import { categories as categoryData } from "~/data/categories"
import { disciplines as disciplineData } from "~/data/disciplines"

/**
 * SearchBar Component - Barre de recherche avec autocomplétion intelligente
 * Suggère des logiciels et des filtres regroupés par catégorie
 */

const search = defineModel<string>("search", { default: "" })
const emit = defineEmits<{
  selectSoftware: [id: string]
  selectCategory: [id: string]
  selectDiscipline: [id: string]
}>()

const { getSoftwareList } = useSoftware()
const softwareList = getSoftwareList()
const router = useRouter()

// Focus state
const isFocused = ref(false)
const showSuggestions = ref(false)

// Suggestions calculées
const suggestions = computed(() => {
  if (!search.value || search.value.length < 2) {
    return {
      software: [],
      categories: [],
      disciplines: []
    }
  }

  const query = search.value.toLowerCase().trim()

  // Suggestions de logiciels
  const softwareMatches = softwareList
    .filter(s =>
      s.name.toLowerCase().includes(query)
      || s.shortDescription.toLowerCase().includes(query)
    )
    .slice(0, 5)

  // Suggestions de catégories
  const categoryMatches = categoryData
    .filter(c => c.name.toLowerCase().includes(query))
    .slice(0, 3)

  // Suggestions de disciplines
  const disciplineMatches = disciplineData
    .filter(d => d.name.toLowerCase().includes(query))
    .slice(0, 3)

  return {
    software: softwareMatches,
    categories: categoryMatches,
    disciplines: disciplineMatches
  }
})

const hasSuggestions = computed(() =>
  suggestions.value.software.length > 0
  || suggestions.value.categories.length > 0
  || suggestions.value.disciplines.length > 0
)

// Gestion des clics
const handleSoftwareClick = (softwareId: string) => {
  router.push(`/logiciels/${softwareId}`)
  showSuggestions.value = false
  search.value = ""
}

const handleCategoryClick = (categoryId: string) => {
  emit("selectCategory", categoryId)
  showSuggestions.value = false
  search.value = ""
}

const handleDisciplineClick = (disciplineId: string) => {
  emit("selectDiscipline", disciplineId)
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
  <div class="w-full max-w-3xl mx-auto relative">
    <label
      for="software-search"
      class="block text-lg font-semibold text-gray-900 dark:text-white mb-3"
    >
      Rechercher un logiciel
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
        <UIcon
          name="i-lucide-search"
          class="w-6 h-6 text-gray-400 dark:text-gray-500"
        />
      </div>
      <input
        id="software-search"
        v-model="search"
        type="search"
        autocomplete="off"
        placeholder="Rechercher un logiciel, une catégorie, une discipline…"
        class="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/40 focus:border-primary-500 transition-all relative z-10"
        :class="{ 'ring-4 ring-primary-500/40 border-primary-500': isFocused, 'rounded-b-none': showSuggestions && hasSuggestions }"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button
        v-if="search"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full z-10"
        aria-label="Effacer la recherche"
        @click="search = ''"
      >
        <UIcon name="i-lucide-x" class="w-6 h-6" />
      </button>

      <!-- Suggestions dropdown -->
      <div
        v-if="showSuggestions && hasSuggestions"
        class="absolute top-full left-0 right-0 -mt-2 bg-white dark:bg-gray-900 border-2 border-t-0 border-gray-300 dark:border-gray-700 rounded-b-2xl shadow-xl max-h-96 overflow-y-auto z-20"
      >
        <!-- Suggestions de logiciels -->
        <div v-if="suggestions.software.length" class="p-2">
          <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <UIcon name="i-lucide-package" class="w-3 h-3 inline mr-1" />
            Logiciels
          </div>
          <button
            v-for="software in suggestions.software"
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

        <USeparator v-if="suggestions.software.length && (suggestions.categories.length || suggestions.disciplines.length)" />

        <!-- Suggestions de catégories -->
        <div v-if="suggestions.categories.length" class="p-2">
          <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <UIcon name="i-lucide-tag" class="w-3 h-3 inline mr-1" />
            Catégories
          </div>
          <button
            v-for="category in suggestions.categories"
            :key="category.id"
            type="button"
            class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            @click="handleCategoryClick(category.id)"
          >
            <div class="font-medium text-gray-900 dark:text-white">
              {{ category.name }}
            </div>
          </button>
        </div>

        <USeparator v-if="suggestions.categories.length && suggestions.disciplines.length" />

        <!-- Suggestions de disciplines -->
        <div v-if="suggestions.disciplines.length" class="p-2">
          <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <UIcon name="i-lucide-layers" class="w-3 h-3 inline mr-1" />
            Disciplines
          </div>
          <button
            v-for="discipline in suggestions.disciplines"
            :key="discipline.id"
            type="button"
            class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            @click="handleDisciplineClick(discipline.id)"
          >
            <div class="font-medium text-gray-900 dark:text-white">
              {{ discipline.name }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
