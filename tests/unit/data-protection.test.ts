import { describe, it, expect } from "vitest"
import { dataProtectionThemes } from "~/data/data-protection-themes"

describe("data-protection-themes données", () => {
  it("contient 7 thèmes", () => {
    expect(dataProtectionThemes.length).toBe(7)
  })

  it("chaque thème a un id unique", () => {
    const ids = dataProtectionThemes.map(t => t.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it("chaque thème a les champs obligatoires", () => {
    for (const theme of dataProtectionThemes) {
      expect(theme.id).toBeTruthy()
      expect(theme.title).toBeTruthy()
      expect(theme.shortTitle).toBeTruthy()
      expect(theme.icon).toBeTruthy()
      expect(theme.description).toBeTruthy()
      expect(["sen", "cejef", "both"]).toContain(theme.audience)
      expect(theme.subThemes.length).toBeGreaterThan(0)
    }
  })

  it("chaque sous-thème a un id unique dans son thème", () => {
    for (const theme of dataProtectionThemes) {
      const ids = theme.subThemes.map(s => s.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    }
  })

  it("chaque sous-thème a une audience valide", () => {
    for (const theme of dataProtectionThemes) {
      for (const sub of theme.subThemes) {
        expect(["sen", "cejef", "both"]).toContain(sub.audience)
      }
    }
  })

  it("les ressources ont une URL et un type valide", () => {
    const validTypes = ["link", "document", "video", "image", "schema"]
    for (const theme of dataProtectionThemes) {
      for (const sub of theme.subThemes) {
        for (const resource of sub.resources) {
          expect(resource.url).toBeTruthy()
          expect(resource.title).toBeTruthy()
          expect(resource.source).toBeTruthy()
          expect(validTypes).toContain(resource.type)
        }
      }
    }
  })

  it("le thème Élèves est identique SEN/CEJEF (audience both)", () => {
    const eleves = dataProtectionThemes.find(t => t.id === "eleves")
    expect(eleves).toBeDefined()
    expect(eleves!.audience).toBe("both")
    for (const sub of eleves!.subThemes) {
      expect(sub.audience).toBe("both")
    }
  })

  it("Avenir Formation est uniquement CEJEF", () => {
    const enseignants = dataProtectionThemes.find(t => t.id === "enseignants")
    const avenir = enseignants!.subThemes.find(s => s.id === "avenir-formation")
    expect(avenir).toBeDefined()
    expect(avenir!.audience).toBe("cejef")
  })

  it("le shortTitle est plus court que le title", () => {
    for (const theme of dataProtectionThemes) {
      expect(theme.shortTitle.length).toBeLessThanOrEqual(theme.title.length)
    }
  })
})
