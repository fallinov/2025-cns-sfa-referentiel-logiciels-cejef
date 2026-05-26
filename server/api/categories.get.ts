/**
 * GET /api/categories
 *
 * Retourne la liste complete des categories pedagogiques (collection Directus
 * `category`), y compris celles qui n'ont aucun logiciel associe. Permet au
 * frontend d'afficher la categorie en mode disabled (count = 0) plutot que de
 * la masquer — l'utilisateur voit qu'elle existe au CEJEF en tant que concept,
 * meme si aucun outil n'y est encore reference.
 */

import { readItems } from "@directus/sdk"
import { useDirectusClient } from "../utils/directus"

export interface CategoryEntry {
  id: string
  name: string
  icon: string | null
}

export default defineEventHandler(async (): Promise<CategoryEntry[]> => {
  const directus = useDirectusClient()

  const items = await directus.request(
    readItems("category", {
      fields: ["id", "name", "icon"],
      sort: ["name"],
      limit: -1
    })
  )

  return items as CategoryEntry[]
})
