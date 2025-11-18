<script setup lang="ts">
import type { LgpdClassification } from "~~/types/software"
import {
  getLevelTextColor,
  getLevelBgColor,
  getLevelIcon,
  getLevelLabel
} from "~/utils/level-colors"

interface Props {
  lgpd: LgpdClassification
  showLabels?: boolean
}

withDefaults(defineProps<Props>(), {
  showLabels: false
})

// Labels détaillés pour chaque critère
const CRITERION_LABELS = {
  hosting: "Hébergement",
  rgpd: "RGPD",
  dataCollection: "Collecte"
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <!-- Hébergement -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getLevelBgColor(lgpd.hosting)"
    >
      <UIcon
        :name="getLevelIcon(lgpd.hosting)"
        :class="getLevelTextColor(lgpd.hosting)"
        class="w-5 h-5 shrink-0"
      />
      <div v-if="showLabels" class="flex-1 min-w-0">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ CRITERION_LABELS.hosting }}
        </div>
        <div class="text-sm font-medium truncate">
          {{ getLevelLabel(lgpd.hosting) }}
        </div>
      </div>
    </div>

    <!-- RGPD -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getLevelBgColor(lgpd.rgpd)"
    >
      <UIcon
        :name="getLevelIcon(lgpd.rgpd)"
        :class="getLevelTextColor(lgpd.rgpd)"
        class="w-5 h-5 shrink-0"
      />
      <div v-if="showLabels" class="flex-1 min-w-0">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ CRITERION_LABELS.rgpd }}
        </div>
        <div class="text-sm font-medium truncate">
          {{ getLevelLabel(lgpd.rgpd) }}
        </div>
      </div>
    </div>

    <!-- Collecte de données -->
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="getLevelBgColor(lgpd.dataCollection)"
    >
      <UIcon
        :name="getLevelIcon(lgpd.dataCollection)"
        :class="getLevelTextColor(lgpd.dataCollection)"
        class="w-5 h-5 shrink-0"
      />
      <div v-if="showLabels" class="flex-1 min-w-0">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ CRITERION_LABELS.dataCollection }}
        </div>
        <div class="text-sm font-medium truncate">
          {{ getLevelLabel(lgpd.dataCollection) }}
        </div>
      </div>
    </div>
  </div>
</template>
