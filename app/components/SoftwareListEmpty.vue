<template>
  <div class="text-center py-16">
    <UIcon
      name="i-lucide-search-x"
      class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
    />
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Aucun logiciel trouvé
    </h3>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Essayez de modifier vos critères de recherche ou de supprimer des filtres
    </p>
    <UButton
      v-if="hasActiveFilters"
      color="primary"
      @click="$emit('clear')"
    >
      Réinitialiser les filtres
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hasActiveFilters: boolean
}>()

defineEmits<{
  clear: []
}>()
</script>
