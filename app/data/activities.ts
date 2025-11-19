/**
 * Types d'activités pédagogiques
 * Ces données seront migrées vers Directus
 */

export interface Activity {
  id: string
  name: string
  description: string
  icon?: string
  color?: string
  taxonomyLevel?: string // Taxonomie de Bloom
}

export const activities: Activity[] = [
  {
    id: "evaluation-formative",
    name: "Évaluation formative",
    description:
      "Évaluation continue pour mesurer la progression et adapter l'enseignement",
    icon: "i-heroicons-clipboard-document-check",
    color: "primary",
    taxonomyLevel: "Évaluer"
  },
  {
    id: "travail-collaboratif",
    name: "Travail collaboratif",
    description:
      "Activités de groupe pour co-créer et partager des connaissances",
    icon: "i-heroicons-user-group",
    color: "primary",
    taxonomyLevel: "Créer"
  },
  {
    id: "creation-contenu",
    name: "Création de contenu",
    description: "Production de supports pédagogiques, médias et documents",
    icon: "i-heroicons-sparkles",
    color: "primary",
    taxonomyLevel: "Créer"
  },
  {
    id: "gestion-cours",
    name: "Gestion de cours",
    description:
      "Organisation, planification et suivi des activités d'apprentissage",
    icon: "i-heroicons-folder-open",
    color: "gray",
    taxonomyLevel: "Organiser"
  },
  {
    id: "organisation",
    name: "Organisation",
    description: "Structuration des idées, planification et gestion du temps",
    icon: "i-heroicons-squares-2x2",
    color: "gray",
    taxonomyLevel: "Organiser"
  },
  {
    id: "revision",
    name: "Révision",
    description: "Consolidation des connaissances et préparation aux examens",
    icon: "i-heroicons-arrow-path",
    color: "success",
    taxonomyLevel: "Comprendre"
  },
  {
    id: "apprentissage-actif",
    name: "Apprentissage actif",
    description:
      "Engagement actif des apprenants dans le processus d'apprentissage",
    icon: "i-heroicons-light-bulb",
    color: "warning",
    taxonomyLevel: "Appliquer"
  },
  {
    id: "assistance",
    name: "Assistance",
    description: "Aide personnalisée et support à l'apprentissage",
    icon: "i-heroicons-question-mark-circle",
    color: "primary",
    taxonomyLevel: "Comprendre"
  },
  {
    id: "presentation",
    name: "Présentation",
    description: "Communication d'informations et partage de connaissances",
    icon: "i-heroicons-presentation-chart-line",
    color: "gray",
    taxonomyLevel: "Communiquer"
  },
  {
    id: "recherche",
    name: "Recherche",
    description: "Investigation, collecte et analyse d'informations",
    icon: "i-heroicons-magnifying-glass",
    color: "primary",
    taxonomyLevel: "Analyser"
  },
  {
    id: "simulation",
    name: "Simulation",
    description: "Expérimentation virtuelle et mise en situation pratique",
    icon: "i-heroicons-cube-transparent",
    color: "primary",
    taxonomyLevel: "Appliquer"
  },
  {
    id: "brainstorming",
    name: "Brainstorming",
    description: "Génération d'idées créatives et résolution de problèmes",
    icon: "i-heroicons-cloud",
    color: "primary",
    taxonomyLevel: "Créer"
  },
  {
    id: "feedback",
    name: "Feedback",
    description: "Retour sur les performances et amélioration continue",
    icon: "i-heroicons-chat-bubble-bottom-center-text",
    color: "success",
    taxonomyLevel: "Évaluer"
  },
  {
    id: "gamification",
    name: "Gamification",
    description: "Apprentissage ludique par le jeu et les défis",
    icon: "i-heroicons-puzzle-piece",
    color: "error",
    taxonomyLevel: "Appliquer"
  },
  {
    id: "classe-inversee",
    name: "Classe inversée",
    description:
      "Apprentissage autonome hors classe et activités en présentiel",
    icon: "i-heroicons-arrow-uturn-down",
    color: "gray",
    taxonomyLevel: "Appliquer"
  },
  {
    id: "memorisation",
    name: "Mémorisation",
    description: "Techniques pour ancrer les connaissances à long terme",
    icon: "i-heroicons-bookmark",
    color: "success",
    taxonomyLevel: "Se souvenir"
  },
  {
    id: "documentation",
    name: "Documentation",
    description: "Création et consultation de ressources de référence",
    icon: "i-heroicons-document-duplicate",
    color: "primary",
    taxonomyLevel: "Comprendre"
  },
  {
    id: "communication",
    name: "Communication",
    description:
      "Échanges synchrones et asynchrones entre apprenants et enseignants",
    icon: "i-heroicons-chat-bubble-left-ellipsis",
    color: "neutral",
    taxonomyLevel: "Communiquer"
  }
]

/**
 * Récupère une activité par son ID
 */
export function getActivityById(id: string): Activity | undefined {
  return activities.find(act => act.id === id)
}

/**
 * Récupère toutes les activités
 */
export function getAllActivities(): Activity[] {
  return activities
}

/**
 * Récupère les activités par niveau taxonomique
 */
export function getActivitiesByTaxonomyLevel(level: string): Activity[] {
  return activities.filter(act => act.taxonomyLevel === level)
}
