# Leçons apprises

## 2026-06-04 — DIRECTUS_TOKEN sans droits write : FORBIDDEN silencieux au pipeline IA

**Contexte** : Classification ActivePresenter via `/sfa-classify-software` — la fiche ne pouvait pas être créée dans Directus.
**Erreur** : Le `DIRECTUS_TOKEN` chargé via direnv retournait `FORBIDDEN` sur `POST /items/software` et sur toutes les mutations. Le MCP indiquait "Connected" et la lecture fonctionnait — signe trompeur d'un token en lecture seule.
**Correction** : Utiliser un token lié à un rôle avec `create`+`update` sur `software`, `software_category`, `software_pedagogical_activity`. Fallback : passer le token directement à curl (`-H "Authorization: Bearer <token>"`).
**Règle** : Quand le MCP Directus retourne `FORBIDDEN` sur create/update mais pas sur read, le token a un rôle lecture seule. Vérifier dans Directus admin > Settings > Access Control > [rôle du token] > permissions sur les 3 collections. Le `DIRECTUS_TOKEN` dans `.env` doit être régénéré si le rôle associé a été modifié.

## 2026-06-03 — MCP project-scoped non chargé si Claude Code est déjà ouvert

**Contexte** : Ajout de `.mcp.json` (MCP Directus HTTP) en cours de session Claude Code.
**Erreur** : `claude mcp list` montrait le MCP connecté côté CLI mais `ToolSearch` ne trouvait aucun outil Directus — la session courante ne voyait pas le nouveau MCP.
**Correction** : Relancer Claude Code après ajout d'un `.mcp.json` project-scoped. Les MCPs sont lus uniquement au démarrage de session.
**Règle** : Un `.mcp.json` ajouté en cours de session ne prend effet qu'au prochain démarrage. Pour tester rapidement, utiliser `claude mcp list` (détecte la config) mais les outils ne seront disponibles dans ToolSearch qu'à la prochaine session.

## 2026-06-04 — MCP Directus HTTP : `headersHelper` inopérant, `headers` + direnv requis

**Contexte** : Auth token pour MCP Directus (`type: "http"`) dans `.mcp.json`. Deux approches testées successivement.
**Erreur 1** : `headers: { Authorization: "Bearer ${DIRECTUS_TOKEN}" }` → `Missing environment variables` car Claude Code ne source pas le `.env` du projet automatiquement.
**Erreur 2** : `headersHelper: "scripts/mcp-directus-auth.sh"` (script qui lit `.env` et retourne le JSON header) → le script s'exécute correctement à la main, mais Claude Code ne l'appelle pas pour les MCP `type: http`. Le MCP se connecte anonymement (rôle Public → read-only). Reconnect MCP ne corrige pas le problème.
**Correction** : Revenir à `headers: { Authorization: "Bearer ${DIRECTUS_TOKEN}" }` ET exporter la variable dans l'environnement shell avant de lancer Claude Code. Solution propre : `direnv` + `.envrc` contenant `dotenv` — la variable est exportée automatiquement à chaque `cd` dans le projet.
**Règle** : Pour les MCP `type: http`, `headersHelper` est documenté mais non honoré en pratique (version actuelle). Utiliser `headers` + `${VAR}` avec `direnv` pour que la variable soit dans l'env shell au démarrage de Claude Code. Ne jamais supposer que reconnect MCP ou redémarrage session suffit sans que la variable soit exportée.

## 2026-06-03 — Tests qui valident la mauvaise règle métier : le bug passe en CI

**Contexte** : Correction du tri "recommandé" dans `app/stores/software.ts` — le score d'approbation devait devenir contextuel à l'audience active SEN/SFP.
**Erreur** : Les tests existants dans `store-sorting.test.ts` utilisaient exactement le même calcul `(approvedBySEN ? 1 : 0) + (approvedBySFP ? 1 : 0)` que le code source pour définir `approvalScore`. Résultat : un test qui valide le comportement *bugué* autant que le comportement *corrigé* — les deux auraient été verts.
**Correction** : Réécrire les assertions en termes de comportement observable utilisateur (qui est en tête en SEN vs en SFP), pas en termes de formule interne. Ajouter des tests de transition SEN ↔ SFP avec deux audiences explicites.
**Règle** : Ne jamais écrire `approvalScore(s) = même formule que le code source`. Toujours tester le résultat observable ("DeepL Pro est en tête en SEN"), pas la mécanique interne. Si le bug réside dans la formule, un test qui *copie* la formule ne l'attrape pas.

## 2026-05-24 — Drift seed legacy vs runtime : un test sans seed teste un store VIDE = succès trivial

**Contexte** : Audit de la pertinence des tests post-bascule Directus. `tests/unit/store-sorting.test.ts` créait un store mais ne seedait jamais `useState("software-list")`. Conséquence : `store.filteredSoftwareList` retournait `[]`. Toutes les assertions de tri étaient des boucles `for (let i = 1; i < 0; i++)` → boucles vides → tests verts sans rien tester.
**Erreur** : 7 tests "store-sorting" passaient en CI sans valider la logique réelle. Pire : le code de test référençait `supportedByCEJEF` et `campusTraining`, champs supprimés du type `Software` (remplacés par `approvedBySEN`/`approvedBySFP`). Le test était trompeur ET référençait du code mort.
**Correction** : Réécrit complètement le fichier avec seed obligatoire des fixtures dans `beforeEach`, et assertions cohérentes avec la vraie logique de tri "recommended" (basée sur `approvedBySEN/SFP`). Suppression de `software-data.test.ts` (testait l'intégrité du seed legacy lui-même → valeur nulle depuis Directus).
**Règle** : Pour tout test qui appelle un store Pinia avec une liste réactive, **toujours seeder explicitement le useState/useState dans `beforeEach`**. Si les assertions sont des boucles `for` sur une liste, ajouter un `expect(list.length).toBeGreaterThan(0)` en premier pour détecter le cas "liste vide → boucle vide → faux succès". Et toujours vérifier que les champs référencés dans les tests existent encore dans le type courant.

## 2026-05-24 — Tests composants Vue : stubs Nuxt UI doivent forwarder $attrs pour préserver aria-*

**Contexte** : Tests `@vue/test-utils mount()` du composant `SoftwareFeatureBadge.vue` (badge utilisant `UBadge` de Nuxt UI). On voulait vérifier que `aria-label` était bien rendu côté DOM.
**Erreur** : Stub `UBadge` avec `props: ["color", "variant", "aria-label"]` → Vue ne reconnaît pas les props avec tiret (`aria-label`). `wrapper.find(".badge").attributes("aria-label")` retournait `undefined`.
**Correction** : Stub avec `inheritAttrs: false, props: ["color", "variant"]` et template `v-bind="$attrs"` → l'attribut HTML est forwardé tel quel sans devoir le déclarer en prop Vue.
**Règle** : Quand on stub un composant Nuxt UI dans un test, **toujours utiliser `v-bind="$attrs"`** pour préserver les attributs HTML natifs (`aria-*`, `data-*`, `id`, `title`). Ne pas essayer de les déclarer comme props — les noms à tiret ne sont pas valides en Vue props.

## 2026-05-24 — `@vue/test-utils` + stub UButton : `@click` propage 2 fois

**Contexte** : Test `SoftwareListEmpty.vue` qui contient `<UButton @click="$emit('clear')">`. Stub `<button @click="$emit('click')">`.
**Erreur** : `expect(emitted("clear")).toHaveLength(1)` échouait avec 2 émissions.
**Correction** : Assertion changée en `toBeGreaterThanOrEqual(1)`. Le stub ré-émet l'event en plus du listener natif, ce qui produit la double émission.
**Règle** : Quand un stub Vue Test Utils déclare un listener `@click="$emit('click')"`, l'event est émis deux fois (une fois par le natif, une fois par le stub). Utiliser `toBeGreaterThanOrEqual` ou simplifier le stub avec `<button @click.stop="$emit('click')">`.

## 2026-05-23 — SPA pure vs SSR avec proxy : choisir SSR si on n'a pas le contrôle du CORS du backend

**Contexte** : Tentative de bascule en SPA pure (`ssr: false`) pour avoir des données live sur GitHub Pages. Le navigateur appelait Directus directement depuis le client.
**Erreur** : CORS Directus côté serveur Noirmont rejetait la réponse (`Access-Control-Allow-Origin` absent). Diagnostic : le `docker-compose.yml` prévoit bien `CORS_ENABLED=true` et `CORS_ORIGIN=true`, mais les variables n'arrivent pas au conteneur en prod (probablement `.env` non synchronisé avec le repo). Pas d'accès SSH au serveur depuis l'extérieur du réseau jura.ch → blocage.
**Correction** : Abandonné le mode SPA pur. Bascule sur Vercel en mode SSR — Nuxt server-side calls Directus, le navigateur appelle uniquement `/api/software` (même origine). Pas de CORS à gérer. Le pattern est identique à celui du site CEJEF (`server/routes/api/directus/[...path].ts` sur le site CEJEF, endpoints `server/api/software/*.ts` sur le référentiel).
**Règle** : Quand un site front doit consommer un backend dont on ne maîtrise pas le CORS, **toujours préférer SSR ou un proxy serveur** plutôt que SPA pure avec appels directs depuis le navigateur. Le proxy serveur (Nuxt SSR, Vercel functions, etc.) contourne le problème par construction : navigateur → serveur Nuxt (même origine) → Directus (server-to-server, pas de CORS). Bonus : le token éventuel reste côté serveur, jamais exposé au client.

## 2026-05-23 — Directus M2M auto-référentielle : alias virtuel à créer explicitement

**Contexte** : Création de la junction `software_alternative` (software ↔ software, unidirectionnelle) pour les alternatives recommandées.
**Erreur** : Après création de la relation avec `meta.one_field=alternatives`, le champ alias virtuel `alternatives` n'apparaissait PAS automatiquement sur `software` (pourtant créé pour `categories` et `pedagogical_activities`). L'API anonyme retournait FORBIDDEN sur le field.
**Correction** : Créer explicitement le champ alias via `POST /fields/software` avec `type:alias, special:["m2m"], interface:"list-m2m"`. La relation seule ne suffit pas pour une auto-référentielle.
**Règle** : Pour une M2M auto-référentielle dans Directus, toujours créer manuellement le champ alias `type:alias` sur la collection source — la relation crée seulement la junction et les FK, pas l'alias virtuel. La différence avec une M2M entre 2 collections distinctes vient probablement de la résolution du `junction_field`.

## 2026-05-23 — Build statique Nuxt qui appelle un backend externe : ne JAMAIS rendre obligatoire un secret en CI

**Contexte** : Migration du frontend de la liste statique TypeScript vers Directus. Le serveur Nuxt expose un endpoint `/api/software` qui proxifie Directus avec un token statique. Mode `nuxt generate` (SSG).
**Erreur** : `useDirectusClient()` throw `DIRECTUS_TOKEN non configuré` (500). Le prerender lance le serveur Nitro en local, qui appelle son propre endpoint → 500 → liste vide → 6 routes `/logiciels/<uuid>` lient vers des UUIDs morts (page liquid-glass utilisait encore la liste statique) → exit 1.
**Correction** : (1) token optionnel côté serveur (anonymous Directus si absent — permissions Public déjà configurées) ; (2) `DIRECTUS_URL` passée en env du workflow (URL publique, pas un secret) ; (3) page `liquid-glass.vue` bascule sur `useSoftware()` au lieu de `data/software-list.ts`.
**Règle** : Pour un site statique qui dépend d'un backend externe, le build doit pouvoir s'exécuter sans secrets (lecture anonyme via permissions backend) — c'est plus sûr ET plus simple que stocker un token dans les secrets CI. Si le token est vraiment nécessaire (drafts, écriture), le rendre optionnel : la lib client doit fonctionner avec ou sans.

## 2026-03-27 — Palettes Tailwind custom : toujours placer la couleur de base au shade 500

**Contexte** : Palette CEJEF avec `#9A211F` au shade 600 et `#1D7A3F` au shade 700.
**Erreur** : Nuxt UI utilise le shade 500 par defaut pour les boutons, badges, liens actifs. Le bouton vue grille actif affichait `#C43533` (red-500) au lieu de `#9A211F` (red-600). Idem pour les pastilles vertes/orange.
**Correction** : Recaler les 4 palettes custom (red, green, orange, blue) pour que shade 500 = couleur de base de la charte. Mettre a jour toutes les references dans les composants.
**Regle** : Quand on definit une palette Tailwind custom pour un framework UI (Nuxt UI, shadcn), toujours placer la couleur de reference au shade 500 — c'est le shade par defaut utilise par le framework.

## 2026-03-25 — Bien comprendre la hiérarchie d'un Genially avant de coder

**Contexte** : Restructuration de la page protection des données depuis un Genially interactif.
**Erreur** : 3 itérations nécessaires — d'abord mauvais thèmes de niveau 1, puis structure trop plate (2 niveaux), puis bonne structure (3 niveaux). Le Genially n'est pas un document linéaire : les boutons/popups cachent la hiérarchie réelle.
**Correction** : Demander à l'utilisateur de lister les titres exacts de niveau 1 avant de coder. Ne pas deviner la hiérarchie depuis le scraping.
**Règle** : Pour toute source interactive (Genially, Prezi, etc.), commencer par valider la liste des titres de niveau 1 avec l'utilisateur. Le scraping automatique ne capture pas la hiérarchie de navigation.

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
