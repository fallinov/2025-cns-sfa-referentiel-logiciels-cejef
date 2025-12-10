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
</script>

<template>
  <UBadge
    variant="liquid"
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
