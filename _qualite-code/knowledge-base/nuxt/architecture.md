# Nuxt — Architecture & organisation

## Structure recommandée

/nuxt.config.ts
/pages/
/layouts/
/components/
/composables/
/plugins/
/server/
/assets/

## Bonnes pratiques
- Nommer les composants clairement
- Garder les responsabilités séparées (UI vs logique)
- Favoriser la réutilisation via composants et composables
- Éviter les pages monolithiques : extraire la logique métier dans `/composables`
- Préférer de petits composants réutilisables et testables
