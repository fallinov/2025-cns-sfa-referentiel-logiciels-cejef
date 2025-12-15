<script setup lang="ts">
import { getCertificationLevel, type Software } from "~~/types/software"
import { getCertificationConfig, getCertificationIcon } from "~/utils/certification"

interface Props {
  similarSoftware: Software[]
}

const props = defineProps<Props>()

// Helper pour obtenir les classes de style Info Pratique pour un niveau de certification
// Copié depuis main pour maintenir le style exact
const getInfoPracticalStyle = (level: number | null | undefined) => {
  switch (level) {
    case 1:
      return {
        bg: "bg-green-50 dark:bg-green-900/20",
        iconColor: "text-green-500"
      }
    case 2:
      return {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        iconColor: "text-orange-500"
      }
    case 3:
      return {
        bg: "bg-red-50 dark:bg-red-900/20",
        iconColor: "text-red-500"
      }
    default:
      return {
        bg: "bg-gray-50 dark:bg-gray-900/20",
        iconColor: "text-gray-500"
      }
  }
}

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

    <div class="space-y-5">
      <NuxtLink
        v-for="sim in sortedSimilarSoftware"
        :key="sim.id"
        :to="`/logiciels/${sim.id}`"
        class="flex items-center gap-4 group"
      >
        <div class="relative">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            :class="getInfoPracticalStyle(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).bg"
          >
            <UIcon
              :name="sim.icon || 'i-lucide-box'"
              class="w-6 h-6"
              :class="getInfoPracticalStyle(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).iconColor"
            />
          </div>
          <!-- Certification Badge -->
          <div
            class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            :class="getCertificationConfig(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).solidBg"
          >
            <UIcon
              :name="getCertificationIcon(sim.certificationLevel ?? getCertificationLevel(sim.lgpd))"
              class="w-3 h-3 text-white"
            />
          </div>
        </div>
        <div>
          <div class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
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
