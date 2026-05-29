<script setup lang="ts">
import type { SoftwareSuggestion } from "~/composables/useSearchSuggestions"
import { highlightMatch } from "~/utils/highlight-match"

interface Suggestions {
  categories: string[]
  activities: string[]
  software: SoftwareSuggestion[]
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
  clickActivity: [activity: string]
  clickSoftware: [id: string]
}>()

const suggestionsContainer = ref<HTMLElement | null>(null)

// Ordre flat : Logiciels (#1, cible primaire) → Catégories (#2) → Activités (#3).
// Cet ordre MOIT correspondre au parent (gestion clavier).
const isItemSelected = (type: string, localIndex: number) => {
  let currentGlobalIndex = 0

  if (type === "software") {
    return props.selectedIndex === currentGlobalIndex + localIndex
  }
  currentGlobalIndex += props.suggestions.software.length

  if (type === "category") {
    return props.selectedIndex === currentGlobalIndex + localIndex
  }
  currentGlobalIndex += props.suggestions.categories.length

  if (type === "activity") {
    return props.selectedIndex === currentGlobalIndex + localIndex
  }

  return false
}

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
            'w-full text-left px-5 py-4 transition-colors flex items-center gap-4',
            selectedIndex === index
              ? 'bg-gray-100 dark:bg-gray-700'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
          ]"
          @click="emit('clickCategory', item.label)"
        >
          <UIcon
            :name="item.icon"
            class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
          />
          <span class="text-base text-gray-900 dark:text-white">{{ item.label }}</span>
          <span class="ml-auto text-xs text-gray-400">Recherche populaire</span>
        </button>
      </div>

      <!-- Résultats : Logiciels d'abord (cible primaire), puis taxonomie -->
      <div v-else-if="search.length >= 2 && hasSuggestions">
        <!-- 1. Logiciels (priorité absolue) -->
        <div v-if="suggestions.software.length > 0">
          <div class="px-5 py-2 mt-1 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Logiciels
          </div>
          <button
            v-for="(item, index) in suggestions.software"
            :key="`software-${item.software.id}`"
            type="button"
            role="option"
            :aria-selected="isItemSelected('software', index)"
            :class="[
              'w-full text-left px-5 py-3 transition-colors flex items-start gap-3',
              isItemSelected('software', index)
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
            ]"
            @click="emit('clickSoftware', item.software.id)"
          >
            <UIcon
              :name="item.software.icon || 'i-lucide-app-window'"
              class="w-6 h-6 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-base font-medium text-gray-900 dark:text-white truncate">
                  <template
                    v-for="(seg, segIdx) in highlightMatch(item.software.name, item.matches, 'name')"
                    :key="`seg-${segIdx}`"
                  >
                    <mark
                      v-if="seg.type === 'mark'"
                      class="bg-primary-100 dark:bg-primary-900/50 text-primary-900 dark:text-primary-200 rounded-sm px-0.5"
                    >{{ seg.value }}</mark>
                    <template v-else>{{ seg.value }}</template>
                  </template>
                </span>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                {{ item.software.shortDescription }}
              </div>
            </div>
            <span class="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mt-1">
              Logiciel
            </span>
          </button>
        </div>

        <!-- 2. Catégories (filtres secondaires) -->
        <div v-if="suggestions.categories.length > 0">
          <div class="px-5 py-2 mt-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Filtrer par catégorie
          </div>
          <button
            v-for="(category, index) in suggestions.categories"
            :key="`category-${category}`"
            type="button"
            role="option"
            :aria-selected="isItemSelected('category', index)"
            :class="[
              'w-full text-left px-5 py-3 transition-colors flex items-center gap-3',
              isItemSelected('category', index)
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
            ]"
            @click="emit('clickCategory', category)"
          >
            <UIcon
              name="i-lucide-tag"
              class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
            />
            <span class="text-base text-gray-900 dark:text-white flex-1 truncate">{{ category }}</span>
            <span class="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">
              Catégorie
            </span>
          </button>
        </div>

        <!-- 3. Activités pédagogiques -->
        <div v-if="suggestions.activities.length > 0">
          <div class="px-5 py-2 mt-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Filtrer par activité pédagogique
          </div>
          <button
            v-for="(activity, index) in suggestions.activities"
            :key="`activity-${activity}`"
            type="button"
            role="option"
            :aria-selected="isItemSelected('activity', index)"
            :class="[
              'w-full text-left px-5 py-3 transition-colors flex items-center gap-3',
              isItemSelected('activity', index)
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
            ]"
            @click="emit('clickActivity', activity)"
          >
            <UIcon
              name="i-lucide-puzzle"
              class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
            />
            <span class="text-base text-gray-900 dark:text-white flex-1 truncate">{{ activity }}</span>
            <span class="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">
              Activité
            </span>
          </button>
        </div>
      </div>

      <!-- Empty state avec CTA « proposer ce logiciel » (best practice UX : transformer
           une frustration en action — l'utilisateur qui ne trouve pas son logiciel
           dispose d'une porte d'entrée immédiate pour le signaler à l'équipe SFP) -->
      <div v-else-if="search.length >= 2 && !hasSuggestions">
        <div class="px-5 py-6 text-center">
          <UIcon
            name="i-lucide-search-x"
            class="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3"
          />
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Aucun logiciel ne correspond à « {{ search }} ».
          </p>
          <UButton
            :to="`mailto:steve.fallet@jura.ch?subject=Proposition%20de%20logiciel%20%C3%A0%20ajouter%20au%20r%C3%A9f%C3%A9rentiel&body=Bonjour%2C%0A%0AJe%20souhaite%20proposer%20le%20logiciel%20suivant%20pour%20une%20%C3%A9valuation%20et%20un%20ajout%20au%20r%C3%A9f%C3%A9rentiel%20%3A%0A%0ANom%20du%20logiciel%20%3A%20${encodeURIComponent(search)}%0AURL%20du%20site%20officiel%20%3A%20%0AUsage%20p%C3%A9dagogique%20%3A%20%0A%0AMerci%20%21`"
            color="primary"
            size="md"
            icon="i-lucide-send"
            class="font-semibold"
          >
            Proposer ce logiciel
          </UButton>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Ou essayez par catégorie ou activité depuis les filtres ci-dessous.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 20px;
  border: 3px solid transparent;
  background-clip: content-box;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
}

:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #374151;
}

:global(.dark) .custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}
</style>
