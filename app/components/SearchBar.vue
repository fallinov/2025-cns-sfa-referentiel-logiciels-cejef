<script setup lang="ts">
/**
 * SearchBar Component - Barre de recherche avec CommandPalette
 * Utilise UCommandPalette pour une meilleure navigation clavier et accessibilité
 * Préserve le design visuel de la barre de recherche originale
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

// État du command palette
const isOpen = ref(false)
const searchTerm = ref("")

// Selected category filter (emitted to parent)
const emit = defineEmits<{
  filterByCategory: [category: string]
  filterByDiscipline: [discipline: string]
  filterByActivity: [activity: string]
  search: [query: string]
  clear: []
}>()

// Suggestions calculées via composable (réutilisation du code existant)
const { suggestions } = useSearchSuggestions(searchTerm)

// Transformation des suggestions en format UCommandPalette
const commandPaletteGroups = computed(() => {
  const groups = []

  // Groupe Catégories
  if (suggestions.value.categories.length > 0) {
    groups.push({
      id: "categories",
      label: "Filtrer par catégorie",
      items: suggestions.value.categories.map(cat => ({
        id: `category-${cat}`,
        label: cat,
        icon: "i-lucide-tag",
        onSelect: () => {
          emit("filterByCategory", cat)
          search.value = cat
          searchTerm.value = cat
          isOpen.value = false
        }
      }))
    })
  }

  // Groupe Disciplines
  if (suggestions.value.disciplines.length > 0) {
    groups.push({
      id: "disciplines",
      label: "Filtrer par discipline",
      items: suggestions.value.disciplines.map(disc => ({
        id: `discipline-${disc}`,
        label: disc,
        icon: "i-lucide-book-open",
        onSelect: () => {
          emit("filterByDiscipline", disc)
          search.value = disc
          searchTerm.value = disc
          isOpen.value = false
        }
      }))
    })
  }

  // Groupe Activités
  if (suggestions.value.activities.length > 0) {
    groups.push({
      id: "activities",
      label: "Filtrer par activité pédagogique",
      items: suggestions.value.activities.map(act => ({
        id: `activity-${act}`,
        label: act,
        icon: "i-lucide-graduation-cap",
        onSelect: () => {
          emit("filterByActivity", act)
          search.value = act
          searchTerm.value = act
          isOpen.value = false
        }
      }))
    })
  }

  // Groupe Logiciels
  if (suggestions.value.software.length > 0) {
    groups.push({
      id: "software",
      label: "Logiciels",
      items: suggestions.value.software.map(soft => ({
        id: soft.id,
        label: soft.name,
        suffix: soft.shortDescription,
        icon: soft.icon || "i-lucide-package",
        onSelect: () => {
          navigateTo(`/logiciels/${soft.id}`)
          isOpen.value = false
          searchTerm.value = ""
          search.value = ""
        }
      }))
    })
  }

  return groups
})

// Raccourci clavier pour ouvrir le command palette (Cmd+K ou Ctrl+K)
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      isOpen.value = !isOpen.value
    }
  }
})

// Gestion de la fermeture et du clear
const handleClose = () => {
  isOpen.value = false
}

const handleClear = () => {
  search.value = ""
  searchTerm.value = ""
  emit("clear")
}

// Ouverture du modal
const handleOpen = () => {
  isOpen.value = true
  searchTerm.value = search.value
}

// Typewriter Effect (préservé du design original)
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
</script>

<template>
  <div class="w-full relative" :class="compact ? '' : 'max-w-3xl mx-auto'">
    <!-- Trigger Button styled to look like the original input -->
    <div class="relative group flex items-stretch">
      <div class="relative flex-1">
        <button
          type="button"
          class="w-full h-14 pl-6 pr-24 text-lg font-medium tracking-wide text-slate-900 dark:text-slate-100 rounded-[28px] focus:outline-none transition-all bg-white dark:bg-gray-800 ring-2 ring-black dark:ring-white shadow-sm focus:ring-2 focus:ring-primary-500 text-left cursor-text"
          aria-label="Ouvrir la recherche de logiciels"
          @click="handleOpen"
        >
          <span class="text-black dark:text-white">{{ search || placeholderText }}</span>
        </button>

        <!-- Right Actions -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 gap-3 pointer-events-none">
          <!-- Clear Button -->
          <button
            v-if="search"
            type="button"
            class="flex items-center justify-center w-11 h-11 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none pointer-events-auto"
            aria-label="Effacer la recherche"
            @click.stop="handleClear"
          >
            <UIcon name="i-lucide-x" class="w-5 h-5" />
          </button>

          <!-- Search Button -->
          <button
            type="button"
            class="flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-all shadow-sm hover:bg-slate-800 dark:hover:bg-gray-200 cursor-pointer pointer-events-auto"
            aria-label="Ouvrir la recherche"
            @click.stop="handleOpen"
          >
            <UIcon name="i-lucide-search" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Command Palette Modal -->
    <UModal
      :open="isOpen"
      @update:open="value => isOpen = value"
    >
      <template #content>
        <UCommandPalette
          v-model:search-term="searchTerm"
          :groups="commandPaletteGroups"
          placeholder="Rechercher logiciels, catégories, disciplines..."
          :empty-state="{
            icon: 'i-lucide-search-x',
            label: 'Aucun résultat',
            description: 'Essayez de modifier votre recherche'
          }"
          close
          class="min-h-[400px]"
          @update:open="handleClose"
        />
      </template>
    </UModal>
  </div>
</template>
