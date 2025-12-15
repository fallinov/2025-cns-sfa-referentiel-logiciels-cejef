<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig } from "~/utils/certification"

interface Props {
  software: Software
}

const props = defineProps<Props>()

const config = computed(() => {
  return getCertificationConfig(props.software.certificationLevel)
})
const handleCardClick = () => {
  if (import.meta.client) {
    const url = new URL(window.location.href)
    url.hash = `software-${props.software.id}`
    window.history.replaceState(window.history.state, "", url.href)
  }
}
</script>

<template>
  <NuxtLink
    :id="`software-${software.id}`"
    :to="`/logiciels/${software.id}`"
    class="group relative w-full h-full overflow-hidden bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] shadow-sm hover:shadow-xl hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary-500 transition-all duration-300 ease-out p-6 flex flex-col items-start gap-4 isolate cursor-pointer scroll-mt-24"
    @click="handleCardClick"
  >

    <!-- Content with horizontal traffic light above title -->
    <div class="relative z-10 flex-1 w-full">
      <!-- Horizontal Traffic Light (Above Title) -->
      <UTooltip :text="`Certification LGPD: ${config.label}`">
        <div
          class="flex items-center gap-2.5 mb-3 border-2 border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 w-fit"
          role="status"
          :aria-label="`Niveau de certification: ${config.label}`"
        >
          <!-- Texte alternatif pour lecteurs d'écran (WCAG 1.4.1) -->
          <span class="sr-only">
            Niveau de certification: {{ config.label }}
          </span>

          <!-- Red Square (Level 3 - Interdit) -->
          <div
            class="transition-all duration-300 flex items-center justify-center antialiased"
            :class="[
              software.certificationLevel === 3 ? 'w-7 h-7' : 'w-5 h-5',
              software.certificationLevel === 3
                ? 'bg-red-500 shadow-[0_0_10px_rgba(197,40,40,0.7)]'
                : 'bg-gray-200 dark:bg-gray-700'
            ]"
            aria-hidden="true"
          >
            <UIcon
              v-if="software.certificationLevel === 3"
              name="i-lucide-x"
              class="w-5 h-5 text-white stroke-[2.5]"
            />
          </div>

          <!-- Orange Triangle (Level 2 - Restreint) -->
          <div
            class="relative transition-all duration-300 flex items-center justify-center"
            :class="software.certificationLevel === 2 ? 'w-7 h-7' : 'w-5 h-5'"
            aria-hidden="true"
          >
            <!-- Triangle SVG pour un rendu parfait -->
            <svg
              viewBox="0 0 24 24"
              class="absolute inset-0 antialiased"
              :class="[
                software.certificationLevel === 2 ? 'w-8 h-8' : 'w-6 h-6',
                software.certificationLevel === 2 ? 'drop-shadow-[0_0_10px_rgba(233,131,37,0.7)]' : ''
              ]"
              style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
            >
              <path
                d="M12 1 L23 23 L1 23 Z"
                :fill="software.certificationLevel === 2 ? '#f97316' : '#e5e7eb'"
                :class="software.certificationLevel === 2 ? '' : 'dark:fill-gray-700'"
              />
            </svg>
            <span
              v-if="software.certificationLevel === 2"
              class="relative z-10 text-white font-black text-base leading-none"
              style="margin-top: 2px;"
            >
              !
            </span>
          </div>

          <!-- Green Circle (Level 1 - Validé) -->
          <div
            class="rounded-full transition-all duration-300 flex items-center justify-center antialiased"
            :class="[
              software.certificationLevel === 1 ? 'w-7 h-7' : 'w-5 h-5',
              software.certificationLevel === 1
                ? 'bg-green-500 shadow-[0_0_10px_rgba(46,125,50,0.7)]'
                : 'bg-gray-200 dark:bg-gray-700'
            ]"
            aria-hidden="true"
          >
            <UIcon
              v-if="software.certificationLevel === 1"
              name="i-lucide-check"
              class="w-5 h-5 text-white stroke-[2.5]"
            />
          </div>
        </div>
      </UTooltip>

      <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors line-clamp-2">
        {{ software.name }}
      </h3>

      <p class="text-base leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Badges (Quick Filters only) -->
    <div class="relative z-10 mt-auto flex flex-wrap gap-2 pt-2">
      <SoftwareFeatureBadge
        v-if="software.cejefFavorite"
        icon="i-lucide-heart"
        label="Coup de coeur"
        class="bg-red-600 text-white dark:bg-red-600 dark:text-white border-none"
      />
      <SoftwareFeatureBadge
        v-if="software.personalData"
        icon="i-lucide-user-check"
        label="Données élèves"
      />
      <SoftwareFeatureBadge
        v-if="software.supportedByCEJEF"
        icon="i-lucide-headset"
        label="Support CEJEF"
      />
      <SoftwareFeatureBadge
        v-if="software.campusTraining"
        icon="i-lucide-graduation-cap"
        label="Formation"
      />
      <SoftwareFeatureBadge
        v-if="software.cost === 'Gratuit'"
        icon="i-lucide-coins"
        label="Gratuit"
      />
    </div>
  </NuxtLink>
</template>
