<script setup>
const config = useRuntimeConfig()

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  htmlAttrs: {
    lang: "fr"
  }
})

const title = "Référentiel Logiciels SEN / SFP"
const description
  = "Référentiel de logiciels pédagogiques du Canton du Jura (SEN et SFP) avec classification LPD (Loi sur la protection des données)"

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: "summary_large_image"
})

const feedbackUrl = "https://github.com/fallinov/2025-cns-sfa-referentiel-logiciels-cejef/issues/new?template=feedback.yml"

const audienceStore = useAudienceStore()

const showOnboarding = ref(false)

const openOnboarding = () => {
  showOnboarding.value = true
}

onMounted(() => {
  audienceStore.init()
})

// La modale LGPD s'affiche après le choix SEN/CEJEF (pas en même temps)
watch(() => audienceStore.hasChosen, (chosen) => {
  if (chosen) {
    const done = localStorage.getItem("referentiel-onboarding-done")
    if (!done) {
      nextTick(() => {
        showOnboarding.value = true
      })
    }
  }
}, { immediate: true })

watch(showOnboarding, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    localStorage.setItem("referentiel-onboarding-done", "true")
  }
})

provide("openOnboarding", openOnboarding)
</script>

<template>
  <UApp class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <!-- Écran de choix SEN/CEJEF au premier accès -->
    <ClientOnly>
      <AudienceChoiceScreen v-if="!audienceStore.hasChosen" />
    </ClientOnly>

    <AppHeader />
    <OnboardingModal v-model="showOnboarding" />

    <UMain>
      <NuxtPage v-slot="{ Component }">
        <KeepAlive include="IndexPage,DataProtectionPage" :max="10">
          <Component :is="Component" />
        </KeepAlive>
      </NuxtPage>
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Une application réalisée par le SEN et le SFP • {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="/classification"
          variant="ghost"
          color="neutral"
          size="sm"
          icon="i-lucide-book-open-check"
        >
          Système de classification
        </UButton>
        <UButton
          to="/charte-graphique"
          variant="ghost"
          color="neutral"
          size="sm"
          icon="i-lucide-palette"
        >
          Charte graphique
        </UButton>
        <UButton
          :to="feedbackUrl"
          target="_blank"
          variant="ghost"
          color="neutral"
          size="sm"
          icon="i-lucide-message-circle"
          trailing-icon="i-lucide-external-link"
        >
          Donner un retour
        </UButton>
        <span class="text-xs text-gray-400 dark:text-gray-500">
          v{{ config.public.appVersion }}
        </span>
      </template>
    </UFooter>
  </UApp>
</template>
