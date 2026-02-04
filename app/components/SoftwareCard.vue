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
    <UTooltip :text="`Certification LGPD: ${config.label}`">
      <div
        class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md ring-2 transition-colors duration-500 z-20"
        :class="[config.solidBg, config.ringSolid]"
      >
        <UIcon
          :name="getCertificationIcon(software.certificationLevel)"
          class="w-7 h-7 text-white stroke-[3]"
        />
      </div>
    </UTooltip>

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
        class="bg-emerald-600 text-white dark:bg-emerald-600 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.personalData"
        icon="i-lucide-user-check"
        label="Données élèves"
      />
      <SoftwareFeatureBadge
        v-if="software.supportedByCEJEF && !isApprovedCejef"
        icon="i-lucide-headset"
        label="Support CEJEF"
      />
      <SoftwareFeatureBadge
        v-if="software.campusTraining && !isApprovedCejef"
        icon="i-lucide-graduation-cap"
        label="Formation"
      />
    </div>
  </NuxtLink>
</template>
