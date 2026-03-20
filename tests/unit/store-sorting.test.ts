import { describe, it, expect, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useSoftwareStore } from "~/stores/software"
import { getCertificationLevel } from "~~/types/software"

describe("software store - tri", () => {
  let store: ReturnType<typeof useSoftwareStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSoftwareStore()
  })

  describe("tri par nom (name-asc)", () => {
    it("trie alphabétiquement par nom", () => {
      store.sortBy = "name-asc"
      const names = store.filteredSoftwareList.map(s => s.name)

      for (let i = 1; i < names.length; i++) {
        expect(
          names[i].localeCompare(names[i - 1]),
          `"${names[i]}" devrait être après "${names[i - 1]}"`
        ).toBeGreaterThanOrEqual(0)
      }
    })
  })

  describe("tri par niveau LGPD (level-asc)", () => {
    it("trie par niveau croissant (1 → 2 → 3)", () => {
      store.sortBy = "level-asc"
      const levels = store.filteredSoftwareList.map(s =>
        s.certificationLevel ?? getCertificationLevel(s.lgpd) ?? 99
      )

      for (let i = 1; i < levels.length; i++) {
        expect(
          levels[i],
          `Niveau ${levels[i]} à l'index ${i} devrait être >= ${levels[i - 1]}`
        ).toBeGreaterThanOrEqual(levels[i - 1])
      }
    })

    it("trie alphabétiquement à niveau égal", () => {
      store.sortBy = "level-asc"
      const list = store.filteredSoftwareList

      for (let i = 1; i < list.length; i++) {
        const levelA = list[i - 1].certificationLevel ?? getCertificationLevel(list[i - 1].lgpd) ?? 99
        const levelB = list[i].certificationLevel ?? getCertificationLevel(list[i].lgpd) ?? 99

        if (levelA === levelB) {
          expect(
            list[i].name.localeCompare(list[i - 1].name),
            `À niveau ${levelA} égal, "${list[i].name}" devrait être après "${list[i - 1].name}"`
          ).toBeGreaterThanOrEqual(0)
        }
      }
    })
  })

  describe("tri par date (date-desc)", () => {
    it("trie par date décroissante", () => {
      store.sortBy = "date-desc"
      const dates = store.filteredSoftwareList.map(s => s.createdAt || 0)

      for (let i = 1; i < dates.length; i++) {
        expect(
          dates[i],
          `Date ${dates[i]} à l'index ${i} devrait être <= ${dates[i - 1]}`
        ).toBeLessThanOrEqual(dates[i - 1])
      }
    })
  })

  describe("tri recommandé (recommended)", () => {
    it("place les logiciels 'Approuvé CEJEF' en premier", () => {
      store.sortBy = "recommended"
      const list = store.filteredSoftwareList

      const isApproved = (s: typeof list[0]) =>
        s.supportedByCEJEF && s.campusTraining && (s.certificationLevel ?? getCertificationLevel(s.lgpd)) === 1

      // Trouver la frontière entre approuvés et non-approuvés
      let lastApprovedIndex = -1
      let firstNonApprovedIndex = -1

      for (let i = 0; i < list.length; i++) {
        if (isApproved(list[i])) {
          lastApprovedIndex = i
        } else if (firstNonApprovedIndex === -1) {
          firstNonApprovedIndex = i
        }
      }

      // Tous les approuvés doivent être avant les non-approuvés
      if (lastApprovedIndex !== -1 && firstNonApprovedIndex !== -1) {
        expect(
          lastApprovedIndex,
          "Les logiciels approuvés CEJEF doivent précéder les non-approuvés"
        ).toBeLessThan(firstNonApprovedIndex)
      }
    })

    it("trie par niveau LGPD après le statut approuvé", () => {
      store.sortBy = "recommended"
      const list = store.filteredSoftwareList

      const isApproved = (s: typeof list[0]) =>
        s.supportedByCEJEF && s.campusTraining && (s.certificationLevel ?? getCertificationLevel(s.lgpd)) === 1

      // Parmi les non-approuvés, les niveaux doivent être croissants
      const nonApproved = list.filter(s => !isApproved(s))
      const levels = nonApproved.map(s => s.certificationLevel ?? getCertificationLevel(s.lgpd) ?? 99)

      for (let i = 1; i < levels.length; i++) {
        expect(
          levels[i],
          `Niveau ${levels[i]} devrait être >= ${levels[i - 1]} dans les non-approuvés`
        ).toBeGreaterThanOrEqual(levels[i - 1])
      }
    })
  })

  it("le tri par défaut est 'recommended'", () => {
    expect(store.sortBy).toBe("recommended")
  })
})
