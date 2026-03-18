<script setup lang="ts">
import type { DataProtectionTheme } from "~~/types/data-protection"
import { highlightText } from "~/utils/search"

interface Props {
  theme: DataProtectionTheme
}

defineProps<Props>()

const searchQuery = inject<Ref<string>>("dpSearchQuery", ref(""))

const isExpanded = ref(false)
const openSubTheme = ref<string | null>(null)

function toggleSubTheme(id: string) {
  openSubTheme.value = openSubTheme.value === id ? null : id
}

function hl(text: string) {
  return highlightText(text, searchQuery.value)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] shadow-sm overflow-hidden">
    <!-- Header cliquable -->
    <button
      class="w-full flex items-center gap-3 p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      :aria-expanded="isExpanded"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-[var(--ui-radius)] bg-primary-50 dark:bg-primary-900/30 flex-shrink-0">
        <UIcon :name="theme.icon" class="w-5 h-5 text-primary-500" aria-hidden="true" />
      </div>

      <div class="flex-1 min-w-0">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white" v-html="hl(theme.title)"></h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {{ theme.subThemes.length }} {{ theme.subThemes.length > 1 ? "sous-thèmes" : "sous-thème" }}
        </p>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <SoftwareFeatureBadge
          v-if="theme.audience === 'sen'"
          icon="i-lucide-building-2"
          label="SEN"
          size="sm"
        />
        <SoftwareFeatureBadge
          v-if="theme.audience === 'cejef'"
          icon="i-lucide-school"
          label="CEJEF"
          size="sm"
        />

        <UIcon
          name="i-lucide-chevron-down"
          class="w-5 h-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
          aria-hidden="true"
        />
      </div>
    </button>

    <!-- Body avec sous-thèmes -->
    <div v-show="isExpanded" class="border-t border-gray-100 dark:border-gray-700">
      <div class="p-4">
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4" v-html="hl(theme.description)"></p>

        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div
            v-for="sub in theme.subThemes"
            :key="sub.id"
          >
            <button
              class="w-full flex items-center gap-3 px-1 py-3 text-left hover:text-primary-600 dark:hover:text-primary-400 transition-colors group/sub"
              :aria-expanded="openSubTheme === sub.id"
              @click="toggleSubTheme(sub.id)"
            >
              <UIcon
                :name="sub.icon"
                class="w-4 h-4 text-gray-400 group-hover/sub:text-primary-500 flex-shrink-0 transition-colors"
                aria-hidden="true"
              />
              <span class="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200" v-html="hl(sub.title)"></span>
              <UIcon
                name="i-lucide-chevron-right"
                class="w-4 h-4 text-gray-300 transition-transform duration-200"
                :class="{ 'rotate-90': openSubTheme === sub.id }"
                aria-hidden="true"
              />
            </button>

            <div v-show="openSubTheme === sub.id" class="pl-8 pr-1 pb-3">
              <DataProtectionSubTheme :sub-theme="sub" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
