<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const store = useSoftwareStore()
const {
  selectedPopularFilters,
  isFiltersDrawerOpen
} = storeToRefs(store)

const {
  togglePopularFilter
} = store
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
          v-if="selectedPopularFilters.length > 0"
          color="primary"
          size="sm"
          class="ml-2 rounded-[var(--ui-radius)] cursor-pointer"
        >
          {{ selectedPopularFilters.length }}
        </UBadge>
      </UButton>
    </div>

    <!-- Desktop/Tablet: Filtres visibles en ligne -->
    <div class="hidden sm:block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
      Filtres populaires
    </div>
    <div class="hidden sm:flex flex-wrap items-center gap-2">
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

    <!-- Mobile: Drawer avec filtres -->
    <UDrawer
      v-model:open="isFiltersDrawerOpen"
      title="Filtres rapides"
      description="Sélectionnez un ou plusieurs filtres pour affiner votre recherche"
    >
      <template #content>
        <div class="flex flex-col gap-3 p-4">
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

          <div class="mt-4 pt-4 border-t dark:border-gray-800">
            <UButton
              v-if="selectedPopularFilters.length > 0"
              color="neutral"
              variant="ghost"
              size="lg"
              block
              @click="selectedPopularFilters = []"
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
