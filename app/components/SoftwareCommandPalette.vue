<script setup lang="ts">
/**
 * POC : SoftwareCommandPalette - Alternative moderne à SearchBar
 * Utilise UCommandPalette de Nuxt UI pour une meilleure UX
 *
 * Avantages vs SearchBar actuel :
 * - Navigation clavier native (ArrowUp/Down, Enter, Escape)
 * - Pas besoin de composable useKeyboardNavigation (230 lignes économisées)
 * - Meilleur design et animations
 * - Support fuzzy search intégré avec Fuse.js
 * - Accessibilité built-in
 */

interface Props {
  compact?: boolean
}

withDefaults(defineProps<Props>(), {
  compact: false
})

// Émissions pour communiquer avec le parent
const emit = defineEmits<{
  filterByCategory: [category: string]
  filterByDiscipline: [discipline: string]
  filterByActivity: [activity: string]
  search: [query: string]
  clear: []
}>()

// État du command palette
const isOpen = ref(false)
const searchTerm = ref("")

// Suggestions calculées via composable (réutilisation du code existant)
const { suggestions } = useSearchSuggestions(searchTerm)

// Transformation des suggestions en format UCommandPalette
const commandPaletteGroups = computed(() => {
  const groups = []

  // Groupe Catégories
  if (suggestions.value.categories.length > 0) {
    groups.push({
      id: "categories",
      label: "Catégories",
      items: suggestions.value.categories.map(cat => ({
        id: `category-${cat}`,
        label: cat,
        icon: "i-lucide-tag",
        onSelect: () => {
          emit("filterByCategory", cat)
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
      label: "Disciplines",
      items: suggestions.value.disciplines.map(disc => ({
        id: `discipline-${disc}`,
        label: disc,
        icon: "i-lucide-book-open",
        onSelect: () => {
          emit("filterByDiscipline", disc)
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
      label: "Activités pédagogiques",
      items: suggestions.value.activities.map(act => ({
        id: `activity-${act}`,
        label: act,
        icon: "i-lucide-graduation-cap",
        onSelect: () => {
          emit("filterByActivity", act)
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

// Gestion de la fermeture
const handleClose = () => {
  isOpen.value = false
  emit("clear")
}

// Typewriter Effect (optionnel, peut être retiré pour simplifier)
const phrases = [
  "Rechercher un logiciel...",
  "Bureautique, Langues, Programmation...",
  "Canva, Code.org, Antidote..."
]

const { placeholderText } = useTypewriter(phrases)
</script>

<template>
  <div class="w-full relative" :class="compact ? '' : 'max-w-3xl mx-auto'">
    <!-- Trigger Button -->
    <UButton
      color="neutral"
      variant="outline"
      size="xl"
      block
      class="h-14 rounded-[28px] justify-start text-left ring-2 ring-black dark:ring-white"
      @click="isOpen = true"
    >
      <template #leading>
        <UIcon name="i-lucide-search" class="w-5 h-5" />
      </template>
      <span class="text-lg font-medium text-gray-500 dark:text-gray-400">
        {{ placeholderText }}
      </span>
      <template #trailing>
        <UKbd>⌘K</UKbd>
      </template>
    </UButton>

    <!-- Command Palette Modal -->
    <UModal v-model:open="isOpen">
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
