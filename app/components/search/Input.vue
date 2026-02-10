<script setup lang="ts">
defineProps<{
  modelValue: string
  isMobileFocused: boolean
  showSuggestions: boolean
  hasSuggestions: boolean
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
  "focus": []
  "blur": []
  "keydown": [event: KeyboardEvent]
  "clear": []
  "submit": []
  "mobileBack": []
}>()

const searchInput = ref<HTMLInputElement | null>(null)

// Typewriter Effect
const phrases = [
  "Que cherchez-vous ?",
  "Bureautique...",
  "Gestion de projet...",
  "Langues...",
  "Programmation...",
  "Canva...",
  "Code.org...",
  "Antidote...",
  "Taptouche..."
]

const { placeholderText } = useTypewriter(phrases)
const isFocused = ref(false)

const displayPlaceholder = computed(() => {
  return isFocused.value ? "Rechercher..." : placeholderText.value
})

const handleFocus = () => {
  isFocused.value = true
  emit("focus")
}

const handleBlur = () => {
  isFocused.value = false
  emit("blur")
}

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit("update:modelValue", value)
}

// Expose focus/blur methods
defineExpose({
  focus: () => searchInput.value?.focus(),
  blur: () => searchInput.value?.blur()
})
</script>

<template>
  <div
    :class="[
      isMobileFocused ? 'shrink-0 p-3 bg-white dark:bg-gray-900 flex items-center gap-3' : 'relative flex-1 transition-all duration-200'
    ]"
  >
    <!-- The Input Pill -->
    <div
      class="flex-1"
      :class="[
        'relative z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md rounded-full',
        isMobileFocused ? 'shadow-none' : ''
      ]"
    >
      <input
        id="software-search"
        ref="searchInput"
        :value="modelValue"
        type="search"
        autocomplete="off"
        :placeholder="displayPlaceholder"
        class="w-full h-16 pl-6 pr-28 text-lg text-slate-900 dark:text-slate-100 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 [&::-webkit-search-cancel-button]:appearance-none bg-transparent rounded-full"
        aria-label="Rechercher un logiciel"
        :aria-expanded="showSuggestions && hasSuggestions"
        aria-autocomplete="list"
        role="combobox"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="emit('keydown', $event)"
      />

      <!-- Right Actions (Inside Pill) -->
      <div class="absolute top-0 right-0 h-16 flex items-center pr-3 gap-3">
        <!-- Clear Button -->
        <button
          v-if="modelValue"
          type="button"
          class="flex items-center justify-center w-12 h-12 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
          aria-label="Effacer la recherche"
          @click="emit('clear')"
        >
          <UIcon name="i-lucide-x" class="w-5 h-5" />
        </button>

        <!-- Search Button (Icon) -->
        <button
          type="button"
          class="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-all shadow-sm hover:bg-slate-800 dark:hover:bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Lancer la recherche"
          @click="emit('submit')"
        >
          <UIcon name="i-lucide-search" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Close Button (Outside Pill) -->
    <button
      v-if="isMobileFocused"
      type="button"
      class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Fermer la recherche"
      @click="emit('mobileBack')"
    >
      <UIcon name="i-lucide-arrow-left" class="w-6 h-6" />
    </button>
  </div>
</template>
