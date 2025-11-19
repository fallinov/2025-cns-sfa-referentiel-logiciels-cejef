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
- **Nuxt UI v4.1.0** (Tailwind CSS-based component library)
- **Static Site Generation (SSG)** - no backend required

**CRITICAL: Nuxt UI Component Usage**

**⚠️ MANDATORY: Always check documentation FIRST before implementing**
- **BEFORE** writing any code using a Nuxt UI component, consult https://ui.nuxt.com
- **BEFORE** assuming a component API, verify it in the official documentation
- **NEVER** use deprecated or non-existent components from older versions
- **NEVER** reinvent the wheel - Nuxt UI provides most common UI patterns out of the box
- When in doubt about a component's API (props, slots, events), **STOP and check the documentation**

**Development Best Practices:**
1. **Use Nuxt UI composables and utilities FIRST** before writing custom JavaScript
   - `defineShortcuts` for keyboard shortcuts
   - `useTemplateRef` for DOM references
   - `useColorMode` for dark/light mode
   - Built-in form validation, modals, overlays, etc.

2. **Avoid custom CSS when Nuxt UI provides the feature**
   - Use `:ui` prop to customize components instead of custom CSS classes
   - Use Tailwind utility classes for spacing, colors, typography
   - Only write custom CSS for truly unique design requirements

3. **Leverage existing Nuxt UI patterns**
   - Check documentation for examples before implementing
   - Use provided slots (#header, #body, #content, #footer) correctly
   - Follow established patterns (e.g., `v-model` vs `:open` with `@update:open`)

**Component-Specific Guidelines:**

- **UModal** with `#content` slot:
  - ❌ WRONG: `v-model="isOpen"` (does NOT work with #content slot without trigger)
  - ✅ CORRECT: `:open="isOpen"` + `@update:open="value => isOpen = value"`
  - See `app/components/SoftwareCommandPalette.vue` for working example

- **USlideover vs UDrawer** - Both exist in v4.1.0, choose based on use case:
  - **USlideover**: Dialog overlay panels (forms, details, editing) - Desktop/Modal focused
  - **UDrawer**: Mobile-optimized panels with gestures and handles - Touch/Mobile focused

- **Common component mistakes to avoid:**
  - Using `UDivider` (doesn't exist, use `USeparator` instead)
  - Using wrong prop names - check documentation for each component
  - Using wrong slot names - USlideover uses `#body`, UDrawer uses `#content`

**Documentation Resources:**
- Main documentation: https://ui.nuxt.com
- Composables: https://ui.nuxt.com/docs/composables
- Components: https://ui.nuxt.com/docs/components
- When implementing a feature, search the docs for similar examples FIRST

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
- **Slideover/detail view**: Edit `app/components/SoftwareDetail.vue` (uses `USlideover` with `v-model:open`, `side="right"`)
- **LGPD icons**: Edit `app/components/LgpdIcons.vue`
- **Homepage layout**: Edit `app/pages/index.vue`
- **Global layout**: Edit `app/app.vue`

All components use Nuxt UI components (prefixed with `U`) which are Tailwind CSS-based.

**Important Nuxt UI v4.1.0 component notes**:
- **ALWAYS** check https://ui.nuxt.com before using any component
- Use `USeparator` for dividers (not `UDivider` which doesn't exist in v4.1.0)
- **USlideover vs UDrawer** - Both exist in v4.1.0, choose wisely:
  - **USlideover**: For dialog overlays, forms, details - Built on Reka UI Dialog
  - **UDrawer**: For mobile menus, touch gestures, swipe panels
- `USlideover` API (used in this project):
  - Uses `v-model:open` binding (not just `v-model`)
  - Uses `side` prop with values: `'left' | 'right' | 'top' | 'bottom'`
  - Uses `#body` slot for the main content (also has `#header` and `#footer`)
  - Supports `title` and `description` props for automatic header
  - Width controlled via `:ui="{ content: 'w-full sm:max-w-lg' }"`
  - Automatically handles overlay, ESC key, and close button
- `UDrawer` API (alternative for mobile-first):
  - Uses `v-model:open` binding
  - Uses `direction` prop (not `side`)
  - Uses `#content` slot (not `#body`)
  - Has `handle` prop for drag handle
  - Best for bottom sheets and mobile navigation

### Code Style and Linting

**IMPORTANT: Always run `npm run lint` after modifying any file.**

This project follows strict coding standards enforced by ESLint. Configuration is in `eslint.config.mjs` and based on official Nuxt ESLint standards (@nuxt/eslint).

#### Coding Standards

**String Quotes:**
```typescript
// ✅ CORRECT - Use double quotes
const name = "Kahoot!"
const path = "app/components"

// ❌ WRONG - Don't use single quotes
const name = 'Kahoot!'
```

**Trailing Commas:**
```typescript
// ✅ CORRECT - No trailing commas
const array = [1, 2, 3]
const obj = { a: 1, b: 2 }

// ❌ WRONG - Trailing commas
const array = [1, 2, 3,]
const obj = { a: 1, b: 2, }
```

**Semicolons:**
```typescript
// ✅ CORRECT - No semicolons
const x = 10
const y = 20

// ❌ WRONG - Semicolons
const x = 10;
const y = 20;
```

**Brace Style (1tbs - One True Brace Style):**
```typescript
// ✅ CORRECT
if (condition) {
  doSomething()
} else {
  doSomethingElse()
}

// ❌ WRONG
if (condition)
{
  doSomething()
}
```

**Indentation (2 spaces):**
```typescript
// ✅ CORRECT
function example() {
  if (true) {
    return "ok"
  }
}

// ❌ WRONG (4 spaces)
function example() {
    if (true) {
        return "ok"
    }
}
```

**Object Spacing:**
```typescript
// ✅ CORRECT
const obj = { a: 1, b: 2 }
if (condition) { }

// ❌ WRONG
const obj = {a:1,b:2}
if(condition){}
```

**Vue Component Attribute Order:**
Attributes must follow this order:
1. `v-if`, `v-else-if`, `v-else`, `v-show` (conditionals)
2. `v-for` (list rendering)
3. `id`, `ref`, `key` (unique identifiers)
4. `v-model` (two-way binding)
5. Other attributes
6. Event handlers (`@click`, etc.)

**TypeScript:**
```typescript
// ✅ CORRECT - Prefer interfaces over types
interface Software {
  id: string
  name: string
}

// ✅ CORRECT - Use const for non-reassigned variables
const softwareList = []

// ❌ WRONG - Using 'var'
var softwareList = []
```

#### Workflow After File Modifications

**MANDATORY STEPS:**
1. Make your code changes
2. Run `npm run lint` to check for errors
3. Fix any linting errors (or run `npm run lint -- --fix` for auto-fix)
4. Run `npm run typecheck` to verify TypeScript types
5. Only then commit your changes

**Quick commands:**
```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Check TypeScript types
npm run typecheck

# Run both checks
npm run lint && npm run typecheck
```

See `.eslintrc.md` for complete ESLint rules documentation.

## Important Notes

- **No backend**: This is a 100% static site. All data is in TypeScript files.
- **Redeployment required**: Any data changes require regeneration and redeployment.
- **Base URL handling**: When working on routing or assets, be aware of the dynamic `baseURL` for GitHub Pages.
- **TypeScript strict mode**: All software objects must match the `Software` interface exactly.
- **Component library**: Use Nuxt UI v4.1.0 components (see https://ui.nuxt.com) instead of creating custom components when possible.
- **⚠️ CRITICAL - Component API Verification**: Before implementing or modifying any Nuxt UI component, ALWAYS verify its API in the official documentation at https://ui.nuxt.com. Component APIs may change between versions, and using outdated or incorrect APIs will cause runtime errors.
