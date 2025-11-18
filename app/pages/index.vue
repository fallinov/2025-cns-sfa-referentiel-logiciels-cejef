<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import type { CostType, Software, CertificationLevel } from "~~/types/software"
import { categories as categoryData } from "~/data/categories"
import { disciplines as disciplineData } from "~/data/disciplines"
import { activities as activityData } from "~/data/activities"
import { CERTIFICATION_LEVELS } from "~/constants/certification-levels"

const { getSoftwareList } = useSoftware()
const softwareList = getSoftwareList()

// Search and filter functionality
const searchQuery = ref("")
const debouncedSearchQuery = ref("")

const selectedCategories = ref<string[]>([])
const selectedDisciplines = ref<string[]>([])
const selectedActivities = ref<string[]>([])
const selectedPlatforms = ref<string[]>([])
const selectedCosts = ref<CostType[]>([])
const selectedCertifications = ref<CertificationLevel[]>([])
const selectedPopularFilters = ref<string[]>([])

// Debounce search input for better performance
const searchDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
watch(searchQuery, (newValue) => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
  searchDebounceTimer.value = setTimeout(() => {
    debouncedSearchQuery.value = newValue
  }, 300)
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

const costOptions = computed(() => {
  const values = Array.from(
    new Set(softwareList.map(software => software.cost))
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

  if (searchQuery.value.trim()) {
    filters.push({
      id: "search",
      label: `Recherche : “${searchQuery.value.trim()}”`
    })
  }

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
  if (filterId === "search") {
    searchQuery.value = ""
    return
  }

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

// Filtered software list based on search and category
const filteredSoftwareList = computed(() => {
  let filtered = softwareList

  // Filter by search query (using debounced value)
  if (debouncedSearchQuery.value.trim()) {
    const query = debouncedSearchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(
      software =>
        software.name.toLowerCase().includes(query)
        || software.shortDescription.toLowerCase().includes(query)
        || software.category.toLowerCase().includes(query)
        || software.disciplines.some(d => d.toLowerCase().includes(query))
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

useSeoMeta({
  title: "Référentiel Logiciels CEJEF",
  description:
    "Référentiel de logiciels pédagogiques pour le CEJEF avec classification LGPD"
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <UPageHero
      title="Référentiel Logiciels CEJEF"
      description="Découvrez les logiciels pédagogiques avec leur classification selon la Loi sur la protection des données (LGPD)"
      class="mb-8"
      :ui="{
        title: 'text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl'
      }"
    >
      <template #links>
        <div class="flex flex-col sm:flex-row gap-3">
          <UBadge
            color="primary"
            variant="soft"
            size="lg"
            class="justify-center sm:justify-start"
          >
            <template #leading>
              <UIcon name="i-lucide-graduation-cap" class="w-4 h-4" />
            </template>
            {{ softwareList.length }} logiciels disponibles
          </UBadge>
          <UBadge
            color="success"
            variant="soft"
            size="lg"
            class="justify-center sm:justify-start"
          >
            <template #leading>
              <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
            </template>
            Classification LGPD
          </UBadge>
        </div>
      </template>
    </UPageHero>

    <!-- Search and Filter Section -->
    <UPageSection>
      <div class="space-y-6">
        <UCard
          class="border border-gray-200/60 dark:border-gray-800 bg-white dark:bg-slate-900"
        >
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            size="lg"
            placeholder="Rechercher un logiciel par nom, description ou discipline..."
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                color="neutral"
                variant="link"
                icon="i-lucide-x"
                :padded="false"
                aria-label="Effacer la recherche"
                @click="searchQuery = ''"
              />
            </template>
          </UInput>
        </UCard>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">
                Filtres populaires
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Sélection rapide des critères les plus utilisés
              </p>
            </div>
            <UButton
              color="primary"
              variant="link"
              size="sm"
              icon="i-lucide-refresh-cw"
              :disabled="!selectedPopularFilters.length"
              @click="resetPopularFilters"
            >
              Réinitialiser
            </UButton>
          </div>
          <div class="flex flex-wrap gap-2.5">
            <UButton
              v-for="filter in popularFilters"
              :key="filter.id"
              :color="
                selectedPopularFilters.includes(filter.id)
                  ? 'primary'
                  : 'neutral'
              "
              :variant="
                selectedPopularFilters.includes(filter.id) ? 'solid' : 'soft'
              "
              :icon="filter.icon"
              :aria-pressed="selectedPopularFilters.includes(filter.id)"
              size="sm"
              class="rounded-full min-h-[44px] px-4"
              role="button"
              @click="togglePopularFilter(filter.id)"
            >
              {{ filter.label }}
            </UButton>
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-sm font-semibold text-gray-900 dark:text-white">
            Filtres les plus courants
          </div>
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <USelectMenu
              v-model="selectedCategories"
              :items="categoryOptions"
              value-key="value"
              multiple
              placeholder="Catégories"
            />
            <USelectMenu
              v-model="selectedDisciplines"
              :items="disciplineOptions"
              value-key="value"
              multiple
              placeholder="Disciplines"
            />
            <USelectMenu
              v-model="selectedActivities"
              :items="activityOptions"
              value-key="value"
              multiple
              placeholder="Activités pédagogiques"
            />
            <USelectMenu
              v-model="selectedPlatforms"
              :items="platformOptions"
              value-key="value"
              multiple
              placeholder="Plateformes"
            />
            <USelectMenu
              v-model="selectedCosts"
              :items="costOptions"
              value-key="value"
              multiple
              placeholder="Coût"
            />
            <USelectMenu
              v-model="selectedCertifications"
              :items="certificationOptions"
              value-key="value"
              multiple
              placeholder="Certification LGPD"
            />
          </div>
        </div>

        <!-- Applied filters summary -->
        <div
          v-if="appliedFilters.length"
          class="rounded-2xl border border-violet-200/70 dark:border-violet-500/20 bg-white/60 dark:bg-white/5 px-4 py-3 flex flex-col gap-2"
        >
          <div
            class="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-violet-700 dark:text-violet-200"
          >
            <UIcon name="i-lucide-filter" class="w-4 h-4" />
            Filtres appliqués
            <span class="text-[11px] text-gray-500 dark:text-gray-400">
              ({{ appliedFilters.length }})
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="filter in appliedFilters"
              :key="filter.id"
              class="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-sm text-violet-900 dark:text-violet-100 px-3 py-1"
            >
              <span class="font-medium">{{ filter.label }}</span>
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-x"
                :padded="false"
                aria-label="Retirer ce filtre"
                @click="removeFilter(filter.id)"
              />
            </div>
          </div>
        </div>

        <!-- Results info and clear filters -->
        <div
          v-if="hasActiveFilters"
          class="flex items-center justify-between text-sm"
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
            size="sm"
            icon="i-lucide-x"
            @click="clearFilters"
          >
            Effacer les filtres
          </UButton>
        </div>
      </div>
    </UPageSection>

    <!-- Software Grid -->
    <UPageSection>
      <div
        v-if="filteredSoftwareList.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <SoftwareCard
          v-for="software in filteredSoftwareList"
          :key="software.id"
          :software="software"
        />
      </div>

      <!-- No results message -->
      <div v-else class="text-center py-12">
        <UIcon
          name="i-lucide-search-x"
          class="w-16 h-16 mx-auto mb-4 text-gray-400"
        />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun logiciel trouvé
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Essayez de modifier vos critères de recherche
        </p>
        <UButton color="primary" variant="soft" @click="clearFilters">
          Afficher tous les logiciels
        </UButton>
      </div>
    </UPageSection>

    <!-- Detail Slideover -->
    <SoftwareDetail />

    <!-- Info Section -->
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
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                Hébergement
              </div>
              <div class="text-xs text-gray-500">
                Localisation
              </div>
            </div>
            <div class="text-center">
              <UIcon
                name="i-lucide-user-check"
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                Données perso.
              </div>
              <div class="text-xs text-gray-500">
                Usage autorisé
              </div>
            </div>
            <div class="text-center">
              <UIcon
                name="i-lucide-shield-check"
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                RGPD
              </div>
              <div class="text-xs text-gray-500">
                Conformité
              </div>
            </div>
            <div class="text-center">
              <UIcon
                name="i-lucide-bar-chart-2"
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                Collecte
              </div>
              <div class="text-xs text-gray-500">
                Niveau
              </div>
            </div>
          </div>
        </template>
      </UPageCTA>
    </UPageSection>
  </div>
</template>
