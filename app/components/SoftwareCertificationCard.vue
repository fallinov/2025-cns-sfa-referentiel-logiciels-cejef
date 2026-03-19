<script setup lang="ts">
import type { Software } from "~~/types/software"

interface Props {
  software: Software
  certificationLevel: number
  lgpdLabels: {
    hosting: Record<number, string>
    rgpd: Record<number, string>
    dataCollection: Record<number, string>
  }
}

const props = defineProps<Props>()
const { getSoftwareById } = useSoftware()

const showLgpdDetails = defineModel<boolean>("showDetails", { default: false })

// Configuration basée sur le niveau de certification
const config = computed(() => {
  switch (props.certificationLevel) {
    case 1:
      return {
        // Green - Validated
        color: "green",
        icon: "i-lucide-check",
        title: "Utilisable avec vos élèves",
        description: "Vos élèves peuvent créer un compte et utiliser cet outil avec leurs vraies données (nom, prénom, email scolaire).",
        emphasis: "",
        containerClass: "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50",
        iconContainerClass: "bg-green-500 dark:bg-green-500 ring-2 ring-green-500 dark:ring-green-500 shadow-md",
        titleClass: "text-gray-900 dark:text-white",
        textClass: "text-gray-600 dark:text-gray-300",
        emphasisClass: "text-green-700 dark:text-green-400",
        // Button/UI
        buttonColor: "neutral" as const,
        buttonClass: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }
    case 2:
      return {
        // Orange - Restricted
        color: "orange",
        icon: "i-lucide-alert-triangle",
        title: "Réservé aux enseignants",
        description: "Vous pouvez utiliser cet outil pour préparer vos cours.",
        emphasis: "Pas de données d'élèves : ni noms, ni prénoms, ni emails.",
        additionalInfo: "Vos élèves peuvent l'utiliser sans créer de compte ou avec un compte anonyme (alias).",
        containerClass: "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50",
        iconContainerClass: "bg-orange-500 dark:bg-orange-500 ring-2 ring-orange-500 dark:ring-orange-500 shadow-md",
        titleClass: "text-gray-900 dark:text-white",
        textClass: "text-gray-600 dark:text-gray-300",
        emphasisClass: "text-orange-700 dark:text-orange-400",
        // Notes
        noteClass: "bg-orange-50 dark:bg-orange-900/10 text-orange-800 dark:text-orange-200 border border-orange-100 dark:border-orange-800/30",
        // Button/UI
        buttonColor: "neutral" as const,
        buttonClass: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }
    case 3:
      return {
        // Red - Banned
        color: "red",
        icon: "i-lucide-x",
        title: "Interdit",
        description: "Cet outil ne peut pas être utilisé dans le cadre scolaire.",
        emphasis: "Il ne respecte pas les exigences de protection des données.",
        containerClass: "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50",
        iconContainerClass: "bg-red-500 dark:bg-red-500 ring-2 ring-red-500 dark:ring-red-500 shadow-md",
        titleClass: "text-gray-900 dark:text-white",
        textClass: "text-gray-600 dark:text-gray-300",
        emphasisClass: "text-red-700 dark:text-red-400",
        // UI
        buttonColor: "neutral" as const,
        buttonClass: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }
    default:
      return {
        // Gray - Unknown
        color: "gray",
        icon: "i-lucide-help-circle",
        title: "Non classifié",
        description: "Statut en cours de vérification.",
        emphasis: "",
        containerClass: "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50",
        iconContainerClass: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
        titleClass: "text-gray-900 dark:text-white",
        textClass: "text-gray-600 dark:text-gray-300",
        emphasisClass: "text-gray-700 dark:text-gray-300",
        buttonColor: "neutral" as const,
        buttonClass: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }
  }
})
</script>

<template>
  <div
    :class="['rounded-[var(--ui-radius)] p-5 transition-all', config.containerClass]"
  >
    <div class="flex items-center gap-3 mb-4">
      <!-- Icon with new container style -->
      <div class="shrink-0">
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500', config.iconContainerClass]">
          <UIcon :name="config.icon" class="w-7 h-7 text-white stroke-[3]" />
        </div>
      </div>

      <!-- Title -->
      <h2 :class="['text-2xl font-bold', config.titleClass]">
        {{ config.title }}
      </h2>
    </div>

    <div>
      <!-- Description -->
      <p :class="['text-base leading-relaxed', config.textClass]">
        {{ config.description }}
      </p>

      <!-- Emphasis (Important Rule) -->
      <p v-if="config.emphasis" :class="['text-base font-semibold mt-1', config.emphasisClass]">
        {{ config.emphasis }}
      </p>

      <!-- Additional Info (Level 2 only) -->
      <p v-if="config.additionalInfo" :class="['text-base leading-relaxed mt-2', config.textClass]">
        {{ config.additionalInfo }}
      </p>

      <!-- Usage Notes (Level 2 only) -->
      <div
        v-if="certificationLevel === 2 && software.usageNotes"
        class="mt-3 p-3 rounded-lg text-base italic"
        :class="config.noteClass"
      >
        <span class="font-bold not-italic">Note :</span> {{ software.usageNotes }}
      </div>

      <!-- Alternatives (Level 3 only) -->
      <div v-if="certificationLevel === 3 && software.greenAlternatives?.length" class="mt-4">
        <p class="font-bold text-sm text-gray-700 dark:text-gray-300 mb-1">
          Alternatives recommandées
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Outils conformes qui remplissent la même fonction.
        </p>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="altId in software.greenAlternatives"
            :key="altId"
            :to="`/logiciels/${altId}`"
            color="success"
            variant="outline"
            size="sm"
            icon="i-lucide-arrow-right"
          >
            {{ getSoftwareById(altId)?.name || "Alternative" }}
          </UButton>
        </div>
      </div>

      <!-- Avertissement mineurs < 16 ans -->
      <div
        v-if="software.requiresParentalConsent"
        class="mt-3 p-3 rounded-lg text-base bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-800/30"
      >
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-user-round-x" class="w-5 h-5 shrink-0" />
          <span class="font-bold">Élèves de moins de 16 ans :</span>
        </div>
        <p class="mt-1 ml-7">
          L'accord des parents ou représentants légaux est obligatoire avant toute utilisation.
        </p>
      </div>

      <!-- Toggle Details Button -->
      <div class="mt-4">
        <UButton
          :color="config.buttonColor"
          variant="ghost"
          size="sm"
          class="p-0 hover:bg-transparent"
          :class="config.buttonClass"
          :icon="showLgpdDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
          @click="showLgpdDetails = !showLgpdDetails"
        >
          {{ showLgpdDetails ? 'Masquer les détails techniques' : 'Voir les détails techniques' }}
        </UButton>
      </div>

      <!-- Technical Details -->
      <div v-if="showLgpdDetails" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Hosting -->
          <div class="flex items-center gap-3">
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center shadow-md ring-2 transition-colors duration-500 shrink-0"
              :class="software.lgpd.hosting === 1 ? 'bg-green-500 ring-green-500' : software.lgpd.hosting === 2 ? 'bg-orange-500 ring-orange-500' : 'bg-red-500 ring-red-500'"
            >
              <UIcon
                :name="software.lgpd.hosting === 1 ? 'i-lucide-check' : software.lgpd.hosting === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x'"
                class="w-4 h-4 text-white stroke-[3]"
              />
            </div>
            <div>
              <div class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Hébergement
              </div>
              <div class="text-sm font-bold text-gray-900 dark:text-white">
                {{ lgpdLabels.hosting[software.lgpd.hosting] }}
              </div>
            </div>
          </div>

          <!-- RGPD -->
          <div class="flex items-center gap-3">
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center shadow-md ring-2 transition-colors duration-500 shrink-0"
              :class="software.lgpd.rgpd === 1 ? 'bg-green-500 ring-green-500' : software.lgpd.rgpd === 2 ? 'bg-orange-500 ring-orange-500' : 'bg-red-500 ring-red-500'"
            >
              <UIcon
                :name="software.lgpd.rgpd === 1 ? 'i-lucide-check' : software.lgpd.rgpd === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x'"
                class="w-4 h-4 text-white stroke-[3]"
              />
            </div>
            <div>
              <div class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Conformité RGPD
              </div>
              <div class="text-sm font-bold text-gray-900 dark:text-white">
                {{ lgpdLabels.rgpd[software.lgpd.rgpd] }}
              </div>
            </div>
          </div>

          <!-- Data Collection -->
          <div class="flex items-center gap-3">
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center shadow-md ring-2 transition-colors duration-500 shrink-0"
              :class="software.lgpd.dataCollection === 1 ? 'bg-green-500 ring-green-500' : software.lgpd.dataCollection === 2 ? 'bg-orange-500 ring-orange-500' : 'bg-red-500 ring-red-500'"
            >
              <UIcon
                :name="software.lgpd.dataCollection === 1 ? 'i-lucide-check' : software.lgpd.dataCollection === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x'"
                class="w-4 h-4 text-white stroke-[3]"
              />
            </div>
            <div>
              <div class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Collecte de données
              </div>
              <div class="text-sm font-bold text-gray-900 dark:text-white">
                {{ lgpdLabels.dataCollection[software.lgpd.dataCollection] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
