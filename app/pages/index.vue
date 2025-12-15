<script setup lang="ts">
import { useSoftwareStore } from "~/stores/software"
import SoftwarePageHeader from "~/components/software/SoftwarePageHeader.vue"
import SoftwareListContainer from "~/components/software/SoftwareListContainer.vue"

const store = useSoftwareStore()
const {
  handleCategoryFilter,
  handleDisciplineFilter,
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
  } else if (route.query.discipline) {
    handleDisciplineFilter(route.query.discipline as string)
  } else if (route.query.activity) {
    handleActivityFilter(route.query.activity as string)
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-gray-950">
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8">
      <SoftwarePageHeader />
      <SoftwareListContainer />
    </UContainer>
    <BackToTop />
  </div>
</template>
