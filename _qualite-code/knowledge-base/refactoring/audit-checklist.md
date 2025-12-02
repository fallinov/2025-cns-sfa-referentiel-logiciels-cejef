# Audit & Refactoring — Checklist

## Principe fondamental

**NE JAMAIS RÉINVENTER LA ROUE**

Hiérarchie obligatoire avant d'écrire du code personnalisé :
1. ✅ **Nuxt UI** — Utiliser les composants existants
2. ✅ **Tailwind CSS** — Utiliser les classes utilitaires
3. ✅ **Nuxt plugins/composables** — Utiliser les fonctionnalités natives
4. ✅ **Librairies du projet** — Vérifier package.json
5. ❌ **Code personnalisé** — Uniquement si AUCUNE solution ci-dessus n'existe

## 🎯 Objectifs de l'audit

- **Éliminer le code personnalisé** qui peut être remplacé par Nuxt UI / Tailwind
- **Créer des composants réutilisables** pour améliorer la maintenabilité
- **Réduire la taille des fichiers** (fichiers petits = plus faciles à maintenir)
- **Améliorer la lisibilité** du code
- **Garantir la réutilisabilité** des composants

---

## 📋 Checklist d'audit systématique

### Phase 1 : Identification du code personnalisé

#### 1.1 Composants custom vs Nuxt UI

**Questions à se poser pour chaque composant custom :**

- [ ] Ce composant réinvente-t-il un composant Nuxt UI existant ?
- [ ] Peut-on utiliser `UButton`, `UCard`, `UModal`, `UInput`, `UForm`, etc. ?
- [ ] A-t-on vérifié https://ui.nuxt.com/docs/components avant de créer ce composant ?
- [ ] Ce composant pourrait-il être un composant Nuxt UI avec des props `:ui` personnalisées ?

**Exemples de composants souvent réinventés inutilement :**

```vue
<!-- ❌ MAUVAIS - Composant custom inutile -->
<template>
  <div class="rounded-lg bg-white p-4 shadow">
    <slot />
  </div>
</template>

<!-- ✅ BON - Utiliser UCard avec :ui -->
<UCard :ui="{ body: 'p-4' }">
  <slot />
</UCard>
```

```vue
<!-- ❌ MAUVAIS - Bouton custom -->
<template>
  <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
    {{ label }}
  </button>
</template>

<!-- ✅ BON - Utiliser UButton -->
<UButton color="primary" variant="solid">{{ label }}</UButton>
```

**Actions à prendre :**
- Lister tous les composants dans `/app/components`
- Pour chaque composant, vérifier s'il existe un équivalent Nuxt UI
- Remplacer par le composant Nuxt UI + personnalisation via `:ui` si nécessaire

---

#### 1.2 CSS custom vs Tailwind

**Questions à se poser pour chaque bloc CSS custom :**

- [ ] Ce style peut-il être remplacé par des classes Tailwind ?
- [ ] A-t-on vérifié la documentation Tailwind avant d'écrire ce CSS ?
- [ ] Ce style peut-il être ajouté dans `tailwind.config.ts` au lieu d'un fichier CSS custom ?
- [ ] Y a-t-il des fichiers `.css` ou `<style>` non scoped qui pourraient être remplacés ?

**Exemples de CSS souvent réinventé inutilement :**

```vue
<!-- ❌ MAUVAIS - CSS custom pour un grid -->
<style scoped>
.my-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>

<!-- ✅ BON - Classes Tailwind -->
<div class="grid grid-cols-3 gap-4">
```

```vue
<!-- ❌ MAUVAIS - CSS custom pour responsive -->
<style scoped>
.container {
  width: 100%;
  padding: 1rem;
}
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
</style>

<!-- ✅ BON - Classes Tailwind responsive -->
<div class="w-full p-4 md:p-8">
```

**Actions à prendre :**
- Chercher tous les fichiers avec `<style>` ou `.css`
- Pour chaque règle CSS, vérifier l'équivalent Tailwind
- Supprimer les fichiers CSS qui peuvent être remplacés par Tailwind

**Commande pour trouver le CSS custom :**
```bash
# Trouver tous les fichiers avec du CSS custom
grep -r "<style" app/components app/pages --include="*.vue"
find app -name "*.css" -not -path "*/node_modules/*"
```

---

#### 1.3 Logique JavaScript custom vs Composables Nuxt

**Questions à se poser pour chaque logique JavaScript :**

- [ ] Cette logique peut-elle utiliser un composable Nuxt existant ?
- [ ] Y a-t-il des composables Nuxt UI disponibles ? (ex: `useToast`, `useColorMode`, `defineShortcuts`)
- [ ] Cette logique est-elle dupliquée dans plusieurs composants ?
- [ ] Peut-on extraire cette logique dans un composable réutilisable ?

**Exemples de logique souvent réinventée :**

```vue
<!-- ❌ MAUVAIS - Gérer le dark mode manuellement -->
<script setup>
const isDark = ref(false)
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<!-- ✅ BON - Utiliser useColorMode -->
<script setup>
const colorMode = useColorMode()
</script>
```

```vue
<!-- ❌ MAUVAIS - Gestion manuelle des toasts -->
<script setup>
const toasts = ref([])
function showToast(message) {
  toasts.value.push({ id: Date.now(), message })
}
</script>

<!-- ✅ BON - Utiliser useToast de Nuxt UI -->
<script setup>
const toast = useToast()
toast.add({ title: 'Success!', color: 'green' })
</script>
```

**Actions à prendre :**
- Vérifier https://ui.nuxt.com/docs/composables pour les composables Nuxt UI
- Vérifier https://nuxt.com/docs/api/composables pour les composables Nuxt
- Extraire la logique dupliquée dans des composables custom si nécessaire

---

#### 1.4 Plugins custom vs Librairies existantes

**Questions à se poser :**

- [ ] Ce plugin réinvente-t-il une fonctionnalité disponible dans package.json ?
- [ ] Y a-t-il un module Nuxt existant pour cette fonctionnalité ?
- [ ] Peut-on utiliser une librairie NPM au lieu de coder from scratch ?

**Actions à prendre :**
- Lister tous les plugins dans `/plugins`
- Vérifier si des modules Nuxt officiels couvrent ces besoins
- Consulter https://nuxt.com/modules pour les modules disponibles

---

### Phase 2 : Composants réutilisables

#### 2.1 Identifier le code dupliqué

**Chercher les patterns répétés :**

- [ ] Y a-t-il des blocs de markup dupliqués dans plusieurs pages/composants ?
- [ ] Y a-t-il des patterns de style répétés (ex: cards, badges, headers) ?
- [ ] Y a-t-il de la logique dupliquée dans plusieurs endroits ?

**Commandes pour trouver la duplication :**
```bash
# Chercher des patterns similaires dans les composants
grep -r "class=\".*rounded.*shadow.*\"" app/components app/pages

# Chercher des composables dupliqués
grep -r "const.*=.*ref\|reactive" app/components
```

**Actions à prendre :**
- Extraire le markup dupliqué dans un nouveau composant
- Créer des composants wrapper autour des composants Nuxt UI si nécessaire
- Centraliser la logique dupliquée dans des composables

---

#### 2.2 Critères de création de composants

**Quand créer un nouveau composant réutilisable :**

✅ **OUI, créer un composant si :**
- Le markup est utilisé 2+ fois dans le projet
- Le composant a une responsabilité unique et claire
- Il améliore la lisibilité du code parent
- Il facilite la maintenance (changement centralisé)
- Il peut être réutilisé dans différents contextes

❌ **NON, ne pas créer de composant si :**
- C'est utilisé une seule fois
- C'est juste un wrapper trivial autour d'un composant Nuxt UI sans logique
- Cela n'améliore pas la lisibilité
- Le composant Nuxt UI avec `:ui` suffit

**Exemple de bon composant réutilisable :**

```vue
<!-- app/components/StatusBadge.vue -->
<script setup lang="ts">
interface Props {
  status: 'success' | 'warning' | 'error' | 'info'
  label: string
}
const props = defineProps<Props>()

const statusConfig = {
  success: { color: 'green', icon: 'i-heroicons-check-circle' },
  warning: { color: 'yellow', icon: 'i-heroicons-exclamation-triangle' },
  error: { color: 'red', icon: 'i-heroicons-x-circle' },
  info: { color: 'blue', icon: 'i-heroicons-information-circle' }
}

const config = computed(() => statusConfig[props.status])
</script>

<template>
  <UBadge :color="config.color" variant="soft">
    <UIcon :name="config.icon" class="mr-1" />
    {{ label }}
  </UBadge>
</template>
```

**Avantages :**
- Réutilisable partout
- Encapsule la logique de mapping status → couleur/icône
- Utilise UBadge de Nuxt UI (pas de réinvention)
- API claire et typée

---

#### 2.3 Structure des composants réutilisables

**Bonnes pratiques :**

```vue
<script setup lang="ts">
// 1. Imports
import type { ComponentProps } from './types'

// 2. Props avec types TypeScript
interface Props {
  title: string
  variant?: 'default' | 'outlined'
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

// 3. Emits si nécessaire
const emit = defineEmits<{
  click: []
  close: []
}>()

// 4. Logique du composant (computed, methods)
const classes = computed(() => ({
  'border-2': props.variant === 'outlined'
}))

// 5. Utiliser des composants Nuxt UI comme base
</script>

<template>
  <!-- Utiliser les composants Nuxt UI avec :ui pour personnaliser -->
  <UCard :ui="{ base: classes }">
    <slot />
  </UCard>
</template>
```

---

### Phase 3 : Réduction de la taille des fichiers

#### 3.1 Identifier les fichiers trop longs

**Critères d'un fichier trop long :**

- [ ] Plus de 200 lignes de code
- [ ] Gère plusieurs responsabilités
- [ ] Mixe logique métier, UI, et données
- [ ] Difficile à comprendre d'un coup d'œil

**Commande pour trouver les fichiers longs :**
```bash
# Trouver les fichiers de plus de 200 lignes
find app -name "*.vue" -exec wc -l {} \; | sort -rn | head -20
```

**Actions à prendre :**
- Séparer les pages monolithiques en plusieurs composants
- Extraire la logique métier dans des composables
- Extraire les constantes/types dans des fichiers dédiés

---

#### 3.2 Refactoring des pages monolithiques

**Exemple de refactoring d'une page trop longue :**

```vue
<!-- ❌ MAUVAIS - Page monolithique (300+ lignes) -->
<script setup>
// Logique fetch
// Logique filtrage
// Logique tri
// Logique pagination
// État local
// Formulaires
</script>

<template>
  <!-- Header -->
  <!-- Filtres -->
  <!-- Liste -->
  <!-- Pagination -->
  <!-- Modales -->
  <!-- Footer -->
</template>

<!-- ✅ BON - Page composée de composants -->
<script setup>
// Uniquement la composition des composants
const { data } = await useSoftwareData() // composable
</script>

<template>
  <SoftwarePageHeader />
  <SoftwareFilters v-model="filters" />
  <SoftwareList :items="filteredData" />
  <SoftwarePagination v-model:page="currentPage" :total="total" />
  <SoftwareDetailModal v-model:open="showDetail" :software="selected" />
</template>
```

---

## 🔍 Procédure d'audit complète

### Étape 1 : Inventaire

```bash
# 1. Lister tous les composants
find app/components -name "*.vue" > audit-components.txt

# 2. Lister tous les fichiers avec CSS custom
grep -r "<style" app --include="*.vue" > audit-css.txt
find app -name "*.css" > audit-css-files.txt

# 3. Lister tous les composables
find app/composables -name "*.ts" > audit-composables.txt

# 4. Lister tous les plugins
find app/plugins -name "*.ts" > audit-plugins.txt
```

### Étape 2 : Analyse par fichier

Pour chaque fichier identifié :

1. **Ouvrir le fichier**
2. **Poser les questions de la checklist** (section 1.1 à 1.4)
3. **Documenter les problèmes** trouvés
4. **Proposer une solution** (composant Nuxt UI, classe Tailwind, composable, etc.)
5. **Estimer l'effort** de refactoring (faible/moyen/élevé)

### Étape 3 : Priorisation

**Ordre de priorité pour le refactoring :**

1. 🔴 **Priorité haute** : Code personnalisé qui existe déjà dans Nuxt UI (redondance totale)
2. 🟠 **Priorité moyenne** : CSS custom qui peut être remplacé par Tailwind
3. 🟡 **Priorité basse** : Composants longs à découper
4. 🟢 **Nice-to-have** : Extraction de logique en composables

### Étape 4 : Refactoring

**Pour chaque élément à refactorer :**

1. Créer une branche git dédiée
2. Faire le refactoring
3. **Tester** que l'app fonctionne toujours
4. Lancer `npm run lint && npm run typecheck`
5. Commit avec message clair : `refactor: replace custom Modal with UModal`
6. Merge après validation

### Étape 5 : Documentation

**Après chaque refactoring majeur :**

- Mettre à jour le CLAUDE.md si nécessaire
- Documenter les nouveaux composants réutilisables créés
- Ajouter des exemples d'usage dans les commentaires

---

## 📊 Template de rapport d'audit

```markdown
# Rapport d'audit code — [Date]

## Résumé

- **Fichiers analysés** : X
- **Problèmes identifiés** : Y
- **Lignes de code personnalisé** : Z (à réduire)

## Composants custom à remplacer

| Fichier | Problème | Solution Nuxt UI | Priorité |
|---------|----------|------------------|----------|
| `MyButton.vue` | Réinvente UButton | Utiliser `UButton` avec `:ui` | 🔴 Haute |
| `MyCard.vue` | Réinvente UCard | Utiliser `UCard` | 🔴 Haute |

## CSS custom à remplacer

| Fichier | Problème | Solution Tailwind | Priorité |
|---------|----------|-------------------|----------|
| `styles.css` | Grid custom | Classes `grid grid-cols-X gap-Y` | 🟠 Moyenne |

## Composants à créer (réutilisabilité)

| Pattern répété | Localisation | Nouveau composant | Priorité |
|----------------|--------------|-------------------|----------|
| Status badges | 5 endroits | `StatusBadge.vue` | 🟠 Moyenne |

## Fichiers trop longs (>200 lignes)

| Fichier | Lignes | Action proposée | Priorité |
|---------|--------|-----------------|----------|
| `index.vue` | 350 | Découper en 4 composants | 🟡 Basse |

## Actions recommandées

1. [ ] Remplacer tous les composants custom redondants (priorité haute)
2. [ ] Supprimer le CSS custom remplaçable par Tailwind
3. [ ] Créer les composants réutilisables identifiés
4. [ ] Découper les fichiers >200 lignes
5. [ ] Extraire la logique dupliquée en composables

## Estimation

- **Temps total estimé** : X heures
- **Réduction de code attendue** : -Y%
- **Amélioration maintenabilité** : +Z%
```

---

## ✅ Checklist finale

Avant de valider qu'un refactoring est terminé :

- [ ] Aucun composant custom ne réinvente Nuxt UI
- [ ] Aucun CSS custom ne peut être remplacé par Tailwind
- [ ] La logique dupliquée a été extraite en composables
- [ ] Les fichiers font moins de 200 lignes (dans la mesure du possible)
- [ ] Les composants réutilisables sont bien documentés
- [ ] `npm run lint && npm run typecheck` passe sans erreur
- [ ] L'application fonctionne comme avant (tests manuels)
- [ ] Le code est plus lisible et maintenable qu'avant

---

## 📚 Ressources

- **Nuxt UI composants** : https://ui.nuxt.com/docs/components
- **Nuxt UI composables** : https://ui.nuxt.com/docs/composables
- **Tailwind CSS docs** : https://tailwindcss.com/docs
- **Nuxt composables** : https://nuxt.com/docs/api/composables
- **Nuxt modules** : https://nuxt.com/modules
