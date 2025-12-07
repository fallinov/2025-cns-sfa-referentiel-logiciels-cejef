<template>
  <div class="flex items-center justify-between mb-6 px-4 sm:px-0">
    <!-- Sort -->
    <div class="flex items-center gap-2">
      <UIcon name="i-lucide-arrow-up-down" class="w-5 h-5 text-gray-400 dark:text-gray-500" />
      <USelect
        v-model="sortBy"
        :items="sortOptions"
        option-attribute="label"
        value-attribute="value"
        size="xl"
        class="w-56 rounded-[var(--ui-radius)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
      />
    </div>

    <!-- View Toggle -->
    <div class="flex items-center space-x-2">
      <UButton
        :variant="viewMode === 'grid' ? 'solid' : 'outline'"
        :color="viewMode === 'grid' ? 'primary' : 'neutral'"
        icon="i-lucide-layout-grid"
        size="xl"
        :class="['rounded-[var(--ui-radius)] cursor-pointer ring-inset', viewMode !== 'grid' && 'bg-white dark:bg-gray-800']"
        aria-label="Vue grille"
        @click="viewMode = 'grid'"
      />
      <UButton
        :variant="viewMode === 'list' ? 'solid' : 'outline'"
        :color="viewMode === 'list' ? 'primary' : 'neutral'"
        icon="i-lucide-list"
        size="xl"
        :class="['rounded-[var(--ui-radius)] cursor-pointer ring-inset', viewMode !== 'list' && 'bg-white dark:bg-gray-800']"
        aria-label="Vue liste"
        @click="viewMode = 'list'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const sortBy = defineModel<string>("sortBy", { required: true })
const viewMode = defineModel<"grid" | "list">("viewMode", { required: true })

const sortOptions = [
  { label: "Classification (Meilleur)", value: "certification-asc" },
  { label: "Classification (Moins bon)", value: "certification-desc" },
  { label: "Nom (A-Z)", value: "name-asc" },
  { label: "Nom (Z-A)", value: "name-desc" },
  { label: "Date (Plus récent)", value: "date-desc" },
  { label: "Date (Plus ancien)", value: "date-asc" }
]
</script>
