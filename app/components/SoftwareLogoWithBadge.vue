<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig, getCertificationIcon } from "~/utils/certification"
import { getSoftwareIcon } from "~/utils/software-icon"

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
      <UIcon
        :name="getSoftwareIcon(software)"
        class="text-gray-600 dark:text-gray-300"
        :class="sizeClasses.icon"
      />
    </div>

    <!-- Certification Badge (Floating Top Right of Logo) -->
    <div
      class="absolute flex items-center justify-center rounded-full shadow-sm ring-2 transition-colors duration-500 z-20"
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
