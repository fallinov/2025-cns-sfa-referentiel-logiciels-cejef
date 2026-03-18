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
  filteredThemes,
  hasResults
} = useDataProtection()

provide("dpSearchQuery", searchQuery)
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8 max-w-[1240px]">
      <DataProtectionPageHeader
        v-model:search-query="searchQuery"
        v-model:audience-filter="audienceFilter"
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
    </UContainer>
    <BackToTop />
  </div>
</template>
