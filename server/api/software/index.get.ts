/**
 * GET /api/software
 *
 * Retourne la liste des logiciels publiés depuis Directus, mappés au format
 * `Software` attendu par le frontend.
 */

import { readItems } from "@directus/sdk"
import type { Software } from "~~/types/software"
import { type DirectusSoftware, SOFTWARE_FIELDS, mapSoftware, useDirectusClient } from "../../utils/directus"

export default defineEventHandler(async (): Promise<Software[]> => {
  const directus = useDirectusClient()

  const items = await directus.request(
    readItems("software", {
      filter: { status: { _eq: "published" } },
      fields: [...SOFTWARE_FIELDS],
      limit: -1
    })
  )

  return (items as DirectusSoftware[]).map(mapSoftware)
})
