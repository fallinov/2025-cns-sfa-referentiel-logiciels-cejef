/**
 * GET /api/software/:id
 *
 * Retourne le détail d'un logiciel publié depuis Directus, mappé au format
 * `Software` attendu par le frontend. 404 si non trouvé ou non publié.
 */

import { readItems } from "@directus/sdk"
import type { Software } from "~~/types/software"
import { type DirectusSoftware, SOFTWARE_FIELDS, mapSoftware, useDirectusClient } from "../../utils/directus"

export default defineEventHandler(async (event): Promise<Software> => {
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, message: "ID manquant" })
  }

  const directus = useDirectusClient()

  const items = await directus.request(
    readItems("software", {
      filter: {
        _and: [{ id: { _eq: id } }, { status: { _eq: "published" } }]
      },
      fields: [...SOFTWARE_FIELDS],
      limit: 1
    })
  )

  if (items.length === 0) {
    throw createError({ statusCode: 404, message: "Logiciel non trouvé" })
  }

  return mapSoftware(items[0] as DirectusSoftware)
})
