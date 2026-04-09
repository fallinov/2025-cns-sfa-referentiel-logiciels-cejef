# Composants et Design System

## Nuxt UI — pièges spécifiques

- `UDivider` n'existe pas → utiliser `USeparator`
- `USlideover` : slot `#body`, prop `side` · `UDrawer` : slot `#content`, prop `direction`
- `UModal` trigger externe → `:open` + `@update:open` (PAS `v-model`)
- Exemple de référence : `app/components/SoftwareCommandPalette.vue`

## Nuxt UI Custom Variants

Ce projet définit des variantes custom pour supporter l'esthétique **Liquid Glass**.

**Configuration :** `app/app.config.ts`

### Liquid Glass Badge Variant

```typescript
// app/app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "red",      // Rouge CEJEF #9A211F (500)
      success: "green",    // Vert #1D7A3F (500)
      warning: "orange",   // Orange #946017 (500)
      error: "red",
      info: "blue",        // Bleu info #2563EB (500)
      neutral: "gray"
    },
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

### Usage Liquid Glass Badge

```vue
<script setup>
const liquidBadgeUi = {
  root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
  label: "text-sm font-bold uppercase tracking-widest text-white"
}
</script>

<template>
  <UBadge :ui="liquidBadgeUi">
    <template #leading>
      <UIcon name="i-heroicons-wallet" class="w-4 h-4 text-white" />
    </template>
    Premium
  </UBadge>
</template>
```

**Note :** On utilise `:ui` prop directement au lieu de `variant="liquid"` pour éviter les conflits de types TypeScript avec les variantes prédéfinies de Nuxt UI.

**Où c'est utilisé :**
- **CardLiquidGlass.vue** : tous les badges (header certification + footer metadata)
- Fournit un style liquid glass cohérent pour tous les badges
- Réutilisable partout dans l'app

**Important :** UBadge utilise `root` pour le conteneur et `label` pour le texte. Tous les styles visuels doivent être sur `root`.

### Créer de nouvelles variantes

1. Ajouter la config dans `app/app.config.ts` sous `ui.{componentName}.variants`
2. Documenter la variante dans ce fichier
3. Fournir des exemples d'utilisation
4. Référencer où c'est utilisé dans le codebase

## Palette de couleurs (WCAG AAA)

Définie dans `app/assets/css/main.css` via `@theme static`. Palette : https://coolors.co/ffffff-f9fafb-e5e7eb-4b5563-111827-9a211f-1d7a3f-946017-2563eb

| Token | Hex | Rôle | Contraste/blanc |
|-------|-----|------|-----------------|
| white | #FFFFFF | Fond principal | — |
| gray-50 | #F9FAFB | Fond secondaire, cards | — |
| gray-200 | #E5E7EB | Bordures, séparateurs | — |
| gray-600 | #4B5563 | Texte secondaire | 7.4:1 (AAA) |
| gray-900 | #111827 | Texte principal | 15.4:1 (AAA) |
| red-500 | #9A211F | Accent, CTA, erreur | 7.5:1 (AAA) |
| green-500 | #1D7A3F | Autorisé | 5.4:1 (AA) |
| orange-500 | #946017 | Attention | 5.0:1 (AA) |
| blue-500 | #2563EB | Info | 4.6:1 (AA) |

> **Convention** : shade 500 = couleur de base de la charte pour toutes les palettes custom. Charte complète : `docs/charte-graphique-sfp.md` et page `/charte-graphique`.

## Arbre des composants

```
app.vue (root layout: AppHeader + OnboardingModal + NuxtPage + UFooter)
├── pages/index.vue (catalogue logiciels)
│   ├── software/SoftwarePageHeader.vue (titre, recherche, filtres)
│   └── software/SoftwareListContainer.vue (grille/liste)
│       ├── SoftwareCard.vue (vue grille)
│       └── SoftwareListItem.vue (vue liste)
│           └── SoftwareLogoWithBadge.vue (logo + pastille certification)
│               └── SoftwareFeatureBadge.vue (badges: Approuvé CEJEF/SEN, edu, mineurs)
├── pages/logiciels/[id].vue (page détail logiciel)
│   ├── SoftwareCertificationCard.vue (statut LGPD + alternatives)
│   ├── SoftwareDetailSimilar.vue (logiciels similaires)
│   └── SoftwareDetailPracticalInfo.vue (coût, support, âge)
├── pages/protection-des-donnees.vue (protection des données)
│   ├── data-protection/DataProtectionPageHeader.vue (titre, recherche typewriter)
│   ├── data-protection/DataProtectionThemeContent.vue (sections = cartes, items = direct ou tiroirs UAccordion)
│   └── data-protection/DataProtectionLinkList.vue (liens avec source et icône par type)
└── pages/charte-graphique.vue (charte graphique interactive, 12 sections)
```

## Composants clés

- `SoftwareCard.vue` / `SoftwareListItem.vue` — cartes catalogue (grille/liste)
- `SoftwareFeatureBadge.vue` — badge réutilisable (icon + label, tailles sm/md)
- `SoftwareCertificationCard.vue` — statut LGPD détaillé avec alternatives vertes
- `OnboardingModal.vue` — modale "Classification LGPD" au 1er accès (localStorage) + avertissement données sensibles
- `AppHeader.vue` — header avec liens "Référentiel logiciels" et "Protection des données"
- `DataProtectionThemeContent.vue` — sections en cartes, items directs ou tiroirs UAccordion
- `AudienceChoiceScreen.vue` — écran de choix SEN/CEJEF au premier accès
- `DataProtectionPageHeader.vue` — recherche avec animation typewriter

## Guide de modification UI

- **Carte catalogue** : `SoftwareCard.vue` (grille) / `SoftwareListItem.vue` (liste)
- **Page détail** : `app/pages/logiciels/[id].vue`
- **Statut LGPD** : `SoftwareCertificationCard.vue`
- **Badges** : `SoftwareFeatureBadge.vue` (composant réutilisable)
- **Filtres/recherche** : `app/stores/software.ts` + `software/SoftwareFiltersBar.vue`
- **Onboarding** : `OnboardingModal.vue` (popup) + `AppHeader.vue` (bouton "?")
- **Protection des données** : `app/pages/protection-des-donnees.vue` (page) + composants `data-protection/`
- **Données protection** : `app/data/data-protection-themes.ts` (6 thèmes Genially, 3 niveaux)
- **Global layout** : `app/app.vue`
