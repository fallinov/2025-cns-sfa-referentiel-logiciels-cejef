<script setup lang="ts">
import type { Software } from "~~/types/software"
import type { CertificationConfig } from "~/utils/certification"

interface Props {
  software: Software
  config: CertificationConfig
}

defineProps<Props>()

// Helper pour les initiales
const getInitials = (name: string) => name.substring(0, 2).toUpperCase()
</script>

<template>
  <div class="flex flex-col sm:flex-row items-start gap-6 mb-8">
    <!-- Logo/Icon -->
    <div class="flex-shrink-0">
      <div class="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
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
        />
        <span
          v-else
          class="text-5xl sm:text-6xl font-black"
        >
          {{ getInitials(software.name) }}
        </span>
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <!-- Certification Badge -->
      <div class="mb-4">
        <UBadge
          :color="config.color"
          variant="soft"
          size="lg"
        >
          <template #leading>
            <CertificationBadge :level="software.certificationLevel" size="md" />
          </template>
          {{ config.label }}
        </UBadge>
      </div>

      <!-- Title and Info -->
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ software.name }}
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        {{ software.shortDescription }}
      </p>
    </div>
  </div>
</template>
