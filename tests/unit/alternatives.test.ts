import { describe, it, expect, beforeEach } from "vitest"
import { useAlternatives } from "~/composables/useAlternatives"
import type { Software } from "~~/types/software"

function makeSoftware(partial: Partial<Software> & { id: string, name: string, certificationLevel: 1 | 2 | 3 }): Software {
  return {
    logo: null,
    shortDescription: "desc",
    lgpd: {
      hosting: partial.certificationLevel,
      rgpd: partial.certificationLevel,
      dataCollection: partial.certificationLevel
    },
    dataLocation: "Suisse",
    cost: "Gratuit",
    toolUrl: "https://example.com",
    ...partial
  }
}

describe("useAlternatives — résolution depuis Directus", () => {
  const word = makeSoftware({ id: "word", name: "Word", certificationLevel: 1 })
  const googleDocs = makeSoftware({ id: "google-docs", name: "Google Docs", certificationLevel: 2 })
  const baidu = makeSoftware({ id: "baidu", name: "Baidu Docs", certificationLevel: 3 })
  const alpha = makeSoftware({ id: "alpha", name: "Alpha App", certificationLevel: 1 })
  const zed = makeSoftware({ id: "zed", name: "Zed App", certificationLevel: 1 })

  beforeEach(() => {
    const list = useState<Software[]>("software-list", () => [])
    list.value = [word, googleDocs, baidu, alpha, zed]
  })

  it("retourne [] si le logiciel n'a aucune alternative définie", () => {
    const source = makeSoftware({ id: "source", name: "Source", certificationLevel: 3 })
    const { getAlternatives } = useAlternatives()
    expect(getAlternatives(source)).toEqual([])
  })

  it("retourne [] si alternatives est explicitement vide", () => {
    const source = makeSoftware({ id: "source", name: "Source", certificationLevel: 3, alternatives: [] })
    const { getAlternatives } = useAlternatives()
    expect(getAlternatives(source)).toEqual([])
  })

  it("résout les UUIDs vers les logiciels correspondants", () => {
    const source = makeSoftware({
      id: "source",
      name: "Source",
      certificationLevel: 3,
      alternatives: ["word", "google-docs"]
    })
    const { getAlternatives } = useAlternatives()
    const result = getAlternatives(source)
    expect(result.map(s => s.id)).toEqual(["word", "google-docs"])
  })

  it("ignore les UUIDs qui ne correspondent à aucun logiciel connu", () => {
    const source = makeSoftware({
      id: "source",
      name: "Source",
      certificationLevel: 3,
      alternatives: ["word", "uuid-fantome", "google-docs"]
    })
    const { getAlternatives } = useAlternatives()
    expect(getAlternatives(source).map(s => s.id)).toEqual(["word", "google-docs"])
  })

  it("filtre les logiciels de niveau 3 même s'ils sont cités (sécurité)", () => {
    const source = makeSoftware({
      id: "source",
      name: "Source",
      certificationLevel: 3,
      alternatives: ["word", "baidu"]
    })
    const { getAlternatives } = useAlternatives()
    const result = getAlternatives(source)
    expect(result.map(s => s.id)).toEqual(["word"])
  })

  it("trie par niveau ASC (verts d'abord, puis oranges)", () => {
    const source = makeSoftware({
      id: "source",
      name: "Source",
      certificationLevel: 3,
      alternatives: ["google-docs", "word"]
    })
    const { getAlternatives } = useAlternatives()
    const result = getAlternatives(source)
    expect(result[0].id).toBe("word")
    expect(result[1].id).toBe("google-docs")
  })

  it("à niveau égal, trie alphabétiquement par nom", () => {
    const source = makeSoftware({
      id: "source",
      name: "Source",
      certificationLevel: 3,
      alternatives: ["zed", "word", "alpha"]
    })
    const { getAlternatives } = useAlternatives()
    const result = getAlternatives(source)
    expect(result.map(s => s.name)).toEqual(["Alpha App", "Word", "Zed App"])
  })
})
