<script setup lang="ts">
import type { Software } from "~/types/software"

interface Suggestions {
  categories: string[]
  disciplines: string[]
  activities: string[]
  software: Software[]
}

interface PopularSearch {
  type: string
  label: string
  icon: string
}

const props = defineProps<{
  suggestions: Suggestions
  popularSearches: PopularSearch[]
  search: string
  hasSuggestions: boolean
  selectedIndex: number
  isMobileFocused: boolean
}>()

const emit = defineEmits<{
  clickCategory: [category: string]
  clickDiscipline: [discipline: string]
  clickActivity: [activity: string]
  clickSoftware: [id: string]
}>()

const suggestionsContainer = ref<HTMLElement | null>(null)

// Helper to match the flat index from parent to the visual item
const isItemSelected = (type: string, localIndex: number) => {
  let currentGlobalIndex = 0

  // Order MUST match parent's flat list construction
  if (type === "category") {
    return props.selectedIndex === currentGlobalIndex + localIndex
  }
  currentGlobalIndex += props.suggestions.categories.length

  if (type === "discipline") {
    return props.selectedIndex === currentGlobalIndex + localIndex
  }
  currentGlobalIndex += props.suggestions.disciplines.length

  if (type === "activity") {
    return props.selectedIndex === currentGlobalIndex + localIndex
  }
  currentGlobalIndex += props.suggestions.activities.length

  if (type === "software") {
    return props.selectedIndex === currentGlobalIndex + localIndex
  }

  return false
}

// Scroll into view logic
watch(() => props.selectedIndex, async (newIndex) => {
  if (newIndex === -1 || !suggestionsContainer.value) return

  await nextTick()
  const selectedElement = suggestionsContainer.value.querySelector("[aria-selected=\"true\"]") as HTMLElement

  if (selectedElement) {
    selectedElement.scrollIntoView({ block: "nearest" })
  }
})
</script>

<template>
  <div
    :class="[
      isMobileFocused
        ? 'flex-1 overflow-y-auto custom-scrollbar relative w-full h-full bg-white dark:bg-gray-900'
        : 'absolute z-10 left-0 right-0 top-full mt-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl pb-2 overflow-hidden'
    ]"
    role="listbox"
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
          @click="emit('clickCategory', item.label)"
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
        <!-- Categories -->
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
            @click="emit('clickCategory', category)"
          >
            <UIcon
              name="i-lucide-tag"
              class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
            />
            <span class="text-sm text-gray-900 dark:text-white">{{ category }}</span>
          </button>
        </div>

        <!-- Disciplines -->
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
            @click="emit('clickDiscipline', discipline)"
          >
            <UIcon
              name="i-lucide-book-open"
              class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
            />
            <span class="text-sm text-gray-900 dark:text-white">{{ discipline }}</span>
          </button>
        </div>

        <!-- Activities -->
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
            @click="emit('clickActivity', activity)"
          >
            <UIcon
              name="i-lucide-graduation-cap"
              class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
            />
            <span class="text-sm text-gray-900 dark:text-white">{{ activity }}</span>
          </button>
        </div>

        <!-- Software -->
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
            @click="emit('clickSoftware', software.id)"
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

      <!-- Empty state -->
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
</template>

<style scoped>
/* Custom Scrollbar */
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
