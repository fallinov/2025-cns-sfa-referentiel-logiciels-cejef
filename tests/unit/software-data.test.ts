import { describe, it, expect } from "vitest"
import { softwareList } from "~/data/software-list"
import { getCertificationLevel } from "~~/types/software"

describe("software-list données", () => {
  it("contient au moins 100 logiciels", () => {
    expect(softwareList.length).toBeGreaterThanOrEqual(100)
  })

  it("chaque logiciel a un id unique", () => {
    const ids = softwareList.map(s => s.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it("chaque logiciel a les champs obligatoires", () => {
    for (const software of softwareList) {
      expect(software.id).toBeTruthy()
      expect(software.name).toBeTruthy()
      expect(software.shortDescription).toBeTruthy()
      expect(software.lgpd).toBeDefined()
      expect(software.lgpd.hosting).toBeGreaterThanOrEqual(1)
      expect(software.lgpd.hosting).toBeLessThanOrEqual(3)
      expect(software.lgpd.rgpd).toBeGreaterThanOrEqual(1)
      expect(software.lgpd.rgpd).toBeLessThanOrEqual(3)
      expect(software.lgpd.dataCollection).toBeGreaterThanOrEqual(1)
      expect(software.lgpd.dataCollection).toBeLessThanOrEqual(3)
    }
  })

  it("certificationLevel = max des 3 critères LGPD", () => {
    for (const software of softwareList) {
      const expected = getCertificationLevel(software.lgpd)
      expect(software.certificationLevel).toBe(expected)
    }
  })

  it("les catégories sont des tableaux non vides", () => {
    for (const software of softwareList) {
      expect(Array.isArray(software.categories)).toBe(true)
      expect(software.categories.length).toBeGreaterThan(0)
    }
  })

  it("Socrative est classifié niveau 2 (orange)", () => {
    const socrative = softwareList.find(s => s.name === "SOCRATIVE")
    expect(socrative).toBeDefined()
    expect(socrative!.certificationLevel).toBe(2)
    expect(socrative!.dataLocation).toBe("États-Unis")
  })

  it("Microsoft Teams est classifié niveau 1 (vert)", () => {
    const teams = softwareList.find(s => s.name === "Microsoft Teams")
    expect(teams).toBeDefined()
    expect(teams!.certificationLevel).toBe(1)
  })
})
