<template>
  <div class="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4 px-4 sm:px-0">
    <!-- Sort -->
    <div class="flex items-center gap-2">
      <UIcon name="i-lucide-arrow-up-down" class="w-5 h-5 text-gray-400 dark:text-gray-500" />
      <USelect
        v-model="sortBy"
        :items="sortOptions"
        option-attribute="label"
        value-attribute="value"
        size="xl"
        class="w-56"
      />
    </div>

    <!-- View Toggle -->
    <div class="flex items-center gap-2">
      <button
        type="button"
        :class="[
          'inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm',
          viewMode === 'grid'
            ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
            : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
        ]"
        aria-label="Vue grille"
        @click="viewMode = 'grid'"
      >
        <UIcon name="i-lucide-layout-grid" class="w-5 h-5" />
      </button>
      <button
        type="button"
        :class="[
          'inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm',
          viewMode === 'list'
            ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
            : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
        ]"
        aria-label="Vue liste"
        @click="viewMode = 'list'"
      >
        <UIcon name="i-lucide-list" class="w-5 h-5" />
      </button>
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
