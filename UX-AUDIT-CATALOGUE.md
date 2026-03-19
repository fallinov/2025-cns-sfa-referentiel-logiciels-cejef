# Audit UX/UI v2.0 — Page d'accueil (Catalogue logiciels)

**Date** : 2026-03-19
**Skill** : sfa-audit-ux v2.0 (5 checklists, 295 items)
**Page** : `/` (catalogue logiciels)
**Version** : 0.10.1
**Console** : 0 erreurs

---

## Score global : 82/100

| Critère | Poids | Score | Problèmes clés |
|---------|-------|-------|----------------|
| Accessibilité | 30% | 85 | Skeletons avec `alert` role, combobox sans label visible |
| Utilisabilité | 25% | 82 | Barre de recherche complexe, filtres peu visibles |
| Typographie | — | 78 | Descriptions cartes `text-base` mais descriptions longues sans `max-w-prose` |
| Design visuel | — | 80 | Skeletons annoncés comme `alert`, badges denses |
| Mobile | 20% | 82 | Recherche bien adaptée, filtres cachés derrière bouton |
| Cohérence | 15% | 85 | Style cohérent avec page protection des données |
| Flux UX | 10% | 80 | Onboarding modal OK, mais lien "Référentiel logiciels" actif sur sa propre page |

---

## 1. Accessibilité (85/100)

### Conforme
- [x] Logo cliquable → accueil
- [x] Navigation sémantique `<nav>`, `<banner>`, `<contentinfo>`
- [x] Combobox recherche avec `aria-label` et `role="combobox"`
- [x] Cartes avec liens descriptifs incluant le titre + description
- [x] Images de certification avec `alt` descriptif
- [x] Badges avec `aria-label`
- [x] Bouton mode sombre accessible
- [x] h1 implicite absent — le h2 "127 logiciels" est le premier heading

### Problèmes

| # | Problème | Sévérité | Réf. checklist |
|---|----------|----------|---------------|
| A1 | **Skeletons loader avec `role="alert"`** — les skeletons de chargement lazy ont `alert` role, ce qui les annonce aux lecteurs d'écran à chaque apparition. Devrait être `role="status"` ou `aria-hidden` | Haute | accessibility §5 |
| A2 | **Pas de h1 sur la page** — le premier heading est h2 "127 logiciels". Il manque un h1 "Référentiel Logiciels CEJEF" | Haute | accessibility §4 |
| A3 | **Combobox filtres "Protection des données" sans label visible** — le `<select>` a un label accessible mais pas de label visible pour les utilisateurs voyants | Moyenne | accessibility §4 |
| A4 | **Lien "Référentiel logiciels" dans le header est actif sur sa propre page** — devrait avoir `aria-current="page"` | Basse | accessibility §6 |

---

## 2. Utilisabilité (82/100)

### Conforme
- [x] Recherche avec typewriter (exemples parlants)
- [x] Filtres rapides (Approuvé CEJEF, SEN, Utilisable élèves, Formation)
- [x] Tri par recommandés / alphabétique
- [x] Toggle grille / liste
- [x] Message d'avertissement données sensibles bien visible
- [x] Compteur "127 logiciels"
- [x] Cartes cliquables avec hover + badge LGPD
- [x] Onboarding modal au premier accès

### Problèmes

| # | Problème | Sévérité | Réf. checklist |
|---|----------|----------|---------------|
| U1 | **Pas de compteur filtré** — quand on filtre, le compteur dit toujours "127 logiciels". Devrait afficher "X logiciels sur 127" (Nielsen #1 : visibilité du statut) | Haute | usability §8 |
| U2 | **Label "Filtres" peu visible** — texte seul sans icône ni contraste, facile à rater (Krug : scannabilité) | Moyenne | usability §5 |
| U3 | **Badges trop denses sur certaines cartes** — Microsoft Word a 3 badges (Approuvé CEJEF, Approuvé SEN, Compte @edu.jura.ch) qui prennent autant de place que la description | Basse | usability §8 |

---

## 3. Typographie (78/100)

### Conforme
- [x] Titres cartes h3 en `text-xl font-bold`
- [x] Descriptions en `text-base`
- [x] Police Inter cohérente
- [x] Hiérarchie visuelle claire (badge LGPD > titre > description > badges)

### Problèmes

| # | Problème | Sévérité | Réf. checklist |
|---|----------|----------|---------------|
| T1 | **Pas de h1** — il manque un titre principal. Le h2 "127 logiciels" n'est pas un vrai titre de page | Haute | typography §1 |
| T2 | **Descriptions cartes sans `max-w-prose`** — en vue liste, les descriptions traversent toute la largeur de la ligne sur grand écran | Moyenne | typography §3 |
| T3 | **Badges en `text-xs`** (12px) — sous le minimum de 14px pour du texte secondaire lisible | Moyenne | typography §1 |
| T4 | **Texte d'avertissement en `text-sm`** (14px) — contenu important sous le minimum 16px recommandé | Basse | typography §1 |

---

## 4. Design visuel (80/100)

### Conforme
- [x] Grille 4 colonnes desktop, 1 colonne mobile
- [x] Cartes avec `rounded`, `shadow-sm`, hover `shadow-xl`
- [x] Badge LGPD coloré (vert/orange/rouge) avec icône
- [x] Icônes Lucide cohérentes
- [x] Barre de recherche pill comme la page protection des données

### Problèmes

| # | Problème | Sévérité | Réf. checklist |
|---|----------|----------|---------------|
| V1 | **Badges Approuvé CEJEF/SEN en fond vert/sky plein** — très saturés, contrastent trop avec le reste de la carte neutre | Moyenne | visual-design §2 |
| V2 | **Skeletons en bas de page** — des cartes skeleton sont visibles en permanence en bas (loading lazy), donnant l'impression que la page n'a pas fini de charger | Moyenne | visual-design §9 |
| V3 | **Icônes de cartes** en gris neutre — pas de distinction visuelle entre les catégories (tous les logiciels ont le même style d'icône grise) | Basse | visual-design §5 |

---

## 5. Mobile & Responsive (82/100)

### Conforme
- [x] Recherche pleine largeur avec bouton search
- [x] Filtres cachés derrière bouton "Filtres" (bonne pratique mobile)
- [x] Cartes empilées verticalement
- [x] Menu hamburger Nuxt UI
- [x] Badge LGPD bien positionné sur les cartes mobiles

### Problèmes

| # | Problème | Sévérité | Réf. checklist |
|---|----------|----------|---------------|
| M1 | **Boutons grille/liste** — touch targets < 44px, difficiles à toucher | Moyenne | mobile §1 |
| M2 | **Select tri "Recommandés"** — texte petit, hauteur ~32px | Basse | mobile §1 |

---

## Résumé des corrections prioritaires

| # | Correction | Priorité | Effort |
|---|-----------|----------|--------|
| 1 | Ajouter un h1 "Référentiel Logiciels" (caché visuellement si nécessaire) | Haute | 2 min |
| 2 | Compteur filtré "X logiciels sur 127" au lieu de "127 logiciels" | Haute | 15 min |
| 3 | Skeletons : `role="status"` ou `aria-hidden` au lieu de `alert` | Haute | 5 min |
| 4 | `max-w-prose` sur les descriptions en vue liste | Moyenne | 5 min |
| 5 | `aria-current="page"` sur le lien actif dans le header | Moyenne | 5 min |
| 6 | Badges text-xs → text-sm (14px minimum) | Moyenne | 2 min |
| 7 | Touch targets grille/liste >= 44px mobile | Moyenne | 5 min |
| 8 | Saturation badges Approuvé — adoucir les couleurs | Basse | 10 min |
