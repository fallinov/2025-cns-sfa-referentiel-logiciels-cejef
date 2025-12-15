<script setup lang="ts">
import { computed } from "vue"
// import useScrollspy from '@nuxt/ui'  // removed: not needed
import EdujuraLogo from "@/components/EdujuraLogo.vue"
// Define navigation items similar to the existing links
const links = computed(() => [
  { label: "Proposer un logiciel", to: "#", icon: "i-lucide-plus" },
  { label: "Favoris", to: "#", icon: "i-lucide-heart" },
  { label: "Se connecter", to: "#", icon: "i-lucide-user" }
])

// UI customization for mobile menu
const mobileMenuUi = {
  item: "text-lg py-4",
  icon: "w-6 h-6"
}

// Scrollspy not required for this header; removed related code
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <EdujuraLogo class="h-8 w-auto" />
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="links"
        variant="link"
        class="hidden lg:block"
      />
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        orientation="vertical"
        class="-mx-2.5"
        :ui="mobileMenuUi"
      />
    </template>
  </UHeader>
</template>
