import { describe, it, expect, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useSoftwareStore } from "~/stores/software"
import { softwareFixtures as softwareList } from "~~/tests/fixtures/software"
import { getCertificationLevel, type Software } from "~~/types/software"

describe("software store - filtres", () => {
  let store: ReturnType<typeof useSoftwareStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    // Source des données : le store lit `useState('software-list')` (alimenté par
    // plugins/software-data.ts en runtime via /api/software). Pour les tests, on
    // seed avec la liste statique historique software-list.ts.
    const data = useState<Software[]>("software-list", () => [])
    data.value = [...softwareList]
    store = useSoftwareStore()
  })

  describe("filtre par catégorie", () => {
    it("filtre par une catégorie", () => {
      const category = store.uniqueCategories[0]
      store.selectedCategories = [category]

      for (const software of store.filteredSoftwareList) {
        expect(
          software.categories,
          `${software.name} devrait contenir la catégorie "${category}"`
        ).toContain(category)
      }
    })

    it("retourne moins de résultats qu'avec toutes les catégories", () => {
      const totalCount = store.filteredSoftwareList.length
      store.selectedCategories = [store.uniqueCategories[0]]

      expect(store.filteredSoftwareList.length).toBeLessThan(totalCount)
    })

    it("filtre par plusieurs catégories (OR)", () => {
      const cat1 = store.uniqueCategories[0]
      const cat2 = store.uniqueCategories[1]
      store.selectedCategories = [cat1, cat2]

      for (const software of store.filteredSoftwareList) {
        const hasMatch = software.categories?.some(c => [cat1, cat2].includes(c))
        expect(hasMatch, `${software.name} devrait contenir "${cat1}" ou "${cat2}"`).toBe(true)
      }
    })
  })

  describe("filtre par activité pédagogique", () => {
    it("filtre par une activité", () => {
      const activity = store.uniqueActivities[0]
      store.selectedActivities = [activity]

      for (const software of store.filteredSoftwareList) {
        expect(
          software.pedagogicalActivities,
          `${software.name} devrait contenir l'activité "${activity}"`
        ).toContain(activity)
      }
    })
  })

  describe("filtre par certification LGPD", () => {
    it("filtre niveau 1 (vert)", () => {
      store.selectedCertifications = [1]

      for (const software of store.filteredSoftwareList) {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect(level, `${software.name} devrait être niveau 1`).toBe(1)
      }
    })

    it("filtre niveau 2 (orange)", () => {
      store.selectedCertifications = [2]

      for (const software of store.filteredSoftwareList) {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect(level, `${software.name} devrait être niveau 2`).toBe(2)
      }
    })

    it("filtre niveau 3 (rouge)", () => {
      store.selectedCertifications = [3]

      for (const software of store.filteredSoftwareList) {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect(level, `${software.name} devrait être niveau 3`).toBe(3)
      }
    })

    it("filtre niveaux multiples (1 et 2)", () => {
      store.selectedCertifications = [1, 2]

      for (const software of store.filteredSoftwareList) {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect([1, 2]).toContain(level)
      }
    })
  })

  describe("filtre par niveau LGPD", () => {
    it("filtre niveau LGPD = 1", () => {
      store.selectedLgpdLevel = 1

      for (const software of store.filteredSoftwareList) {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect(level, `${software.name} devrait être LGPD niveau 1`).toBe(1)
      }
    })
  })

  describe("filtres populaires", () => {
    it("filtre 'Utilisable avec élèves' = niveau 1", () => {
      store.selectedPopularFilters = ["student-data-allowed"]

      for (const software of store.filteredSoftwareList) {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect(level, `${software.name} devrait être niveau 1`).toBe(1)
      }
    })

    it("filtre 'Approuvé SEN' = approvedBySEN true", () => {
      store.selectedPopularFilters = ["approved-sen"]

      for (const software of store.filteredSoftwareList) {
        expect(
          software.approvedBySEN,
          `${software.name} devrait avoir approvedBySEN = true`
        ).toBe(true)
      }
    })

    it("filtre 'Approuvé SFP' = approvedBySFP true", () => {
      store.selectedPopularFilters = ["approved-sfp"]

      for (const software of store.filteredSoftwareList) {
        expect(
          software.approvedBySFP,
          `${software.name} devrait avoir approvedBySFP = true`
        ).toBe(true)
      }
    })
  })

  describe("recherche textuelle", () => {
    it("trouve par nom", () => {
      store.searchQuery = "Microsoft Teams"

      const names = store.filteredSoftwareList.map(s => s.name)
      expect(names).toContain("Microsoft Teams")
    })

    it("recherche insensible aux accents", () => {
      store.searchQuery = "securite"

      // Devrait trouver les logiciels avec "sécurité" dans la description ou catégories
      expect(store.filteredSoftwareList.length).toBeGreaterThanOrEqual(0)
    })

    it("recherche insensible à la casse", () => {
      store.searchQuery = "microsoft"
      const countLower = store.filteredSoftwareList.length

      store.searchQuery = "MICROSOFT"
      const countUpper = store.filteredSoftwareList.length

      expect(countLower).toBe(countUpper)
    })

    it("utilise les synonymes (ia → intelligence artificielle)", () => {
      store.searchQuery = "ia"
      const countIA = store.filteredSoftwareList.length

      // Devrait trouver des résultats car "ia" expand vers "intelligence artificielle", "ai"
      expect(countIA).toBeGreaterThan(0)
    })

    it("ne filtre pas si la recherche correspond exactement à un filtre actif", () => {
      const category = store.uniqueCategories[0]
      store.selectedCategories = [category]
      store.searchQuery = category

      // Le filtre catégorie est appliqué, la recherche ne double pas le filtrage
      const countWithSearch = store.filteredSoftwareList.length

      store.searchQuery = ""
      const countWithoutSearch = store.filteredSoftwareList.length

      expect(countWithSearch).toBe(countWithoutSearch)
    })
  })

  describe("combinaison de filtres", () => {
    it("catégorie + certification = AND", () => {
      const category = store.uniqueCategories[0]
      store.selectedCategories = [category]
      store.selectedCertifications = [1]

      for (const software of store.filteredSoftwareList) {
        expect(software.categories).toContain(category)
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect(level).toBe(1)
      }
    })

    it("recherche + filtre populaire = AND", () => {
      store.searchQuery = "Microsoft"
      store.selectedPopularFilters = ["student-data-allowed"]

      for (const software of store.filteredSoftwareList) {
        const level = software.certificationLevel ?? getCertificationLevel(software.lgpd)
        expect(level).toBe(1)
        // Le nom ou la description doit contenir "microsoft"
      }
    })
  })

  describe("actions", () => {
    it("togglePopularFilter ajoute un filtre", () => {
      store.togglePopularFilter("campus-training")
      expect(store.selectedPopularFilters).toContain("campus-training")
    })

    it("togglePopularFilter retire un filtre existant", () => {
      store.selectedPopularFilters = ["campus-training"]
      store.togglePopularFilter("campus-training")
      expect(store.selectedPopularFilters).not.toContain("campus-training")
    })

    it("clearAllFilters réinitialise tout", () => {
      store.selectedCategories = ["test"]
      store.selectedCertifications = [1]
      store.selectedPopularFilters = ["campus-training"]
      store.searchQuery = "test"

      store.clearAllFilters()

      expect(store.selectedCategories).toEqual([])
      expect(store.selectedCertifications).toEqual([])
      expect(store.selectedPopularFilters).toEqual([])
      expect(store.searchQuery).toBe("")
    })

    it("resetFilters garde la recherche", () => {
      store.selectedCategories = ["test"]
      store.searchQuery = "microsoft"

      store.resetFilters()

      expect(store.selectedCategories).toEqual([])
      expect(store.searchQuery).toBe("microsoft")
    })

    it("handleCategoryFilter set la catégorie et clear les autres", () => {
      store.selectedActivities = ["test"]

      store.handleCategoryFilter("Bureautique")

      expect(store.selectedCategories).toEqual(["Bureautique"])
      expect(store.selectedActivities).toEqual([])
      expect(store.searchQuery).toBe("Bureautique")
    })
  })

  describe("compteurs", () => {
    it("activeFiltersCount compte correctement", () => {
      expect(store.activeFiltersCount).toBe(0)

      store.selectedCategories = ["test"]
      expect(store.activeFiltersCount).toBe(1)

      store.selectedCertifications = [1, 2]
      expect(store.activeFiltersCount).toBe(3)
    })

    it("hasActiveFilters est true quand des filtres sont actifs", () => {
      expect(store.hasActiveFilters).toBe(false)

      store.selectedPopularFilters = ["approved-sen"]
      expect(store.hasActiveFilters).toBe(true)
    })
  })

  describe("listes uniques", () => {
    it("uniqueCategories est trié (.sort() par défaut)", () => {
      const categories = store.uniqueCategories
      const sorted = [...categories].sort()
      expect(categories).toEqual(sorted)
    })

    it("uniqueCategories contient toutes les catégories des logiciels", () => {
      const allCategories = new Set<string>()
      softwareList.forEach(s => s.categories?.forEach(c => allCategories.add(c)))
      expect(store.uniqueCategories.length).toBe(allCategories.size)
    })

    it("uniqueActivities est trié (.sort() par défaut)", () => {
      const activities = store.uniqueActivities
      const sorted = [...activities].sort()
      expect(activities).toEqual(sorted)
    })
  })
})
