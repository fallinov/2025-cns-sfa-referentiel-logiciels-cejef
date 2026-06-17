import { describe, it, expect } from "vitest"
import type { Software } from "~~/types/software"
import { isApprovedForAudience } from "~/utils/approval"

const makeSoftware = (overrides: Partial<Software>): Software =>
  ({ id: "1", name: "Test", ...overrides }) as Software

describe("isApprovedForAudience — symétrie stricte des badges d'approbation", () => {
  it("audience SEN : approuvé seulement si approvedBySEN", () => {
    expect(isApprovedForAudience(makeSoftware({ approvedBySEN: true }), "SEN")).toBe(true)
    expect(isApprovedForAudience(makeSoftware({ approvedBySEN: false }), "SEN")).toBe(false)
  })

  it("audience SFP : approuvé seulement si approvedBySFP", () => {
    expect(isApprovedForAudience(makeSoftware({ approvedBySFP: true }), "SFP")).toBe(true)
    expect(isApprovedForAudience(makeSoftware({ approvedBySFP: false }), "SFP")).toBe(false)
  })

  it("ne mélange pas les audiences : approuvé SEN n'est pas approuvé pour SFP", () => {
    const senOnly = makeSoftware({ approvedBySEN: true, approvedBySFP: false })
    expect(isApprovedForAudience(senOnly, "SFP")).toBe(false)

    const sfpOnly = makeSoftware({ approvedBySEN: false, approvedBySFP: true })
    expect(isApprovedForAudience(sfpOnly, "SEN")).toBe(false)
  })

  it("traite les flags absents (undefined) comme non approuvé", () => {
    expect(isApprovedForAudience(makeSoftware({}), "SEN")).toBe(false)
    expect(isApprovedForAudience(makeSoftware({}), "SFP")).toBe(false)
  })

  it("retourne false pour une audience 'both' (non produite par le store)", () => {
    const approved = makeSoftware({ approvedBySEN: true, approvedBySFP: true })
    expect(isApprovedForAudience(approved, "both")).toBe(false)
  })
})
