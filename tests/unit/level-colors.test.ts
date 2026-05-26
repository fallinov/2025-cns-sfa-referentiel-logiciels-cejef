import { describe, it, expect } from "vitest"
import {
  getLevelTextColor,
  getLevelBgColor,
  getLevelBorderColor,
  getLevelColorName,
  getLevelTailwindColor,
  getLevelIcon,
  getLevelLabel
} from "~/utils/level-colors"

describe("level-colors — 7 fonctions de mapping niveau → CSS/labels", () => {
  describe("getLevelTextColor", () => {
    it("retourne vert pour le niveau 1", () => {
      expect(getLevelTextColor(1)).toContain("text-green")
    })
    it("retourne orange pour le niveau 2", () => {
      expect(getLevelTextColor(2)).toContain("text-orange")
    })
    it("retourne rouge pour le niveau 3", () => {
      expect(getLevelTextColor(3)).toContain("text-red")
    })
    it("retourne chaîne vide pour null", () => {
      expect(getLevelTextColor(null)).toBe("")
    })
  })

  describe("getLevelBgColor", () => {
    it.each([
      [1, "green"],
      [2, "orange"],
      [3, "red"]
    ] as const)("niveau %i contient %s", (lvl, color) => {
      expect(getLevelBgColor(lvl)).toContain(color)
    })
    it("retourne chaîne vide pour null", () => {
      expect(getLevelBgColor(null)).toBe("")
    })
  })

  describe("getLevelBorderColor", () => {
    it.each([
      [1, "border-green-500"],
      [2, "border-orange-500"],
      [3, "border-red-500"]
    ] as const)("niveau %i → %s", (lvl, expected) => {
      expect(getLevelBorderColor(lvl)).toBe(expected)
    })
    it("retourne chaîne vide pour null", () => {
      expect(getLevelBorderColor(null)).toBe("")
    })
  })

  describe("getLevelColorName — pour Nuxt UI", () => {
    it("niveau 1 → success", () => expect(getLevelColorName(1)).toBe("success"))
    it("niveau 2 → warning", () => expect(getLevelColorName(2)).toBe("warning"))
    it("niveau 3 → error", () => expect(getLevelColorName(3)).toBe("error"))
    it("null → undefined", () => expect(getLevelColorName(null)).toBeUndefined())
  })

  describe("getLevelTailwindColor", () => {
    it("niveau 1 → green", () => expect(getLevelTailwindColor(1)).toBe("green"))
    it("niveau 2 → orange", () => expect(getLevelTailwindColor(2)).toBe("orange"))
    it("niveau 3 → red", () => expect(getLevelTailwindColor(3)).toBe("red"))
    it("null → undefined", () => expect(getLevelTailwindColor(null)).toBeUndefined())
  })

  describe("getLevelIcon — Lucide", () => {
    it("niveau 1 → check", () => expect(getLevelIcon(1)).toBe("i-lucide-check"))
    it("niveau 2 → alert-triangle", () => expect(getLevelIcon(2)).toBe("i-lucide-alert-triangle"))
    it("niveau 3 → x", () => expect(getLevelIcon(3)).toBe("i-lucide-x"))
    it("null → chaîne vide", () => expect(getLevelIcon(null)).toBe(""))
  })

  describe("getLevelLabel — textes FR", () => {
    it("niveau 1 → Validé", () => expect(getLevelLabel(1)).toBe("Validé"))
    it("niveau 2 → Vigilance", () => expect(getLevelLabel(2)).toBe("Vigilance"))
    it("niveau 3 → Interdit", () => expect(getLevelLabel(3)).toBe("Interdit"))
    it("null → chaîne vide", () => expect(getLevelLabel(null)).toBe(""))
  })
})
