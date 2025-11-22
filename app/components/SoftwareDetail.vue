<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"

const { selectedSoftware, isDetailOpen, closeDetail } = useSoftware()

// Créer une ref locale pour le v-model:open du USlideover
const isOpen = ref(false)

// Synchroniser isOpen avec isDetailOpen (quand ouvert programmatiquement)
watch(isDetailOpen, (newVal) => {
  isOpen.value = newVal
})

// Quand isOpen change (fermé par l'utilisateur via overlay ou ESC)
watch(isOpen, (newVal) => {
  if (!newVal && isDetailOpen.value) {
    closeDetail()
  }
})

// Calcul du niveau de certification
const certificationLevel = computed(() =>
  selectedSoftware.value
    ? getCertificationLevel(selectedSoftware.value.lgpd)
    : 1
)

// Mappage des icônes de plateformes
const platformIcons: Record<string, string> = {
  web: "i-lucide-globe",
  windows: "i-lucide-laptop",
  mac: "i-lucide-laptop",
  smartphone: "i-lucide-smartphone",
  tablet: "i-lucide-tablet"
}

// Mappage des codes de langues vers leurs noms complets
const languageNames: Record<string, string> = {
  fr: "Français",
  en: "Anglais",
  de: "Allemand",
  es: "Espagnol",
  it: "Italien"
}

// Fonction pour formater les langues
const formatLanguages = (codes: string[]) => {
  return codes.map(code => languageNames[code] || code).join(", ")
}
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    side="right"
    :title="selectedSoftware?.name || 'Détails du logiciel'"
    description="Informations détaillées sur le logiciel sélectionné"
    :ui="{
      content: 'w-full sm:w-[600px] md:w-[700px] lg:w-[800px]',
      overlay: 'backdrop-blur-sm',
      wrapper: 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl'
    }"
  >
    <!-- Empty default slot for programmatic triggering -->
    <span></span>

    <template #body>
      <div v-if="selectedSoftware" class="space-y-6">
        <!-- Section 1 : Identification -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lg shrink-0">
              <UIcon
                :name="selectedSoftware.icon ?? 'i-simple-icons-appstore'"
                class="w-10 h-10 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div class="flex flex-wrap gap-2">
              <div
                v-if="selectedSoftware.supportedByCEJEF"
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30"
              >
                <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span class="text-sm font-bold text-emerald-700 dark:text-emerald-300">Pris en charge CEJEF</span>
              </div>
              <div
                v-if="selectedSoftware.campusTraining"
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/30"
              >
                <UIcon name="i-lucide-graduation-cap" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span class="text-sm font-bold text-blue-700 dark:text-blue-300">Formation Campus disponible</span>
              </div>
            </div>
          </div>

          <p class="text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
            {{ selectedSoftware.shortDescription }}
          </p>
        </div>

        <USeparator />

        <!-- Certification CEJEF -->
        <div class="space-y-3">
          <h3
            class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 tracking-tight"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
              <UIcon name="i-lucide-badge-check" class="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            Certification CEJEF
          </h3>
          <CertificationBadge :level="certificationLevel" />
        </div>

        <USeparator />

        <!-- Section 2 : Classification LGPD -->
        <div class="space-y-3">
          <h3
            class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 tracking-tight"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
              <UIcon name="i-lucide-shield" class="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            Critères LGPD détaillés
          </h3>
          <LgpdIcons :lgpd="selectedSoftware.lgpd" :show-labels="true" />
        </div>

        <USeparator />

        <!-- Section 3 : Informations techniques -->
        <div class="space-y-3">
          <h3
            class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 tracking-tight"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
              <UIcon name="i-lucide-settings" class="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            Informations techniques
          </h3>

          <div class="grid gap-3">
            <!-- Plateformes -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-monitor"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Plateformes
                </div>
                <div class="flex flex-wrap gap-1 mt-1">
                  <UBadge
                    v-for="platform in selectedSoftware.platforms"
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
            </div>

            <!-- Connexion obligatoire -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-user"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Connexion obligatoire
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {{ selectedSoftware.accountRequired ? "Oui" : "Non" }}
                </div>
              </div>
            </div>

            <!-- Langues -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-languages"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Langues
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {{ formatLanguages(selectedSoftware.languages) }}
                </div>
              </div>
            </div>

            <!-- Type de licence -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-file-text"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Type de licence
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {{ selectedSoftware.licenseType }}
                </div>
              </div>
            </div>

            <!-- Coût -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-coins"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Coût
                </div>
                <div class="mt-1">
                  <UBadge
                    :color="
                      selectedSoftware.cost === 'Gratuit'
                        ? 'success'
                        : selectedSoftware.cost === 'Freemium'
                          ? 'info'
                          : 'warning'
                    "
                    variant="soft"
                  >
                    {{ selectedSoftware.cost }}
                  </UBadge>
                  <span
                    v-if="selectedSoftware.price"
                    class="text-sm text-gray-600 dark:text-gray-400 ml-2"
                  >
                    {{ selectedSoftware.price }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <USeparator />

        <!-- Section 4 : Pédagogie -->
        <div class="space-y-3">
          <h3
            class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 tracking-tight"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
              <UIcon name="i-lucide-book-open" class="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            Pédagogie
          </h3>

          <div class="grid gap-3">
            <!-- Catégorie -->
            <div class="flex items-start gap-2">
              <UIcon name="i-lucide-tag" class="w-5 h-5 text-gray-500 mt-0.5" />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Catégorie fonctionnelle
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {{ selectedSoftware.category }}
                </div>
              </div>
            </div>

            <!-- Disciplines -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-layers"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Disciplines
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {{ selectedSoftware.disciplines.join(", ") }}
                </div>
              </div>
            </div>

            <!-- Activité -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-activity"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Activité pédagogique
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {{ selectedSoftware.activity }}
                </div>
              </div>
            </div>

            <!-- Niveau technique -->
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-bar-chart-3"
                class="w-5 h-5 text-gray-500 mt-0.5"
              />
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Niveau technique requis
                </div>
                <div class="mt-1">
                  <UBadge
                    :color="
                      selectedSoftware.technicalLevel === 1
                        ? 'success'
                        : selectedSoftware.technicalLevel === 2
                          ? 'warning'
                          : 'error'
                    "
                    variant="soft"
                  >
                    {{
                      selectedSoftware.technicalLevel === 1
                        ? "Débutant"
                        : selectedSoftware.technicalLevel === 2
                          ? "Intermédiaire"
                          : "Expert"
                    }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 5 : Ressources (si disponibles) -->
        <template
          v-if="selectedSoftware.integrations || selectedSoftware.documentation"
        >
          <USeparator />

          <div class="space-y-3">
            <h3
              class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 tracking-tight"
            >
              <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
                <UIcon name="i-lucide-link" class="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              Ressources
            </h3>

            <div class="grid gap-3">
              <!-- Intégrations -->
              <div
                v-if="selectedSoftware.integrations"
                class="flex items-start gap-2"
              >
                <UIcon
                  name="i-lucide-puzzle"
                  class="w-5 h-5 text-gray-500 mt-0.5"
                />
                <div class="flex-1">
                  <div
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Intégrations
                  </div>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <UBadge
                      v-for="integration in selectedSoftware.integrations"
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

              <!-- Documentation -->
              <div
                v-if="selectedSoftware.documentation"
                class="flex items-start gap-2"
              >
                <UIcon
                  name="i-lucide-book"
                  class="w-5 h-5 text-gray-500 mt-0.5"
                />
                <div class="flex-1">
                  <div
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Documentation
                  </div>
                  <a
                    :href="selectedSoftware.documentation"
                    target="_blank"
                    class="text-sm text-primary-600 dark:text-primary-400 hover:underline mt-0.5 inline-flex items-center gap-1"
                  >
                    Voir la documentation
                    <UIcon name="i-lucide-external-link" class="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Bouton d'action with Liquid Glass -->
        <div class="pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <a
            :href="selectedSoftware.toolUrl"
            target="_blank"
            class="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-rose-600/90 dark:bg-rose-600/80 backdrop-blur-md border border-rose-500/50 dark:border-rose-400/30 text-white shadow-lg hover:bg-rose-600 dark:hover:bg-rose-600/90 transition-all duration-300"
          >
            <span class="text-base font-bold">Accéder à l'outil</span>
            <UIcon name="i-lucide-external-link" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </template>
  </USlideover>
</template>
