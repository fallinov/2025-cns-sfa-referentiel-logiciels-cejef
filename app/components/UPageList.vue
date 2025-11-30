<script setup lang="ts">
defineProps<{
  divide?: boolean
}>()
</script>

<template>
  <div class="relative flex flex-col" :class="{ 'divide-y divide-gray-200 dark:divide-gray-800': divide }">
    <slot />
  </div>
</template>
