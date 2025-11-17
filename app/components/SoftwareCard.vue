<script setup lang="ts">
import type { Software } from '~~/types/software'
import { getCertificationLevel } from '~~/types/software'
import { getLevelBgColor } from '~/utils/level-colors'

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
    role="button"
    tabindex="0"
    class="software-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 min-h-[88px] sm:min-h-0"
    :ui="{ header: getLevelBgColor(certificationLevel) }"
    :aria-label="`Voir les détails de ${software.name}`"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <template #header>
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <UIcon
            :name="software.icon ?? 'i-simple-icons-appstore'"
            class="w-10 h-10 text-gray-700 dark:text-gray-300"
          />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white truncate">
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
      <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
        {{ software.shortDescription }}
      </p>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <UBadge
          :color="software.cost === 'Gratuit' ? 'success' : software.cost === 'Freemium' ? 'info' : 'warning'"
          variant="soft"
        >
          {{ software.cost }}
        </UBadge>
        <span class="text-xs text-gray-700 dark:text-gray-300 font-medium">
          {{ software.category }}
        </span>
      </div>
    </template>
  </UCard>
</template>
