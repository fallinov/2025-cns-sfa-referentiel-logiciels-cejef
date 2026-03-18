# Audit UX/UI v1.2 — Page Protection des données

**Date** : 2026-03-18
**Page** : `/protection-des-donnees`
**Version** : 0.9.0 (branche feat/dp-sidebar-layout)
**Stack** : Nuxt 4, Vue 3, Nuxt UI v4.1.0, Tailwind CSS
**Skill** : sfa-audit-ux v1.2

## Fichiers de la knowledge base consultés

- `_qualite-code/knowledge-base/rules.md`
- `_qualite-code/knowledge-base/tailwind/typography.md`
- `_qualite-code/knowledge-base/accessibility/wcag.md`
- `_qualite-code/knowledge-base/accessibility/checklist.md`
- `_qualite-code/knowledge-base/accessibility/ux-checklist.md`
- `checklists/accessibility.md` (skill)
- `checklists/usability.md` (skill)
- `checklists/mobile.md` (skill)

---

## Score global : 88/100 (+14 vs audit v1)

| Critère | Poids | Score v1 | Score v2 | Détail |
|---------|-------|----------|----------|--------|
| Accessibilité | 30% | 68 | 90 | aria-pressed, aria-current, aria-controls, liens externes |
| Utilisabilité | 25% | 82 | 88 | Sidebar, transition fade, max-w-prose, "Changer de profil" |
| Cohérence | 15% | 80 | 85 | Sidebar fond distinct, style pill cohérent |
| Mobile & Responsive | 20% | 72 | 85 | Backdrop mobile, dropdown fonctionnel |
| Flux UX | 10% | 70 | 88 | Choix initial + reset + persistance localStorage |

---

## 1. Accessibilité (90/100)

### Corrigé depuis v1
- [x] `aria-current="true"` sur le thème actif dans la sidebar
- [x] `aria-pressed` sur les boutons toggle SEN/CEJEF
- [x] `role="group" aria-label="Filtrer par service"` sur le groupe de filtres
- [x] `aria-controls="dp-sidebar"` + `aria-expanded` sur le bouton mobile
- [x] `aria-label="Navigation des thèmes"` sur la nav sidebar
- [x] `title` avec indication "nouvel onglet" sur les liens externes
- [x] `aria-hidden="true"` sur les icônes du bouton mobile

### Points positifs confirmés
- [x] Hiérarchie h1 → h2 → h3 correcte
- [x] Structure sémantique `<banner>`, `<nav>`, `<main>`, `<contentinfo>`
- [x] `aria-hidden` sur toutes les icônes décoratives
- [x] `rel="noopener"` sur les liens externes
- [x] `aria-label` descriptif sur le champ de recherche
- [x] Console navigateur : 0 erreurs

### Problèmes résiduels

| # | Problème | Sévérité |
|---|----------|----------|
| A1 | **Navigation clavier sidebar** : pas de retour visuel du focus quand on Tab entre les thèmes (le `focus-visible` n'est pas ajouté aux boutons sidebar) | Moyenne |
| A2 | **Recherche sans `aria-live`** : quand les résultats changent en temps réel, le lecteur d'écran n'est pas informé | Basse |

---

## 2. Utilisabilité (88/100)

### Typographie et lisibilité (Krug, Bringhurst)
- [x] **Largeur de ligne** : `max-w-prose` (65ch) sur les descriptions — conforme (50-75 car.)
- [x] **Interligne** : `leading-relaxed` (1.625) — conforme (1.4-1.6x)
- [x] **Taille texte** : corps `text-sm` (14px) — limite basse mais acceptable pour texte secondaire
- [x] **Paragraphes** : courts, aérés, pas de pavés denses
- [x] **Alignement** : texte aligné à gauche partout

### Feedback et visibilité (Norman)
- [x] Transition fade (200ms) au changement de thème
- [x] Thème actif clairement surligné (bg-white + shadow-sm dans sidebar grise)
- [x] Compteur de sous-thèmes visible (text-gray-500, contraste amélioré)

### Problèmes résiduels

| # | Problème | Sévérité |
|---|----------|----------|
| U1 | **Titre h2 du thème = titre h3 du sous-thème** pour le thème 1 (qui n'a qu'un sous-thème) — redondance visuelle | Basse |
| U2 | **Recherche sans compteur de résultats** : "3 sous-thèmes trouvés sur 25" serait utile (cf. checklist usability §8) | Moyenne |

---

## 3. Cohérence (85/100)

### Points positifs
- [x] Sidebar fond distinct (`bg-gray-50`) vs cartes sous-thèmes (`bg-white`)
- [x] Barre de recherche pill identique à la page d'accueil
- [x] Réutilisation de `SoftwareFeatureBadge` et `BackToTop`
- [x] `rounded-[var(--ui-radius)]` partout — token CSS cohérent
- [x] Icônes Lucide exclusivement

### Problèmes résiduels

| # | Problème | Sévérité |
|---|----------|----------|
| C1 | **Boutons SEN/CEJEF en HTML custom** au lieu de `UButton` — incohérence avec le design system Nuxt UI | Basse |

---

## 4. Mobile & Responsive (85/100)

### Points positifs
- [x] Sidebar remplacée par dropdown mobile avec backdrop semi-transparent
- [x] Backdrop cliquable pour fermer (bonne UX)
- [x] Contenu pleine largeur sur mobile
- [x] Filtres SEN/CEJEF compacts
- [x] `z-index` explicite (z-30 backdrop, z-40 sidebar)

### Problèmes résiduels

| # | Problème | Sévérité |
|---|----------|----------|
| M1 | **Bouton dropdown mobile** : hauteur ~32px, en dessous du minimum 44px tactile (cf. checklist mobile §1) | Moyenne |
| M2 | **Recherche + filtres + dropdown** prennent ~180px avant le contenu sur mobile — beaucoup d'espace perdu | Basse |

---

## 5. Flux UX (88/100)

### Points positifs
- [x] Choix initial SEN/CEJEF avec explications claires
- [x] Persistance localStorage
- [x] Bouton "Changer de profil" en bas de la sidebar — discret mais accessible
- [x] Navigation directe (1 clic = contenu visible)
- [x] Transition fluide entre thèmes

### Aucun problème résiduel

---

## Contraste WCAG AA — Vérification

| Élément | Couleur texte | Couleur fond | Ratio estimé | Conforme AA ? |
|---------|--------------|-------------|-------------|---------------|
| Corps texte light | gray-600 (#4B5563) | white (#FFF) | ~7.5:1 | Oui |
| Corps texte dark | gray-300 (#D1D5DB) | gray-800 (#1F2937) | ~8.5:1 | Oui |
| Titres h2/h3 light | gray-900 (#111827) | white (#FFF) | ~17:1 | Oui |
| Sidebar compteur | gray-500 (#6B7280) | gray-50 (#F9FAFB) | ~5.9:1 | Oui |
| Placeholder recherche | gray-500 (#6B7280) | white (#FFF) | ~5.9:1 | Oui |
| Lien Fedlex hover | primary-600 | white | ~4.5:1 | Limite |
| Bouton "Changer de profil" | gray-400 (#9CA3AF) | gray-50 (#F9FAFB) | ~3.2:1 | Non (trop faible) |

### Action requise
- Le bouton "Changer de profil" a un contraste de ~3.2:1 (text-gray-400 sur gray-50). Passer à `text-gray-500` pour atteindre ~5.9:1.

---

## Résumé des corrections restantes

| # | Correction | Priorité | Effort |
|---|-----------|----------|--------|
| 1 | Contraste bouton "Changer de profil" : gray-400 → gray-500 | Haute | 1 min |
| 2 | Focus visible sur les boutons sidebar (ajouter `focus-visible:ring-2`) | Haute | 5 min |
| 3 | Hauteur bouton dropdown mobile >= 44px | Moyenne | 2 min |
| 4 | Compteur de résultats de recherche | Moyenne | 15 min |
| 5 | `aria-live` sur la zone de contenu pour lecteurs d'écran | Basse | 5 min |

---

## Évolution du score

| Audit | Date | Score | Principales améliorations |
|-------|------|-------|--------------------------|
| v1.0 | 2026-03-18 | 74/100 | Layout carte initial |
| v1.2 | 2026-03-18 | 88/100 | Sidebar, aria, backdrop, max-w-prose, contraste, transition |
