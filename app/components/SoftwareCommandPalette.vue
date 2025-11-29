<script setup lang="ts">
/**
 * SoftwareCommandPalette Component
 *
 * IMPORTANT: UModal avec slot #content nécessite :open au lieu de v-model
 *
 * Le v-model ne fonctionne PAS correctement quand on utilise le slot #content
 * sans trigger dans le slot par défaut. Il faut utiliser :open et @update:open
 * explicitement pour gérer l'état du modal.
 *
 * @see https://ui.nuxt.com/docs/components/modal
 */
const { getSoftwareList } = useSoftware()
const softwareList = getSoftwareList()
const router = useRouter()

const isOpen = ref(false)

// Detect if user is on Mac (client-side only)
const isMac = computed(() => {
  if (import.meta.client) {
    return /Mac|iPod|iPhone|iPad/.test(navigator.platform)
  }
  return true // Default to Mac icon for SSR
})

// Keyboard shortcut display based on OS
const shortcutKeys = computed(() => {
  return isMac.value ? ["⌘", "K"] : ["Ctrl", "K"]
})

// Transform software list into command palette groups
const groups = computed(() => [
  {
    id: "software",
    label: "Logiciels disponibles",
    items: softwareList.map(software => ({
      id: software.id,
      label: software.name,
      suffix: software.category,
      icon: "i-lucide-package",
      onSelect: () => {
        router.push(`/logiciels/${software.id}`)
        isOpen.value = false
      }
    }))
  }
])

// Handle keyboard shortcut (Cmd+K or Ctrl+K)
defineShortcuts({
  meta_k: () => {
    isOpen.value = !isOpen.value
  }
})
</script>

<template>
  <div>
    <UButton
      icon="i-lucide-search"
      color="neutral"
      variant="outline"
      aria-label="Rechercher un logiciel"
      @click="isOpen = true"
    >
      <span class="hidden sm:inline">Rechercher</span>
      <template #trailing>
        <UKbd v-for="key in shortcutKeys" :key="key">
          {{ key }}
        </UKbd>
      </template>
    </UButton>

    <UModal
      :open="isOpen"
      title="Rechercher un logiciel"
      description="Recherchez parmi tous les logiciels disponibles"
      :ui="{
        content: 'p-0 w-full max-w-3xl',
        body: 'p-0',
        header: 'sr-only',
        description: 'sr-only'
      }"
      @update:open="(value) => (isOpen = value)"
    >
      <template #content>
        <UCommandPalette
          :groups="groups"
          placeholder="Rechercher un logiciel..."
          class="h-96"
        />
      </template>
    </UModal>
  </div>
</template>
