import type { Software } from "~~/types/software"

/**
 * Liste complète des logiciels du référentiel CEJEF
 * Générée automatiquement à partir des données CSV
 *
 * Niveaux de certification LGPD:
 * - Niveau 1 (Vert): Usage autorisé
 * - Niveau 2 (Orange): Usage avec précautions
 * - Niveau 3 (Rouge): Usage interdit
 */
export const softwareList: Software[] = [
  {
    id: "18ca251f-af65-4f2c-9c3c-3a7518b2a855",
    name: "ADOBE ACROBAT",
    logo: null,
    icon: "i-simple-icons-adobe",
    shortDescription: "Logiciel de lecture et création de documents PDF professionnels",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.adobe.com/acrobat.html",
    targetAudience: "tous",
    categories: [
      "Bureautique",
      "PDF",
      "Documentation"
    ],
    pedagogicalActivities: [
      "Lecture de documents",
      "Annotation de textes",
      "Création de formulaires",
      "Signature électronique"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "aa4c7076-00ac-43eb-a4fb-232af8579fc3",
    name: "ATLASSIAN (JIRA, CONFLUENCE, TRELLO)",
    logo: null,
    icon: "i-simple-icons-atlassian",
    shortDescription: "Suite d'outils de gestion de projets et de collaboration",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.atlassian.com",
    targetAudience: "enseignants",
    categories: [
      "Gestion de projet",
      "Collaboration",
      "Organisation"
    ],
    pedagogicalActivities: [
      "Gestion de tâches",
      "Documentation collaborative",
      "Suivi de projets"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "e113ceed-d8a1-426c-8dd3-e300df4c8abf",
    name: "AZENDOO (app)",
    logo: null,
    icon: "i-lucide-layout-dashboard",
    shortDescription: "Application de gestion de tâches et projets",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.azendoo.com",
    targetAudience: "enseignants",
    categories: [
      "Gestion de projet",
      "Organisation"
    ],
    pedagogicalActivities: [
      "Gestion de tâches",
      "Collaboration"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "ec266878-5ca5-4cac-9b91-4a27a3649ff8",
    name: "BABBEL",
    logo: null,
    icon: "i-lucide-languages",
    shortDescription: "Plateforme d'apprentissage des langues en ligne",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.babbel.com",
    targetAudience: "tous",
    categories: [
      "Langues",
      "Apprentissage",
      "E-learning"
    ],
    pedagogicalActivities: [
      "Exercices de vocabulaire",
      "Compréhension orale",
      "Expression écrite"
    ],
    disciplines: [
      "Langues"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "0fa52ff2-e168-43b0-8616-1aca1931d6b3",
    name: "BDnF (Application)",
    logo: null,
    icon: "i-lucide-book-open",
    shortDescription: "Bibliothèque numérique francophone - BnF",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://bdnf.bnf.fr",
    targetAudience: "tous",
    categories: [
      "Lecture",
      "Ressources pédagogiques",
      "Culture"
    ],
    pedagogicalActivities: [
      "Lecture numérique",
      "Recherche documentaire"
    ],
    disciplines: [
      "Français",
      "Culture générale"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "834621e9-e59c-47eb-88d9-93b015f03210",
    name: "BLINKLEARNING",
    logo: null,
    icon: "i-lucide-book-open-text",
    shortDescription: "Plateforme de manuels scolaires numériques",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.blinklearning.com",
    targetAudience: "tous",
    categories: [
      "Manuels numériques",
      "E-learning",
      "Ressources pédagogiques"
    ],
    pedagogicalActivities: [
      "Lecture de manuels",
      "Exercices interactifs"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "d76a40b1-9759-4515-ae81-0c99c08ba0f2",
    name: "BLUEMAIL",
    logo: null,
    icon: "i-lucide-mail",
    shortDescription: "Client de messagerie multicompte",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.bluemail.me",
    targetAudience: "enseignants",
    categories: [
      "Communication",
      "Messagerie",
      "Bureautique"
    ],
    pedagogicalActivities: [
      "Gestion d'emails",
      "Organisation"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "37706271-2113-4c98-95f2-14fa657e4632",
    name: "BOOK CREATOR",
    logo: null,
    icon: "i-lucide-book-plus",
    shortDescription: "Outil de création de livres numériques interactifs",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://bookcreator.com",
    targetAudience: "tous",
    categories: [
      "Création de contenu",
      "Livres numériques",
      "Multimédia"
    ],
    pedagogicalActivities: [
      "Création de livres",
      "Écriture créative",
      "Publication numérique"
    ],
    disciplines: [
      "Français",
      "Arts",
      "Langues"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "6ac7cdb5-ddc5-4ff7-8690-1a37fd45d4d0",
    name: "BOOKILI",
    logo: null,
    icon: "i-lucide-library",
    shortDescription: "Bibliothèque numérique pour l'apprentissage de la lecture",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.bookili.com",
    targetAudience: "élèves",
    categories: [
      "Lecture",
      "Apprentissage",
      "Français"
    ],
    pedagogicalActivities: [
      "Lecture guidée",
      "Compréhension de textes"
    ],
    disciplines: [
      "Français"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "2144076e-5baf-48ab-9800-12a94ccf9a6e",
    name: "CALENDLY",
    logo: null,
    icon: "i-lucide-calendar-check",
    shortDescription: "Outil de planification de rendez-vous",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://calendly.com",
    targetAudience: "enseignants",
    categories: [
      "Organisation",
      "Planification",
      "Communication"
    ],
    pedagogicalActivities: [
      "Gestion d'agenda",
      "Prise de rendez-vous"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "667a2870-5dc1-40ec-90ec-4ae2a4a830e6",
    name: "CALENGOO",
    logo: null,
    icon: "i-lucide-calendar",
    shortDescription: "Application de calendrier et gestion d'agenda",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://calengoo.com",
    targetAudience: "tous",
    categories: [
      "Organisation",
      "Calendrier",
      "Productivité"
    ],
    pedagogicalActivities: [
      "Gestion d'agenda",
      "Planification"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "440e0fb1-b020-48b2-9564-6335952216f7",
    name: "CANVA",
    logo: null,
    icon: "i-simple-icons-canva",
    shortDescription: "Outil de création graphique et design en ligne",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: null,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.canva.com",
    targetAudience: "tous",
    categories: [
      "Design",
      "Création de contenu",
      "Multimédia"
    ],
    pedagogicalActivities: [
      "Création de présentations",
      "Design de documents",
      "Création d'affiches"
    ],
    disciplines: [
      "Arts",
      "Communication",
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "3a7e831b-e2e5-436a-8961-5223912fbfbe",
    name: "CAPCUT",
    logo: null,
    icon: "i-lucide-film",
    shortDescription: "Éditeur vidéo mobile et desktop",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.capcut.com",
    targetAudience: "tous",
    categories: [
      "Montage vidéo",
      "Multimédia",
      "Création de contenu"
    ],
    pedagogicalActivities: [
      "Édition vidéo",
      "Création de contenus multimédias"
    ],
    disciplines: [
      "Arts",
      "Communication"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "ca2f13c1-67e2-485a-a3d8-f2613cec0fb2",
    name: "CARD2BRAIN",
    logo: null,
    icon: "i-lucide-brain",
    shortDescription: "Plateforme de cartes mémo (flashcards) pour l'apprentissage",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://card2brain.ch",
    targetAudience: "tous",
    categories: [
      "Mémorisation",
      "Apprentissage",
      "Révision"
    ],
    pedagogicalActivities: [
      "Création de flashcards",
      "Révision",
      "Mémorisation"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "6735e3fc-91c1-4eb9-8330-097e9e27479f",
    name: "CLARO SPEAK PLUS iOS et CLARO PDF PRO iOS",
    logo: null,
    icon: "i-lucide-ear",
    shortDescription: "Outils d'accessibilité pour la lecture et l'écriture",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.clarosoftware.com",
    targetAudience: "élèves",
    categories: [
      "Accessibilité",
      "Lecture",
      "Aide à l'apprentissage"
    ],
    pedagogicalActivities: [
      "Lecture assistée",
      "Aide à la compréhension"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "2de92a52-37df-4db4-9351-fedd06c34ae9",
    name: "CLASSCRAFT",
    logo: null,
    icon: "i-lucide-gamepad-2",
    shortDescription: "Plateforme de gamification de la classe",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.classcraft.com",
    targetAudience: "enseignants",
    categories: [
      "Gamification",
      "Gestion de classe",
      "Motivation"
    ],
    pedagogicalActivities: [
      "Gestion de comportement",
      "Motivation des élèves"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "9908a75e-d308-4906-a1a1-0ecd7198a106",
    name: "CLASSROOMSCREEN",
    logo: null,
    icon: "i-lucide-presentation",
    shortDescription: "Tableau de bord numérique pour la gestion de classe",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.classroomscreen.com",
    targetAudience: "enseignants",
    categories: [
      "Gestion de classe",
      "Outils de présentation"
    ],
    pedagogicalActivities: [
      "Gestion du temps",
      "Affichage d'informations",
      "Organisation de classe"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "cbe3ff10-47f4-4ea2-b2b7-f9ff2d9f46b2",
    name: "CLASSTIME",
    logo: null,
    icon: "i-lucide-school",
    shortDescription: "Plateforme d'évaluation formative en temps réel",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.classtime.com",
    targetAudience: "enseignants",
    categories: [
      "Évaluation",
      "Quiz",
      "Feedback"
    ],
    pedagogicalActivities: [
      "Création de quiz",
      "Évaluation formative",
      "Suivi des progrès"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "75c98a49-1412-43f9-8289-796d5a721094",
    name: "CODE.ORG",
    logo: null,
    icon: "i-lucide-code",
    shortDescription: "Plateforme d'apprentissage de la programmation",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://code.org",
    targetAudience: "élèves",
    categories: [
      "Programmation",
      "Informatique",
      "STEM"
    ],
    pedagogicalActivities: [
      "Initiation au code",
      "Programmation par blocs",
      "Création de jeux"
    ],
    disciplines: [
      "Informatique",
      "Mathématiques"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "5397c8ab-98e5-4036-b2a2-f794e8f4f3ab",
    name: "DICTALY",
    logo: null,
    icon: "i-lucide-pen-tool",
    shortDescription: "Plateforme de dictées en ligne interactives",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://dictaly.com",
    targetAudience: "tous",
    categories: [
      "Orthographe",
      "Français",
      "Évaluation"
    ],
    pedagogicalActivities: [
      "Dictées en ligne",
      "Entraînement orthographique"
    ],
    disciplines: [
      "Français"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "b34a34cb-3c48-432b-9c25-964656c2e78c",
    name: "DOODLE",
    logo: null,
    icon: "i-lucide-calendar-days",
    shortDescription: "Outil de planification collaborative de réunions",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://doodle.com",
    targetAudience: "enseignants",
    categories: [
      "Organisation",
      "Planification",
      "Collaboration"
    ],
    pedagogicalActivities: [
      "Sondages de disponibilité",
      "Planification de réunions"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "8aef2c08-7f58-40e9-85b2-1d5e971d8feb",
    name: "DRIVE INFOMANIAK",
    logo: null,
    icon: "i-lucide-hard-drive",
    shortDescription: "Solution de stockage cloud suisse sécurisée",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.infomaniak.com/kdrive",
    targetAudience: "tous",
    categories: [
      "Stockage cloud",
      "Collaboration",
      "Bureautique"
    ],
    pedagogicalActivities: [
      "Stockage de fichiers",
      "Partage de documents",
      "Collaboration"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "c2fb036a-44ae-4eb5-a408-5e10ce96f873",
    name: "DRUIDE, ANTIDOTE",
    logo: null,
    icon: "i-lucide-spell-check",
    shortDescription: "Correcteur orthographique et grammatical avancé",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.antidote.info",
    targetAudience: "tous",
    categories: [
      "Orthographe",
      "Grammaire",
      "Rédaction"
    ],
    pedagogicalActivities: [
      "Correction de textes",
      "Aide à la rédaction",
      "Enrichissement du vocabulaire"
    ],
    disciplines: [
      "Français",
      "Langues"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "c2c9f76d-0d3f-42a4-8f7a-13d977d9e109",
    name: "DUOLINGO",
    logo: null,
    icon: "i-simple-icons-duolingo",
    shortDescription: "Application d'apprentissage des langues gamifiée",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.duolingo.com",
    targetAudience: "tous",
    categories: [
      "Langues",
      "Apprentissage",
      "Gamification"
    ],
    pedagogicalActivities: [
      "Exercices de vocabulaire",
      "Grammaire",
      "Compréhension orale"
    ],
    disciplines: [
      "Langues"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "9f704229-c096-45d1-a6d4-dae9f8bed6ab",
    name: "DYNAMILIS",
    logo: null,
    icon: "i-lucide-activity",
    shortDescription: "Plateforme d'exercices physiques et sportifs",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://dynamilis.ch",
    targetAudience: "tous",
    categories: [
      "Sport",
      "Santé",
      "Activité physique"
    ],
    pedagogicalActivities: [
      "Exercices physiques",
      "Programmes d'entraînement"
    ],
    disciplines: [
      "Éducation physique"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "ead0a533-ba2f-4e64-bed4-d4b2d67ab68f",
    name: "EDPUZZLE",
    logo: null,
    icon: "i-lucide-video",
    shortDescription: "Plateforme de création de vidéos pédagogiques interactives",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://edpuzzle.com",
    targetAudience: "enseignants",
    categories: [
      "Vidéo pédagogique",
      "Évaluation",
      "Multimédia"
    ],
    pedagogicalActivities: [
      "Création de vidéos interactives",
      "Intégration de quiz",
      "Suivi des visionnages"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "4ca0efb8-353c-4f7a-81e9-9ce86b81a93f",
    name: "EDUBASE READER",
    logo: null,
    icon: "i-lucide-book-open",
    shortDescription: "Lecteur de manuels scolaires numériques",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.edubase.ch",
    targetAudience: "élèves",
    categories: [
      "Manuels numériques",
      "Lecture",
      "Ressources pédagogiques"
    ],
    pedagogicalActivities: [
      "Lecture de manuels",
      "Consultation de ressources"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "0535552d-2bb8-4bad-a687-9b99319e2eab",
    name: "EDUCAPLAY",
    logo: null,
    icon: "i-lucide-puzzle",
    shortDescription: "Plateforme de création d'activités éducatives ludiques",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.educaplay.com",
    targetAudience: "enseignants",
    categories: [
      "Jeux éducatifs",
      "Activités interactives",
      "Quiz"
    ],
    pedagogicalActivities: [
      "Création de jeux",
      "Mots croisés",
      "Quiz interactifs"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "bda6272e-a729-4a10-9a5f-3bbaf6b3f616",
    name: "EXAM.NET",
    logo: null,
    icon: "i-lucide-file-edit",
    shortDescription: "Plateforme d'examens en ligne sécurisés",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://exam.net",
    targetAudience: "enseignants",
    categories: [
      "Évaluation",
      "Examens",
      "Sécurité"
    ],
    pedagogicalActivities: [
      "Création d'examens",
      "Passation sécurisée",
      "Correction automatique"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "52d6620a-11ed-442a-a087-adc6744d9b45",
    name: "FIZZIQ",
    logo: null,
    icon: "i-lucide-flask-conical",
    shortDescription: "Application de laboratoire scientifique mobile",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.fizziq.org",
    targetAudience: "élèves",
    categories: [
      "Sciences",
      "Expérimentation",
      "Mesure"
    ],
    pedagogicalActivities: [
      "Expériences scientifiques",
      "Mesures physiques",
      "Collecte de données"
    ],
    disciplines: [
      "Sciences",
      "Physique",
      "Chimie"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "f5dbc3c8-47ff-419b-ae01-6b9beabbd2cd",
    name: "FLORA INCOGNITA (app)",
    logo: null,
    icon: "i-lucide-flower",
    shortDescription: "Application d'identification de plantes par photo",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://floraincognita.com",
    targetAudience: "tous",
    categories: [
      "Biologie",
      "Nature",
      "Identification"
    ],
    pedagogicalActivities: [
      "Identification de plantes",
      "Apprentissage botanique"
    ],
    disciplines: [
      "Sciences naturelles",
      "Biologie"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "6d523ce7-dcba-4c55-a5c6-3cc413bcc64d",
    name: "FOXIT READER",
    logo: null,
    icon: "i-lucide-file-text",
    shortDescription: "Lecteur et éditeur de fichiers PDF",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.foxit.com",
    targetAudience: "tous",
    categories: [
      "PDF",
      "Bureautique",
      "Lecture"
    ],
    pedagogicalActivities: [
      "Lecture de PDF",
      "Annotation",
      "Édition"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "897235a8-d36c-48d6-b00a-57bf70da09c3",
    name: "FRAMASOFT",
    logo: null,
    icon: "i-lucide-cloud",
    shortDescription: "Suite d'outils libres et éthiques (Framapad, Framaforms, etc.)",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://framasoft.org",
    targetAudience: "tous",
    categories: [
      "Collaboration",
      "Open source",
      "Bureautique"
    ],
    pedagogicalActivities: [
      "Écriture collaborative",
      "Formulaires",
      "Partage de documents"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "727a3776-d452-4ec7-992e-3e15d2acbe3a",
    name: "GARMIN CONNECT",
    logo: null,
    icon: "i-lucide-watch",
    shortDescription: "Plateforme de suivi d'activité sportive",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://connect.garmin.com",
    targetAudience: "tous",
    categories: [
      "Sport",
      "Santé",
      "Suivi d'activité"
    ],
    pedagogicalActivities: [
      "Suivi sportif",
      "Analyse de performance"
    ],
    disciplines: [
      "Éducation physique"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "5e2fd0b8-1cfd-4c37-a9c2-103cb7ce234e",
    name: "GENIALLY",
    logo: null,
    icon: "i-lucide-presentation",
    shortDescription: "Outil de création de présentations et contenus interactifs",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://genial.ly",
    targetAudience: "enseignants",
    categories: [
      "Présentation",
      "Création de contenu",
      "Interactivité"
    ],
    pedagogicalActivities: [
      "Création de présentations",
      "Infographies",
      "Images interactives"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "1f197f6d-3e6d-41df-9a5b-405fd6b1cf92",
    name: "GEOGEBRA",
    logo: null,
    icon: "i-lucide-ruler",
    shortDescription: "Logiciel de mathématiques dynamiques gratuit",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.geogebra.org",
    targetAudience: "tous",
    categories: [
      "Mathématiques",
      "Géométrie",
      "Graphiques"
    ],
    pedagogicalActivities: [
      "Géométrie dynamique",
      "Algèbre",
      "Graphiques de fonctions"
    ],
    disciplines: [
      "Mathématiques"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "a42cdfc3-f096-4282-9806-25cb6eb9de56",
    name: "GIMKIT",
    logo: null,
    icon: "i-lucide-trophy",
    shortDescription: "Plateforme de quiz gamifiés en temps réel",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.gimkit.com",
    targetAudience: "enseignants",
    categories: [
      "Quiz",
      "Gamification",
      "Évaluation"
    ],
    pedagogicalActivities: [
      "Quiz interactifs",
      "Révision",
      "Évaluation formative"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "4cd7236c-1281-487e-b744-cf2b3a3e3928",
    name: "GLOSE",
    logo: null,
    icon: "i-lucide-book-marked",
    shortDescription: "Application de lecture sociale et collaborative",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.glose.com",
    targetAudience: "tous",
    categories: [
      "Lecture",
      "Réseau social",
      "Annotation"
    ],
    pedagogicalActivities: [
      "Lecture numérique",
      "Annotation collaborative",
      "Discussion littéraire"
    ],
    disciplines: [
      "Français",
      "Littérature"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "6c189a07-d2c0-477d-9f3f-cc6ee4577d96",
    name: "JSTOR",
    logo: null,
    icon: "i-lucide-graduation-cap",
    shortDescription: "Bibliothèque numérique académique",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.jstor.org",
    targetAudience: "enseignants",
    categories: [
      "Recherche",
      "Documentation",
      "Ressources académiques"
    ],
    pedagogicalActivities: [
      "Recherche documentaire",
      "Consultation d'articles"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "1770792d-3e5a-4982-9bb1-e7dd39d1534a",
    name: "JUNGLEAI",
    logo: null,
    icon: "i-lucide-bot",
    shortDescription: "Assistant IA pour l'apprentissage",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.jungleai.com",
    targetAudience: "tous",
    categories: [
      "Intelligence artificielle",
      "Aide à l'apprentissage"
    ],
    pedagogicalActivities: [
      "Assistance IA",
      "Génération de contenu"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "324ada3e-f73e-46e2-b389-e7fa27583044",
    name: "KAHOOT",
    logo: null,
    icon: "i-simple-icons-kahoot",
    shortDescription: "Plateforme de quiz interactifs et gamifiés",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://kahoot.com",
    targetAudience: "enseignants",
    categories: [
      "Quiz",
      "Gamification",
      "Évaluation"
    ],
    pedagogicalActivities: [
      "Quiz en temps réel",
      "Révision ludique",
      "Évaluation formative"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "21cec86c-2626-4530-b0a5-0cdc51eb0cd6",
    name: "KIALO EDU",
    logo: null,
    icon: "i-lucide-message-square-text",
    shortDescription: "Plateforme de débats structurés et argumentation",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.kialo-edu.com",
    targetAudience: "tous",
    categories: [
      "Débat",
      "Argumentation",
      "Pensée critique"
    ],
    pedagogicalActivities: [
      "Débats structurés",
      "Développement d'arguments",
      "Analyse critique"
    ],
    disciplines: [
      "Philosophie",
      "Langues",
      "Sciences humaines"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "8b453628-953a-4e08-b049-05ebef12881e",
    name: "KNOWT",
    logo: null,
    icon: "i-lucide-lightbulb",
    shortDescription: "Plateforme de création de flashcards et quiz",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://knowt.com",
    targetAudience: "tous",
    categories: [
      "Mémorisation",
      "Quiz",
      "Révision"
    ],
    pedagogicalActivities: [
      "Création de flashcards",
      "Quiz",
      "Révision"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "a83fc036-6df6-417f-ac05-1762dbaaf471",
    name: "LEARNINGAPPS",
    logo: null,
    icon: "i-lucide-blocks",
    shortDescription: "Plateforme de création d'exercices interactifs",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://learningapps.org",
    targetAudience: "enseignants",
    categories: [
      "Exercices interactifs",
      "Jeux éducatifs",
      "Apprentissage"
    ],
    pedagogicalActivities: [
      "Création d'exercices",
      "Jeux de correspondance",
      "Quiz"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "ba424f3b-af66-4830-8dd6-5cc19c834946",
    name: "LEARNINGVIEW.ORG",
    logo: null,
    icon: "i-lucide-eye",
    shortDescription: "Plateforme d'apprentissage personnalisé",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://learningview.org",
    targetAudience: "enseignants",
    categories: [
      "Apprentissage personnalisé",
      "Suivi de progression"
    ],
    pedagogicalActivities: [
      "Parcours d'apprentissage",
      "Évaluation",
      "Suivi des élèves"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "62e1f335-55a3-41d3-a707-f646742d724f",
    name: "LINGODEER",
    logo: null,
    icon: "i-lucide-languages",
    shortDescription: "Application d'apprentissage des langues",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.lingodeer.com",
    targetAudience: "tous",
    categories: [
      "Langues",
      "Apprentissage",
      "Gamification"
    ],
    pedagogicalActivities: [
      "Vocabulaire",
      "Grammaire",
      "Compréhension orale"
    ],
    disciplines: [
      "Langues"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "a3b8ae8b-937c-4847-9df8-936b66bcf699",
    name: "LINKEDIN",
    logo: null,
    icon: "i-simple-icons-linkedin",
    shortDescription: "Réseau social professionnel",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.linkedin.com",
    targetAudience: "enseignants",
    categories: [
      "Réseau social",
      "Professionnel",
      "Carrière"
    ],
    pedagogicalActivities: [
      "Networking",
      "Recherche d'emploi",
      "Développement professionnel"
    ],
    disciplines: [
      "Orientation professionnelle"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "bcec3170-6db6-44f0-a404-e7da13ec8422",
    name: "LOCKEE.FR",
    logo: null,
    icon: "i-lucide-lock",
    shortDescription: "Outil de création d'énigmes et escape games pédagogiques",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://lockee.fr",
    targetAudience: "enseignants",
    categories: [
      "Jeux éducatifs",
      "Énigmes",
      "Gamification"
    ],
    pedagogicalActivities: [
      "Création d'escape games",
      "Énigmes",
      "Activités ludiques"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "65172ac6-13e1-4912-a68e-19d44cd411c7",
    name: "LUCID",
    logo: null,
    icon: "i-lucide-layout-template",
    shortDescription: "Suite d'outils de diagrammes et cartes mentales (Lucidchart, Lucidspark)",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://lucid.app",
    targetAudience: "tous",
    categories: [
      "Diagrammes",
      "Cartes mentales",
      "Collaboration"
    ],
    pedagogicalActivities: [
      "Création de diagrammes",
      "Organigrammes",
      "Brainstorming visuel"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "d229656f-7cb8-48cd-8def-30ed9f852bc4",
    name: "LYRICSTRAINING",
    logo: null,
    icon: "i-lucide-music",
    shortDescription: "Apprentissage des langues par la musique",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://lyricstraining.com",
    targetAudience: "tous",
    categories: [
      "Langues",
      "Musique",
      "Compréhension orale"
    ],
    pedagogicalActivities: [
      "Exercices avec chansons",
      "Complétion de paroles",
      "Compréhension orale"
    ],
    disciplines: [
      "Langues"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "f869a356-5f0e-44d1-b381-499f985d0fa2",
    name: "MAGICSCHOOL.AI",
    logo: null,
    icon: "i-lucide-wand-sparkles",
    shortDescription: "Assistant IA pour enseignants",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.magicschool.ai",
    targetAudience: "enseignants",
    categories: [
      "Intelligence artificielle",
      "Planification",
      "Aide à l'enseignement"
    ],
    pedagogicalActivities: [
      "Génération de contenu pédagogique",
      "Planification de cours"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "7a3be341-0769-4703-8c49-cfcec178ba13",
    name: "MEMRISE",
    logo: null,
    icon: "i-lucide-brain-circuit",
    shortDescription: "Application d'apprentissage des langues par mémorisation",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.memrise.com",
    targetAudience: "tous",
    categories: [
      "Langues",
      "Mémorisation",
      "Apprentissage"
    ],
    pedagogicalActivities: [
      "Vocabulaire",
      "Mémorisation espacée",
      "Révision"
    ],
    disciplines: [
      "Langues"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "8b7250b0-c497-4996-af5a-084986629600",
    name: "MINDMEISTER",
    logo: null,
    icon: "i-lucide-network",
    shortDescription: "Outil de création de cartes mentales collaboratives",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.mindmeister.com",
    targetAudience: "tous",
    categories: [
      "Cartes mentales",
      "Brainstorming",
      "Organisation"
    ],
    pedagogicalActivities: [
      "Création de mindmaps",
      "Brainstorming",
      "Organisation d'idées"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "73de275b-c8ca-4fe6-b145-fadb8ee318e8",
    name: "MINE",
    logo: null,
    icon: "i-lucide-pickaxe",
    shortDescription: "Outil de gestion de données personnelles",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.mine.com",
    targetAudience: "enseignants",
    categories: [
      "Confidentialité",
      "Données personnelles"
    ],
    pedagogicalActivities: [
      "Gestion de données",
      "Confidentialité"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "7bfc94f9-e08c-4a88-93a1-83d68e4d2d44",
    name: "MINECRAFT : EDUCATION EDITION",
    logo: null,
    icon: "i-lucide-package",
    shortDescription: "Logiciel éducatif - MINECRAFT : EDUCATION EDITION",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: null,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "",
    targetAudience: "tous",
    categories: [
      "Éducation",
      "Outils numériques"
    ],
    pedagogicalActivities: [
      "Activités pédagogiques",
      "Apprentissage numérique"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "0ec8c9fa-8cc5-44c5-b200-b50c7b8788bc",
    name: "MIRO",
    logo: null,
    icon: "i-lucide-panel-top",
    shortDescription: "Tableau blanc collaboratif en ligne",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://miro.com",
    targetAudience: "enseignants",
    categories: [
      "Collaboration",
      "Tableau blanc",
      "Brainstorming"
    ],
    pedagogicalActivities: [
      "Brainstorming",
      "Planification collaborative",
      "Ateliers"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "7119dd31-391e-4aaf-be35-96047675ec72",
    name: "MURAL",
    logo: null,
    icon: "i-lucide-layers",
    shortDescription: "Plateforme de collaboration visuelle",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.mural.co",
    targetAudience: "enseignants",
    categories: [
      "Collaboration",
      "Tableau blanc",
      "Design thinking"
    ],
    pedagogicalActivities: [
      "Brainstorming visuel",
      "Ateliers collaboratifs"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "dc65942d-8905-4c1a-a984-da04061071d2",
    name: "NOTEBOOKLM",
    logo: null,
    icon: "i-lucide-notebook-pen",
    shortDescription: "Assistant de recherche et prise de notes IA de Google",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://notebooklm.google.com",
    targetAudience: "enseignants",
    categories: [
      "Intelligence artificielle",
      "Prise de notes",
      "Recherche"
    ],
    pedagogicalActivities: [
      "Prise de notes",
      "Synthèse",
      "Recherche assistée"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "d90eb9d4-6fa4-48d9-9b0d-ed787d77fbac",
    name: "ONE CALENDAR",
    logo: null,
    icon: "i-lucide-calendar-range",
    shortDescription: "Application de gestion de calendrier unifié",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: null,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.onecalendar.nl",
    targetAudience: "tous",
    categories: [
      "Calendrier",
      "Organisation",
      "Productivité"
    ],
    pedagogicalActivities: [
      "Gestion d'agenda",
      "Synchronisation de calendriers"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "86770c88-ad25-4c6a-9035-f567b320c209",
    name: "ORTHOHPHORE",
    logo: null,
    icon: "i-lucide-spell-check",
    shortDescription: "Plateforme de dictées en ligne automatisées",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://orthophore.ac-lille.fr",
    targetAudience: "élèves",
    categories: [
      "Orthographe",
      "Français",
      "Évaluation"
    ],
    pedagogicalActivities: [
      "Dictées automatisées",
      "Entraînement orthographique"
    ],
    disciplines: [
      "Français"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "1bfd75f2-8023-4620-9bef-cf9ada3c055e",
    name: "PADLET",
    logo: null,
    icon: "i-lucide-sticky-note",
    shortDescription: "Tableau d'affichage collaboratif en ligne",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://padlet.com",
    targetAudience: "enseignants",
    categories: [
      "Collaboration",
      "Partage",
      "Mur virtuel"
    ],
    pedagogicalActivities: [
      "Création de murs collaboratifs",
      "Partage de ressources",
      "Brainstorming"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "3bf5251b-54f5-46ec-b151-22f36510f4cc",
    name: "PCLOUD",
    logo: null,
    icon: "i-lucide-cloud",
    shortDescription: "Solution de stockage cloud sécurisé",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.pcloud.com",
    targetAudience: "tous",
    categories: [
      "Stockage cloud",
      "Sauvegarde",
      "Partage"
    ],
    pedagogicalActivities: [
      "Stockage de fichiers",
      "Partage de documents"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "11933e2e-6d1e-4067-985b-dd58030df5f4",
    name: "PDF EXPERT",
    logo: null,
    icon: "i-lucide-file-text",
    shortDescription: "Éditeur PDF professionnel pour Mac et iOS",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://pdfexpert.com",
    targetAudience: "tous",
    categories: [
      "PDF",
      "Édition",
      "Annotation"
    ],
    pedagogicalActivities: [
      "Édition de PDF",
      "Annotation",
      "Formulaires"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "57d1c18a-9657-4333-8cd7-9f44866c83d7",
    name: "PHONOWRITER",
    logo: null,
    icon: "i-lucide-mic",
    shortDescription: "Outil de transcription phonétique",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://phonowriter.com",
    targetAudience: "tous",
    categories: [
      "Phonétique",
      "Langues",
      "Transcription"
    ],
    pedagogicalActivities: [
      "Transcription phonétique",
      "Apprentissage de la prononciation"
    ],
    disciplines: [
      "Langues"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "74612035-bb49-44ef-8c24-56d2a7dec860",
    name: "PHOTOPEA",
    logo: null,
    icon: "i-lucide-image",
    shortDescription: "Éditeur d'images en ligne (alternative à Photoshop)",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.photopea.com",
    targetAudience: "tous",
    categories: [
      "Édition d'images",
      "Design",
      "Graphisme"
    ],
    pedagogicalActivities: [
      "Retouche photo",
      "Création graphique"
    ],
    disciplines: [
      "Arts",
      "Multimédia"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "079b1f46-7634-4595-952b-93f2c6ac572d",
    name: "PHYPHOX",
    logo: null,
    icon: "i-lucide-activity",
    shortDescription: "Application d'expérimentation physique utilisant les capteurs du smartphone",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://phyphox.org",
    targetAudience: "élèves",
    categories: [
      "Sciences",
      "Physique",
      "Expérimentation"
    ],
    pedagogicalActivities: [
      "Expériences physiques",
      "Mesures scientifiques",
      "Collecte de données"
    ],
    disciplines: [
      "Physique",
      "Sciences"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "cedc5a08-68fb-4a4e-beeb-216cf75422c5",
    name: "PIXTON",
    logo: null,
    icon: "i-lucide-panels-top-left",
    shortDescription: "Outil de création de bandes dessinées",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.pixton.com",
    targetAudience: "tous",
    categories: [
      "Création de contenu",
      "BD",
      "Expression écrite"
    ],
    pedagogicalActivities: [
      "Création de BD",
      "Storytelling",
      "Expression créative"
    ],
    disciplines: [
      "Français",
      "Arts",
      "Langues"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "b7ad33d0-ed5b-45c6-acdb-3e02467aa617",
    name: "PLANDECLASSE.CA",
    logo: null,
    icon: "i-lucide-layout-grid",
    shortDescription: "Outil de création de plans de classe",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.plandeclasse.ca",
    targetAudience: "enseignants",
    categories: [
      "Gestion de classe",
      "Organisation"
    ],
    pedagogicalActivities: [
      "Création de plans de classe",
      "Organisation spatiale"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "98e93055-2231-46ff-a3ac-52e004221c73",
    name: "PLICKERS",
    logo: null,
    icon: "i-lucide-qr-code",
    shortDescription: "Système de quiz avec cartes QR code",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.plickers.com",
    targetAudience: "enseignants",
    categories: [
      "Quiz",
      "Évaluation",
      "QR code"
    ],
    pedagogicalActivities: [
      "Quiz instantanés",
      "Évaluation formative",
      "Sondages"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "27e34e97-f530-4d0a-a03e-8993aa889f0f",
    name: "PREZI",
    logo: null,
    icon: "i-simple-icons-prezi",
    shortDescription: "Outil de présentation dynamique et non linéaire",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://prezi.com",
    targetAudience: "tous",
    categories: [
      "Présentation",
      "Storytelling",
      "Visuel"
    ],
    pedagogicalActivities: [
      "Création de présentations",
      "Storytelling visuel"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "a8b9d9f0-de1b-4c17-8149-996b36cb5259",
    name: "PROJET VOLTAIRE",
    logo: null,
    icon: "i-lucide-pencil",
    shortDescription: "Plateforme d'entraînement en orthographe",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.projet-voltaire.fr",
    targetAudience: "tous",
    categories: [
      "Orthographe",
      "Français",
      "Certification"
    ],
    pedagogicalActivities: [
      "Entraînement orthographique",
      "Certification Voltaire"
    ],
    disciplines: [
      "Français"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "e418dbc4-b163-436e-b1d3-3297228edd1b",
    name: "QUIZLET",
    logo: null,
    icon: "i-lucide-layers",
    shortDescription: "Plateforme de création de flashcards et quiz",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://quizlet.com",
    targetAudience: "tous",
    categories: [
      "Flashcards",
      "Mémorisation",
      "Quiz"
    ],
    pedagogicalActivities: [
      "Création de flashcards",
      "Révision",
      "Jeux de mémorisation"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "d88b5139-b85d-4939-8e97-22847344215c",
    name: "REMARKABLE INTEGRATION ONEDRIVE",
    logo: null,
    icon: "i-lucide-tablet",
    shortDescription: "Intégration reMarkable avec OneDrive",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://remarkable.com",
    targetAudience: "enseignants",
    categories: [
      "Prise de notes",
      "Synchronisation",
      "Productivité"
    ],
    pedagogicalActivities: [
      "Prise de notes manuscrites",
      "Synchronisation cloud"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "67bbb3d8-c316-440c-9c44-dea7bd6632f6",
    name: "SAMSUNG EMAIL",
    logo: null,
    icon: "i-lucide-mail",
    shortDescription: "Application de messagerie Samsung",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.samsung.com",
    targetAudience: "tous",
    categories: [
      "Messagerie",
      "Communication"
    ],
    pedagogicalActivities: [
      "Gestion d'emails"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "01547f52-1912-4c84-ae3b-f99a33e2eff9",
    name: "SAMSUNG NOTES",
    logo: null,
    icon: "i-lucide-sticky-note",
    shortDescription: "Application de prise de notes Samsung",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.samsung.com",
    targetAudience: "tous",
    categories: [
      "Prise de notes",
      "Productivité"
    ],
    pedagogicalActivities: [
      "Prise de notes",
      "Dessins",
      "Mémos"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "44e00cfb-1b43-4218-aae2-9370f1b4e4ae",
    name: "SCHOLARVOX",
    logo: null,
    icon: "i-lucide-book-open",
    shortDescription: "Bibliothèque numérique académique",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.scholarvox.com",
    targetAudience: "enseignants",
    categories: [
      "Bibliothèque numérique",
      "Ressources académiques"
    ],
    pedagogicalActivities: [
      "Lecture d'ouvrages",
      "Recherche documentaire"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "6386a9d5-4254-434a-9a30-9fe63497ea09",
    name: "SCHOOL AI",
    logo: null,
    icon: "i-lucide-school",
    shortDescription: "Assistant IA pour l'éducation",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.schoolai.com",
    targetAudience: "enseignants",
    categories: [
      "Intelligence artificielle",
      "Aide à l'enseignement"
    ],
    pedagogicalActivities: [
      "Assistance IA",
      "Génération de contenu pédagogique"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "eef53d57-f8e3-4a2e-9347-01bd02278734",
    name: "SMART TECH : LUMIO",
    logo: null,
    icon: "i-lucide-monitor",
    shortDescription: "Logiciel de leçons interactives pour écrans interactifs",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://lumio.smarttech.com",
    targetAudience: "enseignants",
    categories: [
      "Écran interactif",
      "Leçons interactives"
    ],
    pedagogicalActivities: [
      "Création de leçons",
      "Activités interactives"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "59d55d49-cb3b-42e7-a351-efe141939bd7",
    name: "SODA PDF",
    logo: null,
    icon: "i-lucide-file-text",
    shortDescription: "Suite complète d'outils PDF",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.sodapdf.com",
    targetAudience: "tous",
    categories: [
      "PDF",
      "Édition",
      "Conversion"
    ],
    pedagogicalActivities: [
      "Édition de PDF",
      "Conversion de formats",
      "Fusion de documents"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "6e7fea78-c1fc-4c26-88ec-3746ceb71e13",
    name: "SOUNDTRAP EDUCATION",
    logo: null,
    icon: "i-lucide-music",
    shortDescription: "Studio d'enregistrement et de création musicale en ligne",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.soundtrap.com/edu",
    targetAudience: "tous",
    categories: [
      "Musique",
      "Création audio",
      "Podcast"
    ],
    pedagogicalActivities: [
      "Création musicale",
      "Enregistrement audio",
      "Podcasts"
    ],
    disciplines: [
      "Musique",
      "Arts"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "d577976b-1adb-42ef-8b34-82f228b80c44",
    name: "SPARK",
    logo: null,
    icon: "i-lucide-mail",
    shortDescription: "Client de messagerie intelligent",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://sparkmailapp.com",
    targetAudience: "enseignants",
    categories: [
      "Messagerie",
      "Productivité"
    ],
    pedagogicalActivities: [
      "Gestion d'emails",
      "Tri intelligent"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "62d21095-2982-4ca3-85eb-1b28a0cd9f56",
    name: "SUNO.AI",
    logo: null,
    icon: "i-lucide-music",
    shortDescription: "Génération de musique par IA",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://suno.ai",
    targetAudience: "tous",
    categories: [
      "Intelligence artificielle",
      "Musique",
      "Création"
    ],
    pedagogicalActivities: [
      "Création musicale par IA"
    ],
    disciplines: [
      "Musique",
      "Arts"
    ],
    usageNotes: "Usage interdit ou fortement déconseillé pour des raisons de protection des données"
  },
  {
    id: "23d425ac-29fd-4013-b995-a5072f6ba920",
    name: "TAPTOUCHE",
    logo: null,
    icon: "i-lucide-keyboard",
    shortDescription: "Logiciel d'apprentissage de la dactylographie",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Financé CEJEF",
    toolUrl: "https://www.taptouche.com",
    targetAudience: "élèves",
    categories: [
      "Dactylographie",
      "Informatique",
      "Compétences transversales"
    ],
    pedagogicalActivities: [
      "Apprentissage du clavier",
      "Exercices de frappe"
    ],
    disciplines: [
      "Informatique"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "2e312dcf-ad29-47e8-8e22-0a2c0091b8c2",
    name: "TEAMVIEWER",
    logo: null,
    icon: "i-lucide-monitor-smartphone",
    shortDescription: "Logiciel de prise de contrôle à distance",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: null,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.teamviewer.com",
    targetAudience: "enseignants",
    categories: [
      "Support technique",
      "Accès distant"
    ],
    pedagogicalActivities: [
      "Prise de contrôle à distance",
      "Support technique"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "3480da50-548b-4cef-88d8-193656569cb1",
    name: "THREEMA EDUCATION",
    logo: null,
    icon: "i-lucide-message-circle",
    shortDescription: "Messagerie sécurisée suisse pour l'éducation",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://threema.ch/en/education",
    targetAudience: "tous",
    categories: [
      "Messagerie",
      "Communication",
      "Sécurité"
    ],
    pedagogicalActivities: [
      "Messagerie sécurisée",
      "Communication"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "5b46800b-124b-4bfd-b8bd-6fd10ae05202",
    name: "THUNDERBIRD",
    logo: null,
    icon: "i-simple-icons-thunderbird",
    shortDescription: "Client de messagerie open source",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.thunderbird.net",
    targetAudience: "tous",
    categories: [
      "Messagerie",
      "Open source",
      "Bureautique"
    ],
    pedagogicalActivities: [
      "Gestion d'emails",
      "Calendrier"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "a0be678f-4a3a-4a7a-96d9-343786b93bf6",
    name: "TRIMBLE INC.",
    logo: null,
    icon: "i-lucide-map",
    shortDescription: "Solutions de géolocalisation et cartographie",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.trimble.com",
    targetAudience: "enseignants",
    categories: [
      "Géographie",
      "Cartographie",
      "GPS"
    ],
    pedagogicalActivities: [
      "Cartographie",
      "Géolocalisation"
    ],
    disciplines: [
      "Géographie",
      "Sciences"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "9d01b167-6471-4487-8ba0-f4a9af752a6e",
    name: "VOKAPI (app)",
    logo: null,
    icon: "i-lucide-book-a",
    shortDescription: "Application d'apprentissage de vocabulaire",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://vokapi.com",
    targetAudience: "élèves",
    categories: [
      "Vocabulaire",
      "Langues",
      "Mémorisation"
    ],
    pedagogicalActivities: [
      "Apprentissage de vocabulaire",
      "Révision"
    ],
    disciplines: [
      "Langues"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "f9af22cc-36a0-4396-abc9-ba9bf737800f",
    name: "WAKELET",
    logo: null,
    icon: "i-lucide-bookmark",
    shortDescription: "Plateforme de curation et partage de ressources",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://wakelet.com",
    targetAudience: "enseignants",
    categories: [
      "Curation",
      "Partage",
      "Organisation"
    ],
    pedagogicalActivities: [
      "Organisation de ressources",
      "Partage de collections"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "29be1ce5-35d2-463e-a287-48b8f19e4ed1",
    name: "WAYGROUND (anc. QUIZIZZ)",
    logo: null,
    icon: "i-lucide-gamepad",
    shortDescription: "Plateforme de quiz gamifiés (anciennement Quizizz)",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://quizizz.com",
    targetAudience: "enseignants",
    categories: [
      "Quiz",
      "Gamification",
      "Évaluation"
    ],
    pedagogicalActivities: [
      "Quiz interactifs",
      "Devoirs gamifiés",
      "Évaluation"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "4a9e711f-5a8f-4658-a001-cee48ba0ee43",
    name: "WOOCLAP",
    logo: null,
    icon: "i-lucide-presentation",
    shortDescription: "Plateforme d'interaction en temps réel avec le public",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.wooclap.com",
    targetAudience: "enseignants",
    categories: [
      "Interaction",
      "Sondages",
      "Quiz"
    ],
    pedagogicalActivities: [
      "Sondages en direct",
      "Quiz interactifs",
      "Nuages de mots"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "d1007e0f-842c-4303-92b8-973d3bf6e401",
    name: "WOOFLASH",
    logo: null,
    icon: "i-lucide-zap",
    shortDescription: "Plateforme d'apprentissage adaptatif par questions",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.wooflash.com",
    targetAudience: "tous",
    categories: [
      "Apprentissage adaptatif",
      "Quiz",
      "Mémorisation"
    ],
    pedagogicalActivities: [
      "Questions adaptatives",
      "Révision espacée"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "582ce878-095c-490d-985a-0faf57d51d15",
    name: "WORDWALL",
    logo: null,
    icon: "i-lucide-grid-3x3",
    shortDescription: "Création d'activités interactives et jeux pédagogiques",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://wordwall.net",
    targetAudience: "enseignants",
    categories: [
      "Jeux éducatifs",
      "Activités interactives"
    ],
    pedagogicalActivities: [
      "Création de jeux",
      "Roue de la fortune",
      "Quiz",
      "Cartes à associer"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé avec précautions - consulter les remarques LGPD"
  },
  {
    id: "fee16798-8574-405d-9269-ce97473e3957",
    name: "ZAPIER Et ZAPIER OUTLOOK",
    logo: null,
    icon: "i-lucide-workflow",
    shortDescription: "Automatisation de workflows entre applications",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: null,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://zapier.com",
    targetAudience: "enseignants",
    categories: [
      "Automatisation",
      "Productivité",
      "Intégration"
    ],
    pedagogicalActivities: [
      "Automatisation de tâches",
      "Connexion d'applications"
    ],
    disciplines: [
      "Transversal"
    ],
    usageNotes: "Usage autorisé"
  },
  {
    id: "microsoft-word",
    name: "Microsoft Word",
    logo: null,
    icon: "i-simple-icons-microsoftword",
    shortDescription: "Traitement de texte de la suite Office 365",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://www.office.com/launch/word",
    targetAudience: "tous",
    categories: ["Bureautique", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Rédaction", "Collaboration"]
  },
  {
    id: "microsoft-excel",
    name: "Microsoft Excel",
    logo: null,
    icon: "i-simple-icons-microsoftexcel",
    shortDescription: "Tableur de la suite Office 365",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://www.office.com/launch/excel",
    targetAudience: "tous",
    categories: ["Bureautique", "Productivité", "Mathématiques"],
    disciplines: ["Toutes", "Mathématiques", "Sciences"],
    pedagogicalActivities: ["Calcul", "Analyse de données", "Graphiques"]
  },
  {
    id: "microsoft-powerpoint",
    name: "Microsoft PowerPoint",
    logo: null,
    icon: "i-simple-icons-microsoftpowerpoint",
    shortDescription: "Outil de présentation de la suite Office 365",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://www.office.com/launch/powerpoint",
    targetAudience: "tous",
    categories: ["Bureautique", "Présentation", "Design"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Présentation", "Exposé", "Création visuelle"]
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    logo: null,
    icon: "i-simple-icons-microsoftteams",
    shortDescription: "Plateforme de communication et collaboration",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://teams.microsoft.com",
    targetAudience: "tous",
    categories: ["Communication", "Collaboration", "Visioconférence"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Travail de groupe", "Communication", "Classe virtuelle"]
  },
  {
    id: "microsoft-onedrive",
    name: "Microsoft OneDrive",
    logo: null,
    icon: "i-simple-icons-microsoftonedrive",
    shortDescription: "Stockage cloud personnel et partage de fichiers",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://portal.office.com/onedrive",
    targetAudience: "tous",
    categories: ["Stockage", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Archivage", "Partage de ressources"]
  },
  {
    id: "microsoft-onenote",
    name: "Microsoft OneNote",
    logo: null,
    icon: "i-simple-icons-microsoftonenote",
    shortDescription: "Prise de notes numérique organisée",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://www.onenote.com/notebooks",
    targetAudience: "tous",
    categories: ["Productivité", "Organisation"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Prise de notes", "Portfolio", "Organisation"]
  },
  {
    id: "microsoft-forms",
    name: "Microsoft Forms",
    logo: null,
    icon: "i-simple-icons-microsoft",
    shortDescription: "Création de formulaires et questionnaires",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://forms.office.com",
    targetAudience: "tous",
    categories: ["Évaluation", "Sondage"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Quiz", "Sondage", "Évaluation formative"]
  },
  {
    id: "microsoft-outlook",
    name: "Microsoft Outlook",
    logo: null,
    icon: "i-simple-icons-microsoftoutlook",
    shortDescription: "Gestionnaire de courrier électronique et calendrier",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://outlook.office.com",
    targetAudience: "tous",
    categories: ["Communication", "Organisation"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Communication", "Planification"]
  },
  {
    id: "mozilla-firefox",
    name: "Mozilla Firefox",
    logo: null,
    icon: "i-simple-icons-firefox",
    shortDescription: "Navigateur web open-source respectueux de la vie privée",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.mozilla.org/firefox",
    targetAudience: "tous",
    categories: ["Navigateurs", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Recherche d'information", "Navigation web"],
    usageNotes: "Navigateur recommandé par le CEJEF pour sa protection des données."
  },
  {
    id: "google-chrome",
    name: "Google Chrome",
    logo: null,
    icon: "i-simple-icons-googlechrome",
    shortDescription: "Navigateur web rapide développé par Google",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.google.com/chrome",
    targetAudience: "tous",
    categories: ["Navigateurs", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Recherche d'information", "Navigation web"],
    usageNotes: "Collecte de données importante. Privilégier Firefox pour les données sensibles.",
    greenAlternatives: ["mozilla-firefox", "brave-browser"]
  },
  {
    id: "microsoft-edge",
    name: "Microsoft Edge",
    logo: null,
    icon: "i-simple-icons-microsoftedge",
    shortDescription: "Navigateur web intégré à Windows",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.microsoft.com/edge",
    targetAudience: "tous",
    categories: ["Navigateurs", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Recherche d'information", "Navigation web"],
    usageNotes: "Collecte de données similaire à Chrome. Privilégier Firefox.",
    greenAlternatives: ["mozilla-firefox", "brave-browser"]
  },
  {
    id: "apple-safari",
    name: "Apple Safari",
    logo: null,
    icon: "i-simple-icons-safari",
    shortDescription: "Navigateur web par défaut sur macOS et iOS",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.apple.com/safari",
    targetAudience: "tous",
    categories: ["Navigateurs", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Recherche d'information", "Navigation web"],
    usageNotes: "Bonne protection de la vie privée par défaut."
  },
  {
    id: "brave-browser",
    name: "Brave",
    logo: null,
    icon: "i-simple-icons-brave",
    shortDescription: "Navigateur axé sur la confidentialité et le blocage de publicités",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://brave.com",
    targetAudience: "tous",
    categories: ["Navigateurs", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Recherche d'information", "Navigation web"],
    usageNotes: "Excellent pour la protection contre le pistage."
  },
  {
    id: "notion-app",
    name: "Notion",
    logo: null,
    icon: "i-simple-icons-notion",
    shortDescription: "Espace de travail tout-en-un (notes, tâches, wikis)",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.notion.so",
    targetAudience: "tous",
    categories: ["Productivité", "Organisation", "Gestion de projet"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Prise de notes", "Gestion de projet", "Portfolio"],
    usageNotes: "Hébergement aux USA. Ne pas y stocker de données sensibles (noms d'élèves, notes)."
  },
  {
    id: "todoist-app",
    name: "Todoist",
    logo: null,
    icon: "i-simple-icons-todoist",
    shortDescription: "Gestionnaire de tâches et to-do lists",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://todoist.com",
    targetAudience: "tous",
    categories: ["Productivité", "Organisation", "Gestion de projet"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Planification", "Gestion de tâches"],
    usageNotes: "Données hébergées hors UE."
  },
  {
    id: "dia-diagram",
    name: "Dia",
    logo: null,
    icon: "i-lucide-network",
    shortDescription: "Logiciel de création de diagrammes (alternative à Visio)",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "http://dia-installer.de",
    targetAudience: "tous",
    categories: ["Bureautique", "Design"],
    disciplines: ["Informatique", "Sciences"],
    pedagogicalActivities: ["Schématisation", "Modélisation"],
    usageNotes: "Logiciel open-source fonctionnant en local."
  },
  {
    id: "gravity-designer",
    name: "Gravity Designer",
    logo: null,
    icon: "i-lucide-pen-tool",
    shortDescription: "Outil de design vectoriel complet",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.designer.io",
    targetAudience: "tous",
    categories: ["Design", "Graphisme"],
    disciplines: ["Arts", "Informatique"],
    pedagogicalActivities: ["Création graphique", "Illustration"],
    usageNotes: "Version web nécessite un compte."
  },
  {
    id: "mongodb-atlas",
    name: "MongoDB Atlas",
    logo: null,
    icon: "i-simple-icons-mongodb",
    shortDescription: "Service de base de données cloud",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.mongodb.com/atlas",
    targetAudience: "élèves",
    categories: ["Développement", "Informatique", "Base de données"],
    disciplines: ["Informatique"],
    pedagogicalActivities: ["Base de données", "Développement web"],
    usageNotes: "Choisir une région UE si possible. Attention aux données stockées."
  },
  {
    id: "jetbrains-webstorm",
    name: "WebStorm",
    logo: null,
    icon: "i-simple-icons-webstorm",
    shortDescription: "IDE puissant pour le développement JavaScript/TypeScript",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://www.jetbrains.com/webstorm",
    targetAudience: "élèves",
    categories: ["Développement", "Informatique", "IDE"],
    disciplines: ["Informatique"],
    pedagogicalActivities: ["Programmation", "Développement web"],
    usageNotes: "Licence éducative gratuite disponible."
  },
  {
    id: "jetbrains-phpstorm",
    name: "PhpStorm",
    logo: null,
    icon: "i-simple-icons-phpstorm",
    shortDescription: "IDE professionnel pour PHP",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://www.jetbrains.com/phpstorm",
    targetAudience: "élèves",
    categories: ["Développement", "Informatique", "IDE"],
    disciplines: ["Informatique"],
    pedagogicalActivities: ["Programmation", "Développement web"],
    usageNotes: "Licence éducative gratuite disponible."
  },
  {
    id: "zed-editor",
    name: "Zed",
    logo: null,
    icon: "i-lucide-zap",
    shortDescription: "Éditeur de code haute performance collaboratif",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://zed.dev",
    targetAudience: "élèves",
    categories: ["Développement", "Informatique", "IDE"],
    disciplines: ["Informatique"],
    pedagogicalActivities: ["Programmation", "Collaboration"],
    usageNotes: "Fonctionne en local. Collaboration via serveur (chiffré)."
  },
  {
    id: "sublime-text",
    name: "Sublime Text",
    logo: null,
    icon: "i-simple-icons-sublimetext",
    shortDescription: "Éditeur de texte sophistiqué pour le code",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://www.sublimetext.com",
    targetAudience: "tous",
    categories: ["Développement", "Productivité", "IDE"],
    disciplines: ["Informatique", "Toutes"],
    pedagogicalActivities: ["Programmation", "Édition de texte"],
    usageNotes: "Version d'évaluation illimitée."
  },
  {
    id: "cursor-editor",
    name: "Cursor",
    logo: null,
    icon: "i-lucide-mouse-pointer-2",
    shortDescription: "Éditeur de code boosté à l'IA (basé sur VS Code)",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://cursor.sh",
    targetAudience: "élèves",
    categories: ["Développement", "Intelligence artificielle (IA)", "IDE"],
    disciplines: ["Informatique"],
    pedagogicalActivities: ["Programmation", "Assistance IA"],
    usageNotes: "Envoie des extraits de code aux serveurs pour l'IA. Attention aux données sensibles."
  },
  {
    id: "antigravity-agent",
    name: "Antigravity",
    logo: null,
    icon: "i-lucide-rocket",
    shortDescription: "Assistant IA avancé pour le développement",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Gratuit",
    toolUrl: "#",
    targetAudience: "tous",
    categories: ["Intelligence artificielle (IA)", "Développement", "Productivité"],
    disciplines: ["Informatique", "Transversal"],
    pedagogicalActivities: ["Assistance", "Génération de code", "Analyse"],
    usageNotes: "L'outil que vous utilisez actuellement !"
  },
  {
    id: "ghostty-terminal",
    name: "Ghostty",
    logo: null,
    icon: "i-lucide-terminal",
    shortDescription: "Émulateur de terminal rapide et moderne",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://mitchellh.com/ghostty",
    targetAudience: "élèves",
    categories: ["Développement", "Informatique", "Terminal"],
    disciplines: ["Informatique"],
    pedagogicalActivities: ["Ligne de commande", "Administration système"],
    usageNotes: "Application locale."
  },
  {
    id: "bruno-api",
    name: "Bruno",
    logo: null,
    icon: "i-lucide-send",
    shortDescription: "Client API open-source (alternative à Postman)",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://www.usebruno.com",
    targetAudience: "élèves",
    categories: ["Développement", "Informatique", "API"],
    disciplines: ["Informatique"],
    pedagogicalActivities: ["Test API", "Développement web"],
    usageNotes: "Stocke les collections en local (Git-friendly). Pas de cloud obligatoire."
  },
  {
    id: "openai-chatgpt",
    name: "ChatGPT",
    logo: null,
    icon: "i-simple-icons-openai",
    shortDescription: "Assistant IA conversationnel polyvalent",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://chat.openai.com",
    targetAudience: "tous",
    categories: ["Intelligence artificielle (IA)", "Productivité", "Rédaction"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Assistance", "Génération de texte", "Correction"],
    usageNotes: "Attention aux données personnelles. Ne pas soumettre de travaux d'élèves non anonymisés."
  },
  {
    id: "anthropic-claude",
    name: "Claude",
    logo: null,
    icon: "i-simple-icons-anthropic",
    shortDescription: "Assistant IA performant pour l'analyse et la rédaction",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://claude.ai",
    targetAudience: "tous",
    categories: ["Intelligence artificielle (IA)", "Productivité", "Analyse"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Analyse de documents", "Synthèse", "Rédaction"],
    usageNotes: "Hébergé aux USA. Prudence avec les données sensibles."
  },
  {
    id: "google-gemini",
    name: "Gemini",
    logo: null,
    icon: "i-simple-icons-googlegemini",
    shortDescription: "IA multimodale de Google intégrée à l'écosystème",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://gemini.google.com",
    targetAudience: "tous",
    categories: ["Intelligence artificielle (IA)", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Recherche", "Création de contenu"],
    usageNotes: "Collecte de données Google. À utiliser avec discernement."
  },
  {
    id: "mistral-ai",
    name: "Mistral Le Chat",
    logo: null,
    icon: "i-lucide-brain",
    shortDescription: "Assistant IA français performant et open-weights",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://chat.mistral.ai",
    targetAudience: "tous",
    categories: ["Intelligence artificielle (IA)", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Assistance", "Rédaction", "Code"],
    usageNotes: "Alternative européenne recommandée. Hébergement en UE."
  },
  {
    id: "perplexity-ai",
    name: "Perplexity",
    logo: null,
    icon: "i-simple-icons-perplexity",
    shortDescription: "Moteur de réponse IA citant ses sources",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://www.perplexity.ai",
    targetAudience: "tous",
    categories: ["Intelligence artificielle (IA)", "Recherche"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Recherche documentaire", "Vérification de faits"],
    usageNotes: "Excellent pour la recherche sourcée, mais hébergement US."
  },
  {
    id: "microsoft-copilot",
    name: "Microsoft Copilot",
    logo: null,
    icon: "i-simple-icons-microsoft",
    shortDescription: "Assistant IA intégré à l'écosystème Microsoft",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    certificationLevel: 2,
    dataLocation: "Hors UE",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Freemium",
    toolUrl: "https://copilot.microsoft.com",
    targetAudience: "tous",
    categories: ["Intelligence artificielle (IA)", "Productivité"],
    disciplines: ["Toutes"],
    pedagogicalActivities: ["Assistance", "Création", "Code"],
    usageNotes: "Utiliser avec un compte professionnel pour une meilleure protection (si disponible)."
  }
]
