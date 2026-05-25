/**
 * Fixtures synthétiques pour les tests unitaires du store et des composables
 * qui ont besoin d'un dataset de logiciels représentatif.
 *
 * **Pourquoi pas `app/data/software-list.ts`** : ce seed legacy n'est plus
 * utilisé par le runtime (Directus est la source de vérité). Il a divergé
 * de la prod (128 logiciels seed vs 104 Directus, flags approvedBy*
 * désynchronisés). Les tests qui l'utilisaient donnaient un faux sentiment
 * de sécurité.
 *
 * **Cette fixture** : 14 logiciels couvrant tous les cas de filtre/tri/recherche
 * nécessaires aux tests. Chaque entrée a une raison d'être documentée.
 *
 * Pour ajouter un cas de test, ajoute un logiciel ici avec une fonction
 * `makeSoftware()` qui complète les defaults.
 */

import type { Software } from "~~/types/software"

/**
 * Forme d'entrée simplifiée : catégories et activités exprimées en string[]
 * (historique des fixtures). Le helper convertit en CategoryRef[]/PedagogicalActivityRef[].
 */
type SoftwareInput = Partial<Omit<Software, "categories" | "pedagogicalActivities">> & {
  id: string
  name: string
  categories?: string[]
  pedagogicalActivities?: string[]
}

function makeSoftware(p: SoftwareInput): Software {
  const { categories, pedagogicalActivities, ...rest } = p
  return {
    icon: null,
    shortDescription: rest.shortDescription ?? `${p.name} — description courte`,
    description: null,
    lgpd: rest.lgpd ?? { hosting: 1, rgpd: 1, dataCollection: 1 },
    certificationLevel: rest.certificationLevel ?? 1,
    dataLocation: rest.dataLocation ?? "Suisse",
    cost: rest.cost ?? "Gratuit",
    toolUrl: rest.toolUrl ?? `https://example.com/${p.id}`,
    documentation: null,
    targetAudience: null,
    requiresParentalConsent: false,
    requiresEduAccount: false,
    requiresEdulog: false,
    approvedBySEN: false,
    approvedBySFP: false,
    usageNotes: null,
    alternatives: [],
    ...rest,
    categories: (categories ?? []).map(name => ({ name, icon: null })),
    pedagogicalActivities: (pedagogicalActivities ?? []).map(name => ({ name, icon: null }))
  }
}

/**
 * Fixture de 14 logiciels couvrant tous les cas de test.
 *
 * Cas couverts :
 * - Tous les niveaux LGPD (1/2/3)
 * - Toutes les catégories courantes
 * - Activités pédagogiques variées
 * - Approbations SEN + SFP
 * - Tous les coûts (Gratuit / Payant / Freemium) + prise en charge CEJEF/SEN
 * - Tous les targetAudience
 * - Recherche fuzzy : noms communs (Microsoft, Adobe, Google)
 */
export const softwareFixtures: Software[] = [
  // --- NIVEAU 1 (vert) ---
  makeSoftware({
    id: "f1-teams",
    name: "Microsoft Teams",
    shortDescription: "Plateforme de collaboration et visioconférence",
    lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 },
    certificationLevel: 1,
    cost: "Payant",
    fundedByCejef: true,
    contractualSafeguards: ["eu_data_boundary", "dpa"],
    targetAudience: "tous",
    approvedBySEN: true,
    approvedBySFP: true,
    categories: ["Communication", "Bureautique"],
    pedagogicalActivities: ["Collaboration", "Visioconférence"]
  }),
  makeSoftware({
    id: "f2-deepl-pro",
    name: "DeepL Pro",
    shortDescription: "Traduction automatique professionnelle",
    lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 },
    certificationLevel: 1,
    cost: "Payant",
    categories: ["Langues", "IA"],
    pedagogicalActivities: ["Traduction"],
    approvedBySEN: true
  }),
  makeSoftware({
    id: "f3-geogebra",
    name: "GeoGebra",
    shortDescription: "Mathématiques dynamiques",
    certificationLevel: 1,
    cost: "Gratuit",
    targetAudience: "tous",
    categories: ["Mathématiques", "Sciences"],
    pedagogicalActivities: ["Visualisation", "Exercices"],
    requiresEduAccount: false
  }),
  makeSoftware({
    id: "f4-wooflash",
    name: "Wooflash",
    shortDescription: "Quiz et sondages interactifs",
    certificationLevel: 1,
    cost: "Freemium",
    approvedBySFP: true,
    categories: ["Évaluation"],
    pedagogicalActivities: ["Quiz"]
  }),

  // --- NIVEAU 2 (orange) ---
  makeSoftware({
    id: "f5-deepl-std",
    name: "DeepL Standard",
    shortDescription: "Traduction automatique grand public",
    lgpd: { hosting: 2, rgpd: 1, dataCollection: 1 },
    certificationLevel: 2,
    dataLocation: "Union européenne / EEE",
    cost: "Gratuit",
    categories: ["Langues", "IA"],
    pedagogicalActivities: ["Traduction"],
    alternatives: ["f2-deepl-pro"]
  }),
  makeSoftware({
    id: "f6-kahoot",
    name: "Kahoot",
    shortDescription: "Quiz ludiques en classe",
    lgpd: { hosting: 2, rgpd: 1, dataCollection: 2 },
    certificationLevel: 2,
    dataLocation: "États-Unis (avec certification DPF)",
    cost: "Freemium",
    categories: ["Évaluation"],
    pedagogicalActivities: ["Quiz", "Gamification"],
    alternatives: ["f4-wooflash"]
  }),
  makeSoftware({
    id: "f7-adobe-acrobat",
    name: "Adobe Acrobat",
    shortDescription: "Édition de PDF professionnelle",
    lgpd: { hosting: 2, rgpd: 2, dataCollection: 2 },
    certificationLevel: 2,
    dataLocation: "États-Unis (avec certification DPF)",
    cost: "Payant",
    targetAudience: "enseignants",
    categories: ["Bureautique"],
    pedagogicalActivities: ["Annotation"]
  }),
  makeSoftware({
    id: "f8-genially",
    name: "Genially",
    shortDescription: "Présentations interactives",
    lgpd: { hosting: 2, rgpd: 1, dataCollection: 2 },
    certificationLevel: 2,
    dataLocation: "Union européenne / EEE",
    cost: "Freemium",
    categories: ["Présentations"],
    pedagogicalActivities: ["Création visuelle"]
  }),

  // --- NIVEAU 3 (rouge) ---
  makeSoftware({
    id: "f9-chatgpt",
    name: "ChatGPT",
    shortDescription: "Intelligence artificielle conversationnelle",
    lgpd: { hosting: 3, rgpd: 3, dataCollection: 3 },
    certificationLevel: 3,
    dataLocation: "Autre / non adéquat / inconnu",
    cost: "Freemium",
    categories: ["IA"],
    pedagogicalActivities: ["Rédaction"]
  }),
  makeSoftware({
    id: "f10-prezi",
    name: "Prezi",
    shortDescription: "Présentations non linéaires",
    lgpd: { hosting: 3, rgpd: 2, dataCollection: 2 },
    certificationLevel: 3,
    dataLocation: "États-Unis (avec certification DPF)",
    cost: "Freemium",
    categories: ["Présentations"],
    pedagogicalActivities: ["Création visuelle"],
    alternatives: ["f8-genially"]
  }),
  makeSoftware({
    id: "f11-canva",
    name: "Canva",
    shortDescription: "Design graphique en ligne",
    lgpd: { hosting: 3, rgpd: 2, dataCollection: 2 },
    certificationLevel: 3,
    cost: "Freemium",
    categories: ["Design"],
    pedagogicalActivities: ["Création visuelle"],
    requiresEdulog: false
  }),

  // --- CAS spéciaux ---
  makeSoftware({
    id: "f12-edulog",
    name: "Logiciel EDULOG",
    shortDescription: "Authentification fédérée Edulog",
    certificationLevel: 1,
    cost: "Gratuit",
    requiresEdulog: true,
    categories: ["Authentification"]
  }),
  makeSoftware({
    id: "f13-parental",
    name: "Logiciel mineurs",
    shortDescription: "Outil nécessitant un consentement parental (<16 ans)",
    certificationLevel: 1,
    cost: "Gratuit",
    requiresParentalConsent: true,
    targetAudience: "élèves",
    categories: ["Apprentissage"]
  }),
  makeSoftware({
    id: "f14-edu-account",
    name: "Logiciel compte EDU",
    shortDescription: "Outil nécessitant un compte institutionnel CEJEF",
    certificationLevel: 1,
    cost: "Payant",
    fundedByCejef: true,
    fundedBySEN: true,
    requiresEduAccount: true,
    targetAudience: "enseignants",
    categories: ["Bureautique"]
  })
]

/**
 * Lazy : un sous-ensemble si tu veux 3-4 logiciels uniquement
 * (pour les tests de logique simples).
 */
export const minimalFixtures: Software[] = [
  softwareFixtures[0]!, // Teams (vert, SEN+SFP)
  softwareFixtures[6]!, // Adobe Acrobat (orange)
  softwareFixtures[8]! // ChatGPT (rouge)
]
