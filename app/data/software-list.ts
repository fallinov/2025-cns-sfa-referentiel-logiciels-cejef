import type { Software } from "~~/types/software"

/**
 * Liste des logiciels pédagogiques du référentiel CEJEF
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
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Gratuit",
    toolUrl: "https://kahoot.com",
    documentation: "https://support.kahoot.com",
    targetAudience: "tous",
    categories: ["Quiz", "Évaluation", "Gamification"],
    pedagogicalActivities: ["Quiz interactif", "Évaluation formative"],
    disciplines: ["Transversal"]
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
    certificationLevel: 2,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://padlet.com",
    documentation: "https://help.padlet.com",
    targetAudience: "tous",
    greenAlternatives: ["4", "16"],
    categories: ["Collaboration", "Brainstorming"],
    pedagogicalActivities: ["Tableau blanc", "Travail de groupe"],
    disciplines: ["Transversal"]
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
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://canva.com",
    targetAudience: "tous",
    greenAlternatives: ["11"],
    categories: ["Création graphique", "Design"],
    pedagogicalActivities: ["Infographie", "Présentation"],
    disciplines: ["Arts visuels", "Communication", "Transversal"]
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
    certificationLevel: 1,
    dataLocation: "CEJEF",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Gratuit",
    toolUrl: "https://h5p.org",
    targetAudience: "tous",
    categories: ["Quiz", "Création de contenu", "Évaluation"],
    pedagogicalActivities: ["Vidéo interactive", "Quiz", "Présentation"],
    disciplines: ["Transversal"]
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
    certificationLevel: 3,
    dataLocation: "Hors UE",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://tiktok.com",
    targetAudience: "tous",
    ageRestriction: 13,
    usageNotes: "Interdit pour usage pédagogique (données élèves). Usage personnel enseignant déconseillé.",
    greenAlternatives: ["6"],
    categories: ["Vidéo", "Réseaux sociaux"],
    pedagogicalActivities: ["Partage vidéo"],
    disciplines: ["Communication", "Médias"]
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
    certificationLevel: 1,
    dataLocation: "CEJEF",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Financé CEJEF",
    toolUrl: "https://moodle.org",
    documentation: "https://docs.moodle.org",
    targetAudience: "tous",
    categories: ["LMS", "Plateforme d'apprentissage"],
    pedagogicalActivities: ["Cours en ligne", "Évaluation", "Collaboration"],
    disciplines: ["Transversal"]
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
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Financé CEJEF",
    toolUrl: "https://teams.microsoft.com",
    documentation: "https://support.microsoft.com/teams",
    targetAudience: "tous",
    categories: ["Communication", "Collaboration"],
    pedagogicalActivities: ["Classe virtuelle", "Réunion", "Travail d'équipe"],
    disciplines: ["Transversal"]
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
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://notion.so",
    documentation: "https://notion.so/help",
    targetAudience: "tous",
    greenAlternatives: ["6"],
    categories: ["Documentation", "Collaboration"],
    pedagogicalActivities: ["Prise de notes", "Gestion de projet"],
    disciplines: ["Transversal"]
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
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://figma.com",
    documentation: "https://help.figma.com",
    targetAudience: "tous",
    categories: ["Design", "Prototypage"],
    pedagogicalActivities: ["Maquette", "Design UI/UX"],
    disciplines: ["Arts visuels", "Informatique", "Design"]
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
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://quizlet.com",
    targetAudience: "tous",
    greenAlternatives: ["1", "4"],
    categories: ["Quiz", "Évaluation", "Mémorisation"],
    pedagogicalActivities: ["Flashcards", "Révision", "Quiz"],
    disciplines: ["Transversal"]
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
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://genial.ly",
    documentation: "https://help.genial.ly",
    targetAudience: "tous",
    categories: ["Création de contenu", "Présentation"],
    pedagogicalActivities: ["Présentation interactive", "Infographie"],
    disciplines: ["Transversal"]
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
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: true,
    campusTraining: true,
    cost: "Payant",
    toolUrl: "https://wooclap.com",
    documentation: "https://wooclap.com/help",
    targetAudience: "tous",
    categories: ["Quiz", "Interaction", "Évaluation"],
    pedagogicalActivities: ["Sondage", "Quiz en direct", "Nuage de mots"],
    disciplines: ["Transversal"]
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
    certificationLevel: 1,
    dataLocation: "Suisse",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://mentimeter.com",
    documentation: "https://help.mentimeter.com",
    targetAudience: "tous",
    categories: ["Quiz", "Présentation", "Interaction"],
    pedagogicalActivities: ["Sondage en direct", "Quiz", "Nuage de mots"],
    disciplines: ["Transversal"]
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
    certificationLevel: 2,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://edpuzzle.com",
    documentation: "https://support.edpuzzle.com",
    targetAudience: "tous",
    greenAlternatives: ["4"],
    categories: ["Quiz", "Vidéo", "Évaluation"],
    pedagogicalActivities: ["Vidéo interactive", "Quiz vidéo"],
    disciplines: ["Transversal"]
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
    certificationLevel: 3,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://workspace.google.com",
    documentation: "https://support.google.com/workspace",
    targetAudience: "enseignants",
    usageNotes: "Interdit pour données élèves (collecte extensive). Usage personnel enseignant autorisé.",
    greenAlternatives: ["6", "7"],
    categories: ["Bureautique", "Collaboration"],
    pedagogicalActivities: ["Traitement de texte", "Tableur", "Présentation"],
    disciplines: ["Transversal"]
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
    certificationLevel: 1,
    dataLocation: "Union Européenne",
    personalData: true,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Gratuit",
    toolUrl: "https://framapad.org",
    documentation: "https://framapad.org/abc/fr/",
    targetAudience: "tous",
    categories: ["Collaboration", "Écriture"],
    pedagogicalActivities: ["Écriture collaborative", "Brainstorming"],
    disciplines: ["Transversal"]
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
    certificationLevel: 3,
    dataLocation: "Union Européenne",
    personalData: false,
    supportedByCEJEF: false,
    campusTraining: false,
    cost: "Payant",
    toolUrl: "https://chat.openai.com",
    documentation: "https://help.openai.com",
    targetAudience: "tous",
    ageRestriction: 13,
    usageNotes: "Interdit pour données élèves (non-conformité RGPD, collecte extensive). Usage personnel enseignant autorisé sans données élèves.",
    greenAlternatives: ["4", "6"],
    categories: ["IA", "Rédaction"],
    pedagogicalActivities: ["Brainstorming", "Aide à la rédaction"],
    disciplines: ["Transversal"]
  }
]
