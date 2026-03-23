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

## 2026-03-19 — storeToRefs ne fonctionne pas avec les constantes Pinia

**Contexte** : Ajout du compteur filtré "X logiciels sur 127" qui accède à `softwareList.length`.
**Erreur** : `softwareList` est une constante (`const softwareList = getSoftwareList()`) dans le store, pas un `ref`. `storeToRefs` retourne `undefined` pour les non-refs → TypeError.
**Correction** : Accéder via `store.softwareList` directement au lieu de destructurer avec `storeToRefs`.
**Règle** : `storeToRefs` ne fonctionne qu'avec les `ref`/`computed` du store. Les constantes doivent être accédées via `store.nomVariable`.

## 2026-03-20 — npm ci échoue en CI quand package-lock.json a des peer dependencies non résolues

**Contexte** : Déploiement GitHub Pages v0.14.0 échoue — `npm ci` refuse d'installer.
**Erreur** : `@nuxt/test-utils` embarque `h3@2.0.1-rc.11` qui demande `crossws@^0.4.1` en peer dependency optionnelle. Le lock file ne contenait que `crossws@0.3.5`. `npm install` local ne détecte pas le problème, mais `npm ci` en CI est plus strict.
**Correction** : Ajout de `"overrides": { "crossws": "^0.4.1" }` dans `package.json` pour forcer la résolution.
**Règle** : Après chaque ajout de devDependency (surtout les packages avec des RC comme `@nuxt/test-utils`), vérifier `npm ls` pour les `invalid` et tester `npm ci` avant de merger.

## 2026-03-19 — Labels LGPD hébergement hardcodés = bug

**Contexte** : Page détail logiciel affiche "Hébergement Union Européenne" pour Socrative (hébergé aux USA).
**Erreur** : Le mapping `hosting: { 2: "Union Européenne" }` était hardcodé — la valeur 2 ne signifie pas toujours UE.
**Correction** : Utiliser `software.dataLocation` (la vraie localisation) au lieu d'un label fixe par niveau.
**Règle** : Ne jamais hardcoder des labels pour des niveaux de classification — utiliser les données réelles du logiciel.

## 2026-03-20 — UXNote utilise des classes CSS internes, pas du textContent

**Contexte** : Injection d'un bouton "Envoyer" dans la toolbar UXNote.
**Erreur** : Tentative de trouver le bouton "Export JSON" via `button.textContent.indexOf("Export JSON")` → retourne toujours 0. Les boutons UXNote n'ont pas de texte visible dans le DOM (le label vient de l'accessibilité/aria).
**Correction** : Cibler les éléments par leurs classes CSS internes (`wn-annot-group`, `wn-annot-btn`, `wn-annot-icon`).
**Règle** : Quand on manipule le DOM d'une librairie tierce, inspecter les classes CSS réelles (pas le snapshot Playwright qui montre les labels ARIA).

## 2026-03-22 — git remote set-url modifie le mauvais repo quand le cwd change silencieusement

**Contexte** : Travail sur 2 repos en parallèle (uxnotes-server et uxnotes-dashboard). Après un `npm install`, le shell cwd a été réinitialisé vers un autre dossier.
**Erreur** : `git remote set-url origin` exécuté sans vérifier le répertoire courant → a modifié le remote de uxnotes-server au lieu de uxnotes-dashboard. Des commits PHP ont été poussés sur le repo du dashboard.
**Correction** : Force push pour réinitialiser le remote, suppression de la branche erronnée, restauration du bon remote.
**Règle** : Toujours utiliser `cd /chemin/absolu &&` avant les commandes git quand on travaille sur plusieurs repos. Le cwd peut être réinitialisé par npm/nuxt.

## 2026-03-22 — Nuxt 4 compatibilityVersion: 4 exige les types dans app/

**Contexte** : Création d'un dossier `types/` à la racine du projet pour les interfaces TypeScript.
**Erreur** : `nuxt typecheck` ne trouvait pas `~/types/annotation` — erreur TS2307.
**Correction** : Déplacer `types/` dans `app/types/` car Nuxt 4 avec `compatibilityVersion: 4` résout `~/` vers `app/`.
**Règle** : Avec Nuxt 4 (`compatibilityVersion: 4`), tout le code applicatif doit être dans `app/` — y compris les types. `~/` pointe vers `app/`, pas la racine.

## 2026-03-23 — uxnote:annotators: contient les labels d'annotation, pas les noms de testeurs

**Contexte** : Dashboard UXNote affiche une colonne "Auteurs" avec des badges par testeur.
**Erreur** : Extraction des noms depuis `uxnote:annotators:` → affichait "Texte intro", "test 55", "Revoir ce classement" (les labels que le testeur a mis par annotation dans UXNote, pas son nom).
**Correction** : Ignorer `uxnote:annotators:`. Extraire le champ `author` de chaque annotation individuelle dans `uxnote:site:` (le vrai nom du reviewer UXNote).
**Règle** : Dans UXNote, `uxnote:annotators:` n'est pas une liste de noms de personnes. Le vrai nom du testeur est dans `annotation.author` (chaque annotation) ou `payload.author` (racine du JSON envoyé par uxnote-send.js).

## 2026-03-20 — Infomaniak mail() ne délivre pas, utiliser SMTP

**Contexte** : Envoi d'email depuis `feedback.php` avec `mail()` retournait `true` mais les emails n'arrivaient jamais.
**Erreur** : Infomaniak ne supporte pas `mail()` de manière fiable pour l'envoi. SPF non configuré → emails rejetés.
**Correction** : PHPMailer avec SMTP authentifié (`mail.infomaniak.com:587` + STARTTLS + credentials).
**Règle** : Sur Infomaniak, toujours utiliser SMTP authentifié. Ne jamais se fier à `mail()` qui retourne `true` sans garantie de délivrance.
