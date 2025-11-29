<script setup lang="ts">
import type { Software } from "~~/types/software"

interface Props {
  software: Software
  shape?: "slant" | "curve" | "arrow"
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shape: "curve",
  compact: false
})

// Configuration des couleurs et labels selon le niveau de certification
const levelConfig = {
  1: {
    fill: "text-emerald-700 dark:text-emerald-600",
    label: "Autorisé",
    icon: "i-lucide-circle-check-big",
    bg: "bg-emerald-50/10 dark:bg-emerald-950/10"
  },
  2: {
    fill: "text-amber-700 dark:text-amber-600",
    label: "Attention",
    icon: "i-lucide-triangle-alert",
    bg: "bg-amber-50/10 dark:bg-amber-950/10"
  },
  3: {
    fill: "text-rose-700 dark:text-rose-600",
    label: "Interdit",
    icon: "i-lucide-circle-x",
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

// Extraire les initiales du nom (2 premières lettres)
const initials = computed(() => props.software.name.substring(0, 2).toUpperCase())
</script>

<template>
  <NuxtLink
    :to="`/logiciels/${software.id}`"
    :class="[
      'group relative flex flex-col h-full transition-all duration-500 block',
      compact ? 'hover:-translate-y-1' : 'hover:-translate-y-2',
      'outline-none focus-visible:ring-4 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2',
      compact ? 'rounded-xl' : 'rounded-[24px]',
      'overflow-hidden',
      config.bg,
      'bg-gradient-to-b from-white/40 via-white/15 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent',
      'backdrop-blur-2xl',
      'ring-1 ring-inset ring-white/50 dark:ring-white/10',
      'shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_32px_0_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
    ]"
    :aria-label="`Voir les détails de ${software.name} - ${config.label}`"
  >
    <!-- Liquid Background Wrapper -->
    <div
      :class="[
        'absolute top-0 left-0 w-full z-0 flex flex-col transition-all duration-700 ease-in-out',
        config.fill,
        compact ? 'h-[80px] group-hover:h-[120%] group-focus:h-[120%]' : 'h-[140px] group-hover:h-[140%] group-focus:h-[140%]'
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
    <div :class="compact ? 'absolute top-3 right-4 z-20' : 'absolute top-5 right-6 z-20'">
      <LiquidBadge force-white :size="compact ? 'sm' : 'md'">
        <template #leading>
          <UIcon :name="config.icon" :class="compact ? 'w-4 h-4' : 'w-5 h-5'" />
        </template>
        {{ config.label }}
      </LiquidBadge>
    </div>

    <!-- Large Icon/Logo in Header -->
    <div :class="compact ? 'absolute top-3 left-4 z-20' : 'absolute top-6 left-6 z-20'">
      <div :class="compact ? 'w-10 h-10' : 'w-16 h-16'" class="flex items-center justify-start">
        <img
          v-if="software.logo"
          :src="`/logos/${software.logo}.svg`"
          :alt="software.name"
          class="max-w-full max-h-full object-contain drop-shadow-lg opacity-100 group-hover:scale-110 transition-all duration-300"
        />
        <UIcon
          v-else-if="software.icon"
          :name="software.icon"
          :class="compact ? 'w-10 h-10' : 'w-16 h-16'"
          class="text-white drop-shadow-sm opacity-100 group-hover:scale-110 transition-transform duration-300"
        />
        <span
          v-else
          :class="compact ? 'text-2xl' : 'text-4xl'"
          class="text-white font-black drop-shadow-sm opacity-100 group-hover:scale-110 transition-transform duration-300"
        >
          {{ initials }}
        </span>
      </div>
    </div>

    <div :class="compact ? 'p-4' : 'p-7'" class="flex flex-col h-full relative z-10">
      <!-- Title Section -->
      <div :class="compact ? 'mb-3 mt-14' : 'mb-6 mt-28'" class="flex flex-col gap-1">
        <h3
          :class="[
            'font-bold tracking-tight transition-colors duration-300',
            compact ? 'text-lg' : 'text-2xl'
          ]"
          class="text-gray-900 dark:text-white group-hover:text-white group-focus:text-white drop-shadow-sm"
        >
          {{ software.name }}
        </h3>
        <p
          :class="[
            'font-semibold uppercase tracking-wider transition-colors duration-300',
            compact ? 'text-xs' : 'text-sm'
          ]"
          class="text-gray-700 dark:text-gray-300 group-hover:text-white/90 group-focus:text-white/90"
        >
          {{ software.category }}
        </p>
      </div>

      <!-- Description (hidden in compact mode) -->
      <p
        v-if="!compact"
        class="text-base font-normal mb-8 leading-relaxed flex-grow transition-colors duration-300 text-gray-800 dark:text-gray-200 group-hover:text-white/95 group-focus:text-white/95"
      >
        {{ software.shortDescription }}
      </p>

      <!-- Footer items -->
      <div :class="compact ? 'mt-auto flex flex-wrap gap-2' : 'mt-auto flex flex-wrap gap-3'">
        <!-- Badge Coût -->
        <LiquidBadge :size="compact ? 'sm' : 'md'">
          <template #leading>
            <UIcon :class="compact ? 'w-4 h-4' : 'w-5 h-5'" name="i-lucide-wallet" />
          </template>
          {{ software.cost }}
        </LiquidBadge>

        <!-- Badge Support CEJEF -->
        <LiquidBadge v-if="software.supportedByCEJEF && !compact" :size="compact ? 'sm' : 'md'">
          <template #leading>
            <UIcon :class="compact ? 'w-4 h-4' : 'w-5 h-5'" name="i-lucide-headphones" />
          </template>
          Support
        </LiquidBadge>

        <!-- Badge Formation -->
        <LiquidBadge v-if="software.campusTraining && !compact" :size="compact ? 'sm' : 'md'">
          <template #leading>
            <UIcon :class="compact ? 'w-4 h-4' : 'w-5 h-5'" name="i-lucide-graduation-cap" />
          </template>
          Formation
        </LiquidBadge>
      </div>
    </div>
  </NuxtLink>
</template>
