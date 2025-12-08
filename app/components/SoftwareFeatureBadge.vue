<script setup lang="ts">
/**
 * Badge réutilisable pour afficher les features d'un logiciel
 * (Données élèves, Support CEJEF, Formation, Gratuit, etc.)
 *
 * Utilisé dans SoftwareCard et SoftwareListItem pour éviter la duplication
 */

interface Props {
  icon: string
  label: string
  size?: "sm" | "md"
  hideLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  hideLabel: false
})

const iconSize = computed(() => props.size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4")
const badgeUi = {
  root: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] text-sm font-medium bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200",
  label: "text-sm font-medium"
}
</script>

<template>
  <span
    :class="badgeUi.root"
    :aria-label="label"
  >
    <UIcon :name="icon" :class="iconSize" aria-hidden="true" />
    <span v-if="!hideLabel" :class="badgeUi.label">{{ label }}</span>
  </span>
</template>
