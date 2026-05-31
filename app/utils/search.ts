/**
 * Dictionnaire de synonymes pour étendre une requête utilisateur.
 *
 * Clé = terme tapé (normalisé minuscule, sans accent).
 * Valeurs = termes équivalents à inclure dans la recherche.
 *
 * Utilisé par :
 *  - le store software (filtrage du catalogue)
 *  - useSearchSuggestions (autocomplete Fuse)
 *
 * Convention : si un terme A est synonyme d'un terme B, déclarer la relation
 * dans les deux sens (`A → [B]` ET `B → [A]`) pour que la recherche soit
 * symétrique. La fonction expandSearchQuery applique `includes(key)`, donc
 * une clé doit être un sous-mot atomique (pas une phrase ambiguë).
 */
export const SYNONYMS: Record<string, string[]> = {
  // Intelligence artificielle
  "ia": ["intelligence artificielle", "ai", "artificial intelligence"],
  "intelligence artificielle": ["ia", "ai"],
  "ai": ["ia", "intelligence artificielle"],
  // Visioconférence
  "visio": ["visioconférence", "video", "teams", "zoom", "meet"],
  "visioconference": ["visio", "video"],
  // Bureautique
  "texte": ["traitement de texte", "word"],
  "tableur": ["excel", "feuille de calcul"],
  "presentation": ["powerpoint", "diaporama"],
  "diaporama": ["presentation", "powerpoint"],
  // Traduction
  "traduction": ["traducteur", "translate", "deepl"],
  "traducteur": ["traduction", "translate", "deepl"],
  // Carte mentale
  "carte mentale": ["mind map", "mindmap", "schema"],
  "mind map": ["carte mentale"],
  // Quiz / sondage
  "quiz": ["quizz", "questionnaire", "sondage"],
  "sondage": ["quiz", "vote", "questionnaire"],
  // Code
  "code": ["programmation", "developpement", "coder"],
  "programmation": ["code", "coder"],
  // PDF
  "pdf": ["adobe acrobat", "lecteur pdf"]
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
