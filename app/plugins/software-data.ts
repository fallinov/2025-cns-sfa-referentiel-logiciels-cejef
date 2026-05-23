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

export default defineNuxtPlugin(async () => {
  const softwareList = useState<Software[]>("software-list", () => [])

  const { data, error } = await useFetch<Software[]>("/api/software", {
    key: "software-list-initial",
    default: () => []
  })

  if (error.value) {
    console.warn("[software-data] Erreur de chargement Directus :", error.value.message)
    return
  }

  if (data.value) {
    softwareList.value = data.value
  }
})
