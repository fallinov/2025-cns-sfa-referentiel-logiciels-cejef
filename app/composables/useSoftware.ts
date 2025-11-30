import type { Software } from "~~/types/software"
import { softwareList } from "~/data/software-list"

/**
 * Composable pour gérer l'accès aux données des logiciels
 */
export const useSoftware = () => {
  /**
   * Récupère la liste de tous les logiciels
   */
  const getSoftwareList = (): Software[] => {
    // Generate deterministic random dates based on ID to keep hydration consistent
    return softwareList.map(software => {
      // Simple hash function for deterministic seed
      const hash = software.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

      // Random date between 2021 and 2025
      const start = new Date(2021, 0, 1).getTime()
      const end = new Date(2025, 11, 31).getTime()
      const randomTime = start + (hash % (end - start))

      return {
        ...software,
        createdAt: randomTime,
        updatedAt: randomTime
      }
    })
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
