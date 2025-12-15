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
        class="absolute -top-1.5 -left-1.5 w-6 h-6 flex items-center justify-center rounded-full shadow-sm ring-1 transition-colors duration-500 z-20"
        :class="[config.solidBg, config.ringSolid]"
      >
        <UIcon
          :name="getCertificationIcon(software.certificationLevel)"
          class="w-3.5 h-3.5 text-white"
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
      <!-- Coup de coeur -->
      <div v-if="software.cejefFavorite" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-heart"
          label="Coup de coeur"
          size="sm"
          hide-label
          class="lg:hidden bg-red-600 text-white dark:bg-red-600 dark:text-white border-none"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-heart"
          label="Coup de coeur"
          size="sm"
          class="hidden lg:inline-flex bg-red-600 text-white dark:bg-red-600 dark:text-white border-none"
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

      <!-- Support CEJEF - Icon only on sm-md, with label on lg+ -->
      <div v-if="software.supportedByCEJEF" class="inline-flex">
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

      <!-- Training Available - Icon only on sm-md, with label on lg+ -->
      <div v-if="software.campusTraining" class="inline-flex">
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

      <!-- 100% Free - Icon only on sm-md, with label on lg+ -->
      <div v-if="software.cost === 'Gratuit'" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-coins"
          label="100% gratuit"
          size="sm"
          hide-label
          class="lg:hidden"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-coins"
          label="100% gratuit"
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
