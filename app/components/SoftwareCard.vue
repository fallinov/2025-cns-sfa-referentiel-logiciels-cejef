<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig, getCertificationIcon } from "~/utils/certification"

interface Props {
  software: Software
}

const props = defineProps<Props>()

const config = computed(() => {
  return getCertificationConfig(props.software.certificationLevel)
})

// "Approuvé CEJEF" requires: level 1 (green) + supportedByCEJEF + campusTraining
const isApprovedCejef = computed(() => {
  return props.software.certificationLevel === 1
    && props.software.supportedByCEJEF
    && props.software.campusTraining
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
      class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md ring-2 transition-colors duration-500 z-20"
      :class="[config.solidBg, config.ringSolid]"
      :aria-label="`Certification LGPD: ${config.label}`"
      :title="`Certification LGPD: ${config.label}`"
      role="img"
    >
      <UIcon
        :name="getCertificationIcon(software.certificationLevel)"
        class="w-7 h-7 text-white stroke-[3]"
        aria-hidden="true"
      />
    </div>

    <!-- Logo/Icon -->
    <div class="relative flex-shrink-0 w-16 h-16 flex items-center justify-center mb-2">
      <img
        v-if="software.logo"
        :src="`/logos/${software.logo}.svg`"
        :alt="`${software.name} logo`"
        class="w-full h-full object-contain"
      />
      <UIcon
        v-else-if="software.icon"
        :name="software.icon"
        class="w-full h-full transition-colors duration-500 text-gray-600 dark:text-gray-300"
      />
      <span
        v-else
        class="text-2xl font-black transition-colors duration-500 text-gray-600 dark:text-gray-300"
      >
        {{ software.name.substring(0, 2).toUpperCase() }}
      </span>
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
        v-if="isApprovedCejef"
        icon="i-lucide-badge-check"
        label="Approuvé CEJEF"
        class="bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.approvedBySEN"
        icon="i-lucide-badge-check"
        label="Approuvé SEN"
        class="bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.campusTraining && !isApprovedCejef"
        icon="i-lucide-graduation-cap"
        label="Formation disponible"
      />
      <SoftwareFeatureBadge
        v-if="software.requiresEduAccount && software.certificationLevel === 1"
        icon="i-lucide-at-sign"
        label="Compte @edu.jura.ch"
        class="bg-blue-700 text-white dark:bg-blue-700 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.requiresParentalConsent"
        icon="i-lucide-signature"
        label="< 16 ans : accord parents"
        class="bg-orange-500 text-white dark:bg-orange-500 dark:text-white border-none"
      />
    </div>
  </NuxtLink>
</template>
