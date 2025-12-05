<script setup lang="ts">
interface Props {
  level: number | null | undefined
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
}

const props = withDefaults(defineProps<Props>(), {
  size: "md"
})

const badgeConfig = computed(() => {
  switch (props.level) {
    case 1:
      return {
        src: "/logos/cejef-badge-valide.svg",
        alt: "Badge Validé"
      }
    case 2:
      return {
        src: "/logos/cejef-badge-restreint.svg",
        alt: "Badge Restreint"
      }
    case 3:
      return {
        src: "/logos/cejef-badge-interdit.svg",
        alt: "Badge Interdit"
      }
    default:
      return null
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-4 h-4"
    case "md":
      return "w-5 h-5"
    case "lg":
      return "w-6 h-6"
    case "xl":
      return "w-8 h-8"
    case "2xl":
      return "w-12 h-12"
    default:
      return "w-5 h-5"
  }
})
</script>

<template>
  <img
    v-if="badgeConfig"
    :src="badgeConfig.src"
    :alt="badgeConfig.alt"
    :class="['inline-block', sizeClasses]"
  />
  <UIcon
    v-else
    name="i-lucide-help-circle"
    :class="sizeClasses"
  />
</template>
