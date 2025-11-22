<script setup lang="ts">
// Composant d'arrière-plan avec effet Aurora (blobs animés)
// Inspiré du design React Liquid Glass Cards
</script>

<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <!-- Blob violet en haut à gauche -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-400/30 dark:bg-purple-900/40 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob"
    >
    </div>

    <!-- Blob bleu en haut à droite -->
    <div
      class="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/30 dark:bg-blue-900/40 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"
    >
    </div>

    <!-- Blob émeraude en bas à gauche -->
    <div
      class="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-emerald-400/30 dark:bg-emerald-900/40 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"
    >
    </div>
  </div>
</template>
