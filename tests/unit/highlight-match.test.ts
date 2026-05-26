import { describe, it, expect } from "vitest"
import { highlightMatch } from "~/utils/highlight-match"

describe("highlightMatch — découpage texte/segment matchant", () => {
  it("retourne le texte brut si pas de matches", () => {
    expect(highlightMatch("Canva", undefined, "name")).toEqual([
      { type: "text", value: "Canva" }
    ])
    expect(highlightMatch("Canva", [], "name")).toEqual([
      { type: "text", value: "Canva" }
    ])
  })

  it("retourne le texte brut si aucun match ne cible le champ demandé", () => {
    const matches = [{ key: "shortDescription", value: "...", indices: [[0, 3]] as readonly [number, number][] }]
    expect(highlightMatch("Canva", matches, "name")).toEqual([
      { type: "text", value: "Canva" }
    ])
  })

  it("entoure le segment matchant d'un type 'mark'", () => {
    // Canva avec match [0,3] = « Canv »
    const matches = [{ key: "name", value: "Canva", indices: [[0, 3]] as readonly [number, number][] }]
    expect(highlightMatch("Canva", matches, "name")).toEqual([
      { type: "mark", value: "Canv" },
      { type: "text", value: "a" }
    ])
  })

  it("préserve la casse du texte d'origine dans les segments", () => {
    // Le mark doit garder « Adobe » avec sa majuscule
    const matches = [{ key: "name", value: "Adobe Acrobat", indices: [[0, 4]] as readonly [number, number][] }]
    expect(highlightMatch("Adobe Acrobat", matches, "name")).toEqual([
      { type: "mark", value: "Adobe" },
      { type: "text", value: " Acrobat" }
    ])
  })

  it("gère plusieurs segments matchant séparés", () => {
    // « Adobe Acrobat » avec matches sur [0,4] et [6,12]
    const matches = [{
      key: "name",
      value: "Adobe Acrobat",
      indices: [[0, 4], [6, 12]] as readonly [number, number][]
    }]
    expect(highlightMatch("Adobe Acrobat", matches, "name")).toEqual([
      { type: "mark", value: "Adobe" },
      { type: "text", value: " " },
      { type: "mark", value: "Acrobat" }
    ])
  })

  it("gère un match au milieu du texte", () => {
    // « Microsoft 365 » avec match [10, 12] = « 365 »
    const matches = [{
      key: "name",
      value: "Microsoft 365",
      indices: [[10, 12]] as readonly [number, number][]
    }]
    expect(highlightMatch("Microsoft 365", matches, "name")).toEqual([
      { type: "text", value: "Microsoft " },
      { type: "mark", value: "365" }
    ])
  })
})
