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
    shortLabel: 'Attention requise',
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
  <div
    class="rounded-lg border-2 p-3"
    :class="config.bgClass"
  >
    <div class="flex items-start gap-2">
      <UIcon
        :name="config.icon"
        :class="config.iconClass"
        class="w-5 h-5 flex-shrink-0 mt-0.5"
      />
      <div class="flex-1 min-w-0">
        <p
          class="text-sm font-medium leading-tight"
          :class="config.textClass"
        >
          {{ compact ? config.shortLabel : config.label }}
        </p>
      </div>
    </div>
  </div>
</template>
