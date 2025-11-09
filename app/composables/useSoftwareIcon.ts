/**
 * Composable pour gérer les icônes des logiciels
 * Utilise simple-icons pour les logos officiels
 */

/**
 * Mapping des noms de logiciels vers leurs icônes simple-icons
 * Format: i-simple-icons-{nom}
 */
const SOFTWARE_ICONS: Record<string, string> = {
  'Kahoot!': 'i-simple-icons-kahoot',
  'Padlet': 'i-simple-icons-padlet',
  'Canva': 'i-simple-icons-canva',
  'H5P': 'i-simple-icons-h5p',
  'TikTok': 'i-simple-icons-tiktok',
  'Moodle': 'i-simple-icons-moodle',
  'Microsoft Teams': 'i-simple-icons-microsoftteams',
  'Notion': 'i-simple-icons-notion',
  'Figma': 'i-simple-icons-figma',
  'Quizlet': 'i-simple-icons-quizlet',
  'Genially': 'i-simple-icons-genially',
  'Wooclap': 'i-lucide-presentation', // Pas de logo officiel dans simple-icons
  'Mentimeter': 'i-simple-icons-mentimeter',
  'Edpuzzle': 'i-lucide-film', // Pas de logo officiel dans simple-icons
  'Google Workspace': 'i-simple-icons-google',
  'Framapad': 'i-lucide-file-text', // Pas de logo officiel dans simple-icons
  'ChatGPT': 'i-simple-icons-openai'
}

/**
 * Icône par défaut si aucun logo officiel n'est trouvé
 */
const DEFAULT_ICON = 'i-lucide-box'

/**
 * Retourne l'icône simple-icons pour un logiciel donné
 * @param softwareName - Nom du logiciel
 * @returns Nom de l'icône (format i-simple-icons-xxx)
 */
export const useSoftwareIcon = () => {
  const getIcon = (softwareName: string): string => {
    return SOFTWARE_ICONS[softwareName] || DEFAULT_ICON
  }

  return {
    getIcon
  }
}
