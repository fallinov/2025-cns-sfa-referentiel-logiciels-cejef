/**
 * Disciplines académiques du CEJEF
 * Ces données seront migrées vers Directus
 */

export interface Discipline {
  id: string
  name: string
  description: string
  icon?: string
  color?: string
  department?: string
}

export const disciplines: Discipline[] = [
  {
    id: "transversal",
    name: "Transversal",
    description: "Outils utilisables dans toutes les disciplines et formations",
    icon: "i-heroicons-arrows-pointing-out",
    color: "gray"
  },
  {
    id: "arts",
    name: "Arts & Design",
    description: "Arts visuels, design graphique, communication visuelle",
    icon: "i-heroicons-paint-brush",
    color: "primary",
    department: "Arts appliqués"
  },
  {
    id: "communication",
    name: "Communication",
    description: "Communication d'entreprise, marketing, médias sociaux",
    icon: "i-heroicons-megaphone",
    color: "primary",
    department: "Commerce"
  },
  {
    id: "informatique",
    name: "Informatique",
    description: "Développement logiciel, réseaux, systèmes d'information",
    icon: "i-heroicons-computer-desktop",
    color: "primary",
    department: "Technique"
  },
  {
    id: "mathematiques",
    name: "Mathématiques",
    description: "Mathématiques pures et appliquées, statistiques",
    icon: "i-heroicons-calculator",
    color: "primary",
    department: "Sciences"
  },
  {
    id: "sciences",
    name: "Sciences naturelles",
    description: "Physique, chimie, biologie, sciences de la terre",
    icon: "i-heroicons-beaker",
    color: "success",
    department: "Sciences"
  },
  {
    id: "langues",
    name: "Langues",
    description: "Français, allemand, anglais, autres langues étrangères",
    icon: "i-heroicons-language",
    color: "primary",
    department: "Langues"
  },
  {
    id: "commerce",
    name: "Commerce & Gestion",
    description: "Comptabilité, économie d'entreprise, gestion",
    icon: "i-heroicons-banknotes",
    color: "success",
    department: "Commerce"
  },
  {
    id: "sante",
    name: "Santé & Social",
    description: "Soins infirmiers, travail social, santé communautaire",
    icon: "i-heroicons-heart",
    color: "error",
    department: "Santé-Social"
  },
  {
    id: "technique",
    name: "Technique",
    description: "Électronique, mécanique, automation, électrotechnique",
    icon: "i-heroicons-wrench-screwdriver",
    color: "gray",
    department: "Technique"
  },
  {
    id: "culture-generale",
    name: "Culture générale",
    description: "Histoire, géographie, philosophie, citoyenneté",
    icon: "i-heroicons-globe-alt",
    color: "primary",
    department: "Culture générale"
  },
  {
    id: "sport",
    name: "Éducation physique",
    description: "Sport, activités physiques, santé et bien-être",
    icon: "i-heroicons-trophy",
    color: "gray",
    department: "Sport"
  },
  {
    id: "musique",
    name: "Musique",
    description: "Théorie musicale, pratique instrumentale, composition",
    icon: "i-heroicons-musical-note",
    color: "primary",
    department: "Arts"
  },
  {
    id: "architecture",
    name: "Architecture",
    description: "Dessin technique, CAO, construction, urbanisme",
    icon: "i-heroicons-building-office",
    color: "gray",
    department: "Technique"
  },
  {
    id: "agriculture",
    name: "Agriculture & Environnement",
    description: "Sciences agronomiques, écologie, développement durable",
    icon: "i-heroicons-leaf",
    color: "success",
    department: "Agriculture"
  }
]

/**
 * Récupère une discipline par son ID
 */
export function getDisciplineById(id: string): Discipline | undefined {
  return disciplines.find(disc => disc.id === id)
}

/**
 * Récupère toutes les disciplines
 */
export function getAllDisciplines(): Discipline[] {
  return disciplines
}

/**
 * Récupère les disciplines par département
 */
export function getDisciplinesByDepartment(department: string): Discipline[] {
  return disciplines.filter(disc => disc.department === department)
}
