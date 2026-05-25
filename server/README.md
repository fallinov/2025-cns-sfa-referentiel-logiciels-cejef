# Server — Endpoints Nuxt vers Directus

Ce dossier contient les **endpoints serveur Nuxt** qui font le pont entre le frontend public et l'API Directus.

## Architecture

```
[Browser/Nuxt client]
         │
         │ fetch('/api/software')
         ▼
[Server Nuxt — /api/software]
         │
         │ Directus SDK (server-side, token injecté)
         ▼
[Directus REST API — http://46.140.144.167:8055]
         │
         ▼
[PostgreSQL]
```

**Pourquoi un proxy serveur** : le `DIRECTUS_TOKEN` ne doit **jamais** être exposé au client. Il reste dans `runtimeConfig` côté serveur uniquement. Le client appelle `/api/software` (notre serveur Nuxt), qui appelle Directus avec le token injecté.

## Endpoints disponibles

### `GET /api/software`

Retourne la liste des logiciels **publiés** (`status: published`) avec les catégories et activités pédagogiques résolues (M2M).

**Réponse** : `Software[]` (type historique du frontend)

Le mapping Directus → Software fait :
- `lgpd_hosting/rgpd/data_collection` → objet imbriqué `lgpd: { hosting, rgpd, dataCollection }`
- `certificationLevel` calculé : `Math.max(lgpd.*)` (1=vert, 2=orange, 3=rouge)
- snake_case → camelCase pour tous les champs
- M2M `categories` et `pedagogical_activities` aplatis en `string[]` (noms uniquement)

### `GET /api/software/:id`

Retourne le détail d'un logiciel par UUID. 404 si non trouvé ou non publié.

## Configuration requise

`.env` à la racine du projet :

```
DIRECTUS_URL=http://46.140.144.167:8055
DIRECTUS_TOKEN=<token>
```

Variables consommées via `useRuntimeConfig()` (server-only, jamais exposées au client).

## Limites V1.1 (à corriger en V1.2)

1. **Champs retirés du schéma Directus** mais encore présents dans `Software` type historique : `supportedByCEJEF`, `cejefFavorite`, `campusTraining`, `disciplines` (toujours `[]`, `false`). À retirer du type front en V1.2.
2. **`dataLocation`** : la nouvelle énumération Directus (`switzerland`, `eu_eea`, …) ne correspond pas aux anciennes valeurs (`Suisse`, `France`, …). Le mapping actuel garde la valeur Directus brute — le frontend doit être adapté pour les nouvelles valeurs.
3. ~~`contractual_safeguards` et `funding` non exposés.~~ Fait : `contractualSafeguards` + `fundedByCejef` + `fundedBySEN` mappés et affichés dans la fiche pratique. `funding` (csv) supprimé de Directus au profit de deux booléens.

## Migration future du frontend

Pour basculer le frontend de `software-list.ts` statique vers ces endpoints, modifier `app/composables/useSoftware.ts` pour utiliser `useFetch('/api/software')` au lieu de l'import statique. Le store Pinia consomme déjà `useSoftware().getSoftwareList()` — il suffit de rendre la chaîne asynchrone.
