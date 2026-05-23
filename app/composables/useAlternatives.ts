import { type Software, getCertificationLevel } from "~~/types/software"

/**
 * Résout les alternatives recommandées d'un logiciel depuis Directus.
 *
 * - Lecture des UUIDs depuis `software.alternatives` (junction `software_alternative`)
 * - Filtre de sécurité côté frontend : niveau 1 ou 2 uniquement (le niveau 3
 *   ne devrait jamais être saisi, mais on protège)
 * - Tri final : niveau ASC (verts d'abord), puis nom alphabétique
 *
 * Pas de scoring auto, pas de fallback : si aucune alternative n'est saisie
 * dans Directus, on retourne `[]` et le composant affiche un message dédié.
 */
export const useAlternatives = () => {
  const { getSoftwareById, getSoftwareList } = useSoftware()

  const getAlternatives = (software: Software): Software[] => {
    const ids = software.alternatives ?? []
    if (ids.length === 0) return []

    const allSoftware = getSoftwareList()
    const byId = new Map(allSoftware.map(s => [s.id, s]))

    const resolved = ids
      .map(id => byId.get(id))
      .filter((s): s is Software => Boolean(s))
      .filter((s) => {
        const level = s.certificationLevel ?? getCertificationLevel(s.lgpd)
        return level === 1 || level === 2
      })

    return resolved.sort((a, b) => {
      const levelA = a.certificationLevel ?? getCertificationLevel(a.lgpd) ?? 9
      const levelB = b.certificationLevel ?? getCertificationLevel(b.lgpd) ?? 9
      if (levelA !== levelB) return levelA - levelB
      return (a.name || "").localeCompare(b.name || "")
    })
  }

  return {
    getAlternatives,
    getSoftwareById
  }
}
