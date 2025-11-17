<script setup lang="ts">
const { getSoftwareList } = useSoftware()
const softwareList = getSoftwareList()

// Search and filter functionality
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)

// Get unique categories for filtering
const categories = computed(() => {
  const cats = new Set(softwareList.map(s => s.category))
  return Array.from(cats).sort()
})

// Filtered software list based on search and category
const filteredSoftwareList = computed(() => {
  let filtered = softwareList

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(software =>
      software.name.toLowerCase().includes(query)
      || software.shortDescription.toLowerCase().includes(query)
      || software.category.toLowerCase().includes(query)
      || software.disciplines.some(d => d.toLowerCase().includes(query))
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(software => software.category === selectedCategory.value)
  }

  return filtered
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
}

useSeoMeta({
  title: 'Référentiel Logiciels CEJEF',
  description: 'Référentiel de logiciels pédagogiques pour le CEJEF avec classification LGPD'
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <UPageHero
      title="Référentiel Logiciels CEJEF"
      description="Découvrez les logiciels pédagogiques avec leur classification selon la Loi sur la protection des données (LGPD)"
      class="mb-8"
      :ui="{ title: 'text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl' }"
    >
      <template #links>
        <div class="flex flex-col sm:flex-row gap-3">
          <UBadge
            color="primary"
            variant="soft"
            size="lg"
            class="justify-center sm:justify-start"
          >
            <template #leading>
              <UIcon
                name="i-lucide-graduation-cap"
                class="w-4 h-4"
              />
            </template>
            {{ softwareList.length }} logiciels disponibles
          </UBadge>
          <UBadge
            color="success"
            variant="soft"
            size="lg"
            class="justify-center sm:justify-start"
          >
            <template #leading>
              <UIcon
                name="i-lucide-shield-check"
                class="w-4 h-4"
              />
            </template>
            Classification LGPD
          </UBadge>
        </div>
      </template>
    </UPageHero>

    <!-- Search and Filter Section -->
    <UPageSection>
      <div class="space-y-4">
        <!-- Search Bar -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              size="lg"
              placeholder="Rechercher un logiciel par nom, description ou discipline..."
            >
              <template
                v-if="searchQuery"
                #trailing
              >
                <UButton
                  color="neutral"
                  variant="link"
                  icon="i-lucide-x"
                  :padded="false"
                  aria-label="Effacer la recherche"
                  @click="searchQuery = ''"
                />
              </template>
            </UInput>
          </div>

          <!-- Category Filter -->
          <USelectMenu
            v-model="selectedCategory"
            :options="[null, ...categories]"
            placeholder="Toutes les catégories"
            size="lg"
            class="w-full sm:w-64"
          >
            <template #leading>
              <UIcon
                name="i-lucide-filter"
                class="w-4 h-4"
              />
            </template>
          </USelectMenu>
        </div>

        <!-- Results info and clear filters -->
        <div
          v-if="searchQuery || selectedCategory"
          class="flex items-center justify-between text-sm"
        >
          <p class="text-gray-600 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">{{ filteredSoftwareList.length }}</span>
            {{ filteredSoftwareList.length > 1 ? 'logiciels trouvés' : 'logiciel trouvé' }}
          </p>
          <UButton
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-x"
            @click="clearFilters"
          >
            Effacer les filtres
          </UButton>
        </div>
      </div>
    </UPageSection>

    <!-- Software Grid -->
    <UPageSection>
      <div
        v-if="filteredSoftwareList.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <SoftwareCard
          v-for="software in filteredSoftwareList"
          :key="software.id"
          :software="software"
        />
      </div>

      <!-- No results message -->
      <div
        v-else
        class="text-center py-12"
      >
        <UIcon
          name="i-lucide-search-x"
          class="w-16 h-16 mx-auto mb-4 text-gray-400"
        />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun logiciel trouvé
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Essayez de modifier vos critères de recherche
        </p>
        <UButton
          color="primary"
          variant="soft"
          @click="clearFilters"
        >
          Afficher tous les logiciels
        </UButton>
      </div>
    </UPageSection>

    <!-- Detail Slideover -->
    <SoftwareDetail />

    <!-- Info Section -->
    <UPageSection class="mt-16">
      <UPageCTA
        title="À propos de la classification LGPD"
        description="Chaque logiciel est évalué selon 4 critères : hébergement des données, utilisation des données personnelles, conformité RGPD et niveau de collecte. Ces informations vous aident à choisir les outils adaptés aux exigences de protection des données."
        variant="subtle"
      >
        <template #links>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div class="text-center">
              <UIcon
                name="i-lucide-home"
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                Hébergement
              </div>
              <div class="text-xs text-gray-500">
                Localisation
              </div>
            </div>
            <div class="text-center">
              <UIcon
                name="i-lucide-user-check"
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                Données perso.
              </div>
              <div class="text-xs text-gray-500">
                Usage autorisé
              </div>
            </div>
            <div class="text-center">
              <UIcon
                name="i-lucide-shield-check"
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                RGPD
              </div>
              <div class="text-xs text-gray-500">
                Conformité
              </div>
            </div>
            <div class="text-center">
              <UIcon
                name="i-lucide-bar-chart-2"
                class="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400"
              />
              <div class="text-sm font-medium">
                Collecte
              </div>
              <div class="text-xs text-gray-500">
                Niveau
              </div>
            </div>
          </div>
        </template>
      </UPageCTA>
    </UPageSection>
  </div>
</template>
