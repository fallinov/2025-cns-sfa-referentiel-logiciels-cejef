<script setup lang="ts">
/**
 * Composant d'arrière-plan avec dégradés et formes abstraites
 * Optimisé pour mettre en valeur l'effet liquid glass des cartes
 */
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden bg-gray-50 dark:bg-gray-950">
    <!-- Mesh Gradient / Aurora Effect -->
    <div class="absolute inset-0 opacity-60 dark:opacity-40">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 dark:bg-purple-900/20 blur-[120px] animate-blob [animation-duration:10s]"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/30 dark:bg-blue-900/20 blur-[120px] animate-blob [animation-duration:10s] [animation-delay:2s]"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/30 dark:bg-indigo-900/20 blur-[120px] animate-blob [animation-duration:10s] [animation-delay:4s]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/30 dark:bg-cyan-900/20 blur-[120px] animate-blob [animation-duration:10s] [animation-delay:2s]"></div>
    </div>

    <!-- Grille subtile pour le côté technique -->
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.03)_2px,transparent_2px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.03)_2px,transparent_2px)] bg-[size:160px_160px]"
    ></div>

    <!-- Vignette légère -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

    <!-- Noise Texture for premium feel -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_200_200%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noiseFilter%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.65%27_numOctaves=%273%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')]"></div>
  </div>
</template>
