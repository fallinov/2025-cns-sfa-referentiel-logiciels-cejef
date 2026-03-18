<script setup lang="ts">
defineOptions({
  name: "DataProtectionPage"
})

useSeoMeta({
  title: "Protection des données — Référentiel Logiciels CEJEF",
  description: "Mesures prises par le Canton du Jura pour la protection des données dans l'enseignement."
})

const {
  searchQuery,
  audienceFilter,
  hasChosenAudience,
  setAudience,
  filteredThemes,
  hasResults
} = useDataProtection()

provide("dpSearchQuery", searchQuery)
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8 max-w-[1240px]">
      <!-- Écran de choix initial -->
      <ClientOnly>
        <div
          v-if="!hasChosenAudience"
          class="flex flex-col items-center justify-center py-20 px-4 text-center"
        >
          <UIcon
            name="i-lucide-shield"
            class="w-16 h-16 text-primary-500 mb-6"
            aria-hidden="true"
          />
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Protection des données
          </h1>
          <p class="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            Les contenus sont adaptés selon votre service. Choisissez votre profil pour afficher les informations qui vous concernent.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="group flex flex-col items-center gap-3 px-8 py-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-[var(--ui-radius)] shadow-sm hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400 transition-all"
              @click="setAudience('sen')"
            >
              <UIcon name="i-lucide-building-2" class="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" />
              <span class="text-lg font-semibold text-gray-900 dark:text-white">SEN</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Service de l'enseignement</span>
            </button>

            <button
              class="group flex flex-col items-center gap-3 px-8 py-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-[var(--ui-radius)] shadow-sm hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400 transition-all"
              @click="setAudience('cejef')"
            >
              <UIcon name="i-lucide-school" class="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" />
              <span class="text-lg font-semibold text-gray-900 dark:text-white">CEJEF</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Formation postobligatoire</span>
            </button>
          </div>
        </div>
      </ClientOnly>

      <!-- Contenu principal -->
      <template v-if="hasChosenAudience">
        <DataProtectionPageHeader
          v-model:search-query="searchQuery"
          :audience-filter="audienceFilter"
          @update:audience-filter="setAudience"
        />

        <div
          v-if="hasResults"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start px-4 sm:px-0"
        >
          <DataProtectionThemeCard
            v-for="theme in filteredThemes"
            :key="theme.id"
            :theme="theme"
          />
        </div>

        <!-- État vide -->
        <div
          v-else
          class="flex flex-col items-center justify-center py-20 text-center"
        >
          <UIcon
            name="i-lucide-search-x"
            class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4"
            aria-hidden="true"
          />
          <p class="text-lg font-medium text-gray-500 dark:text-gray-400">
            Aucun résultat trouvé
          </p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Essayez avec d'autres termes de recherche ou changez le filtre.
          </p>
        </div>
      </template>
    </UContainer>
    <BackToTop />
  </div>
</template>
