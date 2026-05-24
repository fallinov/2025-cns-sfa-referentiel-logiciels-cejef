import { describe, it, expect } from "vitest"
import { getCertificationLevel } from "~~/types/software"
import {
  CERTIFICATION_LEVELS,
  DEFAULT_CERTIFICATION,
  getCertificationConfig,
  getCertificationColors,
  getCertificationIcon
} from "~/utils/certification"

describe("getCertificationLevel — calcul depuis LGPD", () => {
  it("retourne le max des 3 critères", () => {
    expect(getCertificationLevel({ hosting: 1, rgpd: 1, dataCollection: 1 })).toBe(1)
    expect(getCertificationLevel({ hosting: 2, rgpd: 1, dataCollection: 1 })).toBe(2)
    expect(getCertificationLevel({ hosting: 1, rgpd: 1, dataCollection: 3 })).toBe(3)
    expect(getCertificationLevel({ hosting: 1, rgpd: 3, dataCollection: 1 })).toBe(3)
  })

  it("niveau 1 = tout conforme (CH/UE + RGPD + collecte minimale)", () => {
    expect(getCertificationLevel({ hosting: 1, rgpd: 1, dataCollection: 1 })).toBe(1)
  })

  it("niveau 2 = au moins un critère à 2 (Cloud Act, analytics, etc.)", () => {
    expect(getCertificationLevel({ hosting: 2, rgpd: 1, dataCollection: 1 })).toBe(2)
  })

  it("niveau 3 = au moins un critère à 3 (non conforme)", () => {
    expect(getCertificationLevel({ hosting: 1, rgpd: 1, dataCollection: 3 })).toBe(3)
    expect(getCertificationLevel({ hosting: 3, rgpd: 3, dataCollection: 3 })).toBe(3)
  })

  it("niveau 0 = au moins un axe Non évaluée (règle conservatrice)", () => {
    expect(getCertificationLevel({ hosting: 0, rgpd: 1, dataCollection: 1 })).toBe(0)
    expect(getCertificationLevel({ hosting: 1, rgpd: 0, dataCollection: 3 })).toBe(0)
    expect(getCertificationLevel({ hosting: 0, rgpd: 0, dataCollection: 0 })).toBe(0)
  })
})

describe("getCertificationConfig — helper UI complet", () => {
  it("retourne la config du niveau 1 (Autorisé)", () => {
    const config = getCertificationConfig(1)
    expect(config).toBe(CERTIFICATION_LEVELS[1])
    expect(config.label).toBe("Autorisé")
    expect(config.color).toBe("success")
    expect(config.icon).toBe("i-lucide-check")
  })

  it("retourne la config du niveau 2 (Restreint)", () => {
    const config = getCertificationConfig(2)
    expect(config.label).toBe("Restreint")
    expect(config.color).toBe("warning")
  })

  it("retourne la config du niveau 3 (Interdit)", () => {
    const config = getCertificationConfig(3)
    expect(config.label).toBe("Interdit")
    expect(config.color).toBe("error")
  })

  it("retourne la config du niveau 0 (Non évaluée — gris neutre)", () => {
    const config = getCertificationConfig(0)
    expect(config).toBe(CERTIFICATION_LEVELS[0])
    expect(config.label).toBe("Non évaluée")
    expect(config.color).toBe("neutral")
    expect(config.icon).toBe("i-lucide-help")
  })

  it("retourne DEFAULT_CERTIFICATION pour null", () => {
    expect(getCertificationConfig(null)).toBe(DEFAULT_CERTIFICATION)
  })

  it("retourne DEFAULT_CERTIFICATION pour undefined", () => {
    expect(getCertificationConfig(undefined)).toBe(DEFAULT_CERTIFICATION)
  })

  it("retourne DEFAULT_CERTIFICATION pour un niveau inconnu (ex: 5)", () => {
    expect(getCertificationConfig(5)).toBe(DEFAULT_CERTIFICATION)
  })

  it("DEFAULT_CERTIFICATION a un label 'Inconnu'", () => {
    expect(DEFAULT_CERTIFICATION.label).toBe("Inconnu")
    expect(DEFAULT_CERTIFICATION.color).toBe("neutral")
  })
})

describe("getCertificationColors — extraction trio bg/bgLight/text", () => {
  it("retourne les trois classes pour le niveau 1", () => {
    const colors = getCertificationColors(1)
    expect(colors).toHaveProperty("bg")
    expect(colors).toHaveProperty("bgLight")
    expect(colors).toHaveProperty("text")
    expect(colors.bg).toContain("green")
    expect(colors.text).toContain("green")
  })

  it("fallback DEFAULT_CERTIFICATION pour null", () => {
    const colors = getCertificationColors(null)
    expect(colors.bg).toContain("gray")
    expect(colors.text).toContain("gray")
  })
})

describe("getCertificationIcon — switch simple", () => {
  it.each([
    [0, "i-lucide-help"],
    [1, "i-lucide-check"],
    [2, "i-lucide-alert-triangle"],
    [3, "i-lucide-x"]
  ])("niveau %i → %s", (lvl, expected) => {
    expect(getCertificationIcon(lvl)).toBe(expected)
  })

  it("null → icône help-circle (défaut)", () => {
    expect(getCertificationIcon(null)).toBe("i-lucide-help-circle")
  })

  it("undefined → icône help-circle (défaut)", () => {
    expect(getCertificationIcon(undefined)).toBe("i-lucide-help-circle")
  })

  it("niveau inconnu (4) → icône help-circle (défaut)", () => {
    expect(getCertificationIcon(4)).toBe("i-lucide-help-circle")
  })
})
