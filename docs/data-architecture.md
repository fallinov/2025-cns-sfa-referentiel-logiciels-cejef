# Architecture des données

## Source de données

**Fichier statique** : `app/data/software-list.ts` exporte un tableau hardcodé d'objets logiciels. Pas de base de données ni de CMS.

## Système de types (`types/software.ts`)

- `Software` — objet principal avec classification LGPD, badges et métadonnées
- `LgpdClassification` — 3 critères : hosting, rgpd, dataCollection (chacun 1/2/3)
- `CertificationLevel` — 1 (vert) | 2 (orange) | 3 (rouge) | null
- Union types : `DataLocation`, `CostType`, `TargetAudience`

## Champs de badges (v0.8.0)

- `requiresEduAccount?: boolean` — badge bleu "Compte edu.jura.ch" (M365 level 1)
- `requiresEdulog?: boolean` — badge bleu "Compte Edulog" (fédération Edulog)
- `approvedBySEN?: boolean` — badge vert "Approuvé SEN"
- `requiresParentalConsent?: boolean` — badge orange "< 16 ans : accord parents"
- `ageRestriction?: number` — âge minimum (ex: 16 pour ChatGPT)

## Protection des données (v0.9.0)

Restructuré depuis Genially :
- `app/data/data-protection-themes.ts` — 6 thèmes basés sur le Genially, structure à 3 niveaux
- `types/data-protection.ts` — interfaces `DataProtectionTheme`, `DataProtectionSection`, `DataProtectionItem`, `ThemeResource`
- **Niveau 1** : thèmes (sidebar) — Cadre légal, Ordonnances, Environnement, Coordinateurs, Enseignants, Élèves
- **Niveau 2** : sections (cartes) — toujours visibles dans la page
- **Niveau 3** : items — si 1 seul → contenu direct dans la carte, si plusieurs → tiroirs UAccordion
- Descriptions en HTML inline (`<ul>`, `<strong>`, `<br>`) pour le contenu riche
- Source des données : Genially `https://view.genially.com/681afb1591ccbf218602e8ae`

## State management

- `app/stores/software.ts` — Pinia store pour filtres, tri, recherche (catalogue)
- `app/composables/useSoftware.ts` — accès aux données (`getSoftwareList()`, `getSoftwareById()`)
- `app/composables/useSimilarSoftware.ts` — logiciels similaires par catégorie
- `app/composables/useSoftwareNavigation.ts` — navigation précédent/suivant
- `app/stores/audience.ts` — Pinia store global SEN/CEJEF (persisté localStorage, partagé entre pages)
- `app/composables/useDataProtection.ts` — recherche sur 3 niveaux (thèmes → sections → items)
