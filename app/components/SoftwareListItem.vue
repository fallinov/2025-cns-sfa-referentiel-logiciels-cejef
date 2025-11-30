<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationConfig } from "~/utils/certification"

const props = defineProps<{
  software: Software
}>()

const config = computed(() => getCertificationConfig(props.software.certificationLevel))
</script>

<template>
  <UPageCard :to="`/logiciels/${software.id}`">
    <template #body>
      <div class="flex items-center gap-4">
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg shadow-sm ring-1 ring-inset transition-colors duration-300"
          :class="[
            config.solidBg,
            config.ring,
            'text-white'
          ]"
        >
          <UIcon :name="software.icon || 'i-lucide-package'" class="w-6 h-6" />
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 mb-0.5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {{ software.name }}
            </h3>
            <UBadge
              v-if="software.certificationLevel"
              :color="software.certificationLevel === 1 ? 'success' : software.certificationLevel === 2 ? 'warning' : 'error'"
              variant="solid"
              size="lg"
            >
              <template #leading>
                <UIcon
                  :name="config.icon"
                  class="w-3.5 h-3.5"
                />
              </template>
              {{ config.label }}
            </UBadge>
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
      </div>
    </template>
  </UPageCard>
</template>
