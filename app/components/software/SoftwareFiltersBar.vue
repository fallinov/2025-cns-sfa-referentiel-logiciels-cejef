<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const store = useSoftwareStore()
const {
  selectedPopularFilters,
  selectedLgpdLevels,
  isFiltersDrawerOpen,
  lgpdLevelCounts
} = storeToRefs(store)

const {
  togglePopularFilter,
  toggleLgpdLevel
} = store

// Map des couleurs pour les boutons LGPD
const lgpdButtonColors = {
  1: {
    solid: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600",
    outline: "border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
  },
  2: {
    solid: "bg-amber-500 hover:bg-amber-600 text-white border-amber-500",
    outline: "border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
  },
  3: {
    solid: "bg-red-600 hover:bg-red-700 text-white border-red-600",
    outline: "border-red-600 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
  }
}
</script>

<template>
  <div class="mb-8 px-4 sm:px-0">
    <!-- Mobile: Bouton d'ouverture du drawer -->
    <div class="sm:hidden">
      <UButton
        color="primary"
        variant="outline"
        size="lg"
        block
        @click="isFiltersDrawerOpen = true"
      >
        <template #leading>
          <UIcon name="i-lucide-filter" class="w-5 h-5" />
        </template>
        Filtres rapides
        <UBadge
          v-if="selectedPopularFilters.length > 0 || selectedLgpdLevels.length > 0"
          color="primary"
          size="sm"
          class="ml-2 rounded-[var(--ui-radius)] cursor-pointer"
        >
          {{ selectedPopularFilters.length + selectedLgpdLevels.length }}
        </UBadge>
      </UButton>
    </div>

    <!-- Desktop/Tablet: Filtres visibles en ligne -->
    <div class="hidden sm:block space-y-4">
      <!-- Filtres LGPD par couleur -->
      <div>
        <div class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Niveau de conformité LGPD
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="filter in store.lgpdColorFilters"
            :key="filter.id"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--ui-radius)] text-base font-medium border-2 transition-all cursor-pointer"
            :class="selectedLgpdLevels.includes(filter.level) ? lgpdButtonColors[filter.level].solid : lgpdButtonColors[filter.level].outline"
            @click="toggleLgpdLevel(filter.level)"
          >
            <UIcon :name="filter.icon" class="w-5 h-5" />
            {{ filter.label }}
            <span class="ml-1 text-sm opacity-80">({{ lgpdLevelCounts[filter.level] }})</span>
          </button>
        </div>
      </div>

      <!-- Filtres populaires -->
      <div>
        <div class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Filtres populaires
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            v-for="filter in store.popularFilters"
            :key="filter.id"
            :variant="selectedPopularFilters.includes(filter.id) ? 'solid' : 'outline'"
            :color="selectedPopularFilters.includes(filter.id) ? 'primary' : 'neutral'"
            size="xl"
            :class="[!selectedPopularFilters.includes(filter.id) ? 'text-black dark:text-white' : '', 'rounded-[var(--ui-radius)] cursor-pointer']"
            @click="togglePopularFilter(filter.id)"
          >
            <template v-if="filter.icon" #leading>
              <UIcon :name="filter.icon" />
            </template>
            {{ filter.label }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Mobile: Drawer avec filtres -->
    <UDrawer
      v-model:open="isFiltersDrawerOpen"
      title="Filtres rapides"
      description="Sélectionnez un ou plusieurs filtres pour affiner votre recherche"
    >
      <template #content>
        <div class="flex flex-col gap-6 p-4">
          <!-- Filtres LGPD par couleur (Mobile) -->
          <div>
            <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Niveau de conformité LGPD
            </div>
            <div class="flex flex-col gap-2">
              <button
                v-for="filter in store.lgpdColorFilters"
                :key="filter.id"
                class="flex items-center justify-between px-4 py-3 rounded-[var(--ui-radius)] text-base font-medium border-2 transition-all cursor-pointer"
                :class="selectedLgpdLevels.includes(filter.level) ? lgpdButtonColors[filter.level].solid : lgpdButtonColors[filter.level].outline"
                @click="toggleLgpdLevel(filter.level)"
              >
                <span class="flex items-center gap-2">
                  <UIcon :name="filter.icon" class="w-5 h-5" />
                  {{ filter.label }}
                </span>
                <span class="text-sm opacity-80">{{ lgpdLevelCounts[filter.level] }}</span>
              </button>
            </div>
          </div>

          <!-- Filtres populaires (Mobile) -->
          <div>
            <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Filtres populaires
            </div>
            <div class="flex flex-col gap-2">
              <UButton
                v-for="filter in store.popularFilters"
                :key="filter.id"
                :color="selectedPopularFilters.includes(filter.id) ? 'primary' : 'neutral'"
                :variant="selectedPopularFilters.includes(filter.id) ? 'solid' : 'outline'"
                size="xl"
                block
                class="justify-start min-h-[44px] cursor-pointer"
                @click="togglePopularFilter(filter.id)"
              >
                <template #leading>
                  <UIcon :name="filter.icon" class="w-5 h-5" />
                </template>
                {{ filter.label }}
              </UButton>
            </div>
          </div>

          <div class="mt-2 pt-4 border-t dark:border-gray-800">
            <UButton
              v-if="selectedPopularFilters.length > 0 || selectedLgpdLevels.length > 0"
              color="neutral"
              variant="ghost"
              size="lg"
              block
              @click="selectedPopularFilters = []; selectedLgpdLevels = []"
            >
              <template #leading>
                <UIcon name="i-lucide-x" class="w-5 h-5" />
              </template>
              Effacer les filtres
            </UButton>
          </div>
        </div>
      </template>
    </UDrawer>
  </div>
</template>
