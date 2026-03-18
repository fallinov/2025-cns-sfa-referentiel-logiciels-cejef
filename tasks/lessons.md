# Leçons apprises

## 2026-03-14 — Conflits de merge sur branches parallèles modifiant les mêmes zones

**Contexte** : 5 features développées en parallèle depuis `main`, toutes modifiant `SoftwareCard.vue`, `SoftwareListItem.vue`, `types/software.ts` et `software-list.ts`.
**Erreur** : Les merges F2, F5 ont généré des conflits sur les mêmes blocs (badges ajoutés au même endroit, champs ajoutés au même emplacement dans le type).
**Correction** : Résolution manuelle en gardant les deux ajouts (les conflits étaient additifs, pas contradictoires).
**Règle** : Quand plusieurs features ajoutent des éléments au même endroit (badges, champs de type), merger dans l'ordre de dépendance ou rebaser avant de merger pour limiter les conflits. Préférer des branches séquentielles plutôt que parallèles quand elles touchent les mêmes fichiers.

## 2026-03-18 — CSS columns provoque un reflow des cartes

**Contexte** : Page protection des données en layout grille. Quand un thème se déroule, les cartes des autres colonnes s'étirent.
**Erreur** : Tentative avec `CSS columns` (masonry) — les éléments changent de colonne quand le contenu change de hauteur.
**Correction** : Retour à `grid` avec `items-start` pour que les cartes gardent leur hauteur naturelle. Puis passage au layout sidebar+contenu (plus adapté au contenu documentaire).
**Règle** : `CSS columns` ne convient pas au contenu dynamique (expand/collapse). Pour du contenu documentaire avec beaucoup de sections, préférer un layout sidebar+contenu plutôt qu'une grille de cartes.

## 2026-03-18 — UAccordion et non-null assertion dans les templates Vue SSR

**Contexte** : Utilisation de `UAccordion` de Nuxt UI v4 pour les sous-thèmes. Le body slot reçoit un `item` dont `value` est `string | undefined`.
**Erreur** : `!` (non-null assertion) dans le template Vue provoque une erreur SSR. Le compilateur SSR ne gère pas le `!` dans les expressions template.
**Correction** : Remplacé par une Map + `v-if` guard, puis finalement supprimé l'accordion au profit d'un pattern disclosure maison avec `v-show`.
**Règle** : Ne jamais utiliser `!` dans les templates Vue. Utiliser `v-if` pour le narrowing ou déplacer la logique dans le `<script setup>`.

## 2026-03-19 — leading-loose (2.0) est du double-espacement

**Contexte** : Augmentation de l'interligne sur desktop pour plus de lisibilité.
**Erreur** : Utilisé `lg:leading-loose` (2.0) — visuellement trop aéré, ressemble à du double-espacement de manuscrit.
**Correction** : `leading-relaxed` (1.625) partout, conforme à Bringhurst (1.4-1.6x).
**Règle** : `leading-loose` (2.0) n'est JAMAIS adapté au web. Utiliser `leading-relaxed` (1.625) pour le corps de texte.

## 2026-03-19 — Le skill sfa-audit-ux manquait de règles typographiques et de design visuel

**Contexte** : Audit UX v1 ne détectait pas les problèmes de largeur de ligne ni de contraste.
**Erreur** : Les checklists du skill ne couvraient pas la typographie (interligne, largeur de ligne, tailles responsive) ni le design visuel (espacement, proportions icônes).
**Correction** : Ajout de 2 nouvelles checklists (`typography.md`, `visual-design.md`) + complétion des 3 existantes. Total : 295 items.
**Règle** : Après chaque session de corrections UX, vérifier que les règles appliquées sont dans le skill pour les prochains audits.
