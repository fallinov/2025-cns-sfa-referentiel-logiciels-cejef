import { describe, it, expect, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useSoftwareStore } from "~/stores/software"
import { softwareFixtures } from "~~/tests/fixtures/software"
import { getCertificationLevel, type Software } from "~~/types/software"

describe("software store - tri", () => {
  let store: ReturnType<typeof useSoftwareStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    // Seed du useState global lu par useSoftware (qui alimente le store)
    const data = useState<Software[]>("software-list", () => [])
    data.value = [...softwareFixtures]
    store = useSoftwareStore()
  })

  describe("tri par nom (name-asc)", () => {
    it("trie alphabétiquement par nom croissant", () => {
      store.sortBy = "name-asc"
      const names = store.filteredSoftwareList.map(s => s.name)
      expect(names.length).toBeGreaterThan(0)

      for (let i = 1; i < names.length; i++) {
        expect(
          names[i]!.localeCompare(names[i - 1]!),
          `"${names[i]}" doit être après "${names[i - 1]}"`
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
      expect(levels.length).toBeGreaterThan(0)

      for (let i = 1; i < levels.length; i++) {
        expect(levels[i]).toBeGreaterThanOrEqual(levels[i - 1]!)
      }
    })

    it("trie alphabétiquement à niveau égal", () => {
      store.sortBy = "level-asc"
      const list = store.filteredSoftwareList

      for (let i = 1; i < list.length; i++) {
        const levelA = list[i - 1]!.certificationLevel ?? getCertificationLevel(list[i - 1]!.lgpd) ?? 99
        const levelB = list[i]!.certificationLevel ?? getCertificationLevel(list[i]!.lgpd) ?? 99
        if (levelA === levelB) {
          expect(list[i]!.name.localeCompare(list[i - 1]!.name)).toBeGreaterThanOrEqual(0)
        }
      }
    })
  })

  describe("tri par date (date-desc)", () => {
    it("trie par date décroissante (ou par défaut 0)", () => {
      store.sortBy = "date-desc"
      const dates = store.filteredSoftwareList.map(s => s.createdAt || 0)

      for (let i = 1; i < dates.length; i++) {
        expect(dates[i]).toBeLessThanOrEqual(dates[i - 1]!)
      }
    })
  })

  describe("tri 'recommended' (par défaut)", () => {
    it("place les logiciels approuvés (SEN/SFP) avant les non-approuvés", () => {
      store.sortBy = "recommended"
      const list = store.filteredSoftwareList

      const approvalScore = (s: Software) =>
        (s.approvedBySEN ? 1 : 0) + (s.approvedBySFP ? 1 : 0)

      // Le score d'approbation est monotone décroissant
      for (let i = 1; i < list.length; i++) {
        expect(approvalScore(list[i]!)).toBeLessThanOrEqual(approvalScore(list[i - 1]!))
      }
    })

    it("à approbation égale, trie par niveau croissant", () => {
      store.sortBy = "recommended"
      const list = store.filteredSoftwareList

      const approvalScore = (s: Software) =>
        (s.approvedBySEN ? 1 : 0) + (s.approvedBySFP ? 1 : 0)

      for (let i = 1; i < list.length; i++) {
        const a = list[i - 1]!
        const b = list[i]!
        if (approvalScore(a) === approvalScore(b)) {
          const lvlA = a.certificationLevel ?? getCertificationLevel(a.lgpd) ?? 99
          const lvlB = b.certificationLevel ?? getCertificationLevel(b.lgpd) ?? 99
          expect(lvlB).toBeGreaterThanOrEqual(lvlA)
        }
      }
    })

    it("Microsoft Teams (SEN+SFP) apparaît en premier dans les fixtures", () => {
      store.sortBy = "recommended"
      expect(store.filteredSoftwareList[0]!.name).toBe("Microsoft Teams")
    })
  })

  it("le tri par défaut est 'recommended'", () => {
    expect(store.sortBy).toBe("recommended")
  })
})
