import { describe, it, expect } from "vitest"
import { dataProtectionThemes } from "~/data/data-protection-themes"

describe("data-protection-themes données", () => {
  it("contient 6 thèmes", () => {
    expect(dataProtectionThemes.length).toBe(6)
  })

  it("l'ordre des thèmes respecte la hiérarchie du Genially", () => {
    const ids = dataProtectionThemes.map(t => t.id)
    expect(ids).toEqual([
      "cadre-legal",
      "ordonnances-recommandations",
      "environnement-travail",
      "coordinateurs-numeriques",
      "enseignants",
      "eleves"
    ])
  })

  it("chaque thème a un id unique", () => {
    const ids = dataProtectionThemes.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("chaque thème a les champs obligatoires", () => {
    for (const theme of dataProtectionThemes) {
      expect(theme.id).toBeTruthy()
      expect(theme.title).toBeTruthy()
      expect(theme.shortTitle).toBeTruthy()
      expect(theme.icon).toBeTruthy()
      expect(theme.description).toBeTruthy()
      expect(theme.sections.length).toBeGreaterThan(0)
    }
  })

  it("chaque section a au moins un item", () => {
    for (const theme of dataProtectionThemes) {
      for (const section of theme.sections) {
        expect(section.id).toBeTruthy()
        expect(section.title).toBeTruthy()
        expect(section.icon).toBeTruthy()
        expect(section.items.length).toBeGreaterThan(0)
      }
    }
  })

  it("les IDs sont uniques globalement (ancres URL)", () => {
    const allIds: string[] = []
    for (const theme of dataProtectionThemes) {
      allIds.push(theme.id)
      for (const section of theme.sections) {
        allIds.push(section.id)
        for (const item of section.items) {
          allIds.push(item.id)
        }
      }
    }
    expect(new Set(allIds).size).toBe(allIds.length)
  })

  it("les ressources ont une URL, un titre, une source et un type valide", () => {
    const validTypes = ["link", "document", "video", "image", "schema"]
    for (const theme of dataProtectionThemes) {
      for (const section of theme.sections) {
        for (const item of section.items) {
          for (const r of item.resources) {
            expect(r.url).toBeTruthy()
            expect(r.title).toBeTruthy()
            expect(r.source).toBeTruthy()
            expect(validTypes).toContain(r.type)
          }
        }
      }
    }
  })

  it("le shortTitle est plus court ou égal au title", () => {
    for (const theme of dataProtectionThemes) {
      expect(theme.shortTitle.length).toBeLessThanOrEqual(theme.title.length)
    }
  })

  it("les sections avec 1 item affichent le contenu directement", () => {
    const cadre = dataProtectionThemes.find(t => t.id === "cadre-legal")!
    expect(cadre.sections[0].items.length).toBe(1)
  })

  it("les sections avec 3 items utilisent des tiroirs (Environnement de travail)", () => {
    const env = dataProtectionThemes.find(t => t.id === "environnement-travail")!
    // Sécurité généralités : 3 tiroirs
    const securite = env.sections.find(s => s.id === "securite-generalites")!
    expect(securite.items.length).toBe(3)
    expect(securite.items.map(i => i.id)).toEqual(["securite-m365", "infrastructure", "securite-reseau"])

    // Plateformes scolaires : 3 tiroirs
    const plateformes = env.sections.find(s => s.id === "plateformes-scolaires")!
    expect(plateformes.items.length).toBe(3)
    expect(plateformes.items.map(i => i.id)).toEqual(["educlasse", "cloee2", "webuntis"])

    // edu.jura.ch : 3 tiroirs
    const edu = env.sections.find(s => s.id === "edu-jura-services")!
    expect(edu.items.length).toBe(3)
  })
})
