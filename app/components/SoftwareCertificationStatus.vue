<script setup lang="ts">
import { getCertificationConfig } from "~/utils/certification"

interface Props {
  level: number | null | undefined
  size?: "sm" | "md"
}

const props = withDefaults(defineProps<Props>(), {
  size: "md"
})

const config = computed(() => getCertificationConfig(props.level))

// Liquid glass UI variant (avoiding TypeScript conflict with predefined variants)
const liquidBadgeUi = {
  root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
  label: "text-sm font-bold uppercase tracking-widest text-white"
}
</script>

<template>
  <UBadge
    :ui="liquidBadgeUi"
    :size="size"
  >
    <template #leading>
      <UIcon
        :name="config.icon"
        class="w-6 h-6"
        :class="config.text"
        aria-hidden="true"
      />
    </template>
    <span
      class="text-base font-medium"
      :class="config.text"
    >
      {{ config.label }}
    </span>
  </UBadge>
</template>
