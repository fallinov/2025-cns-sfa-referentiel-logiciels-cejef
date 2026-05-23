# TODO

## En cours

_Aucune tâche en cours._

## Parking (à reprendre plus tard)

### SPA pure — branche `feat/spa-mode`

Refactor SPA prêt (commit `0e86077`) mais bloqué par CORS Directus serveur Noirmont. Depuis qu'on est en SSR Vercel, le besoin est faible — le SSR couvre déjà les besoins de live data. Cette branche reste pertinente uniquement si on bascule sur un hébergement sans serveur Node (retour static).

### Migration Infomaniak Cloud Managé

Aujourd'hui hébergé sur Vercel (US). Bascule vers Infomaniak Cloud Managé (CH) pour respecter la règle de souveraineté quand le site CEJEF y sera aussi.

### Tests UXNote flaky (3 échecs Playwright)

Tests `tests/e2e/uxnote.spec.ts` instables (toolbar UXNote, toast, traduction FR). Non bloquants en CI (`continue-on-error: true` sur le job e2e). À investiguer plus tard.

### Couvrir useTypewriter + useSoftwareNavigation + useSearchSuggestions

Ces 3 composables ont une couverture sous 55 % :
- `useTypewriter` : lifecycle hooks (onMounted/onUnmounted) — besoin de mount complet
- `useSoftwareNavigation` : prev/next/position non testés
- `useSearchSuggestions` : debounce difficile à tester sans fakeTimers

Phase optionnelle quand le besoin se présentera.

### Fixtures dédiées vs seed legacy `app/data/software-list.ts`

Le fichier (4002 lignes) sert encore de seed pour les tests unit. Décider :
- soit le synchroniser régulièrement avec Directus (risque de drift)
- soit remplacer par `tests/fixtures/software.ts` (15-20 logiciels représentatifs)

Pas urgent — les tests passent avec le seed actuel.

### Mise à jour packages CI (Node 24)

Workflows GitHub Pages désactivés mais `claude.yml` et `test.yml` utilisent Node 20 (déprécié juin 2026). Mettre à jour vers `actions/checkout@v5`, etc.

## Historique récent (pour référence)

- 2026-05-24 : tests phases 4-6 — composants + seuils CI + E2E LPD (PR #64) — 214 tests unit / 65 E2E / coverage 76.83 %
- 2026-05-23 : tests phases 0-3 — CI workflow + coverage v8 + server/composables/utils (PR #63)
- 2026-05-23 : tests alternatives + use-software (PR #62)
- 2026-05-23 : bascule Vercel SSR (PR #60) — https://logiciels.vercel.app
- 2026-05-23 : feat alternatives Directus (PR #57, v0.21.0)
- 2026-05-23 : fix build GitHub Pages anonyme (PR #54, v0.20.2)
