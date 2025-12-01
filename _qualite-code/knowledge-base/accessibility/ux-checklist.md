# Bonnes pratiques UX pour applications web  
_Synthèse de 5 ouvrages de référence_

## Références utilisées

- Don Norman, **The Design of Everyday Things (Revised and Expanded Edition)**, Basic Books, 2013.  [oai_citation:0‡dl.icdst.org](https://dl.icdst.org/pdfs/files4/4bb8d08a9b309df7d86e62ec4056ceef.pdf?utm_source=chatgpt.com)  
- Steve Krug, **Don’t Make Me Think, Revisited: A Common Sense Approach to Web Usability**, New Riders, 2014.  [oai_citation:1‡dn790002.ca.archive.org](https://dn790002.ca.archive.org/0/items/SteveKrugDontMakeMeThink/Steve_Krug_Don%E2%80%99t_Make_Me_Think%2C.pdf?utm_source=chatgpt.com)  
- Alan Cooper, Robert Reimann, David Cronin, Christopher Noessel, **About Face: The Essentials of Interaction Design (4th ed.)**, Wiley, 2014.  [oai_citation:2‡fall14se.files.wordpress.com](https://fall14se.files.wordpress.com/2017/04/alan-cooper-robert-reimann-david-cronin-christopher-noessel-about-face_-the-essentials-of-interaction-design-wiley-2014.pdf?utm_source=chatgpt.com)  
- Brad Frost, **Atomic Design**, 2016 (site et livre).  [oai_citation:3‡atomicdesign.bradfrost.com](https://atomicdesign.bradfrost.com/chapter-2/?utm_source=chatgpt.com)  
- Luke Wroblewski, **Mobile First**, A Book Apart, 2011.  [oai_citation:4‡lukew.com](https://www.lukew.com/resources/mobile_first.asp?utm_source=chatgpt.com)  

---

## 1. Principes fondamentaux d’utilisabilité (Norman)

> Objectif : rendre les actions possibles visibles, compréhensibles et sûres pour l’utilisateur.  [oai_citation:5‡dl.icdst.org](https://dl.icdst.org/pdfs/files4/4bb8d08a9b309df7d86e62ec4056ceef.pdf?utm_source=chatgpt.com)  

### 1.1 Visibilité et découvrabilité

- [ ] Les actions possibles (boutons, liens, menus, icônes d’action) sont clairement visibles sans devoir deviner.  
- [ ] Les éléments interactifs sont distinguables du texte statique (style, contraste, état au survol).  
- [ ] Les fonctions essentielles sont accessibles sans navigation complexe (pas « cachées » dans des menus profonds).

### 1.2 Affordances et signifiants

- [ ] L’apparence de chaque élément suggère son usage (ex. bouton qui ressemble à un bouton, champ de saisie clairement identifiable).  
- [ ] Des signifiants explicites (libellés, icônes, micro‐textes) indiquent où cliquer, taper ou glisser.  
- [ ] Les icônes ambiguës sont accompagnées d’un label ou d’un tooltip clair.

### 1.3 Feedback immédiat

- [ ] Toute action de l’utilisateur produit un retour clair et rapide (changement visuel, message, loader, notification).  
- [ ] Les états de chargement sont visibles (spinner, skeleton, barre de progression).  
- [ ] Les actions critiques (supprimer, payer, envoyer) confirment la réussite ou l’échec par un message explicite.

### 1.4 Mappings naturels

- [ ] La disposition des contrôles correspond à la disposition des éléments contrôlés (ex. sliders, listes triées).  
- [ ] L’ordre des champs suit l’ordre naturel de la tâche de l’utilisateur.  
- [ ] Les raccourcis clavier ou gestes suivent les conventions connues de la plateforme.

### 1.5 Contraintes et prévention des erreurs

- [ ] L’interface empêche autant que possible les erreurs (désactivation de boutons non valides, validation en temps réel).  
- [ ] Les actions destructrices demandent confirmation, voire double confirmation.  
- [ ] Les conséquences d’une action potentiellement risquée sont clairement indiquées avant l’action.

### 1.6 Gestion des erreurs

- [ ] Les messages d’erreur sont en langage clair, expliquent la cause et la solution.  
- [ ] L’utilisateur peut revenir à un état stable (annuler, revenir en arrière, version précédente).  
- [ ] L’interface tolère les erreurs (ré‐édition facile d’un formulaire, récupération de brouillon, undo).

---

## 2. Simplicité et « ne me fais pas réfléchir » (Krug)

> Objectif : réduire au maximum la charge cognitive et les doutes pendant la navigation.  [oai_citation:6‡dn790002.ca.archive.org](https://dn790002.ca.archive.org/0/items/SteveKrugDontMakeMeThink/Steve_Krug_Don%E2%80%99t_Make_Me_Think%2C.pdf?utm_source=chatgpt.com)  

### 2.1 Première loi : « Don’t make me think »

- [ ] À chaque écran, l’utilisateur comprend immédiatement :
  - de quoi il s’agit,
  - ce qu’il peut faire,
  - comment continuer.  
- [ ] Il n’y a pas de questions implicites (« Où dois‐je cliquer ? », « Est‐ce que ceci est un bouton ? »).  
- [ ] Les intitulés de menus, boutons et pages sont explicites (pas de jargon interne).

### 2.2 Hiérarchie visuelle claire

- [ ] Les titres, sous‐titres, textes et boutons suivent une hiérarchie visuelle nette (taille, graisse, espace).  
- [ ] Ce qui est le plus important est visuellement le plus saillant (position, taille, contraste).  
- [ ] Une seule action principale par écran est mise en avant (bouton principal, CTA clair).

### 2.3 Utilisation des conventions

- [ ] Les patterns standard du web sont respectés (logo en haut à gauche, clic sur logo → accueil, icône « hamburger » pour menu, etc.).  
- [ ] Les liens ressemblent à des liens (soulignés ou style cohérent).  
- [ ] Les formulaires utilisent les conventions habituelles (labels au bon endroit, messages d’erreur proches du champ).

### 2.4 Scannabilité du contenu

- [ ] Les utilisateurs peuvent « scanner » la page : titres, listes à puces, paragraphes courts.  
- [ ] Les blocs de texte sont courts et aérés, sans pavé dense.  
- [ ] Les mots inutiles sont supprimés (principe « Omit needless words »).

### 2.5 Réduction du bruit

- [ ] Les éléments décoratifs n’entrent pas en compétition avec les éléments fonctionnels.  
- [ ] Pas plus de 2–3 styles typographiques principaux par page.  
- [ ] Pas d’éléments clignotants, superflus ou distrayants autour du contenu principal.

### 2.6 Tests utilisateurs réguliers

- [ ] L’interface est testée tôt et souvent avec de vrais utilisateurs (même 3–5 personnes).  
- [ ] Les problèmes observés en test sont corrigés avant d’ajouter de nouvelles fonctionnalités.  
- [ ] Les tests sont rapides, peu formels, mais récurrents.

---

## 3. Conception orientée objectifs et scénarios (About Face)

> Objectif : aligner l’interface sur les objectifs réels des utilisateurs, pas sur la structure technique du système.  [oai_citation:7‡fall14se.files.wordpress.com](https://fall14se.files.wordpress.com/2017/04/alan-cooper-robert-reimann-david-cronin-christopher-noessel-about-face_-the-essentials-of-interaction-design-wiley-2014.pdf?utm_source=chatgpt.com)  

### 3.1 Design orienté objectifs (Goal-Directed Design)

- [ ] Les fonctionnalités prioritaires sont dérivées des objectifs des utilisateurs, pas de la liste de fonctionnalités possibles.  
- [ ] Chaque écran répond à un objectif clair (« que veut accomplir l’utilisateur ici maintenant ? »).  
- [ ] Les flux sont construits à partir de scénarios réalistes, pas au hasard.

### 3.2 Personas et scénarios

- [ ] Des personas représentatifs (basés sur des recherches) sont définis pour le produit.  
- [ ] Chaque fonctionnalité cible explicitement un ou plusieurs personas.  
- [ ] Des scénarios détaillés décrivent comment le persona utilise l’interface étape par étape.

### 3.3 Flux de tâches cohérents

- [ ] Les flux de tâches sont continus, avec un minimum de ruptures (changement de page, modales inutiles).  
- [ ] Les étapes sont ordonnées logiquement, dans l’ordre mental de l’utilisateur.  
- [ ] Les actions rares ou avancées ne perturbent pas le flux principal.

### 3.4 Posture du produit

- [ ] La « posture » du produit (app principale, utilitaire rapide, outil en tâche de fond, etc.) est définie.  
- [ ] Le niveau de complexité et de densité de l’interface est cohérent avec cette posture (ex. app professionnelle « souveraine » vs widget ponctuel).  
- [ ] La fréquence d’usage est prise en compte : plus un écran est utilisé souvent, plus il doit être optimisé.

### 3.5 Minimisation de la complexité apparente

- [ ] Les paramètres avancés sont masqués par défaut ou regroupés dans des vues dédiées.  
- [ ] Les choix proposés à l’utilisateur sont limités au strict nécessaire sur chaque écran.  
- [ ] Les valeurs par défaut sont pertinentes et réduisent le travail de configuration.

---

## 4. Design system et composants réutilisables (Atomic Design)

> Objectif : garantir cohérence, réutilisabilité et évolutivité via un système de composants structuré.  [oai_citation:8‡atomicdesign.bradfrost.com](https://atomicdesign.bradfrost.com/chapter-2/?utm_source=chatgpt.com)  

### 4.1 Niveaux d’Atomic Design

- [ ] Les composants sont structurés en :
  - Atomes : éléments de base (boutons, champs, icônes, couleurs, styles de texte),
  - Molécules : petites combinaisons fonctionnelles (ex. champ + label + aide),
  - Organismes : sections complètes (header, carte produit, formulaire complet),
  - Templates : structures de page réutilisables,
  - Pages : instanciations concrètes avec contenu réel.  
- [ ] Le code reflète cette hiérarchie (arborescence de composants, dossiers, nomenclature).

### 4.2 Cohérence visuelle et comportementale

- [ ] Les atomes (boutons, inputs, titres, couleurs) sont définis à un seul endroit (design tokens, thème).  
- [ ] Les mêmes composants sont utilisés partout pour le même rôle (un type de bouton principal, un style de lien, etc.).  
- [ ] Les variations de composants (taille, état, importance) sont documentées et limitées.

### 4.3 Réutilisabilité et composition

- [ ] Les molécules et organismes sont conçus pour être réutilisables dans plusieurs pages.  
- [ ] Les composants n’intègrent pas de logique métier spécifique non réutilisable (séparation UI / logique métier).  
- [ ] Les templates de page définissent la structure, pas les données concrètes.

### 4.4 Documentation et gouvernance

- [ ] Le design system est documenté (guide de styles, exemples de composants, comportements).  
- [ ] Chaque nouveau composant est évalué : peut-on réutiliser ou étendre un composant existant ?  
- [ ] Les modifications majeures du design system sont versionnées et communiquées.

---

## 5. Mobile first, responsive et performance (Mobile First)

> Objectif : concevoir d’abord pour les écrans mobiles, puis enrichir progressivement pour les écrans plus grands.  [oai_citation:9‡lukew.com](https://www.lukew.com/resources/mobile_first.asp?utm_source=chatgpt.com)  

### 5.1 Conception « mobile first »

- [ ] Les maquettes et prototypes commencent par les écrans mobiles (small breakpoint).  
- [ ] Les fonctionnalités essentielles sont disponibles et utilisables sur mobile.  
- [ ] Les écrans plus grands ajoutent des éléments de confort, pas des dépendances fonctionnelles obligatoires.

### 5.2 Priorisation du contenu et des actions

- [ ] Sur mobile, seuls les contenus et actions indispensables sont affichés sur l’écran principal.  
- [ ] Les éléments secondaires sont accessibles via menus, onglets, accordéons.  
- [ ] L’ordre du contenu respecte les priorités des utilisateurs, pas la structure interne du système.

### 5.3 Progressive enhancement

- [ ] Le socle fonctionnel reste utilisable avec des capacités limitées (connexion lente, device ancien).  
- [ ] Les enrichissements (animations complexes, modules lourds) sont optionnels et dégradables.  
- [ ] Les fonctionnalités critiques ne dépendent pas uniquement de comportements avancés (ex. drag & drop sans alternative).

### 5.4 Performance perçue et réelle

- [ ] Le temps de chargement initial est optimisé (lazy loading, découpage des bundles, ressources critiques minimales).  
- [ ] Les ressources lourdes (images haute résolution, vidéos) sont chargées de manière différée ou adaptative.  
- [ ] L’interface reste réactive aux interactions (pas de blocage lors de gros traitements).

### 5.5 Gestes et saisie mobile

- [ ] Les cibles tactiles respectent une taille minimale confortable (≈44px ou plus).  
- [ ] Les formulaires mobiles exploitent les bons claviers virtuels (email, nombre, téléphone).  
- [ ] Les gestes complexes (swipe, long press) ne sont pas essentiels sans alternative visible.

---

## 6. Checklist globale (synthèse transversale)

> À utiliser comme validation rapide pour une interface donnée.

- [ ] L’utilisateur comprend immédiatement le but de l’écran et les actions possibles (Norman, Krug).  
- [ ] Les éléments interactifs sont visibles, distincts et respectent les conventions (Norman, Krug).  
- [ ] Les actions clés nécessitent peu d’efforts et peu de décisions à chaque étape (Krug, Cooper).  
- [ ] Les erreurs sont difficiles à commettre et faciles à corriger (Norman, Cooper).  
- [ ] Chaque écran sert un objectif utilisateur précis, issu de personas et scénarios (Cooper).  
- [ ] Les composants sont construits selon une hiérarchie atomique (atomes → pages) et réutilisés partout (Frost).  
- [ ] Le design system garantit une cohérence visuelle et comportementale (Frost).  
- [ ] L’interface est conçue d’abord pour mobile, avec contenu priorisé et performance optimisée (Wroblewski).  
- [ ] Des tests utilisateurs réguliers valident les choix faits, même sur un petit échantillon (Krug).  
