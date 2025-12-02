<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import { getCertificationConfig } from "~/utils/certification"

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
    <UContainer class="py-8 max-w-[600px] lg:max-w-[1000px]">
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
              <UKbd>
                <UIcon name="i-lucide-arrow-left" class="w-3 h-3" />
              </UKbd>
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
              <UKbd>
                <UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
              </UKbd>
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
              <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {{ software.name }}
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-400">
                {{ software.shortDescription }}
              </p>
            </div>
          </div>

          <!-- About Section -->
          <div v-if="software.description" class="prose dark:prose-invert max-w-none">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              À propos
            </h2>
            <div class="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {{ software.description }}
            </div>
          </div>

          <!-- Main Status Card (Traffic Light System) - Simplified Design -->
          <div class="mb-8">
            <SoftwareCertificationCard
              v-model:show-details="showLgpdDetails"
              :software="software"
              :certification-level="certificationLevel"
              :lgpd-labels="lgpdLabels"
            />
          </div>

          <!-- Pedagogical Classification -->
          <div v-if="software.categories?.length || software.disciplines?.length || software.pedagogicalActivities?.length">
            <UCard :ui="{ body: { padding: 'p-6' }, header: { padding: 'p-4 sm:p-6' } }">
              <template #header>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary-600" />
                  Classification Pédagogique
                </h3>
              </template>

              <div class="space-y-6">
                <!-- Categories -->
                <div v-if="software.categories?.length">
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                    Catégories
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="category in software.categories"
                      :key="category"
                      :to="{ path: '/', query: { category } }"
                      class="hover:scale-105 transition-transform cursor-pointer"
                    >
                      <UBadge
                        color="primary"
                        variant="soft"
                        size="lg"
                        class="cursor-pointer"
                      >
                        {{ category }}
                      </UBadge>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Activities -->
                <div v-if="software.pedagogicalActivities?.length">
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                    Activités
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="activity in software.pedagogicalActivities"
                      :key="activity"
                      :to="{ path: '/', query: { activity } }"
                      class="hover:scale-105 transition-transform cursor-pointer"
                    >
                      <UBadge
                        color="primary"
                        variant="soft"
                        size="lg"
                        class="cursor-pointer"
                      >
                        {{ activity }}
                      </UBadge>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Disciplines -->
                <div v-if="software.disciplines?.length">
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                    Disciplines
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="discipline in software.disciplines"
                      :key="discipline"
                      :to="{ path: '/', query: { discipline } }"
                      class="hover:scale-105 transition-transform cursor-pointer"
                    >
                      <UBadge
                        color="primary"
                        variant="soft"
                        size="lg"
                        class="cursor-pointer"
                      >
                        {{ discipline }}
                      </UBadge>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </UCard>
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
          <!-- Practical Info Card -->
          <UCard :ui="{ body: { padding: 'p-6' }, header: { padding: 'p-4 sm:p-6' } }">
            <template #header>
              <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <UIcon name="i-lucide-info" class="w-5 h-5 text-primary-600" />
                Infos Pratiques
              </h3>
            </template>

            <div class="space-y-6">
              <!-- Cost -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-wallet" class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Coût
                  </div>
                  <div class="font-semibold text-gray-900 dark:text-white">
                    {{ software.cost }}
                  </div>
                </div>
              </div>

              <!-- Support -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-headphones" class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Support CEJEF
                  </div>
                  <div class="font-semibold text-gray-900 dark:text-white">
                    {{ software.supportedByCEJEF ? "Oui" : "Non" }}
                  </div>
                </div>
              </div>

              <!-- Training -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Formation
                  </div>
                  <div class="font-semibold text-gray-900 dark:text-white">
                    {{ software.campusTraining ? "Disponible" : "Non disponible" }}
                  </div>
                </div>
              </div>

              <!-- Target Audience -->
              <div v-if="software.targetAudience" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Public cible
                  </div>
                  <div class="font-semibold text-gray-900 dark:text-white capitalize">
                    {{ software.targetAudience }}
                  </div>
                </div>
              </div>

              <!-- Age Restriction -->
              <div v-if="software.ageRestriction" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-calendar" class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Âge minimum
                  </div>
                  <div class="font-semibold text-gray-900 dark:text-white">
                    {{ software.ageRestriction }} ans
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Similar Software -->
          <UCard v-if="similarSoftwareList?.length" :ui="{ body: { padding: 'p-6' }, header: { padding: 'p-4 sm:p-6' } }">
            <template #header>
              <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-primary-600" />
                Logiciels similaires
              </h3>
            </template>

            <div class="space-y-3">
              <NuxtLink
                v-for="sim in similarSoftwareList.slice(0, 3)"
                :key="sim.id"
                :to="`/logiciels/${sim.id}`"
                class="flex items-center gap-3 group"
              >
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  :class="getCertificationConfig(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).bg"
                >
                  <UIcon
                    :name="sim.icon || 'i-lucide-box'"
                    class="w-5 h-5"
                    :class="getCertificationConfig(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).text"
                  />
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
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
