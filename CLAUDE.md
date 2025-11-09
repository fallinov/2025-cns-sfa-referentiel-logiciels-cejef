# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Référentiel Logiciels CEJEF** is a static educational software catalog for CEJEF (Centre Jurassien d'Enseignement et de Formation) that displays software tools with LGPD (data protection law) classifications.

## Key Commands

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production (SSR)
npm run generate         # Generate static site
npm run preview          # Preview generated static site
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
- **Nuxt UI** (Tailwind CSS-based component library)
- **Static Site Generation (SSG)** - no backend required

### Data Architecture

**Static data source**: `app/data/software-list.ts` exports a hardcoded array of software objects. There is no database or CMS.

**Type system**: `app/types/software.ts` defines strict TypeScript interfaces:
- `Software` - main software object with LGPD classification
- `LgpdClassification` - 4 criteria: hosting location, personal data usage, RGPD compliance, data collection level
- Various union types for constrained values (e.g., `HostingLocation`, `Platform`)

**State management**: `app/composables/useSoftware.ts` provides a shared reactive state using Nuxt's `useState`:
- Manages selected software and slideover open/close state
- Provides methods: `getSoftwareList()`, `getSoftwareById(id)`, `openDetail()`, `closeDetail()`
- No Pinia or Vuex - simple composable pattern
- **Important**: Do NOT use `readonly()` on state returned from composables when they need to be bound to `v-model` directives

### Component Structure

```
app.vue (root layout with UHeader/UMain/UFooter)
└── pages/index.vue (homepage)
    ├── UPageHero (title banner)
    ├── UPageSection
    │   └── SoftwareCard.vue (one per software)
    │       └── LgpdIcons.vue (LGPD indicators)
    ├── SoftwareDetail.vue (slideover for details)
    │   └── LgpdIcons.vue
    └── UPageCTA (LGPD info section)
```

**Key components**:
- `SoftwareCard.vue` - displays software in a grid with LGPD icons
- `SoftwareDetail.vue` - slideover (side panel) with full software details using USlideover
- `LgpdIcons.vue` - reusable LGPD classification indicators (receives `lgpd` prop and `showLabels` prop for compact/detailed display)

### Deployment Strategy

**Two environments**:
1. **Staging**: GitHub Pages at `https://fallinov.github.io/2025-cns-sfa-referentiel-logiciels-cejef/`
   - Auto-deploys on every push to `main`
   - Uses `baseURL: /2025-cns-sfa-referentiel-logiciels-cejef/`
   - Workflow: `.github/workflows/deploy-github-pages.yml`

2. **Production**: SFTP server
   - Manual deployment via Git tags (e.g., `v1.0.0`)
   - Uses `baseURL: /` (root)
   - Workflow: `.github/workflows/deploy-production.yml`
   - Requires secrets: `SFTP_SERVER`, `SFTP_USERNAME`, `SFTP_PASSWORD`, `SFTP_PORT`, `SFTP_SERVER_DIR`

**Configuration**: `nuxt.config.ts` uses `process.env.NUXT_APP_BASE_URL` to handle different base URLs for staging vs production.

## Common Development Tasks

### Adding a New Software

1. Edit `app/data/software-list.ts`
2. Add new object matching `Software` interface with all required fields:
   - Ensure `id` is unique
   - Include complete `lgpd` classification object
   - Set `supportedBy: 'CEJEF' | null`
   - Provide all required metadata (platforms, cost, category, etc.)
3. Commit with semantic message: `git commit -m "feat: add [software name]"`
4. Push to deploy to staging automatically
5. Test on staging, then tag for production: `git tag v1.x.0 && git push origin v1.x.0`

### Modifying LGPD Classification

The LGPD system evaluates software on 4 criteria (all defined in `app/types/software.ts`):

1. **hosting**: `'CH' | 'UE' | 'Hors-UE' | 'CEJEF' | 'Chine'`
2. **personalData**: `'Autorisées' | 'Anonymisé' | 'Interdites'`
3. **rgpd**: `'Conforme' | 'Partiel' | 'Non conforme'`
4. **dataCollection**: `'Limitée' | 'Modérée' | 'Extensive'`

To modify a classification, update the `lgpd` object in `app/data/software-list.ts`.

### Modifying UI Components

- **Card appearance**: Edit `app/components/SoftwareCard.vue`
- **Slideover/detail view**: Edit `app/components/SoftwareDetail.vue` (uses `USlideover` with `v-model:open` and `side="right"`)
- **LGPD icons**: Edit `app/components/LgpdIcons.vue`
- **Homepage layout**: Edit `app/pages/index.vue`
- **Global layout**: Edit `app/app.vue`

All components use Nuxt UI components (prefixed with `U`) which are Tailwind CSS-based.

**Important Nuxt UI component notes**:
- Use `USlideover` for side panels (not `UDrawer` which doesn't exist)
- Use `USeparator` for dividers (not `UDivider` which doesn't exist)
- `USlideover` uses `v-model:open` (not `v-model`) and `side` prop (not `direction`)

### ESLint Configuration

Project uses specific stylistic rules (in `nuxt.config.ts`):
- `commaDangle: 'never'` - no trailing commas
- `braceStyle: '1tbs'` - One True Brace Style

Run `npm run lint` before committing.

## Important Notes

- **No backend**: This is a 100% static site. All data is in TypeScript files.
- **Redeployment required**: Any data changes require regeneration and redeployment.
- **Base URL handling**: When working on routing or assets, be aware of the dynamic `baseURL` for GitHub Pages.
- **TypeScript strict mode**: All software objects must match the `Software` interface exactly.
- **Component library**: Use Nuxt UI components (see https://ui.nuxt.com) instead of creating custom components when possible.
