import { describe, it, expect } from "vitest"
import { useTypewriter } from "~/composables/useTypewriter"

describe("useTypewriter — animation placeholder", () => {
  it("expose une ref placeholderText initialisée à chaîne vide", () => {
    const { placeholderText } = useTypewriter(["Hello", "World"])
    expect(placeholderText.value).toBe("")
  })

  it("accepte un tableau de phrases", () => {
    const result = useTypewriter(["Phrase A", "Phrase B", "Phrase C"])
    expect(result).toHaveProperty("placeholderText")
  })

  it("accepte un tableau vide sans crasher", () => {
    expect(() => useTypewriter([])).not.toThrow()
  })

  it("placeholderText est réactif (ref)", () => {
    const { placeholderText } = useTypewriter(["Test"])
    // Vérifie que c'est bien un ref (a une propriété value)
    expect(placeholderText).toHaveProperty("value")
    expect(typeof placeholderText.value).toBe("string")
  })
})
