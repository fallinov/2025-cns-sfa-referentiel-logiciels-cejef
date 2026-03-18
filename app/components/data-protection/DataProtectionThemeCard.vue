<script setup lang="ts">
import type { DataProtectionTheme } from "~~/types/data-protection"

interface Props {
  theme: DataProtectionTheme
}

defineProps<Props>()

const isExpanded = ref(false)
const openSubTheme = ref<string | null>(null)

function toggleSubTheme(id: string) {
  openSubTheme.value = openSubTheme.value === id ? null : id
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
        <h2 class="text-base font-semibold text-gray-900 dark:text-white">
          {{ theme.title }}
        </h2>
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
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {{ theme.description }}
        </p>

        <div class="space-y-1">
          <div
            v-for="sub in theme.subThemes"
            :key="sub.id"
            class="rounded-[var(--ui-radius)] border border-gray-100 dark:border-gray-700"
          >
            <button
              class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              :aria-expanded="openSubTheme === sub.id"
              @click="toggleSubTheme(sub.id)"
            >
              <UIcon :name="sub.icon" class="w-4 h-4 text-gray-500 flex-shrink-0" aria-hidden="true" />
              <span class="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ sub.title }}
              </span>
              <UIcon
                name="i-lucide-chevron-down"
                class="w-4 h-4 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': openSubTheme === sub.id }"
                aria-hidden="true"
              />
            </button>

            <div v-show="openSubTheme === sub.id" class="px-4 pb-4">
              <DataProtectionSubTheme :sub-theme="sub" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
