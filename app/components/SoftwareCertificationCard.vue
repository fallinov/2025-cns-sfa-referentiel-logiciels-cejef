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
        color: "green",
        icon: "i-lucide-check-circle",
        title: "Usage Autorisé avec Élèves",
        description: "Vous pouvez utiliser ce logiciel librement avec vos élèves.",
        emphasis: "La création de comptes et l'utilisation de données personnelles sont autorisées.",
        ringClass: "ring-green-500/50",
        bgClass: "bg-green-50 dark:bg-green-900/10",
        iconClass: "text-green-600 dark:text-green-400",
        titleClass: "text-green-800 dark:text-green-200",
        textClass: "text-green-800 dark:text-green-200",
        borderClass: "border-green-200 dark:border-green-800/50",
        buttonColor: "success" as const,
        buttonClass: "text-green-700 dark:text-green-300",
        labelClass: "text-green-900 dark:text-green-100",
        valueClass: "text-orange-700 dark:text-orange-400"
      }
    case 2:
      return {
        color: "orange",
        icon: "i-lucide-alert-triangle",
        title: "Usage Pédagogique Uniquement",
        description: "Vous pouvez utiliser cet outil pour votre préparation.",
        emphasis: "Interdiction formelle de saisir des données d'élèves (noms, emails).",
        additionalInfo: "Si les élèves doivent utiliser l'outil, cela doit être fait de manière strictement anonyme.",
        ringClass: "ring-orange-500/50",
        bgClass: "bg-orange-50 dark:bg-orange-900/10",
        iconClass: "text-orange-600 dark:text-orange-400",
        titleClass: "text-orange-800 dark:text-orange-200",
        textClass: "text-orange-800 dark:text-orange-200",
        borderClass: "border-orange-200 dark:border-orange-800/50",
        buttonColor: "warning" as const,
        buttonClass: "text-orange-700 dark:text-orange-300",
        labelClass: "text-orange-900 dark:text-orange-100",
        valueClass: "text-orange-700 dark:text-orange-400",
        noteBgClass: "bg-white/50 dark:bg-black/20",
        noteBorderClass: "border-orange-200 dark:border-orange-800/50",
        noteTextClass: "text-orange-900 dark:text-orange-100"
      }
    case 3:
      return {
        color: "red",
        icon: "i-lucide-ban",
        title: "Usage Interdit",
        description: "Ce logiciel ne respecte pas les normes de sécurité.",
        emphasis: "Il ne doit être utilisé ni par les enseignants ni par les élèves.",
        ringClass: "ring-red-500/50",
        bgClass: "bg-red-50 dark:bg-red-900/10",
        iconClass: "text-red-600 dark:text-red-400",
        titleClass: "text-red-800 dark:text-red-200",
        textClass: "text-red-800 dark:text-red-200",
        borderClass: "border-red-200 dark:border-red-800/50",
        buttonColor: "error" as const,
        buttonClass: "text-red-700 dark:text-red-300",
        labelClass: "text-red-900 dark:text-red-100",
        valueClass: "text-orange-700 dark:text-orange-400",
        alternativesTextClass: "text-red-900 dark:text-red-100"
      }
    default:
      return {
        color: "gray",
        icon: "i-lucide-help-circle",
        title: "Non classifié",
        description: "",
        emphasis: "",
        ringClass: "ring-gray-500/50",
        bgClass: "bg-gray-50 dark:bg-gray-900/10",
        iconClass: "text-gray-600 dark:text-gray-400",
        titleClass: "text-gray-800 dark:text-gray-200",
        textClass: "text-gray-800 dark:text-gray-200",
        borderClass: "border-gray-200 dark:border-gray-800/50",
        buttonColor: "neutral" as const,
        buttonClass: "text-gray-700 dark:text-gray-300",
        labelClass: "text-gray-900 dark:text-gray-100",
        valueClass: "text-gray-700 dark:text-gray-400"
      }
  }
})
</script>

<template>
  <UCard
    :class="['ring-2', config.ringClass, config.bgClass, '[&>div]:!p-4']"
  >
    <div class="flex gap-5">
      <!-- Icon -->
      <div class="shrink-0">
        <CertificationBadge :level="certificationLevel" size="xl" />
      </div>

      <div class="flex-1">
        <!-- Title -->
        <h2 :class="['text-base font-bold mb-2', config.titleClass]">
          {{ config.title }}
        </h2>

        <!-- Description -->
        <p :class="['text-base leading-relaxed mb-2', config.textClass]">
          {{ config.description }}
          <strong class="block mt-1 font-bold">{{ config.emphasis }}</strong>
        </p>

        <!-- Additional Info (Level 2 only) -->
        <p v-if="config.additionalInfo" :class="['text-base leading-relaxed mb-3', config.textClass]">
          {{ config.additionalInfo }}
        </p>

        <!-- Usage Notes (Level 2 only) -->
        <div
          v-if="certificationLevel === 2 && software.usageNotes"
          :class="['mb-4 p-3 rounded border text-base italic', config.noteBgClass, config.noteBorderClass, config.noteTextClass]"
        >
          Note : {{ software.usageNotes }}
        </div>

        <!-- Alternatives (Level 3 only) -->
        <div v-if="certificationLevel === 3 && software.greenAlternatives?.length" class="mb-4">
          <p :class="['font-bold text-base mb-2', config.alternativesTextClass]">
            Alternatives recommandées :
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="altId in software.greenAlternatives"
              :key="altId"
              :to="`/logiciels/${altId}`"
              color="success"
              variant="soft"
              icon="i-lucide-arrow-right"
            >
              {{ getSoftwareById(altId)?.name || "Alternative" }}
            </UButton>
          </div>
        </div>

        <!-- Toggle Details Button -->
        <div>
          <UButton
            :color="config.buttonColor"
            variant="ghost"
            size="sm"
            :class="['p-0 hover:bg-transparent', config.buttonClass]"
            :icon="showLgpdDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            @click="showLgpdDetails = !showLgpdDetails"
          >
            {{ showLgpdDetails ? 'Masquer les détails techniques' : 'Voir les détails techniques' }}
          </UButton>
        </div>

        <!-- Technical Details -->
        <div v-if="showLgpdDetails" :class="['mt-4 pt-4 border-t', config.borderClass]">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Hosting -->
            <div class="flex items-center gap-3">
              <UIcon
                :name="software.lgpd.hosting === 1 ? 'i-lucide-check-circle' : software.lgpd.hosting === 2 ? 'i-lucide-alert-triangle' : 'i-lucide-x-circle'"
                class="w-5 h-5"
                :class="software.lgpd.hosting === 1 ? 'text-green-600' : software.lgpd.hosting === 2 ? 'text-orange-600' : 'text-red-600'"
              />
              <div>
                <div :class="['text-base', config.labelClass]">
                  Hébergement
                </div>
                <div :class="['text-base font-bold', config.valueClass]">
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
                <div :class="['text-base', config.labelClass]">
                  Conformité RGPD
                </div>
                <div :class="['text-base font-bold', config.valueClass]">
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
                <div :class="['text-base', config.labelClass]">
                  Collecte Données
                </div>
                <div :class="['text-base font-bold', config.valueClass]">
                  {{ lgpdLabels.dataCollection[software.lgpd.dataCollection] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
