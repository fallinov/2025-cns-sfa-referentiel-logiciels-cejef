# Leçons apprises

## 2026-03-14 — Conflits de merge sur branches parallèles modifiant les mêmes zones

**Contexte** : 5 features développées en parallèle depuis `main`, toutes modifiant `SoftwareCard.vue`, `SoftwareListItem.vue`, `types/software.ts` et `software-list.ts`.
**Erreur** : Les merges F2, F5 ont généré des conflits sur les mêmes blocs (badges ajoutés au même endroit, champs ajoutés au même emplacement dans le type).
**Correction** : Résolution manuelle en gardant les deux ajouts (les conflits étaient additifs, pas contradictoires).
**Règle** : Quand plusieurs features ajoutent des éléments au même endroit (badges, champs de type), merger dans l'ordre de dépendance ou rebaser avant de merger pour limiter les conflits. Préférer des branches séquentielles plutôt que parallèles quand elles touchent les mêmes fichiers.
