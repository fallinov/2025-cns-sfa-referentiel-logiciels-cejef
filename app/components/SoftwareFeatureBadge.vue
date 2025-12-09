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
</script>

<template>
  <UBadge
    color="neutral"
    variant="soft"
    :ui="{ base: 'rounded-[var(--ui-radius)]' }"
    :aria-label="label"
  >
    <template #leading>
      <UIcon :name="icon" :class="iconSize" aria-hidden="true" />
    </template>
    <span v-if="!hideLabel">{{ label }}</span>
  </UBadge>
</template>
