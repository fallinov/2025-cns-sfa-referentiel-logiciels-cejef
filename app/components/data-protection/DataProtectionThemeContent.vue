<script setup lang="ts">
import type { DataProtectionTheme } from "~~/types/data-protection"
import { highlightText } from "~/utils/search"

interface Props {
  theme: DataProtectionTheme
}

defineProps<Props>()

const searchQuery = inject<Ref<string>>("dpSearchQuery", ref(""))

function hl(text: string) {
  return highlightText(text, searchQuery.value)
}
</script>

<template>
  <div>
    <!-- Header du thème -->
    <div class="flex items-start gap-3 mb-6">
      <div class="flex items-center justify-center w-10 h-10 rounded-[var(--ui-radius)] bg-primary-50 dark:bg-primary-900/30 flex-shrink-0 mt-0.5">
        <UIcon :name="theme.icon" class="w-5 h-5 text-primary-500" aria-hidden="true" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white" v-html="hl(theme.title)"></h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1" v-html="hl(theme.description)"></p>
      </div>
    </div>

    <!-- Sous-thèmes -->
    <div class="space-y-3">
      <div
        v-for="sub in theme.subThemes"
        :key="sub.id"
        class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] shadow-sm p-5 border border-gray-100 dark:border-gray-700/50"
      >
        <div class="flex items-center gap-2.5 mb-2">
          <UIcon :name="sub.icon" class="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
          <h3 class="text-base font-semibold text-gray-900 dark:text-white" v-html="hl(sub.title)"></h3>
        </div>

        <p
          class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
          v-html="hl(sub.description)"
        ></p>

        <DataProtectionLinkList
          v-if="sub.resources.length > 0"
          :resources="sub.resources"
          class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50"
        />
      </div>
    </div>
  </div>
</template>
