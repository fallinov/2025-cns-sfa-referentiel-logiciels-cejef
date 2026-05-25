import type { SchoolLevel } from "~~/types/software"

export const SCHOOL_LEVEL_LABELS: Record<SchoolLevel, string> = {
  primaire: "Primaire (1H-8H)",
  secondaire_1: "Secondaire I (9H-11H)",
  secondaire_2: "Secondaire II",
  formation_professionnelle: "Formation professionnelle",
  enseignement_specialise: "Enseignement spécialisé"
}

// Ordre canonique du plus bas au plus haut niveau scolaire.
// Utilisé pour trier les filtres et l'affichage sur la fiche logiciel.
export const SCHOOL_LEVELS_ORDER: SchoolLevel[] = [
  "primaire",
  "secondaire_1",
  "secondaire_2",
  "formation_professionnelle",
  "enseignement_specialise"
]

export const schoolLevelLabel = (level: SchoolLevel): string =>
  SCHOOL_LEVEL_LABELS[level] ?? level

export function sortSchoolLevels(levels: readonly SchoolLevel[]): SchoolLevel[] {
  return [...levels].sort(
    (a, b) => SCHOOL_LEVELS_ORDER.indexOf(a) - SCHOOL_LEVELS_ORDER.indexOf(b)
  )
}
