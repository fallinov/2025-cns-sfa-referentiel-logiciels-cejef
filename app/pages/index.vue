<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import type { CostType, Software, CertificationLevel } from "~~/types/software"
import { categories as categoryData } from "~/data/categories"
import { disciplines as disciplineData } from "~/data/disciplines"
import { activities as activityData } from "~/data/activities"
import { CERTIFICATION_LEVELS } from "~/constants/certification-levels"

const { getSoftwareList } = useSoftware()
const { setFilteredList } = useSoftwareNavigation()
const softwareList = getSoftwareList()

// Search functionality
const searchQuery = ref("")

// Filter functionality
const selectedCategories = ref<string[]>([])
const selectedDisciplines = ref<string[]>([])
const selectedActivities = ref<string[]>([])
const selectedPlatforms = ref<string[]>([])
const selectedCosts = ref<CostType[]>([])
const selectedCertifications = ref<CertificationLevel[]>([])
const selectedPopularFilters = ref<string[]>([])
const isFiltersSlideoverOpen = ref(false)

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

// Filtered software list based on filters and search
const filteredSoftwareList = computed(() => {
  let filtered = softwareList

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(software =>
      software.name.toLowerCase().includes(query)
      || software.shortDescription.toLowerCase().includes(query)
      || software.category.toLowerCase().includes(query)
    )
  }

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

// Synchroniser la liste filtrée avec le composable de navigation
watch(filteredSoftwareList, (newList) => {
  setFilteredList(newList)
}, { immediate: true })

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ""
  selectedCategories.value = []
  selectedDisciplines.value = []
  selectedActivities.value = []
  selectedPlatforms.value = []
  selectedCosts.value = []
  selectedCertifications.value = []
  selectedPopularFilters.value = []
}

// Compact mode toggle
const isCompactMode = ref(false)

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
    <main class="relative z-10">
      <!-- Main Content Section -->
      <UPageSection>
        <!-- Page Header -->
        <header class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Référentiel Logiciels CEJEF
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
            {{ softwareList.length }} logiciels pédagogiques avec classification LGPD
          </p>
        </header>

        <!-- Search Bar -->
        <div class="mb-8">
          <SearchBar
            v-model:search="searchQuery"
            @select-category="(id) => selectedCategories = [id]"
            @select-discipline="(id) => selectedDisciplines = [id]"
          />
        </div>

        <!-- Filters and Results -->
        <div class="space-y-6">
          <!-- Filters Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Filtres
              </h2>
              <UButton
                v-if="hasActiveFilters"
                color="neutral"
                variant="ghost"
                size="sm"
                icon="i-lucide-x"
                @click="clearFilters"
              >
                Tout effacer
              </UButton>
            </div>
            <UButton
              color="neutral"
              variant="soft"
              size="md"
              :icon="isCompactMode ? 'i-lucide-layout-grid' : 'i-lucide-layout-list'"
              @click="isCompactMode = !isCompactMode"
            >
              {{ isCompactMode ? "Vue normale" : "Vue compacte" }}
            </UButton>
          </div>

          <!-- Quick Filters (simplified - only main ones) -->
          <div class="flex flex-wrap gap-2.5">
            <UButton
              color="neutral"
              variant="outline"
              size="lg"
              icon="i-lucide-sliders-horizontal"
              class="font-semibold rounded-full"
              :aria-label="`Ouvrir les filtres avancés${hasActiveFilters ? ` (${appliedFilters.length} actifs)` : ''}`"
              @click="isFiltersSlideoverOpen = true"
            >
              Filtres avancés
              <UBadge
                v-if="hasActiveFilters"
                color="primary"
                variant="solid"
                size="sm"
                class="ml-2"
              >
                {{ appliedFilters.length }}
              </UBadge>
            </UButton>
            <UButton
              :color="selectedPopularFilters.includes('certified-level-1') ? 'primary' : 'neutral'"
              :variant="selectedPopularFilters.includes('certified-level-1') ? 'solid' : 'soft'"
              icon="i-lucide-shield-check"
              size="lg"
              class="font-semibold rounded-full"
              :aria-pressed="selectedPopularFilters.includes('certified-level-1')"
              @click="togglePopularFilter('certified-level-1')"
            >
              Certifié CEJEF
            </UButton>
            <UButton
              :color="selectedPopularFilters.includes('personal-data') ? 'primary' : 'neutral'"
              :variant="selectedPopularFilters.includes('personal-data') ? 'solid' : 'soft'"
              icon="i-lucide-user-check"
              size="lg"
              class="font-semibold rounded-full"
              :aria-pressed="selectedPopularFilters.includes('personal-data')"
              @click="togglePopularFilter('personal-data')"
            >
              Données élèves autorisées
            </UButton>
            <UButton
              :color="selectedPopularFilters.includes('free') ? 'primary' : 'neutral'"
              :variant="selectedPopularFilters.includes('free') ? 'solid' : 'soft'"
              icon="i-lucide-coins"
              size="lg"
              class="font-semibold rounded-full"
              :aria-pressed="selectedPopularFilters.includes('free')"
              @click="togglePopularFilter('free')"
            >
              100% gratuit
            </UButton>
          </div>

          <!-- Applied filters summary -->
          <div
            v-if="appliedFilters.length"
            class="rounded-2xl border border-primary-200/70 dark:border-primary-500/20 bg-white/60 dark:bg-white/5 px-4 py-3 flex flex-col gap-2"
          >
            <div
              class="flex items-center gap-2 text-base uppercase tracking-wide font-semibold text-primary-700 dark:text-primary-200"
            >
              <UIcon name="i-lucide-filter" class="w-5 h-5" />
              Filtres appliqués
              <span class="text-sm text-gray-500 dark:text-gray-400">
                ({{ appliedFilters.length }})
              </span>
            </div>
            <div class="flex flex-wrap gap-2.5">
              <UBadge
                v-for="filter in appliedFilters"
                :key="filter.id"
                color="primary"
                variant="soft"
                size="lg"
              >
                {{ filter.label }}
                <template #trailing>
                  <UButton
                    color="primary"
                    variant="link"
                    icon="i-lucide-x"
                    size="xs"
                    @click="removeFilter(filter.id)"
                  />
                </template>
              </UBadge>
            </div>
          </div>

          <!-- Results info and clear filters -->
          <div
            v-if="hasActiveFilters"
            class="flex items-center justify-between text-lg"
          >
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">{{
                filteredSoftwareList.length
              }}</span>
              {{
                filteredSoftwareList.length > 1
                  ? "logiciels trouvés"
                  : "logiciel trouvé"
              }}
            </p>
            <UButton
              color="neutral"
              variant="ghost"
              size="lg"
              icon="i-lucide-x"
              @click="clearFilters"
            >
              Effacer les filtres
            </UButton>
          </div>
        </div>

        <!-- Software Grid -->
        <section
          v-if="filteredSoftwareList.length > 0"
          aria-label="Liste des logiciels"
        >
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-6"
            :class="{ 'gap-4': isCompactMode }"
          >
            <div
              v-for="software in filteredSoftwareList"
              :key="software.id"
              class="w-full max-w-[450px] h-full"
            >
              <CardLiquidGlass :software="software" shape="curve" :compact="isCompactMode" />
            </div>
          </div>
        </section>

        <!-- No results message -->
        <div v-else class="text-center py-12">
          <UIcon
            name="i-lucide-search-x"
            class="w-20 h-20 mx-auto mb-6 text-gray-400"
          />
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Aucun logiciel trouvé
          </h3>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Essayez de modifier vos critères de recherche
          </p>
          <UButton
            color="primary"
            variant="soft"
            size="lg"
            @click="clearFilters"
          >
            Afficher tous les logiciels
          </UButton>
        </div>
      </UPageSection>
    </main>

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

    <!-- Info Section -->
    <section class="relative z-10">
      <UPageSection class="mt-16">
        <UPageCTA
          title="À propos de la classification LGPD"
          description="Chaque logiciel est évalué selon 4 critères : hébergement des données, utilisation des données personnelles, conformité RGPD et niveau de collecte. Ces informations vous aident à choisir les outils adaptés aux exigences de protection des données."
          variant="subtle"
        >
          <template #links>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <div class="text-center">
                <UIcon
                  name="i-lucide-home"
                  class="w-10 h-10 mx-auto mb-3 text-primary-600 dark:text-primary-400"
                />
                <div class="text-base font-medium">
                  Hébergement
                </div>
                <div class="text-sm text-gray-500">
                  Localisation
                </div>
              </div>
              <div class="text-center">
                <UIcon
                  name="i-lucide-user-check"
                  class="w-10 h-10 mx-auto mb-3 text-primary-600 dark:text-primary-400"
                />
                <div class="text-base font-medium">
                  Données perso.
                </div>
                <div class="text-sm text-gray-500">
                  Usage autorisé
                </div>
              </div>
              <div class="text-center">
                <UIcon
                  name="i-lucide-shield-check"
                  class="w-10 h-10 mx-auto mb-3 text-primary-600 dark:text-primary-400"
                />
                <div class="text-base font-medium">
                  RGPD
                </div>
                <div class="text-sm text-gray-500">
                  Conformité
                </div>
              </div>
              <div class="text-center">
                <UIcon
                  name="i-lucide-bar-chart-2"
                  class="w-10 h-10 mx-auto mb-3 text-primary-600 dark:text-primary-400"
                />
                <div class="text-base font-medium">
                  Collecte
                </div>
                <div class="text-sm text-gray-500">
                  Niveau
                </div>
              </div>
            </div>
          </template>
        </UPageCTA>
      </UPageSection>
    </section>
  </div>
</template>
