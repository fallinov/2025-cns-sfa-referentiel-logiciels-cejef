import type { Software } from "~~/types/software"

/**
 * Liste des logiciels pédagogiques du référentiel CEJEF
 *
 * Note: Les données category, disciplines et activity font référence aux IDs
 * des fichiers categories.ts, disciplines.ts et activities.ts
 * Ces données seront migrées vers Directus
 */
export const softwareList: Software[] = [
  {
    id: "1",
    name: "Kahoot!",
    logo: null,
    icon: "i-simple-icons-kahoot",
    shortDescription:
      "Plateforme de quiz interactifs pour évaluations formatives et gamification de l'apprentissage en temps réel.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Freemium",
    toolUrl: "https://kahoot.com",
    documentation: "https://support.kahoot.com",
    certificationLevel: 1
  },
  {
    id: "2",
    name: "Padlet",
    logo: null,
    icon: "i-simple-icons-padlet",
    shortDescription:
      "Tableau blanc collaboratif pour brainstorming, collecte d'idées et travaux de groupe asynchrones.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 2
    },
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://padlet.com",
    documentation: "https://help.padlet.com",
    certificationLevel: 2
  },
  {
    id: "3",
    name: "Canva",
    logo: null,
    icon: "i-simple-icons-canva",
    shortDescription:
      "Outil de création graphique pour infographies, présentations et supports visuels professionnels.",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://canva.com",
    certificationLevel: 2
  },
  {
    id: "4",
    name: "H5P",
    logo: "h5p",
    icon: null,
    shortDescription:
      "Création de contenus interactifs intégrables dans Moodle : vidéos enrichies, quiz, présentations.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Gratuit",
    toolUrl: "https://h5p.org",
    certificationLevel: 1
  },
  {
    id: "5",
    name: "TikTok",
    logo: null,
    icon: "i-simple-icons-tiktok",
    shortDescription:
      "Plateforme de partage vidéo. Hébergement hors-UE avec collecte extensive de données. Non conforme LGPD.",
    lgpd: {
      hosting: 3,
      rgpd: 3,
      dataCollection: 3
    },
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://tiktok.com",
    certificationLevel: 3
  },
  {
    id: "6",
    name: "Moodle",
    logo: null,
    icon: "i-simple-icons-moodle",
    shortDescription:
      "Plateforme d'apprentissage en ligne (LMS) open source. Hébergement CEJEF, données sécurisées localement.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Gratuit",
    toolUrl: "https://moodle.org",
    documentation: "https://docs.moodle.org",
    certificationLevel: 1
  },
  {
    id: "7",
    name: "Microsoft Teams",
    logo: null,
    icon: "i-simple-icons-microsoftteams",
    shortDescription:
      "Plateforme de communication et collaboration pour classes virtuelles, réunions et travail d'équipe.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 2
    },
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Freemium",
    toolUrl: "https://teams.microsoft.com",
    documentation: "https://support.microsoft.com/teams",
    certificationLevel: 1
  },
  {
    id: "8",
    name: "Notion",
    logo: null,
    icon: "i-simple-icons-notion",
    shortDescription:
      "Espace de travail tout-en-un pour notes, documentation, bases de données et gestion de projets collaboratifs.",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://notion.so",
    documentation: "https://notion.so/help",
    certificationLevel: 2
  },
  {
    id: "9",
    name: "Figma",
    logo: null,
    icon: "i-simple-icons-figma",
    shortDescription:
      "Outil de design collaboratif pour maquettes, prototypes et interfaces utilisateur en temps réel.",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://figma.com",
    documentation: "https://help.figma.com",
    certificationLevel: 2
  },
  {
    id: "10",
    name: "Quizlet",
    logo: null,
    icon: "i-simple-icons-quizlet",
    shortDescription:
      "Plateforme de cartes mémoire (flashcards) pour révisions et mémorisation active avec jeux éducatifs.",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://quizlet.com",
    certificationLevel: 2
  },
  {
    id: "11",
    name: "Genially",
    logo: null,
    icon: null,
    shortDescription:
      "Création de présentations interactives, infographies animées et contenus visuels engageants.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://genial.ly",
    documentation: "https://help.genial.ly",
    certificationLevel: 1
  },
  {
    id: "12",
    name: "Wooclap",
    logo: null,
    icon: null,
    shortDescription:
      "Outil d'interaction en classe pour sondages, quiz et questions en temps réel durant les cours.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Freemium",
    toolUrl: "https://wooclap.com",
    documentation: "https://wooclap.com/help",
    certificationLevel: 1
  },
  {
    id: "13",
    name: "Mentimeter",
    logo: null,
    icon: null,
    shortDescription:
      "Présentations interactives avec sondages en direct, nuages de mots et quiz pour engager l'audience.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://mentimeter.com",
    documentation: "https://help.mentimeter.com",
    certificationLevel: 1
  },
  {
    id: "14",
    name: "Edpuzzle",
    logo: null,
    icon: null,
    shortDescription:
      "Enrichissement de vidéos avec questions intégrées pour l'apprentissage actif et le suivi des élèves.",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 2
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://edpuzzle.com",
    documentation: "https://support.edpuzzle.com",
    certificationLevel: 2
  },
  {
    id: "15",
    name: "Google Workspace",
    logo: null,
    icon: "i-simple-icons-google",
    shortDescription:
      "Suite bureautique collaborative : Docs, Sheets, Slides, Drive pour travail en ligne et partage.",
    lgpd: {
      hosting: 2,
      rgpd: 2,
      dataCollection: 3
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://workspace.google.com",
    documentation: "https://support.google.com/workspace",
    certificationLevel: 3
  },
  {
    id: "16",
    name: "Framapad",
    logo: null,
    icon: null,
    shortDescription:
      "Éditeur de texte collaboratif en temps réel, open source, respectueux de la vie privée. Hébergement FR.",
    lgpd: {
      hosting: 1,
      rgpd: 1,
      dataCollection: 1
    },
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://framapad.org",
    documentation: "https://framapad.org/abc/fr/",
    certificationLevel: 1
  },
  {
    id: "17",
    name: "ChatGPT",
    logo: null,
    icon: "i-simple-icons-openai",
    shortDescription:
      "Assistant IA conversationnel pour aide à la rédaction, brainstorming et apprentissage personnalisé.",
    lgpd: {
      hosting: 2,
      rgpd: 3,
      dataCollection: 3
    },
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Freemium",
    toolUrl: "https://chat.openai.com",
    documentation: "https://help.openai.com",
    certificationLevel: 3
  }
]
