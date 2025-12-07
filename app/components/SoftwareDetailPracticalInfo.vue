<script setup lang="ts">
import type { Software } from "~~/types/software"

interface Props {
  software: Software
  bgColor: string
  iconColor: string
}

defineProps<Props>()
</script>

<template>
  <UCard
    class="ring-2 ring-[#1C293C] rounded-[var(--ui-radius)]"
    :ui="{
      body: 'p-6',
      header: 'p-4 sm:p-6 pb-0'
    }"
  >
    <template #header>
      <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <UIcon name="i-lucide-info" class="w-5 h-5 text-primary-600" />
        Informations pratiques
      </h3>
    </template>

    <div class="space-y-6">
      <!-- Cost -->
      <div class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-[var(--ui-radius)] flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-wallet" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Coût
          </div>
          <div class="text-base font-semibold text-gray-900 dark:text-white">
            {{ software.cost }}
          </div>
        </div>
      </div>

      <!-- Support -->
      <div class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-[var(--ui-radius)] flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-headphones" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Support CEJEF
          </div>
          <div class="text-base font-semibold text-gray-900 dark:text-white">
            {{ software.supportedByCEJEF ? "Oui" : "Non" }}
          </div>
        </div>
      </div>

      <!-- Training -->
      <div class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-[var(--ui-radius)] flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-graduation-cap" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Formation
          </div>
          <div class="text-base font-semibold text-gray-900 dark:text-white">
            {{ software.campusTraining ? "Oui" : "Non" }}
          </div>
        </div>
      </div>

      <!-- Target Audience -->
      <div class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-[var(--ui-radius)] flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-users" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Public cible
          </div>
          <div class="text-base font-semibold text-gray-900 dark:text-white">
            {{ software.targetAudience }}
          </div>
        </div>
      </div>

      <!-- Age Restriction -->
      <div v-if="software.ageRestriction" class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-[var(--ui-radius)] flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-shield-alert" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Restriction d'âge
          </div>
          <div class="text-base font-semibold text-gray-900 dark:text-white">
            {{ software.ageRestriction }}
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
