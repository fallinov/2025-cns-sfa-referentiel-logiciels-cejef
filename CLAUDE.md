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
npm test                 # Vitest unit tests (242 tests, 19 fichiers)
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
- **Vitest** + `@nuxt/test-utils` + `happy-dom` (tests unitaires)
- **Playwright** (tests e2e, projets desktop + mobile)

> Conventions Nuxt UI, workflow Git, qualité du code : voir `~/.claude/CLAUDE.md` et `~/.claude/rules/`.
> Composants, variantes custom, palette couleurs : voir `docs/components.md`.

### Data Architecture

**Source de vérité (runtime)** : Directus 11 — `http://46.140.144.167:8055`. Collection `software` (status=published), relations M2M vers `category`, `pedagogical_activity`, et `software_alternative` (auto-référentielle, unidirectionnelle — alternatives recommandées).

**Mode SSR sur Vercel** : le site est en SSR natif. Chaque visite déclenche un render serveur qui appelle Directus en live. Plus de re-build manuel — les modifications côté Directus sont visibles dès le refresh suivant.

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
- **`DIRECTUS_TOKEN`** : utilisé par le MCP Directus (`.mcp.json`, `headers.Authorization`) pour les pipelines de classification IA. Chargé automatiquement via `direnv` (`.envrc` → `dotenv`). Jamais exposé au frontend SSR. Requis uniquement pour `/sfa-classify-software`. Le token doit avoir les droits `create`+`update` sur `software`, `software_category`, `software_pedagogical_activity` — si `FORBIDDEN`, vérifier le rôle Directus associé au token.

**Types** : `types/software.ts` (`Software`, `LgpdClassification`, `CertificationLevel`, `DataLocation`).
**State** : Pinia stores (`software.ts`, `audience.ts`) + composables (`useSoftware`, `useDataProtection`).
**Legacy** : `app/data/software-list.ts` n'est plus utilisé (ni runtime, ni tests). Peut être supprimé dans une PR dédiée.

> Détails complets : `docs/data-architecture.md`

### Classification LGPD

3 niveaux : vert (autorisé) / orange (précautions) / rouge (interdit). Basé sur 3 critères : hosting, rgpd, dataCollection. Le `certificationLevel` = max des 3.

> Critères détaillés, cas particuliers, scripts, workflow : `docs/lgpd-classification.md`

### Testing

**Configuration** : `vitest.config.ts` (unit + coverage v8 + seuils) + `playwright.config.ts` (e2e). Couverture : 78 % lines / 64.35 % branches / 77.47 % functions.

**Fixtures de test** : `tests/fixtures/software.ts` (14 logiciels synthétiques) — utilisée par les tests qui ont besoin d'un dataset. **Le seed legacy `app/data/software-list.ts` n'est plus référencé par aucun test** (il a divergé du runtime Directus : 128 vs 104 logiciels, flags désynchronisés).

**Tests unitaires** (`tests/unit/`) — 19 fichiers, 242 tests : stores Pinia (filtres, tri), Fuse.js, certification, navigation, mapper LPD, alternatives, composables, composants Vue.

**Tests e2e** (`tests/e2e/`) — Playwright desktop (Chrome) + mobile (Pixel 7) : catalog, accessibility, alternatives, data-protection.

### Feedback utilisateurs

**Bouton "Donner un retour"** (footer) → GitHub Issue (`.github/ISSUE_TEMPLATE/feedback.yml`).
Les empty states (autocomplete, liste alternatives, catalogue vide) proposent aussi un mailto pré-rempli vers `steve.fallet@jura.ch` pour suggestion de logiciels.

### Deployment Strategy

**Cible actuelle : Vercel (SSR)** — https://logiciels.vercel.app
- Mode SSR natif (`nuxt build`) — données live à chaque visite via `/api/software`
- Auto-deploy sur push to `main` (configuré dans le dashboard Vercel)
- Env vars Vercel : `DIRECTUS_URL=http://46.140.144.167:8055` (anonyme, pas de token nécessaire)
- Pas de `NUXT_APP_BASE_URL` sur Vercel → `baseURL: "/"`
- Pas de problème CORS : le navigateur appelle `/api/software` (même origine), le serveur Nuxt forward vers Directus

**GitHub Pages désactivé** (workflow `.disabled`) — gardé en référence pour un éventuel retour au mode statique (cf branche `feat/spa-mode`).

**Production future** : Infomaniak Cloud Managé (Suisse) — souveraineté CH. Bascule prévue après stabilisation Vercel.

**Config** : `nuxt.config.ts` utilise `process.env.DIRECTUS_URL` (server) et fallback `NUXT_PUBLIC_DIRECTUS_URL` (public). `directusToken` reste optionnel — non utilisé en prod.

## Common Development Tasks

### Adding a New Software

1. Connexion Directus (`http://46.140.144.167:8055`) avec un compte CNS
2. Collection `software` → "Créer un nouveau" → remplir les champs (statut, classification LGPD, catégories M2M…)
3. Publier (`status: published`) pour que l'item apparaisse en ligne
4. Pas de rebuild nécessaire — le site SSR sert les données live depuis Directus au prochain refresh

> Procédure de saisie détaillée : `~/CNS/projets/referentiel/PROCEDURE-DIRECTUS-V1.md`
> Classification LGPD (assistée par IA) : skill `/sfa-classify-software <url>` — nécessite `DIRECTUS_TOKEN` dans `.env` + MCP Directus (`.mcp.json`)
> Classification LGPD manuelle : `docs/lgpd-classification.md`

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
