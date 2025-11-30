import type { Software } from "~~/types/software"
import { softwareList } from "~/data/software-list"

/**
 * Composable pour gérer l'accès aux données des logiciels
 */
export const useSoftware = () => {
  /**
   * Récupère la liste de tous les logiciels
   */
  // Cache the processed list to avoid re-computation
  let processedList: Software[] | null = null

  /**
   * Récupère la liste de tous les logiciels
   */
  const getSoftwareList = (): Software[] => {
    if (processedList) return processedList

    // Generate deterministic dates based on index to keep order consistent
    // Last items in the list will be the most recent
    const startDate = new Date(2023, 0, 1).getTime()
    const endDate = new Date().getTime() // Today
    const totalDuration = endDate - startDate
    const step = totalDuration / Math.max(softwareList.length - 1, 1)

    processedList = softwareList.map((software, index) => {
      // Calculate date based on index
      // index 0 = startDate
      // last index = endDate
      const date = startDate + (index * step)

      return {
        ...software,
        createdAt: date,
        updatedAt: date
      }
    })

    return processedList
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
