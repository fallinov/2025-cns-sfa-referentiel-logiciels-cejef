/**
 * GET /api/software
 *
 * Retourne la liste des logiciels publiés depuis Directus, mappés au format
 * `Software` attendu par le frontend (camelCase + lgpd imbriqué + certificationLevel calculé).
 *
 * Source : collection `software` Directus, filtre `status: published`.
 */

import { readItems } from "@directus/sdk"
import type { Software } from "~~/types/software"
import { type DirectusSoftware, mapDataLocationLabel, useDirectusClient } from "../../utils/directus"

function mapSoftware(item: DirectusSoftware): Software {
  const certificationLevel = Math.max(
    item.lgpd_hosting,
    item.lgpd_rgpd,
    item.lgpd_data_collection
  ) as 1 | 2 | 3

  const categoryNames = (item.categories ?? [])
    .map(c => c.category_id?.name)
    .filter((n): n is string => Boolean(n))

  const activityNames = (item.pedagogical_activities ?? [])
    .map(a => a.pedagogical_activity_id?.name)
    .filter((n): n is string => Boolean(n))

  return {
    id: item.id,
    name: item.name,
    logo: item.logo,
    icon: item.icon,
    shortDescription: item.short_description,
    description: item.description,
    lgpd: {
      hosting: item.lgpd_hosting,
      rgpd: item.lgpd_rgpd,
      dataCollection: item.lgpd_data_collection
    },
    certificationLevel,
    // Convertit la valeur technique Directus (switzerland, us_dpf, …) en
    // libellé lisible pour les visiteurs (Suisse, États-Unis (DPF), …).
    dataLocation: mapDataLocationLabel(item.data_location) as Software["dataLocation"],
    requiresEduAccount: item.requires_edu_account,
    requiresEdulog: item.requires_edulog,
    approvedBySEN: item.approved_by_sen,
    approvedBySFP: item.approved_by_sfp,
    cost: (item.cost ?? "Gratuit") as Software["cost"],
    toolUrl: item.tool_url,
    documentation: item.doc_url,
    targetAudience: item.target_audience,
    requiresParentalConsent: item.requires_parental_consent,
    usageNotes: item.notes,
    categories: categoryNames,
    pedagogicalActivities: activityNames,
    createdAt: item.date_created ? new Date(item.date_created).getTime() : undefined,
    updatedAt: item.date_updated ? new Date(item.date_updated).getTime() : undefined
  }
}

export default defineEventHandler(async (): Promise<Software[]> => {
  const directus = useDirectusClient()

  const items = await directus.request(
    readItems("software", {
      filter: { status: { _eq: "published" } },
      fields: [
        "*",
        "categories.category_id.id",
        "categories.category_id.name",
        "pedagogical_activities.pedagogical_activity_id.id",
        "pedagogical_activities.pedagogical_activity_id.name"
      ],
      limit: -1
    })
  )

  return (items as DirectusSoftware[]).map(mapSoftware)
})
