/**
 * Synonymes pour la recherche
 * Clé = terme recherché (en minuscule)
 * Valeur = liste de termes équivalents à inclure dans la recherche
 */
export const SEARCH_SYNONYMS: Record<string, string[]> = {
    "ia": ["intelligence artificielle", "ai", "artificial intelligence"],
    "intelligence artificielle": ["ia", "ai"],
    "ai": ["ia", "intelligence artificielle"],
    "visio": ["visioconférence", "video"],
    "texte": ["traitement de texte", "word"],
    "tableur": ["excel", "feuille de calcul"],
    "presentation": ["powerpoint", "diaporama"]
}

/**
 * Étend une requête de recherche avec ses synonymes
 */
export const expandSearchQuery = (query: string): string[] => {
    const normalizedQuery = query.toLowerCase().trim()
    const searchTerms = [normalizedQuery]

    Object.entries(SEARCH_SYNONYMS).forEach(([key, values]) => {
        if (normalizedQuery.includes(key)) {
            values.forEach(v => searchTerms.push(v))
        }
    })

    return searchTerms
}
