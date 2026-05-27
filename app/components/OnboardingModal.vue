<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })
const step = ref(1)

watch(isOpen, (open) => {
  if (open) step.value = 1
})

// Reset du scroll en haut quand l'utilisateur change d'étape — sinon il reste
// en bas (là où il a cliqué « Suivant ») et doit remonter manuellement pour
// lire le début de la nouvelle étape.
//
// Subtilité Nuxt UI v4 : le scroller réel est le wrapper interne <body> du
// UModal (`flex-1 overflow-y-auto p-4 sm:p-6`), pas le content avec
// `role="dialog"`. On cible donc le slot body via une class custom.
watch(step, () => {
  nextTick(() => {
    document.querySelector(".onboarding-modal-body")?.scrollTo({ top: 0, behavior: "instant" })
  })
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ body: 'onboarding-modal-body' }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <UIcon
            :name="step === 1 ? 'i-lucide-shield-check' : 'i-lucide-layout-grid'"
            class="hidden sm:block w-7 h-7 text-primary-600 shrink-0"
          />
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {{ step === 1 ? "Classification LPD" : "Comprendre une fiche" }}
          </h2>
        </div>
        <span class="text-sm text-gray-400 dark:text-gray-500">{{ step }}/2</span>
      </div>
    </template>

    <template #body>
      <!-- Étape 1 : Classification LPD -->
      <div v-if="step === 1">
        <p class="text-base text-gray-600 dark:text-gray-300 mb-2">
          Chaque logiciel est classifié selon la Loi sur la Protection des Données (LPD).
          Les couleurs indiquent le niveau d'utilisation autorisé avec les élèves.
        </p>

        <p class="text-base text-gray-500 dark:text-gray-400 mb-6">
          <strong class="text-gray-700 dark:text-gray-200">Important :</strong> l'utilisation de données sensibles (santé, religion, opinions) est interdite dans tous ces outils.
        </p>

        <div class="space-y-4">
          <div class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30">
            <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-sm">
              <UIcon name="i-lucide-check" class="w-6 h-6 text-white stroke-[3]" />
            </div>
            <div>
              <p class="font-bold text-green-800 dark:text-green-300">
                Utilisable avec vos élèves
              </p>
              <p class="text-base text-green-600 dark:text-green-400 mt-1">
                Les élèves peuvent créer un compte et utiliser l'outil avec leurs vraies données.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30">
            <div class="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0 shadow-sm">
              <UIcon name="i-lucide-alert-triangle" class="w-6 h-6 text-white stroke-[3]" />
            </div>
            <div>
              <p class="font-bold text-orange-800 dark:text-orange-300">
                Réservé aux enseignants
              </p>
              <p class="text-base text-orange-600 dark:text-orange-400 mt-1">
                Pas de données d'élèves. Les élèves peuvent l'utiliser avec un compte anonyme (adresse e-mail alias).
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
            <div class="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-sm">
              <UIcon name="i-lucide-ban" class="w-6 h-6 text-white stroke-[3]" />
            </div>
            <div>
              <p class="font-bold text-red-800 dark:text-red-300">
                Interdit
              </p>
              <p class="text-base text-red-600 dark:text-red-400 mt-1">
                Ne respecte pas les exigences de protection des données. Usage interdit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Étape 2 : Anatomie d'une fiche logiciel -->
      <div v-else>
        <p class="text-base text-gray-600 dark:text-gray-300 mb-6">
          Chaque fiche logiciel contient les informations suivantes :
        </p>

        <!-- Carte miniature annotée -->
        <div class="relative bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] border border-gray-200 dark:border-gray-700 p-5 max-w-sm mx-auto">
          <!-- Badge LPD -->
          <div class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-green-500 shadow-sm ring-2 ring-green-500">
            <UIcon name="i-lucide-check" class="w-6 h-6 text-white stroke-[3]" />
          </div>

          <!-- Logo -->
          <div class="w-12 h-12 flex items-center justify-center mb-3">
            <UIcon name="i-lucide-file-spreadsheet" class="w-full h-full text-gray-500" />
          </div>

          <!-- Titre + description -->
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Exemple Logiciel
          </h3>
          <p class="text-base text-gray-500 dark:text-gray-400 mb-3">
            Description courte du logiciel et de son usage pédagogique.
          </p>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] bg-green-500 text-white text-sm">
              <UIcon name="i-lucide-badge-check" class="w-3.5 h-3.5" />
              Approuvé CEJEF
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] bg-blue-500 text-white text-sm">
              <UIcon name="i-lucide-at-sign" class="w-3.5 h-3.5" />
              Compte edu.jura.ch
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] bg-blue-500 text-white text-sm">
              <UIcon name="i-lucide-key-round" class="w-3.5 h-3.5" />
              Compte Edulog
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--ui-radius)] bg-orange-500 text-white text-sm">
              <UIcon name="i-lucide-cake" class="w-3.5 h-3.5" />
              &lt; 16 ans : accord parents
            </span>
          </div>
        </div>

        <!-- Indication clic -->
        <p class="mt-4 text-base text-gray-500 dark:text-gray-400 text-center italic">
          Cliquez sur une fiche pour voir le détail complet : alternatives recommandées, informations pratiques et classification détaillée.
        </p>

        <!-- Légende annotée -->
        <div class="mt-6 space-y-3">
          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900 dark:text-white">
                Pastille de classification
              </p>
              <p class="text-base text-gray-500 dark:text-gray-400">
                Valide l'usage du logiciel avec les données des élèves (vert = validé, orange = vigilance, rouge = interdit).
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-[var(--ui-radius)] bg-green-500 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-badge-check" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900 dark:text-white">
                Approuvé CEJEF / SEN
              </p>
              <p class="text-base text-gray-500 dark:text-gray-400">
                Logiciel recommandé et mis en avant par le service, généralement financé par celui-ci. À utiliser en priorité parmi les alternatives disponibles.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-[var(--ui-radius)] bg-blue-500 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-at-sign" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900 dark:text-white">
                Compte edu.jura.ch
              </p>
              <p class="text-base text-gray-500 dark:text-gray-400">
                La classification LPD est validée uniquement avec le compte @edu.jura.ch (contrat institutionnel avec l'éditeur).
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-[var(--ui-radius)] bg-blue-500 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-key-round" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900 dark:text-white">
                Compte Edulog
              </p>
              <p class="text-base text-gray-500 dark:text-gray-400">
                Connexion possible via Edulog, la fédération d'identités numériques de l'éducation suisse.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-[var(--ui-radius)] bg-orange-500 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-cake" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900 dark:text-white">
                Restriction d'âge
              </p>
              <p class="text-base text-gray-500 dark:text-gray-400">
                L'utilisation de cette plateforme par des élèves de moins de 16 ans nécessite l'accord parental.
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full flex-wrap gap-2" :class="step === 2 ? 'justify-between' : 'justify-end'">
        <UButton
          v-if="step === 2"
          variant="ghost"
          color="neutral"
          @click="step = 1"
        >
          Précédent
        </UButton>

        <div class="flex flex-wrap gap-2 justify-end">
          <UButton
            v-if="step === 2"
            to="/classification"
            variant="outline"
            color="primary"
            icon="i-lucide-book-open-check"
            @click="isOpen = false"
          >
            Système de classification
          </UButton>
          <UButton
            color="primary"
            size="lg"
            @click="step === 1 ? step = 2 : isOpen = false"
          >
            {{ step === 1 ? "Suivant" : "J'ai compris" }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
