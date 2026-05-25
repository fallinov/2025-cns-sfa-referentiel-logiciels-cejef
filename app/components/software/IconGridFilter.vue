<script setup lang="ts" generic="T extends string">
/**
 * Filtre multi-select avec modal en grille visuelle.
 * Pattern Booking.com / Notion : bouton qui ouvre une modal contenant
 * une grille de cartes (icône + label + compteur), recherche intégrée,
 * et multi-sélection via clic. Responsive : grille 1-4 colonnes selon
 * la largeur de l'écran.
 */
interface Item {
  value: T
  label: string
  count: number
  icon?: string | null
}

const props = defineProps<{
  items: Item[]
  title: string
  placeholder: string
  leadingIcon: string
  defaultIcon?: string
  searchPlaceholder?: string
}>()

const selected = defineModel<T[]>({ required: true })

const isOpen = ref(false)
const search = ref("")

// Reset de la recherche à chaque ouverture pour un état propre
watch(isOpen, (open) => {
  if (open) search.value = ""
})

const normalizedSearch = computed(() => search.value.trim().toLowerCase())

const filteredItems = computed(() =>
  props.items.filter(item =>
    !normalizedSearch.value
    || item.label.toLowerCase().includes(normalizedSearch.value)
  )
)

const sortedFiltered = computed(() =>
  [...filteredItems.value].sort((a, b) => {
    // Sélectionnés d'abord, puis par compteur décroissant, puis alphabétique
    const aSelected = selected.value.includes(a.value) ? 0 : 1
    const bSelected = selected.value.includes(b.value) ? 0 : 1
    if (aSelected !== bSelected) return aSelected - bSelected
    if (a.count !== b.count) return b.count - a.count
    return a.label.localeCompare(b.label, "fr")
  })
)

const toggle = (value: T) => {
  if (selected.value.includes(value)) {
    selected.value = selected.value.filter(v => v !== value)
  } else {
    selected.value = [...selected.value, value]
  }
}

const isSelected = (value: T) => selected.value.includes(value)

const clear = () => {
  selected.value = []
}

const triggerLabel = computed(() => {
  if (selected.value.length === 0) return props.placeholder
  if (selected.value.length === 1) {
    const item = props.items.find(i => i.value === selected.value[0])
    return item?.label ?? props.placeholder
  }
  return `${props.placeholder} (${selected.value.length})`
})
</script>

<template>
  <UButton
    color="neutral"
    variant="outline"
    size="xl"
    class="rounded-[var(--ui-radius)] cursor-pointer w-full sm:w-56 justify-between"
    @click="isOpen = true"
  >
    <template #leading>
      <UIcon :name="leadingIcon" class="w-4 h-4 shrink-0" />
    </template>
    <span class="truncate" :class="selected.length === 0 ? 'text-gray-400 dark:text-gray-500 font-normal' : 'font-medium'">
      {{ triggerLabel }}
    </span>
    <template #trailing>
      <UIcon name="i-lucide-chevron-down" class="w-4 h-4 shrink-0 opacity-60" />
    </template>
  </UButton>

  <UModal
    v-model:open="isOpen"
    :title="title"
    :ui="{
      content: 'sm:max-w-3xl max-h-[90vh] sm:max-h-[85vh] flex flex-col',
      body: 'p-0 flex-1 flex flex-col min-h-0 overflow-hidden',
      header: 'bg-white dark:bg-gray-900',
      footer: 'bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800'
    }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <UIcon :name="leadingIcon" class="w-6 h-6 text-primary-600 dark:text-primary-400 shrink-0" />
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
            {{ title }}
          </h2>
          <UBadge
            v-if="selected.length > 0"
            color="primary"
            size="md"
            class="shrink-0"
          >
            {{ selected.length }}
          </UBadge>
        </div>
      </div>
    </template>

    <template #body>
      <!-- Barre de recherche fixe en haut du body -->
      <div class="shrink-0 bg-white dark:bg-gray-900 px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-gray-800">
        <UInput
          v-model="search"
          :placeholder="searchPlaceholder ?? `Rechercher dans ${items.length} options…`"
          icon="i-lucide-search"
          size="lg"
          class="w-full"
          :ui="{ base: 'w-full' }"
        />
      </div>

      <!-- Grille scrollable -->
      <div class="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        <div
          v-if="sortedFiltered.length === 0"
          class="text-center py-12 text-gray-500 dark:text-gray-400"
        >
          <UIcon name="i-lucide-search-x" class="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucun résultat pour « {{ search }} »</p>
        </div>

        <div
          v-else
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
        >
          <button
            v-for="item in sortedFiltered"
            :key="item.value"
            type="button"
            :aria-pressed="isSelected(item.value)"
            class="group relative flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-[var(--ui-radius)] border-2 transition-all text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="isSelected(item.value)
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/40 dark:border-primary-400'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'"
            @click="toggle(item.value)"
          >
            <!-- Check overlay quand sélectionné -->
            <div
              v-if="isSelected(item.value)"
              class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center shadow-sm"
              aria-hidden="true"
            >
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-white" />
            </div>

            <!-- Icône principale -->
            <UIcon
              :name="item.icon || defaultIcon || leadingIcon"
              class="w-7 h-7 sm:w-8 sm:h-8 transition-colors"
              :class="isSelected(item.value)
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'"
            />

            <!-- Label -->
            <span
              class="text-xs sm:text-sm font-medium leading-tight line-clamp-2"
              :class="isSelected(item.value)
                ? 'text-primary-700 dark:text-primary-300'
                : 'text-gray-900 dark:text-gray-100'"
            >
              {{ item.label }}
            </span>

            <!-- Compteur -->
            <span
              class="text-xs tabular-nums"
              :class="isSelected(item.value)
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400'"
            >
              {{ item.count }} logiciel{{ item.count > 1 ? "s" : "" }}
            </span>
          </button>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-between gap-3 w-full">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          <template v-if="selected.length === 0">
            Aucune sélection
          </template>
          <template v-else>
            {{ selected.length }} sélectionnée{{ selected.length > 1 ? "s" : "" }}
          </template>
        </span>
        <div class="flex items-center gap-2">
          <UButton
            v-if="selected.length > 0"
            variant="ghost"
            color="neutral"
            size="md"
            @click="clear"
          >
            Effacer
          </UButton>
          <UButton
            color="primary"
            size="md"
            @click="isOpen = false"
          >
            Voir les résultats
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
