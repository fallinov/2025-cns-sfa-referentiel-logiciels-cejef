<script setup lang="ts">
const { getSoftwareList } = useSoftware()
const softwareList = getSoftwareList()

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
      class="mb-12"
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

    <!-- Software Grid -->
    <UPageSection>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SoftwareCard
          v-for="software in softwareList"
          :key="software.id"
          :software="software"
        />
      </div>
    </UPageSection>

    <!-- Detail Slideover -->
    <SoftwareDetail />

    <!-- Info Section -->
    <UPageSection class="mt-12">
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
