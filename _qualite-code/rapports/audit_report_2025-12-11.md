# Rapport d'audit code — 11 Décembre 2025

## 📚 Fichiers de la base de connaissances consultés

**Type de tâche identifié** : Audit / Refactoring code

**Fichiers lus** (4 fichiers) :
✅ rules.md (priorités et règles globales)
✅ refactoring/audit-checklist.md (méthodologie d'audit)
✅ nuxt-ui/components.md (standards Nuxt UI)
✅ tailwind/best-practices.md (usage Tailwind)

**Raison de la sélection** : Ces fichiers sont requis par la matrice de sélection pour une tâche d'audit et de refactoring.

---

## Résumé

- **Fichiers analysés** : 18 fichiers Vue (composants + pages) + fichiers CSS
- **Problèmes identifiés** : 3 principaux (Fichiers longs, Duplication, CSS Custom)
- **Score de qualité global** : Bon, mais perfectible sur la structure des gros composants.

## Composants custom à remplacer / Duplication

| Fichier | Problème | Solution Nuxt UI / Refactoring | Priorité |
|---------|----------|------------------|----------|
| `CertificationBadge.vue` | Duplication partielle avec `SoftwareCertificationStatus.vue` | Consolider l'usage dans `SoftwareCertificationStatus` qui utilise correctement `UBadge`. | 🟡 Moyenne |
| `SearchBar.vue` | Composant monolithique (>600 lignes) | Découper en sous-composants : `SearchInput`, `SearchSuggestions`, `SearchResults` | 🔴 Haute |

## CSS custom à remplacer

| Fichier | Problème | Solution Tailwind | Priorité |
|---------|----------|-------------------|----------|
| `SearchBar.vue` | `<style>` pour scrollbars custom | Utiliser le plugin `tailwind-scrollbar` ou les utilitaires de scrollbar | 🟢 Basse |
| `main.css` | Définition globale du curseur | Utiliser `cursor-pointer` sur les éléments interactifs via Tailwind | 🟢 Basse |

## Fichiers trop longs (>200 lignes)

| Fichier | Lignes | Action proposée | Priorité |
|---------|--------|-----------------|----------|
| `SearchBar.vue` | 606 | Extraire la logique de suggestion (`useSearchSuggestions` déjà fait, mais logique d'UI lourde) et découper le template. | 🔴 Haute |
| `index.vue` | 344 | Extraire le Header de liste et la grille/liste dans des composants dédiés (`SoftwareListGrid.vue`, `SoftwareFiltersBar.vue`). | 🟡 Moyenne |

## Points positifs (à conserver)

- ✅ **Framework UI** : Usage intensif de Nuxt UI (`UButton`, `UBadge`, `UCard`, `UHeader`) respecté.
- ✅ **Tailwind** : Très peu de CSS custom, utilisation correcte des classes utilitaires et du responsive.
- ✅ **Architecture** : Dossier `stores/` utilisé pour la gestion d'état (`software.ts`), ce qui allège les composants.
- ✅ **Composants métier** : Création de `SoftwareCertificationStatus.vue` qui encapsule la logique métier (couleur/icône selon niveau) est une excellente pratique (Patterns 2.2 de la checklist).

## Actions recommandées pour la prochaine étape

1. [ ] **Priorité 1** : Refactorer `SearchBar.vue`. Le fichier est trop complexe et mélange la gestion des inputs, l'affichage des suggestions (catégories, logiciels...) et la logique mobile/desktop.
2. [ ] **Priorité 2** : Nettoyer `index.vue` en extrayant la barre de filtres (actuellement très verbeuse avec le Drawer mobile) dans un composant `SoftwareFilterBar.vue`.
3. [ ] **Priorité 3** : Unifier les badges de certification. Vérifier si `CertificationBadge.vue` est encore utilisé ou s'il peut être déprécié au profit de `SoftwareCertificationStatus.vue`.

## Estimation

- **Temps total estimé** : 3-4 heures
- **Réduction de code attendue** : -15% dans les fichiers parents
- **Amélioration maintenabilité** : +40% sur la recherche et la page d'accueil
