<script setup lang="ts">
import { computed, inject } from "vue"
import EdujuraLogo from "@/components/EdujuraLogo.vue"

const route = useRoute()
const audienceStore = useAudienceStore()

const links = computed(() => [
  { label: "Référentiel logiciels", to: "/", icon: "i-lucide-layout-grid", active: route.path === "/" },
  { label: "Protection des données", to: "/protection-des-donnees", icon: "i-lucide-shield", active: route.path === "/protection-des-donnees" }
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

      <!-- Toggle SEN/CEJEF global -->
      <ClientOnly>
        <div
          v-if="audienceStore.hasChosen"
          class="flex gap-0.5 p-0.5 bg-gray-100 dark:bg-gray-800 rounded-full"
          role="group"
          aria-label="Profil"
        >
          <button
            class="px-2.5 py-1 text-xs font-semibold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="audienceStore.audience === 'sen'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
            :aria-pressed="audienceStore.audience === 'sen'"
            @click="audienceStore.setAudience('sen')"
          >
            SEN
          </button>
          <button
            class="px-2.5 py-1 text-xs font-semibold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="audienceStore.audience === 'cejef'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
            :aria-pressed="audienceStore.audience === 'cejef'"
            @click="audienceStore.setAudience('cejef')"
          >
            CEJEF
          </button>
        </div>
      </ClientOnly>

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        orientation="vertical"
        class="-mx-2.5"
        :ui="mobileMenuUi"
      />

      <!-- Toggle SEN/CEJEF dans le menu mobile -->
      <div
        v-if="audienceStore.hasChosen"
        class="flex gap-1 p-1 mt-4 bg-gray-100 dark:bg-gray-800 rounded-[var(--ui-radius)]"
        role="group"
        aria-label="Profil"
      >
        <button
          class="flex-1 px-3 py-2.5 text-base font-medium rounded-[var(--ui-radius)] transition-all"
          :class="audienceStore.audience === 'sen'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400'"
          @click="audienceStore.setAudience('sen')"
        >
          SEN
        </button>
        <button
          class="flex-1 px-3 py-2.5 text-base font-medium rounded-[var(--ui-radius)] transition-all"
          :class="audienceStore.audience === 'cejef'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400'"
          @click="audienceStore.setAudience('cejef')"
        >
          CEJEF
        </button>
      </div>
    </template>
  </UHeader>
</template>
