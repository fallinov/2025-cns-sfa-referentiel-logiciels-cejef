<script setup lang="ts">
import type { Software } from "~~/types/software"

const props = defineProps<{
  software: Software
}>()

// "Approuvé CEJEF" requires: level 1 (green) + supportedByCEJEF + campusTraining
const isApprovedCejef = computed(() => {
  return props.software.certificationLevel === 1
    && props.software.supportedByCEJEF
    && props.software.campusTraining
})
</script>

<template>
  <NuxtLink
    :to="`/logiciels/${software.id}`"
    class="group relative flex items-center gap-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
  >

    <!-- Logo/Icon with Badge -->
    <SoftwareLogoWithBadge :software="software" size="md" />

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
      <!-- Approuvé CEJEF (level 1 + supportedByCEJEF + campusTraining) -->
      <div v-if="isApprovedCejef" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-badge-check"
          label="Approuvé CEJEF"
          size="sm"
          hide-label
          class="lg:hidden bg-emerald-600 text-white dark:bg-emerald-600 dark:text-white border-none"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-badge-check"
          label="Approuvé CEJEF"
          size="sm"
          class="hidden lg:inline-flex bg-emerald-600 text-white dark:bg-emerald-600 dark:text-white border-none"
        />
      </div>

      <!-- Student Data Allowed - Icon only on sm-md, with label on lg+ -->
      <div v-if="software.personalData" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-user-check"
          label="Données élèves"
          size="sm"
          hide-label
          class="lg:hidden"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-user-check"
          label="Données élèves"
          size="sm"
          class="hidden lg:inline-flex"
        />
      </div>

      <!-- Support CEJEF - Icon only on sm-md, with label on lg+ (seulement si pas déjà Approuvé) -->
      <div v-if="software.supportedByCEJEF && !isApprovedCejef" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-headset"
          label="Support CEJEF"
          size="sm"
          hide-label
          class="lg:hidden"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-headset"
          label="Support CEJEF"
          size="sm"
          class="hidden lg:inline-flex"
        />
      </div>

      <!-- Training Available - Icon only on sm-md, with label on lg+ (seulement si pas déjà Approuvé) -->
      <div v-if="software.campusTraining && !isApprovedCejef" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-graduation-cap"
          label="Formation"
          size="sm"
          hide-label
          class="lg:hidden"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-graduation-cap"
          label="Formation"
          size="sm"
          class="hidden lg:inline-flex"
        />
      </div>
    </div>

    <!-- Chevron indicator -->
    <UIcon
      name="i-lucide-chevron-right"
      class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
    />
  </NuxtLink>
</template>
