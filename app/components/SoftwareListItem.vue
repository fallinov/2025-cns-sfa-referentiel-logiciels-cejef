<script setup lang="ts">
import type { Software } from "~~/types/software"

const props = defineProps<{
  software: Software
}>()

const audienceStore = useAudienceStore()
</script>

<template>
  <NuxtLink
    :to="`/logiciels/${software.id}`"
    class="group relative flex items-center gap-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
  >

    <!-- Logo/Icon with Badge -->
    <SoftwareLogoWithBadge :software="software" size="md" />

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2 mb-0.5">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {{ software.name }}
        </h3>
      </div>
      <p class="text-base text-gray-600 dark:text-gray-300 truncate">
        {{ software.shortDescription }}
      </p>
    </div>

    <!-- Meta / Badges -->
    <div class="hidden sm:flex items-center gap-2">
      <!-- Approuvé SEN -->
      <div v-if="software.approvedBySEN" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-badge-check"
          label="Approuvé SEN"
          tooltip="Recommandé par le Service de l'Enseignement"
          size="sm"
          hide-label
          class="lg:hidden bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-badge-check"
          label="Approuvé SEN"
          tooltip="Recommandé par le Service de l'Enseignement"
          size="sm"
          class="hidden lg:inline-flex bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
        />
      </div>

      <!-- Approuvé CEJEF -->
      <div v-if="software.approvedBySFP" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-badge-check"
          label="Approuvé CEJEF"
          tooltip="Recommandé par le CEJEF (Service de la Formation Postobligatoire)"
          size="sm"
          hide-label
          class="lg:hidden bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-badge-check"
          label="Approuvé CEJEF"
          tooltip="Recommandé par le CEJEF (Service de la Formation Postobligatoire)"
          size="sm"
          class="hidden lg:inline-flex bg-green-500 text-white dark:bg-green-500 dark:text-white border-none"
        />
      </div>

      <!-- Compte @edu.jura.ch requis -->
      <div v-if="software.requiresEduAccount && software.certificationLevel === 1" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-at-sign"
          label="Compte edu.jura.ch"
          tooltip="Classification validée uniquement avec le compte @edu.jura.ch"
          size="sm"
          hide-label
          class="lg:hidden bg-blue-500 text-white dark:bg-blue-500 dark:text-white border-none"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-at-sign"
          label="Compte edu.jura.ch"
          tooltip="Classification validée uniquement avec le compte @edu.jura.ch"
          size="sm"
          class="hidden lg:inline-flex bg-blue-500 text-white dark:bg-blue-500 dark:text-white border-none"
        />
      </div>

      <!-- Compte Edulog requis -->
      <div v-if="software.requiresEdulog && software.certificationLevel === 1" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-key-round"
          label="Compte Edulog"
          tooltip="Connexion possible via la fédération d'identités Edulog"
          size="sm"
          hide-label
          class="lg:hidden bg-blue-500 text-white dark:bg-blue-500 dark:text-white border-none"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-key-round"
          label="Compte Edulog"
          tooltip="Connexion possible via la fédération d'identités Edulog"
          size="sm"
          class="hidden lg:inline-flex bg-blue-500 text-white dark:bg-blue-500 dark:text-white border-none"
        />
      </div>

      <!-- Avertissement mineurs < 16 ans -->
      <div v-if="software.requiresParentalConsent" class="inline-flex">
        <SoftwareFeatureBadge
          icon="i-lucide-cake"
          label="< 16 ans : accord parents"
          tooltip="Accord parental obligatoire pour les moins de 16 ans"
          size="sm"
          hide-label
          class="lg:hidden bg-orange-500 text-white dark:bg-orange-500 dark:text-white border-none"
        />
        <SoftwareFeatureBadge
          icon="i-lucide-cake"
          label="< 16 ans : accord parents"
          tooltip="Accord parental obligatoire pour les moins de 16 ans"
          size="sm"
          class="hidden lg:inline-flex bg-orange-500 text-white dark:bg-orange-500 dark:text-white border-none"
        />
      </div>
    </div>

    <!-- Chevron indicator -->
    <UIcon
      name="i-lucide-chevron-right"
      class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
    />
  </NuxtLink>
</template>
