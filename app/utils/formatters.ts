/**
 * Mappage des codes de langues vers leurs noms complets
 */
export const languageNames: Record<string, string> = {
  fr: "Français",
  en: "Anglais",
  de: "Allemand",
  es: "Espagnol",
  it: "Italien"
}

/**
 * Formate une liste de codes de langues en noms complets séparés par des virgules
 * @param codes - Liste des codes de langues (ex: ['fr', 'en'])
 * @returns Noms des langues formatés (ex: "Français, Anglais")
 */
export function formatLanguages(codes: string[]): string {
  return codes.map(code => languageNames[code] || code).join(", ")
}

/**
 * Mappage des plateformes vers leurs icônes Lucide
 */
export const platformIcons: Record<string, string> = {
  web: "i-lucide-globe",
  windows: "i-lucide-laptop",
  mac: "i-lucide-laptop",
  smartphone: "i-lucide-smartphone",
  tablet: "i-lucide-tablet"
}
