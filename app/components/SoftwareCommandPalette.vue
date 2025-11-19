<script setup lang="ts">
const { getSoftwareList, openDetail } = useSoftware()
const softwareList = getSoftwareList()

const isOpen = defineModel<boolean>("open", { default: false })

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
        openDetail(software.id)
        isOpen.value = false
      }
    }))
  }
])

// Handle keyboard shortcut (Cmd+K or Ctrl+K)
defineShortcuts({
  meta_k: {
    handler: () => {
      isOpen.value = !isOpen.value
    }
  }
})
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
    <UCommandPalette
      :groups="groups"
      placeholder="Rechercher un logiciel..."
      :autofocus="true"
      :close="false"
      class="flex-1"
    />
  </UModal>
</template>
