/**
 * Point d'entrée central pour toutes les données du référentiel
 * Ces données seront migrées vers Directus
 */

// Export des catégories
export {
  categories,
  getCategoryById,
  getAllCategories,
  type Category
} from "./categories"

// Export des disciplines
export {
  disciplines,
  getDisciplineById,
  getAllDisciplines,
  getDisciplinesByDepartment,
  type Discipline
} from "./disciplines"

// Export des activités
export {
  activities,
  getActivityById,
  getAllActivities,
  getActivitiesByTaxonomyLevel,
  type Activity
} from "./activities"

// Export de la liste des logiciels
export {
  softwareList
} from "./software-list"
