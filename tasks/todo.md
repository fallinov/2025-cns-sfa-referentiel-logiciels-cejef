# TODO

## En cours

_Aucune tâche en cours._

## Parking (à reprendre plus tard)

### SPA pure — branche `feat/spa-mode`

Refactor SPA prêt (commit `0e86077`) mais bloqué par CORS Directus serveur Noirmont. À reprendre seulement si :
1. Steve a accès SSH au serveur Noirmont
2. Configure `CORS_ENABLED=true` + `CORS_ORIGIN=true` (ou liste explicite) dans le `.env` Directus
3. `docker compose down && up -d`

Une fois CORS OK, la branche `feat/spa-mode` peut être rebasée sur main et testée. **MAIS** : depuis qu'on est en SSR Vercel, le besoin du mode SPA est faible — le SSR couvre déjà les besoins de live data. À évaluer si valeur ajoutée réelle.

### Refactor `mapSoftware()` dupliqué

`server/api/software/index.get.ts` et `[id].get.ts` dupliquent `mapSoftware()`. Le code partagé existe dans la branche `feat/spa-mode` (`shared/directus-software.ts`). À cherry-picker ou refaire propre sur `main` (dette technique mineure).

### Migration Infomaniak Cloud Managé

Aujourd'hui hébergé sur Vercel (US). Bascule vers Infomaniak Cloud Managé (CH) pour respecter la règle de souveraineté quand le site CEJEF y sera aussi.

### Mise à jour packages CI

Workflow GitHub Pages désactivé mais workflows Claude/release encore actifs avec Node 20 (déprécié juin 2026). Mettre à jour vers `actions/checkout@v5`, etc.

### Tests UXNote flaky (3 échecs Playwright)

Tests `tests/e2e/uxnote.spec.ts` instables — non bloquants, à investiguer plus tard.

## Historique récent (pour référence)

- 2026-05-23 : feat alternatives Directus (PR #57, v0.21.0)
- 2026-05-23 : fix build GitHub Pages anonyme (PR #54, v0.20.2)
- 2026-05-23 : doc token frontend pas nécessaire (PR #59)
- 2026-05-23 : bascule Vercel SSR (PR #60) — déploiement live https://logiciels.vercel.app
