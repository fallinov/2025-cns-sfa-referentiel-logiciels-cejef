<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig, getCertificationIcon } from "~/utils/certification"
import { getSoftwareIcon } from "~/utils/software-icon"

interface Props {
  software: Software
}

const props = defineProps<Props>()

const config = computed(() => {
  return getCertificationConfig(props.software.certificationLevel)
})

const handleCardClick = () => {
  if (import.meta.client) {
    const url = new URL(window.location.href)
    url.hash = `software-${props.software.id}`
    window.history.replaceState(window.history.state, "", url.href)
  }
}
</script>

<template>
  <NuxtLink
    :id="`software-${software.id}`"
    :to="`/logiciels/${software.id}`"
    class="group relative w-full h-full overflow-hidden bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] shadow-sm hover:shadow-xl hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary-500 transition-all duration-300 ease-out p-6 flex flex-col items-start gap-4 isolate cursor-pointer scroll-mt-24"
    @click="handleCardClick"
  >
    <!-- Certification Badge (Floating Top Right of Card) -->
    <div
      class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-sm ring-2 transition-colors duration-500 z-20"
      :class="[config.solidBg, config.ringSolid]"
      :aria-label="`Certification LPD: ${config.label}`"
      :title="`Certification LPD: ${config.label}`"
      role="img"
    >
      <UIcon
        :name="getCertificationIcon(software.certificationLevel)"
        class="w-7 h-7 text-white stroke-[3]"
        aria-hidden="true"
      />
    </div>

    <!-- Icon -->
    <div class="relative flex-shrink-0 w-16 h-16 flex items-center justify-center mb-2">
      <UIcon
        :name="getSoftwareIcon(software)"
        class="w-full h-full transition-colors duration-500 text-gray-600 dark:text-gray-300"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 flex-1 w-full">

      <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors line-clamp-2">
        {{ software.name }}
      </h3>

      <p class="text-base leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Badges (Quick Filters only) -->
    <div class="relative z-10 mt-auto flex flex-wrap gap-2 pt-2">
      <SoftwareFeatureBadge
        v-if="software.approvedBySEN"
        icon="i-lucide-badge-check"
        label="Approuvé SEN"
        tooltip="Recommandé par le Service de l'Enseignement (SEN)"
        class="bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.approvedBySFP"
        icon="i-lucide-badge-check"
        label="Approuvé SFP"
        tooltip="Recommandé par le SFP (Service de la Formation Postobligatoire)"
        class="bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.requiresEduAccount && software.certificationLevel === 1"
        icon="i-lucide-at-sign"
        label="Compte edu.jura.ch"
        tooltip="Classification validée uniquement avec le compte @edu.jura.ch"
        class="bg-blue-500 text-white dark:bg-blue-500 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.requiresEdulog && software.certificationLevel === 1"
        icon="i-lucide-key-round"
        label="Compte Edulog"
        tooltip="Connexion possible via la fédération d'identités Edulog"
        class="bg-blue-500 text-white dark:bg-blue-500 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.requiresParentalConsent"
        icon="i-lucide-cake"
        label="< 16 ans : accord parents"
        tooltip="Accord parental obligatoire pour les moins de 16 ans"
        class="bg-orange-500 text-white dark:bg-orange-500 dark:text-white border-none"
      />
    </div>
  </NuxtLink>
</template>
