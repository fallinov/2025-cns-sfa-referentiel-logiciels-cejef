# Structure des données - Référentiel Logiciels CEJEF

Ce dossier contient toutes les données statiques du référentiel de logiciels pédagogiques du CEJEF.

> **Note importante** : Ces données sont actuellement stockées en TypeScript mais seront **migrées vers Directus** pour permettre une gestion dynamique via CMS.

## 📁 Fichiers de données

### `categories.ts`
Contient les **15 catégories** de logiciels pédagogiques.

**Structure** :
- `id` : Identifiant unique (slug)
- `name` : Nom affiché
- `description` : Description de la catégorie
- `icon` : Icône Heroicons (optionnel)
- `color` : Couleur Tailwind (optionnel)

**Exemples de catégories** :
- Quiz & Évaluation (`quiz`)
- Collaboration (`collaboration`)
- Design & Création graphique (`design`)
- Intelligence Artificielle (`ia`)
- LMS & Gestion de cours (`lms`)

### `disciplines.ts`
Contient les **15 disciplines académiques** du CEJEF.

**Structure** :
- `id` : Identifiant unique (slug)
- `name` : Nom de la discipline
- `description` : Description
- `icon` : Icône Heroicons (optionnel)
- `color` : Couleur Tailwind (optionnel)
- `department` : Département associé (optionnel)

**Exemples de disciplines** :
- Transversal (`transversal`) - utilisable partout
- Informatique (`informatique`)
- Arts & Design (`arts`)
- Santé & Social (`sante`)
- Commerce & Gestion (`commerce`)

### `activities.ts`
Contient les **18 types d'activités pédagogiques**.

**Structure** :
- `id` : Identifiant unique (slug)
- `name` : Nom de l'activité
- `description` : Description
- `icon` : Icône Heroicons (optionnel)
- `color` : Couleur Tailwind (optionnel)
- `taxonomyLevel` : Niveau de la taxonomie de Bloom (optionnel)

**Exemples d'activités** :
- Évaluation formative (`evaluation-formative`) - Niveau : Évaluer
- Création de contenu (`creation-contenu`) - Niveau : Créer
- Travail collaboratif (`travail-collaboratif`) - Niveau : Créer
- Révision (`revision`) - Niveau : Comprendre
- Gamification (`gamification`) - Niveau : Appliquer

**Niveaux taxonomiques** (Bloom) :
- Se souvenir
- Comprendre
- Appliquer
- Analyser
- Évaluer
- Créer

### `software-list.ts`
Contient la **liste complète des logiciels** (actuellement 17 logiciels).

Chaque logiciel référence les données ci-dessus via leurs **IDs** :
- `category` : ID de catégorie (ex: `"quiz"`)
- `disciplines` : Array d'IDs de disciplines (ex: `["transversal", "arts"]`)
- `activity` : ID d'activité (ex: `"evaluation-formative"`)

### `index.ts`
Point d'entrée central pour importer toutes les données et fonctions utilitaires.

## 🔗 Relations entre les données

```
Software
├── category (1) ──────> Category
├── disciplines (N) ───> Discipline[]
└── activity (1) ──────> Activity
```

## 📊 Exemples d'utilisation

### Importer les données

```typescript
import { 
  categories, 
  disciplines, 
  activities, 
  softwareList 
} from '~/data'

// Ou des fonctions spécifiques
import { 
  getCategoryById, 
  getDisciplineById, 
  getActivityById 
} from '~/data'
```

### Récupérer une catégorie

```typescript
const category = getCategoryById('quiz')
console.log(category.name) // "Quiz & Évaluation"
```

### Filtrer les disciplines par département

```typescript
const techDisciplines = getDisciplinesByDepartment('Technique')
// Retourne: Informatique, Technique, Architecture
```

### Récupérer les activités par niveau taxonomique

```typescript
const createActivities = getActivitiesByTaxonomyLevel('Créer')
// Retourne: Travail collaboratif, Création de contenu, Brainstorming
```

### Afficher un logiciel avec ses relations

```typescript
const software = softwareList[0] // Kahoot!

const category = getCategoryById(software.category)
const mainActivity = getActivityById(software.activity)
const disciplines = software.disciplines.map(id => getDisciplineById(id))

console.log(`${software.name} - ${category?.name}`)
console.log(`Activité: ${mainActivity?.name}`)
console.log(`Disciplines: ${disciplines.map(d => d?.name).join(', ')}`)
```

## 🎯 Migration vers Directus

Lors de la migration vers Directus, cette structure sera transformée en :

### Collections Directus

1. **`categories`** - Table des catégories
2. **`disciplines`** - Table des disciplines
3. **`activities`** - Table des activités
4. **`software`** - Table des logiciels

### Relations Directus

- `software.category` → Many-to-One → `categories`
- `software.activity` → Many-to-One → `activities`
- `software.disciplines` → Many-to-Many → `disciplines` (table pivot)

### Avantages après migration

- ✅ Modification des données via interface Directus (pas besoin de coder)
- ✅ API REST/GraphQL automatique
- ✅ Gestion des relations facilitée
- ✅ Historique des modifications
- ✅ Multi-utilisateurs avec permissions
- ✅ Import/export CSV

## 📝 Convention de nommage

- **IDs** : Format kebab-case (ex: `evaluation-formative`)
- **Fichiers** : Format kebab-case (ex: `software-list.ts`)
- **Types** : Format PascalCase (ex: `Category`, `Activity`)
- **Constantes** : Format camelCase (ex: `categories`, `softwareList`)

## 🚀 Ajout de nouvelles données

### Ajouter une catégorie

1. Éditer `categories.ts`
2. Ajouter un nouvel objet dans le tableau `categories`
3. Utiliser un ID unique en kebab-case
4. Choisir une icône depuis [Heroicons](https://heroicons.com)

### Ajouter une discipline

1. Éditer `disciplines.ts`
2. Ajouter un nouvel objet dans le tableau `disciplines`
3. Optionnellement associer un département

### Ajouter une activité

1. Éditer `activities.ts`
2. Ajouter un nouvel objet dans le tableau `activities`
3. Optionnellement définir le niveau taxonomique de Bloom

### Ajouter un logiciel

1. Éditer `software-list.ts`
2. Créer un nouvel objet `Software`
3. Référencer les IDs existants pour `category`, `disciplines`, `activity`
4. S'assurer que tous les champs requis sont remplis

## 📚 Ressources

- [Taxonomie de Bloom](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/)
- [Heroicons](https://heroicons.com)
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- [Directus Documentation](https://docs.directus.io)
