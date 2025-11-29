<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import { platformIcons, formatLanguages } from "~/utils/formatters"

/**
 * Page de détail d'un logiciel
 * Route: /logiciels/[id]
 *
 * Cette page remplace le slider SoftwareDetail.vue
 * Elle offre une URL partageable et une meilleure accessibilité
 */

const route = useRoute()
const router = useRouter()
const { getSoftwareById } = useSoftware()
const { getPreviousSoftware, getNextSoftware, getCurrentPosition } = useSoftwareNavigation()

// Récupérer le logiciel via l'ID dans l'URL
const softwareId = computed(() => route.params.id as string)
const software = computed(() => getSoftwareById(softwareId.value))

// Navigation suivant/précédent
const previousSoftware = computed(() => software.value ? getPreviousSoftware(software.value.id) : null)
const nextSoftware = computed(() => software.value ? getNextSoftware(software.value.id) : null)
const position = computed(() => software.value ? getCurrentPosition(software.value.id) : { current: 0, total: 0 })

// Navigation au clavier avec les flèches
defineShortcuts({
  arrowleft: () => {
    if (previousSoftware.value) {
      router.push(`/logiciels/${previousSoftware.value.id}`)
    }
  },
  arrowright: () => {
    if (nextSoftware.value) {
      router.push(`/logiciels/${nextSoftware.value.id}`)
    }
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
    fill: "bg-emerald-700 dark:bg-emerald-600",
    label: "Autorisé",
    icon: "i-lucide-circle-check-big",
    ring: "ring-emerald-500/20"
  },
  2: {
    fill: "bg-amber-700 dark:bg-amber-600",
    label: "Attention",
    icon: "i-lucide-triangle-alert",
    ring: "ring-amber-500/20"
  },
  3: {
    fill: "bg-rose-700 dark:bg-rose-600",
    label: "Interdit",
    icon: "i-lucide-circle-x",
    ring: "ring-rose-500/20"
  }
}

const config = computed(() => {
  const level = certificationLevel.value || 2
  return levelConfig[level]
})

// Meta tags pour SEO et partage social
useSeoMeta({
  title: `${software.value.name} - Référentiel Logiciels CEJEF`,
  description: software.value.shortDescription,
  ogTitle: `${software.value.name} - Référentiel Logiciels CEJEF`,
  ogDescription: software.value.shortDescription
})
</script>

<template>
  <div v-if="software" class="min-h-screen relative">
    <!-- Background Aurora Effect -->
    <BackgroundAurora />

    <main class="relative z-10">
      <!-- Header / Hero -->
      <UPageSection class="pt-8 pb-6">
        <!-- Breadcrumb / Retour -->
        <nav aria-label="Fil d'Ariane" class="mb-6">
          <UButton
            to="/"
            color="neutral"
            variant="ghost"
            icon="i-lucide-arrow-left"
            size="lg"
          >
            Retour à la liste
          </UButton>
        </nav>

        <!-- Hero Header -->
        <header class="space-y-6">
          <!-- Icon + Title + Badges -->
          <div class="flex flex-col sm:flex-row items-start gap-6">
            <!-- Logo/Icon -->
            <div
              :class="[
                'shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center',
                'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
                'ring-1 ring-inset ring-gray-200 dark:ring-gray-800',
                'shadow-lg'
              ]"
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
                class="w-16 h-16 text-gray-700 dark:text-gray-300"
              />
              <span
                v-else
                class="text-4xl font-black text-gray-700 dark:text-gray-300"
              >
                {{ software.name.substring(0, 2).toUpperCase() }}
              </span>
            </div>

            <!-- Title + Meta -->
            <div class="flex-1 space-y-4">
              <div>
                <h1
                  class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {{ software.name }}
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400">
                  {{ software.category }}
                </p>
              </div>

              <!-- Badges row -->
              <div class="flex flex-wrap gap-2">
                <!-- Badge Certification -->
                <UBadge
                  :color="certificationLevel === 1 ? 'success' : certificationLevel === 2 ? 'warning' : 'error'"
                  variant="solid"
                  size="lg"
                >
                  <template #leading>
                    <UIcon :name="config.icon" class="w-4 h-4" />
                  </template>
                  {{ config.label }}
                </UBadge>

                <!-- Badge Support CEJEF -->
                <UBadge
                  v-if="software.supportedByCEJEF"
                  color="success"
                  variant="soft"
                  size="lg"
                >
                  <template #leading>
                    <UIcon name="i-lucide-headphones" class="w-4 h-4" />
                  </template>
                  Support CEJEF
                </UBadge>

                <!-- Badge Formation -->
                <UBadge
                  v-if="software.campusTraining"
                  color="info"
                  variant="soft"
                  size="lg"
                >
                  <template #leading>
                    <UIcon name="i-lucide-graduation-cap" class="w-4 h-4" />
                  </template>
                  Formation disponible
                </UBadge>

                <!-- Badge Coût -->
                <UBadge
                  :color="
                    software.cost === 'Gratuit'
                      ? 'success'
                      : software.cost === 'Freemium'
                        ? 'info'
                        : 'warning'
                  "
                  variant="soft"
                  size="lg"
                >
                  <template #leading>
                    <UIcon name="i-lucide-wallet" class="w-4 h-4" />
                  </template>
                  {{ software.cost }}
                  <span v-if="software.price" class="ml-1">
                    - {{ software.price }}
                  </span>
                </UBadge>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
            {{ software.shortDescription }}
          </p>

          <!-- Action buttons -->
          <div class="flex flex-wrap gap-3">
            <UButton
              :to="software.toolUrl"
              target="_blank"
              color="primary"
              size="xl"
              icon="i-lucide-external-link"
            >
              Visiter le site officiel
            </UButton>

            <UButton
              v-if="software.documentation"
              :to="software.documentation"
              target="_blank"
              color="neutral"
              variant="outline"
              size="xl"
              icon="i-lucide-book"
            >
              Documentation
            </UButton>
          </div>
        </header>
      </UPageSection>

      <!-- Main Content -->
      <UPageSection class="py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Main Info -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Section: Décision CEJEF -->
            <section
              aria-labelledby="certification-heading"
              class="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-inset ring-gray-200/50 dark:ring-gray-800/50"
            >
              <h2
                id="certification-heading"
                class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
              >
                <UIcon name="i-lucide-badge-check" class="w-6 h-6" />
                Décision CEJEF
              </h2>

              <div class="space-y-4">
                <CertificationBadge :level="certificationLevel" />

                <div class="grid gap-4 mt-6">
                  <!-- Données élèves -->
                  <div class="flex items-start gap-3">
                    <div
                      class="shrink-0 w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center"
                    >
                      <UIcon
                        name="i-lucide-user-check"
                        class="w-5 h-5 text-primary-600 dark:text-primary-400"
                      />
                    </div>
                    <div>
                      <div
                        class="font-semibold text-gray-900 dark:text-white"
                      >
                        Données élèves
                      </div>
                      <div class="text-gray-600 dark:text-gray-400">
                        {{ software.personalData ? "Autorisées avec consentement" : "Non autorisées" }}
                      </div>
                    </div>
                  </div>

                  <!-- Compte requis -->
                  <div class="flex items-start gap-3">
                    <div
                      class="shrink-0 w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center"
                    >
                      <UIcon
                        name="i-lucide-user"
                        class="w-5 h-5 text-primary-600 dark:text-primary-400"
                      />
                    </div>
                    <div>
                      <div
                        class="font-semibold text-gray-900 dark:text-white"
                      >
                        Compte requis
                      </div>
                      <div class="text-gray-600 dark:text-gray-400">
                        {{ software.accountRequired ? "Oui (enseignant et/ou élève)" : "Non - accès libre" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section: Usage pédagogique -->
            <section
              aria-labelledby="pedagogy-heading"
              class="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-inset ring-gray-200/50 dark:ring-gray-800/50"
            >
              <h2
                id="pedagogy-heading"
                class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
              >
                <UIcon name="i-lucide-book-open" class="w-6 h-6" />
                Usage pédagogique
              </h2>

              <div class="space-y-4">
                <!-- Catégorie -->
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-tag"
                    class="w-5 h-5 text-gray-500 mt-0.5"
                  />
                  <div>
                    <div
                      class="font-semibold text-gray-900 dark:text-white"
                    >
                      Type d'outil
                    </div>
                    <div class="text-gray-600 dark:text-gray-400">
                      {{ software.category }}
                    </div>
                  </div>
                </div>

                <!-- Disciplines -->
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-layers"
                    class="w-5 h-5 text-gray-500 mt-0.5"
                  />
                  <div>
                    <div
                      class="font-semibold text-gray-900 dark:text-white"
                    >
                      Disciplines
                    </div>
                    <div class="text-gray-600 dark:text-gray-400">
                      {{ software.disciplines.join(", ") }}
                    </div>
                  </div>
                </div>

                <!-- Activité -->
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-activity"
                    class="w-5 h-5 text-gray-500 mt-0.5"
                  />
                  <div>
                    <div
                      class="font-semibold text-gray-900 dark:text-white"
                    >
                      Activité pédagogique
                    </div>
                    <div class="text-gray-600 dark:text-gray-400">
                      {{ software.activity }}
                    </div>
                  </div>
                </div>

                <!-- Niveau technique -->
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-bar-chart-3"
                    class="w-5 h-5 text-gray-500 mt-0.5"
                  />
                  <div>
                    <div
                      class="font-semibold text-gray-900 dark:text-white"
                    >
                      Niveau technique requis
                    </div>
                    <UBadge
                      :color="
                        software.technicalLevel === 1
                          ? 'success'
                          : software.technicalLevel === 2
                            ? 'warning'
                            : 'error'
                      "
                      variant="soft"
                      size="md"
                      class="mt-1"
                    >
                      {{
                        software.technicalLevel === 1
                          ? "Débutant"
                          : software.technicalLevel === 2
                            ? "Intermédiaire"
                            : "Expert"
                      }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section: Conformité & données -->
            <section
              aria-labelledby="lgpd-heading"
              class="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-inset ring-gray-200/50 dark:ring-gray-800/50"
            >
              <h2
                id="lgpd-heading"
                class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
              >
                <UIcon name="i-lucide-shield" class="w-6 h-6" />
                Conformité & données (LGPD)
              </h2>

              <LgpdIcons :lgpd="software.lgpd" :show-labels="true" />

              <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div class="flex gap-2">
                  <UIcon
                    name="i-lucide-info"
                    class="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                  />
                  <div class="text-sm text-blue-900 dark:text-blue-100">
                    <p class="font-semibold mb-1">
                      Recommandations CEJEF
                    </p>
                    <p>
                      {{
                        certificationLevel === 1
                          ? "Cet outil est autorisé pour un usage pédagogique. Respectez les bonnes pratiques de protection des données."
                          : certificationLevel === 2
                            ? "Cet outil nécessite une attention particulière. Consultez le support CEJEF avant utilisation."
                            : "Cet outil n'est pas autorisé pour un usage avec données élèves. Privilégiez les alternatives recommandées."
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column - Sidebar Info -->
          <div class="space-y-6">
            <!-- Informations techniques -->
            <aside
              aria-labelledby="technical-heading"
              class="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-inset ring-gray-200/50 dark:ring-gray-800/50 sticky top-6"
            >
              <h2
                id="technical-heading"
                class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
              >
                <UIcon name="i-lucide-settings" class="w-5 h-5" />
                Informations techniques
              </h2>

              <div class="space-y-4">
                <!-- Plateformes -->
                <div>
                  <div
                    class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Plateformes
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <UBadge
                      v-for="platform in software.platforms"
                      :key="platform"
                      color="neutral"
                      variant="subtle"
                      size="sm"
                    >
                      <template #leading>
                        <UIcon
                          :name="
                            platformIcons[platform] || 'i-lucide-help-circle'
                          "
                          class="w-3 h-3"
                        />
                      </template>
                      {{ platform }}
                    </UBadge>
                  </div>
                </div>

                <!-- Langues -->
                <div>
                  <div
                    class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Langues
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    {{ formatLanguages(software.languages) }}
                  </div>
                </div>

                <!-- Type de licence -->
                <div>
                  <div
                    class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Type de licence
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    {{ software.licenseType }}
                  </div>
                </div>

                <!-- Intégrations -->
                <div v-if="software.integrations">
                  <div
                    class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Intégrations
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <UBadge
                      v-for="integration in software.integrations"
                      :key="integration"
                      color="primary"
                      variant="subtle"
                      size="sm"
                    >
                      {{ integration }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </UPageSection>

      <!-- Bottom Navigation -->
      <UPageSection class="py-8">
        <div class="space-y-6">
          <!-- Navigation Précédent/Suivant -->
          <nav
            v-if="previousSoftware || nextSoftware"
            aria-label="Navigation entre logiciels"
            class="flex items-center justify-between gap-4"
          >
            <!-- Bouton Précédent -->
            <UButton
              v-if="previousSoftware"
              :to="`/logiciels/${previousSoftware.id}`"
              color="neutral"
              variant="outline"
              size="xl"
              icon="i-lucide-chevron-left"
              class="flex-1 max-w-md"
            >
              <span class="flex flex-col items-start text-left">
                <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  Précédent
                  <UKbd size="sm">←</UKbd>
                </span>
                <span class="font-semibold truncate max-w-full">{{ previousSoftware.name }}</span>
              </span>
            </UButton>
            <div v-else class="flex-1 max-w-md"></div>

            <!-- Position actuelle -->
            <div
              v-if="position.total > 0"
              class="text-center text-sm text-gray-600 dark:text-gray-400 shrink-0"
            >
              {{ position.current }} / {{ position.total }}
            </div>

            <!-- Bouton Suivant -->
            <UButton
              v-if="nextSoftware"
              :to="`/logiciels/${nextSoftware.id}`"
              color="neutral"
              variant="outline"
              size="xl"
              trailing-icon="i-lucide-chevron-right"
              class="flex-1 max-w-md justify-end"
            >
              <span class="flex flex-col items-end text-right">
                <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  Suivant
                  <UKbd size="sm">→</UKbd>
                </span>
                <span class="font-semibold truncate max-w-full">{{ nextSoftware.name }}</span>
              </span>
            </UButton>
            <div v-else class="flex-1 max-w-md"></div>
          </nav>

          <!-- Retour à la liste -->
          <nav aria-label="Retour à la liste" class="flex justify-center">
            <UButton
              to="/"
              color="neutral"
              variant="outline"
              size="xl"
              icon="i-lucide-arrow-left"
            >
              Retour à la liste des logiciels
            </UButton>
          </nav>
        </div>
      </UPageSection>
    </main>
  </div>
</template>
