<script setup lang="ts">
import type { Software } from "~~/types/software"

interface Props {
  software: Software
  shape?: "slant" | "curve" | "arrow"
}

const props = withDefaults(defineProps<Props>(), {
  shape: "curve"
})

// Configuration des couleurs et labels selon le niveau de certification
const levelConfig = {
  1: {
    fill: "text-emerald-600",
    label: "Autorisé",
    icon: "i-heroicons-check-circle",
    bg: "bg-emerald-50/10 dark:bg-emerald-950/10"
  },
  2: {
    fill: "text-amber-600",
    label: "Attention",
    icon: "i-heroicons-exclamation-triangle",
    bg: "bg-amber-50/10 dark:bg-amber-950/10"
  },
  3: {
    fill: "text-rose-600",
    label: "Interdit",
    icon: "i-heroicons-x-circle",
    bg: "bg-rose-50/10 dark:bg-rose-950/10"
  }
}

const config = computed(() => {
  const level = props.software.certificationLevel || 2
  return levelConfig[level]
})

// SVG paths pour les différentes formes
const shapePath = computed(() => {
  switch (props.shape) {
    case "slant":
      return "M0,0 H1440 V100 L0,320 Z"
    case "curve":
      return "M0,0 H1440 V220 Q720,320 0,220 Z"
    case "arrow":
      return "M0,0 H1440 V160 L720,320 L0,160 Z"
    default:
      return "M0,0 H1440 V220 Q720,320 0,220 Z"
  }
})

// Configuration UI pour les badges liquid glass
// Structure adaptée à UBadge de Nuxt UI
const liquidBadgeUi = {
  root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
  label: "text-sm font-bold uppercase tracking-widest text-white"
}

// Extraire les initiales du nom (2 premières lettres)
const initials = computed(() => props.software.name.substring(0, 2).toUpperCase())
</script>

<template>
  <div
    tabindex="0"
    :class="[
      'group relative flex flex-col h-full transition-all duration-500 hover:-translate-y-2',
      'outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40',
      'rounded-[24px] overflow-hidden cursor-pointer',
      config.bg,
      'bg-gradient-to-b from-white/20 via-white/5 to-transparent dark:from-white/5 dark:via-white/0 dark:to-transparent',
      'backdrop-blur-2xl',
      'ring-1 ring-inset ring-white/50 dark:ring-white/10',
      'shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_32px_0_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
    ]"
  >
    <!-- Liquid Background Wrapper -->
    <div
      :class="[
        'absolute top-0 left-0 w-full z-0 flex flex-col transition-all duration-700 ease-in-out',
        config.fill,
        'h-[100px] group-hover:h-[140%] group-focus:h-[140%]'
      ]"
    >
      <!-- Solid Top Part -->
      <div class="w-full flex-1 bg-current">
      </div>

      <!-- Shape Bottom Part -->
      <div class="w-full h-24 shrink-0 -mt-1 relative">
        <svg
          class="absolute top-0 left-0 w-full h-full text-current block"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path fill="currentColor" :d="shapePath" />
        </svg>
      </div>
    </div>

    <!-- Header Badge -->
    <div class="absolute top-5 right-6 z-20">
      <UBadge :ui="liquidBadgeUi">
        <template #leading>
          <UIcon :name="config.icon" class="w-4 h-4 text-white" :style="{ strokeWidth: 3 }" />
        </template>
        {{ config.label }}
      </UBadge>
    </div>

    <!-- Large Icon/Logo in Header -->
    <div class="absolute top-5 left-6 z-20">
      <div class="w-14 h-14 flex items-center justify-start">
        <img
          v-if="software.logo"
          :src="`/logos/${software.logo}.svg`"
          :alt="software.name"
          class="w-full h-full object-contain drop-shadow-lg opacity-100 group-hover:scale-110 transition-all duration-300"
        />
        <UIcon
          v-else-if="software.icon"
          :name="software.icon"
          class="w-14 h-14 text-white drop-shadow-sm opacity-100 group-hover:scale-110 transition-transform duration-300"
        />
        <span
          v-else
          class="text-white font-black text-3xl drop-shadow-sm opacity-100 group-hover:scale-110 transition-transform duration-300"
        >
          {{ initials }}
        </span>
      </div>
    </div>

    <div class="p-7 flex flex-col h-full relative z-10">
      <!-- Title Section -->
      <div class="mb-6 mt-28 flex flex-col gap-1">
        <h3
          class="font-bold text-2xl text-slate-900 dark:text-white group-hover:text-white group-focus:text-white tracking-tight drop-shadow-sm transition-colors duration-300"
        >
          {{ software.name }}
        </h3>
        <p
          class="text-sm font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-white group-focus:text-white transition-colors duration-300"
        >
          {{ software.category }}
        </p>
      </div>

      <!-- Description -->
      <p
        class="text-base font-medium text-slate-700 dark:text-slate-300 group-hover:text-white group-focus:text-white mb-8 leading-relaxed flex-grow transition-colors duration-300"
      >
        {{ software.shortDescription }}
      </p>

      <!-- Footer items -->
      <div class="mt-auto flex flex-wrap gap-3">
        <!-- Badge Coût -->
        <UBadge :ui="liquidBadgeUi">
          <template #leading>
            <UIcon name="i-heroicons-wallet" class="w-4 h-4 text-white" />
          </template>
          {{ software.cost }}
        </UBadge>

        <!-- Badge Support CEJEF -->
        <UBadge v-if="software.supportedByCEJEF" :ui="liquidBadgeUi">
          <template #leading>
            <UIcon name="i-heroicons-headphones" class="w-4 h-4 text-white" />
          </template>
          Support
        </UBadge>

        <!-- Badge Formation -->
        <UBadge v-if="software.campusTraining" :ui="liquidBadgeUi">
          <template #leading>
            <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 text-white" />
          </template>
          Formation
        </UBadge>
      </div>
    </div>
  </div>
</template>
