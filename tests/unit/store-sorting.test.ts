import { describe, it, expect, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useSoftwareStore } from "~/stores/software"
import { useAudienceStore } from "~/stores/audience"
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
    // Score d'approbation contextuel : seules les approbations de l'audience
    // active comptent (DeepL Pro = 1 en SEN, 0 en SFP).
    const approvalScoreFor = (audience: "SEN" | "SFP") => (s: Software) =>
      audience === "SEN" ? (s.approvedBySEN ? 1 : 0) : (s.approvedBySFP ? 1 : 0)

    it("place les logiciels approuvés par l'audience active avant les autres", () => {
      store.sortBy = "recommended"
      const list = store.filteredSoftwareList
      const score = approvalScoreFor("SEN")

      for (let i = 1; i < list.length; i++) {
        expect(score(list[i]!)).toBeLessThanOrEqual(score(list[i - 1]!))
      }
    })

    it("à approbation égale, trie par niveau croissant", () => {
      store.sortBy = "recommended"
      const list = store.filteredSoftwareList
      const score = approvalScoreFor("SEN")

      for (let i = 1; i < list.length; i++) {
        const a = list[i - 1]!
        const b = list[i]!
        if (score(a) === score(b)) {
          const lvlA = a.certificationLevel ?? getCertificationLevel(a.lgpd) ?? 99
          const lvlB = b.certificationLevel ?? getCertificationLevel(b.lgpd) ?? 99
          expect(lvlB).toBeGreaterThanOrEqual(lvlA)
        }
      }
    })

    it("en audience SEN, DeepL Pro et Microsoft Teams (approuvés SEN) sont en tête", () => {
      // Audience par défaut = SEN. Score 1 : DeepL Pro + Teams.
      // Ex aequo sur le niveau (1) → tri alpha → DeepL Pro avant Microsoft Teams.
      store.sortBy = "recommended"
      const top = store.filteredSoftwareList.slice(0, 2).map(s => s.name)
      expect(top).toEqual(["DeepL Pro", "Microsoft Teams"])
    })

    it("en audience SFP, Microsoft Teams et Wooflash (approuvés SFP) sont en tête", () => {
      const audienceStore = useAudienceStore()
      audienceStore.setAudience("SFP")
      store.sortBy = "recommended"
      // Score 1 : Microsoft Teams + Wooflash. Teams (lvl 1) avant Wooflash (lvl 1)
      // par ordre alpha (M < W).
      const top = store.filteredSoftwareList.slice(0, 2).map(s => s.name)
      expect(top).toEqual(["Microsoft Teams", "Wooflash"])
    })

    it("changer d'audience SEN ↔ SFP réordonne la liste", () => {
      store.sortBy = "recommended"
      const audienceStore = useAudienceStore()

      const topInSen = store.filteredSoftwareList[0]!.name
      audienceStore.setAudience("SFP")
      const topInSfp = store.filteredSoftwareList[0]!.name
      // En SEN : DeepL Pro remonte (approuvé SEN seul). En SFP : il redescend.
      expect(topInSen).toBe("DeepL Pro")
      expect(topInSfp).toBe("Microsoft Teams")
    })

    it("DeepL Pro (approuvé SEN) n'a aucun boost quand l'audience est SFP", () => {
      const audienceStore = useAudienceStore()
      audienceStore.setAudience("SFP")
      store.sortBy = "recommended"
      // DeepL Pro doit se retrouver au même rang qu'un logiciel non-approuvé
      // de niveau 1, classé alphabétiquement (donc derrière Teams et Wooflash).
      const names = store.filteredSoftwareList.map(s => s.name)
      const deeplIdx = names.indexOf("DeepL Pro")
      const wooflashIdx = names.indexOf("Wooflash")
      expect(deeplIdx).toBeGreaterThan(wooflashIdx)
    })
  })

  it("le tri par défaut est 'recommended'", () => {
    expect(store.sortBy).toBe("recommended")
  })
})
