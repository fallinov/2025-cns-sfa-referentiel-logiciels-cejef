/**
 * GET /api/data-protection/themes
 *
 * Retourne tous les thèmes Protection des données publiés, avec leurs
 * sections, items et ressources, dans le format attendu par le frontend.
 */

import { readItems } from "@directus/sdk"
import type { DataProtectionTheme } from "~~/types/data-protection"
import { mapDataProtectionThemes, type DirectusDpTheme, type DirectusDpSection, type DirectusDpItem, type DirectusDpResource, type DirectusDpResourceOwner } from "../../utils/data-protection"
import { useDirectusClient } from "../../utils/directus"

export default defineEventHandler(async (): Promise<DataProtectionTheme[]> => {
  const directus = useDirectusClient()

  const [themes, sections, items, resources, owners] = await Promise.all([
    directus.request(
      readItems("dp_theme", {
        filter: { status: { _eq: "published" } },
        fields: ["id", "sort", "title", "short_title", "icon", "description", "audience"],
        sort: ["sort"],
        limit: -1
      })
    ),
    directus.request(
      readItems("dp_section", {
        fields: ["id", "sort", "title", "icon", "audience", "theme_id"],
        sort: ["sort"],
        limit: -1
      })
    ),
    directus.request(
      readItems("dp_item", {
        fields: ["id", "sort", "title", "icon", "description", "audience", "section_id"],
        sort: ["sort"],
        limit: -1
      })
    ),
    directus.request(
      readItems("dp_resource", {
        fields: ["id", "sort", "title", "url", "source", "type", "description", "file_size", "audience"],
        sort: ["sort"],
        limit: -1
      })
    ),
    directus.request(
      readItems("dp_resource_owner", {
        fields: ["id", "dp_resource_id", "collection", "item"],
        limit: -1
      })
    )
  ])

  return mapDataProtectionThemes({
    themes: themes as DirectusDpTheme[],
    sections: sections as DirectusDpSection[],
    items: items as DirectusDpItem[],
    resources: resources as DirectusDpResource[],
    owners: owners as DirectusDpResourceOwner[]
  })
})
