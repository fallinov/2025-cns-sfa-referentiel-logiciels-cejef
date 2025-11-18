import type { Software } from "~~/types/software"
import { softwareList } from "~/data/software-list"

/**
 * Composable pour gérer l'état des logiciels et du modal de détail
 */
export const useSoftware = () => {
  // État global partagé entre tous les composants
  const selectedSoftware = useState<Software | null>("selectedSoftware", () => null)
  const isDetailOpen = useState<boolean>("isDetailOpen", () => false)

  /**
   * Récupère la liste de tous les logiciels
   */
  const getSoftwareList = (): Software[] => {
    return softwareList
  }

  /**
   * Récupère un logiciel par son ID
   */
  const getSoftwareById = (id: string): Software | undefined => {
    return softwareList.find(software => software.id === id)
  }

  /**
   * Ouvre le slideover de détail avec un logiciel sélectionné
   */
  const openDetail = (software: Software) => {
    selectedSoftware.value = software
    isDetailOpen.value = true
  }

  /**
   * Ferme le slideover de détail
   */
  const closeDetail = () => {
    isDetailOpen.value = false
    // Garde le software sélectionné pendant la transition de fermeture
    setTimeout(() => {
      selectedSoftware.value = null
    }, 300)
  }

  return {
    // État
    selectedSoftware,
    isDetailOpen,

    // Méthodes
    getSoftwareList,
    getSoftwareById,
    openDetail,
    closeDetail
  }
}
