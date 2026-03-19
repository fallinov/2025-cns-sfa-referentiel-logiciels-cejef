# Audit UX/UI v2.0 — Page détail logiciel

**Date** : 2026-03-19
**Skill** : sfa-audit-ux v2.0 (5 checklists, 295 items)
**Page** : `/logiciels/[id]` (ex: Microsoft Teams)
**Console** : 0 erreurs

---

## Score global : 85/100

| Critère | Poids | Score | Problèmes clés |
|---------|-------|-------|----------------|
| Accessibilité | 30% | 90 | Sections `<region>` bien structurées, aria-label sur liens |
| Utilisabilité | 25% | 85 | Navigation prev/next OK, bouton copie lien OK |
| Typographie | — | 82 | Description "À propos" sans max-w-prose, texte boilerplate |
| Design visuel | — | 82 | Fond dégradé décoratif sur le header couvre une grande zone |
| Mobile | 20% | 83 | CTA "Accéder au logiciel" masqué sous "Voir détails techniques" |
| Cohérence | 15% | 88 | Badges cohérents avec la page d'accueil |
| Flux UX | 10% | 88 | Retour au catalogue + navigation clavier flèches |

---

## 1. Accessibilité (90/100)

### Conforme
- [x] h1 avec le nom du logiciel
- [x] Hiérarchie h1 → h2 → h3 correcte
- [x] `<region>` sémantique pour chaque section (Statut, Pour quels cours, À propos)
- [x] Liens prev/next avec `aria-label` ("Logiciel précédent/suivant")
- [x] Bouton copie lien avec `aria-label`
- [x] Lien "Accéder au logiciel" avec `target="_blank"` et icône externe
- [x] Badges avec `aria-label` (via SoftwareFeatureBadge)
- [x] Console : 0 erreurs

### Problèmes

| # | Problème | Sévérité |
|---|----------|----------|
| A1 | **Bouton "Retour au catalogue"** n'a pas de `role="link"` malgré son comportement de navigation | Basse |
| A2 | **Liens disciplines/catégories** sans indication que ce sont des filtres vers la page d'accueil | Basse |

---

## 2. Utilisabilité (85/100)

### Conforme
- [x] Navigation prev/next en haut avec raccourcis clavier (flèches)
- [x] Bouton "Retour au catalogue" bien visible
- [x] Bouton copie lien avec animation "Copié !"
- [x] CTA "Accéder au logiciel" proéminent
- [x] Logiciels similaires avec pastille LGPD
- [x] Informations pratiques structurées (coût, support, formation, public)
- [x] Détails techniques masqués par défaut (bouton "Voir les détails techniques")

### Problèmes

| # | Problème | Sévérité |
|---|----------|----------|
| U1 | **Section "À propos"** avec texte générique boilerplate identique pour beaucoup de logiciels — "Cet outil est conçu pour faciliter les tâches pédagogiques" n'apporte rien (Krug : Omit needless words) | Moyenne (contenu) |
| U2 | **Pas de "Remarque LGPD"** affichée — le champ `remarque` avec la justification de classification n'est pas visible. C'est l'info la plus utile pour comprendre pourquoi un logiciel est vert/orange/rouge | Moyenne |
| U3 | **Discipline "Toutes"** — peu informatif. Si un logiciel est transversal, ne pas afficher de section disciplines | Basse |

---

## 3. Typographie (82/100)

### Conforme
- [x] h1 `text-3xl sm:text-4xl` — conforme échelle
- [x] h2 `text-2xl` — conforme
- [x] h3 — conforme
- [x] Description `text-lg` — conforme
- [x] `leading-relaxed` sur la description

### Problèmes

| # | Problème | Sévérité |
|---|----------|----------|
| T1 | **Description "À propos" sans `max-w-prose`** — le texte traverse toute la largeur de la colonne gauche sur desktop | Moyenne |
| T2 | **Labels "Coût", "Support CEJEF"** etc. en taille trop petite sur certains breakpoints | Basse |

---

## 4. Design visuel (82/100)

### Conforme
- [x] Layout 2 colonnes (contenu + sidebar) cohérent
- [x] Badges verts cohérents avec la palette harmonisée
- [x] Sections avec `rounded-[var(--ui-radius)]` et fond gris subtil
- [x] Pastille LGPD sur les logiciels similaires

### Problèmes

| # | Problème | Sévérité |
|---|----------|----------|
| V1 | **Fond dégradé décoratif** (icône Teams géante en filigrane à droite) prend beaucoup d'espace visuel sans informer — distraction (Nielsen #8 : design minimaliste) | Basse |
| V2 | **Espacement section "Pour quels cours ?"** — les 3 sous-sections (Disciplines, Activités, Catégories) sont très espacées verticalement | Basse |

---

## 5. Mobile & Responsive (83/100)

### Conforme
- [x] Layout empilé sur mobile
- [x] CTA "Accéder au logiciel" en pleine largeur sous la carte conformité
- [x] Navigation prev/next compacte en haut
- [x] Badges wrap correctement

### Problèmes

| # | Problème | Sévérité |
|---|----------|----------|
| M1 | **CTA "Accéder au logiciel" pas visible above the fold** — sur mobile, le bouton principal est sous la carte de conformité. L'utilisateur doit scroller pour le trouver | Moyenne |
| M2 | **Flèches prev/next** trop petites — touch targets < 44px | Basse |

---

## Corrections recommandées

| # | Correction | Priorité | Effort |
|---|-----------|----------|--------|
| 1 | Ajouter `max-w-prose` sur la description "À propos" | Haute | 1 min |
| 2 | Afficher la `remarque` LGPD dans les détails techniques | Haute | 10 min |
| 3 | Supprimer le texte boilerplate "Cet outil est conçu pour faciliter..." | Moyenne | 5 min |
| 4 | CTA mobile : dupliquer "Accéder au logiciel" en haut (visible sans scroller) | Moyenne | 10 min |
| 5 | Flèches prev/next : agrandir touch target mobile | Basse | 5 min |
| 6 | Masquer discipline "Toutes" (pas informatif) | Basse | 5 min |
