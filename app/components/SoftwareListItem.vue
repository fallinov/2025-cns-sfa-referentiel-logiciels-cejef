<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig, getCertificationIcon } from "~/utils/certification"

const props = defineProps<{
  software: Software
}>()

const config = computed(() => getCertificationConfig(props.software.certificationLevel))
</script>

<template>
  <NuxtLink
    :to="`/logiciels/${software.id}`"
    class="group relative flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
  >


    <!-- Logo/Icon -->
    <div class="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
      <img
        v-if="software.logo"
        :src="`/logos/${software.logo}.svg`"
        :alt="`${software.name} logo`"
        class="w-full h-full object-contain"
      />
      <UIcon
        v-else-if="software.icon"
        :name="software.icon"
        class="w-full h-full transition-colors duration-500 text-gray-900 dark:text-white"
      />
      <span
        v-else
        class="text-lg font-black transition-colors duration-500 text-gray-900 dark:text-white"
      >
        {{ software.name.substring(0, 2).toUpperCase() }}
      </span>

      <!-- Certification Badge (Floating Top Left of Logo) -->
      <div
        class="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full shadow-sm ring-2 transition-colors duration-500 z-20"
        :class="[config.solidBg, config.ringSolid]"
      >
        <UIcon
          :name="getCertificationIcon(software.certificationLevel)"
          class="w-6 h-6 text-white"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2 mb-0.5">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {{ software.name }}
        </h3>
      </div>
      <p class="text-base text-gray-600 dark:text-gray-300 truncate">
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Meta / Badges -->
    <div class="hidden sm:flex items-center gap-2">
      <!-- Student Data Allowed -->
      <span
        v-if="software.personalData"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200"
      >
        <UIcon name="i-lucide-user-check" class="w-3.5 h-3.5" />
        <span class="hidden lg:inline">Données élèves</span>
      </span>

      <!-- Support CEJEF -->
      <span
        v-if="software.supportedByCEJEF"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200"
      >
        <UIcon name="i-lucide-headset" class="w-3.5 h-3.5" />
        <span class="hidden lg:inline">Support CEJEF</span>
      </span>

      <!-- Training Available -->
      <span
        v-if="software.campusTraining"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200"
      >
        <UIcon name="i-lucide-graduation-cap" class="w-3.5 h-3.5" />
        <span class="hidden lg:inline">Formation</span>
      </span>

      <!-- 100% Free -->
      <span
        v-if="software.cost === 'Gratuit'"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200"
      >
        <UIcon name="i-lucide-coins" class="w-3.5 h-3.5" />
        <span class="hidden lg:inline">100% gratuit</span>
      </span>
    </div>

    <!-- Chevron indicator -->
    <UIcon
      name="i-lucide-chevron-right"
      class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
    />
  </NuxtLink>
</template>
