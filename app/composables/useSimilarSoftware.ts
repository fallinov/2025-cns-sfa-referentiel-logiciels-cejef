import { type Software, getCertificationLevel } from "~~/types/software"

export const useSimilarSoftware = () => {
  const { getSoftwareList } = useSoftware()

  const getSimilarSoftware = (software: Software, limit: number = 3): Software[] => {
    const allSoftware = getSoftwareList()

    // Filter out the current software AND forbidden software (Level 3)
    const candidates = allSoftware.filter((s) => {
      if (s.id === software.id) return false
      const level = s.certificationLevel ?? getCertificationLevel(s.lgpd)
      return level !== 3
    })

    const scoredCandidates = candidates.map((candidate) => {
      let score = 0

      // Score by Category match (High weight)
      if (software.categories && candidate.categories) {
        const shared = software.categories.filter(c => candidate.categories?.includes(c))
        score += shared.length * 3
      }

      // Score by Activity match (Medium weight)
      if (software.pedagogicalActivities && candidate.pedagogicalActivities) {
        const shared = software.pedagogicalActivities.filter(a => candidate.pedagogicalActivities?.includes(a))
        score += shared.length * 2
      }

      // Score by Discipline match (Low weight)
      if (software.disciplines && candidate.disciplines) {
        const shared = software.disciplines.filter(d => candidate.disciplines?.includes(d))
        score += shared.length * 1
      }

      // Boost if it's a "Green" alternative (Level 1)
      if (candidate.certificationLevel === 1) {
        score += 0.5
      }

      return { software: candidate, score }
    })

    // Sort by score desc, then by name
    scoredCandidates.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.software.name.localeCompare(b.software.name)
    })

    // Return top N results with score > 0
    return scoredCandidates
      .filter(item => item.score > 0)
      .slice(0, limit)
      .map(item => item.software)
  }

  return {
    getSimilarSoftware
  }
}
