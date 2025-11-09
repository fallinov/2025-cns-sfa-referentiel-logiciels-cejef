<script setup lang="ts">
import type { CertificationLevel } from '~/types/software'

interface Props {
  level: CertificationLevel
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

// Configuration par niveau de certification
const certificationConfig = {
  1: {
    color: 'green',
    bgClass: 'bg-green-100 dark:bg-green-900/30 border-green-500',
    textClass: 'text-green-700 dark:text-green-300',
    iconClass: 'text-green-600 dark:text-green-400',
    label: 'Logiciel certifié et validé, compatible CEJEF',
    shortLabel: 'Certifié CEJEF',
    icon: 'i-lucide-circle-check-big'
  },
  2: {
    color: 'orange',
    bgClass: 'bg-orange-100 dark:bg-orange-900/30 border-orange-500',
    textClass: 'text-orange-700 dark:text-orange-300',
    iconClass: 'text-orange-600 dark:text-orange-400',
    label: 'Attention : les apprentis ne peuvent pas entrer de données personnelles (création de compte, nom, prénom)',
    shortLabel: 'Attention',
    icon: 'i-lucide-triangle-alert'
  },
  3: {
    color: 'red',
    bgClass: 'bg-red-100 dark:bg-red-900/30 border-red-500',
    textClass: 'text-red-700 dark:text-red-300',
    iconClass: 'text-red-600 dark:text-red-400',
    label: 'CEJEF interdit l\'utilisation de ce logiciel avec les élèves',
    shortLabel: 'Interdit',
    icon: 'i-lucide-circle-x'
  }
}

const config = certificationConfig[props.level]
</script>

<template>
  <UBadge
    :class="config.bgClass + ' ' + config.textClass"
    :icon="config.icon"
    size="md"

    variant="solid"
  >
    {{ compact ? config.shortLabel : config.label }}
  </UBadge>
</template>
