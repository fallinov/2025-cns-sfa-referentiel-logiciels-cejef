import type { DataProtectionTheme } from "~~/types/data-protection"

export const dataProtectionThemes: DataProtectionTheme[] = [
  // ─── 1. Cadre légal ───
  {
    id: "cadre-legal",
    title: "Cadre légal",
    shortTitle: "Cadre légal",
    icon: "i-lucide-scale",
    description: "Bases légales sur le traitement des données scolaires dans le canton du Jura.",
    sections: [
      {
        id: "reecriture-leo",
        title: "Réécriture de la loi sur l'école obligatoire",
        icon: "i-lucide-book-open",
        items: [
          {
            id: "reecriture-leo-contenu",
            title: "Réécriture de la LEO",
            icon: "i-lucide-book-open",
            description: "La réécriture de la LEO vise à intégrer des bases légales sur le traitement des données scolaires. Ces modifications permettent aux directions, aux enseignants, au Service de l'enseignement et au Service de la formation postobligatoire de traiter des données personnelles et sensibles concernant les élèves jurassiens. Elles garantissent également que ces données soient traitées selon les exigences de la nouvelle loi fédérale sur la protection des données.",
            resources: [
              { title: "Loi fédérale sur la protection des données (nLPD)", url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr", source: "Fedlex", type: "link" },
              { title: "LEO actuellement en vigueur", url: "https://rsju.jura.ch/fr/viewdocument.html?idn=20067&id=36924", source: "RSJU", type: "link" }
            ]
          }
        ]
      }
    ]
  },

  // ─── 2. Ordonnances et recommandations ───
  {
    id: "ordonnances-recommandations",
    title: "Ordonnances et recommandations",
    shortTitle: "Ordonnances",
    icon: "i-lucide-file-text",
    description: "Directives cantonales et droit à l'image dans les établissements scolaires.",
    sections: [
      {
        id: "directives-cantonales",
        title: "Directives cantonales",
        icon: "i-lucide-landmark",
        items: [
          {
            id: "directives-cantonales-contenu",
            title: "Directives cantonales",
            icon: "i-lucide-landmark",
            description: "Plusieurs directives liées à la protection des données ont déjà été édictées par le ministre de la Formation. Elles définissent des lignes directrices claires concernant les pratiques pédagogiques numériques et l'usage encadré de certains outils technologiques dans les établissements scolaires.<br><br><strong>Directives disponibles :</strong><ul><li>Utilisation du téléphone portable dans les écoles obligatoires jurassiennes</li><li>Prises de vue et enregistrements sonores dans le cadre d'activités pédagogiques à l'école obligatoire</li><li>Intelligence artificielle générative — Recommandations pour l'école obligatoire</li></ul>",
            resources: [
              { title: "Directive — Téléphone portable", url: "https://drive.google.com/file/d/140Vk_4_q5puwkmhrlZqDCp4_iFc1PuO8/view?usp=sharing", source: "CEJEF", type: "document" },
              { title: "Directive — Prises de vue et enregistrements sonores", url: "https://drive.google.com/file/d/1WSmEwz8TvbwNBvCzogMvhh-2gIBGiCUU/view?usp=drive_link", source: "CEJEF", type: "document" },
              { title: "Directive — Intelligence artificielle générative", url: "https://drive.google.com/file/d/1lzfEraujC-FDIyrq74aavJb2cmWSQUsj/view?usp=drive_link", source: "CEJEF", type: "document" }
            ]
          }
        ]
      },
      {
        id: "droit-image-voix",
        title: "Droit à l'image et à la voix",
        icon: "i-lucide-user-check",
        items: [
          {
            id: "droit-image-voix-contenu",
            title: "Droit à l'image et à la voix",
            icon: "i-lucide-user-check",
            description: "Le droit à l'image et à la voix des élèves doit être respecté dans tous les contextes éducatifs. Diverses situations ont ainsi été analysées afin de mettre à disposition des établissements scolaires des formulaires adaptés.<br><br><strong>Propositions du CEIJ :</strong><ul><li>Vie scolaire et site internet</li><li>Camps et sorties scolaires</li><li>Manifestations scolaires publiques</li><li>Échanges linguistiques</li><li>Journal scolaire</li><li>Formulaire pour les médias</li></ul>",
            resources: [
              { title: "Formulaires droit à l'image (dossier)", url: "https://drive.google.com/drive/folders/11TV6CIu3pL6zFBxwD6GyeryxDv-VcEBP?usp=drive_link", source: "CEIJ", type: "document" }
            ]
          }
        ]
      }
    ]
  },

  // ─── 3. Environnement de travail ───
  {
    id: "environnement-travail",
    title: "Environnement de travail",
    shortTitle: "Environnement",
    icon: "i-lucide-monitor",
    description: "Infrastructure, sécurité réseau, plateformes scolaires et gestion des comptes M365.",
    sections: [
      {
        id: "securite-generalites",
        title: "Sécurité des données — généralités",
        icon: "i-lucide-lock",
        items: [
          {
            id: "securite-m365",
            title: "Sécurité sur M365",
            icon: "i-lucide-shield-check",
            description: "Éléments entrés en vigueur en 2024 :<ul><li>Contrat EDUCA avec Microsoft</li><li>Licences A5 avec Defender P2 (antivirus supérieur)</li><li>Authentification par double facteur pour les enseignants</li><li>Limitation territoriale de l'accès à M365 : accès autorisé depuis la Suisse et les pays limitrophes uniquement</li><li>Redirection des courriels interdite vers une autre adresse e-mail</li><li>Contrôle strict des invités</li><li>Partage en intranet uniquement</li></ul>",
            resources: []
          },
          {
            id: "infrastructure",
            title: "Infrastructure",
            icon: "i-lucide-server",
            description: "La LEO prévoit la mise en place par l'État :<ul><li>d'un système de gestion et d'information</li><li>d'un système de communication</li></ul>Tous les établissements scolaires ainsi que le SEN et le SFP sont rattachés à ces systèmes.",
            resources: []
          },
          {
            id: "securite-reseau",
            title: "Sécurité du réseau",
            icon: "i-lucide-wifi",
            description: "Le SDI est responsable de la gestion des infrastructures informatiques cantonales. Il assure la maintenance et la sécurisation des réseaux et des systèmes ainsi que la mise en place de politiques de sécurité informatique. Dans le cadre du CEIJ, les communes sont encouragées à adopter des stratégies de cybersécurité.",
            resources: [
              { title: "Stratégie de cybersécurité du Canton du Jura", url: "https://www.jura.ch/fr/Autorites/Administration/DEN/SDI/Cybersecurite/SCJU/Strategie-de-cybersecurite-SCJU.html", source: "Canton du Jura", type: "link" }
            ]
          }
        ]
      },
      {
        id: "edu-jura-services",
        title: "edu.jura.ch et services associés",
        icon: "i-lucide-at-sign",
        items: [
          {
            id: "edu-jura-ch",
            title: "edu.jura.ch",
            icon: "i-lucide-at-sign",
            description: "@edu.jura.ch est un domaine M365 construit en 2020, développé par le SDI. Le SEN et le SFP participent à son entretien. Les élèves obtiennent une adresse courriel dès la 7<sup>e</sup> année primaire, utilisable jusqu'à la fin du secondaire. Elle permet :<ul><li>D'accéder à un espace de travail partagé entre enseignants et élèves</li><li>De se connecter aux services éducatifs en ligne grâce à Edulog (Fédération d'identités numériques de la CDIP)</li></ul>",
            resources: [
              { title: "Qu'est-ce qu'Edulog ?", url: "https://www.edulog.ch/fr/quest-ce-quedulog", source: "Edulog", type: "link" },
              { title: "FAQ edu.jura.ch — Microsoft 365", url: "https://faq.jura.ch/space/SEN/636125329/Microsoft+365", source: "FAQ Jura", type: "link" }
            ]
          },
          {
            id: "controle-documents-partages",
            title: "Contrôle des documents partagés",
            icon: "i-lucide-folder-lock",
            description: "L'envoi de pièces jointes par courriel engendre des duplications non maîtrisées des documents. Le partage via SharePoint ou Teams est préconisé.<ul><li>Toutes les données de SharePoint et Teams sont cryptées</li><li>Par défaut, toutes les équipes Teams sont supprimées chaque année</li><li>Depuis 2025, labels de durée de vie (2 semaines, 1 an ou 3 ans) et de confidentialité (public ou confidentiel)</li></ul>",
            resources: []
          },
          {
            id: "gestion-comptes-donnees",
            title: "Gestion des comptes et des données",
            icon: "i-lucide-database",
            description: "Grâce à Information Barrier, l'accès aux données est séparé en 3 segments :<ol><li><strong>Tous les enseignants et le personnel administratif</strong> : communication libre entre eux</li><li><strong>Enseignants et élèves par école</strong> : empêche les communications entre élèves de différentes écoles</li><li><strong>Enseignants et utilisateurs externes par école</strong> : collaboration encadrée avec partenaires externes</li></ol>",
            resources: []
          }
        ]
      },
      {
        id: "plateformes-scolaires",
        title: "Plateformes scolaires",
        icon: "i-lucide-layout-grid",
        items: [
          {
            id: "educlasse",
            title: "Educlasse",
            icon: "i-lucide-graduation-cap",
            description: "Plateforme pédagogique regroupant des ressources d'apprentissage, des outils numériques et des services en ligne. Gérée par le centre MITIC interjurassien (CMIJ). Les données personnelles ont été réduites au strict minimum :<ul><li>Pour les enseignants : prénom, nom et identifiant technique</li><li>Pour les élèves : prénom et TechID uniquement</li></ul>Données hébergées en Suisse. L'authentification passe par Edulog.",
            resources: [
              { title: "Centre MITIC interjurassien (CMIJ)", url: "https://cmij.ch/a-propos-2/", source: "CMIJ", type: "link" },
              { title: "Educlasse et Edulog", url: "https://www.edulog.ch/fr/news/2022/educlasse-tire-un-bilan-positif-apres-une-annee-dutilisation-dedulog", source: "Edulog", type: "link" },
              { title: "À propos d'Educlasse", url: "https://www.educlasse.ch/a_propos", source: "Educlasse", type: "link" }
            ]
          },
          {
            id: "cloee2",
            title: "CLOEE2",
            icon: "i-lucide-clipboard-list",
            description: "Progiciel standard de gestion de l'école jurassienne :<ul><li>Gestion des élèves : inscription, notes, promotion, absences, parcours scolaire, édition de documents officiels</li><li>Gestion des enseignants : classes, cours, accès pour mise de notes</li></ul>Accès strictement limité aux personnes autorisées. Données conservées pendant une durée déterminée puis supprimées ou archivées.",
            resources: [
              { title: "Registre des traitements — SFP", url: "https://www.ppdt-june.ch/fr/Registre/Traitement-JU/Fichiers/Service-de-la-formation-postobligatoire-SFP.html", source: "PPDT JUNE", type: "link" }
            ]
          },
          {
            id: "webuntis",
            title: "WebUntis",
            icon: "i-lucide-calendar-clock",
            description: "WebUntis permet de :<ul><li>Planifier les horaires des enseignants et des élèves</li><li>Gérer le suivi des absences</li><li>Gérer les réservations de salles et de matériel</li><li>Planifier des travaux écrits et des devoirs</li><li>Communiquer avec les élèves</li><li>Aux parents de s'informer sur les horaires</li></ul>Un contrat signé entre les écoles et WebUntis garantit la sécurité des données sensibles.",
            resources: []
          }
        ]
      }
    ]
  },

  // ─── 4. Coordinateurs numériques en établissement ───
  {
    id: "coordinateurs-numeriques",
    title: "Coordinateurs numériques en établissement",
    shortTitle: "Coordinateurs",
    icon: "i-lucide-shield-check",
    description: "Formation, cahier des charges et documents de référence pour les coordinateurs numériques.",
    sections: [
      {
        id: "formation-cne",
        title: "Formation des coordinateurs numériques",
        icon: "i-lucide-users",
        items: [
          {
            id: "formation-cne-contenu",
            title: "Formation des coordinateurs numériques",
            icon: "i-lucide-users",
            description: "Un diplôme particulier est requis pour exercer la fonction de coordinateur numérique en établissement. Le Canton du Jura a collaboré avec la HEP-BEJUNE à l'élaboration du CAS CNE afin de développer une nouvelle offre de formation. Un axe entier de cette dernière est consacré au domaine de la protection des données et de la sécurité informatique. Lors des séances de rencontre entre coordinateurs numériques du canton, une intervention régulière est consacrée aux enjeux de la protection des données dans l'éducation.",
            resources: [
              { title: "CAS Coordinateur numérique en établissement", url: "https://www.hep-bejune.ch/fr/Formations-continues/Formations-postgrades/CAS/Coordinateur-numerique-en-etablissement/CAS-Coordinateur-ou-coordinatrice-numerique-en-etablissement.html", source: "HEP-BEJUNE", type: "link" },
              { title: "Cahier des charges des responsables numériques", url: "https://drive.google.com/file/d/1YyuXqpJ59Ph64L0F7miRTBarj8SWVxG5/view?usp=sharing", source: "CEJEF", type: "document" }
            ]
          }
        ]
      },
      {
        id: "documents-reference",
        title: "Documents de référence",
        icon: "i-lucide-book-open",
        items: [
          {
            id: "documents-reference-contenu",
            title: "Documents de référence",
            icon: "i-lucide-book-open",
            description: "Le CEIJ et le CEJEF encadrent l'utilisation des outils et plateformes numériques dans le domaine de l'éducation. Ces outils sont évalués selon des critères précis, permettant de déterminer leur niveau de sécurité, en particulier en matière de protection des données des élèves. La Confédération met également à disposition une plateforme (navigateur Educa) qui a les mêmes ambitions.",
            resources: [
              { title: "Navigateur Educa", url: "https://navi.educa.ch/", source: "Educa", type: "link" }
            ]
          }
        ]
      }
    ]
  },

  // ─── 5. Enseignants ───
  {
    id: "enseignants",
    title: "Enseignants",
    shortTitle: "Enseignants",
    icon: "i-lucide-presentation",
    description: "Ressources, compétences et formations pour les enseignants en matière de protection des données.",
    sections: [
      {
        id: "donnees-ecole",
        title: "Les données à l'école",
        icon: "i-lucide-file-search",
        items: [
          {
            id: "donnees-ecole-contenu",
            title: "Les données à l'école",
            icon: "i-lucide-file-search",
            description: "Les données utilisées dans le contexte scolaire se répartissent en trois catégories selon leur besoin de protection :<br><br><strong>Données pédagogiques</strong> (besoin de protection faible ou absent)<br>Ce sont des données neutres qui ne se rapportent à aucune personne en particulier.<br><em>Exemples : le matériel de cours, les moyens d'enseignement, les horaires, le calendrier.</em><br><br><strong>Données personnelles</strong> (besoin de protection moyen — anonymisation, mot de passe, consentement…)<br>Il s'agit de toute information qui se rapporte à une personne identifiée ou identifiable.<br><em>Exemples : la liste des élèves d'une classe, un travail d'élève avec nom et prénom, une photographie à visage découvert, les dispenses, les notes, les moyennes.</em><br><br><strong>Données sensibles</strong> (besoin de protection élevé à très élevé — chiffrement, mot de passe, droits d'accès…)<br>Ce sont des données liées à la sphère intime de la personne. Elles font l'objet d'une protection renforcée.<br><em>Exemples : les origines, les opinions, les données familiales, les données de santé, les diagnostics d'apprentissage, les sanctions et leur cause.</em>",
            resources: []
          }
        ]
      },
      {
        id: "competences-fondamentales",
        title: "Compétences fondamentales",
        icon: "i-lucide-list-checks",
        items: [
          {
            id: "competences-fondamentales-contenu",
            title: "Compétences fondamentales",
            icon: "i-lucide-list-checks",
            description: "Les enseignants doivent être capables de :<ol><li>Reconnaître avec quel type de données ils travaillent</li><li>Traiter les données d'après leur type</li><li>Conserver les données selon le niveau de sécurité adéquat</li><li>Être vigilants avec les travaux d'élèves</li><li>Travailler avec les données personnelles mais ne pas utiliser de données sensibles dans les documents</li></ol>",
            resources: [
              { title: "Guide des compétences fondamentales (PDF)", url: "https://drive.google.com/file/d/1LOjjgCu-L5W7lx2Jb0phHYmI2MvconU_/view?usp=sharing", source: "CEJEF", type: "document" }
            ]
          }
        ]
      },
      {
        id: "projets-formations",
        title: "Projets et formations",
        icon: "i-lucide-lightbulb",
        items: [
          {
            id: "projets-formations-contenu",
            title: "Projets et formations",
            icon: "i-lucide-lightbulb",
            description: "Des conférences ont été organisées sur le thème de la sécurité informatique et de la protection des données. Parmi les conférenciers figurent le PPDT JUNE, Christian Flückiger, et Céline Bulliard, juriste HEP-BEJUNE.<br><br>Une conférence obligatoire sur la protection des données sera mise sur pied pour 2026.<br><br>Les enseignants ont pris part à une opération de sensibilisation au hameçonnage. Le SFP organise une conférence annuelle (2024 : gestion des mots de passe et protection des données).<br><br>Formations dédiées à l'éducation numérique. Prise en compte systématique de la protection des données. Catalogue AVENIR FORMATION.",
            resources: [
              { title: "DiagnoPhish — sensibilisation au hameçonnage", url: "https://www.diagnophish.ch/", source: "DiagnoPhish", type: "link" },
              { title: "Catalogue de formations continues CEJEF", url: "https://www.esig-ju.ch/cejef/fc/FC-printemps26_resume.pdf", source: "ESIG-JU", type: "document" }
            ]
          }
        ]
      }
    ]
  },

  // ─── 6. Élèves ───
  {
    id: "eleves",
    title: "Élèves",
    shortTitle: "Élèves",
    icon: "i-lucide-backpack",
    description: "Chartes, compétences numériques et documents destinés aux élèves et à leurs parents.",
    sections: [
      {
        id: "chartes-documents",
        title: "Chartes et documents",
        icon: "i-lucide-scroll-text",
        items: [
          {
            id: "chartes-documents-contenu",
            title: "Chartes et documents",
            icon: "i-lucide-scroll-text",
            description: "Documents de référence destinés aux élèves, enseignants et parents :<ul><li><strong>Charte numérique + Guide d'utilisation de l'IA</strong> — destinés aux élèves</li><li><strong>Charte numérique cantonale</strong> — droits et devoirs en matière d'usage des outils numériques</li><li><strong>Espace M365 : informations aux parents et enseignants</strong></li><li><strong>Espace M365 : contrat élève</strong></li></ul>",
            resources: [
              { title: "Charte numérique + Guide IA (PDF)", url: "https://drive.google.com/file/d/1E9ihMJm6v1GsoxlIxK51bczVcsHvbH7c/view?usp=sharing", source: "CEJEF", type: "document" },
              { title: "Charte numérique cantonale (Word)", url: "https://divtec.sharepoint.com/:w:/r/sites/T-CoordinationnumriqueSFP/Documents%20partages/Support%20et%20soutien/Charte%20num%C3%A9rique%20et%20IA/Charte%20num%C3%A9rique/charte_num%C3%A9rique_CEJEF.docx", source: "SharePoint CEJEF", type: "document" },
              { title: "Informations parents et enseignants (PDF)", url: "https://drive.google.com/file/d/1jCthIZA0xLGng47YZq8i4lSf_u-ZJF2m/view?usp=sharing", source: "CEJEF", type: "document" },
              { title: "Contrat élève M365 (PDF)", url: "https://drive.google.com/file/d/1i5JFyyT9zgQKwS2_0tmqcRm5iNFL_OVE/view?usp=sharing", source: "CEJEF", type: "document" }
            ]
          }
        ]
      },
      {
        id: "competences-numeriques-eleves",
        title: "Compétences numériques des élèves",
        icon: "i-lucide-graduation-cap",
        items: [
          {
            id: "competences-numeriques-contenu",
            title: "Compétences numériques des élèves",
            icon: "i-lucide-graduation-cap",
            description: "Le PER EdNum intègre la protection des données dans plusieurs axes d'apprentissage :<br><br><strong>Axe Médias</strong><br>Les élèves sont sensibilisés à la protection de la personnalité, au droit d'auteur et à la protection des données. Ils comprennent les risques liés à la divulgation d'informations.<br><br><strong>Axe Usages</strong><br>Utilisation citoyenne des outils numériques. Configuration des paramètres de confidentialité, réflexes de cybersécurité.<br><br><strong>Axe Science informatique</strong><br>Lien entre informatique et société. Identité et empreinte numériques, gestion de l'identité numérique.<br><br>Le manuel <strong>Connected</strong>, utilisé dans les écoles jurassiennes, complète ces apprentissages.",
            resources: [
              { title: "PER Éducation numérique", url: "https://portail.ciip.ch/per/domains/8", source: "CIIP", type: "link" },
              { title: "Manuel Connected", url: "https://www.editionslep.ch/ebooks/plateforme-connected/acquerir-un-licence", source: "Éditions LEP", type: "link" }
            ]
          }
        ]
      }
    ]
  }
]
