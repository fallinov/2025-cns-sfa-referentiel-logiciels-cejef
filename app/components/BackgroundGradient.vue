<script setup lang="ts">
/**
 * Composant d'arrière-plan avec dégradés et formes abstraites
 * Optimisé pour mettre en valeur l'effet liquid glass des cartes
 */
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <!-- Dégradé de base -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950"></div>

    <!-- Formes abstraites animées avec effet blob -->
    <!-- Blob violet en haut à gauche -->
    <div
      class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 dark:from-purple-600/20 dark:to-pink-600/20 blur-3xl animate-blob"
    ></div>

    <!-- Blob bleu en haut à droite -->
    <div
      class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-300/30 dark:from-blue-600/20 dark:to-cyan-600/20 blur-3xl animate-blob animation-delay-2000"
    ></div>

    <!-- Blob rose en bas à gauche -->
    <div
      class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300/30 to-orange-300/30 dark:from-pink-600/20 dark:to-orange-600/20 blur-3xl animate-blob animation-delay-4000"
    ></div>

    <!-- Blob cyan en bas à droite -->
    <div
      class="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-300/30 to-blue-300/30 dark:from-cyan-600/20 dark:to-blue-600/20 blur-3xl animate-blob animation-delay-2000"
    ></div>

    <!-- Blob central pour plus de profondeur -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-300/20 dark:from-indigo-700/10 dark:to-purple-700/10 blur-3xl animate-blob animation-delay-4000"
    ></div>

    <!-- Grille subtile pour ajouter de la texture -->
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"
    ></div>

    <!-- Noise Texture for premium feel -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none bg-noise"></div>

    <!-- Overlay léger pour uniformiser -->
    <div class="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-[1px]"></div>
  </div>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>
