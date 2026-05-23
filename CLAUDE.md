# Référentiel Logiciels CEJEF

> Projet lié au CNS : voir `~/CNS/CLAUDE.md`

Catalogue de logiciels éducatifs pour le CEJEF avec classifications LGPD (protection des données). Données stockées dans Directus 11 (Noirmont), site statique prefetché depuis Directus au build.

<!-- Documentation détaillée dans docs/ -->

## Key Commands

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production (SSR)
npm run generate         # Generate static site
npm run preview          # Preview generated static site
```

### Tests
```bash
npm test                 # Run Vitest unit tests (100 tests)
npm run test:watch       # Run Vitest in watch mode
npm run test:e2e         # Run Playwright e2e tests (desktop + mobile)
npm run test:e2e:desktop # Playwright desktop only
npm run test:e2e:mobile  # Playwright mobile only
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run typecheck        # Check TypeScript types
```

### Deployment
```bash
# Staging (GitHub Pages) - automatic on push to main
git push origin main

# Production (SFTP) - manual via Git tags
git tag v1.0.0
git push origin v1.0.0
```

## Architecture

### Tech Stack
- **Nuxt 4** with Vue 3 (TypeScript)
- **Nuxt UI v4.1.0** (Tailwind CSS-based component library)
- **Directus 11** (CMS headless, source de vérité des logiciels)
- **@directus/sdk** (client REST + types)
- **Pinia** + `useState` (state global réactif)
- **Static Site Generation (SSG)** — données prefetchées depuis Directus au build
- **Vitest** + `@nuxt/test-utils` + `happy-dom` (tests unitaires)
- **Playwright** (tests e2e, projets desktop + mobile)
- **UXNote** (widget retours testeurs, staging uniquement)

> Conventions Nuxt UI, workflow Git, qualité du code : voir `~/.claude/CLAUDE.md` et `~/.claude/rules/`.
> Composants, variantes custom, palette couleurs : voir `docs/components.md`.

### Data Architecture

**Source de vérité (runtime)** : Directus 11 — `http://46.140.144.167:8055`. Collection `software` (status=published), relations M2M vers `category`, `pedagogical_activity`, et `software_alternative` (auto-référentielle, unidirectionnelle — alternatives recommandées).

**Pipeline build** :
1. `nuxt generate` lance le serveur Nitro en local
2. Plugin `app/plugins/software-data.ts` appelle `/api/software` au boot
3. Endpoint serveur `server/api/software/index.get.ts` → Directus via SDK → mappe snake_case en camelCase
4. Liste écrite dans `useState("software-list")` → sérialisée dans le payload
5. Pages prerendées avec les données figées dans le HTML/JSON statique

**Accès Directus** :
- **Tous environnements (CI, dev, prod)** : anonyme via permissions du rôle Public (lecture `software` publiés + `category` + `pedagogical_activity` + `directus_files` + `software_alternative`)
- **Pas de token côté frontend** : ni en CI, ni en dev local. Le frontend ne lit que les `status: published`, ce qui correspond exactement aux droits du rôle Public.
- **`DIRECTUS_TOKEN` reste pris en charge** par `useDirectusClient()` (variable d'env optionnelle) — utile seulement si une feature future a besoin de lire les drafts. Ne pas l'ajouter au `.env` par défaut.
- **Si jamais un token est utilisé** : il reste côté serveur Nuxt uniquement, jamais exposé au client.

**Types** : `types/software.ts` (`Software`, `LgpdClassification`, `CertificationLevel`, `DataLocation`).
**State** : Pinia stores (`software.ts`, `audience.ts`) + composables (`useSoftware`, `useDataProtection`).
**Legacy** : `app/data/software-list.ts` reste comme seed des tests unitaires (`tests/unit/`) — pas utilisé par le runtime.

> Détails complets : `docs/data-architecture.md`

### Classification LGPD

3 niveaux : vert (autorisé) / orange (précautions) / rouge (interdit). Basé sur 3 critères : hosting, rgpd, dataCollection. Le `certificationLevel` = max des 3.

> Critères détaillés, cas particuliers, scripts, workflow : `docs/lgpd-classification.md`

### Testing

**Configuration** : `vitest.config.ts` (unitaires) + `playwright.config.ts` (e2e)

**Tests unitaires** (`tests/unit/`) — 8 fichiers, 100 tests :
- `software-data.test.ts` — intégrité des données
- `store-filtering.test.ts` — filtres catalogue
- `store-sorting.test.ts` — tri
- `search.test.ts` — recherche Fuse.js (fuzzy, accents)
- `certification.test.ts` — calcul certification LGPD
- `similar-software.test.ts` — logiciels similaires
- `navigation.test.ts` — navigation précédent/suivant
- `data-protection.test.ts` — 6 thèmes Genially, structure 3 niveaux

**Tests e2e** (`tests/e2e/`) — Playwright, projets desktop (Chrome) + mobile (Pixel 7) :
- `catalog.spec.ts` — navigation, filtres, recherche, grille/liste
- `accessibility.spec.ts` — sémantique, ARIA, navigation clavier
- `uxnote.spec.ts` — toolbar UXNote, toast, traduction FR

### Feedback testeurs

**2 canaux** :
1. **Bouton "Donner un retour"** (footer) → GitHub Issue (`.github/ISSUE_TEMPLATE/feedback.yml`)
2. **UXNote** (annotation visuelle) → activé via `?uxnote=1` sur staging

**UXNote — architecture** :
- **Plugin** : `app/plugins/uxnote.client.ts` — activé uniquement sur GitHub Pages + `?uxnote=1`
- **Scripts** : self-hosted `public/static/uxnote.min.js` (traduit FR) + `uxnote-send.js` (pas de CDN)
- **Backend** : API PHP sur `kode.ch/uxnotes/` (repo privé `fallinov/uxnotes-server`)
- **Dashboard** : SPA Nuxt 4 sur `kode.ch/uxnotes/` (repo privé `fallinov/uxnotes-dashboard`)
- **Email** : SMTP `mail.infomaniak.com:587` via PHPMailer → `steve.fallet@divtec.ch`

**URLs** :
- Testeurs : `https://fallinov.github.io/2025-cns-sfa-referentiel-logiciels-cejef/?uxnote=1`
- Charger annotation : `?uxnote=1&load=ID` | Toutes : `?uxnote=1&load=all`
- Dashboard : `https://kode.ch/uxnotes/`

### Deployment Strategy

**Two environments** :
1. **Staging** : GitHub Pages (`https://fallinov.github.io/2025-cns-sfa-referentiel-logiciels-cejef/`)
   - Auto-deploy on push to `main`, `baseURL: /2025-cns-sfa-referentiel-logiciels-cejef/`
   - Workflow: `.github/workflows/deploy-github-pages.yml`
   - Env vars : `NUXT_APP_BASE_URL`, `DIRECTUS_URL` (URL publique, pas de secret)

2. **Production** : SFTP server
   - Manual via Git tags, `baseURL: /`
   - Workflow: `.github/workflows/deploy-production.yml`
   - Secrets: `SFTP_SERVER`, `SFTP_USERNAME`, `SFTP_PASSWORD`, `SFTP_PORT`, `SFTP_SERVER_DIR`

**Config** : `nuxt.config.ts` utilise `process.env.NUXT_APP_BASE_URL`. `runtimeConfig.directusUrl` est le seul nécessaire. `directusToken` est lu si défini mais n'est plus utilisé (accès anonyme par défaut).

## Common Development Tasks

### Adding a New Software

1. Connexion Directus (`http://46.140.144.167:8055`) avec un compte CNS
2. Collection `software` → "Créer un nouveau" → remplir les champs (statut, classification LGPD, catégories M2M…)
3. Publier (`status: published`) pour que l'item apparaisse en ligne
4. Relancer le workflow GitHub Pages (auto au prochain push, ou manuel via Actions)

> Procédure de saisie détaillée : `~/CNS/projets/referentiel/PROCEDURE-DIRECTUS-V1.md`
> Classification LGPD d'un nouveau logiciel : `docs/lgpd-classification.md`

### Code Style

**ESLint** : `@nuxt/eslint` — `npm run lint` après chaque modification, `npm run typecheck` avant chaque commit.

**Règles** : double quotes, pas de trailing commas, pas de semicolons, indentation 2 espaces, 1tbs brace style.

## Important Notes

- **Présentations HTML** : déplacées dans `~/WebstormProjects/SFA-PRESENTATION/referentiel-logiciels/`
- **Backend Directus** : source de vérité runtime, mais le site final est statique (données figées au build).
- **Redeployment required** : tout changement Directus nécessite un re-build GitHub Pages (auto au push, manuel via Actions).
- **Base URL** : attention au `baseURL` dynamique pour GitHub Pages (routing, assets).
- **TypeScript strict** : tous les objets doivent matcher l'interface `Software` exactement.
- **Nuxt UI v4.1.0** : toujours vérifier l'API sur https://ui.nuxt.com avant d'utiliser un composant.
- **npm overrides** : `crossws` forcé à `^0.4.1` via `overrides` dans `package.json` (conflit `h3`/`@nuxt/test-utils`).

## Documentation externalisée

| Fichier | Contenu |
|---------|---------|
| `docs/lgpd-classification.md` | Système de classification LGPD complet (critères, niveaux, cas particuliers, scripts, workflow) |
| `docs/components.md` | Composants, variantes custom (Liquid Glass), palette couleurs WCAG, arbre composants |
| `docs/data-architecture.md` | Types, sources de données, state management, protection des données |
| `docs/charte-graphique-sfp.md` | Charte graphique SFP |
