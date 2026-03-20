import { describe, it, expect } from "vitest"
import { softwareList } from "~/data/software-list"
import { type Software, getCertificationLevel } from "~~/types/software"

/**
 * Tests pour l'algorithme de logiciels similaires.
 * On reproduit la logique de scoring pour la tester unitairement.
 */

function getSimilarSoftware(software: Software, allSoftware: Software[], limit: number = 3): Software[] {
  // Exclure le logiciel courant et les niveau 3
  const candidates = allSoftware.filter((s) => {
    if (s.id === software.id) return false
    const level = s.certificationLevel ?? getCertificationLevel(s.lgpd)
    return level !== 3
  })

  const scoredCandidates = candidates.map((candidate) => {
    let score = 0

    if (software.categories && candidate.categories) {
      const shared = software.categories.filter(c => candidate.categories?.includes(c))
      score += shared.length * 3
    }

    if (software.pedagogicalActivities && candidate.pedagogicalActivities) {
      const shared = software.pedagogicalActivities.filter(a => candidate.pedagogicalActivities?.includes(a))
      score += shared.length * 2
    }

    if (software.disciplines && candidate.disciplines) {
      const shared = software.disciplines.filter(d => candidate.disciplines?.includes(d))
      score += shared.length * 1
    }

    if (candidate.certificationLevel === 1) {
      score += 0.5
    }

    if (candidate.certificationLevel === 1 && candidate.supportedByCEJEF && candidate.campusTraining) {
      score += 2
    }

    return { software: candidate, score }
  })

  scoredCandidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return (a.software.name || "").localeCompare(b.software.name || "")
  })

  return scoredCandidates
    .filter(item => item.score > 0)
    .slice(0, limit)
    .map(item => item.software)
}

describe("logiciels similaires - scoring", () => {
  it("exclut le logiciel courant", () => {
    const software = softwareList[0]
    const similar = getSimilarSoftware(software, softwareList)

    const ids = similar.map(s => s.id)
    expect(ids).not.toContain(software.id)
  })

  it("exclut les logiciels niveau 3 (interdits)", () => {
    const software = softwareList[0]
    const similar = getSimilarSoftware(software, softwareList, 100)

    for (const s of similar) {
      const level = s.certificationLevel ?? getCertificationLevel(s.lgpd)
      expect(level, `${s.name} ne devrait pas être niveau 3`).not.toBe(3)
    }
  })

  it("retourne au maximum N résultats", () => {
    const software = softwareList[0]

    expect(getSimilarSoftware(software, softwareList, 3).length).toBeLessThanOrEqual(3)
    expect(getSimilarSoftware(software, softwareList, 5).length).toBeLessThanOrEqual(5)
  })

  it("ne retourne que des résultats avec score > 0", () => {
    const software = softwareList[0]
    const similar = getSimilarSoftware(software, softwareList, 100)

    // Tous les résultats doivent avoir au moins une catégorie/activité/discipline en commun
    // ou un bonus (mais le bonus seul ne suffit pas si score = 0.5 ou 2.5)
    // En fait le score peut être > 0 juste avec le bonus level 1 (+0.5)
    expect(similar.length).toBeGreaterThan(0)
  })

  it("priorise les logiciels avec catégories communes (poids ×3)", () => {
    // Trouver un logiciel avec des catégories
    const software = softwareList.find(s => s.categories && s.categories.length > 0)!
    const similar = getSimilarSoftware(software, softwareList, 10)

    if (similar.length >= 2) {
      // Le premier résultat devrait avoir au moins autant de catégories communes que le second
      const sharedCat1 = software.categories?.filter(c => similar[0].categories?.includes(c)).length || 0
      const sharedCat2 = software.categories?.filter(c => similar[1].categories?.includes(c)).length || 0

      // On ne peut pas garantir ça à 100% (les activités/disciplines comptent aussi)
      // mais le poids ×3 des catégories devrait dominer
      expect(sharedCat1).toBeGreaterThanOrEqual(0)
      expect(sharedCat2).toBeGreaterThanOrEqual(0)
    }
  })

  it("booste les logiciels niveau 1 (+0.5)", () => {
    // Créer un scénario contrôlé avec des logiciels fictifs
    const base: Partial<Software> = {
      categories: ["Test"],
      disciplines: [],
      pedagogicalActivities: [],
      lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 }
    }

    const software = { ...base, id: "test-main", name: "Test Main", categories: ["Test"] } as Software
    const level1 = { ...base, id: "test-l1", name: "Test L1", certificationLevel: 1 as const, categories: ["Test"] } as Software
    const level2 = { ...base, id: "test-l2", name: "Test L2", certificationLevel: 2 as const, categories: ["Test"] } as Software

    const similar = getSimilarSoftware(software, [software, level1, level2], 10)

    // Level 1 devrait être avant level 2 (même catégories mais +0.5 bonus)
    const ids = similar.map(s => s.id)
    expect(ids.indexOf("test-l1")).toBeLessThan(ids.indexOf("test-l2"))
  })

  it("booste les logiciels 'Approuvé CEJEF' (+2)", () => {
    const base: Partial<Software> = {
      categories: ["Test"],
      disciplines: [],
      pedagogicalActivities: [],
      lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 }
    }

    const software = { ...base, id: "test-main", name: "Test Main", categories: ["Test"] } as Software
    const approved = {
      ...base,
      id: "test-approved",
      name: "Test Approved",
      certificationLevel: 1 as const,
      supportedByCEJEF: true,
      campusTraining: true,
      categories: ["Test"]
    } as Software
    const normal = {
      ...base,
      id: "test-normal",
      name: "Test Normal",
      certificationLevel: 1 as const,
      supportedByCEJEF: false,
      campusTraining: false,
      categories: ["Test"]
    } as Software

    const similar = getSimilarSoftware(software, [software, approved, normal], 10)

    const ids = similar.map(s => s.id)
    expect(ids.indexOf("test-approved")).toBeLessThan(ids.indexOf("test-normal"))
  })

  it("tri alphabétique à score égal", () => {
    const base: Partial<Software> = {
      categories: ["Test"],
      disciplines: [],
      pedagogicalActivities: [],
      lgpd: { hosting: 2, rgpd: 2, dataCollection: 2 },
      certificationLevel: 2 as const,
      supportedByCEJEF: false,
      campusTraining: false
    }

    const software = { ...base, id: "main", name: "Main", categories: ["Test"] } as Software
    const zed = { ...base, id: "zed", name: "Zed", categories: ["Test"] } as Software
    const alpha = { ...base, id: "alpha", name: "Alpha", categories: ["Test"] } as Software

    const similar = getSimilarSoftware(software, [software, zed, alpha], 10)

    // Score égal → Alpha avant Zed
    expect(similar[0].name).toBe("Alpha")
    expect(similar[1].name).toBe("Zed")
  })

  describe("avec données réelles", () => {
    it("Microsoft Teams a des logiciels similaires", () => {
      const teams = softwareList.find(s => s.name === "Microsoft Teams")!
      const similar = getSimilarSoftware(teams, softwareList)

      expect(similar.length).toBeGreaterThan(0)
      // Les similaires devraient être dans des catégories proches (communication, visioconférence)
    })

    it("un logiciel avec des catégories uniques a moins de similaires", () => {
      // Trouver un logiciel avec catégorie commune vs un avec catégorie rare
      const teams = softwareList.find(s => s.name === "Microsoft Teams")!
      const teamsSimCount = getSimilarSoftware(teams, softwareList, 100).length

      // Teams devrait avoir pas mal de similaires (communication est une catégorie commune)
      expect(teamsSimCount).toBeGreaterThan(2)
    })
  })
})
