# Charte graphique — Applications SFP / SEN / CEJEF

> Document de reference pour toutes les applications du Service de la Formation Professionnelle.
> Version 2.0 — Mars 2026

---

## 1. Positionnement visuel

### Objectif

Creer une identite visuelle :

- **Institutionnelle** — sobre, credible, sans effet "startup"
- **Lisible** — contrastes eleves, hierarchie nette
- **Moderne** — design epure, composants actuels
- **Coherente** — reutilisable sur toutes les applications SFP
- **Souveraine** — aucune dependance a des services externes (CDN, fonts distantes)

### Principes directeurs

1. Priorite a la clarte et a la lisibilite
2. Contrastes eleves (WCAG AAA vise, AA minimum)
3. Hierarchie visuelle nette (titres, contenus, metadonnees)
4. Peu de couleurs simultanees a l'ecran
5. Couleur de marque reservee aux actions importantes
6. Mode sombre supporte sur toutes les applications
7. Toutes les ressources hebergees sur notre infrastructure (souverainete des donnees)

---

## 2. Palette de couleurs

### 2.1 Palette interface

| Role | Hex | Usage |
|------|-----|-------|
| Fond principal | `#FFFFFF` | Arriere-plan des pages |
| Fond secondaire | `#F9FAFB` | Cartes, sections differenciees, sidebar |
| Bordure / gris UI | `#E5E7EB` | Bordures, separateurs, champs de saisie |
| Texte secondaire | `#4B5563` | Aides, metadonnees, placeholders |
| Texte principal | `#111827` | Titres, corps de texte |
| **Primaire / marque** | **`#9A211F`** | Boutons principaux, liens actifs, accents |

> **Palette Coolors** : https://coolors.co/ffffff-f9fafb-e5e7eb-4b5563-111827-9a211f

### 2.2 Palette etats / messages systeme

| Etat | Couleur forte | Fond doux | Usage |
|------|--------------|-----------|-------|
| Information | `#2563EB` | `#EFF6FF` | Messages d'info, badges d'authentification |
| Succes | `#1D7A3F` | `#ECFDF3` | Validation, statut autorise |
| Avertissement | `#946017` | `#FFFBEB` | Alertes non-bloquantes, statut restreint |
| Erreur | `#9A211F` | `#FEF2F2` | Erreurs, statut interdit |

> **Palette Coolors** : https://coolors.co/2563eb-1d7a3f-946017-9a211f

### 2.3 Mode sombre

| Role | Hex |
|------|-----|
| Fond principal | `#030712` |
| Fond secondaire | `#111827` |
| Bordure | `#374151` |
| Texte secondaire | `#9CA3AF` |
| Texte principal | `#FFFFFF` |
| Primaire / marque | `#C43533` |
| Succes | `#34B36C` |
| Avertissement | `#C8930F` |
| Info | `#60A5FA` |

### 2.4 Regles d'usage des couleurs

- `#9A211F` est la couleur de **marque** et d'**action principale**
- `#9A211F` sert aussi pour les etats d'**erreur** et les statuts **interdits**
- Ne jamais multiplier les couleurs fortes dans un meme composant
- Toujours accompagner une couleur d'etat par une **icone** et un **label textuel**
- Sur fond colore fort : texte blanc uniquement

---

## 3. Accessibilite (WCAG)

### Contrastes minimaux

| Contexte | Ratio vise | Ratio minimum |
|----------|-----------|---------------|
| Texte principal sur fond blanc | 7:1+ (AAA) | 4.5:1 (AA) |
| Texte secondaire sur fond blanc | 5:1+ (AA) | 4.5:1 (AA) |
| Composants UI (bordures, icones) | 4.5:1+ | 3:1 (AA) |
| Texte blanc sur fond colore | 4.5:1+ (AA) | 4.5:1 (AA) |

### Ratios mesures de la palette

| Combinaison | Ratio | Niveau |
|------------|-------|--------|
| `#111827` sur `#FFFFFF` | 16.2:1 | AAA |
| `#4B5563` sur `#FFFFFF` | 7.4:1 | AAA |
| `#9A211F` sur `#FFFFFF` | 7.5:1 | AAA |
| `#1D7A3F` sur `#FFFFFF` | 5.4:1 | AA |
| `#946017` sur `#FFFFFF` | 5.0:1 | AA |
| `#2563EB` sur `#FFFFFF` | 4.6:1 | AA |
| Blanc sur `#9A211F` (primaire/erreur) | 7.5:1 | AAA |
| Blanc sur `#1D7A3F` (succes) | 5.4:1 | AA |
| Blanc sur `#946017` (avertissement) | 5.0:1 | AA |
| Blanc sur `#2563EB` (information) | 4.6:1 | AA |

### Regles

- Texte secondaire : minimum `#4B5563` sur fond blanc (pas de gris clair)
- Jamais de couleur seule pour transmettre une information (toujours icone + label)
- Texte blanc sur tous les fonds colores forts
- Tester avec un simulateur daltonisme (protanopie, deuteranopie)

---

## 4. Typographie

### Police

**Inter** — police officielle des applications SFP.

```
Principale : Inter
Fallback : system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Telechargement :
- Google Fonts : https://fonts.google.com/specimen/Inter
- GitHub (OTF/WOFF2) : https://github.com/rsms/inter/releases

### Hierarchie

| Element | Taille | Poids |
|---------|--------|-------|
| Titre de page | 32px (2rem) | Bold (700) |
| Titre de section | 24px (1.5rem) | Bold (700) |
| Sous-titre | 20px (1.25rem) | Semibold (600) |
| Texte courant | 16px (1rem) | Normal (400) |
| Texte secondaire | 14px (0.875rem) | Normal (400) |
| Micro-label | 12px (0.75rem) | Medium (500) |

### Regles

- Interlignage : 1.5 minimum pour le corps de texte
- Taille minimale : 16px pour le contenu principal
- Pas de majuscules sur les blocs de texte longs
- Majuscules reservees aux petits labels et badges
- Espacement des lettres elargi pour les labels en majuscules

---

## 5. Boutons

### Bouton principal (CTA)

| Propriete | Valeur |
|-----------|--------|
| Fond | `#9A211F` |
| Texte | `#FFFFFF` |
| Hover | `#821C1A` (assombrissement) |
| Usage | Action principale, validation, CTA dominant |

### Bouton secondaire

| Propriete | Valeur |
|-----------|--------|
| Fond | `#FFFFFF` |
| Texte | `#111827` |
| Bordure | `#E5E7EB` |
| Hover | `#F9FAFB` |
| Usage | Annuler, retour, filtres, actions secondaires |

### Bouton ghost / neutre

| Propriete | Valeur |
|-----------|--------|
| Fond | transparent |
| Texte | `#4B5563` |
| Hover | `#F9FAFB` |
| Usage | Actions tertiaires, icones, toggles |

### Regles

- **Une seule action principale** visuellement dominante par zone
- Eviter plusieurs boutons de couleur forte dans le meme ecran
- Hover : assombrissement leger uniquement (pas d'ombre, pas de mise a l'echelle)
- Etat desactive : fond `#F3F4F6`, texte `#9CA3AF`, curseur interdit
- Etat focus : anneau visible autour du bouton (couleur primaire)

---

## 6. Champs et formulaires

### Style des champs

| Propriete | Valeur |
|-----------|--------|
| Fond | `#FFFFFF` |
| Texte | `#111827` |
| Bordure repos | `#E5E7EB` |
| Placeholder | `#4B5563` |
| Bordure focus | `#9A211F` |
| Bordure erreur | `#9A211F` |
| Rayon | 8px |

### Regles

- Label visible **au-dessus** du champ (jamais uniquement en placeholder)
- Placeholder = exemple ou aide, jamais le seul indicateur du contenu attendu
- Message d'erreur sous le champ avec texte explicite et couleur d'erreur
- Focus visible et net (anneau de couleur primaire)

---

## 7. Cartes et panneaux

### Cartes

| Propriete | Valeur |
|-----------|--------|
| Fond | `#FFFFFF` |
| Bordure | `#E5E7EB` |
| Rayon | 12px |
| Ombre | aucune ou tres legere |

### Panneaux secondaires

| Propriete | Valeur |
|-----------|--------|
| Fond | `#F9FAFB` |
| Bordure | `#E5E7EB` |

### Tableaux

- Fond blanc, en-tete sobre (`#F9FAFB`)
- Separateurs legers (`#E5E7EB`)
- Pas de zebrage agressif
- Couleurs d'etat uniquement sur badges, pas sur lignes entieres

---

## 8. Badges et statuts

### Badge neutre

| Propriete | Valeur |
|-----------|--------|
| Fond | `#F9FAFB` |
| Texte | `#4B5563` |
| Bordure | `#E5E7EB` |

### Badges d'etat

| Etat | Fond | Texte |
|------|------|-------|
| Info | `#EFF6FF` | `#2563EB` |
| Succes | `#ECFDF3` | `#1D7A3F` |
| Avertissement | `#FFFBEB` | `#946017` |
| Erreur | `#FEF2F2` | `#9A211F` |

### Badges specifiques (referentiel logiciels)

| Badge | Fond | Texte | Icone |
|-------|------|-------|-------|
| Approuve CEJEF | `#1D7A3F` | Blanc | Badge avec coche |
| Approuve SEN | `#1D7A3F` | Blanc | Badge avec coche |
| Compte edu.jura.ch | `#2563EB` | Blanc | Arobase |
| Compte Edulog | `#2563EB` | Blanc | Cle |
| < 16 ans : accord parents | `#946017` | Blanc | Gateau |

---

## 9. Icones

### Bibliotheque

**Lucide** — icones open-source, style lineaire.

Site : https://lucide.dev

### Style

- Simple, lineaire, coherent
- Taille par defaut : 20 x 20px
- Epaisseur de trait : 2px
- Pas d'effets 3D ni de degrades

### Couleurs

| Contexte | Couleur |
|----------|---------|
| Par defaut | `#4B5563` |
| Actif / selectionne | `#9A211F` |
| Info | `#2563EB` |
| Succes | `#1D7A3F` |
| Avertissement | `#946017` |
| Erreur | `#9A211F` |

---

## 10. Espacement

### Grille (base 8px)

| Token | Valeur | Usage |
|-------|--------|-------|
| micro | 4px | Espaces internes minimes |
| xs | 8px | Espace minimal |
| sm | 12px | Espace compact |
| md | 16px | Espace standard |
| lg | 24px | Espace large |
| xl | 32px | Espace de section |
| 2xl | 48px | Espace fort |

### Rayons de bordure

| Element | Rayon |
|---------|-------|
| Champs, boutons, badges | 8px |
| Cartes, panneaux | 12px |
| Dialogs, blocs majeurs | 16px |
| Toggles, pilules | arrondi complet |

---

## 11. Responsive

### Points de rupture

| Nom | Largeur minimale | Usage |
|-----|-----------------|-------|
| Mobile | 0 | Layout par defaut, 1 colonne |
| Tablette | 640px | 2 colonnes, elements caches en mobile visibles |
| Desktop | 1024px | Sidebar, 3-4 colonnes, navigation complete |

### Regles

- Sidebar de navigation : visible a partir de 1024px, cachee en dessous
- Grille de cartes : 1 colonne (mobile), 2 colonnes (tablette), 4 colonnes (desktop)
- Navigation principale : liens visibles en desktop, menu hamburger en mobile
- Labels de badges : tronques ou masques sur mobile, complets sur desktop

---

## 12. Animations et transitions

### Regles

- Duree standard : 200ms pour les micro-interactions (hover, focus)
- Duree de transition : 300ms pour les changements de layout
- Hover : assombrissement du fond uniquement, pas de mise a l'echelle
- Pas d'animations decoratives ou distrayantes
- Transitions fluides pour : changement d'onglet, ouverture de modale, apparition d'elements
- Respecter `prefers-reduced-motion` pour les utilisateurs sensibles

---

## 13. Logo et marque

### Logo EduJura

| Propriete | Valeur |
|-----------|--------|
| Texte | "Edu" en `#111827` + "Jura" en `#9A211F` |
| Police | Inter, Extra Bold (800), espacement serre |
| Hauteur | 40px dans le header |
| Mode sombre | "Edu" en blanc + "Jura" en `#C43533` |

### Utilisation

- Toujours positionne en haut a gauche
- Lien vers la page d'accueil
- Espace minimum autour du logo : 16px
- Accompagne d'un logo SVG (version claire et sombre)

---

## 14. Souverainete des donnees

### Regles

- **Aucun CDN externe** en production (polices, librairies, images, scripts)
- Toutes les ressources sont hebergees sur notre infrastructure (VPS Infomaniak, Suisse)
- Raison : ne pas envoyer de donnees utilisateur (IP, referer, headers) a des plateformes tierces
- La police Inter doit etre incluse dans les fichiers du projet, pas chargee depuis Google Fonts en production
- Les icones Lucide sont embarquees dans le build, pas chargees a distance
- Si un outil externe est necessaire, telecharger la ressource et la servir localement

---

## 15. Anti-patterns (a eviter)

| Ne pas faire | Faire |
|-------------|-------|
| Couleur seule pour transmettre un etat | Icone + label + couleur |
| Plusieurs boutons de couleur forte par zone | Un seul CTA dominant |
| Texte gris clair sur fond blanc | Minimum `#4B5563` sur blanc |
| Ombres lourdes, degrades, effets glassmorphism | Bordures subtiles, fonds plats |
| Majuscules sur des paragraphes | Majuscules uniquement sur labels courts |
| Chargeur rotatif generique (spinner) | Squelette reproduisant la structure reelle |
| Ressources chargees depuis un CDN | Tout heberge localement |
| Textes affiches en dur dans l'interface | Centraliser pour l'internationalisation |
| Couleurs hors palette | Utiliser exclusivement les couleurs definies |

---

## 16. Resume executif

```
Identite    : sobre, institutionnelle, accessible, moderne
Police      : Inter (fallback system-ui)
Primaire    : #9A211F (rouge CEJEF)
Succes      : #1D7A3F
Avertissement : #946017
Info        : #2563EB
Texte       : #111827 principal, #4B5563 secondaire
Fond        : #FFFFFF principal, #F9FAFB secondaire
Bordure     : #E5E7EB
Rayons      : 8px → 12px → 16px
Grille      : base 8px
Icones      : Lucide (lineaire, simple)
WCAG        : AAA vise, AA minimum absolu
Dark mode   : supporte
Souverainete : aucun CDN externe
```
