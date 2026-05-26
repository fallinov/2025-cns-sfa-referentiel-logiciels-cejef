import type { FuseResultMatch } from "fuse.js"

/**
 * Segment de texte produit par `highlightMatch` : soit du texte brut (`text`)
 * soit un segment matchant (`mark`) à entourer visuellement par le composant.
 */
export interface TextSegment {
  type: "text" | "mark"
  value: string
}

/**
 * Découpe un texte en segments alternés (texte brut / segment matchant) à
 * partir des indices fournis par Fuse.js. Permet au composant Vue de rendre
 * `<mark>` autour des passages matchant sans manipulation HTML imbriquée.
 *
 * Convention : on rend dans la chaîne d'origine (casse préservée) — les
 * indices Fuse sont insensibles à la casse mais portent sur la chaîne brute.
 *
 * Exemple : `highlightMatch("Canva", [[0, 3]])`
 *   → `[{ type: 'mark', value: 'Canv' }, { type: 'text', value: 'a' }]`
 */
export function highlightMatch(
  text: string,
  matches: readonly FuseResultMatch[] | undefined,
  fieldName: string
): TextSegment[] {
  if (!matches || matches.length === 0) {
    return [{ type: "text", value: text }]
  }

  const match = matches.find(m => m.key === fieldName)
  if (!match || !match.indices || match.indices.length === 0) {
    return [{ type: "text", value: text }]
  }

  // Trier les indices et fusionner les segments adjacents
  const sortedIndices = [...match.indices].sort((a, b) => a[0] - b[0])
  const segments: TextSegment[] = []
  let cursor = 0

  for (const [start, end] of sortedIndices) {
    if (start > cursor) {
      segments.push({ type: "text", value: text.slice(cursor, start) })
    }
    segments.push({ type: "mark", value: text.slice(start, end + 1) })
    cursor = end + 1
  }
  if (cursor < text.length) {
    segments.push({ type: "text", value: text.slice(cursor) })
  }
  return segments
}
