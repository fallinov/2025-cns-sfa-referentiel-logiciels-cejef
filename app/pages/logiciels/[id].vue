<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"

/**
 * Page de détail d'un logiciel (version simplifiée)
 * Route: /logiciels/[id]
 */

const route = useRoute()
const { getSoftwareById } = useSoftware()
const { getPreviousSoftware, getNextSoftware } = useSoftwareNavigation()

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

// Configuration des couleurs selon le niveau
const levelConfig = {
  1: {
    fill: "bg-green-500 dark:bg-green-600",
    textColor: "text-green-700 dark:text-green-600",
    label: "Autorisé",
    icon: "i-lucide-circle-check-big",
    ring: "ring-green-500/20"
  },
  2: {
    fill: "bg-orange-500 dark:bg-orange-600",
    textColor: "text-orange-700 dark:text-orange-600",
    label: "Attention",
    icon: "i-lucide-triangle-alert",
    ring: "ring-orange-500/20"
  },
  3: {
    fill: "bg-red-500 dark:bg-red-600",
    textColor: "text-red-700 dark:text-red-600",
    label: "Interdit",
    icon: "i-lucide-circle-x",
    ring: "ring-red-500/20"
  }
}

const config = computed(() => {
  const level = certificationLevel.value || 2
  return levelConfig[level]
})

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

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Main Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Green Alternatives (if software is not green) -->
          <UCard v-if="software.greenAlternatives && software.greenAlternatives.length > 0">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-600" />
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Alternatives autorisées
                </h2>
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
                  size="md"
                >
                  {{ getSoftwareById(altId)?.name || altId }}
                </UButton>
              </div>
            </div>
          </UCard>
          <!-- LGPD Classification -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary-600" />
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Classification LGPD
                </h2>
              </div>
            </template>

            <div class="space-y-4">
              <!-- Hosting -->
              <div class="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Hébergement des données
                  </h3>
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
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Conformité RGPD
                  </h3>
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
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Collecte de données
                  </h3>
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

          <!-- Personal Data -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-database" class="w-5 h-5 text-primary-600" />
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Données personnelles
                </h2>
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
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Localisation des données
                </h2>
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

          <!-- Usage Notes (if present) -->
          <UCard v-if="software.usageNotes">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-alert-circle" class="w-5 h-5 text-orange-600" />
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Remarques importantes
                </h2>
              </div>
            </template>

            <div class="space-y-2">
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

          <!-- Categories & Disciplines (if present) -->
          <UCard v-if="software.categories || software.disciplines || software.pedagogicalActivities">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-tags" class="w-5 h-5 text-primary-600" />
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Classification pédagogique
                </h2>
              </div>
            </template>

            <div class="space-y-4">
              <!-- Categories -->
              <div v-if="software.categories && software.categories.length > 0">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Catégories
                </h3>
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
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Activités pédagogiques
                </h3>
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
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Disciplines
                </h3>
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
        </div>

        <!-- Right Column - Additional Info -->
        <div class="space-y-6">
          <!-- Cost -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-wallet" class="w-5 h-5 text-primary-600" />
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                  Coût
                </h2>
              </div>
            </template>

            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {{ software.cost }}
              </p>
            </div>
          </UCard>

          <!-- CEJEF Support -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-headphones" class="w-5 h-5 text-primary-600" />
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                  Support CEJEF
                </h2>
              </div>
            </template>

            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <UIcon
                  :name="software.supportedByCEJEF ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                  :class="[
                    'w-5 h-5',
                    software.supportedByCEJEF ? 'text-green-600' : 'text-gray-400'
                  ]"
                />
                <span :class="software.supportedByCEJEF ? 'text-gray-900 dark:text-white' : 'text-gray-500'">
                  {{ software.supportedByCEJEF ? "Support disponible" : "Pas de support" }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon
                  :name="software.campusTraining ? 'i-lucide-graduation-cap' : 'i-lucide-x-circle'"
                  :class="[
                    'w-5 h-5',
                    software.campusTraining ? 'text-green-600' : 'text-gray-400'
                  ]"
                />
                <span :class="software.campusTraining ? 'text-gray-900 dark:text-white' : 'text-gray-500'">
                  {{ software.campusTraining ? "Formation disponible" : "Pas de formation" }}
                </span>
              </div>
            </div>
          </UCard>

          <!-- Links -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-link" class="w-5 h-5 text-primary-600" />
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                  Liens utiles
                </h2>
              </div>
            </template>

            <div class="space-y-2">
              <UButton
                :to="software.toolUrl"
                target="_blank"
                color="primary"
                variant="outline"
                block
                size="md"
              >
                <template #leading>
                  <UIcon name="i-lucide-external-link" class="w-4 h-4" />
                </template>
                Accéder au logiciel
              </UButton>
              <UButton
                v-if="software.documentation"
                :to="software.documentation"
                target="_blank"
                color="neutral"
                variant="outline"
                block
                size="md"
              >
                <template #leading>
                  <UIcon name="i-lucide-book-open" class="w-4 h-4" />
                </template>
                Documentation
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
