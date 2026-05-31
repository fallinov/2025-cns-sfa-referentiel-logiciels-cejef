import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useAudienceStore } from "~/stores/audience"

const STORAGE_KEY = "referentiel-dp-audience"

describe("audience store — Pinia + localStorage", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it("initialise avec audience=sen, hasChosen=false par défaut", () => {
    const store = useAudienceStore()
    expect(store.audience).toBe("SEN")
    expect(store.hasChosen).toBe(false)
  })

  describe("init() — lecture depuis localStorage", () => {
    it("restaure l'audience 'SEN' stockée", () => {
      localStorage.setItem(STORAGE_KEY, "SEN")
      const store = useAudienceStore()
      store.init()
      expect(store.audience).toBe("SEN")
      expect(store.hasChosen).toBe(true)
    })

    it("restaure l'audience 'SFP' stockée", () => {
      localStorage.setItem(STORAGE_KEY, "SFP")
      const store = useAudienceStore()
      store.init()
      expect(store.audience).toBe("SFP")
      expect(store.hasChosen).toBe(true)
    })

    it("ignore une valeur stockée invalide (hasChosen reste false)", () => {
      localStorage.setItem(STORAGE_KEY, "invalid-value")
      const store = useAudienceStore()
      store.init()
      expect(store.hasChosen).toBe(false)
      expect(store.audience).toBe("SEN")
    })

    it("hasChosen reste false si le localStorage est vide", () => {
      const store = useAudienceStore()
      store.init()
      expect(store.hasChosen).toBe(false)
    })
  })

  describe("setAudience() — persistance", () => {
    it("met à jour audience et persiste dans localStorage", () => {
      const store = useAudienceStore()
      store.setAudience("SFP")
      expect(store.audience).toBe("SFP")
      expect(store.hasChosen).toBe(true)
      expect(localStorage.getItem(STORAGE_KEY)).toBe("SFP")
    })

    it("setAudience('SEN') persiste 'SEN' dans localStorage", () => {
      const store = useAudienceStore()
      store.setAudience("SEN")
      expect(localStorage.getItem(STORAGE_KEY)).toBe("SEN")
    })
  })

  describe("reset() — efface l'état", () => {
    it("réinitialise hasChosen=false et efface le localStorage", () => {
      const store = useAudienceStore()
      store.setAudience("SFP")
      store.reset()
      expect(store.hasChosen).toBe(false)
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })

    it("audience peut conserver sa dernière valeur (mais hasChosen=false force re-choix)", () => {
      const store = useAudienceStore()
      store.setAudience("SFP")
      store.reset()
      // L'audience reste à 'SFP' (pas remise à sen) mais hasChosen=false
      // forcera l'écran de choix d'audience à réapparaître
      expect(store.hasChosen).toBe(false)
    })
  })
})
