# Audit UX/UI v2.0 — Page Protection des données

**Date** : 2026-03-19
**Skill** : sfa-audit-ux v2.0 (5 checklists)
**Page** : `/protection-des-donnees`
**Version** : 0.9.0 (branche feat/dp-sidebar-layout)

## Score global : 92/100

| Critère | Poids | Score | Source |
|---------|-------|-------|--------|
| Accessibilité | 30% | 93 | `checklists/accessibility.md` + KB `accessibility/wcag.md` |
| Utilisabilité | 25% | 90 | `checklists/usability.md` + KB `accessibility/ux-checklist.md` |
| Typographie | — | 95 | `checklists/typography.md` + KB `tailwind/typography.md` |
| Design visuel | — | 90 | `checklists/visual-design.md` |
| Mobile & Responsive | 20% | 88 | `checklists/mobile.md` |
| Cohérence | 15% | 92 | Atomic Design |
| Flux UX | 10% | 90 | About Face |

---

## 1. Accessibilité (93/100)

### Conforme
- [x] `aria-pressed` sur toggle SEN/CEJEF
- [x] `aria-current` sur thème actif sidebar
- [x] `role="group" aria-label="Filtrer par service"` sur filtres
- [x] `aria-controls` + `aria-expanded` sur dropdown mobile
- [x] `aria-label="Navigation des thèmes"` sur nav
- [x] `aria-live="polite"` sur zone contenu
- [x] `focus-visible:ring-2` sur tous les boutons
- [x] Hiérarchie h1 → h2 → h3 correcte
- [x] Structure sémantique `<banner>`, `<nav>`, `<main>`, `<contentinfo>`
- [x] Liens externes avec `title` "nouvel onglet" + `rel="noopener"`
- [x] Console : 0 erreurs

### Reste à faire
| # | Problème | Sévérité |
|---|----------|----------|
| A1 | `aria-live` pourrait spécifier `aria-atomic="true"` pour les mises à jour complètes | Basse |

---

## 2. Utilisabilité (90/100)

### Conforme
- [x] Navigation un clic (sidebar → contenu)
- [x] Recherche cross-thèmes avec auto-switch
- [x] Compteur de résultats visible pendant la recherche
- [x] Surbrillance des termes recherchés (accent-insensitive)
- [x] Choix initial SEN/CEJEF avec persistance localStorage
- [x] Bouton "Changer de profil" accessible
- [x] Support ancres URL (#theme-id)
- [x] Navigation clavier (flèches haut/bas) dans la sidebar
- [x] Transition fade entre thèmes

### Reste à faire
| # | Problème | Sévérité |
|---|----------|----------|
| U1 | **Pas de navigation précédent/suivant** en bas du contenu — l'utilisateur doit revenir à la sidebar | Moyenne |

---

## 3. Typographie (95/100)

### Conforme
- [x] `max-w-prose` (65ch) sur les descriptions — largeur de ligne OK
- [x] `leading-relaxed` (1.625) sur le corps de texte
- [x] Corps `text-base` (16px) — conforme taille minimale
- [x] Hiérarchie : h2 `text-xl` > h3 `text-base font-semibold` > corps `text-base`
- [x] Titres sidebar `truncate` — pas de passage à 2 lignes
- [x] `shortTitle` pour les libellés longs
- [x] Alignement à gauche partout
- [x] Pas de texte en majuscules long

### Reste à faire
- Rien à signaler

---

## 4. Design visuel (90/100)

### Conforme
- [x] Espacement cohérent : `gap-6` entre sections, `p-5` dans les cartes, `space-y-3` entre cartes
- [x] Palette limitée : primary (rouge), neutral (gray), white
- [x] Ombres cohérentes : `shadow-sm` partout
- [x] Bordures cohérentes : `border-gray-100 dark:border-gray-700/50`
- [x] `rounded-[var(--ui-radius)]` — token design system
- [x] Sidebar fond distinct (`bg-gray-50`) vs cartes (`bg-white`)
- [x] Hover sur sidebar : `hover:bg-white hover:shadow-sm hover:text-gray-900`
- [x] Focus visible sur tous les interactifs
- [x] Icônes cohérentes : Lucide, `w-4 h-4` (inline) et `w-5 h-5` (headers)
- [x] Transition `duration-150` ou `duration-200` — pas d'animation excessive
- [x] Source des liens en texte secondaire (plus de badge trop petit)

### Reste à faire
| # | Problème | Sévérité |
|---|----------|----------|
| V1 | **Bordure + ombre** sur les cartes sous-thèmes — la checklist recommande l'un OU l'autre | Basse |

---

## 5. Mobile & Responsive (88/100)

### Conforme
- [x] Dropdown mobile avec backdrop semi-transparent
- [x] `h-11` (44px) sur le dropdown — conforme touch target
- [x] Contenu pleine largeur sur mobile
- [x] `focus-visible:ring-2` sur le bouton dropdown
- [x] Pas de scroll horizontal

### Reste à faire
| # | Problème | Sévérité |
|---|----------|----------|
| M1 | Boutons SEN/CEJEF custom — hauteur ~40px, juste en dessous de 44px | Basse |

---

## Corrections restantes (3 items)

| # | Correction | Priorité | Effort |
|---|-----------|----------|--------|
| 1 | Navigation précédent/suivant en bas du contenu | Moyenne | 15 min |
| 2 | Choisir bordure OU ombre sur les cartes (pas les deux) | Basse | 2 min |
| 3 | Touch target boutons SEN/CEJEF : ajouter `h-11` | Basse | 1 min |

---

## Évolution du score

| Version | Date | Score | Checklists | Améliorations |
|---------|------|-------|-----------|---------------|
| v1.0 | 2026-03-18 | 74/100 | 3 | Layout carte initial |
| v1.2 | 2026-03-18 | 88/100 | 3 | Sidebar, aria, backdrop, max-w-prose |
| v2.0 | 2026-03-19 | 92/100 | 5 | shortTitle, hover, typo, design visuel, navigation clavier |
