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
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 dark:bg-purple-900/20 blur-[120px] animate-blob"></div>
        <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/30 dark:bg-blue-900/20 blur-[120px] animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/30 dark:bg-indigo-900/20 blur-[120px] animate-blob animation-delay-4000"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/30 dark:bg-cyan-900/20 blur-[120px] animate-blob animation-delay-2000"></div>
    </div>

    <!-- Grille subtile pour le côté technique -->
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.03)_2px,transparent_2px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.03)_2px,transparent_2px)] bg-[size:160px_160px]"
    ></div>

    <!-- Vignette légère -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

    <!-- Noise Texture for premium feel -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none bg-noise"></div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 10s infinite;
}

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
