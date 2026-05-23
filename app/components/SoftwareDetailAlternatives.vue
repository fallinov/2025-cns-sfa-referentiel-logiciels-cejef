<script setup lang="ts">
import type { Software } from "~~/types/software"

interface Props {
  alternatives: Software[]
}

defineProps<Props>()
</script>

<template>
  <UCard class="bg-white dark:bg-gray-800 shadow-sm rounded-[var(--ui-radius)]">
    <div class="flex items-center gap-3 mb-2">
      <UIcon name="i-lucide-sparkles" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
        Alternatives recommandées
      </h3>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
      Outils validés (niveau vert ou orange) à considérer en remplacement.
    </p>

    <div v-if="alternatives.length" class="space-y-2">
      <NuxtLink
        v-for="alt in alternatives"
        :key="alt.id"
        :to="`/logiciels/${alt.id}`"
        class="flex items-center gap-4 group p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
      >
        <SoftwareLogoWithBadge :software="alt" size="sm" />
        <div>
          <div class="font-semibold text-gray-900 dark:text-white transition-colors">
            {{ alt.name }}
          </div>
          <div class="text-xs text-gray-500 truncate max-w-[150px]">
            {{ alt.shortDescription }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <div
      v-else
      class="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-500 dark:text-gray-400"
    >
      Pas d'alternative validée pour ce logiciel.
    </div>
  </UCard>
</template>
