import type { SchoolLevel } from "~~/types/software"

export const SCHOOL_LEVEL_LABELS: Record<SchoolLevel, string> = {
  primaire: "Primaire (1H-8H)",
  secondaire_1: "Secondaire I (9H-11H)",
  secondaire_2: "Secondaire II",
  formation_professionnelle: "Formation professionnelle",
  enseignement_specialise: "Enseignement spécialisé"
}

export const schoolLevelLabel = (level: SchoolLevel): string =>
  SCHOOL_LEVEL_LABELS[level] ?? level
