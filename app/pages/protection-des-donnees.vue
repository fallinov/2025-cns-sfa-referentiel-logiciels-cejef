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
  setAudience,
  filteredThemes,
  hasResults,
  totalSubThemes
} = useDataProtection()

provide("dpSearchQuery", searchQuery)

// Scroll spy — thème actif dans la sidebar
const activeThemeId = ref<string | null>(null)

onMounted(() => {
  // Support ancre URL
  const hash = useRoute().hash?.replace("#", "")
  if (hash) {
    nextTick(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  // Intersection Observer pour scroll spy
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeThemeId.value = entry.target.id
        }
      }
    },
    { rootMargin: "-20% 0px -60% 0px" }
  )

  // Observer chaque section de thème
  nextTick(() => {
    document.querySelectorAll("[data-theme-section]").forEach(el => observer.observe(el))
  })

  onUnmounted(() => observer.disconnect())
})

function scrollToTheme(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8 max-w-5xl">
      <DataProtectionPageHeader
        v-model:search-query="searchQuery"
      />

      <!-- Compteur de résultats -->
      <p
        v-if="searchQuery.trim() && hasResults"
        class="text-base text-gray-500 dark:text-gray-400 mb-4 px-4 sm:px-0"
      >
        {{ totalSubThemes }} {{ totalSubThemes > 1 ? "résultats" : "résultat" }} dans {{ filteredThemes.length }} {{ filteredThemes.length > 1 ? "thèmes" : "thème" }}
      </p>

      <div v-if="hasResults" class="flex gap-6 px-4 sm:px-0">
        <!-- Sidebar sticky -->
        <nav
          id="dp-sidebar"
          class="hidden lg:block w-56 flex-shrink-0"
          aria-label="Navigation des thèmes"
        >
          <div class="sticky top-20 bg-gray-50 dark:bg-gray-800/50 rounded-[var(--ui-radius)] shadow-sm p-3">
            <!-- Toggle SEN / CEJEF -->
            <div class="flex gap-1 mb-3 p-1 bg-gray-100 dark:bg-gray-700/50 rounded-[var(--ui-radius)]" role="group" aria-label="Profil">
              <button
                class="flex-1 px-3 py-2 text-base font-medium rounded-[var(--ui-radius)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                :class="audienceFilter === 'sen'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
                :aria-pressed="audienceFilter === 'sen'"
                @click="setAudience('sen')"
              >
                SEN
              </button>
              <button
                class="flex-1 px-3 py-2 text-base font-medium rounded-[var(--ui-radius)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                :class="audienceFilter === 'cejef'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
                :aria-pressed="audienceFilter === 'cejef'"
                @click="setAudience('cejef')"
              >
                CEJEF
              </button>
            </div>

            <!-- Liste des thèmes (scroll spy) -->
            <ul class="space-y-0.5">
              <li v-for="theme in filteredThemes" :key="theme.id">
                <button
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--ui-radius)] text-left text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  :class="activeThemeId === theme.id
                    ? 'bg-white dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-semibold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'"
                  @click="scrollToTheme(theme.id)"
                >
                  <UIcon :name="theme.icon" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span class="truncate">{{ theme.shortTitle }}</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Contenu empilé — tous les thèmes -->
        <main class="flex-1 min-w-0 space-y-12" aria-live="polite">
          <section
            v-for="theme in filteredThemes"
            :id="theme.id"
            :key="theme.id"
            data-theme-section
            class="scroll-mt-20"
          >
            <DataProtectionThemeContent
              :theme="theme"
            />
          </section>
        </main>
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
