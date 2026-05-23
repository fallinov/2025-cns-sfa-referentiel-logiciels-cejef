import { describe, it, expect } from "vitest"
import { useDataProtection } from "~/composables/useDataProtection"
import { dataProtectionThemes } from "~/data/data-protection-themes"

describe("useDataProtection — filtrage thèmes/sections/items", () => {
  it("retourne tous les thèmes quand la recherche est vide", () => {
    const { filteredThemes, searchQuery } = useDataProtection()
    searchQuery.value = ""
    expect(filteredThemes.value.length).toBe(dataProtectionThemes.length)
  })

  it("retourne tous les thèmes quand la recherche ne contient que des espaces", () => {
    const { filteredThemes, searchQuery } = useDataProtection()
    searchQuery.value = "   "
    expect(filteredThemes.value.length).toBe(dataProtectionThemes.length)
  })

  it("filtre par titre de thème (match exact accent-insensible)", () => {
    const { filteredThemes, searchQuery } = useDataProtection()
    const firstThemeTitle = dataProtectionThemes[0].title
    searchQuery.value = firstThemeTitle
    expect(filteredThemes.value.length).toBeGreaterThanOrEqual(1)
    expect(filteredThemes.value[0].title).toBe(firstThemeTitle)
  })

  it("hasResults est false quand aucun thème ne matche", () => {
    const { hasResults, searchQuery } = useDataProtection()
    searchQuery.value = "zzzz-aucun-resultat-possible-xyz"
    expect(hasResults.value).toBe(false)
  })

  it("hasResults est true sans recherche (tous les thèmes affichés)", () => {
    const { hasResults, searchQuery } = useDataProtection()
    searchQuery.value = ""
    expect(hasResults.value).toBe(true)
  })

  it("totalSections compte la somme des sections sur tous les thèmes filtrés", () => {
    const { totalSections, searchQuery } = useDataProtection()
    searchQuery.value = ""
    const expectedTotal = dataProtectionThemes.reduce((s, t) => s + t.sections.length, 0)
    expect(totalSections.value).toBe(expectedTotal)
  })

  it("totalSections diminue avec une recherche restrictive", () => {
    const { totalSections, searchQuery } = useDataProtection()
    searchQuery.value = ""
    const totalSansFiltre = totalSections.value
    searchQuery.value = "zzzz-aucun-resultat-xyz"
    expect(totalSections.value).toBeLessThanOrEqual(totalSansFiltre)
    expect(totalSections.value).toBe(0)
  })

  it("recherche accent-insensible (e ↔ é, c ↔ ç)", () => {
    const { filteredThemes, searchQuery } = useDataProtection()
    // Cherche un thème connu en supprimant les accents
    const firstTitle = dataProtectionThemes[0].title
    const titleSansAccents = firstTitle
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
    searchQuery.value = titleSansAccents
    expect(filteredThemes.value.length).toBeGreaterThanOrEqual(1)
  })
})
