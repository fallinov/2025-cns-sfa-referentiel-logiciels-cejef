<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"

/**
 * Page de détail d'un logiciel (version simplifiée)
 * Route: /logiciels/[id]
 */

const route = useRoute()
const router = useRouter()
const { getSoftwareById } = useSoftware()
const { getPreviousSoftware, getNextSoftware } = useSoftwareNavigation()
const { getSimilarSoftware } = useSimilarSoftware()

// Fonction de retour intelligente (historique ou accueil)
// Fonction de retour intelligente (historique ou accueil)
// Fonction de retour intelligente (historique ou accueil)
const goBack = () => {
  const backLink = window.history.state.back
  // Si on vient d'une page qui n'est pas un détail de logiciel (donc probablement le catalogue ou une autre page principale)
  // on utilise back() pour préserver le scroll.
  if (backLink && typeof backLink === "string" && !backLink.includes("/logiciels/")) {
    router.back()
  } else {
    // Sinon (navigation entre logiciels ou accès direct), on retourne à l'accueil
    // en ciblant le logiciel actuel via un query param pour gérer le scroll manuellement sans erreur du routeur
    if (software.value) {
      navigateTo({ path: "/", query: { scrollTo: software.value.id } })
    } else {
      navigateTo("/")
    }
  }
}

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
      navigateTo(`/logiciels/${previousSoftware.value.id}`, { replace: true })
    }
  },
  arrowright: () => {
    if (nextSoftware.value) {
      navigateTo(`/logiciels/${nextSoftware.value.id}`, { replace: true })
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
  <div v-if="software" class="min-h-screen bg-gray-100 dark:bg-gray-950 pb-20">
    <!-- Top Navigation Bar -->
    <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <UContainer class="max-w-[1240px] h-16 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UButton
            variant="ghost"
            color="neutral"
            class="-ml-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="goBack"
          >
            <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
            <span class="hidden sm:inline">Retour au catalogue</span>
          </UButton>
        </div>

        <div class="flex items-center gap-2">
          <UTooltip text="Logiciel précédent" :shortcuts="['←']">
            <UButton
              :disabled="!previousSoftware"
              :to="previousSoftware ? `/logiciels/${previousSoftware.id}` : undefined"
              color="neutral"
              variant="ghost"
              icon="i-lucide-chevron-left"
              aria-label="Logiciel précédent"
              class="text-gray-500"
            />
          </UTooltip>
          <div class="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
          <UTooltip text="Logiciel suivant" :shortcuts="['→']">
            <UButton
              :disabled="!nextSoftware"
              :to="nextSoftware ? `/logiciels/${nextSoftware.id}` : undefined"
              color="neutral"
              variant="ghost"
              icon="i-lucide-chevron-right"
              aria-label="Logiciel suivant"
              class="text-gray-500"
            />
          </UTooltip>
        </div>
      </UContainer>
    </div>

    <!-- Hero Section with Background Identity -->
    <div class="bg-white dark:bg-gray-900 relative overflow-hidden">
      <UContainer class="max-w-[1240px] py-10 sm:py-14 relative">
        <!-- Decorative background element -->
        <div class="absolute top-0 right-0 p-12 pointer-events-none select-none">
          <div
            v-if="software.logo"
            class="w-96 h-96 transform rotate-12 translate-x-12 -translate-y-12"
            :style="{
              backgroundColor: '#F3F4F6',
              WebkitMaskImage: `url(/logos/${software.logo}.svg)`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(/logos/${software.logo}.svg)`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center'
            }"
          ></div>
          <UIcon
            v-else
            :name="software.icon || 'i-lucide-box'"
            class="w-96 h-96 text-[#F3F4F6] dark:text-white transform rotate-12 translate-x-12 -translate-y-12"
          />
        </div>

        <div class="relative z-10">
          <div class="flex flex-col md:flex-row gap-8 items-start">
            <!-- Logo Card -->
            <div class="shrink-0 ml-1">
              <div class="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <img
                  v-if="software.logo"
                  :src="`/logos/${software.logo}.svg`"
                  :alt="`${software.name} logo`"
                  class="w-full h-full object-contain"
                />
                <UIcon
                  v-else-if="software.icon"
                  :name="software.icon"
                  class="w-full h-full text-gray-900 dark:text-white"
                />
                <span v-else class="text-4xl font-black text-gray-900 dark:text-white">
                  {{ software.name.substring(0, 2).toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- Title & Intro -->
            <div class="flex-1 min-w-0">
              <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                {{ software.name }}
              </h1>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {{ software.shortDescription }}
              </p>

              <!-- Quick Meta -->
              <div class="flex flex-wrap gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                  <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                  <span>Mis à jour le {{ new Date().toLocaleDateString('fr-CH') }}</span>
                </div>
              </div>
            </div>

            <!-- Primary CTA (Desktop) -->
            <div class="hidden md:flex md:items-center md:gap-3 shrink-0">
              <UButton
                :to="software.toolUrl"
                target="_blank"
                color="primary"
                variant="solid"
                size="xl"
                class="rounded-[var(--ui-radius)] px-8 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5"
              >
                Accéder au logiciel
                <template #trailing>
                  <UIcon name="i-lucide-external-link" class="w-5 h-5" />
                </template>
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Two Column Layout -->
    <UContainer class="max-w-[1240px] mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- MAIN COLUMN (Left) -->
        <div class="lg:col-span-8 space-y-8">
          <!-- 1. COMPLIANCE STATUS (Top Priority) -->
          <section aria-label="Statut de conformité">
            <SoftwareCertificationCard
              v-model:show-details="showLgpdDetails"
              :software="software"
              :certification-level="certificationLevel ?? 0"
              :lgpd-labels="lgpdLabels"
            />
          </section>

          <!-- 2. PEDAGOGICAL CONTEXT (Teacher Focused) -->
          <section v-if="software.categories?.length || software.disciplines?.length || software.pedagogicalActivities?.length" aria-label="Usage Pédagogique">
            <div class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 relative overflow-hidden">
              <div class="flex items-center gap-3 mb-6 relative z-10">
                <UIcon name="i-lucide-graduation-cap" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Usage Pédagogique
                </h2>
              </div>

              <div class="flex flex-col gap-8 relative z-10">
                <!-- Disciplines -->
                <div v-if="software.disciplines?.length">
                  <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Disciplines concernées
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="discipline in software.disciplines"
                      :key="discipline"
                      :to="{ path: '/', query: { discipline } }"
                      class="hover:scale-105 transition-transform"
                    >
                      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                        <UIcon name="i-lucide-book-open" class="w-3.5 h-3.5 text-gray-500" />
                        {{ discipline }}
                      </span>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Activities -->
                <div v-if="software.pedagogicalActivities?.length">
                  <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Activités possibles
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="activity in software.pedagogicalActivities"
                      :key="activity"
                      :to="{ path: '/', query: { activity } }"
                      class="hover:scale-105 transition-transform"
                    >
                      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                        <UIcon name="i-lucide-puzzle" class="w-3.5 h-3.5 text-gray-500" />
                        {{ activity }}
                      </span>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Categories (Full width if needed) -->
                <div v-if="software.categories?.length">
                  <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Catégories
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="category in software.categories"
                      :key="category"
                      :to="{ path: '/', query: { category } }"
                      class="hover:scale-105 transition-transform"
                    >
                      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                        <UIcon name="i-lucide-tag" class="w-3.5 h-3.5 text-gray-500" />
                        {{ category }}
                      </span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section aria-label="À propos">
            <div class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/50">
              <div class="flex items-center gap-3 mb-6">
                <UIcon name="i-lucide-file-text" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  À propos de {{ software.name }}
                </h2>
              </div>
              <div class="prose prose-lg dark:prose-invert prose-gray max-w-none bg-transparent">
                <div class="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {{ software.description }}
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- SIDEBAR (Right) -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Similar Software (en premier) -->
          <SoftwareDetailSimilar :similar-software="similarSoftwareList.slice(0, 3)" />

          <!-- Info Card -->
          <SoftwareDetailPracticalInfo
            :software="software"
            :bg-color="'bg-gray-100 dark:bg-gray-800'"
            :icon-color="'text-gray-900 dark:text-gray-100'"
          />

          <!-- Documentation Link -->
          <div v-if="software.documentation" class="bg-gray-100 dark:bg-gray-800/50 rounded-[var(--ui-radius)] p-6 border border-gray-200 dark:border-gray-700/50">
            <div class="flex items-center gap-3 mb-4">
              <UIcon name="i-lucide-book-open" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                Ressources
              </h3>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Consultez la documentation officielle pour en savoir plus sur l'utilisation.
            </p>
            <UButton
              :to="software.documentation"
              target="_blank"
              color="neutral"
              variant="solid"
              block
              icon="i-lucide-external-link"
              class="rounded-full"
            >
              Voir la documentation
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Mobile Fixed Bottom CTA (Floating) -->
    <div class="fixed bottom-0 left-0 right-0 p-6 z-50 md:hidden flex justify-center pointer-events-none">
      <UButton
        :to="software.toolUrl"
        target="_blank"
        color="primary"
        variant="solid"
        size="xl"
        block
        class="rounded-full shadow-2xl pointer-events-auto border border-white/20 dark:border-gray-900/20 backdrop-blur-xl bg-primary-600/90 dark:bg-primary-500/90 hover:bg-primary-700/90 dark:hover:bg-primary-400/90 transition-all"
      >
        Accéder au logiciel
        <template #trailing>
          <UIcon name="i-lucide-external-link" class="w-5 h-5" />
        </template>
      </UButton>
    </div>
  </div>
</template>
