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
  resetAudience,
  filteredThemes,
  hasResults,
  totalSubThemes
} = useDataProtection()

provide("dpSearchQuery", searchQuery)

const activeThemeId = ref<string | null>(null)

const activeTheme = computed(() => {
  if (!activeThemeId.value) return filteredThemes.value[0] || null
  return filteredThemes.value.find(t => t.id === activeThemeId.value) || filteredThemes.value[0] || null
})

// Point 1 : recherche cross-thèmes — auto-switch au premier thème avec résultats
watch(filteredThemes, (themes) => {
  if (themes.length > 0 && !themes.find(t => t.id === activeThemeId.value)) {
    activeThemeId.value = themes[0]?.id ?? null
  }
})

const isMobileSidebarOpen = ref(false)

function selectTheme(id: string) {
  activeThemeId.value = id
  isMobileSidebarOpen.value = false
}

// Point 3 : support des ancres URL (#theme-id)
const route = useRoute()

onMounted(() => {
  const hash = route.hash?.replace("#", "")
  if (hash) {
    const matchingTheme = filteredThemes.value.find(t => t.id === hash)
    if (matchingTheme) {
      activeThemeId.value = matchingTheme.id
    }
  }
})

// Point 4 : navigation clavier dans la sidebar (flèches haut/bas)
function handleSidebarKeydown(event: KeyboardEvent) {
  const ids = filteredThemes.value.map(t => t.id)
  const currentId = activeThemeId.value || ids[0]
  const currentIndex = ids.indexOf(currentId ?? "")

  const nextId = ids[currentIndex + 1]
  const prevId = ids[currentIndex - 1]

  if (event.key === "ArrowDown" && nextId) {
    event.preventDefault()
    selectTheme(nextId)
    focusSidebarButton(currentIndex + 1)
  } else if (event.key === "ArrowUp" && prevId) {
    event.preventDefault()
    selectTheme(prevId)
    focusSidebarButton(currentIndex - 1)
  }
}

function focusSidebarButton(index: number) {
  nextTick(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>("#dp-sidebar ul button")
    buttons[index]?.focus()
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8 max-w-5xl">
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
              class="group flex flex-col items-center gap-3 px-8 py-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-[var(--ui-radius)] shadow-sm hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              @click="setAudience('sen')"
            >
              <UIcon name="i-lucide-building-2" class="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
              <span class="text-lg font-semibold text-gray-900 dark:text-white">SEN</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Service de l'enseignement</span>
            </button>

            <button
              class="group flex flex-col items-center gap-3 px-8 py-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-[var(--ui-radius)] shadow-sm hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              @click="setAudience('cejef')"
            >
              <UIcon name="i-lucide-school" class="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
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

        <div v-if="hasResults" class="px-4 sm:px-0">
          <!-- Bouton mobile sidebar -->
          <button
            class="flex items-center gap-2 mb-4 px-4 h-11 bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :aria-expanded="isMobileSidebarOpen"
            aria-controls="dp-sidebar"
            @click="isMobileSidebarOpen = !isMobileSidebarOpen"
          >
            <UIcon name="i-lucide-menu" class="w-4 h-4" aria-hidden="true" />
            {{ activeTheme?.title || "Thèmes" }}
            <UIcon
              name="i-lucide-chevron-down"
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': isMobileSidebarOpen }"
              aria-hidden="true"
            />
          </button>

          <!-- Backdrop mobile -->
          <div
            v-if="isMobileSidebarOpen"
            class="fixed inset-0 z-30 bg-black/30 lg:hidden"
            aria-hidden="true"
            @click="isMobileSidebarOpen = false"
          ></div>

          <div class="flex gap-6">
            <!-- Sidebar -->
            <nav
              id="dp-sidebar"
              class="w-64 flex-shrink-0"
              :class="isMobileSidebarOpen ? 'block absolute z-40 left-4 right-4 sm:left-6 sm:right-6 lg:static lg:block' : 'hidden lg:block'"
              aria-label="Navigation des thèmes"
            >
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-[var(--ui-radius)] shadow-sm p-3 lg:sticky lg:top-20">
                <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
                <ul class="space-y-0.5" @keydown="handleSidebarKeydown">
                  <li v-for="theme in filteredThemes" :key="theme.id">
                    <button
                      class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--ui-radius)] text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      :class="activeThemeId === theme.id || (!activeThemeId && filteredThemes[0]?.id === theme.id)
                        ? 'bg-white dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-semibold shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/50'"
                      :aria-current="(activeThemeId === theme.id || (!activeThemeId && filteredThemes[0]?.id === theme.id)) ? 'true' : undefined"
                      @click="selectTheme(theme.id)"
                    >
                      <UIcon :name="theme.icon" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span class="flex-1">{{ theme.title }}</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400 tabular-nums">{{ theme.subThemes.length }}</span>
                    </button>
                  </li>
                </ul>

                <!-- Changer de profil -->
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    class="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--ui-radius)] text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    @click="resetAudience()"
                  >
                    <UIcon name="i-lucide-repeat" class="w-3.5 h-3.5" aria-hidden="true" />
                    Changer de profil ({{ audienceFilter === 'sen' ? 'SEN' : 'CEJEF' }})
                  </button>
                </div>
              </div>
            </nav>

            <!-- Contenu -->
            <main class="flex-1 min-w-0" aria-live="polite">
              <!-- Compteur de résultats (visible uniquement avec recherche active) -->
              <p
                v-if="searchQuery.trim()"
                class="text-xs text-gray-500 dark:text-gray-400 mb-3"
              >
                {{ totalSubThemes }} {{ totalSubThemes > 1 ? "résultats" : "résultat" }} dans {{ filteredThemes.length }} {{ filteredThemes.length > 1 ? "thèmes" : "thème" }}
              </p>

              <Transition
                enter-active-class="transition-opacity duration-200 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                mode="out-in"
              >
                <DataProtectionThemeContent
                  v-if="activeTheme"
                  :key="activeTheme.id"
                  :theme="activeTheme"
                />
              </Transition>
            </main>
          </div>
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
