<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig, getCertificationIcon } from "~/utils/certification"

interface Props {
  software: Software
  size?: "sm" | "md"
}

const props = withDefaults(defineProps<Props>(), {
  size: "md"
})

const config = computed(() => getCertificationConfig(props.software.certificationLevel))

const sizeClasses = computed(() => {
  return props.size === "sm"
    ? {
        container: "w-12 h-12",
        icon: "w-12 h-12",
        badge: "w-6 h-6 -top-1 -right-1",
        badgeIcon: "w-4 h-4"
      }
    : {
        container: "w-12 h-12",
        icon: "w-12 h-12",
        badge: "w-6 h-6 -top-1.5 -right-1.5",
        badgeIcon: "w-4 h-4"
      }
})
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center justify-center shrink-0"
      :class="sizeClasses.container"
    >
      <img
        v-if="software.logo"
        :src="`/logos/${software.logo}.svg`"
        :alt="`${software.name} logo`"
        class="object-contain"
        :class="sizeClasses.icon"
      />
      <UIcon
        v-else-if="software.icon"
        :name="software.icon"
        class="text-gray-900 dark:text-white"
        :class="sizeClasses.icon"
      />
      <span
        v-else
        class="text-lg font-black text-gray-900 dark:text-white"
      >
        {{ software.name.substring(0, 2).toUpperCase() }}
      </span>
    </div>

    <!-- Certification Badge (Floating Top Right of Logo) -->
    <div
      class="absolute flex items-center justify-center rounded-full shadow-md ring-2 transition-colors duration-500 z-20"
      :class="[sizeClasses.badge, config.solidBg, config.ringSolid]"
    >
      <UIcon
        :name="getCertificationIcon(software.certificationLevel)"
        class="text-white stroke-[3]"
        :class="sizeClasses.badgeIcon"
      />
    </div>
  </div>
</template>
