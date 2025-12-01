<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import { getCertificationConfig, getCertificationColors, getCertificationIcon } from "~/utils/certification"

/**
 * Page de détail d'un logiciel (version simplifiée)
 * Route: /logiciels/[id]
 */

const route = useRoute()
const { getSoftwareById } = useSoftware()
const { getPreviousSoftware, getNextSoftware } = useSoftwareNavigation()
const { getSimilarSoftware } = useSimilarSoftware()

// Récupérer le logiciel via l'ID dans l'URL
const softwareId = computed(() => route.params.id as string)
const software = computed(() => getSoftwareById(softwareId.value))

// Navigation suivant/précédent
const previousSoftware = computed(() => software.value ? getPreviousSoftware(software.value.id) : null)
const nextSoftware = computed(() => software.value ? getNextSoftware(software.value.id) : null)

// Navigation au clavier avec les flèches
defineShortcuts({
  arrowleft: () => {
    if (previousSoftware.value) {
      navigateTo(`/logiciels/${previousSoftware.value.id}`)
    }
  },
  arrowright: () => {
    if (nextSoftware.value) {
      navigateTo(`/logiciels/${nextSoftware.value.id}`)
    }
  },
  escape: () => {
    navigateTo("/")
  }
})

// Gérer le cas où le logiciel n'existe pas
if (!software.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Logiciel non trouvé",
    message: `Le logiciel avec l'ID "${softwareId.value}" n'existe pas.`
  })
}

// Calcul du niveau de certification
const certificationLevel = computed(() =>
  software.value
    ? software.value.certificationLevel ?? getCertificationLevel(software.value.lgpd)
    : null
)

// Logiciels similaires
const similarSoftwareList = computed(() =>
  software.value ? getSimilarSoftware(software.value) : []
)

// Configuration via utils centralisé
const config = computed(() => getCertificationConfig(certificationLevel.value))

// LGPD labels
const lgpdLabels = {
  hosting: {
    1: "Suisse",
    2: "Union Européenne",
    3: "Hors UE"
  },
  rgpd: {
    1: "Conforme",
    2: "Partiellement conforme",
    3: "Non conforme"
  },
  dataCollection: {
    1: "Limitée",
    2: "Modérée",
    3: "Extensive"
  }
}

// Meta tags pour SEO
useSeoMeta({
  title: `${software.value.name} - Référentiel Logiciels CEJEF`,
  description: software.value.shortDescription,
  ogTitle: `${software.value.name} - Référentiel Logiciels CEJEF`,
  ogDescription: software.value.shortDescription
})

// Plus besoin de helpers locaux, on utilise le composable centralisé

// Tab selection
const selectedTab = ref("overview")
</script>

<template>
  <div v-if="software" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <!-- Navigation Bar -->
      <div class="mb-8 flex items-center justify-between">
        <UButton
          to="/"
          color="neutral"
          variant="ghost"
          size="lg"
        >
          <template #leading>
            <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
          </template>
          Retour
        </UButton>

        <div class="flex gap-2">
          <UButton
            :disabled="!previousSoftware"
            :to="previousSoftware ? `/logiciels/${previousSoftware.id}` : undefined"
            color="neutral"
            variant="outline"
            size="md"
          >
            <template #leading>
              <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
            </template>
            Précédent
          </UButton>
          <UButton
            :disabled="!nextSoftware"
            :to="nextSoftware ? `/logiciels/${nextSoftware.id}` : undefined"
            color="neutral"
            variant="outline"
            size="md"
          >
            Suivant
            <template #trailing>
              <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            </template>
          </UButton>
        </div>
      </div>

      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-start gap-6 mb-6">
          <!-- Logo/Icon -->
          <div class="shrink-0">
            <div
              :class="[config.fill, 'w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg']"
            >
              <img
                v-if="software.logo"
                :src="`/logos/${software.logo}.svg`"
                :alt="software.name"
                class="w-16 h-16 object-contain"
              />
              <UIcon
                v-else-if="software.icon"
                :name="software.icon"
                class="w-12 h-12 text-white"
              />
              <span
                v-else
                class="text-3xl font-black text-white"
              >
                {{ software.name.substring(0, 2).toUpperCase() }}
              </span>
            </div>
          </div>

          <!-- Title and Info -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">
                {{ software.name }}
              </h1>
              <UBadge :color="certificationLevel === 1 ? 'success' : certificationLevel === 2 ? 'warning' : 'error'" size="lg">
                <template #leading>
                  <UIcon :name="config.icon" class="w-4 h-4" />
                </template>
                {{ config.label }}
              </UBadge>
            </div>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {{ software.shortDescription }}
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Access Software -->
          <UButton
            :to="software.toolUrl"
            target="_blank"
            color="primary"
            variant="solid"
            size="xl"
            block
          >
            <template #leading>
              <UIcon name="i-lucide-external-link" class="w-5 h-5" />
            </template>
            Accéder
          </UButton>

          <!-- Documentation -->
          <UButton
            v-if="software.documentation"
            :to="software.documentation"
            target="_blank"
            color="neutral"
            variant="outline"
            size="xl"
            block
          >
            <template #leading>
              <UIcon name="i-lucide-book-open" class="w-5 h-5" />
            </template>
            Documentation
          </UButton>

          <!-- Cost -->
          <div class="bg-white dark:bg-gray-800 rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 p-4 flex items-center gap-3">
            <UIcon name="i-lucide-wallet" class="w-5 h-5 text-primary-600" />
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Coût
              </div>
              <div class="font-bold text-gray-900 dark:text-white">
                {{ software.cost }}
              </div>
            </div>
          </div>

          <!-- Support -->
          <div class="bg-white dark:bg-gray-800 rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 p-4 flex items-center gap-3">
            <UIcon name="i-lucide-headphones" class="w-5 h-5 text-primary-600" />
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Support CEJEF
              </div>
              <div class="font-bold text-gray-900 dark:text-white">
                {{ software.supportedByCEJEF ? "Oui" : "Non" }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compact LGPD Summary -->
      <UCard class="mb-6">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary-600" />
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                Protection des données
              </h2>
            </div>
            <UBadge :color="certificationLevel === 1 ? 'success' : certificationLevel === 2 ? 'warning' : 'error'" size="lg">
              <template #leading>
                <UIcon :name="config.icon" class="w-4 h-4" />
              </template>
              {{ config.label }}
            </UBadge>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Hosting -->
          <div class="flex items-start gap-3">
            <div class="shrink-0">
              <UBadge
                :color="software.lgpd.hosting === 1 ? 'success' : software.lgpd.hosting === 2 ? 'warning' : 'error'"
                size="md"
              >
                {{ software.lgpd.hosting }}
              </UBadge>
            </div>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">
                Hébergement
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ lgpdLabels.hosting[software.lgpd.hosting] }}
              </div>
            </div>
          </div>

          <!-- RGPD -->
          <div class="flex items-start gap-3">
            <div class="shrink-0">
              <UBadge
                :color="software.lgpd.rgpd === 1 ? 'success' : software.lgpd.rgpd === 2 ? 'warning' : 'error'"
                size="md"
              >
                {{ software.lgpd.rgpd }}
              </UBadge>
            </div>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">
                RGPD
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ lgpdLabels.rgpd[software.lgpd.rgpd] }}
              </div>
            </div>
          </div>

          <!-- Data Collection -->
          <div class="flex items-start gap-3">
            <div class="shrink-0">
              <UBadge
                :color="software.lgpd.dataCollection === 1 ? 'success' : software.lgpd.dataCollection === 2 ? 'warning' : 'error'"
                size="md"
              >
                {{ software.lgpd.dataCollection }}
              </UBadge>
            </div>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">
                Collecte
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ lgpdLabels.dataCollection[software.lgpd.dataCollection] }}
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Tabs for Detailed Information -->
      <UTabs
        v-model="selectedTab"
        :items="[
          { label: 'Vue d\'ensemble', icon: 'i-lucide-layout-grid', value: 'overview' },
          { label: 'Protection des données', icon: 'i-lucide-shield-check', value: 'data' },
          { label: 'Usage pédagogique', icon: 'i-lucide-graduation-cap', value: 'pedagogical' },
          { label: 'Alternatives', icon: 'i-lucide-repeat', value: 'alternatives' }
        ]"
        :content="false"
      />

      <!-- Tab Content -->
      <div class="mt-6">
        <div v-if="selectedTab === 'overview'">
          <div class="space-y-6 pt-4">
            <!-- Usage Notes (if present) -->
            <UCard v-if="software.usageNotes">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-alert-circle" class="w-5 h-5 text-orange-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Remarques importantes
                  </h3>
                </div>
              </template>

              <div class="space-y-3">
                <p class="text-gray-900 dark:text-white leading-relaxed">
                  {{ software.usageNotes }}
                </p>
                <div v-if="software.targetAudience" class="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    Public cible : <strong class="text-gray-900 dark:text-white">{{ software.targetAudience }}</strong>
                  </span>
                </div>
                <div v-if="software.ageRestriction" class="flex items-center gap-2 pt-2">
                  <UIcon name="i-lucide-calendar" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    Âge minimum : <strong class="text-gray-900 dark:text-white">{{ software.ageRestriction }} ans</strong>
                  </span>
                </div>
              </div>
            </UCard>

            <!-- Categories & Disciplines -->
            <UCard v-if="software.categories || software.disciplines || software.pedagogicalActivities">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-tags" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Classification
                  </h3>
                </div>
              </template>

              <div class="space-y-4">
                <!-- Categories -->
                <div v-if="software.categories && software.categories.length > 0">
                  <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Catégories
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="category in software.categories"
                      :key="category"
                      color="primary"
                      variant="outline"
                      size="md"
                    >
                      {{ category }}
                    </UBadge>
                  </div>
                </div>

                <!-- Pedagogical Activities -->
                <div v-if="software.pedagogicalActivities && software.pedagogicalActivities.length > 0">
                  <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Activités pédagogiques
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="activity in software.pedagogicalActivities"
                      :key="activity"
                      color="neutral"
                      variant="outline"
                      size="md"
                    >
                      {{ activity }}
                    </UBadge>
                  </div>
                </div>

                <!-- Disciplines -->
                <div v-if="software.disciplines && software.disciplines.length > 0">
                  <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Disciplines
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="discipline in software.disciplines"
                      :key="discipline"
                      color="neutral"
                      variant="soft"
                      size="md"
                    >
                      {{ discipline }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- CEJEF Services -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-school" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Services CEJEF
                  </h3>
                </div>
              </template>

              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <UIcon
                    :name="software.supportedByCEJEF ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                    :class="[
                      'w-5 h-5',
                      software.supportedByCEJEF ? 'text-green-600' : 'text-gray-400'
                    ]"
                  />
                  <span :class="software.supportedByCEJEF ? 'text-gray-900 dark:text-white' : 'text-gray-500'">
                    {{ software.supportedByCEJEF ? "Support technique disponible" : "Pas de support technique" }}
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <UIcon
                    :name="software.campusTraining ? 'i-lucide-graduation-cap' : 'i-lucide-x-circle'"
                    :class="[
                      'w-5 h-5',
                      software.campusTraining ? 'text-green-600' : 'text-gray-400'
                    ]"
                  />
                  <span :class="software.campusTraining ? 'text-gray-900 dark:text-white' : 'text-gray-500'">
                    {{ software.campusTraining ? "Formation disponible au campus" : "Pas de formation disponible" }}
                  </span>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <div v-if="selectedTab === 'data'">
          <div class="space-y-6 pt-4">
            <!-- Personal Data -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-database" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Données personnelles
                  </h3>
                </div>
              </template>

              <div class="flex items-center gap-3">
                <UIcon
                  :name="software.personalData ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                  :class="[
                    'w-6 h-6',
                    software.personalData ? 'text-green-600' : 'text-red-600'
                  ]"
                />
                <p class="text-gray-900 dark:text-white">
                  {{ software.personalData
                    ? "Ce logiciel peut traiter des données personnelles d'élèves"
                    : "Ce logiciel ne traite pas de données personnelles d'élèves"
                  }}
                </p>
              </div>
            </UCard>

            <!-- Data Location -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Localisation des données
                  </h3>
                </div>
              </template>

              <div class="flex items-center gap-3">
                <UIcon
                  name="i-lucide-server"
                  class="w-6 h-6 text-primary-600"
                />
                <p class="text-gray-900 dark:text-white text-lg font-semibold">
                  {{ software.dataLocation }}
                </p>
              </div>
            </UCard>

            <!-- Detailed LGPD -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Détails de la classification
                  </h3>
                </div>
              </template>

              <div class="space-y-4">
                <!-- Hosting -->
                <div class="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                      Hébergement des données
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ lgpdLabels.hosting[software.lgpd.hosting] }}
                    </p>
                  </div>
                  <UBadge
                    :color="software.lgpd.hosting === 1 ? 'success' : software.lgpd.hosting === 2 ? 'warning' : 'error'"
                    size="md"
                  >
                    Niveau {{ software.lgpd.hosting }}
                  </UBadge>
                </div>

                <!-- RGPD Compliance -->
                <div class="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                      Conformité RGPD
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ lgpdLabels.rgpd[software.lgpd.rgpd] }}
                    </p>
                  </div>
                  <UBadge
                    :color="software.lgpd.rgpd === 1 ? 'success' : software.lgpd.rgpd === 2 ? 'warning' : 'error'"
                    size="md"
                  >
                    Niveau {{ software.lgpd.rgpd }}
                  </UBadge>
                </div>

                <!-- Data Collection -->
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                      Collecte de données
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ lgpdLabels.dataCollection[software.lgpd.dataCollection] }}
                    </p>
                  </div>
                  <UBadge
                    :color="software.lgpd.dataCollection === 1 ? 'success' : software.lgpd.dataCollection === 2 ? 'warning' : 'error'"
                    size="md"
                  >
                    Niveau {{ software.lgpd.dataCollection }}
                  </UBadge>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <div v-if="selectedTab === 'pedagogical'">
          <div class="space-y-6 pt-4">
            <!-- Target Audience & Age Restriction -->
            <UCard v-if="software.targetAudience || software.ageRestriction">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Public cible
                  </h3>
                </div>
              </template>

              <div class="space-y-3">
                <div v-if="software.targetAudience" class="flex items-center gap-3">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span class="text-gray-900 dark:text-white">
                    {{ software.targetAudience }}
                  </span>
                </div>
                <div v-if="software.ageRestriction" class="flex items-center gap-3">
                  <UIcon name="i-lucide-calendar" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span class="text-gray-900 dark:text-white">
                    Âge minimum : <strong>{{ software.ageRestriction }} ans</strong>
                  </span>
                </div>
              </div>
            </UCard>

            <!-- Pedagogical Activities -->
            <UCard v-if="software.pedagogicalActivities && software.pedagogicalActivities.length > 0">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Activités pédagogiques
                  </h3>
                </div>
              </template>

              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="activity in software.pedagogicalActivities"
                  :key="activity"
                  color="primary"
                  variant="outline"
                  size="lg"
                >
                  {{ activity }}
                </UBadge>
              </div>
            </UCard>

            <!-- Disciplines -->
            <UCard v-if="software.disciplines && software.disciplines.length > 0">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-book-open" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Disciplines
                  </h3>
                </div>
              </template>

              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="discipline in software.disciplines"
                  :key="discipline"
                  color="neutral"
                  variant="soft"
                  size="lg"
                >
                  {{ discipline }}
                </UBadge>
              </div>
            </UCard>

            <!-- Training -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Formation
                  </h3>
                </div>
              </template>

              <div class="flex items-center gap-3">
                <UIcon
                  :name="software.campusTraining ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                  :class="[
                    'w-6 h-6',
                    software.campusTraining ? 'text-green-600' : 'text-gray-400'
                  ]"
                />
                <p :class="software.campusTraining ? 'text-gray-900 dark:text-white' : 'text-gray-500'">
                  {{ software.campusTraining ? "Formation disponible au campus CEJEF" : "Pas de formation proposée" }}
                </p>
              </div>
            </UCard>
          </div>
        </div>

        <div v-if="selectedTab === 'alternatives'">
          <div class="space-y-6 pt-4">
            <!-- Green Alternatives -->
            <UCard v-if="software.greenAlternatives && software.greenAlternatives.length > 0">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-600" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Alternatives autorisées
                  </h3>
                </div>
              </template>

              <div class="space-y-3">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Ces logiciels certifiés niveau 1 (autorisés) sont recommandés comme alternatives :
                </p>
                <div class="flex flex-wrap gap-2">
                  <UButton
                    v-for="altId in software.greenAlternatives"
                    :key="altId"
                    :to="`/logiciels/${altId}`"
                    color="success"
                    variant="outline"
                    size="lg"
                  >
                    {{ getSoftwareById(altId)?.name || altId }}
                  </UButton>
                </div>
              </div>
            </UCard>

            <!-- Similar Software -->
            <UCard v-if="similarSoftwareList && similarSoftwareList.length > 0">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-yellow-500" />
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    Logiciels similaires
                  </h3>
                </div>
              </template>

              <div class="space-y-3">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  D'autres logiciels partageant les mêmes catégories ou activités :
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <UButton
                    v-for="sim in similarSoftwareList"
                    :key="sim.id"
                    :to="`/logiciels/${sim.id}`"
                    color="neutral"
                    variant="ghost"
                    class="justify-start h-auto py-3 relative overflow-hidden group bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all"
                  >
                    <div class="flex items-center gap-3 text-left w-full">
                      <div class="shrink-0 relative">
                        <div
                          class="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                          :class="getCertificationColors(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).bgLight"
                        >
                          <img
                            v-if="sim.logo"
                            :src="`/logos/${sim.logo}.svg`"
                            :alt="sim.name"
                            class="w-6 h-6 object-contain"
                          />
                          <UIcon
                            v-else-if="sim.icon"
                            :name="sim.icon"
                            class="w-6 h-6"
                            :class="getCertificationColors(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).text"
                          />
                          <div
                            v-else
                            class="text-xs font-bold"
                            :class="getCertificationColors(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).text"
                          >
                            {{ sim.name.substring(0, 2).toUpperCase() }}
                          </div>
                        </div>

                        <!-- Mini Badge -->
                        <div
                          class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900"
                          :class="getCertificationColors(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).bg"
                        >
                          <UIcon
                            :name="getCertificationIcon(sim.certificationLevel ?? getCertificationLevel(sim.lgpd))"
                            class="w-2.5 h-2.5 text-white"
                          />
                        </div>
                      </div>

                      <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2">
                          <div class="font-semibold truncate text-gray-900 dark:text-white">
                            {{ sim.name }}
                          </div>
                        </div>
                        <div class="text-xs text-gray-500 truncate">
                          {{ sim.shortDescription }}
                        </div>
                      </div>
                    </div>
                  </UButton>
                </div>
              </div>
            </UCard>

            <!-- No alternatives message -->
            <UCard v-if="(!software.greenAlternatives || software.greenAlternatives.length === 0) && (!similarSoftwareList || similarSoftwareList.length === 0)">
              <div class="text-center py-8">
                <UIcon name="i-lucide-info" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p class="text-gray-600 dark:text-gray-400">
                  Aucune alternative disponible pour ce logiciel
                </p>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
