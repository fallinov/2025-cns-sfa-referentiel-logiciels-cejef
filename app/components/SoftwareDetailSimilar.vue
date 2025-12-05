<script setup lang="ts">
import type { Software } from "~~/types/software"

interface Props {
  similarSoftware: Software[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="similarSoftware.length > 0" class="mt-12">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      Logiciels similaires
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <SoftwareCard
        v-for="software in similarSoftware"
        :key="software.id"
        :software="software"
        compact
      />
    </div>
  </div>
</template>
