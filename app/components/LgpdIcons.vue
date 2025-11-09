<script setup lang="ts">
import type { LgpdClassification } from '~/types/software'

interface Props {
  lgpd: LgpdClassification
  showLabels?: boolean
}

withDefaults(defineProps<Props>(), {
  showLabels: false
})

// Icônes fixes par groupe de critères LGPD (une seule icône par groupe)
const ICONS = {
  hosting: 'i-lucide-server', // Serveur pour l'hébergement
  rgpd: 'i-lucide-shield', // Bouclier pour la conformité RGPD
  dataCollection: 'i-lucide-database' // Base de données pour la collecte
}

// Système de couleurs : 1 = OK (vert), 2 = Danger (orange), 3 = Interdit (rouge)
const getColor = (value: 1 | 2 | 3) => {
  const colors: Record<number, string> = {
    1: 'text-green-600 dark:text-green-400', // OK = vert
    2: 'text-orange-600 dark:text-orange-400', // Danger = orange
    3: 'text-red-600 dark:text-red-400' // Interdit = rouge
  }
  return colors[value] || 'text-gray-600'
}

const getBgColor = (value: 1 | 2 | 3) => {
  const colors: Record<number, string> = {
    1: 'bg-green-50 dark:bg-green-950/30', // OK = vert
    2: 'bg-orange-50 dark:bg-orange-950/30', // Danger = orange
    3: 'bg-red-50 dark:bg-red-950/30' // Interdit = rouge
  }
  return colors[value] || 'bg-gray-50 dark:bg-gray-800/50'
}

// Labels pour les valeurs numériques
const getValueLabel = (value: 1 | 2 | 3) => {
  const labels: Record<number, string> = {
    1: 'OK',
    2: 'Attention',
    3: 'Interdit'
  }
  return labels[value] || 'N/A'
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <!-- Hébergement -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getBgColor(lgpd.hosting)"
    >
      <UIcon
        :name="ICONS.hosting"
        :class="getColor(lgpd.hosting)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div
        v-if="showLabels"
        class="flex-1 min-w-0"
      >
        <div class="text-xs text-gray-500 dark:text-gray-400">
          Hébergement
        </div>
        <div class="text-sm font-medium truncate">
          {{ getValueLabel(lgpd.hosting) }}
        </div>
      </div>
    </div>

    <!-- RGPD -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getBgColor(lgpd.rgpd)"
    >
      <UIcon
        :name="ICONS.rgpd"
        :class="getColor(lgpd.rgpd)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div
        v-if="showLabels"
        class="flex-1 min-w-0"
      >
        <div class="text-xs text-gray-500 dark:text-gray-400">
          RGPD
        </div>
        <div class="text-sm font-medium truncate">
          {{ getValueLabel(lgpd.rgpd) }}
        </div>
      </div>
    </div>

    <!-- Collecte de données -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getBgColor(lgpd.dataCollection)"
    >
      <UIcon
        :name="ICONS.dataCollection"
        :class="getColor(lgpd.dataCollection)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div
        v-if="showLabels"
        class="flex-1 min-w-0"
      >
        <div class="text-xs text-gray-500 dark:text-gray-400">
          Collecte
        </div>
        <div class="text-sm font-medium truncate">
          {{ getValueLabel(lgpd.dataCollection) }}
        </div>
      </div>
    </div>
  </div>
</template>
