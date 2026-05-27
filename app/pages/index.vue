<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import SoftwarePageHeader from "~/components/software/SoftwarePageHeader.vue"
import SoftwareListContainer from "~/components/software/SoftwareListContainer.vue"

const store = useSoftwareStore()
const {
  handleCategoryFilter,
  handleActivityFilter
} = store

// Handle URL Query Parameters for filtering
const route = useRoute()

defineOptions({
  name: "IndexPage"
})

onMounted(() => {
  if (route.query.category) {
    handleCategoryFilter(route.query.category as string)
  } else if (route.query.activity) {
    handleActivityFilter(route.query.activity as string)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8">
      <div class="mb-6 px-4 sm:px-0">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Référentiel logiciels
        </h1>
        <p class="mt-2 text-base lg:text-lg text-gray-600 dark:text-gray-400">
          Logiciels pédagogiques classifiés selon la protection des données (LPD).
        </p>
        <NuxtLink
          to="/classification"
          class="mt-3 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:gap-2.5 transition-all"
        >
          <UIcon name="i-lucide-book-open-check" class="w-4 h-4" />
          Comprendre le système de classification
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <SoftwarePageHeader />
      <SoftwareListContainer />
    </UContainer>
    <BackToTop />
  </div>
</template>
