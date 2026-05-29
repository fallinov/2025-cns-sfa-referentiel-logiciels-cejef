<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import { getSoftwareIcon } from "~/utils/software-icon"

/**
 * Page de détail d'un logiciel (version simplifiée)
 * Route: /logiciels/[id]
 */

const route = useRoute()
const router = useRouter()
const { getSoftwareById } = useSoftware()
const { getPreviousSoftware, getNextSoftware } = useSoftwareNavigation()
const { getAlternatives } = useAlternatives()

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

const audienceStore = useAudienceStore()

// Copie du lien
const copied = ref(false)
function copyLink() {
  navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

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

// Alternatives recommandées (saisie manuelle dans Directus)
const alternativesList = computed(() =>
  software.value ? getAlternatives(software.value) : []
)

// LGPD labels — utilise dataLocation du logiciel pour l'hébergement (pas un label fixe)
const lgpdLabels = computed(() => ({
  hosting: {
    1: software.value?.dataLocation || "Suisse / UE",
    2: software.value?.dataLocation || "Infrastructure US",
    3: software.value?.dataLocation || "Pays non adéquat"
  },
  rgpd: {
    1: "Conforme",
    2: "Conformité partielle",
    3: "Non conforme"
  },
  dataCollection: {
    1: "Minimale",
    2: "Partagée avec des tiers",
    3: "Collecte invasive"
  }
}))

// Meta tags pour SEO
useSeoMeta({
  title: `${software.value.name} - Référentiel Logiciels SEN / SFP`,
  description: software.value.shortDescription,
  ogTitle: `${software.value.name} - Référentiel Logiciels SEN / SFP`,
  ogDescription: software.value.shortDescription
})

// Plus besoin de helpers locaux, on utilise le composable centralisé

// Tab selection
const showLgpdDetails = ref(false)
</script>

<template>
  <div v-if="software" class="min-h-screen bg-gray-100 dark:bg-gray-950 pb-24 md:pb-8">
    <!-- Top Navigation Bar -->
    <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <UContainer class="max-w-[1240px] h-16 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UTooltip text="Retour au catalogue" :shortcuts="['Esc']">
            <UButton
              variant="ghost"
              color="neutral"
              aria-label="Retour au catalogue"
              class="-ml-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="goBack"
            >
              <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
              <span class="hidden sm:inline">Retour au catalogue</span>
            </UButton>
          </UTooltip>
        </div>

        <div class="flex items-center gap-2">
          <UTooltip text="Logiciel précédent" :shortcuts="['←']">
            <UButton
              :disabled="!previousSoftware"
              :to="previousSoftware ? `/logiciels/${previousSoftware.id}` : undefined"
              color="neutral"
              variant="ghost"
              icon="i-lucide-chevron-left"
              size="xl"
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
              size="xl"
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
          <UIcon
            :name="getSoftwareIcon(software)"
            class="w-96 h-96 text-[#F3F4F6] dark:text-white transform rotate-12 translate-x-12 -translate-y-12"
          />
        </div>

        <div class="relative z-10">
          <div class="flex flex-col md:flex-row gap-8 items-start">
            <!-- Icon -->
            <div class="shrink-0 ml-1">
              <div class="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <UIcon
                  :name="getSoftwareIcon(software)"
                  class="w-full h-full text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Title & Intro -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start gap-3 mb-3">
                <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {{ software.name }}
                </h1>
                <div class="relative flex-shrink-0 mt-2">
                  <Transition
                    enter-active-class="transition-all duration-500 ease-out"
                    enter-from-class="opacity-100 translate-y-0"
                    enter-to-class="opacity-0 -translate-y-4"
                  >
                    <span
                      v-if="copied"
                      class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-green-600 dark:text-green-400 whitespace-nowrap pointer-events-none"
                    >
                      Copié !
                    </span>
                  </Transition>
                  <button
                    class="p-2 rounded-[var(--ui-radius)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    :class="copied
                      ? 'text-green-500'
                      : 'text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400'"
                    title="Copier le lien de cette fiche"
                    aria-label="Copier le lien de cette fiche"
                    @click="copyLink()"
                  >
                    <UIcon
                      :name="copied ? 'i-lucide-check' : 'i-lucide-link'"
                      class="w-5 h-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {{ software.shortDescription }}
              </p>

              <!-- Quick Meta -->
              <div class="flex flex-wrap gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                  <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                  <span>Mis à jour le {{ new Date(Number(software.updatedAt)).toLocaleDateString('fr-CH') }}</span>
                </div>
                <div
                  v-if="software.requiresEduAccount && certificationLevel === 1"
                  class="flex items-center gap-1.5 bg-blue-500 text-white px-2.5 py-1 rounded-full"
                >
                  <UIcon name="i-lucide-at-sign" class="w-4 h-4" />
                  <span>Compte edu.jura.ch</span>
                </div>
                <div
                  v-if="software.requiresEdulog && certificationLevel === 1"
                  class="flex items-center gap-1.5 bg-blue-500 text-white px-2.5 py-1 rounded-full"
                >
                  <UIcon name="i-lucide-key-round" class="w-4 h-4" />
                  <span>Compte Edulog</span>
                </div>
                <div
                  v-if="software.approvedBySEN && audienceStore.audience !== 'cejef'"
                  class="flex items-center gap-1.5 bg-green-500 text-white px-2.5 py-1 rounded-full"
                >
                  <UIcon name="i-lucide-badge-check" class="w-4 h-4" />
                  <span>Approuvé SEN</span>
                </div>
                <div
                  v-if="software.approvedBySFP"
                  class="flex items-center gap-1.5 bg-green-500 text-white px-2.5 py-1 rounded-full"
                >
                  <UIcon name="i-lucide-badge-check" class="w-4 h-4" />
                  <span>Approuvé SFP</span>
                </div>
              </div>
            </div>

            <!-- Primary CTA (Desktop) - Masqué pour les logiciels interdits -->
            <div v-if="certificationLevel !== 3" class="hidden md:flex md:items-center md:gap-3 shrink-0">
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
          <section v-if="software.categories?.length || software.pedagogicalActivities?.length" aria-label="Pour quels cours ?">
            <div class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 relative overflow-hidden">
              <div class="flex items-center gap-3 mb-6 relative z-10">
                <UIcon name="i-lucide-graduation-cap" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Pour quels cours ?
                </h2>
              </div>

              <div class="flex flex-col gap-8 relative z-10">
                <!-- Categories -->
                <div v-if="software.categories?.length">
                  <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Catégories
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="category in software.categories"
                      :key="category.name"
                      :to="{ path: '/', query: { category: category.name } }"
                      :aria-label="`Filtrer par catégorie : ${category.name}`"
                      class="hover:scale-105 transition-transform"
                    >
                      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                        <UIcon :name="category.icon || 'i-lucide-tag'" class="w-3.5 h-3.5 text-gray-500" />
                        {{ category.name }}
                      </span>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Activities -->
                <div v-if="software.pedagogicalActivities?.length">
                  <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Activités possibles
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="activity in software.pedagogicalActivities"
                      :key="activity.name"
                      :to="{ path: '/', query: { activity: activity.name } }"
                      :aria-label="`Filtrer par activité : ${activity.name}`"
                      class="hover:scale-105 transition-transform"
                    >
                      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                        <UIcon :name="activity.icon || 'i-lucide-puzzle'" class="w-3.5 h-3.5 text-gray-500" />
                        {{ activity.name }}
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
              <div class="text-base lg:text-lg text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed max-w-prose">
                {{ software.description }}
              </div>
            </div>
          </section>
        </div>

        <!-- SIDEBAR (Right) -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Alternatives recommandées (saisie manuelle dans Directus) -->
          <SoftwareDetailAlternatives :alternatives="alternativesList" :software-name="software.name" />

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

    <!-- Mobile Fixed Bottom CTA (Floating) - Masqué pour les logiciels interdits -->
    <div v-if="certificationLevel !== 3" class="fixed bottom-0 left-0 right-0 p-6 z-50 md:hidden flex justify-center pointer-events-none">
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
