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
const showLgpdDetails = ref(false)
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

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Main Content (Left Column) -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Header Section -->
          <div class="flex items-start gap-6">
            <!-- Logo/Icon -->
            <div class="shrink-0">
              <div
                :class="[config.solidBg, 'w-20 h-20 rounded-lg flex items-center justify-center shadow-lg']"
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
              <p class="text-xl text-gray-600 dark:text-gray-400">
                {{ software.shortDescription }}
              </p>
            </div>
          </div>

      <!-- Main Status Card (Traffic Light System) - Simplified Design -->
      <div class="mb-8">
        <!-- Level 1: Green - Authorized -->
        <UCard
          v-if="certificationLevel === 1"
          class="ring-2 ring-green-500/50 bg-green-50 dark:bg-green-900/10"
          :ui="{ body: { padding: 'p-6' } }"
        >
          <div class="flex gap-5">
            <div class="shrink-0">
              <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-bold text-green-800 dark:text-green-300 mb-1">
                Usage Autorisé avec Élèves
              </h2>
              <p class="text-green-800 dark:text-green-200 text-base leading-relaxed">
                Vous pouvez utiliser ce logiciel librement avec vos élèves.
                <strong class="font-semibold">La création de comptes et l'utilisation de données personnelles sont autorisées.</strong>
              </p>
              
              <!-- Toggle Details -->
              <div class="mt-4">
                <UButton
                  color="green"
                  variant="ghost"
                  size="sm"
                  class="p-0 hover:bg-transparent text-green-700 dark:text-green-300"
                  :icon="showLgpdDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  @click="showLgpdDetails = !showLgpdDetails"
                >
                  {{ showLgpdDetails ? 'Masquer les détails techniques' : 'Voir les détails techniques' }}
                </UButton>
              </div>

              <!-- Technical Details (Inside Card) -->
              <div v-if="showLgpdDetails" class="mt-4 pt-4 border-t border-green-200 dark:border-green-800/50">
                 <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <!-- Hosting -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.hosting === 1 ? 'i-lucide-check-circle' : software.lgpd.hosting === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5 text-green-600 dark:text-green-400"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Hébergement
                       </div>
                       <div class="text-sm font-medium text-green-900 dark:text-green-100">
                         {{ lgpdLabels.hosting[software.lgpd.hosting] }}
                       </div>
                     </div>
                   </div>

                   <!-- RGPD -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.rgpd === 1 ? 'i-lucide-check-circle' : software.lgpd.rgpd === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5 text-green-600 dark:text-green-400"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Conformité RGPD
                       </div>
                       <div class="text-sm font-medium text-green-900 dark:text-green-100">
                         {{ lgpdLabels.rgpd[software.lgpd.rgpd] }}
                       </div>
                     </div>
                   </div>

                   <!-- Data Collection -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.dataCollection === 1 ? 'i-lucide-check-circle' : software.lgpd.dataCollection === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5 text-green-600 dark:text-green-400"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Collecte Données
                       </div>
                       <div class="text-sm font-medium text-green-900 dark:text-green-100">
                         {{ lgpdLabels.dataCollection[software.lgpd.dataCollection] }}
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Level 2: Orange - Restricted -->
        <UCard
          v-else-if="certificationLevel === 2"
          class="ring-2 ring-orange-500/50 bg-orange-50 dark:bg-orange-900/10"
          :ui="{ body: { padding: 'p-6' } }"
        >
          <div class="flex gap-5">
            <div class="shrink-0">
              <UIcon name="i-lucide-alert-triangle" class="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-bold text-orange-800 dark:text-orange-300 mb-1">
                Usage Pédagogique Uniquement
              </h2>
              <p class="text-orange-800 dark:text-orange-200 text-base leading-relaxed mb-2">
                Vous pouvez utiliser cet outil pour votre préparation.
                <strong class="block mt-1 font-semibold">Interdiction formelle de saisir des données d'élèves (noms, emails).</strong>
              </p>
              <p class="text-orange-800/80 dark:text-orange-300/80 text-sm mb-3">
                Si les élèves doivent utiliser l'outil, cela doit être fait de manière strictement anonyme.
              </p>

              <!-- Usage Notes -->
              <div v-if="software.usageNotes" class="mb-4 p-3 bg-white/50 dark:bg-black/20 rounded border border-orange-200 dark:border-orange-800/50 text-sm text-orange-900 dark:text-orange-100 italic">
                 Note : {{ software.usageNotes }}
              </div>

              <!-- Toggle Details -->
              <div>
                <UButton
                  color="orange"
                  variant="ghost"
                  size="sm"
                  class="p-0 hover:bg-transparent text-orange-700 dark:text-orange-300"
                  :icon="showLgpdDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  @click="showLgpdDetails = !showLgpdDetails"
                >
                  {{ showLgpdDetails ? 'Masquer les détails techniques' : 'Voir les détails techniques' }}
                </UButton>
              </div>

              <!-- Technical Details (Inside Card) -->
              <div v-if="showLgpdDetails" class="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800/50">
                 <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <!-- Hosting -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.hosting === 1 ? 'i-lucide-check-circle' : software.lgpd.hosting === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5"
                       :class="software.lgpd.hosting === 1 ? 'text-green-600' : software.lgpd.hosting === 2 ? 'text-orange-600' : 'text-red-600'"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Hébergement
                       </div>
                       <div class="text-sm font-medium text-orange-900 dark:text-orange-100">
                         {{ lgpdLabels.hosting[software.lgpd.hosting] }}
                       </div>
                     </div>
                   </div>

                   <!-- RGPD -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.rgpd === 1 ? 'i-lucide-check-circle' : software.lgpd.rgpd === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5"
                       :class="software.lgpd.rgpd === 1 ? 'text-green-600' : software.lgpd.rgpd === 2 ? 'text-orange-600' : 'text-red-600'"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Conformité RGPD
                       </div>
                       <div class="text-sm font-medium text-orange-900 dark:text-orange-100">
                         {{ lgpdLabels.rgpd[software.lgpd.rgpd] }}
                       </div>
                     </div>
                   </div>

                   <!-- Data Collection -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.dataCollection === 1 ? 'i-lucide-check-circle' : software.lgpd.dataCollection === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5"
                       :class="software.lgpd.dataCollection === 1 ? 'text-green-600' : software.lgpd.dataCollection === 2 ? 'text-orange-600' : 'text-red-600'"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Collecte Données
                       </div>
                       <div class="text-sm font-medium text-orange-900 dark:text-orange-100">
                         {{ lgpdLabels.dataCollection[software.lgpd.dataCollection] }}
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Level 3: Red - Forbidden -->
        <UCard
          v-else-if="certificationLevel === 3"
          class="ring-2 ring-red-500/50 bg-red-50 dark:bg-red-900/10"
          :ui="{ body: { padding: 'p-6' } }"
        >
          <div class="flex gap-5">
            <div class="shrink-0">
              <UIcon name="i-lucide-ban" class="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-bold text-red-800 dark:text-red-300 mb-1">
                Usage Interdit
              </h2>
              <p class="text-red-800 dark:text-red-200 text-base leading-relaxed mb-3">
                Ce logiciel ne respecte pas les normes de sécurité.
                <strong class="font-semibold">Il ne doit être utilisé ni par les enseignants ni par les élèves.</strong>
              </p>

              <!-- Alternatives -->
              <div v-if="software.greenAlternatives?.length" class="mb-4">
                <p class="font-semibold text-red-900 dark:text-red-100 text-sm mb-2">
                  Alternatives recommandées :
                </p>
                <div class="flex flex-wrap gap-2">
                  <UButton
                    v-for="altId in software.greenAlternatives"
                    :key="altId"
                    :to="`/logiciels/${altId}`"
                    color="green"
                    variant="soft"
                    icon="i-lucide-arrow-right"
                  >
                    {{ getSoftwareById(altId)?.name || 'Alternative' }}
                  </UButton>
                </div>
              </div>

              <!-- Toggle Details -->
              <div>
                <UButton
                  color="red"
                  variant="ghost"
                  size="sm"
                  class="p-0 hover:bg-transparent text-red-700 dark:text-red-300"
                  :icon="showLgpdDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  @click="showLgpdDetails = !showLgpdDetails"
                >
                  {{ showLgpdDetails ? 'Masquer les détails techniques' : 'Voir les détails techniques' }}
                </UButton>
              </div>

              <!-- Technical Details (Inside Card) -->
              <div v-if="showLgpdDetails" class="mt-4 pt-4 border-t border-red-200 dark:border-red-800/50">
                 <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <!-- Hosting -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.hosting === 1 ? 'i-lucide-check-circle' : software.lgpd.hosting === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5"
                       :class="software.lgpd.hosting === 1 ? 'text-green-600' : software.lgpd.hosting === 2 ? 'text-orange-600' : 'text-red-600'"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Hébergement
                       </div>
                       <div class="text-sm font-medium text-red-900 dark:text-red-100">
                         {{ lgpdLabels.hosting[software.lgpd.hosting] }}
                       </div>
                     </div>
                   </div>

                   <!-- RGPD -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.rgpd === 1 ? 'i-lucide-check-circle' : software.lgpd.rgpd === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5"
                       :class="software.lgpd.rgpd === 1 ? 'text-green-600' : software.lgpd.rgpd === 2 ? 'text-orange-600' : 'text-red-600'"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Conformité RGPD
                       </div>
                       <div class="text-sm font-medium text-red-900 dark:text-red-100">
                         {{ lgpdLabels.rgpd[software.lgpd.rgpd] }}
                       </div>
                     </div>
                   </div>

                   <!-- Data Collection -->
                   <div class="flex items-center gap-3">
                     <UIcon 
                       :name="software.lgpd.dataCollection === 1 ? 'i-lucide-check-circle' : software.lgpd.dataCollection === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                       class="w-5 h-5"
                       :class="software.lgpd.dataCollection === 1 ? 'text-green-600' : software.lgpd.dataCollection === 2 ? 'text-orange-600' : 'text-red-600'"
                     />
                     <div>
                       <div class="text-sm text-gray-500 dark:text-gray-400">
                         Collecte Données
                       </div>
                       <div class="text-sm font-medium text-red-900 dark:text-red-100">
                         {{ lgpdLabels.dataCollection[software.lgpd.dataCollection] }}
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Pedagogical Classification -->
      <div v-if="software.categories?.length || software.disciplines?.length || software.pedagogicalActivities?.length">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary-600" />
          Classification Pédagogique
        </h3>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 ring-1 ring-gray-200 dark:ring-gray-800 space-y-6">
          <!-- Categories -->
          <div v-if="software.categories?.length">
            <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Catégories
            </h4>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="category in software.categories"
                :key="category"
                color="primary"
                variant="soft"
                size="md"
              >
                {{ category }}
              </UBadge>
            </div>
          </div>

          <!-- Activities -->
          <div v-if="software.pedagogicalActivities?.length">
            <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Activités
            </h4>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="activity in software.pedagogicalActivities"
                :key="activity"
                color="gray"
                variant="outline"
                size="md"
              >
                {{ activity }}
              </UBadge>
            </div>
          </div>

          <!-- Disciplines -->
          <div v-if="software.disciplines?.length">
            <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Disciplines
            </h4>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="discipline in software.disciplines"
                :key="discipline"
                color="gray"
                variant="soft"
                size="md"
              >
                {{ discipline }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar (Right Column) -->
    <div class="lg:col-span-4 space-y-6">
      <!-- Quick Actions -->
      <div class="space-y-3">
        <UButton
          :to="software.toolUrl"
          target="_blank"
          color="primary"
          variant="solid"
          size="xl"
          block
          class="rounded-lg"
        >
          <template #leading>
            <UIcon name="i-lucide-external-link" class="w-5 h-5" />
          </template>
          Accéder
        </UButton>

        <UButton
          v-if="software.documentation"
          :to="software.documentation"
          target="_blank"
          color="neutral"
          variant="outline"
          size="xl"
          block
          class="rounded-lg"
        >
          <template #leading>
            <UIcon name="i-lucide-book-open" class="w-5 h-5" />
          </template>
          Documentation
        </UButton>
      </div>

      <!-- Practical Info Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 ring-1 ring-gray-200 dark:ring-gray-800 space-y-6">
        <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <UIcon name="i-lucide-info" class="w-5 h-5 text-primary-600" />
          Infos Pratiques
        </h3>

        <!-- Cost -->
        <div class="flex items-center gap-3">
          <div class="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
            <UIcon name="i-lucide-wallet" class="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Coût</div>
            <div class="font-semibold text-gray-900 dark:text-white">{{ software.cost }}</div>
          </div>
        </div>

        <!-- Support -->
        <div class="flex items-center gap-3">
          <div class="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
            <UIcon name="i-lucide-headphones" class="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Support CEJEF</div>
            <div class="font-semibold text-gray-900 dark:text-white">
              {{ software.supportedByCEJEF ? "Oui" : "Non" }}
            </div>
          </div>
        </div>

        <!-- Training -->
        <div class="flex items-center gap-3">
          <div class="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
            <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Formation</div>
            <div class="font-semibold text-gray-900 dark:text-white">
              {{ software.campusTraining ? "Disponible" : "Non disponible" }}
            </div>
          </div>
        </div>

        <!-- Target Audience -->
        <div v-if="software.targetAudience" class="flex items-center gap-3">
          <div class="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
            <UIcon name="i-lucide-users" class="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Public cible</div>
            <div class="font-semibold text-gray-900 dark:text-white capitalize">{{ software.targetAudience }}</div>
          </div>
        </div>

        <!-- Age Restriction -->
        <div v-if="software.ageRestriction" class="flex items-center gap-3">
          <div class="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
            <UIcon name="i-lucide-calendar" class="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Âge minimum</div>
            <div class="font-semibold text-gray-900 dark:text-white">{{ software.ageRestriction }} ans</div>
          </div>
        </div>
      </div>

      <!-- Similar Software -->
      <div v-if="similarSoftwareList?.length" class="bg-white dark:bg-gray-800 rounded-lg p-6 ring-1 ring-gray-200 dark:ring-gray-800">
        <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-yellow-500" />
          Logiciels similaires
        </h3>
        <div class="space-y-3">
           <NuxtLink
            v-for="sim in similarSoftwareList.slice(0, 3)"
            :key="sim.id"
            :to="`/logiciels/${sim.id}`"
            class="flex items-center gap-3 group"
          >
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
               <UIcon :name="sim.icon || 'i-lucide-box'" class="w-5 h-5 text-gray-500 group-hover:text-primary-600" />
            </div>
            <div>
              <div class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                {{ sim.name }}
              </div>
              <div class="text-xs text-gray-500 truncate max-w-[150px]">
                {{ sim.shortDescription }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
      </div>
    </UContainer>
  </div>
</template>
