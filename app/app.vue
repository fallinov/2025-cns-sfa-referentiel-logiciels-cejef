<script setup>
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
            class="w-5 h-5 text-primary-600 dark:text-primary-400"
          />
          <span
            class="font-semibold text-base text-gray-900 dark:text-white hidden sm:inline"
          >
            Référentiel Logiciels CEJEF
          </span>
          <span class="font-semibold text-base text-gray-900 dark:text-white sm:hidden">
            CEJEF
          </span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

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
