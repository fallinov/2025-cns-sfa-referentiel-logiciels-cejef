/**
 * Catégories de logiciels pédagogiques
 * Ces données seront migrées vers Directus
 */

export interface Category {
  id: string
  name: string
  description: string
  icon?: string
  color?: string
}

export const categories: Category[] = [
  {
    id: "quiz",
    name: "Quiz & Évaluation",
    description:
      "Outils pour créer des quiz, sondages et évaluations formatives interactives",
    icon: "i-heroicons-academic-cap",
    color: "red"
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description:
      "Plateformes pour le travail collaboratif, partage de documents et co-création",
    icon: "i-heroicons-users",
    color: "red"
  },
  {
    id: "design",
    name: "Design & Création graphique",
    description:
      "Outils de conception graphique, infographies et supports visuels",
    icon: "i-heroicons-paint-brush",
    color: "red"
  },
  {
    id: "interactif",
    name: "Contenu interactif",
    description:
      "Création de contenus pédagogiques interactifs et multimédias enrichis",
    icon: "i-heroicons-cursor-arrow-ripple",
    color: "green"
  },
  {
    id: "video",
    name: "Vidéo & Multimédia",
    description:
      "Outils de création, édition et enrichissement de contenus vidéo",
    icon: "i-heroicons-video-camera",
    color: "error"
  },
  {
    id: "lms",
    name: "LMS & Gestion de cours",
    description:
      "Systèmes de gestion de l'apprentissage et plateformes de cours en ligne",
    icon: "i-heroicons-book-open",
    color: "red"
  },
  {
    id: "communication",
    name: "Communication",
    description:
      "Outils de communication synchrone et asynchrone pour l'enseignement",
    icon: "i-heroicons-chat-bubble-left-right",
    color: "red"
  },
  {
    id: "productivite",
    name: "Productivité",
    description: "Outils d'organisation, gestion de projets et prise de notes",
    icon: "i-heroicons-clipboard-document-list",
    color: "gray"
  },
  {
    id: "presentation",
    name: "Présentation",
    description:
      "Outils pour créer des présentations dynamiques et engageantes",
    icon: "i-heroicons-presentation-chart-bar",
    color: "gray"
  },
  {
    id: "interaction",
    name: "Interaction en classe",
    description:
      "Outils pour engager les étudiants en temps réel durant les cours",
    icon: "i-heroicons-hand-raised",
    color: "red"
  },
  {
    id: "bureautique",
    name: "Bureautique",
    description: "Suites bureautiques et outils de traitement de documents",
    icon: "i-heroicons-document-text",
    color: "gray"
  },
  {
    id: "ia",
    name: "Intelligence Artificielle",
    description:
      "Assistants IA et outils d'apprentissage automatique pour l'éducation",
    icon: "i-heroicons-cpu-chip",
    color: "red"
  },
  {
    id: "codage",
    name: "Codage & Programmation",
    description:
      "Environnements de développement et plateformes d'apprentissage du code",
    icon: "i-heroicons-code-bracket",
    color: "green"
  },
  {
    id: "simulation",
    name: "Simulation & Lab virtuel",
    description:
      "Laboratoires virtuels et simulateurs pour sciences et techniques",
    icon: "i-heroicons-beaker",
    color: "gray"
  },
  {
    id: "carte-mentale",
    name: "Cartes mentales",
    description: "Outils de mind mapping et organisation d'idées visuelles",
    icon: "i-heroicons-squares-plus",
    color: "green"
  }
]

/**
 * Récupère une catégorie par son ID
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id)
}

/**
 * Récupère toutes les catégories
 */
export function getAllCategories(): Category[] {
  return categories
}
