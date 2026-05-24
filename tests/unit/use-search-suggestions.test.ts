import { describe, it, expect, beforeEach } from "vitest"
import { ref } from "vue"
import { useSearchSuggestions } from "~/composables/useSearchSuggestions"
import type { Software } from "~~/types/software"

type SoftwareInput = Partial<Omit<Software, "categories" | "pedagogicalActivities">> & {
  id: string
  name: string
  categories?: string[]
  pedagogicalActivities?: string[]
}

function makeSoftware(p: SoftwareInput): Software {
  const { categories, pedagogicalActivities, ...rest } = p
  return {
    shortDescription: "desc",
    lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 },
    certificationLevel: 1,
    dataLocation: "Suisse",
    cost: "Gratuit",
    toolUrl: "https://example.com",
    ...rest,
    categories: (categories ?? []).map(name => ({ name, icon: null })),
    pedagogicalActivities: (pedagogicalActivities ?? []).map(name => ({ name, icon: null }))
  }
}

describe("useSearchSuggestions — Fuse.js + debounce", () => {
  beforeEach(() => {
    const list = useState<Software[]>("software-list", () => [])
    list.value = [
      makeSoftware({ id: "1", name: "Microsoft Teams", shortDescription: "Collaboration", categories: ["Communication"] }),
      makeSoftware({ id: "2", name: "Word", shortDescription: "Traitement de texte", categories: ["Bureautique"] }),
      makeSoftware({ id: "3", name: "Excel", shortDescription: "Tableur", categories: ["Bureautique"] }),
      makeSoftware({ id: "4", name: "ChatGPT", shortDescription: "Intelligence artificielle", categories: ["IA"], pedagogicalActivities: ["Rédaction"] })
    ]
  })

  it("retourne suggestions vides quand searchQuery est vide", () => {
    const query = ref("")
    const { suggestions } = useSearchSuggestions(query)
    expect(suggestions.value.query).toBe("")
    expect(suggestions.value.totalResults).toBe(0)
    expect(suggestions.value.software).toEqual([])
  })

  it("retourne suggestions vides quand searchQuery a moins de 2 caractères", () => {
    const query = ref("a")
    const { suggestions } = useSearchSuggestions(query)
    expect(suggestions.value.totalResults).toBe(0)
  })

  it("expose la forme attendue de SearchSuggestions", () => {
    const query = ref("")
    const { suggestions } = useSearchSuggestions(query)
    expect(suggestions.value).toHaveProperty("query")
    expect(suggestions.value).toHaveProperty("totalResults")
    expect(suggestions.value).toHaveProperty("categories")
    expect(suggestions.value).toHaveProperty("activities")
    expect(suggestions.value).toHaveProperty("software")
    expect(Array.isArray(suggestions.value.categories)).toBe(true)
    expect(Array.isArray(suggestions.value.activities)).toBe(true)
    expect(Array.isArray(suggestions.value.software)).toBe(true)
  })

  it("ne crashe pas si la liste de logiciels est vide", () => {
    const list = useState<Software[]>("software-list", () => [])
    list.value = []
    const query = ref("test")
    expect(() => useSearchSuggestions(query)).not.toThrow()
  })
})
