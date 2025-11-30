<script setup lang="ts">
defineProps<{
  label: string
  active: boolean
  icon?: string
}>()

defineEmits<{
  (e: "click"): void
}>()
</script>

<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center px-3 py-1.5 text-base gap-2 rounded-full transition-all duration-300 backdrop-blur-md font-bold uppercase tracking-widest whitespace-nowrap cursor-pointer',
      active
        ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
        : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
    ]"
    @click="$emit('click')"
  >
    <UIcon v-if="icon" :name="icon" class="w-5 h-5" />
    {{ label }}
  </button>
</template>
