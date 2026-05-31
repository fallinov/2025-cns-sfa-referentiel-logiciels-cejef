<script setup lang="ts">
const props = defineProps<{
  hasActiveFilters: boolean
  searchQuery?: string
}>()

defineEmits<{
  clear: []
}>()

const audienceStore = useAudienceStore()

// Cible mailto : audience SEN → SEN, audience SFP → SFP (en attendant
// des boîtes génériques fournies par le SDI, on cible Steve Fallet).
const contactService = computed(() => audienceStore.audience === "SFP" ? "SFP" : "SEN")

const proposeMailto = computed(() => {
  const trimmed = props.searchQuery?.trim() ?? ""
  const subject = `Proposition de logiciel à ajouter au référentiel (${contactService.value})`
  const body = `Bonjour,

Je souhaite proposer un logiciel à évaluer pour l'ajouter au référentiel ${contactService.value} :

Nom du logiciel : ${trimmed}
URL du site officiel :
Usage pédagogique :
Public cible :

Remarques :

Merci !`
  return `mailto:steve.fallet@jura.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
</script>

<template>
  <div class="text-center py-16 px-4">
    <UIcon
      name="i-lucide-search-x"
      class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
    />
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Aucun logiciel ne correspond à votre recherche
    </h3>
    <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
      Le logiciel que vous cherchez n'est pas encore référencé ?
      <strong>Cet outil se construit avec vous</strong> — proposez-nous votre découverte, vos idées
      ou vos remarques, nous l'évaluerons et l'ajouterons au catalogue.
    </p>

    <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <UButton
        :to="proposeMailto"
        color="primary"
        size="lg"
        icon="i-lucide-send"
        class="font-semibold"
      >
        Proposer un logiciel
      </UButton>
      <UButton
        v-if="hasActiveFilters"
        color="neutral"
        variant="outline"
        size="lg"
        icon="i-lucide-rotate-ccw"
        @click="$emit('clear')"
      >
        Réinitialiser les filtres
      </UButton>
    </div>
  </div>
</template>
