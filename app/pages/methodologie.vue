<script setup lang="ts">
defineOptions({
  name: "MethodologyPage"
})

useSeoMeta({
  title: "Méthodologie — Référentiel Logiciels CEJEF",
  description:
    "Comment le CEJEF classe les logiciels selon la protection des données : trois critères, quatre niveaux, une décision claire."
})

// 3 critères × 3 niveaux + ligne « Non évaluée ». Source unique : GRILLE-CLASSIFICATION-LGPD.md V1.4.1
interface Level {
  code: 0 | 1 | 2 | 3
  emoji: string
  label: string
  short: string
  containerClass: string
}

const levels: Level[] = [
  {
    code: 1,
    emoji: "🟢",
    label: "Validé",
    short: "Utilisable sans restriction dans le cadre scolaire.",
    containerClass: "bg-emerald-50 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700"
  },
  {
    code: 2,
    emoji: "🟠",
    label: "Vigilance",
    short: "Utilisable sous conditions : pas de données sensibles, anonymat si possible.",
    containerClass: "bg-amber-50 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700"
  },
  {
    code: 3,
    emoji: "🔴",
    label: "Interdit",
    short: "À proscrire dans le cadre scolaire.",
    containerClass: "bg-rose-50 border-rose-300 dark:bg-rose-950/40 dark:border-rose-700"
  },
  {
    code: 0,
    emoji: "⚪",
    label: "Non évaluée",
    short: "Validation en cours — la fiche n'est pas encore publiée.",
    containerClass: "bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
  }
]

interface CriteriaRow {
  level: 1 | 2 | 3
  text: string
}

interface Criteria {
  id: string
  icon: string
  title: string
  question: string
  rows: CriteriaRow[]
}

const criteria: Criteria[] = [
  {
    id: "hosting",
    icon: "i-lucide-server",
    title: "Hébergement",
    question: "Où sont stockées les données ? Sous quelle juridiction ?",
    rows: [
      { level: 1, text: "Données hébergées exclusivement en Suisse ou dans l'UE/EEE." },
      { level: 2, text: "Hébergement aux États-Unis ou dans un pays adéquat (UK, Japon, Canada, Corée du Sud…) ou multi-régions partiel." },
      { level: 3, text: "Hébergement dans un pays non adéquat (Chine, Russie, Inde, Émirats…) ou éditeur opaque sur la localisation." }
    ]
  },
  {
    id: "rgpd",
    icon: "i-lucide-scale",
    title: "Conformité RGPD",
    question: "L'éditeur respecte-t-il les principes de protection des données ?",
    rows: [
      { level: 1, text: "Politique de confidentialité claire, DPO ou contact identifié, droits d'accès et de suppression accessibles, base légale et durée de conservation documentées." },
      { level: 2, text: "Politique accessible mais incomplète ; transferts encadrés mais sans Clauses Contractuelles Types (SCC) ; conformité partielle." },
      { level: 3, text: "Pas de politique de confidentialité, ou transferts vers des pays non adéquats sans garantie, ou éditeur sans engagement RGPD." }
    ]
  },
  {
    id: "collection",
    icon: "i-lucide-database",
    title: "Collecte de données",
    question: "Que collecte l'éditeur ? Tracking, profilage, revente, entraînement IA ?",
    rows: [
      { level: 1, text: "Aucun tracking publicitaire, pas d'analytics tiers, pas de revente, pas d'entraînement IA sur les données. Cookies strictement nécessaires uniquement." },
      { level: 2, text: "Collecte limitée fonctionnelle : analytics propres, télémétrie, cookies de confort. Entraînement IA possible avec opt-out clair. Pas de profilage publicitaire." },
      { level: 3, text: "Profilage publicitaire, partage commercial avec des tiers, revente de données, entraînement IA sans opt-out, cookies publicitaires." }
    ]
  }
]

const levelClass = (code: 1 | 2 | 3) => {
  const map = {
    1: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-100 dark:border-emerald-700",
    2: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-100 dark:border-amber-700",
    3: "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-100 dark:border-rose-700"
  }
  return map[code]
}

const levelEmoji = (code: 1 | 2 | 3) => ({ 1: "🟢", 2: "🟠", 3: "🔴" }[code])
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-10 sm:py-14 max-w-5xl">
      <!-- Hero -->
      <header class="mb-12 px-4 sm:px-0">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
          Comment on classe les logiciels
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Trois critères, quatre niveaux, une décision claire.
        </p>
      </header>

      <!-- Section 1 — Les 4 niveaux -->
      <section class="mb-14 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Les niveaux de classement
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="lvl in levels"
            :key="lvl.code"
            class="rounded-[var(--ui-radius)] border-2 p-4 flex items-start gap-3"
            :class="lvl.containerClass"
          >
            <span class="text-3xl leading-none mt-0.5" aria-hidden="true">{{ lvl.emoji }}</span>
            <div>
              <div class="font-bold text-gray-900 dark:text-white text-lg mb-1">
                {{ lvl.label }}
              </div>
              <p class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                {{ lvl.short }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2 — Les 3 critères -->
      <section class="mb-14 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Les trois critères d'évaluation
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Chaque logiciel est évalué indépendamment sur ces trois axes.
        </p>

        <div class="space-y-6">
          <article
            v-for="c in criteria"
            :key="c.id"
            class="bg-white dark:bg-gray-900 rounded-[var(--ui-radius)] shadow-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-6"
          >
            <header class="flex items-start gap-3 mb-4">
              <div class="shrink-0 w-11 h-11 rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
                <UIcon :name="c.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div class="min-w-0">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ c.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 italic">
                  {{ c.question }}
                </p>
              </div>
            </header>

            <ul class="space-y-2">
              <li
                v-for="row in c.rows"
                :key="row.level"
                class="rounded-[var(--ui-radius)] border-2 px-4 py-3 flex items-start gap-3"
                :class="levelClass(row.level)"
              >
                <span class="text-xl leading-none mt-0.5 shrink-0" aria-hidden="true">{{ levelEmoji(row.level) }}</span>
                <p class="text-sm sm:text-base leading-relaxed">
                  {{ row.text }}
                </p>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- Section 3 — Calcul du niveau global -->
      <section class="mb-14 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Le niveau global d'un logiciel
        </h2>
        <div class="bg-white dark:bg-gray-900 rounded-[var(--ui-radius)] shadow-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <p class="text-gray-700 dark:text-gray-200 mb-5 leading-relaxed">
            Le niveau global affiché sur la fiche correspond <strong>au critère le plus défavorable</strong> parmi les trois. Un seul critère rouge suffit à classer le logiciel en rouge.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xl font-bold tabular-nums">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700">🟢</span>
            <span class="text-gray-400">+</span>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700">🟢</span>
            <span class="text-gray-400">+</span>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700">🔴</span>
            <span class="text-gray-400 mx-1">=</span>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-700">🔴</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 text-center mt-3 italic">
            Hébergement Suisse + RGPD conforme + Collecte rouge = niveau global rouge.
          </p>
        </div>
      </section>

      <!-- Section 4 — Précision USA -->
      <section class="mb-14 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Précision : les États-Unis
        </h2>
        <div class="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-[var(--ui-radius)] p-5">
          <p class="text-gray-800 dark:text-gray-100 leading-relaxed mb-3">
            Au CEJEF, les logiciels hébergés aux <strong>États-Unis</strong> sont assimilés aux pays adéquats (niveau <span class="font-bold">🟠 vigilance</span>), au même titre que le Royaume-Uni, le Canada ou le Japon.
          </p>
          <p class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
            Ce choix concentre la vigilance sur les vrais risques : la <strong>collecte agressive</strong> et les <strong>transferts opaques</strong>. La rigueur passe par les critères <em>Conformité RGPD</em> et <em>Collecte de données</em>, qui restent évalués strictement.
          </p>
        </div>
      </section>

      <!-- Contact -->
      <section class="px-4 sm:px-0">
        <div class="bg-white dark:bg-gray-900 rounded-[var(--ui-radius)] shadow-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="shrink-0 w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
            <UIcon name="i-lucide-mail" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Une question sur un classement ?
            </h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Contactez le Centre Numérique du CEJEF (CNS) pour toute précision ou demande de révision.
            </p>
          </div>
          <UButton
            to="mailto:steve.fallet@divtec.ch?subject=R%C3%A9f%C3%A9rentiel%20logiciels%20%E2%80%94%20question%20classement"
            color="primary"
            size="lg"
            icon="i-lucide-send"
            class="shrink-0"
          >
            Écrire au CNS
          </UButton>
        </div>
      </section>
    </UContainer>
  </div>
</template>
