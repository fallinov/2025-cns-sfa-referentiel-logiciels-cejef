import type { Software } from '~/types/software'

/**
 * Liste des logiciels pédagogiques du référentiel CEJEF
 */
export const softwareList: Software[] = [
  {
    id: '1',
    name: 'Kahoot!',
    logo: '📊',
    shortDescription: 'Plateforme de quiz interactifs pour évaluations formatives et gamification de l\'apprentissage en temps réel.',
    lgpd: {
      hosting: 'UE',
      personalData: 'Autorisées',
      rgpd: 'Conforme',
      dataCollection: 'Limitée'
    },
    supportedBy: 'CEJEF',
    campusTraining: true,
    platforms: ['web', 'smartphone'],
    cost: 'Freemium',
    category: 'Quiz',
    disciplines: ['Transversal'],
    activity: 'Évaluation formative',
    technicalLevel: 'Débutant',
    accountRequired: true,
    languages: ['Français', 'Anglais', 'Allemand'],
    licenseType: 'Freemium',
    toolUrl: 'https://kahoot.com',
    integrations: ['Moodle', 'Teams'],
    documentation: 'https://support.kahoot.com'
  },
  {
    id: '2',
    name: 'Padlet',
    logo: '📌',
    shortDescription: 'Tableau blanc collaboratif pour brainstorming, collecte d\'idées et travaux de groupe asynchrones.',
    lgpd: {
      hosting: 'UE',
      personalData: 'Autorisées',
      rgpd: 'Conforme',
      dataCollection: 'Limitée'
    },
    supportedBy: 'CEJEF',
    campusTraining: false,
    platforms: ['web', 'smartphone', 'tablet'],
    cost: 'Freemium',
    category: 'Collaboration',
    disciplines: ['Transversal'],
    activity: 'Travail collaboratif',
    technicalLevel: 'Débutant',
    accountRequired: true,
    languages: ['Français', 'Anglais'],
    licenseType: 'Freemium',
    toolUrl: 'https://padlet.com'
  },
  {
    id: '3',
    name: 'Canva',
    logo: '🎨',
    shortDescription: 'Outil de création graphique pour infographies, présentations et supports visuels professionnels.',
    lgpd: {
      hosting: 'Hors-UE',
      personalData: 'Anonymisé',
      rgpd: 'Partiel',
      dataCollection: 'Modérée'
    },
    supportedBy: null,
    campusTraining: false,
    platforms: ['web', 'windows', 'mac'],
    cost: 'Freemium',
    category: 'Design',
    disciplines: ['Transversal', 'Arts'],
    activity: 'Création de contenu',
    technicalLevel: 'Débutant',
    accountRequired: true,
    languages: ['Français', 'Anglais', 'Allemand'],
    licenseType: 'Freemium',
    toolUrl: 'https://canva.com'
  },
  {
    id: '4',
    name: 'H5P',
    logo: '🔧',
    shortDescription: 'Création de contenus interactifs intégrables dans Moodle : vidéos enrichies, quiz, présentations.',
    lgpd: {
      hosting: 'CEJEF',
      personalData: 'Autorisées',
      rgpd: 'Conforme',
      dataCollection: 'Limitée'
    },
    supportedBy: 'CEJEF',
    campusTraining: true,
    platforms: ['web'],
    cost: 'Gratuit',
    category: 'Interactif',
    disciplines: ['Transversal'],
    activity: 'Création de contenu',
    technicalLevel: 'Intermédiaire',
    accountRequired: false,
    languages: ['Français', 'Anglais'],
    licenseType: 'Open source',
    toolUrl: 'https://h5p.org',
    integrations: ['Moodle']
  },
  {
    id: '5',
    name: 'TikTok',
    logo: '🎵',
    shortDescription: 'Plateforme de partage vidéo. Hébergement hors-UE avec collecte extensive de données. Non conforme LGPD.',
    lgpd: {
      hosting: 'Chine',
      personalData: 'Interdites',
      rgpd: 'Non conforme',
      dataCollection: 'Extensive'
    },
    supportedBy: null,
    campusTraining: false,
    platforms: ['smartphone', 'tablet'],
    cost: 'Gratuit',
    category: 'Vidéo',
    disciplines: ['Arts', 'Communication'],
    activity: 'Création de contenu',
    technicalLevel: 'Débutant',
    accountRequired: true,
    languages: ['Français', 'Anglais'],
    licenseType: 'Gratuit',
    toolUrl: 'https://tiktok.com'
  }
]
