<script setup lang="ts">
import type { DataProtectionTheme } from "~~/types/data-protection"
import { highlightText } from "~/utils/search"

interface Props {
  theme: DataProtectionTheme
  prevTheme?: DataProtectionTheme | null
  nextTheme?: DataProtectionTheme | null
}

defineProps<Props>()

const emit = defineEmits<{
  navigate: [themeId: string]
}>()

const searchQuery = inject<Ref<string>>("dpSearchQuery", ref(""))

function hl(text: string) {
  return highlightText(text, searchQuery.value)
}
</script>

<template>
  <div>
    <!-- Header du thème -->
    <div class="flex items-start gap-4 mb-8">
      <div class="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-[var(--ui-radius)] bg-primary-50 dark:bg-primary-900/30 flex-shrink-0 mt-1">
        <UIcon :name="theme.icon" class="w-5 h-5 lg:w-6 lg:h-6 text-primary-500" aria-hidden="true" />
      </div>
      <div>
        <!-- eslint-disable vue/no-v-html -- données statiques, highlight uniquement -->
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white" v-html="hl(theme.title)"></h2>
        <p class="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-2" v-html="hl(theme.description)"></p>
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </div>

    <!-- Sous-thèmes -->
    <div class="space-y-4 lg:space-y-5">
      <div
        v-for="sub in theme.subThemes"
        :key="sub.id"
        class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] border border-gray-100 dark:border-gray-700/50 p-5 lg:p-6"
      >
        <div class="flex items-center gap-3 mb-3">
          <UIcon :name="sub.icon" class="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
          <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
          <h3 class="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white" v-html="hl(sub.title)"></h3>
        </div>

        <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
        <p
          class="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed lg:leading-loose max-w-prose"
          v-html="hl(sub.description)"
        ></p>

        <DataProtectionLinkList
          v-if="sub.resources.length > 0"
          :resources="sub.resources"
          class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50"
        />
      </div>
    </div>

    <!-- Navigation précédent / suivant -->
    <nav
      class="flex items-center justify-between mt-10 pt-6 border-t border-gray-200 dark:border-gray-700"
      aria-label="Navigation entre thèmes"
    >
      <button
        v-if="prevTheme"
        class="group flex items-center gap-2 px-4 py-3 rounded-[var(--ui-radius)] text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        @click="emit('navigate', prevTheme.id)"
      >
        <UIcon name="i-lucide-arrow-left" class="w-4 h-4" aria-hidden="true" />
        <span>{{ prevTheme.shortTitle }}</span>
      </button>
      <div v-else></div>

      <button
        v-if="nextTheme"
        class="group flex items-center gap-2 px-4 py-3 rounded-[var(--ui-radius)] text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        @click="emit('navigate', nextTheme.id)"
      >
        <span>{{ nextTheme.shortTitle }}</span>
        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" aria-hidden="true" />
      </button>
      <div v-else></div>
    </nav>
  </div>
</template>
