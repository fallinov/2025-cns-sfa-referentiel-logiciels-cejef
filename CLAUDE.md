# Référentiel Logiciels SEN / SFP

> Projet lié au CNS : voir `~/CNS/CLAUDE.md`

Catalogue de logiciels éducatifs du Canton du Jura (SEN + SFP) avec classifications LPD (Loi sur la protection des données). Données stockées dans Directus 11 (Noirmont), frontend Nuxt 4 SSR déployé sur Vercel (https://logiciels.vercel.app).

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
npm test                 # Vitest unit tests (208 tests, 17 fichiers)
npm run test:watch       # Vitest watch mode
npm run test:coverage    # Vitest + v8 coverage (seuils 70/55/70/70)
npm run test:e2e         # Playwright e2e (desktop + mobile)
npm run test:e2e:desktop # Playwright desktop only
npm run test:e2e:mobile  # Playwright mobile only
```

**CI** : `.github/workflows/test.yml` lance `lint + typecheck + test:coverage` sur PR/main. Job Playwright en parallèle (`continue-on-error: true`). Artifacts coverage-report + playwright-report rétention 7j.

### Code Quality
```bash
npm run lint             # Run ESLint
npm run typecheck        # Check TypeScript types
```

### Deployment
```bash
# Vercel (SSR) - automatic on push to main
git push origin main
# → https://logiciels.vercel.app

# Production future : Infomaniak Cloud Managé (à configurer)
# GitHub Pages désactivé (workflow .disabled)
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

**Mode SSR sur Vercel** : depuis v0.21+, le site n'est plus statique. Chaque visite déclenche un render serveur qui appelle Directus en live. Plus de re-build manuel — les modifications côté Directus sont visibles dès le refresh suivant.

**Pipeline runtime (SSR Vercel)** :
1. Visite navigateur → Vercel déclenche le SSR Nuxt
2. Plugin `app/plugins/software-data.ts` appelle `/api/software` (endpoint local)
3. Endpoint serveur `server/api/software/index.get.ts` → Directus via SDK → mappe snake_case en camelCase
4. Liste écrite dans `useState("software-list")` → sérialisée dans le payload pour hydratation client
5. Page rendue côté serveur avec données fraîches, puis hydratée côté client

**Accès Directus** :
- **Tous environnements (Vercel SSR, dev local)** : anonyme via permissions du rôle Public (lecture `software` publiés + `category` + `pedagogical_activity` + `directus_files` + `software_alternative`)
- **Pas de token côté frontend** : ni en CI, ni en dev local, ni sur Vercel. Le frontend ne lit que les `status: published`.
- **Pas de problème CORS** : le navigateur ne contacte JAMAIS Directus directement. Il appelle les endpoints serveur Nuxt (`/api/software`, `/api/software/:id`), qui appellent Directus côté serveur (Vercel ou dev local).
- **`DIRECTUS_TOKEN` reste pris en charge** par `useDirectusClient()` (variable d'env optionnelle) — utile seulement si une feature future a besoin de lire les drafts. Ne pas l'ajouter au `.env` par défaut.

**Types** : `types/software.ts` (`Software`, `LgpdClassification`, `CertificationLevel`, `DataLocation`).
**State** : Pinia stores (`software.ts`, `audience.ts`) + composables (`useSoftware`, `useDataProtection`).
**Legacy** : `app/data/software-list.ts` reste dans le repo mais n'est plus utilisé — ni par le runtime (Directus), ni par les tests (qui utilisent `tests/fixtures/software.ts`). Peut être supprimé dans une PR dédiée.

> Détails complets : `docs/data-architecture.md`

### Classification LGPD

3 niveaux : vert (autorisé) / orange (précautions) / rouge (interdit). Basé sur 3 critères : hosting, rgpd, dataCollection. Le `certificationLevel` = max des 3.

> Critères détaillés, cas particuliers, scripts, workflow : `docs/lgpd-classification.md`

### Testing

**Configuration** : `vitest.config.ts` (unit + coverage v8 + seuils) + `playwright.config.ts` (e2e). Couverture : 78 % lines / 64.35 % branches / 77.47 % functions.

**Fixtures de test** : `tests/fixtures/software.ts` (14 logiciels synthétiques) — utilisée par les tests qui ont besoin d'un dataset. **Le seed legacy `app/data/software-list.ts` n'est plus référencé par aucun test** (il a divergé du runtime Directus : 128 vs 104 logiciels, flags désynchronisés).

**Tests unitaires** (`tests/unit/`) — 17 fichiers, 208 tests :
- `store-filtering.test.ts` / `store-sorting.test.ts` — filtres + tri Pinia (sur fixtures)
- `search.test.ts` — recherche Fuse.js (fuzzy, accents)
- `certification.test.ts` — `getCertificationLevel` + helpers UI (config/colors/icon)
- `navigation.test.ts` — navigation précédent/suivant (sur fixtures)
- `data-protection.test.ts` — 6 thèmes Genially, structure 3 niveaux
- `alternatives.test.ts` — `useAlternatives` (filtre, tri, état vide)
- `use-software.test.ts` — `useSoftware` (Ref, getById)
- `use-data-protection.test.ts` — filtrage thèmes
- `use-search-suggestions.test.ts` — Fuse.js + debounce
- `use-typewriter.test.ts` — API composable
- `audience-store.test.ts` — Pinia + localStorage
- `level-colors.test.ts` — 7 fonctions × 4 niveaux
- `server-directus-utils.test.ts` — `mapSoftware` + `mapDataLocationLabel` (factorisés)
- `component-software-list-empty.test.ts` — Vue mount + emit
- `component-software-detail-alternatives.test.ts` — état vide vs liste
- `component-software-feature-badge.test.ts` — variantes tooltip/size

**Tests e2e** (`tests/e2e/`) — Playwright desktop (Chrome) + mobile (Pixel 7) :
- `catalog.spec.ts` — navigation, filtres, recherche, grille/liste
- `accessibility.spec.ts` — sémantique, ARIA, navigation clavier
- `alternatives.spec.ts` — section alternatives (vide + DeepL Std → DeepL Pro)
- `data-protection.spec.ts` — page LPD (titre, thèmes, recherche)
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

**Cible actuelle : Vercel (SSR)** — https://logiciels.vercel.app
- Mode SSR natif (`nuxt build`) — données live à chaque visite via `/api/software`
- Auto-deploy sur push to `main` (configuré dans le dashboard Vercel)
- Env vars Vercel : `DIRECTUS_URL=http://46.140.144.167:8055` (anonyme, pas de token nécessaire)
- Pas de `NUXT_APP_BASE_URL` sur Vercel → `baseURL: "/"`
- Pas de problème CORS : le navigateur appelle `/api/software` (même origine), le serveur Nuxt forward vers Directus

**Pourquoi Vercel et pas GitHub Pages** : la formation des saisisseurs CNS (séance 27.05) nécessite que les modifications Directus soient visibles immédiatement après refresh navigateur. GitHub Pages = mode statique, données figées au build (re-build manuel de ~2 min par modif). Vercel = SSR, données live.

**Workflow GitHub Pages désactivé** (`.github/workflows/deploy-github-pages.yml.disabled`) — gardé en référence si retour au mode statique nécessaire (cf branche `feat/spa-mode` pour le pattern SPA pure).

**Production future** : Infomaniak Cloud Managé (Suisse) — souveraineté CH. Bascule prévue après stabilisation Vercel.

**Config** : `nuxt.config.ts` utilise `process.env.DIRECTUS_URL` (server) et fallback `NUXT_PUBLIC_DIRECTUS_URL` (public). `directusToken` reste optionnel — non utilisé en prod.

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
- **Backend Directus** : source de vérité runtime. Le site est en SSR sur Vercel — pas de re-build nécessaire pour voir les changements.
- **Données live** : modifier un logiciel dans Directus → refresh navigateur → modification visible immédiatement.
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
