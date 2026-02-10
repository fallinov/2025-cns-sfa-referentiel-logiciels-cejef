<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const store = useSoftwareStore()
const {
  selectedPopularFilters,
  selectedLgpdLevel,
  isFiltersDrawerOpen
} = storeToRefs(store)

const { togglePopularFilter } = store

const lgpdLevelOptions = [
  { label: "Tous les niveaux", value: "all" },
  { label: "Validé", value: "1" },
  { label: "Restreint", value: "2" },
  { label: "Interdit", value: "3" }
]

const lgpdSelectValue = computed({
  get: () => selectedLgpdLevel.value?.toString() ?? "all",
  set: (val: string) => {
    selectedLgpdLevel.value = val === "all" ? null : Number(val)
  }
})
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
        Filtres
        <UBadge
          v-if="selectedPopularFilters.length > 0 || selectedLgpdLevel !== null"
          color="primary"
          size="sm"
          class="ml-2 rounded-[var(--ui-radius)] cursor-pointer"
        >
          {{ selectedPopularFilters.length + (selectedLgpdLevel !== null ? 1 : 0) }}
        </UBadge>
      </UButton>
    </div>

    <!-- Desktop/Tablet: Filtres sur une seule ligne -->
    <div class="hidden sm:block">
      <div class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        Filtres
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <!-- Dropdown niveau LGPD -->
        <USelect
          v-model="lgpdSelectValue"
          :items="lgpdLevelOptions"
          option-attribute="label"
          value-attribute="value"
          leading-icon="i-lucide-filter"
          size="xl"
          class="w-56 rounded-[var(--ui-radius)] cursor-pointer"
        />

        <!-- Boutons filtres populaires -->
        <UButton
          v-for="filter in store.popularFilters"
          :key="filter.id"
          :variant="selectedPopularFilters.includes(filter.id) ? 'solid' : 'outline'"
          color="neutral"
          size="xl"
          class="rounded-[var(--ui-radius)] cursor-pointer"
          @click="togglePopularFilter(filter.id)"
        >
          <template v-if="filter.icon" #leading>
            <UIcon :name="filter.icon" class="w-4 h-4" />
          </template>
          {{ filter.label }}
        </UButton>
      </div>
    </div>

    <!-- Mobile: Drawer avec filtres -->
    <UDrawer
      v-model:open="isFiltersDrawerOpen"
      title="Filtres"
      description="Affinez votre recherche"
    >
      <template #content>
        <div class="flex flex-col gap-6 p-4">
          <!-- Dropdown niveau LGPD (Mobile) -->
          <div>
            <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Niveau de conformité
            </div>
            <USelect
              v-model="lgpdSelectValue"
              :items="lgpdLevelOptions"
              option-attribute="label"
              value-attribute="value"
              leading-icon="i-lucide-filter"
              size="xl"
              class="w-full rounded-[var(--ui-radius)] cursor-pointer"
            />
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
                :variant="selectedPopularFilters.includes(filter.id) ? 'solid' : 'outline'"
                color="neutral"
                size="lg"
                block
                class="justify-start rounded-[var(--ui-radius)] cursor-pointer"
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
              v-if="selectedPopularFilters.length > 0 || selectedLgpdLevel !== null"
              color="neutral"
              variant="ghost"
              size="lg"
              block
              @click="selectedPopularFilters = []; selectedLgpdLevel = null"
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
