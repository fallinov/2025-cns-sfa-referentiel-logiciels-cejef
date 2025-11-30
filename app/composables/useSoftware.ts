import type { Software } from "~~/types/software"
import { softwareList } from "~/data/software-list"

/**
 * Composable pour gérer l'accès aux données des logiciels
 */
/**
 * Composable pour gérer l'accès aux données des logiciels
 */

export const useSoftware = () => {
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

  return {
    getSoftwareList,
    getSoftwareById
  }
}
