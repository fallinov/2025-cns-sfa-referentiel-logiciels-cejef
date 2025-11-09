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
  personalData: 'i-lucide-user', // Utilisateur pour les données personnelles
  rgpd: 'i-lucide-shield', // Bouclier pour la conformité RGPD
  dataCollection: 'i-lucide-database' // Base de données pour la collecte
}

// Système de couleurs simplifié : 3 couleurs par critère (vert, orange, rouge)
// Vert = Bon/Sécurisé, Orange = Moyen/Attention, Rouge = Risqué/Dangereux

const getHostingColor = (hosting: string) => {
  const colors: Record<string, string> = {
    'CH': 'text-green-600 dark:text-green-400', // Suisse = vert
    'UE': 'text-green-600 dark:text-green-400', // UE = vert
    'CEJEF': 'text-green-600 dark:text-green-400', // CEJEF = vert
    'Hors-UE': 'text-orange-600 dark:text-orange-400', // Hors UE = orange
    'Chine': 'text-red-600 dark:text-red-400' // Chine = rouge
  }
  return colors[hosting] || 'text-gray-600'
}

const getPersonalDataColor = (data: string) => {
  const colors: Record<string, string> = {
    Autorisées: 'text-green-600 dark:text-green-400', // Autorisées = vert
    Anonymisé: 'text-green-600 dark:text-green-400', // Anonymisé = vert (même meilleur)
    Interdites: 'text-red-600 dark:text-red-400' // Interdites = rouge
  }
  return colors[data] || 'text-gray-600'
}

const getRgpdColor = (rgpd: string) => {
  const colors: Record<string, string> = {
    'Conforme': 'text-green-600 dark:text-green-400', // Conforme = vert
    'Partiel': 'text-orange-600 dark:text-orange-400', // Partiel = orange
    'Non conforme': 'text-red-600 dark:text-red-400' // Non conforme = rouge
  }
  return colors[rgpd] || 'text-gray-600'
}

const getDataCollectionColor = (collection: string) => {
  const colors: Record<string, string> = {
    Limitée: 'text-green-600 dark:text-green-400', // Limitée = vert
    Modérée: 'text-orange-600 dark:text-orange-400', // Modérée = orange
    Extensive: 'text-red-600 dark:text-red-400' // Extensive = rouge
  }
  return colors[collection] || 'text-gray-600'
}

// Couleurs de fond (version light de la couleur de l'icône)
const getHostingBgColor = (hosting: string) => {
  const colors: Record<string, string> = {
    'CH': 'bg-green-50 dark:bg-green-950/30',
    'UE': 'bg-green-50 dark:bg-green-950/30',
    'CEJEF': 'bg-green-50 dark:bg-green-950/30',
    'Hors-UE': 'bg-orange-50 dark:bg-orange-950/30',
    'Chine': 'bg-red-50 dark:bg-red-950/30'
  }
  return colors[hosting] || 'bg-gray-50 dark:bg-gray-800/50'
}

const getPersonalDataBgColor = (data: string) => {
  const colors: Record<string, string> = {
    Autorisées: 'bg-green-50 dark:bg-green-950/30',
    Anonymisé: 'bg-green-50 dark:bg-green-950/30',
    Interdites: 'bg-red-50 dark:bg-red-950/30'
  }
  return colors[data] || 'bg-gray-50 dark:bg-gray-800/50'
}

const getRgpdBgColor = (rgpd: string) => {
  const colors: Record<string, string> = {
    'Conforme': 'bg-green-50 dark:bg-green-950/30',
    'Partiel': 'bg-orange-50 dark:bg-orange-950/30',
    'Non conforme': 'bg-red-50 dark:bg-red-950/30'
  }
  return colors[rgpd] || 'bg-gray-50 dark:bg-gray-800/50'
}

const getDataCollectionBgColor = (collection: string) => {
  const colors: Record<string, string> = {
    Limitée: 'bg-green-50 dark:bg-green-950/30',
    Modérée: 'bg-orange-50 dark:bg-orange-950/30',
    Extensive: 'bg-red-50 dark:bg-red-950/30'
  }
  return colors[collection] || 'bg-gray-50 dark:bg-gray-800/50'
}
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <!-- Hébergement -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getHostingBgColor(lgpd.hosting)"
    >
      <UIcon
        :name="ICONS.hosting"
        :class="getHostingColor(lgpd.hosting)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div
          v-if="showLabels"
          class="text-xs text-gray-500 dark:text-gray-400"
        >
          Hébergement
        </div>
        <div class="text-sm font-medium truncate">
          {{ lgpd.hosting }}
        </div>
      </div>
    </div>

    <!-- Données personnelles -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getPersonalDataBgColor(lgpd.personalData)"
    >
      <UIcon
        :name="ICONS.personalData"
        :class="getPersonalDataColor(lgpd.personalData)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div
          v-if="showLabels"
          class="text-xs text-gray-500 dark:text-gray-400"
        >
          Données perso.
        </div>
        <div class="text-sm font-medium truncate">
          {{ lgpd.personalData }}
        </div>
      </div>
    </div>

    <!-- RGPD -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getRgpdBgColor(lgpd.rgpd)"
    >
      <UIcon
        :name="ICONS.rgpd"
        :class="getRgpdColor(lgpd.rgpd)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div
          v-if="showLabels"
          class="text-xs text-gray-500 dark:text-gray-400"
        >
          RGPD
        </div>
        <div class="text-sm font-medium truncate">
          {{ lgpd.rgpd }}
        </div>
      </div>
    </div>

    <!-- Collecte de données -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getDataCollectionBgColor(lgpd.dataCollection)"
    >
      <UIcon
        :name="ICONS.dataCollection"
        :class="getDataCollectionColor(lgpd.dataCollection)"
        class="w-5 h-5 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div
          v-if="showLabels"
          class="text-xs text-gray-500 dark:text-gray-400"
        >
          Collecte
        </div>
        <div class="text-sm font-medium truncate">
          {{ lgpd.dataCollection }}
        </div>
      </div>
    </div>
  </div>
</template>
