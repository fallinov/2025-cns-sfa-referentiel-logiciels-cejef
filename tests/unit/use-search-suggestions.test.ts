import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { ref, nextTick } from "vue"
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

describe("useSearchSuggestions — priorisation (best practices UX 2026)", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const list = useState<Software[]>("software-list", () => [])
    list.value = [
      makeSoftware({ id: "canva", name: "Canva", shortDescription: "Création graphique", categories: ["Création graphique"] }),
      makeSoftware({ id: "code-org", name: "Code.org", shortDescription: "Apprentissage du code" }),
      // Logiciel dont le nom contient « canva » mais ne commence pas par : ne doit PAS être prioritaire prefix
      makeSoftware({ id: "other", name: "Visual Canvas", shortDescription: "Tableau blanc" })
    ]
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("place les match préfixe-nom en tête (intent detection)", async () => {
    const query = ref("can")
    const { suggestions } = useSearchSuggestions(query)
    vi.advanceTimersByTime(350)
    await nextTick()

    expect(suggestions.value.software.length).toBeGreaterThan(0)
    // « Canva » commence par « can » → doit être en tête (prefix match)
    expect(suggestions.value.software[0]!.software.name).toBe("Canva")
    expect(suggestions.value.software[0]!.isPrefixMatch).toBe(true)
  })

  it("marque isPrefixMatch=false pour les matches non-préfixe", async () => {
    const query = ref("canv")
    const { suggestions } = useSearchSuggestions(query)
    vi.advanceTimersByTime(350)
    await nextTick()

    const visualCanvas = suggestions.value.software.find(s => s.software.id === "other")
    if (visualCanvas) {
      expect(visualCanvas.isPrefixMatch).toBe(false)
    }
  })

  it("expose les matches Fuse pour le highlight", async () => {
    const query = ref("canv")
    const { suggestions } = useSearchSuggestions(query)
    vi.advanceTimersByTime(350)
    await nextTick()

    const first = suggestions.value.software[0]
    expect(first).toBeDefined()
    expect(Array.isArray(first!.matches)).toBe(true)
  })

  it("limite à 5 logiciels max (loi de Hick)", async () => {
    const list = useState<Software[]>("software-list", () => [])
    list.value = Array.from({ length: 10 }, (_, i) =>
      makeSoftware({ id: `sw-${i}`, name: `Software${i}`, shortDescription: "test" })
    )
    const query = ref("software")
    const { suggestions } = useSearchSuggestions(query)
    vi.advanceTimersByTime(350)
    await nextTick()

    expect(suggestions.value.software.length).toBeLessThanOrEqual(5)
  })
})

describe("useSearchSuggestions — expansion synonymes", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    vi.useFakeTimers()
    const list = useState<Software[]>("software-list", () => [])
    list.value = [
      // Aucun de ces logiciels ne contient le mot « ia » de manière indépendante,
      // mais ils contiennent « intelligence artificielle » dans la description ou
      // la catégorie. L'expansion synonymes doit les faire remonter.
      makeSoftware({
        id: "chatgpt",
        name: "ChatGPT",
        shortDescription: "Assistant conversationnel basé sur l'intelligence artificielle",
        categories: ["Intelligence artificielle générative"]
      }),
      makeSoftware({
        id: "copilot",
        name: "Microsoft Copilot",
        shortDescription: "Assistant Microsoft 365 d'intelligence artificielle",
        categories: ["Intelligence artificielle générative"]
      }),
      makeSoftware({
        id: "gemini",
        name: "Google Gemini",
        shortDescription: "Assistant Google d'intelligence artificielle",
        categories: ["Intelligence artificielle générative"]
      }),
      // Un logiciel qui ne devrait pas matcher (aucun terme IA dans ses champs)
      makeSoftware({
        id: "excel",
        name: "Excel",
        shortDescription: "Tableur",
        categories: ["Bureautique"]
      })
    ]
  })

  it("taper « ia » fait remonter les logiciels avec « intelligence artificielle »", async () => {
    const query = ref("ia")
    const { suggestions } = useSearchSuggestions(query)
    vi.advanceTimersByTime(350)
    await nextTick()

    const ids = suggestions.value.software.map(s => s.software.id)
    expect(ids).toContain("chatgpt")
    expect(ids).toContain("copilot")
    expect(ids).toContain("gemini")
    expect(ids).not.toContain("excel")
  })

  it("taper « ai » fait remonter les logiciels avec « intelligence artificielle » (sens inverse)", async () => {
    const query = ref("ai")
    const { suggestions } = useSearchSuggestions(query)
    vi.advanceTimersByTime(350)
    await nextTick()

    const ids = suggestions.value.software.map(s => s.software.id)
    expect(ids).toContain("chatgpt")
  })

  it("taper « intelligence artificielle » fait remonter les mêmes logiciels", async () => {
    const query = ref("intelligence artificielle")
    const { suggestions } = useSearchSuggestions(query)
    vi.advanceTimersByTime(350)
    await nextTick()

    const ids = suggestions.value.software.map(s => s.software.id)
    expect(ids).toContain("chatgpt")
    expect(ids).toContain("copilot")
  })
})
