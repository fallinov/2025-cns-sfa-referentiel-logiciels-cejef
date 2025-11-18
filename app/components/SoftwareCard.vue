<script setup lang="ts">
import type { Software } from "~~/types/software"
import { getCertificationLevel } from "~~/types/software"
import { getLevelBgColor } from "~/utils/level-colors"

interface Props {
  software: Software
}

const props = defineProps<Props>()
const { openDetail } = useSoftware()

// Utilise la valeur explicite si présente, sinon calcule à partir du LGPD
const certificationLevel
  = props.software.certificationLevel
    ?? getCertificationLevel(props.software.lgpd)

const handleClick = () => {
  openDetail(props.software)
}
</script>

<template>
  <UCard
    role="button"
    tabindex="0"
    class="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 min-h-[88px] sm:min-h-0"
    :ui="{ header: getLevelBgColor(certificationLevel) }"
    :aria-label="`Voir les détails de ${software.name}`"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <template #header>
      <div class="flex items-start gap-3">
        <div class="shrink-0">
          <UIcon
            :name="software.icon ?? 'i-simple-icons-appstore'"
            class="w-12 h-12 text-gray-700 dark:text-gray-300"
          />
        </div>
        <div class="flex-1 min-w-0">
          <h3
            class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white truncate"
          >
            {{ software.name }}
          </h3>
          <div class="flex flex-wrap gap-1.5 mt-2">
            <UBadge
              v-if="software.supportedByCEJEF"
              color="green"
              variant="soft"
              size="sm"
            >
              CEJEF
            </UBadge>
            <UBadge
              v-if="software.campusTraining"
              color="info"
              variant="soft"
              size="sm"
            >
              Formation Campus
            </UBadge>
          </div>
        </div>
        <!-- Badge de certification CEJEF -->
        <CertificationBadge :level="certificationLevel" compact />
      </div>
    </template>

    <div class="space-y-3">
      <!-- Description -->
      <p class="text-lg text-gray-700 dark:text-gray-300 line-clamp-2">
        {{ software.shortDescription }}
      </p>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <UBadge
          :color="
            software.cost === 'Gratuit'
              ? 'success'
              : software.cost === 'Freemium'
                ? 'info'
                : 'warning'
          "
          variant="soft"
          size="md"
        >
          {{ software.cost }}
        </UBadge>
        <span class="text-base text-gray-700 dark:text-gray-300 font-medium">
          {{ software.category }}
        </span>
      </div>
    </template>
  </UCard>
</template>
