<script setup lang="ts">
import type { CertificationLevel } from "~~/types/software"
import { getLevelColorName, getLevelBorderColor } from "~/utils/level-colors"

interface Props {
  level?: CertificationLevel | null
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

// Configuration par niveau de certification
const certificationConfig: Record<1 | 2 | 3, {
  label: string
  shortLabel: string
  icon: string
}> = {
  1: {
    label: "Logiciel certifié et validé, compatible CEJEF",
    shortLabel: "Certifié CEJEF",
    icon: "i-lucide-circle-check-big"
  },
  2: {
    label: "Attention : les apprentis ne peuvent pas entrer de données personnelles (création de compte, nom, prénom)",
    shortLabel: "Attention",
    icon: "i-lucide-triangle-alert"
  },
  3: {
    label: "CEJEF interdit l'utilisation de ce logiciel avec les élèves",
    shortLabel: "Interdit",
    icon: "i-lucide-circle-x"
  }
}

// Si level est null/undefined, config sera null et rien ne sera rendu
const config = props.level ? certificationConfig[props.level] : null
const color = props.level ? getLevelColorName(props.level) : undefined
const borderClass = props.level ? getLevelBorderColor(props.level) : ""
</script>

<template>
  <template v-if="config && color">
    <UBadge
      :color="color"
      :class="borderClass"
      :icon="config.icon"
      size="md"
      variant="soft"
    >
      {{ compact ? config.shortLabel : config.label }}
    </UBadge>
  </template>
</template>
