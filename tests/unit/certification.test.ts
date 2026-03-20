import { describe, it, expect } from "vitest"
import { getCertificationLevel } from "~~/types/software"

describe("getCertificationLevel", () => {
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
})
