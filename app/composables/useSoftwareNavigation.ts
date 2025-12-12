import type { Software } from "~~/types/software"

/**
 * Composable pour gérer la navigation entre logiciels
 * Stocke la liste filtrée pour permettre la navigation suivant/précédent
 */
export const useSoftwareNavigation = () => {
  // Liste filtrée stockée globalement (mise à jour depuis la page index)
  // Initialiser avec la liste complète par défaut pour permettre la navigation directe
  const filteredList = useState<Software[]>("filteredSoftwareList", () => {
    const { getSoftwareList } = useSoftware()
    const list = [...getSoftwareList()]
    // Tri par défaut (Nom croissant)
    return list.sort((a, b) => a.name.localeCompare(b.name))
  })

  /**
   * Met à jour la liste filtrée (appelé depuis index.vue)
   */
  const setFilteredList = (list: Software[]) => {
    filteredList.value = list
  }

  /**
   * Récupère le logiciel précédent dans la liste filtrée
   */
  const getPreviousSoftware = (currentId: string): Software | null => {
    if (!filteredList.value.length) return null

    const currentIndex = filteredList.value.findIndex(s => s.id === currentId)
    if (currentIndex === -1) return null

    // Si on est au début, boucle vers la fin
    const previousIndex = currentIndex === 0
      ? filteredList.value.length - 1
      : currentIndex - 1

    return filteredList.value[previousIndex] || null
  }

  /**
   * Récupère le logiciel suivant dans la liste filtrée
   */
  const getNextSoftware = (currentId: string): Software | null => {
    if (!filteredList.value.length) return null

    const currentIndex = filteredList.value.findIndex(s => s.id === currentId)
    if (currentIndex === -1) return null

    // Si on est à la fin, boucle vers le début
    const nextIndex = currentIndex === filteredList.value.length - 1
      ? 0
      : currentIndex + 1

    return filteredList.value[nextIndex] || null
  }

  /**
   * Récupère la position actuelle dans la liste filtrée
   */
  const getCurrentPosition = (currentId: string): { current: number, total: number } => {
    const currentIndex = filteredList.value.findIndex(s => s.id === currentId)
    return {
      current: currentIndex + 1,
      total: filteredList.value.length
    }
  }

  return {
    filteredList,
    setFilteredList,
    getPreviousSoftware,
    getNextSoftware,
    getCurrentPosition
  }
}
