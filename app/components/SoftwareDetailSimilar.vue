<script setup lang="ts">
import { getCertificationLevel, type Software } from "~~/types/software"

interface Props {
  similarSoftware: Software[]
}

const props = defineProps<Props>()

const sortedSimilarSoftware = computed(() => {
  return [...props.similarSoftware].sort((a, b) => {
    const levelA = a.certificationLevel ?? getCertificationLevel(a.lgpd) ?? 4
    const levelB = b.certificationLevel ?? getCertificationLevel(b.lgpd) ?? 4
    return levelA - levelB
  })
})
</script>

<template>
  <UCard v-if="sortedSimilarSoftware.length" class="bg-white dark:bg-gray-800 shadow-sm rounded-[var(--ui-radius)]">
    <div class="flex items-center gap-3 mb-6">
      <UIcon name="i-lucide-sparkles" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
        Logiciels similaires
      </h3>
    </div>

    <div class="space-y-2">
      <NuxtLink
        v-for="sim in sortedSimilarSoftware"
        :key="sim.id"
        :to="`/logiciels/${sim.id}`"
        class="flex items-center gap-4 group p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <SoftwareLogoWithBadge :software="sim" size="sm" />
        <div>
          <div class="font-semibold text-gray-900 dark:text-white transition-colors">
            {{ sim.name }}
          </div>
          <div class="text-xs text-gray-500 truncate max-w-[150px]">
            {{ sim.shortDescription }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </UCard>
</template>
