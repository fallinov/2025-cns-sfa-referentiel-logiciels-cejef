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
    <!-- Header with Liquid Glass effect -->
    <UHeader
      :ui="{
        wrapper: 'bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl border-b border-white/60 dark:border-white/10 shadow-lg'
      }"
    >
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100/80 dark:bg-rose-900/30 group-hover:bg-rose-200/80 dark:group-hover:bg-rose-800/40 transition-colors">
            <UIcon
              name="i-lucide-graduation-cap"
              class="w-5 h-5 text-rose-600 dark:text-rose-400"
            />
          </div>
          <span
            class="font-bold text-gray-900 dark:text-white hidden sm:inline tracking-tight"
          >
            Référentiel Logiciels CEJEF
          </span>
          <span class="font-bold text-gray-900 dark:text-white sm:hidden tracking-tight">
            CEJEF
          </span>
        </NuxtLink>
      </template>

      <template #right>
        <div class="flex items-center gap-3">
          <SoftwareCommandPalette />
          <div class="p-1.5 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10">
            <UColorModeButton />
          </div>
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <!-- Separator with gradient -->
    <div class="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

    <!-- Footer with Liquid Glass effect -->
    <UFooter
      :ui="{
        wrapper: 'bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl border-t border-white/60 dark:border-white/10'
      }"
    >
      <template #left>
        <p class="text-sm text-gray-700 dark:text-gray-300 font-medium">
          CEJEF - Centre Jurassien d'Enseignement et de Formation •
          {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <div
          class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10"
        >
          <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span class="hidden sm:inline text-sm text-gray-700 dark:text-gray-300 font-medium">Classification LGPD</span>
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
