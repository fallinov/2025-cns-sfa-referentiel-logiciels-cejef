<script setup>
const config = useRuntimeConfig()

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

const _links = [{
  label: "Proposer un logiciel",
  icon: "i-lucide-plus",
  to: "#"
}, {
  label: "Favoris",
  icon: "i-lucide-heart",
  to: "#"
}, {
  label: "Se connecter",
  icon: "i-lucide-user",
  to: "#"
}]
</script>

<template>
  <UApp class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <AppHeader />

    <UMain>
      <NuxtPage v-slot="{ Component }">
        <KeepAlive include="IndexPage" :max="10">
          <Component :is="Component" />
        </KeepAlive>
      </NuxtPage>
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          CEJEF - Centre Jurassien d'Enseignement et de Formation •
          {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #center>
        <span class="text-xs text-gray-500 dark:text-gray-400">
          v{{ config.public.appVersion }}
        </span>
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
