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

// Reset current view filters
const resetCurrentView = () => {
  switch (currentView.value) {
    case "categories":
      emit("update:selectedCategories", [])
      break
    case "disciplines":
      emit("update:selectedDisciplines", [])
      break
    case "activities":
      emit("update:selectedActivities", [])
      break
    case "platforms":
      emit("update:selectedPlatforms", [])
      break
    case "costs":
      emit("update:selectedCosts", [])
      break
    case "certifications":
      emit("update:selectedCertifications", [])
      break
  }
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

// Current view title
const currentViewTitle = computed(() => {
  switch (currentView.value) {
    case "main":
      return "Filtre"
    case "categories":
      return "Catégories"
    case "disciplines":
      return "Disciplines"
    case "activities":
      return "Activités pédagogiques"
    case "platforms":
      return "Plateformes"
    case "costs":
      return "Coût"
    case "certifications":
      return "Certification LGPD"
    default:
      return "Filtre"
  }
})

// Current view selection count
const currentViewCount = computed(() => {
  switch (currentView.value) {
    case "main":
      return hasActiveFilters.value
        ? props.selectedCategories.length
        + props.selectedDisciplines.length
        + props.selectedActivities.length
        + props.selectedPlatforms.length
        + props.selectedCosts.length
        + props.selectedCertifications.length
        : 0
    case "categories":
      return props.selectedCategories.length
    case "disciplines":
      return props.selectedDisciplines.length
    case "activities":
      return props.selectedActivities.length
    case "platforms":
      return props.selectedPlatforms.length
    case "costs":
      return props.selectedCosts.length
    case "certifications":
      return props.selectedCertifications.length
    default:
      return 0
  }
})
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    side="left"
    :ui="{
      content: 'w-full sm:max-w-md',
      body: 'p-0'
    }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <UButton
            v-if="currentView !== 'main'"
            color="neutral"
            variant="ghost"
            icon="i-lucide-chevron-left"
            size="sm"
            square
            @click="goBack"
          />
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ currentViewTitle }}
            </h2>
            <UBadge
              v-if="currentViewCount > 0"
              color="neutral"
              variant="solid"
              size="md"
            >
              {{ currentViewCount }}
            </UBadge>
          </div>
        </div>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          size="sm"
          square
          @click="isOpen = false"
        />
      </div>
    </template>

    <template #body>
      <div class="flex flex-col h-full">
        <!-- Main View -->
        <div v-if="currentView === 'main'" class="flex flex-col h-full">
          <!-- Reset all button -->
          <UButton
            :color="hasActiveFilters ? 'primary' : 'neutral'"
            variant="ghost"
            size="lg"
            block
            :disabled="!hasActiveFilters"
            class="justify-start"
            @click="emit('clearFilters')"
          >
            Réinitialiser tout
          </UButton>

          <!-- Menu items -->
          <div class="flex-1 overflow-y-auto">
            <div class="divide-y divide-gray-200 dark:divide-gray-800">
              <UButton
                v-for="item in mainMenuItems"
                :key="item.view"
                color="neutral"
                variant="ghost"
                size="lg"
                block
                class="justify-between"
                @click="navigateToView(item.view)"
              >
                <template #leading>
                  <span class="text-base font-medium">
                    {{ item.label }}
                  </span>
                </template>
                <template #trailing>
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
                </template>
              </UButton>
            </div>
          </div>
        </div>

        <!-- Categories View -->
        <div
          v-else-if="currentView === 'categories'"
          class="flex flex-col h-full"
        >
          <!-- Reset button -->
          <UButton
            :color="selectedCategories.length > 0 ? 'primary' : 'neutral'"
            variant="ghost"
            size="lg"
            block
            :disabled="selectedCategories.length === 0"
            class="justify-start"
            @click="resetCurrentView"
          >
            Réinitialiser
          </UButton>

          <div class="flex-1 overflow-y-auto">
            <div class="space-y-1">
              <label
                v-for="option in categoryOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
          <!-- Reset button -->
          <UButton
            :color="selectedDisciplines.length > 0 ? 'primary' : 'neutral'"
            variant="ghost"
            size="lg"
            block
            :disabled="selectedDisciplines.length === 0"
            class="justify-start"
            @click="resetCurrentView"
          >
            Réinitialiser
          </UButton>

          <div class="flex-1 overflow-y-auto">
            <div class="space-y-1">
              <label
                v-for="option in disciplineOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
          <!-- Reset button -->
          <UButton
            :color="selectedActivities.length > 0 ? 'primary' : 'neutral'"
            variant="ghost"
            size="lg"
            block
            :disabled="selectedActivities.length === 0"
            class="justify-start"
            @click="resetCurrentView"
          >
            Réinitialiser
          </UButton>

          <div class="flex-1 overflow-y-auto">
            <div class="space-y-1">
              <label
                v-for="option in activityOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
          <!-- Reset button -->
          <UButton
            :color="selectedPlatforms.length > 0 ? 'primary' : 'neutral'"
            variant="ghost"
            size="lg"
            block
            :disabled="selectedPlatforms.length === 0"
            class="justify-start"
            @click="resetCurrentView"
          >
            Réinitialiser
          </UButton>

          <div class="flex-1 overflow-y-auto">
            <div class="space-y-1">
              <label
                v-for="option in platformOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
          <!-- Reset button -->
          <UButton
            :color="selectedCosts.length > 0 ? 'primary' : 'neutral'"
            variant="ghost"
            size="lg"
            block
            :disabled="selectedCosts.length === 0"
            class="justify-start"
            @click="resetCurrentView"
          >
            Réinitialiser
          </UButton>

          <div class="flex-1 overflow-y-auto">
            <div class="space-y-1">
              <label
                v-for="option in costOptions"
                :key="option.value"
                class="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
          <!-- Reset button -->
          <UButton
            :color="selectedCertifications.length > 0 ? 'primary' : 'neutral'"
            variant="ghost"
            size="lg"
            block
            :disabled="selectedCertifications.length === 0"
            class="justify-start"
            @click="resetCurrentView"
          >
            Réinitialiser
          </UButton>

          <div class="flex-1 overflow-y-auto">
            <div class="space-y-1">
              <label
                v-for="option in certificationOptions"
                :key="`cert-${option.value}`"
                class="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
