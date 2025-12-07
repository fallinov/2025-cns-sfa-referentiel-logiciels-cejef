<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig } from "~/utils/certification"

interface Props {
  software: Software
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

const config = computed(() => {
  return getCertificationConfig(props.software.certificationLevel)
})
const handleCardClick = () => {
  if (import.meta.client) {
    const url = new URL(window.location.href)
    url.hash = `software-${props.software.id}`
    window.history.replaceState(window.history.state, '', url.href)
  }
}
</script>

<template>
  <NuxtLink
    :id="`software-${software.id}`"
    :to="`/logiciels/${software.id}`"
    class="group relative w-full h-full overflow-hidden bg-white dark:bg-gray-800 border-2 border-[#1C293C] dark:border-gray-700 rounded-[var(--ui-radius)] shadow-sm hover:shadow-xl hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary-500 transition-all duration-300 ease-out p-6 flex flex-col items-start gap-4 isolate"
    @click="handleCardClick"
  >


    <!-- Certification Badge (Icon + Label) -->
    <div class="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm">
      <UIcon
        :name="config.icon"
        class="w-5 h-5"
        :class="[
          software.certificationLevel === 1 ? 'text-green-600 dark:text-green-400' :
          software.certificationLevel === 2 ? 'text-orange-600 dark:text-orange-400' :
          software.certificationLevel === 3 ? 'text-red-600 dark:text-red-400' :
          'text-gray-500'
        ]"
        aria-hidden="true"
      />
      <span class="text-sm font-bold uppercase tracking-wider"
        :class="[
          software.certificationLevel === 1 ? 'text-green-700 dark:text-green-300' :
          software.certificationLevel === 2 ? 'text-orange-700 dark:text-orange-300' :
          software.certificationLevel === 3 ? 'text-red-700 dark:text-red-300' :
          'text-gray-600 dark:text-gray-300'
        ]"
      >
        {{ config.label }}
      </span>
    </div>

    <!-- Logo -->
    <div class="relative z-10 w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110">
      <img
        v-if="software.logo"
        :src="`/logos/${software.logo}.svg`"
        :alt="`${software.name} logo`"
        class="w-full h-full object-contain"
      />
      <UIcon
        v-else-if="software.icon"
        :name="software.icon"
        class="w-full h-full"
        :class="config.text"
        aria-hidden="true"
      />
      <span
        v-else
        class="text-xl font-black"
        :class="config.text"
      >
        {{ software.name.substring(0, 2).toUpperCase() }}
      </span>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex-1 w-full">
      <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ software.name }}
      </h3>

      <p
        v-if="!compact"
        class="text-base leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3"
      >
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Badges (Quick Filters only) -->
    <div class="relative z-10 mt-auto flex flex-wrap gap-2 pt-2">
      <!-- Student Data Allowed -->
      <span
        v-if="software.personalData"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium border-2 border-[#1C293C] dark:border-gray-700 text-gray-700 dark:text-gray-200"
        aria-label="Données élèves autorisées"
      >
        <UIcon name="i-lucide-user-check" class="w-4 h-4" aria-hidden="true" />
        Données élèves
      </span>

      <!-- Support CEJEF -->
      <span
        v-if="software.supportedByCEJEF"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium border-2 border-[#1C293C] dark:border-gray-700 text-gray-700 dark:text-gray-200"
        aria-label="Support assuré par le CEJEF"
      >
        <UIcon name="i-lucide-headset" class="w-4 h-4" aria-hidden="true" />
        Support CEJEF
      </span>

      <!-- Training Available -->
      <span
        v-if="software.campusTraining"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium border-2 border-[#1C293C] dark:border-gray-700 text-gray-700 dark:text-gray-200"
        aria-label="Formation disponible"
      >
        <UIcon name="i-lucide-graduation-cap" class="w-4 h-4" aria-hidden="true" />
        Formation
      </span>

      <!-- 100% Free -->
      <span
        v-if="software.cost === 'Gratuit'"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium border-2 border-[#1C293C] dark:border-gray-700 text-gray-700 dark:text-gray-200"
        aria-label="Logiciel gratuit"
      >
        <UIcon name="i-lucide-coins" class="w-4 h-4" aria-hidden="true" />
        Gratuit
      </span>
    </div>
  </NuxtLink>
</template>
