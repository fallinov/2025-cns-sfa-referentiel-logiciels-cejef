export const SYNONYMS: Record<string, string[]> = {
  "ia": ["intelligence artificielle", "ai", "artificial intelligence"],
  "intelligence artificielle": ["ia", "ai"],
  "ai": ["ia", "intelligence artificielle"],
  "visio": ["visioconférence", "video"],
  "texte": ["traitement de texte", "word"],
  "tableur": ["excel", "feuille de calcul"],
  "presentation": ["powerpoint", "diaporama"]
}

export function expandSearchQuery(query: string): string[] {
  const normalizedQuery = normalizeText(query)
  const searchTerms = [normalizedQuery]

  Object.entries(SYNONYMS).forEach(([key, values]) => {
    if (normalizedQuery.includes(key)) {
      values.forEach(v => searchTerms.push(normalizeText(v)))
    }
  })

  return searchTerms
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
}

export function matchesSearch(text: string, searchTerms: string[]): boolean {
  const lowerText = normalizeText(text)
  return searchTerms.some(term => lowerText.includes(term))
}
