<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig } from "~/utils/certification"

const props = defineProps<{
  software: Software
}>()

const config = computed(() => getCertificationConfig(props.software.certificationLevel))
</script>

<template>
  <NuxtLink
    :to="`/logiciels/${software.id}`"
    class="group relative flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
  >
    <!-- Logo/Icon -->
    <div class="flex-shrink-0 w-16 h-16 flex items-center justify-center">
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
      />
      <span
        v-else
        class="text-2xl font-black"
      >
        {{ software.name.substring(0, 2).toUpperCase() }}
      </span>
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2 mb-0.5">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {{ software.name }}
        </h3>
        <div
          v-if="software.certificationLevel"
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold"
          :class="config.solidBg + ' text-white'"
        >
          <CertificationBadge
            :level="software.certificationLevel"
            size="sm"
          />
          {{ config.label }}
        </div>
      </div>
      <p class="text-base text-gray-500 dark:text-gray-400 truncate">
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Meta -->
    <div class="hidden sm:flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <div v-if="software.categories?.length" class="flex items-center gap-1">
        <UIcon name="i-lucide-tag" class="w-3 h-3" />
        <span>{{ software.categories[0] }}</span>
      </div>
      <div class="flex items-center gap-1">
        <UIcon name="i-lucide-coins" class="w-3 h-3" />
        <span>{{ software.cost }}</span>
      </div>
    </div>

    <!-- Chevron indicator -->
    <UIcon
      name="i-lucide-chevron-right"
      class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
    />
  </NuxtLink>
</template>
