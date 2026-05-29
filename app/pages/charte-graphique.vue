<script setup lang="ts">
defineOptions({
  name: "CharteGraphiquePage"
})

useSeoMeta({
  title: "Charte graphique — Applications SEN / SFP",
  description: "Charte graphique officielle pour les applications du SEN (Service de l'Enseignement) et du SFP (Service de la Formation Postobligatoire)."
})

// Palette interface
const interfaceColors = [
  { name: "Fond principal", hex: "#FFFFFF", swatch: "bg-white border border-gray-200", textClass: "text-gray-900" },
  { name: "Fond secondaire", hex: "#F9FAFB", swatch: "bg-gray-50 border border-gray-200", textClass: "text-gray-900" },
  { name: "Bordure / gris UI", hex: "#E5E7EB", swatch: "bg-gray-200", textClass: "text-gray-900" },
  { name: "Texte secondaire", hex: "#4B5563", swatch: "bg-[#4b5563]", textClass: "text-white" },
  { name: "Texte principal", hex: "#111827", swatch: "bg-[#111827]", textClass: "text-white" },
  { name: "Primaire / marque", hex: "#9A211F", swatch: "bg-[#9a211f]", textClass: "text-white" }
]

// Palette etats
const stateColors = [
  { name: "Information", hex: "#2563EB", bg: "#EFF6FF", swatch: "bg-[#2563eb]", softSwatch: "bg-[#eff6ff]" },
  { name: "Succes", hex: "#1D7A3F", bg: "#ECFDF3", swatch: "bg-[#1d7a3f]", softSwatch: "bg-[#ecfdf3]" },
  { name: "Avertissement", hex: "#946017", bg: "#FFFBEB", swatch: "bg-[#946017]", softSwatch: "bg-[#fffbeb]" },
  { name: "Erreur", hex: "#9A211F", bg: "#FEF2F2", swatch: "bg-[#9a211f]", softSwatch: "bg-[#fef2f2]" }
]

// Contrastes WCAG
const contrastTable = [
  { fg: "#111827", bg: "#FFFFFF", label: "Texte principal", ratio: "16.2:1", level: "AAA" },
  { fg: "#4B5563", bg: "#FFFFFF", label: "Texte secondaire", ratio: "7.4:1", level: "AAA" },
  { fg: "#9A211F", bg: "#FFFFFF", label: "Primaire", ratio: "7.5:1", level: "AAA" },
  { fg: "#1D7A3F", bg: "#FFFFFF", label: "Succes", ratio: "5.4:1", level: "AA" },
  { fg: "#946017", bg: "#FFFFFF", label: "Avertissement", ratio: "5.0:1", level: "AA" },
  { fg: "#2563EB", bg: "#FFFFFF", label: "Information", ratio: "4.6:1", level: "AA" },
  { fg: "#FFFFFF", bg: "#9A211F", label: "Blanc sur primaire / erreur", ratio: "7.5:1", level: "AAA" },
  { fg: "#FFFFFF", bg: "#1D7A3F", label: "Blanc sur succes", ratio: "5.4:1", level: "AA" },
  { fg: "#FFFFFF", bg: "#946017", label: "Blanc sur avertissement", ratio: "5.0:1", level: "AA" },
  { fg: "#FFFFFF", bg: "#2563EB", label: "Blanc sur information", ratio: "4.6:1", level: "AA" }
]

// Typographie
const typoScale = [
  { name: "Titre de page", size: "32px", weight: "Bold (700)", cssClass: "text-3xl font-bold" },
  { name: "Titre de section", size: "24px", weight: "Bold (700)", cssClass: "text-2xl font-bold" },
  { name: "Sous-titre", size: "20px", weight: "Semibold (600)", cssClass: "text-xl font-semibold" },
  { name: "Texte courant", size: "16px", weight: "Normal (400)", cssClass: "text-base" },
  { name: "Texte secondaire", size: "14px", weight: "Normal (400)", cssClass: "text-sm" },
  { name: "Micro-label", size: "12px", weight: "Medium (500)", cssClass: "text-xs font-medium" }
]

// Espacement
const spacingScale = [
  { token: "micro", value: "4px" },
  { token: "xs", value: "8px" },
  { token: "sm", value: "12px" },
  { token: "md", value: "16px" },
  { token: "lg", value: "24px" },
  { token: "xl", value: "32px" },
  { token: "2xl", value: "48px" }
]

// Rayons
const radiusScale = [
  { element: "Champs, boutons, badges", value: "8px" },
  { element: "Cartes, panneaux", value: "12px" },
  { element: "Dialogs, blocs majeurs", value: "16px" },
  { element: "Toggles, pilules", value: "arrondi complet" }
]

// Sidebar sections
const sections = [
  { id: "palette", label: "Palette", icon: "i-lucide-palette" },
  { id: "etats", label: "Etats", icon: "i-lucide-circle-alert" },
  { id: "accessibilite", label: "Accessibilite", icon: "i-lucide-eye" },
  { id: "typographie", label: "Typographie", icon: "i-lucide-type" },
  { id: "boutons", label: "Boutons", icon: "i-lucide-mouse-pointer-click" },
  { id: "formulaires", label: "Formulaires", icon: "i-lucide-text-cursor-input" },
  { id: "cartes", label: "Cartes", icon: "i-lucide-square" },
  { id: "badges", label: "Badges", icon: "i-lucide-tag" },
  { id: "icones", label: "Icones", icon: "i-lucide-smile" },
  { id: "espacement", label: "Espacement", icon: "i-lucide-move" },
  { id: "souverainete", label: "Souverainete", icon: "i-lucide-shield-check" },
  { id: "anti-patterns", label: "Anti-patterns", icon: "i-lucide-shield-x" }
]

// Scroll spy
const activeSection = ref<string | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    { rootMargin: "-20% 0px -60% 0px" }
  )

  nextTick(() => {
    document.querySelectorAll("[data-chart-section]").forEach(el => observer.observe(el))
  })

  onUnmounted(() => observer.disconnect())
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

const copiedHex = ref<string | null>(null)
let copiedTimeout: ReturnType<typeof setTimeout> | null = null

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  copiedHex.value = text
  if (copiedTimeout) clearTimeout(copiedTimeout)
  copiedTimeout = setTimeout(() => {
    copiedHex.value = null
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-8 sm:py-12 px-0 sm:px-6 lg:px-8 max-w-5xl">
      <!-- Header -->
      <div class="mb-10 px-4 sm:px-0">
        <div class="mb-1">
          <UBadge color="primary" variant="subtle" size="sm">
            v2.0 — Mars 2026
          </UBadge>
        </div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Charte graphique
        </h1>
        <p class="mt-2 text-base lg:text-lg text-gray-600 dark:text-gray-400">
          Identite visuelle officielle pour les applications SEN / SFP.
        </p>

        <!-- Resume executif -->
        <div class="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Resume
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div><span class="text-gray-500 dark:text-gray-400">Police </span>Inter</div>
            <div><span class="text-gray-500 dark:text-gray-400">Primaire </span>#9A211F</div>
            <div><span class="text-gray-500 dark:text-gray-400">Succes </span>#1D7A3F</div>
            <div><span class="text-gray-500 dark:text-gray-400">WCAG </span>AAA vise</div>
            <div><span class="text-gray-500 dark:text-gray-400">Grille </span>8px</div>
            <div><span class="text-gray-500 dark:text-gray-400">Icones </span>Lucide</div>
          </div>
        </div>
      </div>

      <div class="flex gap-6 px-4 sm:px-0">
        <!-- Sidebar sticky -->
        <nav
          class="hidden lg:block w-48 flex-shrink-0"
          aria-label="Navigation des sections"
        >
          <div class="sticky top-20 bg-gray-50 dark:bg-gray-800/50 rounded-[var(--ui-radius)] shadow-sm p-3">
            <ul class="space-y-0.5">
              <li v-for="section in sections" :key="section.id">
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--ui-radius)] text-left text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  :class="activeSection === section.id
                    ? 'bg-white dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-semibold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'"
                  @click="scrollTo(section.id)"
                >
                  <UIcon :name="section.icon" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span class="truncate">{{ section.label }}</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Contenu principal -->
        <main class="flex-1 min-w-0 space-y-12">
          <!-- PALETTE INTERFACE -->
          <section id="palette" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Palette interface
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              6 couleurs pour l'ensemble de l'interface. Cliquer pour copier le code hex.
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                v-for="color in interfaceColors"
                :key="color.hex"
                class="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                :title="`Copier ${color.hex}`"
                @click="copyToClipboard(color.hex)"
              >
                <div
                  class="h-20 sm:h-24 flex items-center justify-center p-3 relative"
                  :class="color.swatch"
                >
                  <Transition
                    enter-active-class="transition-all duration-200"
                    enter-from-class="opacity-0 scale-90"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-90"
                  >
                    <span
                      v-if="copiedHex === color.hex"
                      class="absolute inset-0 flex items-center justify-center text-sm font-semibold"
                      :class="color.textClass"
                    >
                      <UIcon name="i-lucide-check" class="w-4 h-4 mr-1" aria-hidden="true" />
                      Copie !
                    </span>
                  </Transition>
                  <span
                    class="text-xs font-mono transition-opacity"
                    :class="[color.textClass, copiedHex === color.hex ? 'opacity-0' : 'opacity-0 group-hover:opacity-100']"
                  >
                    {{ color.hex }}
                  </span>
                </div>
                <div class="px-3 py-2.5 bg-white dark:bg-gray-900">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ color.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {{ color.hex }}
                  </p>
                </div>
              </button>
            </div>
          </section>

          <!-- ETATS -->
          <section id="etats" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Couleurs d'etat
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Messages systeme, alertes et feedback utilisateur.
            </p>

            <div class="space-y-3">
              <div
                v-for="state in stateColors"
                :key="state.hex"
                class="flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
              >
                <button
                  class="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform relative"
                  :class="state.swatch"
                  :title="`Copier ${state.hex}`"
                  @click="copyToClipboard(state.hex)"
                >
                  <UIcon
                    v-if="copiedHex === state.hex"
                    name="i-lucide-check"
                    class="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                  <span v-else class="text-[10px] font-mono text-white/80">{{ state.hex }}</span>
                </button>

                <button
                  class="w-12 h-12 rounded-lg flex-shrink-0 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform relative"
                  :class="state.softSwatch"
                  :title="`Copier ${state.bg}`"
                  @click="copyToClipboard(state.bg)"
                >
                  <UIcon
                    v-if="copiedHex === state.bg"
                    name="i-lucide-check"
                    class="w-5 h-5"
                    :style="{ color: state.hex }"
                    aria-hidden="true"
                  />
                  <span v-else class="text-[10px] font-mono text-gray-500">{{ state.bg }}</span>
                </button>

                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ state.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Fort : {{ state.hex }} / Fond : {{ state.bg }}
                  </p>
                </div>

                <div
                  class="hidden sm:flex ml-auto items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                  :class="state.softSwatch"
                >
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="state.swatch"
                  ></span>
                  <span :style="{ color: state.hex }">Exemple de message</span>
                </div>
              </div>
            </div>
          </section>

          <!-- ACCESSIBILITE -->
          <section id="accessibilite" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Accessibilite
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Contrastes WCAG mesures. Objectif AAA, minimum AA.
            </p>

            <div class="space-y-3">
              <div
                v-for="row in contrastTable"
                :key="row.label"
                class="flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
              >
                <!-- Swatch apercu -->
                <div
                  class="w-14 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border border-gray-100 dark:border-gray-700"
                  :style="{ backgroundColor: row.bg, color: row.fg }"
                >
                  Aa
                </div>

                <!-- Label + couleurs -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ row.label }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {{ row.fg }} sur {{ row.bg }}
                  </p>
                </div>

                <!-- Ratio -->
                <span class="text-sm font-mono text-gray-900 dark:text-gray-100 flex-shrink-0">
                  {{ row.ratio }}
                </span>

                <!-- Badge WCAG -->
                <UBadge
                  :color="row.level === 'AAA' ? 'success' : 'warning'"
                  variant="subtle"
                  size="xs"
                  class="flex-shrink-0"
                >
                  {{ row.level }}
                </UBadge>
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Texte secondaire minimum #4B5563 sur fond blanc</span>
              </div>
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Jamais de couleur seule pour transmettre une information (icone + label obligatoires)</span>
              </div>
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Texte blanc sur tous les fonds colores forts</span>
              </div>
            </div>
          </section>

          <!-- TYPOGRAPHIE -->
          <section id="typographie" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Typographie
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Police officielle : Inter.
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <UButton
                to="https://fonts.google.com/specimen/Inter"
                target="_blank"
                variant="outline"
                color="neutral"
                size="sm"
                icon="i-lucide-download"
                trailing-icon="i-lucide-external-link"
              >
                Google Fonts
              </UButton>
              <UButton
                to="https://github.com/rsms/inter/releases"
                target="_blank"
                variant="outline"
                color="neutral"
                size="sm"
                icon="i-simple-icons-github"
                trailing-icon="i-lucide-external-link"
              >
                GitHub (OTF/WOFF2)
              </UButton>
            </div>

            <!-- Specimen vivant -->
            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4 mb-6">
              <div v-for="item in typoScale" :key="item.name" class="flex items-baseline gap-4">
                <span
                  class="text-gray-900 dark:text-white"
                  :class="item.cssClass"
                >
                  {{ item.name }}
                </span>
                <span class="text-xs text-gray-400 dark:text-gray-500 font-mono hidden sm:inline">
                  {{ item.size }} / {{ item.weight }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Interlignage 1.5 minimum pour le corps de texte</span>
              </div>
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Taille minimale 16px pour le contenu principal</span>
              </div>
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-x" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Pas de majuscules sur les blocs de texte longs</span>
              </div>
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Majuscules reservees aux petits labels et badges</span>
              </div>
            </div>
          </section>

          <!-- BOUTONS -->
          <section id="boutons" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Boutons
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Une seule action principale visuellement dominante par zone.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Principal — #9A211F
                </p>
                <UButton color="primary" size="lg">
                  Action principale
                </UButton>
                <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  CTA, validation, action dominante
                </p>
              </div>

              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Secondaire
                </p>
                <UButton color="neutral" variant="outline" size="lg">
                  Action secondaire
                </UButton>
                <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Annuler, retour, filtres
                </p>
              </div>

              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Ghost
                </p>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="lg"
                  icon="i-lucide-settings"
                >
                  Parametres
                </UButton>
                <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Actions tertiaires, icones, toggles
                </p>
              </div>

              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Desactive
                </p>
                <UButton color="primary" size="lg" disabled>
                  Indisponible
                </UButton>
                <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Fond gris, texte attenue, curseur interdit
                </p>
              </div>
            </div>
          </section>

          <!-- FORMULAIRES -->
          <section id="formulaires" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Formulaires
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Labels visibles, focus net, messages d'erreur explicites.
            </p>

            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <div class="max-w-md space-y-5">
                <UFormField label="Nom de l'application" required>
                  <UInput placeholder="Ex : Microsoft Teams" class="w-full" />
                </UFormField>

                <UFormField label="Description" hint="Optionnel">
                  <UTextarea placeholder="Description courte du logiciel..." class="w-full" />
                </UFormField>

                <UFormField label="Champ en erreur" required error="Ce champ est obligatoire.">
                  <UInput model-value="" class="w-full" />
                </UFormField>
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Label visible au-dessus du champ (jamais uniquement en placeholder)</span>
              </div>
              <div class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Message d'erreur sous le champ avec texte explicite</span>
              </div>
            </div>
          </section>

          <!-- CARTES -->
          <section id="cartes" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Cartes et panneaux
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Fond blanc, bordures subtiles, ombres legeres ou absentes.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Carte standard
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Fond blanc, bordure #E5E7EB, rayon 12px.
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Panneau secondaire
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Fond #F9FAFB, pour les sections differenciees.
                </p>
              </div>
            </div>
          </section>

          <!-- BADGES -->
          <section id="badges" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Badges et statuts
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Badges d'etat avec fond doux + texte fort.
            </p>

            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Badges subtils
              </p>
              <div class="flex flex-wrap gap-3">
                <UBadge color="neutral" variant="subtle">
                  Neutre
                </UBadge>
                <UBadge color="info" variant="subtle">
                  Information
                </UBadge>
                <UBadge color="success" variant="subtle">
                  Succes
                </UBadge>
                <UBadge color="warning" variant="subtle">
                  Avertissement
                </UBadge>
                <UBadge color="error" variant="subtle">
                  Erreur
                </UBadge>
              </div>

              <USeparator class="my-5" />

              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Badges solides
              </p>
              <div class="flex flex-wrap gap-3">
                <UBadge color="neutral" variant="solid">
                  Neutre
                </UBadge>
                <UBadge color="info" variant="solid">
                  Information
                </UBadge>
                <UBadge color="success" variant="solid">
                  Succes
                </UBadge>
                <UBadge color="warning" variant="solid">
                  Avertissement
                </UBadge>
                <UBadge color="error" variant="solid">
                  Erreur
                </UBadge>
              </div>

              <USeparator class="my-5" />

              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Badges specifiques (referentiel)
              </p>
              <div class="flex flex-wrap gap-3">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1d7a3f] text-white text-sm">
                  <UIcon name="i-lucide-badge-check" class="w-3.5 h-3.5" />
                  Approuvé SFP
                </span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2563eb] text-white text-sm">
                  <UIcon name="i-lucide-at-sign" class="w-3.5 h-3.5" />
                  Compte edu.jura.ch
                </span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2563eb] text-white text-sm">
                  <UIcon name="i-lucide-key-round" class="w-3.5 h-3.5" />
                  Compte Edulog
                </span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#946017] text-white text-sm">
                  <UIcon name="i-lucide-cake" class="w-3.5 h-3.5" />
                  &lt; 16 ans : accord parents
                </span>
              </div>
            </div>
          </section>

          <!-- ICONES -->
          <section id="icones" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Icones
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Lucide — simples, lineaires, coherentes.
              <UButton
                to="https://lucide.dev"
                target="_blank"
                variant="link"
                size="xs"
                trailing-icon="i-lucide-external-link"
                class="ml-1"
              >
                lucide.dev
              </UButton>
            </p>

            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <div class="grid grid-cols-4 sm:grid-cols-6 gap-4">
                <div
                  v-for="icon in [
                    { name: 'i-lucide-search', label: 'search' },
                    { name: 'i-lucide-settings', label: 'settings' },
                    { name: 'i-lucide-shield', label: 'shield' },
                    { name: 'i-lucide-check', label: 'check' },
                    { name: 'i-lucide-x', label: 'x' },
                    { name: 'i-lucide-info', label: 'info' },
                    { name: 'i-lucide-triangle-alert', label: 'alert' },
                    { name: 'i-lucide-circle-alert', label: 'circle-alert' },
                    { name: 'i-lucide-eye', label: 'eye' },
                    { name: 'i-lucide-layout-grid', label: 'grid' },
                    { name: 'i-lucide-external-link', label: 'external' },
                    { name: 'i-lucide-palette', label: 'palette' }
                  ]"
                  :key="icon.name"
                  class="flex flex-col items-center gap-2"
                >
                  <div class="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                    <UIcon :name="icon.name" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span class="text-[10px] text-gray-500 dark:text-gray-400 truncate w-full text-center">{{ icon.label }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- ESPACEMENT -->
          <section id="espacement" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Espacement et rayons
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Grille de base 8px.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Espacement
                </p>
                <div class="space-y-3">
                  <div
                    v-for="sp in spacingScale"
                    :key="sp.token"
                    class="flex items-center gap-3"
                  >
                    <div
                      class="h-4 bg-red-500/20 dark:bg-red-400/20 rounded-sm flex-shrink-0"
                      :style="{ width: sp.value }"
                    ></div>
                    <span class="text-xs font-mono text-gray-700 dark:text-gray-300 w-8">{{ sp.value }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ sp.token }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Rayons de bordure
                </p>
                <div class="space-y-4">
                  <div
                    v-for="r in radiusScale"
                    :key="r.element"
                    class="flex items-center gap-3"
                  >
                    <div
                      class="w-10 h-10 border-2 border-red-500/40 dark:border-red-400/40 flex-shrink-0"
                      :style="{ borderRadius: r.value === 'arrondi complet' ? '9999px' : r.value }"
                    ></div>
                    <div>
                      <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {{ r.element }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ r.value }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SOUVERAINETE -->
          <section id="souverainete" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Souverainete des donnees
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Toutes les ressources hebergees sur notre infrastructure.
            </p>

            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-server" class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Aucun CDN externe
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Polices, librairies, images, scripts — tout est servi depuis nos serveurs (VPS Infomaniak, Suisse).
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Protection des donnees utilisateur
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Ne pas envoyer d'IP, referer ou headers a des plateformes tierces (Google, Cloudflare, etc.).
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-download" class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Ressources embarquees
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    La police Inter et les icones Lucide sont incluses dans le build. Si un outil externe est necessaire, telecharger et servir localement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- ANTI-PATTERNS -->
          <section id="anti-patterns" data-chart-section class="scroll-mt-20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Anti-patterns
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Ce qu'il faut eviter dans toutes les applications SFP.
            </p>

            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                    <th class="px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                      <div class="flex items-center gap-1.5">
                        <UIcon name="i-lucide-x" class="w-4 h-4" aria-hidden="true" />
                        Ne pas faire
                      </div>
                    </th>
                    <th class="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                      <div class="flex items-center gap-1.5">
                        <UIcon name="i-lucide-check" class="w-4 h-4" aria-hidden="true" />
                        Faire
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr
                    v-for="(rule, i) in [
                      { bad: 'Couleur seule pour transmettre un etat', good: 'Icone + label + couleur' },
                      { bad: 'Plusieurs boutons de couleur forte', good: 'Un seul CTA dominant par zone' },
                      { bad: 'Texte gris clair sur fond blanc', good: 'Minimum #4B5563 sur blanc' },
                      { bad: 'Ombres lourdes, degrades', good: 'Bordures subtiles, fonds plats' },
                      { bad: 'Majuscules sur des paragraphes', good: 'Majuscules uniquement sur labels courts' },
                      { bad: 'Chargeur rotatif generique', good: 'Squelette reproduisant la structure' },
                      { bad: 'CDN externe (fonts, libs)', good: 'Tout heberge localement' },
                      { bad: 'Textes affiches en dur', good: 'Centraliser pour l\'internationalisation' },
                      { bad: 'Couleurs hors palette', good: 'Exclusivement les couleurs definies' }
                    ]"
                    :key="i"
                  >
                    <td class="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {{ rule.bad }}
                    </td>
                    <td class="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {{ rule.good }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </UContainer>
    <BackToTop />
  </div>
</template>
