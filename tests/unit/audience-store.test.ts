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
    expect(store.audience).toBe("sen")
    expect(store.hasChosen).toBe(false)
  })

  describe("init() — lecture depuis localStorage", () => {
    it("restaure l'audience 'sen' stockée", () => {
      localStorage.setItem(STORAGE_KEY, "sen")
      const store = useAudienceStore()
      store.init()
      expect(store.audience).toBe("sen")
      expect(store.hasChosen).toBe(true)
    })

    it("restaure l'audience 'cejef' stockée", () => {
      localStorage.setItem(STORAGE_KEY, "cejef")
      const store = useAudienceStore()
      store.init()
      expect(store.audience).toBe("cejef")
      expect(store.hasChosen).toBe(true)
    })

    it("ignore une valeur stockée invalide (hasChosen reste false)", () => {
      localStorage.setItem(STORAGE_KEY, "invalid-value")
      const store = useAudienceStore()
      store.init()
      expect(store.hasChosen).toBe(false)
      expect(store.audience).toBe("sen")
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
      store.setAudience("cejef")
      expect(store.audience).toBe("cejef")
      expect(store.hasChosen).toBe(true)
      expect(localStorage.getItem(STORAGE_KEY)).toBe("cejef")
    })

    it("setAudience('sen') persiste 'sen' dans localStorage", () => {
      const store = useAudienceStore()
      store.setAudience("sen")
      expect(localStorage.getItem(STORAGE_KEY)).toBe("sen")
    })
  })

  describe("reset() — efface l'état", () => {
    it("réinitialise hasChosen=false et efface le localStorage", () => {
      const store = useAudienceStore()
      store.setAudience("cejef")
      store.reset()
      expect(store.hasChosen).toBe(false)
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })

    it("audience peut conserver sa dernière valeur (mais hasChosen=false force re-choix)", () => {
      const store = useAudienceStore()
      store.setAudience("cejef")
      store.reset()
      // L'audience reste à 'cejef' (pas remise à sen) mais hasChosen=false
      // forcera l'écran de choix d'audience à réapparaître
      expect(store.hasChosen).toBe(false)
    })
  })
})
