import { describe, it, expect } from "vitest"
import type { DirectusSoftware } from "~~/server/utils/directus"
import { mapDataLocationLabel, mapSoftware } from "~~/server/utils/directus"

function makeDirectusSoftware(overrides: Partial<DirectusSoftware> = {}): DirectusSoftware {
  return {
    id: "uuid-1",
    status: "published",
    name: "Test Software",
    icon: null,
    logo: null,
    short_description: "Description courte",
    description: null,
    lgpd_hosting: 1,
    lgpd_rgpd: 1,
    lgpd_data_collection: 1,
    data_location: "switzerland",
    cost: "Gratuit",
    funding: null,
    target_audience: null,
    tool_url: "https://example.com",
    doc_url: null,
    notes: null,
    requires_parental_consent: false,
    requires_edu_account: false,
    requires_edulog: false,
    approved_by_sen: false,
    approved_by_sfp: false,
    contractual_safeguards: null,
    date_created: null,
    date_updated: null,
    ...overrides
  }
}

describe("mapDataLocationLabel — valeurs techniques → libellés FR", () => {
  it.each([
    ["switzerland", "Suisse"],
    ["eu_eea", "Union européenne / EEE"],
    ["adequate", "Pays adéquat (UK, Canada, Japon, Corée du Sud…)"],
    ["us_dpf", "États-Unis (avec certification DPF)"],
    ["multi_or_partial", "Hébergement multi-régions / réparti"],
    ["other", "Autre / non adéquat / inconnu"]
  ])("valeur %s → %s", (value, expected) => {
    expect(mapDataLocationLabel(value)).toBe(expected)
  })

  it("null → 'Non renseigné'", () => {
    expect(mapDataLocationLabel(null)).toBe("Non renseigné")
  })

  it("valeur inconnue → 'Non renseigné' (fallback)", () => {
    expect(mapDataLocationLabel("freedonia")).toBe("Non renseigné")
  })

  it("chaîne vide → 'Non renseigné'", () => {
    expect(mapDataLocationLabel("")).toBe("Non renseigné")
  })
})

describe("mapSoftware — transformation Directus → Software", () => {
  describe("certificationLevel = max des 3 axes LGPD", () => {
    it.each([
      [1, 1, 1, 1],
      [1, 2, 1, 2],
      [1, 1, 3, 3],
      [2, 2, 2, 2],
      [3, 1, 2, 3]
    ])("hosting=%i rgpd=%i dataCollection=%i → certificationLevel=%i", (h, r, dc, expected) => {
      const item = makeDirectusSoftware({
        lgpd_hosting: h as 1 | 2 | 3,
        lgpd_rgpd: r as 1 | 2 | 3,
        lgpd_data_collection: dc as 1 | 2 | 3
      })
      expect(mapSoftware(item).certificationLevel).toBe(expected)
    })
  })

  describe("structure LGPD imbriquée", () => {
    it("regroupe les 3 axes dans un objet lgpd", () => {
      const item = makeDirectusSoftware({ lgpd_hosting: 1, lgpd_rgpd: 2, lgpd_data_collection: 3 })
      expect(mapSoftware(item).lgpd).toEqual({ hosting: 1, rgpd: 2, dataCollection: 3 })
    })
  })

  describe("camelCase mapping", () => {
    it("convertit les champs snake_case en camelCase", () => {
      const item = makeDirectusSoftware({
        short_description: "Courte",
        tool_url: "https://t.example",
        doc_url: "https://d.example",
        requires_edu_account: true,
        approved_by_sen: true,
        approved_by_sfp: false,
        requires_parental_consent: true,
        target_audience: "élèves"
      })
      const result = mapSoftware(item)
      expect(result.shortDescription).toBe("Courte")
      expect(result.toolUrl).toBe("https://t.example")
      expect(result.documentation).toBe("https://d.example")
      expect(result.requiresEduAccount).toBe(true)
      expect(result.approvedBySEN).toBe(true)
      expect(result.approvedBySFP).toBe(false)
      expect(result.requiresParentalConsent).toBe(true)
      expect(result.targetAudience).toBe("élèves")
    })
  })

  describe("data_location → dataLocation libellé", () => {
    it("convertit la valeur technique en libellé via mapDataLocationLabel", () => {
      const item = makeDirectusSoftware({ data_location: "us_dpf" })
      expect(mapSoftware(item).dataLocation).toBe("États-Unis (avec certification DPF)")
    })
  })

  describe("cost fallback", () => {
    it("retourne 'Gratuit' si cost est null", () => {
      const item = makeDirectusSoftware({ cost: null })
      expect(mapSoftware(item).cost).toBe("Gratuit")
    })
  })

  describe("relations M2M", () => {
    it("extrait les noms de catégories en filtrant les category_id null", () => {
      const item = makeDirectusSoftware({
        categories: [
          { category_id: { id: "c1", name: "Bureautique" } },
          { category_id: null },
          { category_id: { id: "c2", name: "Multimédia" } }
        ]
      })
      expect(mapSoftware(item).categories).toEqual(["Bureautique", "Multimédia"])
    })

    it("retourne [] si categories est undefined", () => {
      const item = makeDirectusSoftware({ categories: undefined })
      expect(mapSoftware(item).categories).toEqual([])
    })

    it("extrait les noms d'activités pédagogiques", () => {
      const item = makeDirectusSoftware({
        pedagogical_activities: [
          { pedagogical_activity_id: { id: "a1", name: "Évaluation" } },
          { pedagogical_activity_id: { id: "a2", name: "Collaboration" } }
        ]
      })
      expect(mapSoftware(item).pedagogicalActivities).toEqual(["Évaluation", "Collaboration"])
    })

    it("extrait les UUIDs d'alternatives en filtrant les null", () => {
      const item = makeDirectusSoftware({
        alternatives: [
          { alternative_id: { id: "uuid-a" } },
          { alternative_id: null },
          { alternative_id: { id: "uuid-b" } }
        ]
      })
      expect(mapSoftware(item).alternatives).toEqual(["uuid-a", "uuid-b"])
    })

    it("retourne [] si alternatives absent (logiciel sans alternative saisie)", () => {
      const item = makeDirectusSoftware({ alternatives: undefined })
      expect(mapSoftware(item).alternatives).toEqual([])
    })
  })

  describe("dates", () => {
    it("convertit ISO strings en timestamps ms", () => {
      const item = makeDirectusSoftware({
        date_created: "2026-05-23T10:00:00Z",
        date_updated: "2026-05-23T12:00:00Z"
      })
      const result = mapSoftware(item)
      expect(result.createdAt).toBe(new Date("2026-05-23T10:00:00Z").getTime())
      expect(result.updatedAt).toBe(new Date("2026-05-23T12:00:00Z").getTime())
    })

    it("retourne undefined si dates null", () => {
      const item = makeDirectusSoftware({ date_created: null, date_updated: null })
      const result = mapSoftware(item)
      expect(result.createdAt).toBeUndefined()
      expect(result.updatedAt).toBeUndefined()
    })
  })

  describe("préservation des UUIDs et identifiants", () => {
    it("conserve l'id Directus tel quel", () => {
      const item = makeDirectusSoftware({ id: "550e8400-e29b-41d4-a716-446655440000" })
      expect(mapSoftware(item).id).toBe("550e8400-e29b-41d4-a716-446655440000")
    })
  })
})
