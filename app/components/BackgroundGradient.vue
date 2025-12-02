<script setup lang="ts">
/**
 * Composant d'arrière-plan avec dégradés et formes abstraites
 * Optimisé pour mettre en valeur l'effet liquid glass des cartes
 */
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden bg-gray-200 dark:bg-gray-900">
    <!-- Grille large et marquée -->
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"
    ></div>

    <!-- Vignette pour assombrir les bords et donner du focus au centre -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

    <!-- Noise Texture for texture -->
    <div class="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-noise"></div>
  </div>
</template>

<style scoped>
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>
