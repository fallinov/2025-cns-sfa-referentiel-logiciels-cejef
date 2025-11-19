<script setup lang="ts">
import type { CostType, CertificationLevel } from "~~/types/software"
import { categories as categoryData } from "~/data/categories"
import { disciplines as disciplineData } from "~/data/disciplines"
import { activities as activityData } from "~/data/activities"
import { CERTIFICATION_LEVELS } from "~/constants/certification-levels"

const props = defineProps<{
  selectedCategories: string[]
  selectedDisciplines: string[]
  selectedActivities: string[]
  selectedPlatforms: string[]
  selectedCosts: CostType[]
  selectedCertifications: CertificationLevel[]
  softwareList: Array<{
    category: string
    disciplines: string[]
    activity: string
    platforms: string[]
    cost: CostType
  }>
}>()

const emit = defineEmits<{
  "update:selectedCategories": [value: string[]]
  "update:selectedDisciplines": [value: string[]]
  "update:selectedActivities": [value: string[]]
  "update:selectedPlatforms": [value: string[]]
  "update:selectedCosts": [value: CostType[]]
  "update:selectedCertifications": [value: CertificationLevel[]]
  "clearFilters": []
}>()

const isOpen = defineModel<boolean>("open", { required: true })

// Computed v-models for two-way binding
const categories = computed({
  get: () => props.selectedCategories,
  set: value => emit("update:selectedCategories", value)
})

const disciplines = computed({
  get: () => props.selectedDisciplines,
  set: value => emit("update:selectedDisciplines", value)
})

const activities = computed({
  get: () => props.selectedActivities,
  set: value => emit("update:selectedActivities", value)
})

const platforms = computed({
  get: () => props.selectedPlatforms,
  set: value => emit("update:selectedPlatforms", value)
})

const costs = computed({
  get: () => props.selectedCosts,
  set: value => emit("update:selectedCosts", value)
})

const certifications = computed({
  get: () => props.selectedCertifications,
  set: value => emit("update:selectedCertifications", value)
})

// Options for select menus
const usedCategoryIds = computed(
  () => new Set(props.softwareList.map(software => software.category))
)
const categoryOptions = computed(() =>
  categoryData
    .filter(category => usedCategoryIds.value.has(category.id))
    .map(category => ({
      label: category.name,
      value: category.id
    }))
)

const usedDisciplineIds = computed(
  () => new Set(props.softwareList.flatMap(software => software.disciplines))
)
const disciplineOptions = computed(() =>
  disciplineData
    .filter(discipline => usedDisciplineIds.value.has(discipline.id))
    .map(discipline => ({
      label: discipline.name,
      value: discipline.id
    }))
)

const usedActivityIds = computed(
  () => new Set(props.softwareList.map(software => software.activity))
)
const activityOptions = computed(() =>
  activityData
    .filter(activity => usedActivityIds.value.has(activity.id))
    .map(activity => ({
      label: activity.name,
      value: activity.id
    }))
)

const platformLabels: Record<string, string> = {
  web: "Web",
  windows: "Windows",
  mac: "macOS",
  smartphone: "Smartphone",
  tablet: "Tablette"
}
const platformOptions = computed(() => {
  const values = new Set<string>()
  props.softwareList.forEach((software) => {
    software.platforms.forEach(platform => values.add(platform))
  })
  return Array.from(values).map(value => ({
    label: platformLabels[value] ?? value,
    value
  }))
})

const costOptions = computed(() => {
  const values = Array.from(
    new Set(props.softwareList.map(software => software.cost))
  )
  return values.map(cost => ({
    label: cost,
    value: cost
  }))
})

const certificationOptions = computed(() =>
  CERTIFICATION_LEVELS.map(level => ({
    label: level.label,
    value: level.value,
    description: level.description
  }))
)

const hasActiveFilters = computed(() => {
  return (
    props.selectedCategories.length > 0
    || props.selectedDisciplines.length > 0
    || props.selectedActivities.length > 0
    || props.selectedPlatforms.length > 0
    || props.selectedCosts.length > 0
    || props.selectedCertifications.length > 0
  )
})
</script>

<template>
  <USlideover v-model:open="isOpen" side="left" :ui="{ content: 'w-full sm:max-w-md' }">
    <template #body>
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-filter" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Filtres détaillés
            </h2>
          </div>
          <UButton
            v-if="hasActiveFilters"
            color="primary"
            variant="link"
            icon="i-lucide-refresh-cw"
            @click="emit('clearFilters')"
          >
            Réinitialiser
          </UButton>
        </div>

        <!-- Filters Content -->
        <div class="flex-1 overflow-y-auto py-6 space-y-6">
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-900 dark:text-white">
              Catégories
            </label>
            <USelectMenu
              v-model="categories"
              :items="categoryOptions"
              value-key="value"
              multiple
              size="xl"
              color="neutral"
              highlight
              placeholder="Sélectionner..."
            />
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-900 dark:text-white">
              Disciplines
            </label>
            <USelectMenu
              v-model="disciplines"
              :items="disciplineOptions"
              value-key="value"
              multiple
              size="xl"
              color="neutral"
              highlight
              placeholder="Sélectionner..."
            />
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-900 dark:text-white">
              Activités pédagogiques
            </label>
            <USelectMenu
              v-model="activities"
              :items="activityOptions"
              value-key="value"
              multiple
              size="xl"
              color="neutral"
              highlight
              placeholder="Sélectionner..."
            />
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-900 dark:text-white">
              Plateformes
            </label>
            <USelectMenu
              v-model="platforms"
              :items="platformOptions"
              value-key="value"
              multiple
              size="xl"
              color="neutral"
              highlight
              placeholder="Sélectionner..."
            />
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-900 dark:text-white">
              Coût
            </label>
            <USelectMenu
              v-model="costs"
              :items="costOptions"
              value-key="value"
              multiple
              size="xl"
              color="neutral"
              highlight
              placeholder="Sélectionner..."
            />
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-900 dark:text-white">
              Certification LGPD
            </label>
            <USelectMenu
              v-model="certifications"
              :items="certificationOptions"
              value-key="value"
              multiple
              size="xl"
              color="neutral"
              highlight
              placeholder="Sélectionner..."
            />
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
