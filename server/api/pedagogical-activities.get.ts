/**
 * GET /api/pedagogical-activities
 *
 * Retourne la liste complete des activites pedagogiques (collection Directus
 * `pedagogical_activity`), y compris celles qui n'ont aucun logiciel associe.
 * Permet au frontend d'afficher l'activite en mode disabled (count = 0) plutot
 * que de la masquer — meme pattern que /api/categories.
 */

import { readItems } from "@directus/sdk"
import { useDirectusClient } from "../utils/directus"

export interface ActivityEntry {
  id: string
  name: string
  icon: string | null
}

export default defineEventHandler(async (): Promise<ActivityEntry[]> => {
  const directus = useDirectusClient()

  const items = await directus.request(
    readItems("pedagogical_activity", {
      fields: ["id", "name", "icon"],
      sort: ["name"],
      limit: -1
    })
  )

  return items as ActivityEntry[]
})
