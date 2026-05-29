<script setup lang="ts">
import { computed, inject } from "vue"
import EdujuraLogo from "@/components/EdujuraLogo.vue"

const route = useRoute()
const audienceStore = useAudienceStore()

const links = computed(() => [
  { label: "Référentiel logiciels", to: "/", icon: "i-lucide-layout-grid", active: route.path === "/" },
  { label: "Protection des données", to: "/protection-des-donnees", icon: "i-lucide-shield", active: route.path === "/protection-des-donnees" }
])

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
          aria-label="Comprendre les couleurs LPD"
          @click="openOnboarding?.()"
        />
      </UTooltip>

      <!-- Toggle SEN/CEJEF global -->
      <ClientOnly>
        <div
          v-if="audienceStore.hasChosen"
          class="hidden lg:flex gap-0.5 p-0.5 bg-gray-100 dark:bg-gray-800 rounded-full"
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
            SFP
          </button>
        </div>
      </ClientOnly>

      <UColorModeButton />
    </template>

    <template #body>
      <nav aria-label="Navigation mobile" class="-mx-4">
        <ul class="divide-y divide-gray-100 dark:divide-gray-800">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="flex items-center gap-4 px-4 py-5 text-lg font-medium transition-colors"
              :class="link.active
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/10'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'"
              :aria-current="link.active ? 'page' : undefined"
            >
              <UIcon :name="link.icon" class="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Toggle SEN/CEJEF dans le menu mobile -->
      <div
        v-if="audienceStore.hasChosen"
        class="flex gap-1 p-1 mt-6 bg-gray-100 dark:bg-gray-800 rounded-[var(--ui-radius)]"
        role="group"
        aria-label="Profil"
      >
        <button
          class="flex-1 px-3 py-3 text-base font-medium rounded-[var(--ui-radius)] transition-all"
          :class="audienceStore.audience === 'sen'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400'"
          @click="audienceStore.setAudience('sen')"
        >
          SEN
        </button>
        <button
          class="flex-1 px-3 py-3 text-base font-medium rounded-[var(--ui-radius)] transition-all"
          :class="audienceStore.audience === 'cejef'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400'"
          @click="audienceStore.setAudience('cejef')"
        >
          SFP
        </button>
      </div>
    </template>
  </UHeader>
</template>
