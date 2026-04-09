# Classification LGPD (GCN 2026)

## Niveaux de classification

| Niveau | Couleur | Signification | Critères |
|--------|---------|---------------|----------|
| **1** | 🟢 Vert | Usage autorisé | CH/UE hébergement + conforme RGPD + pas de tracking invasif |
| **2** | 🟠 Orange | Usage avec précautions | Entreprise US avec certification DPF OU analytics tiers |
| **3** | 🔴 Rouge | Usage interdit | Non conforme RGPD OU hébergement pays non adéquat (Chine, etc.) |

## Critères de classification détaillés

**Niveau 1 (Vert) - Critères cumulatifs :**
- Siège social en Suisse, UE, ou pays adéquat (Canada, UK, Corée du Sud, Japon)
- Hébergement des données en Suisse ou UE
- Politique de confidentialité conforme RGPD
- Pas de collecte de données invasive ni tracking publicitaire
- OU contrat DPA institutionnel CEJEF (ex: Microsoft 365)

**Niveau 2 (Orange) - Un des critères suivants :**
- Entreprise US avec certification EU-US Data Privacy Framework (DPF)
- Hébergement sur infrastructure US (AWS, Google Cloud) même pour entreprise UE → Cloud Act
- Utilisation d'analytics tiers (Google Analytics, etc.)
- Sous-traitants US dans la chaîne de traitement
- Certifications : SOC 2, ISO 27001, COPPA, FERPA

**Niveau 3 (Rouge) - Un des critères suivants :**
- Hébergement dans pays non adéquat (Chine, Russie, etc.)
- Entreprise chinoise (ByteDance, Tencent, etc.)
- Non-conformité RGPD avérée ou amendes RGPD
- Politique de confidentialité insuffisante ou absente
- Collecte de données extensive sans consentement

## Structure des données (`types/software.ts`)

```typescript
interface Software {
  // Classification LGPD
  lgpd: {
    hosting: 1 | 2 | 3
    rgpd: 1 | 2 | 3
    dataCollection: 1 | 2 | 3
  }
  certificationLevel: 1 | 2 | 3 | null  // Niveau global (max des 3)
  dataLocation: DataLocation

  // Support CEJEF
  supportedByCEJEF: boolean
  campusTraining: boolean
  requiresEduAccount?: boolean      // Badge bleu "@edu.jura.ch" (v0.8.0)
  requiresEdulog?: boolean          // Badge violet "Compte Edulog"
  approvedBySEN?: boolean           // Badge sky "Approuvé SEN" (v0.8.0)

  // Usage
  ageRestriction?: number           // Âge minimum (ex: 16)
  requiresParentalConsent?: boolean  // Badge ambre mineurs (v0.8.0)

  // Validation LGPD
  toValidate?: boolean
  remarque?: string
}
```

## Badges visuels

Tous avec tooltips au survol, couleurs = shade 500 des palettes custom :
- "Approuvé CEJEF" (green-500 #1D7A3F) : `supportedByCEJEF && campusTraining && certificationLevel === 1`
- "Approuvé SEN" (green-500 #1D7A3F) : `approvedBySEN`
- "Compte edu.jura.ch" (blue-500 #2563EB) : `requiresEduAccount && certificationLevel === 1`
- "Compte Edulog" (blue-500 #2563EB) : `requiresEdulog && certificationLevel === 1`
- "< 16 ans : accord parents" (orange-500 #946017) : `requiresParentalConsent`

**Règle** : Le `certificationLevel` détermine l'autorisation d'utiliser des données élèves :
- Niveau 1 → Données élèves autorisées
- Niveau 2/3 → Données élèves non autorisées

## Localisations de données (`DataLocation`)

```typescript
type DataLocation =
  // Pays adéquats (niveau 1 possible)
  | "Suisse" | "France" | "Allemagne" | "Union Européenne"
  | "Royaume-Uni" | "Canada" | "Corée du Sud" | "Local"

  // Avec infrastructure US (niveau 2)
  | "États-Unis" | "États-Unis (option UE)"
  | "Union Européenne (AWS)" | "Australie/États-Unis"

  // Pays non adéquats (niveau 3)
  | "Chine" | "Inconnu" | "Hors UE"
```

## Scripts d'automatisation (`scripts/`)

**`scripts/classify-lgpd.py`** - Analyse et classification automatique
```bash
python3 scripts/classify-lgpd.py
# Génère: scripts/lgpd-classifications.json
```

**`scripts/apply-lgpd-changes.py`** - Applique les classifications au fichier TS
```bash
python3 scripts/apply-lgpd-changes.py
# Modifie: app/data/software-list.ts
```

**`scripts/apply-remaining-lgpd.py`** - Classifications complémentaires (navigateurs, IA, dev tools)

## Workflow de classification d'un nouveau logiciel

1. **Recherche** - Identifier le siège social, politique de confidentialité, certifications
2. **Critères à vérifier** :
   - Localisation siège social
   - Localisation hébergement (AWS? Google Cloud? Azure?)
   - Certification DPF (vérifier sur https://www.dataprivacyframework.gov/)
   - Certifications sécurité (SOC 2, ISO 27001)
   - Conformité COPPA/FERPA (si éducatif)
   - Historique amendes RGPD
3. **Classification** - Appliquer les critères ci-dessus
4. **Documentation** - Ajouter `remarque` avec justification

## Cas particuliers

**Microsoft 365 (Word, Excel, Teams, etc.) → Niveau 1**
- CEJEF dispose d'un contrat DPA institutionnel
- Hébergement UE garanti contractuellement
- Sans ce contrat, ces produits seraient niveau 2

**Entreprises UE utilisant AWS/Google Cloud → Niveau 2**
- Ex: Babbel (Allemagne) utilise AWS → Cloud Act applicable
- L'infrastructure US soumet les données au droit américain

**Navigateurs → Variable**
- Brave → Niveau 1 (pas de stockage historique, bloque trackers)
- Chrome, Firefox, Edge → Niveau 2 (télémétrie vers US)

**Outils IA génératifs → Niveau 2 minimum**
- ChatGPT, Claude, Gemini → Niveau 2 (données traitées US)
- Mistral Le Chat → Niveau 1 (entreprise française, hébergement UE)

## Logiciels à valider manuellement (`toValidate: true`)

Certains logiciels nécessitent une vérification humaine :
- Service discontinué ou en transition
- Acquisition récente (changement de politique)
- Information insuffisante disponible

```bash
# Lister les logiciels à valider
grep -B 20 "toValidate: true" app/data/software-list.ts | grep "name:"
```

## Modifier une classification

Pour modifier une classification, mettre à jour dans `app/data/software-list.ts` :
1. L'objet `lgpd` (hosting, rgpd, dataCollection)
2. Le `certificationLevel` (doit être le max des 3 valeurs lgpd)
3. La `dataLocation` (localisation précise)
4. La `remarque` (justification obligatoire)
5. Optionnel: `toValidate: true` si révision nécessaire
