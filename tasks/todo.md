# TODO — Logiciels alternatifs (relation Directus)

## Contexte

V1 du référentiel : la section « Logiciels similaires » est actuellement un calcul auto côté frontend (scoring par catégorie + activité), retiré du périmètre V1 dans le PV 06.05.2026 pour cause de désalignement avec la promesse « manuel, vertes uniquement ».

## Décisions métier validées (23.05.2026)

1. **Cibles** : alternatives = niveaux 1 (vert) **OU** 2 (orange). Niveau 3 (rouge) exclu.
2. **Direction** : **unidirectionnelle**. Si Word → Google Docs, l'inverse n'est pas auto.
3. **Fallback** : aucune alternative définie → section **vide avec message** explicite (pas de calcul auto de secours).

## Plan d'implémentation

### 1. Directus — schéma M2M auto-référentiel
- Junction `software_alternatives` :
  - `id` UUID auto
  - `software_id` M2O → `software` (logiciel source — celui qui possède les alternatives)
  - `alternative_id` M2O → `software` (logiciel proposé comme alternative)
- Sur `software` : alias M2M `alternatives` (read-only via junction)
- `on_delete: CASCADE` côté junction si `software_id` ou `alternative_id` supprimé (pas RESTRICT — sinon on bloque la suppression d'un logiciel parce qu'il est cité ailleurs)
- Permissions Public : `read` sur junction + alias `alternatives`
- Permissions CNS-writer : `create / update / delete` sur junction

### 2. Code applicatif
- `types/software.ts` : ajouter `alternatives?: string[]` (UUIDs Directus)
- `server/utils/directus.ts` : ajouter le type junction dans `DirectusSoftware`
- `server/api/software/index.get.ts` et `[id].get.ts` : étendre `fields` pour inclure `alternatives.alternative_id.id` + mapping
- `app/composables/useSimilarSoftware.ts` → renommer `useAlternatives` :
  - Lit `software.alternatives` (IDs)
  - Résout via `useSoftware()` la liste complète
  - Filtre certificationLevel ≤ 2 (sécurité : double-check même si Directus le garantit)
  - Pas de scoring, pas de slice — la saisie manuelle décide l'ordre/le nombre
- `app/components/SoftwareDetailSimilar.vue` :
  - Si liste vide → message « Pas d'alternative validée pour ce logiciel »
  - Conserver le tri par niveau ASC dans les alternatives présentes

### 3. Tests
- `tests/unit/similar-software.test.ts` : adapter à la nouvelle source
  - Cas 1 : liste vide → composant affiche le message
  - Cas 2 : liste avec verts + oranges → tri par niveau ASC
  - Cas 3 : pas de filtre par scoring (le manuel prime)
- Playwright : déjà couvert par les tests de page détail (déjà adaptés v0.20.1)

### 4. Documentation
- `CLAUDE.md` : section « Alternatives » dans Data Architecture
- `CNS/projets/referentiel/PROCEDURE-DIRECTUS-V1.md` : section « Définir des alternatives »

### 5. Release
- `feat:` → bump minor → v0.21.0
- Tag + GitHub Release avec changelog

## Hypothèses (à signaler dans le PR si non validées explicitement)

- **CASCADE vs RESTRICT** : choisi CASCADE pour ne pas bloquer une suppression de logiciel parce qu'il est cité comme alternative ailleurs. Décision implémentation, pas demandée explicitement.
- **Limite d'alternatives** : pas de limite imposée. Le saisisseur décide. UI ne tronque pas.
- **Ordre d'affichage** : tri par niveau ASC (verts d'abord). Pas d'ordre manuel pour l'instant — si Steve veut un ordre custom, ajouter `sort` int dans la junction (V1.1).
