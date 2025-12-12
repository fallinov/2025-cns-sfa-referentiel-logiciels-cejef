<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig } from "~/utils/certification"

interface Props {
  software: Software
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

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

    <!-- Certification Badge (Icon + Label) -->
    <div class="absolute top-4 right-4 z-30">
      <SoftwareCertificationStatus :level="software.certificationLevel" />
    </div>

    <!-- Logo -->
    <div class="relative z-10 w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110">
      <img
        v-if="software.logo"
        :src="`/logos/${software.logo}.svg`"
        :alt="`${software.name} logo`"
        class="w-full h-full object-contain"
      />
      <UIcon
        v-else-if="software.icon"
        :name="software.icon"
        class="w-full h-full"
        :class="config.text"
        aria-hidden="true"
      />
      <span
        v-else
        class="text-xl font-black"
        :class="config.text"
      >
        {{ software.name.substring(0, 2).toUpperCase() }}
      </span>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex-1 w-full">
      <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors line-clamp-2">
        {{ software.name }}
      </h3>

      <p
        v-if="!compact"
        class="text-base leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3"
      >
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Badges (Quick Filters only) -->
    <div class="relative z-10 mt-auto flex flex-wrap gap-2 pt-2">
      <SoftwareFeatureBadge
        v-if="software.cejefFavorite"
        icon="i-lucide-heart"
        label="Coup de coeur"
        class="bg-red-500 text-white dark:bg-red-600 dark:text-white border-none"
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
