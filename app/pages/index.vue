<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import type { CostType, Software, CertificationLevel } from "~~/types/software"
import { categories as categoryData } from "~/data/categories"
import { disciplines as disciplineData } from "~/data/disciplines"
import { activities as activityData } from "~/data/activities"
import { CERTIFICATION_LEVELS } from "~/constants/certification-levels"

const { getSoftwareList } = useSoftware()
const softwareList = getSoftwareList()

// Filter functionality (search is handled by global CommandPalette)
const selectedCategories = ref<string[]>([])
const selectedDisciplines = ref<string[]>([])
const selectedActivities = ref<string[]>([])
const selectedPlatforms = ref<string[]>([])
const selectedCosts = ref<CostType[]>([])
const selectedCertifications = ref<CertificationLevel[]>([])
const selectedPopularFilters = ref<string[]>([])
const isFiltersSlideoverOpen = ref(false)

// Scroll functionality for popular filters
const filtersScrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const updateScrollButtons = () => {
  if (!filtersScrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = filtersScrollContainer.value
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1
}

const scrollFilters = (direction: "left" | "right") => {
  if (!filtersScrollContainer.value) return
  const scrollAmount = 300
  filtersScrollContainer.value.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth"
  })
}

onMounted(() => {
  if (filtersScrollContainer.value) {
    updateScrollButtons()
    filtersScrollContainer.value.addEventListener(
      "scroll",
      updateScrollButtons
    )
    window.addEventListener("resize", updateScrollButtons)
  }
})

onUnmounted(() => {
  if (filtersScrollContainer.value) {
    filtersScrollContainer.value.removeEventListener(
      "scroll",
      updateScrollButtons
    )
    window.removeEventListener("resize", updateScrollButtons)
  }
})

// Options for select menus - memoized to avoid recalculation
const usedCategoryIds = computed(
  () => new Set(softwareList.map(software => software.category))
)
const categoryOptions = computed(() =>
  categoryData
    .filter(category => usedCategoryIds.value.has(category.id))
    .map(category => ({
      label: category.name,
      value: category.id
    }))
)
const categoryLabelMap = computed(() =>
  Object.fromEntries(
    categoryOptions.value.map(option => [option.value, option.label])
  )
)

const usedDisciplineIds = computed(
  () => new Set(softwareList.flatMap(software => software.disciplines))
)
const disciplineOptions = computed(() =>
  disciplineData
    .filter(discipline => usedDisciplineIds.value.has(discipline.id))
    .map(discipline => ({
      label: discipline.name,
      value: discipline.id
    }))
)
const disciplineLabelMap = computed(() =>
  Object.fromEntries(
    disciplineOptions.value.map(option => [option.value, option.label])
  )
)

const usedActivityIds = computed(
  () => new Set(softwareList.map(software => software.activity))
)
const activityOptions = computed(() =>
  activityData
    .filter(activity => usedActivityIds.value.has(activity.id))
    .map(activity => ({
      label: activity.name,
      value: activity.id
    }))
)
const activityLabelMap = computed(() =>
  Object.fromEntries(
    activityOptions.value.map(option => [option.value, option.label])
  )
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
  softwareList.forEach((software) => {
    software.platforms.forEach(platform => values.add(platform))
  })
  return Array.from(values).map(value => ({
    label: platformLabels[value] ?? value,
    value
  }))
})
const platformLabelMap = computed(() =>
  Object.fromEntries(
    platformOptions.value.map(option => [option.value, option.label])
  )
)

const certificationLevelLabels = computed(() =>
  Object.fromEntries(
    CERTIFICATION_LEVELS.map(level => [level.value, level.label])
  )
)

const popularFilters = [
  {
    id: "certified-level-1",
    label: "Certifié CEJEF",
    icon: "i-lucide-shield-check",
    predicate: (software: Software) => {
      const level
        = software.certificationLevel ?? getCertificationLevel(software.lgpd)
      return level === 1
    }
  },
  {
    id: "personal-data",
    label: "Données élèves autorisées",
    icon: "i-lucide-user-check",
    predicate: (software: Software) => software.personalData
  },
  {
    id: "supported-cejef",
    label: "Support CEJEF",
    icon: "i-lucide-headset",
    predicate: (software: Software) => software.supportedByCEJEF
  },
  {
    id: "campus-training",
    label: "Formation disponible",
    icon: "i-lucide-graduation-cap",
    predicate: (software: Software) => software.campusTraining
  },
  {
    id: "no-account",
    label: "Aucun compte requis",
    icon: "i-lucide-zap",
    predicate: (software: Software) => !software.accountRequired
  },
  {
    id: "free",
    label: "100% gratuit",
    icon: "i-lucide-coins",
    predicate: (software: Software) => software.cost === "Gratuit"
  }
] as const
const popularFilterMap = popularFilters.reduce(
  (acc, filter) => {
    acc[filter.id] = filter
    return acc
  },
  {} as Record<string, (typeof popularFilters)[number]>
)

const togglePopularFilter = (filterId: string) => {
  if (selectedPopularFilters.value.includes(filterId)) {
    selectedPopularFilters.value = selectedPopularFilters.value.filter(
      id => id !== filterId
    )
  } else {
    selectedPopularFilters.value = [...selectedPopularFilters.value, filterId]
  }
}

const resetPopularFilters = () => {
  selectedPopularFilters.value = []
}

const appliedFilters = computed(() => {
  const filters: Array<{ id: string, label: string }> = []

  selectedPopularFilters.value.forEach((filterId) => {
    const filter = popularFilterMap[filterId]
    if (filter) {
      filters.push({
        id: `popular-${filter.id}`,
        label: filter.label
      })
    }
  })

  selectedCategories.value.forEach((categoryId) => {
    filters.push({
      id: `category-${categoryId}`,
      label: `Catégorie : ${categoryLabelMap.value[categoryId] ?? categoryId}`
    })
  })

  selectedDisciplines.value.forEach((disciplineId) => {
    filters.push({
      id: `discipline-${disciplineId}`,
      label: `Discipline : ${disciplineLabelMap.value[disciplineId] ?? disciplineId}`
    })
  })

  selectedActivities.value.forEach((activityId) => {
    filters.push({
      id: `activity-${activityId}`,
      label: `Activité : ${activityLabelMap.value[activityId] ?? activityId}`
    })
  })

  selectedPlatforms.value.forEach((platformId) => {
    filters.push({
      id: `platform-${platformId}`,
      label: `Plateforme : ${platformLabelMap.value[platformId] ?? platformId}`
    })
  })

  selectedCosts.value.forEach((cost) => {
    filters.push({
      id: `cost-${cost}`,
      label: `Coût : ${cost}`
    })
  })

  selectedCertifications.value.forEach((level) => {
    if (level !== null) {
      filters.push({
        id: `certification-${level}`,
        label: certificationLevelLabels.value[level] ?? `Niveau ${level}`
      })
    }
  })

  return filters
})

const hasActiveFilters = computed(() => {
  return appliedFilters.value.length > 0
})

const removeFilter = (filterId: string) => {
  if (filterId.startsWith("popular-")) {
    const id = filterId.replace("popular-", "")
    selectedPopularFilters.value = selectedPopularFilters.value.filter(
      filter => filter !== id
    )
    return
  }

  if (filterId.startsWith("category-")) {
    const id = filterId.replace("category-", "")
    selectedCategories.value = selectedCategories.value.filter(
      category => category !== id
    )
    return
  }

  if (filterId.startsWith("discipline-")) {
    const id = filterId.replace("discipline-", "")
    selectedDisciplines.value = selectedDisciplines.value.filter(
      discipline => discipline !== id
    )
    return
  }

  if (filterId.startsWith("activity-")) {
    const id = filterId.replace("activity-", "")
    selectedActivities.value = selectedActivities.value.filter(
      activity => activity !== id
    )
    return
  }

  if (filterId.startsWith("platform-")) {
    const id = filterId.replace("platform-", "")
    selectedPlatforms.value = selectedPlatforms.value.filter(
      platform => platform !== id
    )
    return
  }

  if (filterId.startsWith("cost-")) {
    const id = filterId.replace("cost-", "") as CostType
    selectedCosts.value = selectedCosts.value.filter(cost => cost !== id)
    return
  }

  if (filterId.startsWith("certification-")) {
    const level = Number(
      filterId.replace("certification-", "")
    ) as CertificationLevel
    selectedCertifications.value = selectedCertifications.value.filter(
      value => value !== level
    )
  }
}

// Filtered software list based on filters (search is handled by global CommandPalette)
const filteredSoftwareList = computed(() => {
  let filtered = softwareList

  // Filter by categories
  if (selectedCategories.value.length) {
    filtered = filtered.filter(software =>
      selectedCategories.value.includes(software.category)
    )
  }

  // Filter by disciplines
  if (selectedDisciplines.value.length) {
    filtered = filtered.filter(software =>
      software.disciplines.some(discipline =>
        selectedDisciplines.value.includes(discipline)
      )
    )
  }

  // Filter by activity
  if (selectedActivities.value.length) {
    filtered = filtered.filter(software =>
      selectedActivities.value.includes(software.activity)
    )
  }

  // Filter by platforms
  if (selectedPlatforms.value.length) {
    filtered = filtered.filter(software =>
      software.platforms.some(platform =>
        selectedPlatforms.value.includes(platform)
      )
    )
  }

  // Filter by cost
  if (selectedCosts.value.length) {
    filtered = filtered.filter(software =>
      selectedCosts.value.includes(software.cost)
    )
  }

  // Filter by certification level
  const activeLevels = selectedCertifications.value
  if (activeLevels.length) {
    filtered = filtered.filter((software) => {
      const softwareLevel
        = software.certificationLevel
          ?? getCertificationLevel(software.lgpd)
          ?? 3
      return activeLevels.includes(softwareLevel)
    })
  }

  // Filter by popular quick filters
  if (selectedPopularFilters.value.length) {
    filtered = filtered.filter(software =>
      selectedPopularFilters.value.every(id =>
        popularFilterMap[id]?.predicate(software)
      )
    )
  }

  return filtered
})

// Clear all filters
const clearFilters = () => {
  selectedCategories.value = []
  selectedDisciplines.value = []
  selectedActivities.value = []
  selectedPlatforms.value = []
  selectedCosts.value = []
  selectedCertifications.value = []
  selectedPopularFilters.value = []
}

useSeoMeta({
  title: "Référentiel Logiciels CEJEF",
  description:
    "Référentiel de logiciels pédagogiques pour le CEJEF avec classification LGPD"
})
</script>

<template>
  <div class="min-h-screen relative">
    <!-- Background Aurora Effect -->
    <BackgroundAurora />

    <!-- Content Wrapper -->
    <div class="relative z-10">
      <!-- Hero Section with Liquid Glass styling -->
      <UPageHero
        title="Référentiel Logiciels CEJEF"
        description="Découvrez les logiciels pédagogiques avec leur classification selon la Loi sur la protection des données (LGPD)"
        class="mb-8"
        :ui="{
          title: 'text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl tracking-tight',
          description: 'text-lg text-gray-700 dark:text-gray-300 font-medium'
        }"
      >
        <template #links>
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="px-5 py-3 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lg flex items-center gap-3 justify-center sm:justify-start">
              <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span class="text-base font-bold text-gray-900 dark:text-white">
                {{ softwareList.length }} logiciels disponibles
              </span>
            </div>
            <div class="px-5 py-3 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lg flex items-center gap-3 justify-center sm:justify-start">
              <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span class="text-base font-bold text-gray-900 dark:text-white">
                Classification LGPD
              </span>
            </div>
          </div>
        </template>
      </UPageHero>

      <!-- Filter Section -->
      <UPageSection>
        <div class="space-y-6">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Filtres populaires
                </div>
                <p class="text-base text-gray-600 dark:text-gray-400 font-medium">
                  Sélection rapide des critères les plus utilisés
                </p>
              </div>
              <button
                :disabled="!selectedPopularFilters.length"
                class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
                :class="selectedPopularFilters.length
                  ? 'bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lg hover:bg-white/60 dark:hover:bg-white/10 text-rose-600 dark:text-rose-400'
                  : 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600'"
                @click="resetPopularFilters"
              >
                <UIcon name="i-lucide-refresh-cw" class="w-4 h-4" />
                <span class="text-base font-bold">Réinitialiser</span>
              </button>
            </div>
            <div class="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <!-- Left scroll button with Liquid Glass effect -->
              <button
                v-if="canScrollLeft"
                class="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/70 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300"
                @click="scrollFilters('left')"
              >
                <UIcon
                  name="i-lucide-chevron-left"
                  class="w-6 h-6 text-gray-900 dark:text-white"
                />
              </button>

              <!-- Scroll container -->
              <div
                ref="filtersScrollContainer"
                class="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2"
              >
                <button
                  class="shrink-0 flex items-center gap-2 px-5 py-3 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/70 dark:border-white/10 shadow-lg hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300"
                  @click="isFiltersSlideoverOpen = true"
                >
                  <UIcon name="i-lucide-sliders-horizontal" class="w-5 h-5 text-gray-900 dark:text-white" />
                  <span class="text-base font-bold text-gray-900 dark:text-white">Filtres</span>
                </button>
                <button
                  v-for="filter in popularFilters"
                  :key="filter.id"
                  class="shrink-0 flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300"
                  :class="selectedPopularFilters.includes(filter.id)
                    ? 'bg-rose-600/90 dark:bg-rose-600/80 border-rose-500/50 dark:border-rose-400/30 text-white hover:bg-rose-600 dark:hover:bg-rose-600/90 shadow-rose-500/20'
                    : 'bg-white/50 dark:bg-white/5 border-white/70 dark:border-white/10 text-gray-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/10'"
                  @click="togglePopularFilter(filter.id)"
                >
                  <UIcon :name="filter.icon" class="w-5 h-5" />
                  <span class="text-base font-bold">{{ filter.label }}</span>
                </button>
              </div>

              <!-- Right scroll button with Liquid Glass effect -->
              <button
                v-if="canScrollRight"
                class="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/70 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300"
                @click="scrollFilters('right')"
              >
                <UIcon
                  name="i-lucide-chevron-right"
                  class="w-6 h-6 text-gray-900 dark:text-white"
                />
              </button>
            </div>
          </div>

          <!-- Applied filters summary with Liquid Glass -->
          <div
            v-if="appliedFilters.length"
            class="rounded-[24px] border border-rose-200/50 dark:border-rose-500/20 bg-white/50 dark:bg-white/5 backdrop-blur-md px-5 py-4 flex flex-col gap-3 shadow-lg"
          >
            <div
              class="flex items-center gap-2 text-base uppercase tracking-widest font-bold text-rose-700 dark:text-rose-300"
            >
              <UIcon name="i-lucide-filter" class="w-5 h-5" />
              Filtres appliqués
              <span class="text-sm font-bold text-gray-600 dark:text-gray-400">
                ({{ appliedFilters.length }})
              </span>
            </div>
            <div class="flex flex-wrap gap-2.5">
              <div
                v-for="filter in appliedFilters"
                :key="filter.id"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600/90 dark:bg-rose-600/80 backdrop-blur-sm border border-rose-500/50 dark:border-rose-400/30 text-white shadow-md"
              >
                <span class="text-sm font-bold">{{ filter.label }}</span>
                <button
                  class="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  @click="removeFilter(filter.id)"
                >
                  <UIcon name="i-lucide-x" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Results info and clear filters -->
          <div
            v-if="hasActiveFilters"
            class="flex items-center justify-between text-lg"
          >
            <p class="text-gray-700 dark:text-gray-300 font-medium">
              <span class="font-bold text-gray-900 dark:text-white">{{
                filteredSoftwareList.length
              }}</span>
              {{
                filteredSoftwareList.length > 1
                  ? "logiciels trouvés"
                  : "logiciel trouvé"
              }}
            </p>
            <button
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 text-gray-900 dark:text-white"
              @click="clearFilters"
            >
              <UIcon name="i-lucide-x" class="w-4 h-4" />
              <span class="text-base font-bold">Effacer les filtres</span>
            </button>
          </div>
        </div>

        <!-- Software Grid -->
        <div
          v-if="filteredSoftwareList.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-6"
        >
          <div
            v-for="software in filteredSoftwareList"
            :key="software.id"
            class="w-full max-w-[450px] h-full"
          >
            <CardLiquidGlass :software="software" shape="curve" />
          </div>
        </div>

        <!-- No results message with Liquid Glass -->
        <div v-else class="text-center py-12">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lg mx-auto mb-6">
            <UIcon
              name="i-lucide-search-x"
              class="w-10 h-10 text-gray-600 dark:text-gray-400"
            />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Aucun logiciel trouvé
          </h3>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">
            Essayez de modifier vos critères de recherche
          </p>
          <button
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600/90 dark:bg-rose-600/80 backdrop-blur-md border border-rose-500/50 dark:border-rose-400/30 text-white shadow-lg hover:bg-rose-600 dark:hover:bg-rose-600/90 transition-all duration-300"
            @click="clearFilters"
          >
            <span class="text-base font-bold">Afficher tous les logiciels</span>
          </button>
        </div>
      </UPageSection>

      <!-- Detail Slideover -->
      <SoftwareDetail />

      <!-- Filters Slideover -->
      <FiltersSlideover
        v-model:open="isFiltersSlideoverOpen"
        v-model:selected-categories="selectedCategories"
        v-model:selected-disciplines="selectedDisciplines"
        v-model:selected-activities="selectedActivities"
        v-model:selected-platforms="selectedPlatforms"
        v-model:selected-costs="selectedCosts"
        v-model:selected-certifications="selectedCertifications"
        :software-list="softwareList"
        :filtered-count="filteredSoftwareList.length"
        @clear-filters="clearFilters"
      />

      <!-- Info Section with Liquid Glass -->
      <UPageSection class="mt-16">
        <div class="rounded-[32px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] p-8 md:p-12">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              À propos de la classification LGPD
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto">
              Chaque logiciel est évalué selon 4 critères : hébergement des données, utilisation des données personnelles, conformité RGPD et niveau de collecte. Ces informations vous aident à choisir les outils adaptés aux exigences de protection des données.
            </p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center p-4 rounded-[20px] bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100/80 dark:bg-rose-900/30 mb-3">
                <UIcon
                  name="i-lucide-home"
                  class="w-7 h-7 text-rose-600 dark:text-rose-400"
                />
              </div>
              <div class="text-base font-bold text-gray-900 dark:text-white">
                Hébergement
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Localisation
              </div>
            </div>
            <div class="text-center p-4 rounded-[20px] bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100/80 dark:bg-rose-900/30 mb-3">
                <UIcon
                  name="i-lucide-user-check"
                  class="w-7 h-7 text-rose-600 dark:text-rose-400"
                />
              </div>
              <div class="text-base font-bold text-gray-900 dark:text-white">
                Données perso.
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Usage autorisé
              </div>
            </div>
            <div class="text-center p-4 rounded-[20px] bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100/80 dark:bg-rose-900/30 mb-3">
                <UIcon
                  name="i-lucide-shield-check"
                  class="w-7 h-7 text-rose-600 dark:text-rose-400"
                />
              </div>
              <div class="text-base font-bold text-gray-900 dark:text-white">
                RGPD
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Conformité
              </div>
            </div>
            <div class="text-center p-4 rounded-[20px] bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100/80 dark:bg-rose-900/30 mb-3">
                <UIcon
                  name="i-lucide-bar-chart-2"
                  class="w-7 h-7 text-rose-600 dark:text-rose-400"
                />
              </div>
              <div class="text-base font-bold text-gray-900 dark:text-white">
                Collecte
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Niveau
              </div>
            </div>
          </div>
        </div>
      </UPageSection>
    </div>
  </div>
</template>
