<script setup lang="ts">
import { getCertificationLevel } from "~~/types/software"
import { platformIcons, formatLanguages } from "~/utils/formatters"

const { selectedSoftware, isDetailOpen, closeDetail } = useSoftware()

// Handler pour la fermeture de la modal
const handleClose = (value: boolean) => {
  if (!value) {
    closeDetail()
  }
}

// Calcul du niveau de certification
const certificationLevel = computed(() =>
  selectedSoftware.value
    ? getCertificationLevel(selectedSoftware.value.lgpd)
    : 1
)
</script>

<template>
  <UModal
    :open="isDetailOpen"
    :ui="{
      content: 'max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 ease-out',
      overlay: 'backdrop-blur-sm transition-opacity duration-300',
      body: 'p-0'
    }"
    @update:open="handleClose"
  >
    <template #content>
      <div v-if="selectedSoftware" class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ selectedSoftware.name }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Informations détaillées sur le logiciel
            </p>
          </div>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            size="lg"
            @click="closeDetail"
          />
        </div>

        <!-- Body - Scrollable -->
        <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <!-- Section 1 : Identification -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <UIcon
                :name="selectedSoftware.icon ?? 'i-simple-icons-appstore'"
                class="w-16 h-16 text-gray-700 dark:text-gray-300 shrink-0"
              />
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-if="selectedSoftware.supportedByCEJEF"
                  color="success"
                  variant="soft"
                >
                  <template #leading>
                    <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
                  </template>
                  Pris en charge CEJEF
                </UBadge>
                <UBadge
                  v-if="selectedSoftware.campusTraining"
                  color="info"
                  variant="soft"
                >
                  <template #leading>
                    <UIcon name="i-lucide-graduation-cap" class="w-4 h-4" />
                  </template>
                  Formation Campus disponible
                </UBadge>
              </div>
            </div>

            <p class="text-gray-700 dark:text-gray-300">
              {{ selectedSoftware.shortDescription }}
            </p>
          </div>

          <USeparator />

          <!-- Certification CEJEF -->
          <div class="space-y-3">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
            >
              <UIcon name="i-lucide-badge-check" class="w-5 h-5" />
              Certification CEJEF
            </h3>
            <CertificationBadge :level="certificationLevel" />
          </div>

          <USeparator />

          <!-- Section 2 : Classification LGPD -->
          <div class="space-y-3">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
            >
              <UIcon name="i-lucide-shield" class="w-5 h-5" />
              Critères LGPD détaillés
            </h3>
            <LgpdIcons :lgpd="selectedSoftware.lgpd" :show-labels="true" />
          </div>

          <USeparator />

          <!-- Section 3 : Informations techniques -->
          <div class="space-y-3">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
            >
              <UIcon name="i-lucide-settings" class="w-5 h-5" />
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
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
            >
              <UIcon name="i-lucide-book-open" class="w-5 h-5" />
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
                class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <UIcon name="i-lucide-link" class="w-5 h-5" />
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

          <!-- Bouton d'action -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
            <UButton
              :to="selectedSoftware.toolUrl"
              target="_blank"
              color="primary"
              size="lg"
              block
              trailing-icon="i-lucide-external-link"
            >
              Accéder à l'outil
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
