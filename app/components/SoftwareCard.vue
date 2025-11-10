<script setup lang="ts">
import type { Software } from '~~/types/software'
import { getCertificationLevel } from '~~/types/software'

interface Props {
  software: Software
}

const props = defineProps<Props>()
const { openDetail } = useSoftware()

// Utilise la valeur explicite si présente, sinon calcule à partir du LGPD
const certificationLevel = props.software.certificationLevel ?? getCertificationLevel(props.software.lgpd)

const handleClick = () => {
  openDetail(props.software)
}
</script>

<template>
  <UCard
    class="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
    :ui="{ header: 'bg-amber-200' }"
    @click="handleClick"
  >
    <template #header>
      <div class="flex items-start gap-3">
        <div
          v-if="software.icon"
          class="flex-shrink-0"
        >
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
              v-if="software.supportedByCEJEF"
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
        <!-- Badge de certification CEJEF -->
        <CertificationBadge
          :level="certificationLevel"
          compact
        />
      </div>
    </template>

    <div class="space-y-3">
      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {{ software.shortDescription }}
      </p>

      <ul class="flex flex-col gap-3 flex-1 mt-6 grow-0">
        <li class="flex items-center gap-2 min-w-0">
          <span
            class="iconify i-lucide:lightbulb size-5 shrink-0"
            aria-hidden="true"
          />
          <span class="text-muted text-sm truncate">One developer</span>
        </li>
      </ul>
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
