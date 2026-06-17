import type { Software } from "~~/types/software"
import type { ThemeAudience } from "~~/types/data-protection"

// Règle métier (symétrie stricte) : un badge d'approbation n'est visible que
// pour l'audience correspondante. Le SEN ne voit que "Approuvé SEN", le SFP ne
// voit que "Approuvé SFP". Centralisé ici pour éviter la divergence entre les
// vues grille / liste / détail (cf. bug badge SEN affiché en mode SFP).
export function isApprovedForAudience(software: Software, audience: ThemeAudience): boolean {
  if (audience === "SEN") return !!software.approvedBySEN
  if (audience === "SFP") return !!software.approvedBySFP
  return false
}
