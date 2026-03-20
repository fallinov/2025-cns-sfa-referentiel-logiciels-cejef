import { describe, it, expect } from "vitest"
import { normalizeText, matchesSearch, highlightText, expandSearchQuery } from "~/utils/search"

describe("normalizeText", () => {
  it("convertit en minuscules", () => {
    expect(normalizeText("HELLO")).toBe("hello")
  })

  it("supprime les accents", () => {
    expect(normalizeText("éàü")).toBe("eau")
    expect(normalizeText("Sécurité")).toBe("securite")
  })

  it("gère les chaînes vides", () => {
    expect(normalizeText("")).toBe("")
  })
})

describe("matchesSearch", () => {
  it("trouve un terme exact", () => {
    expect(matchesSearch("Microsoft Teams", ["microsoft"])).toBe(true)
  })

  it("ignore la casse et les accents", () => {
    expect(matchesSearch("Sécurité du réseau", ["securite"])).toBe(true)
  })

  it("retourne false si aucun terme ne matche", () => {
    expect(matchesSearch("Microsoft Teams", ["google"])).toBe(false)
  })

  it("matche si au moins un terme correspond", () => {
    expect(matchesSearch("test", ["abc", "test", "xyz"])).toBe(true)
  })
})

describe("highlightText", () => {
  it("retourne le texte tel quel si la query est vide", () => {
    expect(highlightText("Hello world", "")).toBe("Hello world")
    expect(highlightText("Hello world", "  ")).toBe("Hello world")
  })

  it("entoure les correspondances avec <mark>", () => {
    const result = highlightText("Microsoft Teams", "teams")
    expect(result).toContain("<mark")
    expect(result).toContain("Teams")
    expect(result).toContain("</mark>")
  })

  it("est insensible aux accents", () => {
    const result = highlightText("Sécurité du réseau", "securite")
    expect(result).toContain("<mark")
    expect(result).toContain("Sécurité")
  })

  it("est insensible à la casse", () => {
    const result = highlightText("Microsoft Teams", "TEAMS")
    expect(result).toContain("<mark")
    expect(result).toContain("Teams")
  })

  it("gère plusieurs occurrences", () => {
    const result = highlightText("test et test", "test")
    expect(result.match(/<mark/g)?.length).toBe(2)
  })
})

describe("expandSearchQuery", () => {
  it("retourne le terme original", () => {
    const result = expandSearchQuery("test")
    expect(result).toContain("test")
  })

  it("ajoute les synonymes pour IA", () => {
    const result = expandSearchQuery("ia")
    expect(result).toContain("ia")
    expect(result).toContain("intelligence artificielle")
    expect(result).toContain("ai")
  })
})
