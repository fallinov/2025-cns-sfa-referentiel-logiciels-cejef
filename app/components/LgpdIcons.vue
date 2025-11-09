<script setup lang="ts">
import type { LgpdClassification } from '~/types/software'

interface Props {
  lgpd: LgpdClassification
  showLabels?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLabels: false
})

// Mappage des icônes pour chaque critère LGPD
const getHostingIcon = (hosting: string) => {
  const icons: Record<string, string> = {
    CH: 'i-lucide-home',
    UE: 'i-lucide-building-2',
    'Hors-UE': 'i-lucide-globe',
    CEJEF: 'i-lucide-school',
    Chine: 'i-lucide-map-pin'
  }
  return icons[hosting] || 'i-lucide-help-circle'
}

const getHostingColor = (hosting: string) => {
  const colors: Record<string, string> = {
    CH: 'text-green-600 dark:text-green-400',
    UE: 'text-blue-600 dark:text-blue-400',
    'Hors-UE': 'text-orange-600 dark:text-orange-400',
    CEJEF: 'text-green-700 dark:text-green-500',
    Chine: 'text-red-600 dark:text-red-400'
  }
  return colors[hosting] || 'text-gray-600'
}

const getPersonalDataIcon = (data: string) => {
  const icons: Record<string, string> = {
    Autorisées: 'i-lucide-user-check',
    Anonymisé: 'i-lucide-user-x',
    Interdites: 'i-lucide-user-round-x'
  }
  return icons[data] || 'i-lucide-help-circle'
}

const getPersonalDataColor = (data: string) => {
  const colors: Record<string, string> = {
    Autorisées: 'text-green-600 dark:text-green-400',
    Anonymisé: 'text-orange-600 dark:text-orange-400',
    Interdites: 'text-red-600 dark:text-red-400'
  }
  return colors[data] || 'text-gray-600'
}

const getRgpdIcon = (rgpd: string) => {
  const icons: Record<string, string> = {
    Conforme: 'i-lucide-shield-check',
    Partiel: 'i-lucide-shield-alert',
    'Non conforme': 'i-lucide-shield-x'
  }
  return icons[rgpd] || 'i-lucide-help-circle'
}

const getRgpdColor = (rgpd: string) => {
  const colors: Record<string, string> = {
    Conforme: 'text-green-600 dark:text-green-400',
    Partiel: 'text-orange-600 dark:text-orange-400',
    'Non conforme': 'text-red-600 dark:text-red-400'
  }
  return colors[rgpd] || 'text-gray-600'
}

const getDataCollectionIcon = (collection: string) => {
  const icons: Record<string, string> = {
    Limitée: 'i-lucide-bar-chart-2',
    Modérée: 'i-lucide-bar-chart-3',
    Extensive: 'i-lucide-bar-chart-4'
  }
  return icons[collection] || 'i-lucide-help-circle'
}

const getDataCollectionColor = (collection: string) => {
  const colors: Record<string, string> = {
    Limitée: 'text-green-600 dark:text-green-400',
    Modérée: 'text-orange-600 dark:text-orange-400',
    Extensive: 'text-red-600 dark:text-red-400'
  }
  return colors[collection] || 'text-gray-600'
}
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <!-- Hébergement -->
    <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <UIcon
        :name="getHostingIcon(lgpd.hosting)"
        :class="getHostingColor(lgpd.hosting)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div v-if="showLabels" class="text-xs text-gray-500 dark:text-gray-400">Hébergement</div>
        <div class="text-sm font-medium truncate">{{ lgpd.hosting }}</div>
      </div>
    </div>

    <!-- Données personnelles -->
    <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <UIcon
        :name="getPersonalDataIcon(lgpd.personalData)"
        :class="getPersonalDataColor(lgpd.personalData)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div v-if="showLabels" class="text-xs text-gray-500 dark:text-gray-400">Données perso.</div>
        <div class="text-sm font-medium truncate">{{ lgpd.personalData }}</div>
      </div>
    </div>

    <!-- RGPD -->
    <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <UIcon
        :name="getRgpdIcon(lgpd.rgpd)"
        :class="getRgpdColor(lgpd.rgpd)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div v-if="showLabels" class="text-xs text-gray-500 dark:text-gray-400">RGPD</div>
        <div class="text-sm font-medium truncate">{{ lgpd.rgpd }}</div>
      </div>
    </div>

    <!-- Collecte de données -->
    <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <UIcon
        :name="getDataCollectionIcon(lgpd.dataCollection)"
        :class="getDataCollectionColor(lgpd.dataCollection)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div v-if="showLabels" class="text-xs text-gray-500 dark:text-gray-400">Collecte</div>
        <div class="text-sm font-medium truncate">{{ lgpd.dataCollection }}</div>
      </div>
    </div>
  </div>
</template>
