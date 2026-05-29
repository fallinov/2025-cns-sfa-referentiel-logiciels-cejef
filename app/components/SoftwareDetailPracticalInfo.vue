<script setup lang="ts">
import type { Software } from "~~/types/software"
import { mapContractualSafeguardLabel } from "~/utils/contractual-safeguards"

interface Props {
  software: Software
  bgColor: string
  iconColor: string
}

const props = defineProps<Props>()

const fundingLabels = computed<string[]>(() => {
  const labels: string[] = []
  if (props.software.fundedByCejef) labels.push("SFP")
  if (props.software.fundedBySEN) labels.push("SEN")
  return labels
})

const safeguardLabels = computed<string[]>(() =>
  (props.software.contractualSafeguards ?? []).map(mapContractualSafeguardLabel)
)
</script>

<template>
  <UCard
    class="bg-white dark:bg-gray-800 shadow-sm rounded-[var(--ui-radius)]"
  >
    <div class="flex items-center gap-3 mb-6">
      <UIcon name="i-lucide-info" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
        Informations pratiques
      </h3>
    </div>

    <div class="space-y-5">
      <!-- Cost + Prise en charge -->
      <div class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-wallet" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
            Coût
          </div>
          <div class="text-base font-semibold text-gray-900 dark:text-white">
            {{ software.cost }}
          </div>
          <div v-if="fundingLabels.length > 0" class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            <span class="font-semibold">Prise en charge :</span> {{ fundingLabels.join(" + ") }}
          </div>
        </div>
      </div>

      <!-- Garanties contractuelles -->
      <div v-if="safeguardLabels.length > 0" class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-file-check-2" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
            Garanties contractuelles
          </div>
          <ul class="text-base text-gray-900 dark:text-white space-y-0.5">
            <li v-for="label in safeguardLabels" :key="label" class="flex items-baseline gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 self-center" />
              <span>{{ label }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Target Audience -->
      <div class="flex items-start gap-4">
        <div :class="['w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0', bgColor]">
          <UIcon :class="['w-6 h-6', iconColor]" name="i-lucide-users" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
            Public cible
          </div>
          <div class="text-base font-semibold text-gray-900 dark:text-white">
            {{ software.targetAudience }}
          </div>
        </div>
      </div>

      <!-- Consentement parental (V1 : ageRestriction retiré, seul requires_parental_consent reste) -->
      <div v-if="software.requiresParentalConsent" class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/30">
          <UIcon class="w-6 h-6 text-amber-600 dark:text-amber-400" name="i-lucide-shield-alert" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
            Consentement parental
          </div>
          <div class="text-base font-semibold text-amber-700 dark:text-amber-400">
            Requis pour les mineurs &lt; 16 ans
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
