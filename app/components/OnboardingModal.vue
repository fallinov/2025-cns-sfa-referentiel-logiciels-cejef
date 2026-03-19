<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ content: 'max-h-[80vh] overflow-y-auto' }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-shield-check" class="hidden sm:block w-7 h-7 text-primary-600 shrink-0" />
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Classification LGPD
        </h2>
      </div>
    </template>

    <template #body>
      <p class="text-base text-gray-600 dark:text-gray-300 mb-4">
        Chaque logiciel est classifié selon la Loi sur la Protection des Données (LGPD).
        Les couleurs indiquent le niveau d'utilisation autorisé avec les élèves.
      </p>

      <p class="text-base text-gray-600 dark:text-gray-300 mb-6 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-[var(--ui-radius)]">
        Ce catalogue recense uniquement des <strong>logiciels à usage pédagogique</strong>.
        L'utilisation de <strong>données sensibles</strong> (santé, religion, opinions)
        <strong>est interdite</strong> dans tous ces outils.
      </p>

      <div class="space-y-4">
        <div class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30">
          <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-md">
            <UIcon name="i-lucide-check" class="w-6 h-6 text-white stroke-[3]" />
          </div>
          <div>
            <p class="font-bold text-green-800 dark:text-green-300">
              Utilisable avec vos élèves
            </p>
            <p class="text-base text-green-700 dark:text-green-400 mt-1">
              Les élèves peuvent créer un compte et utiliser l'outil avec leurs vraies données.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30">
          <div class="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0 shadow-md">
            <UIcon name="i-lucide-alert-triangle" class="w-6 h-6 text-white stroke-[3]" />
          </div>
          <div>
            <p class="font-bold text-orange-800 dark:text-orange-300">
              Réservé aux enseignants
            </p>
            <p class="text-base text-orange-700 dark:text-orange-400 mt-1">
              Pas de données d'élèves. Utilisation possible avec un compte anonyme (alias).
            </p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
          <div class="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-md">
            <UIcon name="i-lucide-ban" class="w-6 h-6 text-white stroke-[3]" />
          </div>
          <div>
            <p class="font-bold text-red-800 dark:text-red-300">
              Interdit
            </p>
            <p class="text-base text-red-700 dark:text-red-400 mt-1">
              Ne respecte pas les exigences de protection des données. Usage interdit.
            </p>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          color="primary"
          size="lg"
          @click="isOpen = false"
        >
          J'ai compris
        </UButton>
      </div>
    </template>
  </UModal>
</template>
