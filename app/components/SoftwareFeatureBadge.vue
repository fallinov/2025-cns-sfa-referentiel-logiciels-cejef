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
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  hideLabel: false,
  tooltip: undefined
})

const iconSize = computed(() => props.size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4")
</script>

<template>
  <UTooltip v-if="tooltip" :text="tooltip">
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
  </UTooltip>
  <UBadge
    v-else
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
