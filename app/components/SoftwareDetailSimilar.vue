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
  <UCard v-if="sortedSimilarSoftware.length" class="ring-2 ring-[#1C293C] rounded-[var(--ui-radius)]" :ui="{ body: 'p-6', header: 'p-4 sm:p-6' }">
    <template #header>
      <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-primary-600" />
        Logiciels similaires
      </h3>
    </template>

    <div class="space-y-3">
      <NuxtLink
        v-for="sim in sortedSimilarSoftware"
        :key="sim.id"
        :to="`/logiciels/${sim.id}`"
        class="flex items-center gap-3 group"
      >
        <div class="relative">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            :class="getInfoPracticalStyle(sim.certificationLevel ?? getCertificationLevel(sim.lgpd)).bg"
          >
            <UIcon
              :name="sim.icon || 'i-lucide-box'"
              class="w-5 h-5"
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
          <div class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
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
