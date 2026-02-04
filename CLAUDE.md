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

1. **ALWAYS study component documentation and variants BEFORE implementing**
   - Browse https://ui.nuxt.com/docs/components to find the RIGHT component for your need
   - Study ALL available variants (color, variant, size props) of the component
   - Review ALL examples provided in the documentation
   - Check component props, slots, events, and emits
   - Copy-paste working examples from docs and adapt them to your use case
   - **DO NOT** assume how a component works - verify in the documentation

2. **Use Nuxt UI composables and utilities FIRST** before writing custom JavaScript
   - `defineShortcuts` for keyboard shortcuts
   - `useTemplateRef` for DOM references
   - `useColorMode` for dark/light mode
   - Built-in form validation, modals, overlays, etc.
   - Check https://ui.nuxt.com/docs/composables for all available utilities

3. **Prioritize Nuxt UI and Tailwind built-in features for ALL customizations**
   - ✅ **FIRST**: Use `:ui` prop to customize Nuxt UI components (colors, sizes, spacing, variants)
   - ✅ **SECOND**: Use Tailwind utility classes (spacing, typography, responsive design)
   - ✅ **THIRD**: Use Tailwind configuration in `tailwind.config.ts` for theme customization
   - ❌ **ONLY IF NECESSARY**: Write custom CSS/JS for truly unique requirements
   - **Rule**: NEVER write custom code when Nuxt UI or Tailwind already provides the feature
   - **Wait for user approval**: Only enhance UX beyond basic implementation when explicitly requested

4. **Avoid custom CSS when Nuxt UI provides the feature**
   - Use `:ui` prop to customize components instead of custom CSS classes
   - Use Tailwind utility classes for spacing, colors, typography
   - Study the `:ui` customization options in component documentation
   - Only write custom CSS for truly unique design requirements

5. **Leverage existing Nuxt UI patterns**
   - Check documentation for examples before implementing
   - Use provided slots (#header, #body, #content, #footer) correctly
   - Follow established patterns (e.g., `v-model` vs `:open` with `@update:open`)
   - When multiple components can solve a problem, choose the most appropriate one

**Debugging and Problem-Solving Best Practices:**

1. **When a component doesn't work as expected:**
   - ❌ DON'T: Try multiple random solutions hoping one will work
   - ✅ DO: Stop, read the official documentation examples carefully
   - ✅ DO: Compare your code EXACTLY with working examples from docs
   - ✅ DO: Check if you're using the correct binding pattern (v-model vs :open/@update:open)

2. **Understanding component patterns before debugging:**
   - UModal with trigger in default slot: use `v-model`
   - UModal with #content slot but external trigger: use `:open` + `@update:open`
   - Always verify the slot structure matches documentation examples

3. **Avoid "console.log debugging" spiral:**
   - If console shows state changes but UI doesn't update → wrong binding pattern
   - Re-read documentation for correct usage pattern
   - Don't add more console.logs, fix the root cause

4. **When stuck after 2-3 failed attempts:**
   - STOP trying variations
   - Re-read the documentation from scratch
   - Look for similar examples in the docs
   - Check component GitHub issues if behavior is unexpected

**Development Efficiency:**

1. **Copy-paste working examples FIRST:**
   - Find the exact use case in documentation
   - Copy the ENTIRE example code
   - Adapt it to your needs AFTER verifying it works
   - Don't try to "understand and rewrite" before testing

2. **Avoid premature optimization:**
   - Get the basic feature working FIRST with documentation examples
   - Only then customize with :ui props and Tailwind classes
   - Don't try to make it perfect in the first iteration

**Component-Specific Guidelines:**

- **UModal - CRITICAL: Two Different Binding Patterns**

  **Pattern 1: Trigger inside default slot (recommended)**
  ```vue
  <UModal v-model="isOpen">
    <template #default>
      <UButton>Open Modal</UButton>
    </template>
    <template #content>
      <!-- Modal content -->
    </template>
  </UModal>
  ```

  **Pattern 2: External trigger (use :open instead of v-model)**
  ```vue
  <!-- External button -->
  <UButton @click="isOpen = true">Open</UButton>

  <!-- Modal elsewhere -->
  <UModal 
    :open="isOpen" 
    @update:open="value => isOpen = value"
  >
    <template #content>
      <!-- Modal content -->
    </template>
  </UModal>
  ```

  **⚠️ WRONG - This will NOT work:**
  ```vue
  <UButton @click="isOpen = true">Open</UButton>
  <UModal v-model="isOpen"> <!-- v-model doesn't work with external trigger -->
    <template #content>...</template>
  </UModal>
  ```

  **Working example in this project:** `app/components/SoftwareCommandPalette.vue`
  - Shows correct :open/@update:open pattern with external trigger
  - Demonstrates defineShortcuts usage for keyboard shortcuts
  - UCommandPalette within UModal #content slot

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

**Working Examples in This Project:**
- **SoftwareCommandPalette.vue**: UModal with external trigger and keyboard shortcut
  - Correct :open/@update:open pattern (not v-model)
  - defineShortcuts composable for ⌘K keyboard shortcut
  - UCommandPalette within UModal #content slot
  - Reference this component when implementing similar patterns

### Nuxt UI Custom Variants

This project defines custom variants for Nuxt UI components to support the **Liquid Glass** design aesthetic.

**Configuration Location:** `app/app.config.ts`

#### Liquid Glass Badge Variant

A custom variant for `UBadge` that applies the signature liquid glass effect:

```typescript
// app/app.config.ts
export default defineAppConfig({
  ui: {
    badge: {
      variants: {
        liquid: {
          root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
          label: "text-sm font-bold uppercase tracking-widest text-white"
        }
      }
    }
  }
})
```

**Usage Example:**

```vue
<!-- Define the liquid badge UI configuration -->
<script setup>
const liquidBadgeUi = {
  root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
  label: "text-sm font-bold uppercase tracking-widest text-white"
}
</script>

<template>
  <!-- Use via :ui prop -->
  <UBadge :ui="liquidBadgeUi">
    <template #leading>
      <UIcon name="i-heroicons-wallet" class="w-4 h-4 text-white" />
    </template>
    Premium
  </UBadge>
</template>
```

**Note:** We use the `:ui` prop directly instead of `variant="liquid"` to avoid TypeScript type conflicts with Nuxt UI's predefined variants.

**Where it's used:**
- **CardLiquidGlass.vue**: All badges (header certification badge + footer metadata badges)
- Provides consistent liquid glass styling across all badge instances
- Can be used anywhere in the app where liquid glass aesthetic is needed

**Customization via :ui prop:**

The `liquidBadgeUi` constant in `CardLiquidGlass.vue` provides component-level customization:

```typescript
const liquidBadgeUi = {
  root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
  label: "text-sm font-bold uppercase tracking-widest text-white"
}
```

**Important:** UBadge uses `root` for the container element and `label` for text styling. All visual styles (background, border, padding, etc.) must be on `root`.

**Future Variants:**

When creating new custom variants for Nuxt UI components:
1. Add the variant configuration to `app/app.config.ts` under `ui.{componentName}.variants`
2. Document the variant in this section
3. Provide usage examples
4. Reference where it's currently used in the codebase

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

### LGPD Classification System (GCN 2026)

#### Classification Levels

| Niveau | Couleur | Signification | Critères |
|--------|---------|---------------|----------|
| **1** | 🟢 Vert | Usage autorisé | CH/UE hébergement + conforme RGPD + pas de tracking invasif |
| **2** | 🟠 Orange | Usage avec précautions | Entreprise US avec certification DPF OU analytics tiers |
| **3** | 🔴 Rouge | Usage interdit | Non conforme RGPD OU hébergement pays non adéquat (Chine, etc.) |

#### Critères de classification détaillés

**Niveau 1 (Vert) - Critères cumulatifs :**
- Siège social en Suisse, UE, ou pays adéquat (Canada, UK, Corée du Sud, Japon)
- Hébergement des données en Suisse ou UE
- Politique de confidentialité conforme RGPD
- Pas de collecte de données invasive ni tracking publicitaire
- OU contrat DPA institutionnel CEJEF (ex: Microsoft 365)

**Niveau 2 (Orange) - Un des critères suivants :**
- Entreprise US avec certification EU-US Data Privacy Framework (DPF)
- Hébergement sur infrastructure US (AWS, Google Cloud) même pour entreprise UE → Cloud Act
- Utilisation d'analytics tiers (Google Analytics, etc.)
- Sous-traitants US dans la chaîne de traitement
- Certifications : SOC 2, ISO 27001, COPPA, FERPA

**Niveau 3 (Rouge) - Un des critères suivants :**
- Hébergement dans pays non adéquat (Chine, Russie, etc.)
- Entreprise chinoise (ByteDance, Tencent, etc.)
- Non-conformité RGPD avérée ou amendes RGPD
- Politique de confidentialité insuffisante ou absente
- Collecte de données extensive sans consentement

#### Structure des données (`types/software.ts`)

```typescript
interface Software {
  // Classification LGPD
  lgpd: {
    hosting: 1 | 2 | 3      // Localisation hébergement
    rgpd: 1 | 2 | 3         // Conformité RGPD
    dataCollection: 1 | 2 | 3  // Niveau de collecte
  }
  certificationLevel: 1 | 2 | 3 | null  // Niveau global (max des 3)
  dataLocation: DataLocation  // Localisation précise des données
  personalData: boolean       // Traite des données personnelles

  // Validation LGPD
  toValidate?: boolean        // Nécessite révision humaine
  remarque?: string           // Justification de la classification
}
```

#### Localisations de données (`DataLocation`)

```typescript
type DataLocation =
  // Pays adéquats (niveau 1 possible)
  | "Suisse" | "France" | "Allemagne" | "Union Européenne"
  | "Royaume-Uni" | "Canada" | "Corée du Sud" | "Local"

  // Avec infrastructure US (niveau 2)
  | "États-Unis" | "États-Unis (option UE)"
  | "Union Européenne (AWS)" | "Australie/États-Unis"

  // Pays non adéquats (niveau 3)
  | "Chine" | "Inconnu" | "Hors UE"
```

#### Scripts d'automatisation (`scripts/`)

**`scripts/classify-lgpd.py`** - Analyse et classification automatique
```bash
python3 scripts/classify-lgpd.py
# Génère: scripts/lgpd-classifications.json
```

**`scripts/apply-lgpd-changes.py`** - Applique les classifications au fichier TS
```bash
python3 scripts/apply-lgpd-changes.py
# Modifie: app/data/software-list.ts
```

**`scripts/apply-remaining-lgpd.py`** - Classifications complémentaires (navigateurs, IA, dev tools)

#### Workflow de classification d'un nouveau logiciel

1. **Recherche** - Identifier le siège social, politique de confidentialité, certifications
2. **Critères à vérifier** :
   - Localisation siège social
   - Localisation hébergement (AWS? Google Cloud? Azure?)
   - Certification DPF (vérifier sur https://www.dataprivacyframework.gov/)
   - Certifications sécurité (SOC 2, ISO 27001)
   - Conformité COPPA/FERPA (si éducatif)
   - Historique amendes RGPD
3. **Classification** - Appliquer les critères ci-dessus
4. **Documentation** - Ajouter `remarque` avec justification

#### Cas particuliers

**Microsoft 365 (Word, Excel, Teams, etc.) → Niveau 1**
- CEJEF dispose d'un contrat DPA institutionnel
- Hébergement UE garanti contractuellement
- Sans ce contrat, ces produits seraient niveau 2

**Entreprises UE utilisant AWS/Google Cloud → Niveau 2**
- Ex: Babbel (Allemagne) utilise AWS → Cloud Act applicable
- L'infrastructure US soumet les données au droit américain

**Navigateurs → Variable**
- Brave → Niveau 1 (pas de stockage historique, bloque trackers)
- Chrome, Firefox, Edge → Niveau 2 (télémétrie vers US)

**Outils IA génératifs → Niveau 2 minimum**
- ChatGPT, Claude, Gemini → Niveau 2 (données traitées US)
- Mistral Le Chat → Niveau 1 (entreprise française, hébergement UE)

#### Logiciels à valider manuellement (`toValidate: true`)

Certains logiciels nécessitent une vérification humaine :
- Service discontinué ou en transition
- Acquisition récente (changement de politique)
- Information insuffisante disponible

```bash
# Lister les logiciels à valider
grep -B 20 "toValidate: true" app/data/software-list.ts | grep "name:"
```

### Modifying LGPD Classification

Pour modifier une classification, mettre à jour dans `app/data/software-list.ts` :
1. L'objet `lgpd` (hosting, rgpd, dataCollection)
2. Le `certificationLevel` (doit être le max des 3 valeurs lgpd)
3. La `dataLocation` (localisation précise)
4. La `remarque` (justification obligatoire)
5. Optionnel: `toValidate: true` si révision nécessaire

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
