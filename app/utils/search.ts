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

export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text

  const normalizedQuery = normalizeText(query.trim())
  const normalizedText = normalizeText(text)
  const markClass = "bg-yellow-200 dark:bg-yellow-700/50 rounded-sm px-0.5"

  const indices: [number, number][] = []
  let pos = 0
  while ((pos = normalizedText.indexOf(normalizedQuery, pos)) !== -1) {
    indices.push([pos, pos + normalizedQuery.length])
    pos += 1
  }

  if (indices.length === 0) return text

  let result = ""
  let last = 0
  for (const [start, end] of indices) {
    result += text.slice(last, start)
    result += `<mark class="${markClass}">${text.slice(start, end)}</mark>`
    last = end
  }
  result += text.slice(last)
  return result
}
