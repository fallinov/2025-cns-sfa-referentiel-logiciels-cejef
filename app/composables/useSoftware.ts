import type { Software } from "~~/types/software"

/**
 * Composable d'accès aux logiciels du référentiel.
 *
 * Les données sont chargées au démarrage par `plugins/software-data.ts` depuis
 * l'endpoint serveur `/api/software` (Directus). Stockées dans `useState` pour
 * être partagées entre tous les composants et survivre à la navigation.
 *
 * Le `softwareList` retourné est un Ref<Software[]> — réactif côté Vue.
 * Le `isLoaded` passe à `true` une fois le fetch initial terminé (succès ou
 * échec) — permet de distinguer « chargement en cours » de « liste vide ».
 */
export const useSoftware = () => {
  const softwareList = useState<Software[]>("software-list", () => [])
  const isLoaded = useState<boolean>("software-list-loaded", () => false)

  return {
    softwareList,
    isLoaded,
    getSoftwareList: (): Software[] => softwareList.value,
    getSoftwareById: (id: string): Software | undefined =>
      softwareList.value.find(software => software.id === id)
  }
}
