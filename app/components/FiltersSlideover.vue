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
  filteredCount: number
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

type FilterView
  = | "main"
    | "categories"
    | "disciplines"
    | "activities"
    | "platforms"
    | "costs"
    | "certifications"
const currentView = ref<FilterView>("main")

// Navigate to sub-view
const navigateToView = (view: FilterView) => {
  currentView.value = view
}

// Go back to main view
const goBack = () => {
  currentView.value = "main"
}

// Options for filters
const usedCategoryIds = computed(
  () => new Set(props.softwareList.map(software => software.category))
)
const categoryOptions = computed(() =>
  categoryData
    .filter(category => usedCategoryIds.value.has(category.id))
    .map(category => ({
      label: category.name,
      value: category.id,
      count: props.softwareList.filter(s => s.category === category.id)
        .length
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
      value: discipline.id,
      count: props.softwareList.filter(s =>
        s.disciplines.includes(discipline.id)
      ).length
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
      value: activity.id,
      count: props.softwareList.filter(s => s.activity === activity.id)
        .length
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
    value,
    count: props.softwareList.filter(s => s.platforms.includes(value)).length
  }))
})

const costOptions = computed(() => {
  const values = Array.from(
    new Set(props.softwareList.map(software => software.cost))
  )
  return values.map(cost => ({
    label: cost,
    value: cost,
    count: props.softwareList.filter(s => s.cost === cost).length
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

// Toggle selection helpers
const toggleCategory = (value: string) => {
  const current = props.selectedCategories
  if (current.includes(value)) {
    emit(
      "update:selectedCategories",
      current.filter(v => v !== value)
    )
  } else {
    emit("update:selectedCategories", [...current, value])
  }
}

const toggleDiscipline = (value: string) => {
  const current = props.selectedDisciplines
  if (current.includes(value)) {
    emit(
      "update:selectedDisciplines",
      current.filter(v => v !== value)
    )
  } else {
    emit("update:selectedDisciplines", [...current, value])
  }
}

const toggleActivity = (value: string) => {
  const current = props.selectedActivities
  if (current.includes(value)) {
    emit(
      "update:selectedActivities",
      current.filter(v => v !== value)
    )
  } else {
    emit("update:selectedActivities", [...current, value])
  }
}

const togglePlatform = (value: string) => {
  const current = props.selectedPlatforms
  if (current.includes(value)) {
    emit(
      "update:selectedPlatforms",
      current.filter(v => v !== value)
    )
  } else {
    emit("update:selectedPlatforms", [...current, value])
  }
}

const toggleCost = (value: CostType) => {
  const current = props.selectedCosts
  if (current.includes(value)) {
    emit(
      "update:selectedCosts",
      current.filter(v => v !== value)
    )
  } else {
    emit("update:selectedCosts", [...current, value])
  }
}

const toggleCertification = (value: CertificationLevel) => {
  const current = props.selectedCertifications
  if (current.includes(value)) {
    emit(
      "update:selectedCertifications",
      current.filter(v => v !== value)
    )
  } else {
    emit("update:selectedCertifications", [...current, value])
  }
}

// Reset view when closing
watch(isOpen, (newValue) => {
  if (!newValue) {
    currentView.value = "main"
  }
})

// Footer button text
const footerButtonText = computed(() => {
  if (hasActiveFilters.value) {
    return `Montrer ${props.filteredCount} produit${props.filteredCount > 1 ? "s" : ""}`
  }
  return "Fermer"
})

// Close slideover
const closeAndApply = () => {
  isOpen.value = false
}

// Main menu items
const mainMenuItems = computed(() => [
  {
    label: "Catégories",
    view: "categories" as FilterView,
    count: props.selectedCategories.length
  },
  {
    label: "Disciplines",
    view: "disciplines" as FilterView,
    count: props.selectedDisciplines.length
  },
  {
    label: "Activités pédagogiques",
    view: "activities" as FilterView,
    count: props.selectedActivities.length
  },
  {
    label: "Plateformes",
    view: "platforms" as FilterView,
    count: props.selectedPlatforms.length
  },
  {
    label: "Coût",
    view: "costs" as FilterView,
    count: props.selectedCosts.length
  },
  {
    label: "Certification LGPD",
    view: "certifications" as FilterView,
    count: props.selectedCertifications.length
  }
])
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    side="left"
    :ui="{ content: 'w-full sm:max-w-md' }"
  >
    <template #body>
      <div class="flex flex-col h-full">
        <!-- Main View -->
        <div v-if="currentView === 'main'" class="flex flex-col h-full">
          <!-- Header -->
          <div
            class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800"
          >
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Filtre
            </h2>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              size="sm"
              square
              @click="isOpen = false"
            />
          </div>

          <!-- Reset all button -->
          <div v-if="hasActiveFilters" class="py-4">
            <UButton
              color="neutral"
              variant="link"
              @click="emit('clearFilters')"
            >
              Réinitialiser tout
            </UButton>
          </div>

          <!-- Menu items -->
          <div class="flex-1 overflow-y-auto">
            <div class="divide-y divide-gray-200 dark:divide-gray-800">
              <button
                v-for="item in mainMenuItems"
                :key="item.view"
                class="w-full flex items-center justify-between py-4 px-1 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                @click="navigateToView(item.view)"
              >
                <span
                  class="text-base font-medium text-gray-900 dark:text-white"
                >
                  {{ item.label }}
                </span>
                <div class="flex items-center gap-2">
                  <span
                    v-if="item.count > 0"
                    class="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ item.count }}
                  </span>
                  <UIcon
                    name="i-lucide-chevron-right"
                    class="w-5 h-5 text-gray-400"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Categories View -->
        <div
          v-else-if="currentView === 'categories'"
          class="flex flex-col h-full"
        >
          <div
            class="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800"
          >
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-arrow-left"
              size="sm"
              square
              @click="goBack"
            />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Catégories
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto py-4">
            <div class="space-y-1">
              <label
                v-for="option in categoryOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <UCheckbox
                    :model-value="selectedCategories.includes(option.value)"
                    @update:model-value="toggleCategory(option.value)"
                  />
                  <span class="text-base text-gray-900 dark:text-white">
                    {{ option.label }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ option.count }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Disciplines View -->
        <div
          v-else-if="currentView === 'disciplines'"
          class="flex flex-col h-full"
        >
          <div
            class="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800"
          >
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-arrow-left"
              size="sm"
              square
              @click="goBack"
            />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Disciplines
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto py-4">
            <div class="space-y-1">
              <label
                v-for="option in disciplineOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <UCheckbox
                    :model-value="selectedDisciplines.includes(option.value)"
                    @update:model-value="toggleDiscipline(option.value)"
                  />
                  <span class="text-base text-gray-900 dark:text-white">
                    {{ option.label }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ option.count }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Activities View -->
        <div
          v-else-if="currentView === 'activities'"
          class="flex flex-col h-full"
        >
          <div
            class="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800"
          >
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-arrow-left"
              size="sm"
              square
              @click="goBack"
            />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Activités pédagogiques
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto py-4">
            <div class="space-y-1">
              <label
                v-for="option in activityOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <UCheckbox
                    :model-value="selectedActivities.includes(option.value)"
                    @update:model-value="toggleActivity(option.value)"
                  />
                  <span class="text-base text-gray-900 dark:text-white">
                    {{ option.label }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ option.count }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Platforms View -->
        <div
          v-else-if="currentView === 'platforms'"
          class="flex flex-col h-full"
        >
          <div
            class="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800"
          >
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-arrow-left"
              size="sm"
              square
              @click="goBack"
            />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Plateformes
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto py-4">
            <div class="space-y-1">
              <label
                v-for="option in platformOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <UCheckbox
                    :model-value="selectedPlatforms.includes(option.value)"
                    @update:model-value="togglePlatform(option.value)"
                  />
                  <span class="text-base text-gray-900 dark:text-white">
                    {{ option.label }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ option.count }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Costs View -->
        <div v-else-if="currentView === 'costs'" class="flex flex-col h-full">
          <div
            class="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800"
          >
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-arrow-left"
              size="sm"
              square
              @click="goBack"
            />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Coût
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto py-4">
            <div class="space-y-1">
              <label
                v-for="option in costOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <UCheckbox
                    :model-value="selectedCosts.includes(option.value)"
                    @update:model-value="toggleCost(option.value)"
                  />
                  <span class="text-base text-gray-900 dark:text-white">
                    {{ option.label }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ option.count }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Certifications View -->
        <div
          v-else-if="currentView === 'certifications'"
          class="flex flex-col h-full"
        >
          <div
            class="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800"
          >
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-arrow-left"
              size="sm"
              square
              @click="goBack"
            />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Certification LGPD
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto py-4">
            <div class="space-y-1">
              <label
                v-for="option in certificationOptions"
                :key="`cert-${option.value}`"
                class="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <UCheckbox
                    :model-value="selectedCertifications.includes(option.value)"
                    @update:model-value="toggleCertification(option.value)"
                  />
                  <div>
                    <div class="text-base text-gray-900 dark:text-white">
                      {{ option.label }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ option.description }}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Footer -->
    <template #footer>
      <UButton
        color="primary"
        variant="solid"
        size="xl"
        block
        @click="closeAndApply"
      >
        {{ footerButtonText }}
      </UButton>
    </template>
  </USlideover>
</template>
