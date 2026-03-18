<script setup lang="ts">
import type { DataProtectionSubTheme } from "~~/types/data-protection"
import { highlightText } from "~/utils/search"

interface Props {
  subTheme: DataProtectionSubTheme
}

defineProps<Props>()

const searchQuery = inject<Ref<string>>("dpSearchQuery", ref(""))

function hl(text: string) {
  return highlightText(text, searchQuery.value)
}
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" v-html="hl(subTheme.description)"></p>

    <div v-if="subTheme.audience !== 'both'" class="flex gap-2">
      <SoftwareFeatureBadge
        v-if="subTheme.audience === 'sen'"
        icon="i-lucide-building-2"
        label="SEN"
        size="sm"
      />
      <SoftwareFeatureBadge
        v-if="subTheme.audience === 'cejef'"
        icon="i-lucide-school"
        label="CEJEF"
        size="sm"
      />
    </div>

    <DataProtectionLinkList :resources="subTheme.resources" />
  </div>
</template>
