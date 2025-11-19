<script setup>
const isCommandPaletteOpen = ref(false)

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  htmlAttrs: {
    lang: "fr"
  }
})

const title = "Référentiel Logiciels CEJEF"
const description
  = "Référentiel de logiciels pédagogiques pour le CEJEF avec classification LGPD (Loi sur la protection des données)"

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: "summary_large_image"
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon
            name="i-lucide-graduation-cap"
            class="w-6 h-6 text-primary-600 dark:text-primary-400"
          />
          <span
            class="font-semibold text-gray-900 dark:text-white hidden sm:inline"
          >
            Référentiel Logiciels CEJEF
          </span>
          <span class="font-semibold text-gray-900 dark:text-white sm:hidden">
            CEJEF
          </span>
        </NuxtLink>
      </template>

      <template #right>
        <div class="flex items-center gap-3">
          <UButton
            icon="i-lucide-search"
            color="neutral"
            variant="outline"
            aria-label="Rechercher un logiciel"
            @click="isCommandPaletteOpen = true"
          >
            <span class="hidden sm:inline">Rechercher</span>
            <template #trailing>
              <UKbd>⌘K</UKbd>
            </template>
          </UButton>
          <UColorModeButton />
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <!-- Command Palette for global search -->
    <SoftwareCommandPalette v-model:open="isCommandPaletteOpen" />

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          CEJEF - Centre Jurassien d'Enseignement et de Formation •
          {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <div
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
        >
          <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
          <span class="hidden sm:inline">Classification LGPD</span>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>

<style>
/* Hide scrollbar for horizontal scroll containers */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
