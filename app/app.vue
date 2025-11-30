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

const links = [{
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
  <UApp>
    <UHeader :links="links" :ui="{ wrapper: 'border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900' }">
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="font-bold text-2xl text-primary-600 dark:text-primary-500 tracking-tight">
            Edu<span class="text-gray-900 dark:text-white">Jura</span>
          </span>
        </NuxtLink>
      </template>

      <template #right>
        <div class="flex items-center gap-1 sm:gap-4">
          <!-- Proposer un logiciel -->
          <UButton
            to="#"
            variant="ghost"
            color="gray"
            class="hidden sm:flex"
          >
            <template #leading>
              <UIcon name="i-lucide-plus" class="w-5 h-5" />
            </template>
            Proposer un logiciel
          </UButton>

          <!-- Favoris -->
          <UButton
            to="#"
            variant="ghost"
            color="gray"
            class="hidden sm:flex"
          >
            <template #leading>
              <UIcon name="i-lucide-heart" class="w-5 h-5" />
            </template>
            Favoris
          </UButton>

          <!-- Connexion -->
          <UButton
            to="#"
            variant="ghost"
            color="gray"
          >
            <template #leading>
              <UIcon name="i-lucide-user" class="w-5 h-5" />
            </template>
            <span class="hidden sm:inline">Se connecter</span>
          </UButton>

          <UColorModeButton />
        </div>
      </template>
      <template #panel>
        <nav class="p-4 space-y-2">
          <NuxtLink
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <UIcon :name="link.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span class="font-medium">{{ link.label }}</span>
          </NuxtLink>
        </nav>
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
