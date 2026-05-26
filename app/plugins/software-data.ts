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

export default defineNuxtPlugin(async () => {
  const softwareList = useState<Software[]>("software-list", () => [])
  const categoryList = useState<CategoryEntry[]>("category-list", () => [])
  const isLoaded = useState<boolean>("software-list-loaded", () => false)

  // Fetch en parallele : la liste de logiciels et la taxonomie complete des
  // categories (incluant les categories vides, affichees en mode disabled
  // dans les filtres). Les deux sont independantes : si l'une echoue, l'autre
  // peut quand meme alimenter l'UI.
  const [softwareRes, categoryRes] = await Promise.all([
    useFetch<Software[]>("/api/software", {
      key: "software-list-initial",
      default: () => []
    }),
    useFetch<CategoryEntry[]>("/api/categories", {
      key: "category-list-initial",
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

  isLoaded.value = true
})
