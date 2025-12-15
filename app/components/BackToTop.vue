<script setup lang="ts">
/**
 * Bouton "Retour en haut" qui apparaît après un scroll vertical
 * Améliore l'UX pour les longues listes (Mobile UX - Norman: Feedback)
 */

const showButton = ref(false)
const scrollThreshold = 1000 // Afficher après 1000px de scroll

const handleScroll = () => {
  showButton.value = window.scrollY > scrollThreshold
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="showButton"
      type="button"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Retour en haut de la page"
      @click="scrollToTop"
    >
      <UIcon name="i-lucide-arrow-up" class="w-6 h-6" />
    </button>
  </Transition>
</template>
