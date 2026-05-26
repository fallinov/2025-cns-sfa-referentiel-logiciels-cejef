<script setup lang="ts">
defineOptions({
  name: "ClassificationPage"
})

useSeoMeta({
  title: "Système de classification — Référentiel Logiciels CEJEF",
  description:
    "Comment le CEJEF classe les logiciels selon la protection des données : trois critères, quatre niveaux, une décision claire."
})

// Source unique : GRILLE-CLASSIFICATION-LGPD.md V1.4.1
// Pattern visuel : aligné sur OnboardingModal (avatar rond plein coloré + icône blanche)

interface Level {
  code: 0 | 1 | 2 | 3
  icon: string
  label: string
  short: string
  bg: string
  border: string
  iconBg: string
  textTitle: string
  textDesc: string
}

const levels: Level[] = [
  {
    code: 1,
    icon: "i-lucide-check",
    label: "Validé",
    short: "Utilisable librement avec les élèves, y compris avec leurs vraies données (nom, prénom, travaux scolaires).",
    bg: "bg-green-50 dark:bg-green-900/10",
    border: "border-green-100 dark:border-green-800/30",
    iconBg: "bg-green-500",
    textTitle: "text-green-800 dark:text-green-300",
    textDesc: "text-green-600 dark:text-green-400"
  },
  {
    code: 2,
    icon: "i-lucide-alert-triangle",
    label: "Vigilance",
    short: "Utilisable, mais sans données privées (santé, religion, opinions) et en évitant si possible d'identifier les élèves par leur nom.",
    bg: "bg-orange-50 dark:bg-orange-900/10",
    border: "border-orange-100 dark:border-orange-800/30",
    iconBg: "bg-orange-500",
    textTitle: "text-orange-800 dark:text-orange-300",
    textDesc: "text-orange-600 dark:text-orange-400"
  },
  {
    code: 3,
    icon: "i-lucide-x",
    label: "Interdit",
    short: "Ne doit pas être utilisé dans le cadre scolaire : les risques pour les données des élèves sont trop importants.",
    bg: "bg-red-50 dark:bg-red-900/10",
    border: "border-red-100 dark:border-red-800/30",
    iconBg: "bg-red-500",
    textTitle: "text-red-800 dark:text-red-300",
    textDesc: "text-red-600 dark:text-red-400"
  },
  {
    code: 0,
    icon: "i-lucide-help-circle",
    label: "Non évaluée",
    short: "Le logiciel est en cours d'analyse. Sa fiche apparaîtra publiquement une fois l'évaluation terminée.",
    bg: "bg-gray-50 dark:bg-gray-900/40",
    border: "border-gray-200 dark:border-gray-700",
    iconBg: "bg-gray-400 dark:bg-gray-500",
    textTitle: "text-gray-800 dark:text-gray-200",
    textDesc: "text-gray-600 dark:text-gray-400"
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
    title: "Hébergement des données",
    question: "Dans quel pays sont stockées les données ? Quelle loi s'applique en cas de problème ?",
    rows: [
      { level: 1, text: "Les données sont stockées uniquement en Suisse ou dans l'Union européenne (et pays associés : Norvège, Islande, Liechtenstein)." },
      { level: 2, text: "Les données sont stockées aux États-Unis ou dans un pays reconnu pour son bon niveau de protection (Royaume-Uni, Canada, Japon, Corée du Sud…), ou réparties entre plusieurs pays." },
      { level: 3, text: "Les données sont stockées dans un pays qui n'offre pas de garantie suffisante (Chine, Russie, Inde, Émirats arabes unis…), ou l'éditeur refuse de préciser où elles se trouvent." }
    ]
  },
  {
    id: "rgpd",
    icon: "i-lucide-scale",
    title: "Conformité aux règles européennes",
    question: "L'éditeur respecte-t-il les règles européennes de protection des données (RGPD) ?",
    rows: [
      { level: 1, text: "L'éditeur publie une politique de confidentialité claire, désigne un responsable à contacter, vous permet de consulter ou supprimer vos données, et indique combien de temps elles sont conservées." },
      { level: 2, text: "L'éditeur publie une politique de confidentialité, mais avec des informations incomplètes ou imprécises. Conformité partielle." },
      { level: 3, text: "L'éditeur ne publie pas de politique de confidentialité claire, ou envoie les données vers des pays sans garantie suffisante, ou ne s'engage pas à respecter les règles européennes." }
    ]
  },
  {
    id: "collection",
    icon: "i-lucide-database",
    title: "Collecte de données",
    question: "Quelles informations l'éditeur récupère-t-il sur vous, et qu'en fait-il ?",
    rows: [
      { level: 1, text: "Aucun suivi à des fins publicitaires, pas de mesure externe (type Google Analytics), pas de revente de vos données, pas d'utilisation pour entraîner une intelligence artificielle. Seuls les cookies indispensables au fonctionnement (connexion, préférences) sont utilisés." },
      { level: 2, text: "L'éditeur collecte certaines informations pour améliorer son service (statistiques internes, cookies de confort). Si vos données peuvent servir à entraîner une intelligence artificielle, vous pouvez le refuser facilement. Pas de publicité ciblée." },
      { level: 3, text: "L'éditeur crée un profil de vous pour afficher de la publicité ciblée, partage ou revend vos données à des entreprises tierces, utilise vos données pour entraîner une intelligence artificielle sans possibilité de refuser, ou installe des cookies publicitaires." }
    ]
  }
]

// Helpers : map d'un code niveau (1/2/3) vers classes Tailwind alignées sur OnboardingModal
const levelTokens = {
  1: {
    icon: "i-lucide-check",
    bg: "bg-green-50 dark:bg-green-900/10",
    border: "border-green-100 dark:border-green-800/30",
    iconBg: "bg-green-500",
    textTitle: "text-green-800 dark:text-green-300",
    textDesc: "text-green-700 dark:text-green-400"
  },
  2: {
    icon: "i-lucide-alert-triangle",
    bg: "bg-orange-50 dark:bg-orange-900/10",
    border: "border-orange-100 dark:border-orange-800/30",
    iconBg: "bg-orange-500",
    textTitle: "text-orange-800 dark:text-orange-300",
    textDesc: "text-orange-700 dark:text-orange-400"
  },
  3: {
    icon: "i-lucide-x",
    bg: "bg-red-50 dark:bg-red-900/10",
    border: "border-red-100 dark:border-red-800/30",
    iconBg: "bg-red-500",
    textTitle: "text-red-800 dark:text-red-300",
    textDesc: "text-red-700 dark:text-red-400"
  }
} as const
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <UContainer class="py-10 sm:py-14 max-w-5xl">
      <!-- Hero -->
      <header class="mb-12 px-4 sm:px-0">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
          Système de classification
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4">
          Trois critères, quatre niveaux, une décision claire.
        </p>
        <p class="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          Le CEJEF évalue chaque logiciel pédagogique sur la manière dont il traite les données de ses utilisateurs (élèves, enseignants). Cette page explique comment cette évaluation est réalisée, pour que vous compreniez ce que signifie le niveau affiché sur la fiche de chaque logiciel.
        </p>
      </header>

      <!-- Section 1 — Les 4 niveaux (pattern OnboardingModal : avatar rond + icône blanche) -->
      <section class="mb-14 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Les niveaux de classement
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="lvl in levels"
            :key="lvl.code"
            class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] border"
            :class="[lvl.bg, lvl.border]"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm"
              :class="lvl.iconBg"
            >
              <UIcon :name="lvl.icon" class="w-6 h-6 text-white stroke-[3]" />
            </div>
            <div>
              <p class="font-bold text-lg" :class="lvl.textTitle">
                {{ lvl.label }}
              </p>
              <p class="text-base mt-1" :class="lvl.textDesc">
                {{ lvl.short }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2 — Les 3 critères (carte SoftwareCard style + lignes au pattern Onboarding) -->
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
            class="bg-white dark:bg-gray-900 rounded-[var(--ui-radius)] shadow-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-6 hover:shadow-md transition-shadow"
          >
            <header class="flex items-start gap-3 mb-5">
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

            <ul class="space-y-3">
              <li
                v-for="row in c.rows"
                :key="row.level"
                class="flex items-start gap-4 p-4 rounded-[var(--ui-radius)] border"
                :class="[levelTokens[row.level].bg, levelTokens[row.level].border]"
              >
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                  :class="levelTokens[row.level].iconBg"
                >
                  <UIcon
                    :name="levelTokens[row.level].icon"
                    class="w-5 h-5 text-white stroke-[3]"
                  />
                </div>
                <p
                  class="text-sm sm:text-base leading-relaxed"
                  :class="levelTokens[row.level].textDesc"
                >
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
          <p class="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            Le niveau global affiché sur la fiche du logiciel correspond <strong>au critère le moins favorable</strong> parmi les trois. Autrement dit : il suffit d'un seul critère rouge pour que le logiciel soit classé rouge dans son ensemble. C'est une approche prudente : on ne masque pas un point faible en le compensant par les autres.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 shadow-sm" aria-label="Validé">
              <UIcon name="i-lucide-check" class="w-7 h-7 text-white stroke-[3]" />
            </span>
            <span class="text-gray-300 dark:text-gray-600 font-light text-xl select-none">+</span>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 shadow-sm" aria-label="Validé">
              <UIcon name="i-lucide-check" class="w-7 h-7 text-white stroke-[3]" />
            </span>
            <span class="text-gray-300 dark:text-gray-600 font-light text-xl select-none">+</span>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500 shadow-sm" aria-label="Interdit">
              <UIcon name="i-lucide-x" class="w-7 h-7 text-white stroke-[3]" />
            </span>
            <span class="text-gray-300 dark:text-gray-600 font-light text-xl select-none mx-1">=</span>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500 shadow-sm" aria-label="Interdit">
              <UIcon name="i-lucide-x" class="w-7 h-7 text-white stroke-[3]" />
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 text-center mt-4 italic">
            Exemple : un logiciel hébergé en Suisse (vert) et conforme aux règles européennes (vert), mais qui revend les données à des annonceurs (rouge), est classé rouge.
          </p>
        </div>
      </section>

      <!-- Section 4 — Précision USA -->
      <section class="mb-10 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Précision : les États-Unis
        </h2>
        <div class="flex items-start gap-4 p-5 rounded-[var(--ui-radius)] border bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/30">
          <div class="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0 shadow-sm">
            <UIcon name="i-lucide-info" class="w-6 h-6 text-white stroke-[3]" />
          </div>
          <div>
            <p class="text-orange-800 dark:text-orange-300 font-semibold mb-2 leading-relaxed">
              Au CEJEF, les logiciels hébergés aux États-Unis sont classés en vigilance — au même titre que ceux hébergés au Royaume-Uni, au Canada ou au Japon.
            </p>
            <p class="text-orange-700 dark:text-orange-400 text-sm leading-relaxed">
              Ce choix est un parti pris : plutôt que de marquer rouge tous les logiciels américains (ce qui interdirait la majorité des outils numériques utilisés en classe), nous concentrons l'attention sur les <strong>vrais risques</strong> : les éditeurs qui collectent vos données pour la publicité, les revendent à des entreprises tierces, ou les envoient dans des pays sans aucune protection. Ces risques sont mesurés par les deux autres critères (<em>Conformité aux règles européennes</em> et <em>Collecte de données</em>), qui restent évalués strictement.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 5 — Garanties contractuelles : comment un logiciel peut passer au vert -->
      <section class="mb-14 px-4 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Comment un logiciel peut-il être classé vert malgré tout ?
        </h2>
        <div class="flex items-start gap-4 p-5 rounded-[var(--ui-radius)] border bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30">
          <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-sm">
            <UIcon name="i-lucide-shield-check" class="w-6 h-6 text-white stroke-[3]" />
          </div>
          <div>
            <p class="text-green-800 dark:text-green-300 font-semibold mb-2 leading-relaxed">
              Certains éditeurs s'engagent contractuellement à protéger les données au-delà de leurs obligations par défaut. Quand le CEJEF (ou un service public suisse ou européen) a signé un tel contrat, l'évaluation en tient compte.
            </p>
            <p class="text-green-700 dark:text-green-400 text-sm leading-relaxed mb-3">
              Trois garanties peuvent faire passer un logiciel au vert :
            </p>
            <ul class="space-y-2 text-sm text-green-700 dark:text-green-400 leading-relaxed mb-3">
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-file-signature" class="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>Contrat institutionnel signé avec le CEJEF</strong> qui détaille comment les données seront traitées.</span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-map-pin" class="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>Engagement de stockage en Europe</strong> pris par l'éditeur, même s'il est basé hors UE.</span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-badge-check" class="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>Audit indépendant</strong> confirmant régulièrement la conformité.</span>
              </li>
            </ul>
            <p class="text-green-700 dark:text-green-400 text-sm leading-relaxed">
              <strong>Exemple :</strong> Microsoft 365 est utilisé au CEJEF dans le cadre d'un contrat qui impose le stockage des données dans des centres situés en Europe. Cet engagement permet à l'évaluation de passer au vert sur le critère hébergement, malgré l'origine américaine de l'éditeur.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section class="px-4 sm:px-0">
        <div class="bg-white dark:bg-gray-900 rounded-[var(--ui-radius)] shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
            to="mailto:steve.fallet@jura.ch?subject=R%C3%A9f%C3%A9rentiel%20logiciels%20%E2%80%94%20question%20classement"
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
