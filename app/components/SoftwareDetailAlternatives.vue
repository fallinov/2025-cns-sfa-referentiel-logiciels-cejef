<script setup lang="ts">
import type { Software } from "~~/types/software"

interface Props {
  alternatives: Software[]
  softwareName?: string
}

const props = defineProps<Props>()

// Mailto pré-rempli pour proposer une alternative au logiciel courant.
// Tant qu'on n'a pas de boîte générique CNS, on cible steve.fallet@jura.ch.
const proposeAlternativeMailto = computed(() => {
  const subject = `Proposition d'alternative pour ${props.softwareName ?? "un logiciel"}`
  const body = `Bonjour,

Je souhaite proposer une alternative au logiciel « ${props.softwareName ?? ""} » dans le référentiel CEJEF :

Nom de l'alternative :
URL du site officiel :
Pourquoi cette alternative est pertinente :

Merci !`
  return `mailto:steve.fallet@jura.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
</script>

<template>
  <UCard class="bg-white dark:bg-gray-800 shadow-sm rounded-[var(--ui-radius)]">
    <div class="flex items-center gap-3 mb-2">
      <UIcon name="i-lucide-sparkles" class="w-7 h-7 text-gray-900 dark:text-gray-100" />
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
        Logiciels alternatifs recommandés
      </h3>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
      Outils validés (niveau vert ou orange) à considérer en remplacement.
    </p>

    <div v-if="alternatives.length" class="space-y-2">
      <NuxtLink
        v-for="alt in alternatives"
        :key="alt.id"
        :to="`/logiciels/${alt.id}`"
        class="flex items-center gap-4 group p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
      >
        <SoftwareLogoWithBadge :software="alt" size="sm" />
        <div>
          <div class="font-semibold text-gray-900 dark:text-white transition-colors">
            {{ alt.name }}
          </div>
          <div class="text-xs text-gray-500 truncate max-w-[150px]">
            {{ alt.shortDescription }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state : pas d'« il n'y a rien », à la place un CTA pour signaler une alternative
         que le visiteur connaîtrait (recommandation UX NN/g : transformer un vide en action). -->
    <div v-else class="text-center py-2">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Vous connaissez une alternative pertinente à ce logiciel ?
      </p>
      <UButton
        :to="proposeAlternativeMailto"
        color="primary"
        variant="outline"
        size="md"
        icon="i-lucide-send"
      >
        Proposer une alternative
      </UButton>
    </div>
  </UCard>
</template>
