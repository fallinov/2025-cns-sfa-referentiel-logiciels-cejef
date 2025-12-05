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
  <UPageCard
    as="NuxtLink"
    :to="`/logiciels/${software.id}`"
    spotlight
    :spotlight-color="config.color"
    class="relative overflow-hidden [&>div]:!p-4"
  >
    <!-- Certification badge overlay (top right corner) -->
    <div class="absolute top-2 right-2 z-20 pointer-events-none">
      <CertificationBadge :level="software.certificationLevel" size="2xl" />
    </div>

    <!-- Logo and Content Container -->
    <div class="flex gap-4 mb-4 relative z-10 pointer-events-none">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <div class="w-12 h-12 flex items-center justify-center">
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
            class="text-xl font-black"
          >
            {{ software.name.substring(0, 2).toUpperCase() }}
          </span>
        </div>
      </div>

      <!-- Title and Description -->
      <div class="flex-1 min-w-0 space-y-2">
        <h3 class="text-2xl font-bold">
          {{ software.name }}
        </h3>

        <p v-if="!compact" class="text-base text-slate-900 dark:text-slate-100">
          {{ software.shortDescription }}
        </p>
      </div>
    </div>

    <!-- Filter badges at bottom -->
    <div class="flex flex-wrap gap-2 mt-auto relative z-10 pointer-events-none">
      <!-- Cost Badge -->
      <UBadge variant="outline" color="neutral" :size="compact ? 'sm' : 'md'">
        <template #leading>
          <UIcon :class="compact ? 'w-4 h-4' : 'w-5 h-5'" name="i-lucide-wallet" />
        </template>
        {{ software.cost }}
      </UBadge>

      <!-- Support CEJEF Badge -->
      <UBadge
        v-if="software.supportedByCEJEF"
        variant="outline"
        color="neutral"
        :size="compact ? 'sm' : 'md'"
      >
        <template #leading>
          <UIcon :class="compact ? 'w-4 h-4' : 'w-5 h-5'" name="i-lucide-headphones" />
        </template>
        Support
      </UBadge>

      <!-- Training Badge -->
      <UBadge
        v-if="software.campusTraining"
        variant="outline"
        color="neutral"
        :size="compact ? 'sm' : 'md'"
      >
        <template #leading>
          <UIcon :class="compact ? 'w-4 h-4' : 'w-5 h-5'" name="i-lucide-graduation-cap" />
        </template>
        Formation
      </UBadge>
    </div>
  </UPageCard>
</template>
