# Référentiel Logiciels CEJEF

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Référentiel de logiciels pédagogiques pour le CEJEF avec classification LGPD (Loi sur la protection des données)

## 📋 Table des matières

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Classification LGPD](#-classification-lgpd)
- [Technologies](#-technologies)
- [Variants Nuxt UI personnalisés](#-variants-nuxt-ui-personnalisés)
- [Installation](#-installation)
- [Développement](#-développement)
- [Structure du projet](#-structure-du-projet)
- [Architecture](#-architecture)
- [Déploiement](#-déploiement)
- [Maintenance](#-maintenance)

---

## 🎯 Présentation

### Contexte

Le **Référentiel Logiciels CEJEF** est une application web destinée aux enseignants et formateurs du Centre Jurassien d'Enseignement et de Formation (CEJEF). Elle permet de consulter les logiciels pédagogiques disponibles avec leur niveau de conformité aux exigences de la Loi sur la Protection des Données (LGPD).

### Objectifs

- **Transparence** : Informer les enseignants sur les caractéristiques de protection des données de chaque outil
- **Aide à la décision** : Faciliter le choix d'outils conformes aux exigences légales
- **Centralisation** : Réunir tous les logiciels pédagogiques en un seul endroit
- **Accessibilité** : Interface moderne et responsive, consultable sur tous les appareils

### Public cible

- Enseignants du CEJEF
- Responsables pédagogiques
- Équipe informatique
- Direction de l'établissement

---

## ✨ Fonctionnalités

### Consultation des logiciels

- **Catalogue visuel** : Grille de cartes présentant les logiciels disponibles
- **Classification LGPD** : Indicateurs visuels (icônes et couleurs) pour chaque critère
- **Détails complets** : Modal avec informations détaillées sur chaque logiciel
- **Filtrage** : Recherche et filtrage par catégorie, discipline, niveau technique

### Interface utilisateur

- **Design Liquid Glass** : Effet verre liquide avec badges et cartes semi-transparents à backdrop-blur
- **Mode sombre/clair** : Bascule automatique selon les préférences système
- **Responsive** : Adapté aux ordinateurs, tablettes et smartphones
- **Performance** : Site statique généré pour un chargement ultra-rapide, maximise Nuxt UI et Tailwind CSS
- **Accessibilité** : Conforme aux standards WCAG 2.1 (tailles de texte minimales, contrastes, navigation clavier)

---

## 🔒 Classification LGPD (GCN 2026)

Chaque logiciel est classifié selon les critères GCN 2026 en **3 niveaux** :

### Niveaux de certification

| Niveau | Couleur | Description | Données élèves |
|--------|---------|-------------|----------------|
| **1** | 🟢 Vert | Usage autorisé | ✅ Autorisées |
| **2** | 🟠 Orange | Usage avec précautions | ⚠️ Avec précautions |
| **3** | 🔴 Rouge | Usage interdit | ❌ Interdites |

### Critères de classification

#### Niveau 1 (Vert) - Critères cumulatifs :
- Siège social en Suisse, UE, ou pays adéquat (Canada, UK, Corée du Sud, Japon)
- Hébergement des données en Suisse ou UE
- Politique de confidentialité conforme RGPD
- Pas de collecte de données invasive ni tracking publicitaire
- OU contrat DPA institutionnel CEJEF (ex: Microsoft 365)

#### Niveau 2 (Orange) - Un des critères suivants :
- Entreprise US avec certification EU-US Data Privacy Framework (DPF)
- Hébergement sur infrastructure US (AWS, Google Cloud) même pour entreprise UE → Cloud Act
- Utilisation d'analytics tiers (Google Analytics, etc.)
- Sous-traitants US dans la chaîne de traitement
- Certifications : SOC 2, ISO 27001, COPPA, FERPA

#### Niveau 3 (Rouge) - Un des critères suivants :
- Hébergement dans pays non adéquat (Chine, Russie, etc.)
- Entreprise chinoise (ByteDance, Tencent, etc.)
- Non-conformité RGPD avérée ou amendes RGPD
- Politique de confidentialité insuffisante ou absente
- Collecte de données extensive sans consentement

### Répartition actuelle (127 logiciels)

| Niveau | Nombre | Exemples |
|--------|--------|----------|
| 🟢 1 | 44 | Microsoft 365*, Infomaniak, Card2Brain, Threema |
| 🟠 2 | 63 | Canva, Kahoot, ChatGPT, Adobe, Padlet |
| 🔴 3 | 20 | CapCut, Duolingo, TikTok, Prezi |

*Microsoft 365 en vert grâce au contrat DPA institutionnel CEJEF avec hébergement UE garanti.

### Scripts d'automatisation

Des scripts Python sont disponibles pour automatiser les classifications :

```bash
# Analyser les logiciels
python3 scripts/classify-lgpd.py

# Appliquer les classifications
python3 scripts/apply-lgpd-changes.py
```

---

## 🛠 Technologies

### Stack technique

- **[Nuxt 4](https://nuxt.com)** : Framework Vue.js pour applications web modernes
- **[Nuxt UI v4.1.0](https://ui.nuxt.com)** : Bibliothèque de composants UI basée sur Tailwind CSS v4
- **[Nuxt Fonts](https://fonts.nuxt.com)** : Optimisation automatique des polices web (Google Fonts hébergées localement)
- **[TypeScript](https://www.typescriptlang.org/)** : Typage statique pour JavaScript
- **[Vue 3](https://vuejs.org/)** : Framework JavaScript progressif
- **[Tailwind CSS v4](https://tailwindcss.com)** : Framework CSS utility-first avec thème personnalisé CEJEF

### Tests

- **[Vitest](https://vitest.dev/)** : Tests unitaires (99 tests) avec `@nuxt/test-utils` + `happy-dom`
- **[Playwright](https://playwright.dev/)** : Tests e2e (desktop Chrome + mobile Pixel 7)

### Outils de développement

- **ESLint** : Analyse statique du code (linting)
- **GitHub Actions** : CI/CD pour déploiement automatisé
- **Git** : Gestion de version
- **[UXNote](https://uxnote.dev/)** : Widget d'annotation pour retours testeurs — voir [uxnotes-server](https://github.com/fallinov/uxnotes-server) pour la documentation complète

### Hébergement

- **GitHub Pages** : Environnement de staging/test
- **SFTP** : Environnement de production

---

## 🎨 Variants Nuxt UI personnalisés

Le projet définit des variants personnalisés pour les composants Nuxt UI afin de supporter l'esthétique **Liquid Glass** (verre liquide).

### Variant Badge Liquid Glass

Un variant personnalisé pour `UBadge` appliquant l'effet verre liquide signature du projet :

#### Configuration (app.config.ts)

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: "red",
      success: "green",
      error: "orange",
      info: "gray",
      neutral: "gray"
    },
    badge: {
      variants: {
        // Variant personnalisé "liquid" pour effet Liquid Glass
        liquid: {
          root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
          label: "text-sm font-bold uppercase tracking-widest text-white"
        }
      }
    }
  }
})
```

#### Utilisation avec la prop :ui

**⚠️ Important** : Les variants personnalisés ne sont pas reconnus par TypeScript dans les types de Nuxt UI. Il faut donc utiliser la prop `:ui` au lieu de `variant="liquid"`.

```vue
<script setup>
// Définir la configuration UI pour les badges liquid glass
const liquidBadgeUi = {
  root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
  label: "text-sm font-bold uppercase tracking-widest text-white"
}
</script>

<template>
  <!-- Utilisation avec :ui prop -->
  <UBadge :ui="liquidBadgeUi">
    <template #leading>
      <UIcon name="i-heroicons-wallet" class="w-4 h-4 text-white" />
    </template>
    Premium
  </UBadge>
</template>
```

#### Structure de la prop :ui pour UBadge

Le composant `UBadge` de Nuxt UI accepte uniquement deux propriétés dans la configuration `:ui` :

- **`root`** : Classes CSS pour l'élément conteneur (background, border, padding, border-radius, etc.)
- **`label`** : Classes CSS pour le texte (font-size, font-weight, color, text-transform, etc.)

```typescript
// ✅ CORRECT - Structure valide
const liquidBadgeUi = {
  root: "bg-white/20 border-white/50 rounded-full px-4 py-2",  // Styles du conteneur
  label: "text-sm font-bold text-white"                         // Styles du texte
}

// ❌ INCORRECT - Propriétés non supportées
const liquidBadgeUi = {
  base: "...",        // N'existe pas dans UBadge
  background: "...",  // N'existe pas dans UBadge
  border: "..."       // N'existe pas dans UBadge
}
```

#### Effet Liquid Glass

L'effet verre liquide combine plusieurs techniques CSS :

- **Semi-transparence** : `bg-white/20` (background blanc à 20% d'opacité)
- **Backdrop blur** : `backdrop-blur-md` (flou de l'arrière-plan)
- **Bordure translucide** : `border-white/50` (bordure blanche à 50% d'opacité)
- **Ombre douce** : `shadow-[0_2px_10px_rgba(0,0,0,0.05)]`
- **Coins arrondis** : `rounded-full`

#### Où est-il utilisé ?

- **`CardLiquidGlass.vue`** : Tous les badges (badge de certification en en-tête + badges de métadonnées en pied)
- Peut être utilisé n'importe où dans l'application pour un look cohérent

#### Créer de nouveaux variants personnalisés

Pour ajouter d'autres variants personnalisés :

1. **Ajouter** la configuration dans `app/app.config.ts` sous `ui.{componentName}.variants`
2. **Créer** une constante avec la structure `:ui` dans votre composant
3. **Utiliser** avec la prop `:ui` (pas `variant=""`)
4. **Documenter** le variant dans cette section

**Exemple pour un bouton liquid glass :**

```typescript
// Dans app/app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      variants: {
        liquid: {
          root: "bg-white/20 backdrop-blur-md border-white/50 hover:bg-white/30",
          label: "text-white font-bold"
        }
      }
    }
  }
})
```

```vue
<!-- Dans votre composant -->
<script setup>
const liquidButtonUi = {
  root: "bg-white/20 backdrop-blur-md border-white/50 hover:bg-white/30",
  label: "text-white font-bold"
}
</script>

<template>
  <UButton :ui="liquidButtonUi">
    Cliquez ici
  </UButton>
</template>
```

---

## 📦 Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js 20+** ([télécharger](https://nodejs.org/))
- **Git** ([télécharger](https://git-scm.com/))
- Un éditeur de code (VS Code recommandé)

### Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/fallinov/2025-cns-sfa-referentiel-logiciels-cejef.git
cd 2025-cns-sfa-referentiel-logiciels-cejef

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# Ou pour exposer sur le réseau local
npm run dev:public
```

Le site est accessible sur **http://localhost:3000** (ou votre IP locale)

### Commandes disponibles

```bash
# Développement
npm run dev              # Serveur de développement avec hot-reload
npm run dev:public       # Serveur de développement accessible sur le réseau
npm run build            # Compilation pour production (SSR)
npm run generate         # Génération du site statique
npm run preview          # Prévisualiser le site généré

# Qualité du code
npm run lint             # Vérifier le code avec ESLint
npm run lint -- --fix    # Corriger automatiquement les erreurs ESLint
npm run typecheck        # Vérifier les types TypeScript
```

---

## 📐 Normes de codage

Ce projet suit des règles strictes de qualité de code basées sur les standards officiels Nuxt ESLint (@nuxt/eslint).

### Style de code

#### Guillemets
✅ **Utiliser des guillemets doubles `"`**

```typescript
// ✅ Correct
const name = "Kahoot!"

// ❌ Incorrect
const name = 'Kahoot!'
```

#### Virgules finales
✅ **Pas de virgules finales (trailing commas)**

```typescript
// ✅ Correct
const array = [1, 2, 3]
const obj = { a: 1, b: 2 }

// ❌ Incorrect
const array = [1, 2, 3,]
const obj = { a: 1, b: 2, }
```

#### Point-virgules
✅ **Pas de point-virgules**

```typescript
// ✅ Correct
const x = 10
const y = 20

// ❌ Incorrect
const x = 10;
const y = 20;
```

#### Style d'accolades
✅ **One True Brace Style (1tbs)**

```typescript
// ✅ Correct
if (condition) {
  doSomething()
} else {
  doSomethingElse()
}

// ❌ Incorrect
if (condition)
{
  doSomething()
}
```

#### Indentation
✅ **2 espaces (pas de tabulations)**

```typescript
// ✅ Correct
function example() {
  if (true) {
    return "ok"
  }
}

// ❌ Incorrect (4 espaces)
function example() {
    if (true) {
        return "ok"
    }
}
```

### Workflow de développement

**⚠️ IMPORTANT : Toujours vérifier le code avant de commit**

```bash
# 1. Faire vos modifications
# 2. Vérifier le code
npm run lint

# 3. Corriger automatiquement si possible
npm run lint -- --fix

# 4. Vérifier les types TypeScript
npm run typecheck

# 5. Committer uniquement si tout est vert ✅
git add .
git commit -m "feat: ma nouvelle fonctionnalité"
```

### Configuration des éditeurs

#### Visual Studio Code

Créer `.vscode/settings.json` :

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore",
  "less.lint.unknownAtRules": "ignore"
}
```

**Note :** Les règles `css.lint.unknownAtRules: "ignore"` désactivent l'avertissement VSCode pour `@theme static`, une règle valide de Tailwind CSS v4 que l'éditeur ne reconnaît pas encore.

#### Zed

Créer `.zed/settings.json` :

```json
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "tailwindCSS": {
          "validate": true
        }
      }
    }
  },
  "languages": {
    "CSS": {
      "format_on_save": "off",
      "tab_size": 2
    }
  }
}
```

**Note :** Zed utilise le Tailwind CSS Language Server qui reconnaît nativement `@theme static`. Si vous voyez toujours un avertissement, rechargez Zed (`Cmd+Shift+P` → "Zed: Reload Window").

#### WebStorm / IntelliJ IDEA

1. **Settings** → **Languages & Frameworks** → **JavaScript** → **Code Quality Tools** → **ESLint**
2. Cocher **"Automatic ESLint configuration"**
3. Cocher **"Run eslint --fix on save"**

### Documentation complète

Pour la documentation complète des règles ESLint :
- Voir `.eslintrc.md` dans le projet
- Voir `CLAUDE.md` section "Code Style and Linting"
- Consulter la [documentation Nuxt ESLint](https://eslint.nuxt.com)

---

## 🗂 Structure du projet

```
2025-cns-sfa-referentiel-logiciels-cejef/
├── .github/
│   └── workflows/              # Workflows CI/CD
│       ├── deploy-github-pages.yml    # Déploiement staging
│       └── deploy-production.yml      # Déploiement production
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css        # Styles globaux et couleurs CEJEF (@theme static)
│   ├── components/
│   │   ├── BackgroundAurora.vue       # Arrière-plan avec blobs animés
│   │   ├── CardLiquidGlass.vue        # Carte logiciel avec effet liquid glass
│   │   ├── FiltersSlideover.vue       # Panneau latéral de filtres
│   │   ├── LgpdIcons.vue              # Icônes de classification LGPD
│   │   ├── SoftwareCard.vue           # Carte simple d'un logiciel
│   │   ├── SoftwareCommandPalette.vue # Recherche rapide (⌘K)
│   │   └── SoftwareDetail.vue         # Panneau latéral de détail
│   ├── composables/
│   │   └── useSoftware.ts      # Logique métier et état des logiciels
│   ├── data/
│   │   └── software-list.ts    # Base de données des logiciels
│   ├── pages/
│   │   └── index.vue           # Page d'accueil
│   ├── types/
│   │   └── software.ts         # Définitions TypeScript
│   ├── utils/
│   │   └── formatters.ts       # Utilitaires de formatage (langues, plateformes)
│   ├── app.config.ts           # Configuration Nuxt UI (couleurs, variants)
│   └── app.vue                 # Composant racine
├── public/
│   ├── logos/                  # Logos des logiciels (SVG)
│   ├── static/
│   │   └── uxnote.min.js      # Widget UXNote self-hosted (staging)
│   ├── favicon.ico             # Icône du site
│   └── .nojekyll               # Désactive Jekyll (GitHub Pages)
├── tests/
│   ├── unit/                   # Tests Vitest (99 tests)
│   └── e2e/                    # Tests Playwright (desktop + mobile)
├── .gitignore                  # Fichiers ignorés par Git
├── CLAUDE.md                   # Instructions pour Claude Code
├── eslint.config.mjs           # Configuration ESLint
├── nuxt.config.ts              # Configuration Nuxt
├── package.json                # Dépendances du projet
├── playwright.config.ts        # Configuration Playwright
├── README.md                   # Ce fichier
├── vitest.config.ts            # Configuration Vitest
└── tsconfig.json               # Configuration TypeScript
```

---

## 🏗 Architecture

### Architecture des données

#### Types TypeScript (`app/types/software.ts`)

Définit la structure de données des logiciels avec un typage strict :

```typescript
interface Software {
  id: string
  name: string
  logo: string
  shortDescription: string
  lgpd: LgpdClassification
  supportedBy: 'CEJEF' | null
  campusTraining: boolean
  platforms: Platform[]
  cost: CostType
  // ... autres propriétés
}
```

#### Base de données (`app/data/software-list.ts`)

Liste statique des logiciels exportée depuis un fichier TypeScript :

- ✅ **Avantages** : Typage strict, validation à la compilation, pas de serveur nécessaire
- ⚠️ **Limitation** : Modifications nécessitent un redéploiement

**Pour ajouter un logiciel :**

1. Éditer `app/data/software-list.ts`
2. Ajouter un nouvel objet respectant l'interface `Software`
3. Commit et push (déploiement automatique)

### Architecture des composables

#### `useSoftware` (`app/composables/useSoftware.ts`)

Composable Nuxt pour gérer l'état global des logiciels :

**État partagé :**
- `selectedSoftware` : Logiciel actuellement sélectionné
- `isDetailOpen` : État d'ouverture du modal de détail

**Méthodes :**
- `getSoftwareList()` : Retourne tous les logiciels
- `getSoftwareById(id)` : Récupère un logiciel par ID
- `openDetail(software)` : Ouvre le modal avec un logiciel
- `closeDetail()` : Ferme le modal

**Avantage** : État réactif partagé entre tous les composants sans prop drilling.

### Architecture des utilitaires

#### `formatters` (`app/utils/formatters.ts`)

Utilitaires partagés pour le formatage et les mappings, évitant la duplication de code :

**Mappings de langues :**
```typescript
export const languageNames: Record<string, string> = {
  fr: "Français",
  en: "Anglais",
  de: "Allemand",
  es: "Espagnol",
  it: "Italien"
}
```

**Mappings de plateformes vers icônes :**
```typescript
export const platformIcons: Record<string, string> = {
  web: "i-lucide-globe",
  windows: "i-lucide-laptop",
  mac: "i-lucide-laptop",
  smartphone: "i-lucide-smartphone",
  tablet: "i-lucide-tablet"
}
```

**Fonction de formatage :**
```typescript
export function formatLanguages(codes: string[]): string {
  return codes.map(code => languageNames[code] || code).join(", ")
}
```

**Utilisation dans les composants :**
```vue
<script setup>
import { platformIcons, formatLanguages } from "~/utils/formatters"

// Utiliser directement les mappings
const icon = platformIcons[platform]
const languages = formatLanguages(["fr", "en", "de"])
</script>
```

**Avantages** :
- ✅ DRY (Don't Repeat Yourself) : Une seule source de vérité pour les mappings
- ✅ Maintenabilité : Modification centralisée des traductions et icônes
- ✅ Cohérence : Garantit l'uniformité dans toute l'application

### Architecture des composants

```
App.vue (racine)
├── UHeader (en-tête Nuxt UI)
│   ├── Logo + Titre
│   ├── SoftwareCommandPalette (recherche ⌘K)
│   └── UColorModeButton (mode sombre/clair)
├── UMain (contenu principal)
│   └── index.vue (page d'accueil)
│       ├── BackgroundAurora (arrière-plan animé)
│       ├── Section titre
│       ├── Section grille de logiciels
│       │   └── CardLiquidGlass (x N logiciels avec effet verre)
│       │       ├── UBadge avec :ui (liquid glass)
│       │       └── UIcon (icônes des métadonnées)
│       ├── FiltersSlideover (filtres dans panneau latéral)
│       │   └── UButton (boutons de filtre Nuxt UI)
│       └── SoftwareDetail (détails dans panneau latéral)
│           └── LgpdIcons (indicateurs détaillés)
└── UFooter (pied de page Nuxt UI)
```

**Composants principaux :**

- **`CardLiquidGlass.vue`** : Carte logiciel avec effet liquid glass (badges semi-transparents, backdrop-blur, animations au hover)
- **`FiltersSlideover.vue`** : Panneau latéral de filtres utilisant `USlideover` et `UButton` de Nuxt UI
- **`SoftwareCommandPalette.vue`** : Palette de commandes pour recherche rapide avec raccourci clavier `⌘K`
- **`SoftwareDetail.vue`** : Panneau latéral de détails utilisant `USlideover` de Nuxt UI
- **`BackgroundAurora.vue`** : Arrière-plan avec blobs animés en CSS (animation configurée dans `tailwind.config.ts`)

### Bonnes pratiques d'utilisation de Nuxt UI

Le projet suit les principes suivants pour maximiser l'utilisation de Nuxt UI et minimiser le CSS/JS personnalisé :

#### 1. Toujours utiliser les composants Nuxt UI en priorité

```vue
<!-- ✅ CORRECT - Utilise UButton de Nuxt UI -->
<UButton
  color="primary"
  variant="ghost"
  size="lg"
  @click="handleClick"
>
  Cliquer
</UButton>

<!-- ❌ INCORRECT - Bouton HTML avec CSS personnalisé -->
<button class="custom-button" @click="handleClick">
  Cliquer
</button>
```

#### 2. Personnaliser avec la prop :ui au lieu de CSS custom

```vue
<!-- ✅ CORRECT - Personnalisation via :ui -->
<UBadge :ui="{ root: 'bg-white/20 backdrop-blur-md', label: 'text-white' }">
  Badge personnalisé
</UBadge>

<!-- ❌ INCORRECT - Classes CSS personnalisées -->
<div class="custom-badge">
  Badge personnalisé
</div>
```

#### 3. Utiliser les utilitaires Tailwind au lieu de CSS custom

```vue
<!-- ✅ CORRECT - Classes Tailwind -->
<div class="flex items-center gap-4 p-6 rounded-lg bg-white/10 backdrop-blur-md">
  Contenu
</div>

<!-- ❌ INCORRECT - CSS personnalisé dans <style> -->
<style scoped>
.custom-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
}
</style>
```

#### 4. Centraliser les configurations réutilisables

```vue
<!-- ✅ CORRECT - Configuration centralisée -->
<script setup>
const liquidBadgeUi = {
  root: "bg-white/20 backdrop-blur-md border-white/50",
  label: "text-white font-bold"
}
</script>

<template>
  <UBadge :ui="liquidBadgeUi">Badge 1</UBadge>
  <UBadge :ui="liquidBadgeUi">Badge 2</UBadge>
</template>

<!-- ❌ INCORRECT - Duplication de code -->
<template>
  <UBadge :ui="{ root: 'bg-white/20 backdrop-blur-md', label: 'text-white' }">Badge 1</UBadge>
  <UBadge :ui="{ root: 'bg-white/20 backdrop-blur-md', label: 'text-white' }">Badge 2</UBadge>
</template>
```

#### 5. Extraire les utilitaires partagés

```typescript
// ✅ CORRECT - Utilitaires dans app/utils/formatters.ts
export const platformIcons: Record<string, string> = {
  web: "i-lucide-globe",
  windows: "i-lucide-laptop"
}
```

```vue
<!-- Puis import dans les composants -->
<script setup>
import { platformIcons } from "~/utils/formatters"
</script>
```

---

## 🚀 Déploiement

### Stratégie de déploiement

Le projet utilise une **double stratégie de déploiement** :

1. **Environnement de staging (test)** : GitHub Pages
2. **Environnement de production** : Serveur SFTP

```
┌──────────────────────────────────────────────────────┐
│  DÉVELOPPEMENT                                       │
│  ↓ npm run dev                                       │
│  ↓ Modifications du code                             │
│                                                      │
│  COMMIT + PUSH                                       │
│  ↓ git add . && git commit -m "feat: ..."          │
│  ↓ git push origin main                             │
│                                                      │
│  DÉPLOIEMENT AUTOMATIQUE STAGING 🧪                  │
│  → GitHub Actions génère le site                    │
│  → GitHub Pages publie                              │
│                                                      │
│  VALIDATION ✅                                        │
│  ↓ Tests et vérifications                           │
│                                                      │
│  DÉPLOIEMENT PRODUCTION 🚀                           │
│  ↓ git tag v1.0.0                                   │
│  ↓ git push origin v1.0.0                           │
│  → GitHub Actions génère le site                    │
│  → SFTP déploie sur le serveur de production        │
└──────────────────────────────────────────────────────┘
```

### Déploiement sur GitHub Pages (Staging)

**Déclenchement automatique** à chaque push sur `main` :

```bash
git push origin main
```

**URL de staging** : `https://fallinov.github.io/2025-cns-sfa-referentiel-logiciels-cejef/`

**Workflow** : `.github/workflows/deploy-github-pages.yml`

### Déploiement en production (SFTP)

**Déclenchement manuel** via tag Git :

```bash
# Créer un tag de version (Semantic Versioning)
git tag v1.0.0

# Pousser le tag vers GitHub
git push origin v1.0.0
```

**URL de production** : Selon votre configuration SFTP

**Workflow** : `.github/workflows/deploy-production.yml`

### Gestion des versions (Semantic Versioning)

Format : `vMAJEUR.MINEUR.PATCH`

```
v1.2.3
│ │ │
│ │ └─── PATCH  : Corrections de bugs (1.2.3 → 1.2.4)
│ └───── MINEUR : Nouvelles fonctionnalités (1.2.0 → 1.3.0)
└─────── MAJEUR : Changements incompatibles (1.0.0 → 2.0.0)
```

**Exemples :**
- `v0.1.0` → Première version de développement
- `v1.0.0` → Première version stable en production
- `v1.1.0` → Ajout d'un nouveau logiciel
- `v1.1.1` → Correction d'une faute de frappe
- `v2.0.0` → Refonte complète de l'interface

---

## 🔧 Maintenance

### Ajouter un nouveau logiciel

1. **Éditer** `app/data/software-list.ts`

```typescript
{
  id: '6',
  name: 'Nouveau logiciel',
  logo: '🆕',
  shortDescription: 'Description courte...',
  lgpd: {
    hosting: 'UE',
    personalData: 'Autorisées',
    rgpd: 'Conforme',
    dataCollection: 'Limitée'
  },
  supportedBy: 'CEJEF',
  campusTraining: true,
  platforms: ['web'],
  cost: 'Gratuit',
  category: 'Catégorie',
  disciplines: ['Discipline'],
  activity: 'Type d\'activité',
  technicalLevel: 'Débutant',
  accountRequired: true,
  languages: ['Français'],
  licenseType: 'Open source',
  toolUrl: 'https://example.com'
}
```

2. **Commit et push**

```bash
git add app/data/software-list.ts
git commit -m "feat: add Nouveau logiciel"
git push origin main
```

3. **Vérifier sur staging** (déploiement automatique)

4. **Déployer en production**

```bash
git tag v1.1.0
git push origin v1.1.0
```

### Modifier un logiciel existant

1. Trouver le logiciel dans `app/data/software-list.ts` par son `id`
2. Modifier les propriétés nécessaires
3. Commit et push avec un message descriptif :

```bash
git add app/data/software-list.ts
git commit -m "fix: update Kahoot LGPD classification"
git push origin main
```

### Configurer la palette de couleurs

Le projet utilise les couleurs de la marque CEJEF et suit l'architecture de couleurs recommandée par Nuxt UI et Tailwind CSS v4. Cette configuration suit les **bonnes pratiques officielles** de Nuxt et Nuxt UI pour garantir une architecture maintenable et évolutive.

#### Fichiers de configuration du thème

Le système de couleurs est configuré dans **4 fichiers clés** :

1. **`app/assets/css/main.css`** - Définition des palettes de couleurs Tailwind CSS
2. **`app/app.config.ts`** - Mapping des couleurs sémantiques Nuxt UI
3. **`tailwind.config.ts`** - Documentation et configuration Tailwind CSS
4. **`nuxt.config.ts`** - Configuration de la police web avec @nuxt/fonts

#### Architecture des couleurs (3 niveaux)

**Niveau 1 : Définition des palettes Tailwind (`app/assets/css/main.css`)**

Source unique de vérité pour les couleurs. Utilise `@theme static` pour **remplacer complètement** les couleurs Tailwind par défaut :

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  /* Police principale CEJEF */
  --font-sans: "Public Sans", sans-serif;

  /* Rouge CEJEF - Remplace la couleur 'red' de Tailwind */
  --color-red-50: #fef2f2;   /* Teintes très claires */
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-300: #fca5a5;
  --color-red-400: #f87171;
  --color-red-500: #d1232a;  /* Couleur principale CEJEF */
  --color-red-600: #b91c22;
  --color-red-700: #991b1f;
  --color-red-800: #7f1d1d;
  --color-red-900: #661a1a;
  --color-red-950: #450a0a;  /* Teintes très foncées */
  
  /* Vert CEJEF - Remplace la couleur 'green' de Tailwind */
  --color-green-50: #f4f7f3;
  --color-green-100: #e8efe6;
  --color-green-200: #d1dfc9;
  --color-green-300: #a8c49a;
  --color-green-400: #7fa86b;
  --color-green-500: #659157;  /* Indicateurs de conformité */
  --color-green-600: #5a7f4d;
  --color-green-700: #4d6b41;
  --color-green-800: #3f5735;
  --color-green-900: #32462a;
  --color-green-950: #1a2515;
  
  /* Orange CEJEF - Remplace la couleur 'orange' de Tailwind */
  --color-orange-50: #fff7ed;
  --color-orange-100: #ffedd5;
  --color-orange-200: #fed7aa;
  --color-orange-300: #fdba74;
  --color-orange-400: #fda760;
  --color-orange-500: #f4b886;  /* Avertissements et alertes */
  --color-orange-600: #ea8a5c;
  --color-orange-700: #c2410c;
  --color-orange-800: #9a3412;
  --color-orange-900: #7c2d12;
  --color-orange-950: #431407;
}
```

**Pourquoi `@theme static` ?**
- ✅ Recommandé par Tailwind CSS v4 pour remplacer les couleurs par défaut
- ✅ Les couleurs personnalisées remplacent complètement `red`, `green`, `orange`
- ✅ Tous les utilitaires Tailwind (`bg-red-500`, `text-green-600`) utilisent les couleurs CEJEF
- ✅ Pas besoin de `extend` dans `tailwind.config.ts`

**Niveau 2 : Mapping sémantique Nuxt UI (`app/app.config.ts`)**

Associe les noms sémantiques Nuxt UI aux couleurs Tailwind redéfinies :

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: "red",      // Rouge CEJEF (#d1232a)
      success: "green",    // Vert CEJEF (#659157)
      error: "orange",     // Orange CEJEF (#f4b886)
      info: "gray",        // Gris par défaut de Tailwind
      neutral: "gray"      // Gris par défaut de Tailwind
    }
  }
})
```

**Pourquoi cette architecture ?**
- ✅ Recommandée par la documentation officielle Nuxt UI v4
- ✅ Permet de changer toutes les couleurs de l'app en modifiant uniquement `app.config.ts`
- ✅ Les composants restent sémantiques (`color="primary"`) au lieu de couplés (`color="red"`)

**Niveau 3 : Utilisation dans les composants**

Toujours utiliser les **noms sémantiques** dans les props des composants Nuxt UI :

```vue
<!-- ✅ CORRECT - Utilise le nom sémantique -->
<UBadge color="primary" variant="soft">
  17 logiciels disponibles
</UBadge>

<UButton color="success">
  Conforme RGPD
</UButton>

<!-- ❌ INCORRECT - Ne jamais utiliser le nom Tailwind directement -->
<UBadge color="red" variant="soft">
  17 logiciels disponibles
</UBadge>
```

#### Documentation des couleurs (`tailwind.config.ts`)

Le fichier `tailwind.config.ts` documente l'architecture complète des couleurs :

```typescript
import type { Config } from "tailwindcss"

/**
 * Configuration Tailwind CSS pour le Référentiel Logiciels CEJEF
 *
 * Architecture des couleurs :
 *
 * 1. Niveau Tailwind (main.css avec @theme static) :
 *    - Définit les palettes complètes (50-950) pour red, green, orange
 *    - Utilise les couleurs de la charte graphique CEJEF
 *
 * 2. Niveau Nuxt UI (app.config.ts) :
 *    - Mappe les couleurs Tailwind vers des noms sémantiques :
 *      • primary: 'red'    → Rouge CEJEF (#d1232a)
 *      • success: 'green'  → Vert CEJEF (#659157)
 *      • error: 'orange'   → Orange CEJEF (#f4b886)
 *
 * 3. Niveau Composants :
 *    - Utilisent les noms sémantiques (primary, success, error)
 */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", "sans-serif"]
      }
    }
  }
} satisfies Config
```

#### Configuration de la police web (`nuxt.config.ts`)

Le module `@nuxt/fonts` gère automatiquement le chargement optimisé de la police Google Fonts :

```typescript
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/fonts"  // Optimise le chargement des polices
  ],
  
  fonts: {
    families: [
      {
        name: "Public Sans",  // Police principale CEJEF
        provider: "google"    // Télécharge depuis Google Fonts
      }
    ]
  }
})
```

**🏠 Hébergement des polices : 100% local sur votre serveur**

Les polices Google Fonts sont **auto-hébergées sur votre serveur CEJEF**, pas sur le cloud Google :

**Au moment du build (`npm run generate`) :**
1. 📥 `@nuxt/fonts` télécharge les fichiers `.woff2` depuis Google Fonts
2. 💾 Les stocke dans `.output/public/_fonts/`
3. 🔧 Génère les CSS optimisés avec chemins locaux
4. 🚀 Les déploie avec votre site statique

**Résultat :**
- ✅ **Aucune requête externe** vers Google lors de la navigation des utilisateurs
- ✅ **Conformité RGPD/LGPD** : Pas de données transmises à Google
- ✅ **Pas de bannière cookies** nécessaire pour les polices
- ✅ **Performance optimale** : Chargement depuis votre serveur
- ✅ **Fiabilité** : Fonctionne même si Google Fonts est indisponible

**Vérification après le build :**

```bash
npm run generate

# Vérifier que les polices sont stockées localement
ls -la .output/public/_fonts/
# Output attendu : public-sans-*.woff2
```

**Avantages techniques de `@nuxt/fonts` :**
- ✅ Preconnect automatique lors du build (téléchargement optimisé)
- ✅ Preload des fichiers de polices critiques dans le `<head>`
- ✅ Gestion optimisée de `font-display: swap` pour éviter le FOUT/FOIT
- ✅ Subsetting automatique (seulement les caractères utilisés = fichiers plus petits)
- ✅ Conversion automatique au format moderne `.woff2` (compression optimale)

#### Modifier les couleurs

**Pour changer une couleur de la palette :**

1. Modifier **uniquement** `app/assets/css/main.css`
2. Les changements se propagent automatiquement à toute l'application
3. Pas besoin de modifier les composants ni `app.config.ts`

**Exemple : Changer le rouge CEJEF**

```css
/* Dans app/assets/css/main.css */
@theme static {
  --color-red-500: #ff0000; /* Nouvelle couleur rouge principale */
  --color-red-600: #cc0000; /* Ajuster les nuances plus foncées */
  --color-red-400: #ff3333; /* Ajuster les nuances plus claires */
  /* ... */
}
```

**Pour changer le mapping sémantique :**

Si vous voulez que `primary` utilise une autre couleur Tailwind :

```typescript
// Dans app/app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",  // Change primary de rouge à bleu
      success: "green",
      error: "orange"
    }
  }
})
```

#### Règles importantes et bonnes pratiques

**✅ À FAIRE :**
- **Définir les couleurs dans UN SEUL endroit** : `app/assets/css/main.css`
- **Utiliser UNIQUEMENT les props** des composants Nuxt UI (pas de CSS personnalisé)
- **Toujours utiliser les noms sémantiques** dans les composants : `primary`, `success`, `error`, `info`, `neutral`
- **Documenter les couleurs** dans `tailwind.config.ts` avec des commentaires
- **Tester les contrastes WCAG** pour l'accessibilité (https://webaim.org/resources/contrastchecker/)
- **Utiliser les nuances 50-950** pour avoir une palette complète et cohérente

**❌ À ÉVITER :**
- **Ne JAMAIS utiliser les noms Tailwind** directement dans les composants : `red`, `green`, `orange`
- **Ne JAMAIS créer de classes CSS personnalisées** pour les couleurs
- **Ne JAMAIS définir les couleurs en dur** dans les composants : `style="color: #d1232a"`
- **Ne JAMAIS mélanger** `@theme` et `extend.colors` dans `tailwind.config.ts` pour les mêmes couleurs

#### Vérifier la configuration

**Tester que les couleurs sont bien appliquées :**

```bash
# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
# Vérifier que les badges, boutons utilisent les couleurs CEJEF
```

**Vérifier les DevTools Nuxt UI :**

1. Ouvrir http://localhost:3000
2. Ouvrir les DevTools du navigateur
3. Onglet Nuxt → UI → Colors
4. Vérifier que `primary`, `success`, `error` pointent vers les bonnes couleurs

### Améliorer l'accessibilité et l'UX

Le projet respecte les standards **WCAG 2.1** pour l'accessibilité. Voici les bonnes pratiques à suivre :

#### Tailles de texte minimales

Toutes les tailles de texte respectent les minimums WCAG 2.1 :

- **Texte d'interface (badges, labels)** : minimum 14px (`text-sm`)
- **Texte de contenu (descriptions, paragraphes)** : minimum 16px (`text-base`)
- **Titres** : minimum 18px (`text-lg`) ou plus selon la hiérarchie

**Exemple dans CardLiquidGlass.vue :**
```vue
<!-- Badge : 14px -->
<UBadge :ui="liquidBadgeUi">
  <template #leading>
    <UIcon name="i-heroicons-wallet" class="w-4 h-4 text-white" />
  </template>
  {{ software.cost }}
</UBadge>

<!-- Description : 16px -->
<p class="text-base font-medium text-slate-700 dark:text-slate-300">
  {{ software.shortDescription }}
</p>

<!-- Titre : 24px -->
<h3 class="font-bold text-2xl text-slate-900 dark:text-white">
  {{ software.name }}
</h3>
```

#### Navigation au clavier

Tous les éléments interactifs sont accessibles au clavier :

```vue
<!-- Carte focusable avec indicateur visuel -->
<div
  tabindex="0"
  :class="[
    'group relative flex flex-col h-full',
    'outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40',
    'rounded-[24px] overflow-hidden cursor-pointer'
  ]"
>
  <!-- Texte blanc au focus pour contraste suffisant -->
  <h3 class="... group-hover:text-white group-focus:text-white ...">
    {{ software.name }}
  </h3>
</div>
```

#### Contraste des couleurs

Tous les textes ont un contraste suffisant (ratio WCAG AA minimum 4.5:1) :

- Texte blanc sur fond coloré au hover/focus
- Couleurs CEJEF ajustées pour respecter les contrastes
- Mode sombre avec contrastes adaptés

**Vérifier les contrastes :**
- Utiliser [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Tester avec les couleurs définies dans `app/assets/css/main.css`

#### Icônes avec taille adéquate

Les icônes ont une taille minimale de 16px (w-4 h-4) pour être bien visibles :

```vue
<!-- Icône dans badge : 16px -->
<UIcon name="i-heroicons-wallet" class="w-4 h-4 text-white" />

<!-- Icône dans header : 20px -->
<UIcon name="i-lucide-graduation-cap" class="w-5 h-5" />
```

### Modifier l'interface utilisateur

**Composants concernés :**

- **Carte liquid glass** : `app/components/CardLiquidGlass.vue`
- **Panneau de filtres** : `app/components/FiltersSlideover.vue`
- **Panneau de détail** : `app/components/SoftwareDetail.vue`
- **Recherche rapide** : `app/components/SoftwareCommandPalette.vue`
- **Icônes LGPD** : `app/components/LgpdIcons.vue`
- **Page d'accueil** : `app/pages/index.vue`
- **Layout global** : `app/app.vue`

**Workflow de modification :**

1. Modifier le composant Vue
2. Tester en local (`npm run dev`)
3. Vérifier l'accessibilité (contraste, navigation clavier)
4. Linter le code (`npm run lint`)
5. Commit et push
6. Vérifier sur staging
7. Déployer en production avec un tag

### Mettre à jour les dépendances

```bash
# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour les modules Nuxt
npm install nuxt@latest @nuxt/ui@latest @nuxt/fonts@latest @nuxt/eslint@latest

# Mettre à jour toutes les dépendances
npm update

# Tester l'application
npm run dev
npm run build
npm run generate

# Si tout fonctionne, commit
git add package.json package-lock.json
git commit -m "chore: update dependencies"
git push origin main
```

**⚠️ Attention lors des mises à jour :**

- **Nuxt UI** : Vérifier la compatibilité avec Tailwind CSS v4
- **@nuxt/fonts** : Vérifier que les polices sont toujours téléchargées localement après le build
- **Tailwind CSS** : Les changements dans `@theme static` peuvent nécessiter des ajustements

**Test de régression après mise à jour :**

```bash
# 1. Vérifier que le build fonctionne
npm run generate

# 2. Vérifier que les polices sont locales
ls -la .output/public/_fonts/

# 3. Vérifier les couleurs personnalisées
npm run dev
# → Inspecter les badges, boutons pour confirmer les couleurs CEJEF

# 4. Vérifier le linting et le typage
npm run lint
npm run typecheck
```

---

## 📚 Ressources

### Documentation officielle

- [Nuxt 4](https://nuxt.com/docs)
- [Nuxt UI v4.1.0](https://ui.nuxt.com)
- [Nuxt Fonts](https://fonts.nuxt.com) - Optimisation des polices web
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Framework CSS avec `@theme static`
- [Vue 3](https://vuejs.org/guide/introduction.html)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Guides et tutoriels

- [Guide GitHub Actions](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/lang/fr/)
- [Conventional Commits](https://www.conventionalcommits.org/fr/)

---

## 👥 Contribution

Ce projet est développé pour le CEJEF dans le cadre de la formation CNS SFA 2025.

**Développé avec ❤️ pour les enseignants du CEJEF**

---

## 📄 Licence

MIT License - Copyright (c) 2025 CEJEF

---

## 🆘 Support

Pour toute question ou problème :

1. Vérifier la documentation ci-dessus
2. Consulter les [issues GitHub](https://github.com/fallinov/2025-cns-sfa-referentiel-logiciels-cejef/issues)
3. Contacter l'équipe informatique du CEJEF
