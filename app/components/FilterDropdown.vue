<script setup lang="ts">
const props = defineProps<{
  modelValue: any[]
  items: any[]
  label: string
  icon: string
  valueAttribute?: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: any[]): void
}>()

const selected = computed({
  get: () => props.modelValue,
  set: value => emit("update:modelValue", value)
})
</script>

<template>
  <USelectMenu
    v-model="selected"
    :items="items"
    multiple
    :searchable="false"
    :icon="icon"
    trailing-icon="i-lucide-chevron-down"
    :value-attribute="valueAttribute"
    :ui="{
      base: 'hover:bg-transparent dark:hover:bg-transparent',
      leadingIcon: 'text-inherit dark:text-inherit',
      trailingIcon: 'text-inherit dark:text-inherit',
      input: 'hidden'
    }"
    :class="[
      'ring-0 shadow-none inline-flex items-center px-3 py-1.5 text-base gap-2 rounded-full transition-all duration-300 backdrop-blur-md font-bold uppercase tracking-widest',
      selected.length > 0
        ? 'bg-primary-500/90 text-white border border-primary-400 hover:bg-primary-500'
        : 'bg-white/30 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/40 dark:border-white/20 hover:bg-white/50 hover:border-white/60 dark:hover:bg-white/20'
    ]"
    :popper="{ placement: 'bottom-start', strategy: 'fixed' }"
  >
    <template #default>
      <span class="truncate">{{ label }}</span>
      <span v-if="selected.length > 0" class="ml-0.5">({{ selected.length }})</span>
    </template>
  </USelectMenu>
</template>
