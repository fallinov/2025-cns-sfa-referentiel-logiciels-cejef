/**
 * Charge la liste des logiciels depuis l'endpoint serveur Nuxt `/api/software`
 * (qui proxifie Directus avec le token serveur-only) au démarrage de l'app,
 * et la stocke dans un useState partagé `software-list`.
 *
 * Le composable `useSoftware` lit ce useState. Le store Pinia s'abonne au ref
 * et les filtres/computed restent réactifs si les données arrivent après le boot.
 *
 * Fallback : en cas d'erreur (Directus indisponible), tableau vide. Le frontend
 * affichera la liste vide plutôt que de crasher.
 */

import type { Software } from "~~/types/software"
import type { CategoryEntry } from "~~/server/api/categories.get"
import type { ActivityEntry } from "~~/server/api/pedagogical-activities.get"

export default defineNuxtPlugin(async () => {
  const softwareList = useState<Software[]>("software-list", () => [])
  const categoryList = useState<CategoryEntry[]>("category-list", () => [])
  const activityList = useState<ActivityEntry[]>("activity-list", () => [])
  const isLoaded = useState<boolean>("software-list-loaded", () => false)

  // Fetch en parallele : la liste de logiciels, la taxonomie complete des
  // categories et celle des activites pedagogiques (incluant les vides,
  // affichees en mode disabled dans les filtres). Les trois sont independantes :
  // si l'une echoue, les autres peuvent quand meme alimenter l'UI.
  const [softwareRes, categoryRes, activityRes] = await Promise.all([
    useFetch<Software[]>("/api/software", {
      key: "software-list-initial",
      default: () => []
    }),
    useFetch<CategoryEntry[]>("/api/categories", {
      key: "category-list-initial",
      default: () => []
    }),
    useFetch<ActivityEntry[]>("/api/pedagogical-activities", {
      key: "activity-list-initial",
      default: () => []
    })
  ])

  if (softwareRes.error.value) {
    console.warn("[software-data] Erreur de chargement logiciels :", softwareRes.error.value.message)
  } else if (softwareRes.data.value) {
    softwareList.value = softwareRes.data.value
  }

  if (categoryRes.error.value) {
    console.warn("[software-data] Erreur de chargement categories :", categoryRes.error.value.message)
  } else if (categoryRes.data.value) {
    categoryList.value = categoryRes.data.value
  }

  if (activityRes.error.value) {
    console.warn("[software-data] Erreur de chargement activites :", activityRes.error.value.message)
  } else if (activityRes.data.value) {
    activityList.value = activityRes.data.value
  }

  isLoaded.value = true
})
