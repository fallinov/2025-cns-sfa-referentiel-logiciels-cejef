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
</script>

<template>
  <NuxtLink
    :to="`/logiciels/${software.id}`"
    class="group relative w-full overflow-hidden bg-white dark:bg-gray-800 rounded-[10px] shadow-md hover:shadow-xl hover:scale-[1.05] transition-all duration-[700ms] ease-in-out p-6 flex flex-col items-start gap-6 isolate"
  >
    <!-- Expanding Background Circle -->
    <!-- Positioned top-right to mimic the reference 'number' blob -->
    <div
      class="absolute -top-12 -right-12 w-32 h-32 rounded-full transition-transform duration-[700ms] ease-in-out group-hover:scale-[25] -z-10"
      :class="config.solidBg"
    ></div>

    <!-- Certification Icon (Fixed in corner) -->
    <div class="absolute top-5 right-5 z-20">
      <UIcon
        :name="config.icon"
        class="w-6 h-6 text-white transition-all duration-[700ms]"
      />
    </div>

    <!-- Logo -->
    <div class="relative z-10 w-12 h-12 transition-colors duration-[700ms]">
      <img
        v-if="software.logo"
        :src="`/logos/${software.logo}.svg`"
        :alt="`${software.name} logo`"
        class="w-full h-full object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-[700ms]"
      />
      <UIcon
        v-else-if="software.icon"
        :name="software.icon"
        class="w-full h-full group-hover:text-white transition-colors duration-[700ms]"
        :class="config.text"
      />
      <span
        v-else
        class="text-xl font-black group-hover:text-white transition-colors duration-[700ms]"
        :class="config.text"
      >
        {{ software.name.substring(0, 2).toUpperCase() }}
      </span>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex-1 w-full">
      <h3 class="text-xl font-extrabold mb-3 leading-[1.1] text-gray-900 dark:text-white group-hover:text-white transition-colors duration-500">
        {{ software.name }}
      </h3>

      <p
        v-if="!compact"
        class="text-base leading-relaxed text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors duration-500 line-clamp-3"
      >
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Badges (Quick Filters only) -->
    <div class="relative z-10 mt-auto flex flex-wrap gap-2">
      <!-- Student Data Allowed -->
      <span
        v-if="software.personalData"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium border transition-colors duration-500 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 group-hover:border-white/30 group-hover:text-white"
      >
        <UIcon name="i-lucide-user-check" class="w-3.5 h-3.5" />
        Données élèves
      </span>

      <!-- Support CEJEF -->
      <span
        v-if="software.supportedByCEJEF"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium border transition-colors duration-500 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 group-hover:border-white/30 group-hover:text-white"
      >
        <UIcon name="i-lucide-headset" class="w-3.5 h-3.5" />
        Support CEJEF
      </span>

      <!-- Training Available -->
      <span
        v-if="software.campusTraining"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium border transition-colors duration-500 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 group-hover:border-white/30 group-hover:text-white"
      >
        <UIcon name="i-lucide-graduation-cap" class="w-3.5 h-3.5" />
        Formation
      </span>

      <!-- 100% Free -->
      <span
        v-if="software.cost === 'Gratuit'"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium border transition-colors duration-500 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 group-hover:border-white/30 group-hover:text-white"
      >
        <UIcon name="i-lucide-coins" class="w-3.5 h-3.5" />
        100% gratuit
      </span>
    </div>
  </NuxtLink>
</template>
