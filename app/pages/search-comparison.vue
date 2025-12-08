<script setup lang="ts">
/**
 * Page de comparaison SearchBar vs SoftwareCommandPalette
 * Permet de tester et comparer les deux approches
 */

import { useSoftwareStore } from "~/stores/software"
import { storeToRefs } from "pinia"

const store = useSoftwareStore()
const {
  searchQuery
} = storeToRefs(store)

const {
  clearAllFilters,
  resetFilters,
  handleCategoryFilter,
  handleDisciplineFilter,
  handleActivityFilter
} = store

const handleGlobalSearch = (query: string) => {
  resetFilters()
  searchQuery.value = query
}

const activeComponent = ref<"searchbar" | "commandpalette">("commandpalette")
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
    <UContainer class="max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">
          Comparaison des composants de recherche
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Testez les deux approches et choisissez la meilleure
        </p>
      </div>

      <!-- Toggle -->
      <div class="mb-8 flex justify-center">
        <UButtonGroup orientation="horizontal" size="lg">
          <UButton
            :variant="activeComponent === 'searchbar' ? 'solid' : 'outline'"
            :color="activeComponent === 'searchbar' ? 'primary' : 'neutral'"
            @click="activeComponent = 'searchbar'"
          >
            SearchBar (Actuel)
          </UButton>
          <UButton
            :variant="activeComponent === 'commandpalette' ? 'solid' : 'outline'"
            :color="activeComponent === 'commandpalette' ? 'primary' : 'neutral'"
            @click="activeComponent = 'commandpalette'"
          >
            CommandPalette (POC)
          </UButton>
        </UButtonGroup>
      </div>

      <!-- Comparaison visuelle -->
      <div class="space-y-8">
        <!-- SearchBar (Actuel) -->
        <UCard v-if="activeComponent === 'searchbar'">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">
                SearchBar (Actuel)
              </h2>
              <UBadge color="warning" variant="subtle">
                Ancien
              </UBadge>
            </div>
          </template>

          <div class="space-y-4">
            <SearchBar
              v-model:search="searchQuery"
              @filter-by-category="handleCategoryFilter"
              @filter-by-discipline="handleDisciplineFilter"
              @filter-by-activity="handleActivityFilter"
              @search="handleGlobalSearch"
              @clear="clearAllFilters"
            />

            <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Avantages :</strong></p>
              <ul class="list-disc list-inside space-y-1">
                <li>Input custom avec design unique</li>
                <li>Dropdown de suggestions groupées</li>
                <li>Effet typewriter pour le placeholder</li>
              </ul>

              <p class="mt-4">
                <strong>Inconvénients :</strong>
              </p>
              <ul class="list-disc list-inside space-y-1">
                <li>230 lignes de code pour useKeyboardNavigation</li>
                <li>Logique de navigation clavier custom complexe</li>
                <li>Dropdown custom qui réinvente UCommandPalette</li>
                <li>Plus difficile à maintenir</li>
                <li>Pas de fuzzy search intégré</li>
              </ul>
            </div>
          </div>
        </UCard>

        <!-- SoftwareCommandPalette (POC) -->
        <UCard v-if="activeComponent === 'commandpalette'">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">
                CommandPalette (POC)
              </h2>
              <UBadge color="success" variant="subtle">
                Nouveau
              </UBadge>
            </div>
          </template>

          <div class="space-y-4">
            <SoftwareCommandPalette
              @filter-by-category="handleCategoryFilter"
              @filter-by-discipline="handleDisciplineFilter"
              @filter-by-activity="handleActivityFilter"
              @search="handleGlobalSearch"
              @clear="clearAllFilters"
            />

            <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Avantages :</strong></p>
              <ul class="list-disc list-inside space-y-1">
                <li>✅ Navigation clavier native (ArrowUp/Down, Enter, Escape)</li>
                <li>✅ Pas besoin de useKeyboardNavigation (-230 lignes)</li>
                <li>✅ Fuzzy search intégré avec Fuse.js</li>
                <li>✅ Meilleur design et animations</li>
                <li>✅ Accessibilité built-in (ARIA)</li>
                <li>✅ Raccourci clavier ⌘K / Ctrl+K</li>
                <li>✅ Modal overlay professionnel</li>
                <li>✅ Plus facile à maintenir (composant Nuxt UI)</li>
              </ul>

              <p class="mt-4">
                <strong>Inconvénients :</strong>
              </p>
              <ul class="list-disc list-inside space-y-1">
                <li>Nécessite un clic pour ouvrir (mais ⌘K disponible)</li>
                <li>Design modal vs inline (subjectif)</li>
              </ul>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Statistiques de comparaison -->
      <UCard class="mt-8">
        <template #header>
          <h2 class="text-2xl font-bold">
            Comparaison technique
          </h2>
        </template>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4">
                  Critère
                </th>
                <th class="text-left py-3 px-4">
                  SearchBar (Actuel)
                </th>
                <th class="text-left py-3 px-4">
                  CommandPalette (POC)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4 font-medium">
                  Lignes de code
                </td>
                <td class="py-3 px-4">
                  ~550 lignes (SearchBar + useKeyboardNavigation)
                </td>
                <td class="py-3 px-4">
                  ~150 lignes ✅
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4 font-medium">
                  Navigation clavier
                </td>
                <td class="py-3 px-4">
                  Custom (230 lignes)
                </td>
                <td class="py-3 px-4">
                  Native UCommandPalette ✅
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4 font-medium">
                  Fuzzy search
                </td>
                <td class="py-3 px-4">
                  ❌ Non
                </td>
                <td class="py-3 px-4">
                  ✅ Fuse.js intégré
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4 font-medium">
                  Accessibilité
                </td>
                <td class="py-3 px-4">
                  Partielle (ARIA basique)
                </td>
                <td class="py-3 px-4">
                  ✅ Complète (built-in)
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4 font-medium">
                  Maintenabilité
                </td>
                <td class="py-3 px-4">
                  Moyenne (code custom)
                </td>
                <td class="py-3 px-4">
                  ✅ Élevée (composant Nuxt UI)
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4 font-medium">
                  Raccourcis clavier
                </td>
                <td class="py-3 px-4">
                  ❌ Non
                </td>
                <td class="py-3 px-4">
                  ✅ ⌘K / Ctrl+K
                </td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium">
                  UX
                </td>
                <td class="py-3 px-4">
                  Bonne
                </td>
                <td class="py-3 px-4">
                  ✅ Excellente
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </UCard>

      <!-- Recommandation -->
      <UAlert
        color="primary"
        variant="subtle"
        icon="i-lucide-lightbulb"
        title="Recommandation"
        class="mt-8"
      >
        <template #description>
          <p class="mb-2">
            <strong>Migration vers UCommandPalette recommandée</strong> pour les raisons suivantes :
          </p>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li><strong>-400 lignes de code</strong> (-73% de code custom)</li>
            <li><strong>Meilleure UX</strong> avec navigation clavier native et fuzzy search</li>
            <li><strong>Plus maintenable</strong> (composant officiel Nuxt UI)</li>
            <li><strong>Meilleure accessibilité</strong> (ARIA complet)</li>
            <li><strong>Raccourci clavier moderne</strong> (⌘K comme GitHub, VS Code, etc.)</li>
          </ul>
        </template>
      </UAlert>

      <!-- Actions -->
      <div class="flex justify-center gap-4 mt-8">
        <UButton
          to="/"
          color="neutral"
          variant="outline"
          size="lg"
        >
          Retour à l'accueil
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
