# Référentiel Logiciels CEJEF

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Référentiel de logiciels pédagogiques pour le CEJEF avec classification LGPD (Loi sur la protection des données)

## 📋 Table des matières

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Classification LGPD](#-classification-lgpd)
- [Technologies](#-technologies)
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

- **Mode sombre/clair** : Bascule automatique selon les préférences système
- **Responsive** : Adapté aux ordinateurs, tablettes et smartphones
- **Performance** : Site statique généré pour un chargement ultra-rapide
- **Accessibilité** : Conforme aux standards WCAG

---

## 🔒 Classification LGPD

Chaque logiciel est évalué selon 4 critères de protection des données :

### 1. Hébergement des données 🏠

Localisation physique des serveurs hébergeant les données :

| Valeur | Description | Niveau de confiance |
|--------|-------------|---------------------|
| **CEJEF** | Serveurs internes CEJEF | ⭐⭐⭐⭐⭐ Maximum |
| **CH** | Suisse | ⭐⭐⭐⭐ Très élevé |
| **UE** | Union Européenne | ⭐⭐⭐ Élevé |
| **Hors-UE** | Hors UE (USA, etc.) | ⭐⭐ Modéré |
| **Chine** | Chine | ⭐ Faible |

### 2. Utilisation des données personnelles 👤

Autorisation d'utiliser le logiciel avec des données d'étudiants :

| Valeur | Description | Recommandation |
|--------|-------------|----------------|
| **Autorisées** | Utilisation de données personnelles autorisée | ✅ Recommandé |
| **Anonymisé** | Uniquement avec données anonymisées | ⚠️ Avec précautions |
| **Interdites** | Utilisation de données personnelles interdite | ❌ Déconseillé |

### 3. Conformité RGPD 📜

Niveau de conformité au Règlement Général sur la Protection des Données :

| Valeur | Description | Statut |
|--------|-------------|--------|
| **Conforme** | Totalement conforme RGPD | ✅ Validé |
| **Partiel** | Conformité partielle ou en cours | ⚠️ Vigilance |
| **Non conforme** | Non conforme RGPD | ❌ Éviter |

### 4. Niveau de collecte de données 📊

Quantité de données collectées par l'outil :

| Valeur | Description | Impact |
|--------|-------------|--------|
| **Limitée** | Collecte minimale (nom, email) | ✅ Faible impact |
| **Modérée** | Collecte standard | ⚠️ Impact moyen |
| **Extensive** | Collecte importante (tracking, analytics) | ❌ Impact élevé |

---

## 🛠 Technologies

### Stack technique

- **[Nuxt 4](https://nuxt.com)** : Framework Vue.js pour applications web modernes
- **[Nuxt UI](https://ui.nuxt.com)** : Bibliothèque de composants UI basée sur Tailwind CSS
- **[TypeScript](https://www.typescriptlang.org/)** : Typage statique pour JavaScript
- **[Vue 3](https://vuejs.org/)** : Framework JavaScript progressif

### Outils de développement

- **ESLint** : Analyse statique du code (linting)
- **GitHub Actions** : CI/CD pour déploiement automatisé
- **Git** : Gestion de version

### Hébergement

- **GitHub Pages** : Environnement de staging/test
- **SFTP** : Environnement de production

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
```

Le site est accessible sur **http://localhost:3000**

### Commandes disponibles

```bash
# Développement
npm run dev              # Serveur de développement avec hot-reload
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
  ]
}
```

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
│   │       └── main.css        # Styles globaux
│   ├── components/
│   │   ├── AppLogo.vue         # Logo de l'application
│   │   ├── LgpdIcons.vue       # Icônes de classification LGPD
│   │   ├── SoftwareCard.vue    # Carte d'un logiciel
│   │   ├── SoftwareDetail.vue  # Modal de détail
│   │   └── TemplateMenu.vue    # Menu de navigation
│   ├── composables/
│   │   └── useSoftware.ts      # Logique métier des logiciels
│   ├── data/
│   │   └── software-list.ts    # Base de données des logiciels
│   ├── pages/
│   │   └── index.vue           # Page d'accueil
│   ├── types/
│   │   └── software.ts         # Définitions TypeScript
│   └── app.vue                 # Composant racine
├── public/
│   ├── favicon.ico             # Icône du site
│   └── .nojekyll               # Désactive Jekyll (GitHub Pages)
├── .gitignore                  # Fichiers ignorés par Git
├── eslint.config.mjs           # Configuration ESLint
├── nuxt.config.ts              # Configuration Nuxt
├── package.json                # Dépendances du projet
├── README.md                   # Ce fichier
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

### Architecture des composants

```
App.vue (racine)
├── UHeader (en-tête)
│   ├── Logo + Titre
│   └── Bouton mode sombre/clair
├── UMain (contenu principal)
│   └── index.vue (page d'accueil)
│       ├── UPageHero (bandeau titre)
│       ├── UPageSection (grille de logiciels)
│       │   └── SoftwareCard (x N logiciels)
│       │       └── LgpdIcons (indicateurs LGPD)
│       ├── SoftwareDetail (modal de détail)
│       │   └── LgpdIcons (indicateurs détaillés)
│       └── UPageCTA (section info LGPD)
└── UFooter (pied de page)
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

Le projet utilise les couleurs de la marque CEJEF et suit l'architecture de couleurs recommandée par Nuxt UI et Tailwind CSS v4.

#### Architecture des couleurs (3 niveaux)

**1. Définition des couleurs dans `app/assets/css/main.css`**

Source unique de vérité pour les couleurs. Utilise `@theme static` pour remplacer complètement les couleurs Tailwind par défaut :

```css
@theme static {
  /* Rouge CEJEF - Remplace la couleur 'red' de Tailwind */
  --color-red-500: #d1232a;  /* Couleur principale */
  --color-red-50: #fef2f2;   /* Teintes claires */
  --color-red-950: #450a0a;  /* Teintes foncées */
  
  /* Vert CEJEF - Remplace la couleur 'green' de Tailwind */
  --color-green-500: #659157; /* Certification niveau 1 */
  
  /* Orange CEJEF - Remplace la couleur 'orange' de Tailwind */
  --color-orange-500: #f4b886; /* Certification niveau 3 */
}
```

**2. Mapping sémantique dans `app/app.config.ts`**

Associe les noms sémantiques Nuxt UI aux couleurs Tailwind redéfinies :

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: "red",      // Rouge CEJEF
      success: "green",    // Vert CEJEF
      error: "orange",     // Orange CEJEF
      info: "gray",
      neutral: "gray"
    }
  }
})
```

**3. Utilisation dans les composants**

Toujours utiliser les **noms sémantiques** dans les props des composants Nuxt UI :

```vue
<!-- ✅ CORRECT -->
<UBadge color="primary" variant="soft">
  17 logiciels disponibles
</UBadge>

<!-- ❌ INCORRECT - Ne jamais utiliser le nom Tailwind directement -->
<UBadge color="red" variant="soft">
  17 logiciels disponibles
</UBadge>
```

#### Modifier les couleurs

**Pour changer une couleur de la palette :**

1. Modifier `app/assets/css/main.css` uniquement
2. Les changements se propagent automatiquement à toute l'application
3. Pas besoin de modifier les composants

**Exemple : Changer le rouge CEJEF**

```css
/* Dans app/assets/css/main.css */
@theme static {
  --color-red-500: #ff0000; /* Nouvelle couleur rouge */
  /* Ajuster les autres nuances si nécessaire */
}
```

#### Règles importantes

- ✅ **Définir les couleurs dans UN SEUL endroit** : `main.css`
- ✅ **Utiliser UNIQUEMENT les props** des composants Nuxt UI (pas de CSS personnalisé)
- ✅ **Toujours utiliser les noms sémantiques** dans les composants : `primary`, `success`, `error`, `info`, `neutral`
- ❌ **Ne JAMAIS utiliser les noms Tailwind** directement dans les composants : `red`, `green`, `orange`
- ❌ **Ne JAMAIS créer de classes CSS personnalisées** pour les couleurs

### Modifier l'interface utilisateur

**Composants concernés :**

- **Carte de logiciel** : `app/components/SoftwareCard.vue`
- **Modal de détail** : `app/components/SoftwareDetail.vue`
- **Icônes LGPD** : `app/components/LgpdIcons.vue`
- **Page d'accueil** : `app/pages/index.vue`
- **Layout global** : `app/app.vue`

**Workflow de modification :**

1. Modifier le composant Vue
2. Tester en local (`npm run dev`)
3. Commit et push
4. Vérifier sur staging
5. Déployer en production avec un tag

### Mettre à jour les dépendances

```bash
# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour Nuxt et Nuxt UI
npm install nuxt@latest @nuxt/ui@latest

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

---

## 📚 Ressources

### Documentation officielle

- [Nuxt 4](https://nuxt.com/docs)
- [Nuxt UI](https://ui.nuxt.com)
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
