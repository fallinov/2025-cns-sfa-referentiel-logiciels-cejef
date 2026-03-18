<script setup lang="ts">
import { computed, inject } from "vue"
import EdujuraLogo from "@/components/EdujuraLogo.vue"

const links = computed(() => [
  { label: "Protection des données", to: "/protection-des-donnees", icon: "i-lucide-shield" },
  { label: "Proposer un logiciel", to: "#", icon: "i-lucide-plus" },
  { label: "Favoris", to: "#", icon: "i-lucide-heart" },
  { label: "Se connecter", to: "#", icon: "i-lucide-user" }
])

const mobileMenuUi = {
  item: "text-lg py-4",
  icon: "w-6 h-6"
}

const openOnboarding = inject<() => void>("openOnboarding")
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
      <UTooltip text="Comprendre les couleurs">
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-circle-help"
          aria-label="Comprendre les couleurs LGPD"
          @click="openOnboarding?.()"
        />
      </UTooltip>
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
