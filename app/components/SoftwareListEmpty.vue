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
  <!--
    Empty state conforme à la charte graphique SEN/SFP :
      - Primaire #9A211F (rouge bordeaux) sur le CTA, l'accent typographique
        et le halo
      - Succès #1D7A3F pour les ✓ des trust signals
      - Texte principal #111827 / secondaire #4B5563
      - Typographie : sans-serif système (pas d'italique serif décoratif)
  -->
  <div class="relative overflow-hidden py-8 sm:py-10 px-4">
    <div class="relative max-w-2xl mx-auto text-center">
      <!-- Titre : texte principal #111827 + accent primaire sur « le catalogue ». -->
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100 fill-mode-both"
      >
        Aidez-nous à enrichir
        <span class="block sm:inline text-[#9A211F] dark:text-[#E07F7E]">le catalogue</span>
      </h2>

      <!-- Intro courte. -->
      <p
        class="text-base sm:text-lg text-[#4B5563] dark:text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200 fill-mode-both"
      >
        Le logiciel que vous cherchez n'est pas encore référencé ?
        <strong class="text-gray-900 dark:text-white font-semibold">Cet outil se construit avec vous.</strong>
      </p>

      <!-- 3 actions partagées, chacune avec son icône — pédagogiques et engageantes. -->
      <ul
        class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both"
      >
        <li class="flex flex-col items-center text-center gap-2 px-4 py-3">
          <div
            class="w-11 h-11 rounded-full bg-[#FEF2F2] dark:bg-[#9A211F]/20 flex items-center justify-center ring-1 ring-[#9A211F]/15 dark:ring-[#9A211F]/30"
          >
            <UIcon name="i-lucide-compass" class="w-5 h-5 text-[#9A211F] dark:text-[#E07F7E]" />
          </div>
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            Partagez vos découvertes
          </span>
        </li>
        <li class="flex flex-col items-center text-center gap-2 px-4 py-3">
          <div
            class="w-11 h-11 rounded-full bg-[#FEF2F2] dark:bg-[#9A211F]/20 flex items-center justify-center ring-1 ring-[#9A211F]/15 dark:ring-[#9A211F]/30"
          >
            <UIcon name="i-lucide-message-square-text" class="w-5 h-5 text-[#9A211F] dark:text-[#E07F7E]" />
          </div>
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            Partagez vos remarques
          </span>
        </li>
        <li class="flex flex-col items-center text-center gap-2 px-4 py-3">
          <div
            class="w-11 h-11 rounded-full bg-[#FEF2F2] dark:bg-[#9A211F]/20 flex items-center justify-center ring-1 ring-[#9A211F]/15 dark:ring-[#9A211F]/30"
          >
            <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-[#9A211F] dark:text-[#E07F7E]" />
          </div>
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            Partagez vos idées
          </span>
        </li>
      </ul>

      <!-- Phrase de clôture rassurante. -->
      <p
        class="text-sm text-[#4B5563] dark:text-gray-400 mb-8 max-w-md mx-auto animate-in fade-in duration-700 delay-400 fill-mode-both"
      >
        Chaque proposition est évaluée puis ajoutée au catalogue.
      </p>

      <!-- CTA primaire #9A211F avec halo doux en arrière-plan + bouton secondaire. -->
      <div
        class="relative flex flex-col sm:flex-row gap-3 justify-center items-center mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both"
      >
        <!-- Halo derrière le CTA pour la mise en valeur -->
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[360px] h-[180px] bg-[#FEF2F2] dark:bg-[#9A211F]/15 rounded-full blur-3xl pointer-events-none -z-10"
        ></div>

        <UButton
          :to="proposeMailto"
          size="xl"
          color="primary"
          icon="i-lucide-send-horizontal"
          class="font-semibold px-6 py-3 shadow-lg shadow-[#9A211F]/20 hover:shadow-xl hover:shadow-[#9A211F]/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          Proposer un logiciel
        </UButton>
        <UButton
          v-if="hasActiveFilters"
          color="neutral"
          variant="ghost"
          size="xl"
          icon="i-lucide-rotate-ccw"
          class="font-medium"
          @click="$emit('clear')"
        >
          Réinitialiser les filtres
        </UButton>
      </div>
    </div>
  </div>
</template>
