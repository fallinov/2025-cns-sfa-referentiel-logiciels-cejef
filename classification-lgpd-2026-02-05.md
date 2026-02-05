# Classification LGPD - 05/02/2026

## Résumé Exécutif

- **Total analysé** : 30/123 logiciels (Lots 1-2)
- 🟢 **VERT** : 12 logiciels
- 🟠 **ORANGE** : 15 logiciels
- 🔴 **ROUGE** : 2 logiciels
- ⚪ **À valider** : 1 logiciel

---

## Critères de Classification GCN 2026

| Couleur | Niveau | Conditions |
|---------|--------|------------|
| 🟢 VERT | Nominatif OK | Hébergement CH/UE + RGPD conforme + Pas de tracking invasif + (Si US: contrat CEJEF) |
| 🟠 ORANGE | Anonymat requis | Entreprise US sans contrat OU Analytics tiers OU Version gratuite avec pub |
| 🔴 ROUGE | Interdit | Non-conformité LGPD/RGPD OU Hébergement pays non conforme OU Vente données |

---

## LOT 1 : Adobe Acrobat → Coggle (15 logiciels)

### Fiches Détaillées

---

#### 1. ADOBE ACROBAT

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Adobe Inc. | Site officiel |
| **Pays siège** | États-Unis (San Jose, CA) | Site officiel |
| **Hébergement** | US + UE (options régionales) | Adobe Trust Center |
| **Conformité RGPD** | ✅ Conforme | adobe.com/trust/compliance |
| **Certifications** | SOC 2, ISO 27001, ISO 27017, ISO 27018, C5 (Allemagne) | Adobe Compliance List |
| **Analytics tiers** | Oui (Adobe Analytics) | Privacy Policy |
| **DPA disponible** | ✅ Oui | Standard Contractual Clauses |
| **Modèle économique** | Payant (abonnement) | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise US soumise au Cloud Act. Bien que RGPD-conforme avec certifications solides, l'hébergement par défaut est hors UE. Analytics propriétaires présents.
**Recommandation** : Usage avec données anonymisées ou vérifier si contrat CEJEF existe.

---

#### 2. ATLASSIAN (JIRA, CONFLUENCE, TRELLO)

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Atlassian Corporation Plc | Site officiel |
| **Pays siège** | Australie (Sydney) / États-Unis | Site officiel |
| **Hébergement** | Multi-régions : US, UE, Australie, UK, Suisse, Canada, Japon, Inde, Singapour, Corée | atlassian.com/software/data-residency |
| **Conformité RGPD** | ✅ Conforme | atlassian.com/trust/compliance/resources/gdpr |
| **Data Residency** | ✅ Disponible (UE, Suisse) | Documentation officielle |
| **Analytics tiers** | Limité | Privacy Policy |
| **DPA disponible** | ✅ Oui | Customer Agreement |
| **Modèle économique** | Freemium | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Data Residency disponible en Suisse et UE. RGPD conforme. Pas de contrat CEJEF → reste ORANGE.
**Recommandation** : Usage avec données anonymisées.

---

#### 3. AZENDOO

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Azendoo SARL | LeadIQ |
| **Pays siège** | France | LeadIQ |
| **Hébergement** | Inconnu (probablement Cloudflare) | Tech stack |
| **Conformité RGPD** | ❓ Non documenté | Aucune page GDPR trouvée |
| **Analytics tiers** | Google Analytics | Tech stack |
| **DPA disponible** | ❓ Non trouvé | - |
| **Modèle économique** | Freemium | - |
| **Statut entreprise** | ⚠️ Peu d'activité récente (2019) | Recherches web |

**Classification** : 🔴 **ROUGE**
**Justification** : Aucune documentation RGPD trouvée. Entreprise apparemment inactive depuis 2019. Google Analytics présent. Pas de DPA disponible. Données de conformité insuffisantes.
**Recommandation** : Usage interdit - privilégier alternatives (Trello, Notion, etc.)

---

#### 4. BABBEL

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Babbel GmbH | Site officiel |
| **Pays siège** | Allemagne (Berlin) | babbel.com/legal/privacy |
| **Hébergement** | UE (principalement) + transferts US | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme | Privacy Policy détaillée |
| **Analytics tiers** | Oui (non spécifiés) | Cookie Policy |
| **DPA disponible** | ✅ Oui (Babbel for Business) | babbelforbusiness.com |
| **Modèle économique** | Payant (abonnement) | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise allemande, siège UE, politique de confidentialité RGPD complète. Traite les données personnelles conformément au RGPD. DPA disponible pour entreprises.
**Note** : Classification actuelle (Rouge) incorrecte - doit être mise à jour vers Vert.

---

#### 5. BDnF (Application)

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Bibliothèque nationale de France (BnF) | bdnf.bnf.fr |
| **Pays siège** | France | Institution publique |
| **Hébergement** | France / UE | BnF infrastructure |
| **Conformité RGPD** | ✅ Conforme | Contact DPO: dpd@bnf.fr |
| **Analytics tiers** | Xiti (anonymisé) | Privacy Policy BnF |
| **DPA disponible** | N/A (institution publique) | - |
| **Modèle économique** | Gratuit | - |

**Classification** : 🟢 **VERT**
**Justification** : Institution publique française. Hébergement UE. RGPD conforme avec DPO désigné. Analytics anonymisés.
**Note** : Classification actuelle (Vert) correcte.

---

#### 6. BOOK CREATOR

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Tools for Schools Inc. / Limited | bookcreator.com |
| **Pays siège** | UK / US | Privacy Policy |
| **Hébergement** | Google Cloud | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme | bookcreator.com/privacy-policy/gdpr |
| **Certifications** | SOC 2, COPPA, FERPA | Annonce Oct 2025 |
| **Analytics tiers** | Non spécifié | - |
| **DPA disponible** | ✅ Oui | Data Processing Addendum |
| **Modèle économique** | Freemium | - |
| **Publicité** | ❌ Aucune | "We don't advertise" |
| **Vente données** | ❌ Non | Privacy Policy |

**Classification** : 🟢 **VERT**
**Justification** : RGPD, COPPA, FERPA conformes. SOC 2 certifié. Pas de publicité ni vente de données. DPA disponible. Privacy by design.
**Note** : Excellente documentation privacy pour l'éducation.

---

#### 7. BOOKWIDGETS

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Kidimedia BV | bookwidgets.com/privacy |
| **Pays siège** | Belgique (Kortenberg) | Mentions légales |
| **Hébergement** | UE | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme | Privacy Policy GDPR |
| **Analytics tiers** | Non spécifié | Cookie Policy |
| **DPA disponible** | ✅ Implicite | Privacy Policy |
| **Modèle économique** | Freemium | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise belge, siège UE, politique de confidentialité RGPD conforme. Hébergement UE.

---

#### 8. BOOKTOOLBOX

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Inconnu | - |
| **Pays siège** | Inconnu | - |
| **Hébergement** | Inconnu | - |
| **Conformité RGPD** | ❓ Non documenté | Aucune info trouvée |

**Classification** : ⚪ **À VALIDER**
**Justification** : Données insuffisantes. Aucune information RGPD trouvée.
**Action requise** : Identifier l'éditeur et obtenir documentation privacy.

---

#### 9. C-MAP TOOLS (CmapTools)

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | IHMC (Institute for Human & Machine Cognition) | cmap.ihmc.us |
| **Pays siège** | États-Unis (Floride) | Institut de recherche |
| **Hébergement** | US (IHMC Public Cmaps) ou Local | Terms of Service |
| **Conformité RGPD** | ❓ Non mentionné | Terms of Service basiques |
| **Analytics tiers** | Non spécifié | - |
| **DPA disponible** | ❌ Non | - |
| **Modèle économique** | Gratuit (licence commerciale OK) | cmap.ihmc.us |

**Classification** : 🟠 **ORANGE**
**Justification** : Institut de recherche US. Pas de mention RGPD explicite. Version desktop possible sans cloud (réduit risques). Cloud hébergé aux US.
**Recommandation** : Privilégier version desktop offline. Pour cloud, utiliser données anonymisées.

---

#### 10. CANVA

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Canva Pty Ltd | canva.com |
| **Pays siège** | Australie (Sydney) | Site officiel |
| **Hébergement** | Multi-régions (AWS) | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme | canva.com/policies/privacy-policy |
| **Certifications** | SOC 2 (probable) | Trust Center |
| **Analytics tiers** | Oui (analytics internes + tiers) | Privacy Policy |
| **DPA disponible** | ✅ Oui | Terms of Use |
| **Modèle économique** | Freemium | - |
| **Publicité** | Oui (version gratuite) | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise australienne avec présence US. RGPD conforme mais analytics tiers présents. Version gratuite avec personnalisation publicitaire.
**Recommandation** : Usage avec données anonymisées. Version payante préférable si données personnelles.

---

#### 11. CLASSROOMSCREEN

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Classroomscreen B.V. | classroomscreen.com/legal/terms |
| **Pays siège** | Pays-Bas (Bunnik) | Mentions légales |
| **Hébergement** | UE | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme | classroomscreen.com/legal/privacy-policy |
| **Analytics tiers** | Limité | Privacy Policy |
| **Publicité** | ❌ Non | "We do not advertise" |
| **Vente données** | ❌ Non | "We never sell personal information" |
| **DPA disponible** | ✅ Implicite | Privacy Policy |
| **Modèle économique** | Freemium | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise néerlandaise (UE). Pas de publicité ni vente de données. RGPD conforme. Usage possible sans compte.

---

#### 12. CLASSTOOLS.NET

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Russel Tarr (individuel) | classtools.net/privacy.php |
| **Pays siège** | Royaume-Uni | Privacy Policy |
| **Hébergement** | UK | Privacy Policy |
| **Conformité RGPD** | ✅ Minimal conforme | UK GDPR |
| **Analytics tiers** | YouTube API (optionnel) | Privacy Policy |
| **DPA disponible** | ❌ Non formalisé | - |
| **Modèle économique** | Freemium | - |
| **Données collectées** | Minimales (login/billing pour payants) | Privacy Policy |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise UK (post-Brexit). Données minimales collectées. YouTube API pour certaines fonctions. Pas de DPA formel.
**Recommandation** : Usage avec précaution pour fonctions avec YouTube. OK pour usage sans compte.

---

#### 13. CLICKVIEW

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | ClickView Pty Ltd | clickvieweducation.com |
| **Pays siège** | Australie | Site officiel |
| **Hébergement** | AWS (multi-régions) | Sub-processors list |
| **Conformité RGPD** | ✅ Conforme | clickvieweducation.com/en-gb/legal/gdpr |
| **Certifications** | GDPR, UK GDPR, COPPA, FERPA, PIPEDA | Privacy Policy |
| **Analytics tiers** | Google Analytics, Looker, Snowflake | Sub-processors |
| **DPA disponible** | ✅ Oui | Data Processing Agreement |
| **Modèle économique** | Payant (abonnement institutionnel) | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise australienne. RGPD conforme avec DPA. Cependant, utilise Google Analytics et autres analytics tiers (Snowflake, Looker).
**Recommandation** : Vérifier configuration analytics. Usage institutionnel avec DPA signé.

---

#### 14. CLIP STUDIO PAINT

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | CELSYS, Inc. | celsys.com |
| **Pays siège** | Japon | Site officiel |
| **Hébergement** | Japon (cloud), Local (desktop) | Privacy Policy |
| **Conformité RGPD** | ✅ Partiel | celsys.com/en/information/privacy |
| **Analytics tiers** | Non spécifié | - |
| **DPA disponible** | ❌ Non mentionné | - |
| **Modèle économique** | Payant / Abonnement | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise japonaise (pays adéquat RGPD). Privacy Policy basique. Version desktop préférable pour minimiser données cloud.
**Recommandation** : Privilégier version desktop offline. Pour cloud, données anonymisées.

---

#### 15. COGGLE

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | CoggleIt Limited | coggle.it/terms |
| **Pays siège** | Royaume-Uni | Companies House No. 9030487 |
| **Hébergement** | UK/UE | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme (UK GDPR) | coggle.it/privacy |
| **Analytics tiers** | Non mentionné | - |
| **Publicité** | ❌ Non | Privacy Policy |
| **Vente données** | ❌ Non | "We will never give or sell your private information" |
| **DPA disponible** | ❌ Non formalisé | - |
| **Modèle économique** | Freemium | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise UK (post-Brexit, mais UK GDPR). Ne vend pas les données. Cependant, pas de DPA formel et statut UK post-Brexit.
**Recommandation** : Usage autorisé avec données non sensibles.

---

## LOT 2 : BlinkLearning → Druide Antidote (15 logiciels)

### Fiches Détaillées

---

#### 16. BLINKLEARNING

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | BlinkLearning S.L. | blinklearning.com |
| **Pays siège** | Espagne (Madrid) | Legal Notice |
| **Hébergement** | UE | Infrastructure espagnole |
| **Conformité RGPD** | ✅ Conforme | Legal Notice mentionnant RGPD |
| **Analytics tiers** | Non spécifié | - |
| **DPA disponible** | ✅ Implicite | - |
| **Modèle économique** | Payant | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise espagnole (UE). Mention RGPD dans legal notice. Hébergement UE. Manuels numériques pour éducation.

---

#### 17. BLUEMAIL

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Blix, Inc. | bluemail.me |
| **Pays siège** | États-Unis | Privacy Policy |
| **Hébergement** | Ne stocke PAS les emails sur serveurs | Security page |
| **Conformité RGPD** | ✅ Conforme | bluemail.me/gdpr |
| **Certifications** | OAuth2, SSL/TLS, S/MIME, PGP | Security page |
| **Analytics tiers** | Non mentionné | - |
| **DPA disponible** | ✅ Oui | Data Processing Addendum |
| **Modèle économique** | Freemium | - |
| **Vente données** | ❌ Non | "We do not sell your data" |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise US mais architecture privacy-first (pas de stockage emails sur serveurs). RGPD/CCPA conforme avec DPA. Architecture sécurisée.
**Recommandation** : Usage acceptable avec précautions standard pour entreprises US.

---

#### 18. BOOKILI

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Inconnu (probablement France) | - |
| **Pays siège** | À vérifier | - |
| **Hébergement** | Inconnu | - |
| **Conformité RGPD** | ❓ Non documenté | Aucune page privacy trouvée |

**Classification** : 🟠 **ORANGE**
**Justification** : Données insuffisantes. À vérifier.
**Action requise** : Vérifier éditeur et politique privacy.

---

#### 19. CALENDLY

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Calendly, LLC | calendly.com |
| **Pays siège** | États-Unis | Privacy Notice |
| **Hébergement** | Google Cloud Services (GCS) | Security page |
| **Conformité RGPD** | ✅ Conforme | calendly.com/legal/privacy-notice |
| **Certifications** | SOC 2, ISO 27001, PCI Level 1 | Security page |
| **Analytics tiers** | Non spécifié | - |
| **DPA disponible** | ✅ Oui | Data Processing Addendum |
| **Modèle économique** | Freemium | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise US avec bonnes certifications (SOC 2, ISO 27001). RGPD conforme avec DPA. Cependant, soumis au Cloud Act.
**Recommandation** : Usage avec données anonymisées pour planification non sensible.

---

#### 20. CALENGOO

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Gunia UG | calengoo.com |
| **Pays siège** | Allemagne | Privacy Policy |
| **Hébergement** | Local (sync avec Google/Outlook) | Architecture |
| **Conformité RGPD** | ✅ Conforme | DSGVO compliant |
| **Analytics tiers** | Minimal | - |
| **DPA disponible** | N/A | App locale |
| **Modèle économique** | Payant | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise allemande. App calendrier locale synchronisant avec providers existants. Pas de stockage cloud propre. DSGVO conforme.

---

#### 21. CAPCUT

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | ByteDance Ltd | capcut.com |
| **Pays siège** | Chine | Site officiel |
| **Hébergement** | Chine / Singapour | Investigation |
| **Conformité RGPD** | ❌ **PROBLÉMATIQUE** | Amende TikTok 530M€ (mai 2025) |
| **Collecte données** | ⚠️ Biométrie, reconnaissance faciale | Class action US |
| **DPA disponible** | ❌ Non fiable | - |
| **Modèle économique** | Gratuit | - |
| **Lien gouvernement chinois** | ⚠️ Oui | Obligations légales chinoises |

**Classification** : 🔴 **ROUGE**
**Justification** : ByteDance (propriétaire TikTok) avec siège en Chine. Amende RGPD 530M€ en mai 2025 pour transferts illégaux vers Chine. Collecte de données biométriques. Obligations de partage avec gouvernement chinois.
**Recommandation** : **USAGE INTERDIT**. Privilégier alternatives (DaVinci Resolve, iMovie, etc.)

---

#### 22. CARD2BRAIN

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | webapps Burgdorf GmbH | card2brain.ch |
| **Pays siège** | Suisse (Burgdorf) | Privacy Policy |
| **Hébergement** | Suisse | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme | Swiss DPA + GDPR |
| **DPO** | Mathias Zaugg | Privacy Policy |
| **Analytics tiers** | Non mentionné | - |
| **DPA disponible** | ✅ Implicite | Privacy Policy |
| **Modèle économique** | Freemium | - |
| **Vente données** | ❌ Non | "We do not rent or sell your personal data" |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise suisse avec hébergement en Suisse. Conforme Swiss DPA et RGPD. Ne vend pas les données. DPO désigné. Excellente solution pour flashcards.

---

#### 23. CLARO SPEAK PLUS / CLARO PDF PRO

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Claro Software Limited | clarosoftware.com |
| **Pays siège** | Royaume-Uni | Terms & Conditions |
| **Hébergement** | Local (apps iOS) | Architecture |
| **Conformité RGPD** | ✅ UK GDPR | Terms of Service |
| **Analytics tiers** | Non spécifié | - |
| **DPA disponible** | ❌ Non formalisé | - |
| **Modèle économique** | Payant | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Entreprise UK (post-Brexit). Apps d'accessibilité. Traitement principalement local sur appareil.
**Recommandation** : OK pour usage éducatif accessibilité.

---

#### 24. CLASSCRAFT

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Houghton Mifflin Harcourt (HMH) | classcraft.com |
| **Pays siège** | États-Unis (acquisition) | Site officiel |
| **Origine** | Canada (Québec) | Historique |
| **Hébergement** | US/Canada | Infrastructure HMH |
| **Conformité RGPD** | ✅ Partiel | Privacy Policy |
| **COPPA** | ✅ Conforme | Common Sense Privacy |
| **Analytics tiers** | Non spécifié | - |
| **DPA disponible** | ✅ Via HMH | - |
| **Modèle économique** | Freemium | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Maintenant propriété HMH (US). COPPA conforme pour enfants. Gamification éducative.
**Recommandation** : Usage avec pseudonymes recommandé.

---

#### 25. CLASSTIME

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Classtime AG | classtime.com |
| **Pays siège** | Suisse (Zürich) | Privacy Policy |
| **Hébergement** | Suisse/UE | Infrastructure |
| **Conformité RGPD** | ✅ Conforme | classtime.com/en/privacy |
| **Représentant UE** | Swiss Infosec (Deutschland) GmbH | Privacy Policy |
| **Analytics tiers** | Limité | - |
| **DPA disponible** | ✅ Oui | Privacy Policy |
| **Modèle économique** | Freemium | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise suisse avec représentant UE. Conforme Swiss DPA et RGPD. Excellent outil quiz/évaluation pour éducation.

---

#### 26. CODE.ORG

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Code.org (nonprofit) | code.org |
| **Pays siège** | États-Unis | Privacy Policy |
| **Hébergement** | US | Infrastructure |
| **Conformité RGPD** | ✅ Bonne pratique | code.org/privacy |
| **COPPA/FERPA** | ✅ Conforme | Privacy Policy |
| **Publicité** | ❌ Aucune | "We do not display any ads" |
| **Vente données** | ❌ Non | "We do not sell any Personal Information" |
| **DPA disponible** | ✅ Pour écoles | Privacy Policy |
| **Modèle économique** | Gratuit (nonprofit) | - |

**Classification** : 🟠 **ORANGE**
**Justification** : Nonprofit US avec excellentes pratiques privacy (pas pub, pas vente). COPPA/FERPA conforme. Cependant, hébergement US sans data residency UE.
**Recommandation** : Excellent pour apprentissage programmation. Usage avec pseudonymes si possible.

---

#### 27. DICTALY

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Non identifié clairement | dictaly.com |
| **Pays siège** | France (probable) | Langue/contenu |
| **Hébergement** | À vérifier | - |
| **Conformité RGPD** | ❓ Non documenté | Pas de page privacy trouvée |

**Classification** : 🟠 **ORANGE**
**Justification** : Service de dictées françaises. Documentation privacy insuffisante.
**Action requise** : Vérifier politique privacy.

---

#### 28. DOODLE

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Doodle AG (TX Group) | doodle.com |
| **Pays siège** | Suisse | Site officiel |
| **Hébergement** | AWS Irlande (UE) | Security page |
| **Conformité RGPD** | ✅ Conforme | help.doodle.com GDPR |
| **Certifications** | SOC 2 Type II, Cyber Verify Level 3 | Security page |
| **Analytics tiers** | Limité | - |
| **DPA disponible** | ✅ Oui | Privacy Policy |
| **Modèle économique** | Freemium | - |
| **Chiffrement** | ✅ Transit + Repos | Security page |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise suisse avec hébergement AWS Irlande (UE). SOC 2 certifié. RGPD conforme. DPO désigné. Excellent pour planification.

---

#### 29. DRIVE INFOMANIAK (kDrive)

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Infomaniak Network SA | infomaniak.com |
| **Pays siège** | Suisse (Genève) | Site officiel |
| **Hébergement** | Suisse (datacenters propres) | GDPR page |
| **Conformité RGPD** | ✅ Conforme | infomaniak.com/en/legal/general-data-protection-regulation |
| **Souveraineté** | ✅ 100% souverain | Marketing |
| **Analytics tiers** | Non | - |
| **DPA disponible** | ✅ Oui | - |
| **Modèle économique** | Freemium | - |
| **Certifications** | ISO 27001 (probable) | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise suisse avec datacenters en Suisse. 100% souverain. RGPD conforme. Alternative idéale à Google Drive/Dropbox pour stockage cloud.
**Note** : Excellente alternative européenne aux clouds US.

---

#### 30. DRUIDE ANTIDOTE

| Critère | Valeur | Source |
|---------|--------|--------|
| **Éditeur** | Druide informatique inc. | druide.com |
| **Pays siège** | Canada (Québec) | Privacy Policy |
| **Hébergement** | Québec (serveurs Druide) | Privacy Policy |
| **Conformité RGPD** | ✅ Conforme | druide.com/en/privacy-policy |
| **Loi 25 Québec** | ✅ Conforme | Législation locale |
| **Traitement local** | ✅ Antidote 12 desktop | Documentation |
| **Analytics tiers** | Non | - |
| **DPA disponible** | ✅ Implicite | Privacy Policy |
| **Modèle économique** | Payant | - |

**Classification** : 🟢 **VERT**
**Justification** : Entreprise québécoise avec serveurs au Québec. Conforme Loi 25 et RGPD. Version desktop traite textes localement (pas de transfert). Correcteur grammatical de référence pour le français.
**Note** : Pour Antidote+/Web, textes de reformulation transmis mais non stockés.

---

## Résumé Global (Lots 1-2)

### Par Couleur

#### 🟢 VERT (Nominatif OK) - 12 logiciels

| Logiciel | Éditeur | Pays | Hébergement | Justification |
|----------|---------|------|-------------|---------------|
| Babbel | Babbel GmbH | 🇩🇪 Allemagne | UE | Entreprise UE, RGPD |
| BDnF | BnF | 🇫🇷 France | France | Institution publique FR |
| Book Creator | Tools for Schools | 🇬🇧 UK | Google Cloud | SOC 2, COPPA, FERPA, GDPR |
| BookWidgets | Kidimedia BV | 🇧🇪 Belgique | UE | Entreprise UE |
| Classroomscreen | Classroomscreen B.V. | 🇳🇱 Pays-Bas | UE | Pas pub/vente |
| BlinkLearning | BlinkLearning S.L. | 🇪🇸 Espagne | UE | Entreprise UE |
| Calengoo | Gunia UG | 🇩🇪 Allemagne | Local | App locale |
| Card2Brain | webapps Burgdorf | 🇨🇭 Suisse | Suisse | Swiss DPA + RGPD |
| Classtime | Classtime AG | 🇨🇭 Suisse | CH/UE | Swiss DPA + RGPD |
| Doodle | Doodle AG | 🇨🇭 Suisse | AWS Irlande | SOC 2, RGPD |
| Drive Infomaniak | Infomaniak | 🇨🇭 Suisse | Suisse | 100% souverain |
| Druide Antidote | Druide inc. | 🇨🇦 Québec | Québec | Loi 25 + RGPD |

#### 🟠 ORANGE (Anonymat requis) - 15 logiciels

| Logiciel | Éditeur | Pays | Raison principale |
|----------|---------|------|-------------------|
| Adobe Acrobat | Adobe Inc. | 🇺🇸 US | Cloud Act |
| Atlassian | Atlassian | 🇦🇺🇺🇸 AU/US | Pas contrat CEJEF |
| C-MAP Tools | IHMC | 🇺🇸 US | Pas RGPD explicite |
| Canva | Canva Pty | 🇦🇺 Australie | Analytics tiers |
| ClassTools.net | R. Tarr | 🇬🇧 UK | UK post-Brexit |
| ClickView | ClickView Pty | 🇦🇺 Australie | Google Analytics |
| Clip Studio Paint | CELSYS | 🇯🇵 Japon | Privacy basique |
| Coggle | CoggleIt Ltd | 🇬🇧 UK | Pas DPA formel |
| BlueMail | Blix Inc. | 🇺🇸 US | Cloud Act |
| Bookili | ? | ? | Données insuffisantes |
| Calendly | Calendly LLC | 🇺🇸 US | Cloud Act |
| Claro Software | Claro Software | 🇬🇧 UK | UK post-Brexit |
| Classcraft | HMH | 🇺🇸 US | Cloud Act |
| Code.org | Code.org | 🇺🇸 US | Nonprofit US |
| Dictaly | ? | 🇫🇷 France? | Docs insuffisantes |

#### 🔴 ROUGE (Interdit) - 2 logiciels

| Logiciel | Éditeur | Pays | Raison |
|----------|---------|------|--------|
| Azendoo | Azendoo SARL | 🇫🇷 France | Inactive, pas RGPD |
| **CapCut** | **ByteDance** | 🇨🇳 **Chine** | **Amende 530M€, transferts Chine, biométrie** |

#### ⚪ À VALIDER - 1 logiciel

| Logiciel | Question |
|----------|----------|
| BookToolbox | Identifier éditeur |

---

## Corrections à Apporter dans software-list.ts

| Logiciel | Classification actuelle | Nouvelle classification | Action |
|----------|------------------------|------------------------|--------|
| Babbel | 🔴 Rouge (3) | 🟢 Vert (1) | Entreprise allemande |
| BlinkLearning | 🟠 Orange (2) | 🟢 Vert (1) | Entreprise espagnole |
| Calengoo | 🟢 Vert (1) | 🟢 Vert (1) | OK - confirmer dataLocation |
| CapCut | 🔴 Rouge (3) | 🔴 Rouge (3) | OK - confirmer |

---

## Prochaines Étapes

- [x] Lot 1 complété (15 logiciels)
- [x] Lot 2 complété (15 logiciels)
- [ ] Lot 3 : Duolingo → Genially
- [ ] Lots 4-12 à suivre
- [ ] Mise à jour `software-list.ts` après validation

---

*Rapport mis à jour le 05/02/2026 - Lots 1-2*
