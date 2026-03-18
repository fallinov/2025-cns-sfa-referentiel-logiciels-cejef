<script setup lang="ts">
import type { ThemeResource, ResourceType } from "~~/types/data-protection"
import { highlightText } from "~/utils/search"

interface Props {
  resources: ThemeResource[]
}

defineProps<Props>()

const searchQuery = inject<Ref<string>>("dpSearchQuery", ref(""))

function hl(text: string) {
  return highlightText(text, searchQuery.value)
}

const iconByType: Record<ResourceType, string> = {
  link: "i-lucide-external-link",
  document: "i-lucide-file-text",
  video: "i-lucide-play-circle",
  image: "i-lucide-image",
  schema: "i-lucide-git-branch"
}
</script>

<template>
  <ul v-if="resources.length > 0" class="space-y-2">
    <li v-for="resource in resources" :key="resource.url">
      <a
        :href="resource.url"
        target="_blank"
        rel="noopener"
        class="group/link flex items-start gap-3 p-2.5 rounded-[var(--ui-radius)] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        :title="`${resource.title} (ouvre dans un nouvel onglet)`"
      >
        <UIcon
          :name="iconByType[resource.type] || iconByType.link"
          class="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400 group-hover/link:text-primary-500 transition-colors"
          aria-hidden="true"
        />
        <div class="flex-1 min-w-0">
          <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
          <span
            class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 transition-colors"
            v-html="hl(resource.title)"
          ></span>
          <span class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 block">
            {{ resource.source }}<template v-if="resource.fileSize"> · {{ resource.fileSize }}</template>
          </span>
        </div>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="w-3.5 h-3.5 flex-shrink-0 text-gray-300 group-hover/link:text-primary-500 transition-colors mt-0.5"
          aria-hidden="true"
        />
      </a>
    </li>
  </ul>
</template>
