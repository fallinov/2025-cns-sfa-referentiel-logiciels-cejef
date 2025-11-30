<script setup lang="ts">
defineProps<{
  to?: string
  target?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    :target="target"
    class="group relative flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
  >
    <div class="flex-1 min-w-0">
      <slot name="body"></slot>
      <slot></slot>
    </div>

    <UIcon
      name="i-lucide-chevron-right"
      class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
    />
  </NuxtLink>
</template>
