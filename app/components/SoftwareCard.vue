<script setup lang="ts">
import type { Software } from '~/types/software'

interface Props {
  software: Software
}

const props = defineProps<Props>()
const { openDetail } = useSoftware()

// Mappage des icônes de plateformes
const platformIcons: Record<string, string> = {
  web: 'i-lucide-globe',
  windows: 'i-lucide-laptop',
  mac: 'i-lucide-laptop',
  smartphone: 'i-lucide-smartphone',
  tablet: 'i-lucide-tablet'
}

const handleClick = () => {
  openDetail(props.software)
}
</script>

<template>
  <UCard
    class="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
    @click="handleClick"
  >
    <template #header>
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <UIcon
            :name="software.icon"
            class="w-10 h-10 text-gray-700 dark:text-gray-300"
          />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {{ software.name }}
          </h3>
          <div class="flex flex-wrap gap-1 mt-1">
            <UBadge
              v-if="software.supportedBy"
              color="success"
              variant="soft"
              size="xs"
            >
              CEJEF
            </UBadge>
            <UBadge
              v-if="software.campusTraining"
              color="info"
              variant="soft"
              size="xs"
            >
              Formation Campus
            </UBadge>
          </div>
        </div>
      </div>
    </template>

    <div class="space-y-3">
      <!-- Classification LGPD -->
      <LgpdIcons :lgpd="software.lgpd" />

      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {{ software.shortDescription }}
      </p>

      <!-- Plateformes -->
      <div class="flex flex-wrap gap-1">
        <UBadge
          v-for="platform in software.platforms"
          :key="platform"
          color="neutral"
          variant="subtle"
          size="xs"
        >
          <template #leading>
            <UIcon
              :name="platformIcons[platform] || 'i-lucide-help-circle'"
              class="w-3 h-3"
            />
          </template>
          {{ platform }}
        </UBadge>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <UBadge
          :color="software.cost === 'Gratuit' ? 'success' : software.cost === 'Freemium' ? 'info' : 'warning'"
          variant="soft"
        >
          {{ software.cost }}
        </UBadge>
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ software.category }}
        </span>
      </div>
    </template>
  </UCard>
</template>
