<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig, getCertificationIcon } from "~/utils/certification"

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
    <!-- Icon -->
    <div class="relative flex-shrink-0">
      <div
        class="w-10 h-10 flex items-center justify-center rounded-lg shadow-sm ring-1 ring-inset transition-colors duration-300"
        :class="[
          config.solidBg,
          config.ring,
          'text-white'
        ]"
      >
        <UIcon :name="software.icon || 'i-lucide-package'" class="w-6 h-6" />
      </div>
      <!-- Certification Badge -->
      <div
        class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center shadow-sm ring-1 ring-white dark:ring-gray-900"
        :class="config.solidBg"
      >
        <UIcon
          :name="getCertificationIcon(software.certificationLevel)"
          class="w-3 h-3 text-white"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
        {{ software.name }}
      </h3>
      <UBadge
        v-if="software.certificationLevel"
        :color="software.certificationLevel === 1 ? 'success' : software.certificationLevel === 2 ? 'warning' : 'error'"
        variant="solid"
        size="md"
        class="mb-1"
      >
        <template #leading>
          <UIcon
            :name="config.icon"
            class="w-3.5 h-3.5"
          />
        </template>
        {{ config.label }}
      </UBadge>
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
