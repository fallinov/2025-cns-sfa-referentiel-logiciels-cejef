<script setup lang="ts">
import { softwareList } from "~/data/software-list"

// Utiliser les 6 premiers logiciels pour la démo
const demoSoftware = softwareList.slice(0, 6)
</script>

<template>
  <div class="min-h-screen relative">
    <!-- Background Aurora Effect -->
    <BackgroundAurora />

    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- Header -->
      <header class="sticky top-0 z-50 border-b border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <UIcon name="i-heroicons-rectangle-stack" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Liquid Glass Cards - Demo
              </h1>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                CEJEF • Design Prototype
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <UButton
              to="/"
              color="neutral"
              variant="ghost"
              icon="i-heroicons-arrow-left"
              label="Retour"
            />
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Effet Liquid Glass
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-400">
            Cartes transparentes avec animation liquide au survol. L'arrière-plan Aurora met en valeur l'effet de transparence.
          </p>
        </div>

        <!-- Grid System -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <div
            v-for="software in demoSoftware"
            :key="software.id"
            class="w-full max-w-[450px] h-full"
          >
            <SoftwareCard :software="software" />
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-md mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-base text-slate-600 dark:text-slate-400 font-medium">
            © 2024 CEJEF — Centre de formation
          </p>
          <div class="flex gap-6 text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">
            <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Confidentialité</a>
            <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
