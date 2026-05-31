<script setup lang="ts">
const audienceStore = useAudienceStore()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-950">
    <div class="flex flex-col items-center px-4 text-center">
      <UIcon
        name="i-lucide-shield"
        class="w-16 h-16 text-primary-500 mb-6"
        aria-hidden="true"
      />
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Bienvenue sur EduJura
      </h1>
      <p class="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Les contenus sont adaptés selon votre service. Choisissez votre profil pour continuer.
      </p>

      <div class="flex flex-col sm:flex-row gap-4">
        <button
          class="group flex flex-col items-center gap-3 px-8 py-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-[var(--ui-radius)] shadow-sm hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          @click="audienceStore.setAudience('SEN')"
        >
          <UIcon name="i-lucide-building-2" class="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
          <span class="text-lg font-semibold text-gray-900 dark:text-white">SEN</span>
          <span class="text-base text-gray-500 dark:text-gray-400">Service de l'enseignement</span>
        </button>

        <button
          class="group flex flex-col items-center gap-3 px-8 py-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-[var(--ui-radius)] shadow-sm hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          @click="audienceStore.setAudience('SFP')"
        >
          <UIcon name="i-lucide-school" class="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
          <span class="text-lg font-semibold text-gray-900 dark:text-white">SFP</span>
          <span class="text-base text-gray-500 dark:text-gray-400">Service de la formation postobligatoire</span>
        </button>
      </div>
    </div>
  </div>
</template>
