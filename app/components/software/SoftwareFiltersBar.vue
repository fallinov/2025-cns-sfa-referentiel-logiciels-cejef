<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"
import { SCHOOL_LEVEL_LABELS } from "~/utils/school-level"
import type { SchoolLevel } from "~~/types/software"

const store = useSoftwareStore()
const {
  selectedPopularFilters,
  selectedLgpdLevel,
  selectedCategories,
  selectedActivities,
  selectedSchoolLevels,
  isFiltersDrawerOpen
} = storeToRefs(store)

const { togglePopularFilter } = store

const lgpdLevelOptions = [
  { label: "Niveau LGPD", value: "all" },
  { label: "Autorisé", value: "1" },
  { label: "Usage limité", value: "2" },
  { label: "Interdit", value: "3" }
]

const lgpdSelectValue = computed({
  get: () => selectedLgpdLevel.value?.toString() ?? "all",
  set: (val: string) => {
    selectedLgpdLevel.value = val === "all" ? null : Number(val)
  }
})

const schoolLevelItems = computed(() =>
  store.uniqueSchoolLevels.map((value: SchoolLevel) => ({
    label: SCHOOL_LEVEL_LABELS[value],
    value,
    count: store.schoolLevelCounts[value] ?? 0
  }))
)

const categoryItems = computed(() =>
  store.uniqueCategories.map((name: string) => ({
    label: name,
    value: name,
    count: store.categoryCounts[name] ?? 0
  }))
)

const activityItems = computed(() =>
  store.uniqueActivities.map((name: string) => ({
    label: name,
    value: name,
    count: store.activityCounts[name] ?? 0
  }))
)
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
          v-if="store.activeFiltersCount > 0"
          color="primary"
          size="sm"
          class="ml-2 rounded-[var(--ui-radius)] cursor-pointer"
        >
          {{ store.activeFiltersCount }}
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

        <!-- Multi-select catégories -->
        <USelectMenu
          v-model="selectedCategories"
          :items="categoryItems"
          value-key="value"
          multiple
          searchable
          placeholder="Catégories"
          leading-icon="i-lucide-tag"
          size="xl"
          class="w-56 rounded-[var(--ui-radius)] cursor-pointer"
        >
          <template #item="{ item }">
            <span class="truncate flex-1">{{ item.label }}</span>
            <span class="ml-2 text-xs text-gray-500 dark:text-gray-400 tabular-nums shrink-0">{{ item.count }}</span>
          </template>
        </USelectMenu>

        <!-- Multi-select activités pédagogiques -->
        <USelectMenu
          v-model="selectedActivities"
          :items="activityItems"
          value-key="value"
          multiple
          searchable
          placeholder="Activités"
          leading-icon="i-lucide-puzzle"
          size="xl"
          class="w-56 rounded-[var(--ui-radius)] cursor-pointer"
        >
          <template #item="{ item }">
            <span class="truncate flex-1">{{ item.label }}</span>
            <span class="ml-2 text-xs text-gray-500 dark:text-gray-400 tabular-nums shrink-0">{{ item.count }}</span>
          </template>
        </USelectMenu>

        <!-- Multi-select niveau scolaire -->
        <USelectMenu
          v-model="selectedSchoolLevels"
          :items="schoolLevelItems"
          value-key="value"
          multiple
          placeholder="Niveau scolaire"
          leading-icon="i-lucide-school"
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
              Niveau LGPD
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

          <!-- Catégories / Activités / Niveau scolaire (Mobile) -->
          <div>
            <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Catégories
            </div>
            <USelectMenu
              v-model="selectedCategories"
              :items="categoryItems"
              value-key="value"
              multiple
              searchable
              placeholder="Toutes catégories"
              leading-icon="i-lucide-tag"
              size="xl"
              class="w-full rounded-[var(--ui-radius)] cursor-pointer"
            />
          </div>
          <div>
            <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Activités pédagogiques
            </div>
            <USelectMenu
              v-model="selectedActivities"
              :items="activityItems"
              value-key="value"
              multiple
              searchable
              placeholder="Toutes activités"
              leading-icon="i-lucide-puzzle"
              size="xl"
              class="w-full rounded-[var(--ui-radius)] cursor-pointer"
            />
          </div>
          <div>
            <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Niveau scolaire
            </div>
            <USelectMenu
              v-model="selectedSchoolLevels"
              :items="schoolLevelItems"
              value-key="value"
              multiple
              placeholder="Tous niveaux"
              leading-icon="i-lucide-school"
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
              v-if="store.hasActiveFilters"
              color="neutral"
              variant="ghost"
              size="lg"
              block
              @click="store.resetFilters()"
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
