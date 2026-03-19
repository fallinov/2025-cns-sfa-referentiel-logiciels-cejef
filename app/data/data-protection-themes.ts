import type { DataProtectionTheme } from "~~/types/data-protection"

export const dataProtectionThemes: DataProtectionTheme[] = [
  // ─── Thème 1 : Nouvelle loi fédérale (identique SEN/CEJEF) ───
  {
    id: "loi-protection-donnees",
    title: "Nouvelle loi fédérale sur la protection des données",
    shortTitle: "Loi fédérale (nLPD)",
    icon: "i-lucide-scale",
    description: "Bases légales sur le traitement des données scolaires dans le canton du Jura.",
    audience: "both",
    subThemes: [
      {
        id: "nlpd",
        title: "Nouvelle loi fédérale sur la protection des données",
        icon: "i-lucide-book-open",
        description: "La réécriture de la LEO vise à intégrer des bases légales sur le traitement des données scolaires. Ces modifications permettent aux directions, aux enseignants, au Service de l'enseignement et au Service de la formation postobligatoire de traiter des données personnelles et sensibles concernant les élèves jurassiens. Elles garantissent également que ces données soient traitées selon les exigences de la nouvelle loi fédérale sur la protection des données.",
        audience: "both",
        resources: [
          {
            title: "nLPD sur Fedlex",
            url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
            source: "Fedlex",
            type: "link"
          }
        ]
      }
    ]
  },

  // ─── Thème 2 : Ordonnances et recommandations ───
  {
    id: "ordonnances-recommandations",
    title: "Ordonnances et recommandations",
    shortTitle: "Ordonnances",
    icon: "i-lucide-file-text",
    description: "Directives cantonales et règlements pour les pratiques pédagogiques numériques.",
    audience: "both",
    subThemes: [
      {
        id: "directives-cantonales-sen",
        title: "Directives cantonales",
        icon: "i-lucide-landmark",
        description: "Plusieurs directives liées à la protection des données ont déjà été édictées par le ministre de la Formation. Elles définissent des lignes directrices concernant les pratiques pédagogiques numériques et l'usage encadré d'outils technologiques dans les établissements de formation postobligatoire.",
        audience: "sen",
        resources: []
      },
      {
        id: "directives-cantonales-cejef",
        title: "Directives cantonales",
        icon: "i-lucide-landmark",
        description: "Plusieurs directives liées à la protection des données ont déjà été édictées par le ministre de la Formation. Elles définissent des lignes directrices claires concernant les pratiques pédagogiques numériques et l'usage encadré de certains outils technologiques dans les établissements scolaires. Ces textes servent de référence aussi bien pour les élèves et leur famille que pour les professionnels de l'enseignement, en les accompagnant dans l'intégration du numérique à l'école tout en assurant le respect de la nLPD.",
        audience: "cejef",
        resources: []
      },
      {
        id: "telephone-portable-sen",
        title: "Téléphone portable",
        icon: "i-lucide-smartphone",
        description: "Utilisation du téléphone portable dans les écoles du CEJEF. Règlement propre à chaque division.",
        audience: "sen",
        resources: []
      },
      {
        id: "telephone-portable-cejef",
        title: "Téléphone portable",
        icon: "i-lucide-smartphone",
        description: "Utilisation du téléphone portable dans les écoles obligatoires jurassiennes.",
        audience: "cejef",
        resources: [
          {
            title: "Directive téléphone portable",
            url: "https://drive.google.com/file/d/140Vk_4_q5puwkmhrlZqDCp4_iFc1PuO8/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          }
        ]
      },
      {
        id: "prises-de-vue-sen",
        title: "Prises de vue et enregistrements sonores",
        icon: "i-lucide-camera",
        description: "Prises de vue et enregistrements sonores dans le cadre d'activités pédagogiques dans les écoles du CEJEF. Règlement propre à chaque division.",
        audience: "sen",
        resources: []
      },
      {
        id: "prises-de-vue-cejef",
        title: "Prises de vue et enregistrements sonores",
        icon: "i-lucide-camera",
        description: "Prises de vue et enregistrements sonores dans le cadre d'activités pédagogiques à l'école obligatoire.",
        audience: "cejef",
        resources: [
          {
            title: "Directive prises de vue et enregistrements",
            url: "https://drive.google.com/file/d/1WSmEwz8TvbwNBvCzogMvhh-2gIBGiCUU/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          }
        ]
      },
      {
        id: "droit-image-voix-sen",
        title: "Droit à l'image et à la voix",
        icon: "i-lucide-user-check",
        description: "Le droit à l'image et à la voix des élèves doit être respecté dans tous les contextes éducatifs. Des formulaires adaptables sont mis à disposition. Règlement propre à chaque division.",
        audience: "sen",
        resources: []
      },
      {
        id: "droit-image-voix-cejef",
        title: "Droit à l'image et à la voix",
        icon: "i-lucide-user-check",
        description: "Le droit à l'image et à la voix des élèves doit être respecté dans tous les contextes éducatifs. Diverses situations ont ainsi été analysées afin de mettre à disposition des établissements scolaires des formulaires adaptés, destinés aux élèves, à leurs familles ou à toute autre personne concernée. Ces documents sont proposés en version modifiable afin que chaque école puisse les adapter selon ses besoins.",
        audience: "cejef",
        resources: []
      },
      {
        id: "ia-recommandations-sen",
        title: "Intelligence artificielle",
        icon: "i-lucide-bot",
        description: "Intelligence artificielle générative – Recommandations dans les écoles du CEJEF. Règlement propre à chaque division.",
        audience: "sen",
        resources: []
      },
      {
        id: "ia-recommandations-cejef",
        title: "Intelligence artificielle",
        icon: "i-lucide-bot",
        description: "Intelligence artificielle générative — Recommandations pour l'école obligatoire.",
        audience: "cejef",
        resources: []
      }
    ]
  },

  // ─── Thème 3 : Environnement de travail ───
  {
    id: "environnement-travail",
    title: "Environnement de travail",
    shortTitle: "Environnement",
    icon: "i-lucide-monitor",
    description: "Infrastructure, sécurité réseau et gestion des systèmes d'information scolaires.",
    audience: "both",
    subThemes: [
      {
        id: "infrastructure-sen",
        title: "Infrastructure",
        icon: "i-lucide-server",
        description: "La LEO prévoit la mise en place par l'État d'un système de gestion et d'information et d'un système de communication. Tous les établissements scolaires ainsi que le SEN et le SFP sont rattachés à ces systèmes.",
        audience: "sen",
        resources: []
      },
      {
        id: "infrastructure-cejef",
        title: "Infrastructure",
        icon: "i-lucide-server",
        description: "La LEO prévoit la mise en place par l'État d'un système de gestion et d'information et d'un système de communication. En fonction des besoins, tous les établissements scolaires ainsi que le Service de l'enseignement et le Service de la formation postobligatoire sont rattachés à ces systèmes.",
        audience: "cejef",
        resources: []
      },
      {
        id: "securite-reseau-sen",
        title: "Sécurité du réseau",
        icon: "i-lucide-shield",
        description: "Le SDI est responsable de la gestion des infrastructures informatiques cantonales. Maintenance, sécurisation, politiques de sécurité. Les communes sont encouragées à adopter des stratégies de cybersécurité ; chaque école peut développer son propre concept de sécurité.",
        audience: "sen",
        resources: [
          {
            title: "Stratégie de cybersécurité SCJU",
            url: "https://www.jura.ch/fr/Autorites/Administration/DFNS/SDI/Cybersecurite/SCJU/Strategie-de-cybersecurite-SCJU.html",
            source: "Canton du Jura",
            type: "link"
          }
        ]
      },
      {
        id: "securite-reseau-cejef",
        title: "Sécurité du réseau",
        icon: "i-lucide-shield",
        description: "Le SDI est responsable de la gestion des infrastructures informatiques cantonales. Il assure notamment la maintenance et la sécurisation des réseaux et des systèmes ainsi que la mise en place de politiques de sécurité informatique. Dans le cadre du CEIJ, les communes sont également encouragées à adopter des stratégies de cybersécurité. Ainsi, chaque école est en mesure de développer son propre concept de sécurité.",
        audience: "cejef",
        resources: [
          {
            title: "Stratégie de cybersécurité SCJU",
            url: "https://www.jura.ch/fr/Autorites/Administration/DFNS/SDI/Cybersecurite/SCJU/Strategie-de-cybersecurite-SCJU.html",
            source: "Canton du Jura",
            type: "link"
          }
        ]
      },
      {
        id: "securite-m365-sen",
        title: "Sécurité sur M365",
        icon: "i-lucide-lock",
        description: "Éléments entrés en vigueur en 2024 : contrat EDUCA ; licences A5 avec Defender P2 ; double facteur ; limitation territoriale ; redirection interdite ; contrôle strict des invités ; partage en intranet uniquement.",
        audience: "sen",
        resources: []
      },
      {
        id: "securite-m365-cejef",
        title: "Sécurité sur M365",
        icon: "i-lucide-lock",
        description: "Éléments entrés en vigueur en 2024 : contrat EDUCA avec Microsoft ; licences A5 avec Defender P2 ; authentification à double facteur pour les enseignants ; limitation territoriale de l'accès à M365 (Suisse et pays limitrophes) ; redirection des courriels interdite ; contrôle strict des invités ; partage en intranet uniquement.",
        audience: "cejef",
        resources: []
      },
      {
        id: "edu-jura-ch-sen",
        title: "edu.jura.ch",
        icon: "i-lucide-at-sign",
        description: "@edu.jura.ch est un domaine M365 construit en 2020. Sécurité renforcée, séparation des données, protocole d'accès. Adresse e-mail fournie aux élèves et personnels ; accès aux ressources via Edulog.",
        audience: "sen",
        resources: [
          {
            title: "Qu'est-ce qu'Edulog ?",
            url: "https://www.edulog.ch/fr/quest-ce-quedulog",
            source: "Edulog",
            type: "link"
          }
        ]
      },
      {
        id: "edu-jura-ch-cejef",
        title: "edu.jura.ch",
        icon: "i-lucide-at-sign",
        description: "@edu.jura.ch est un domaine M365 construit en 2020. Il a été développé par le SDI en accroissant progressivement la sécurité et la séparation des données. Le SEN et le SFP participent à son entretien et à sa consolidation. Des protocoles rigoureux ont été établis pour sécuriser l'environnement de travail et contrôler l'accès aux données sensibles. Les élèves obtiennent une adresse courriel dès la 7e année primaire, utilisable jusqu'à la fin du secondaire.",
        audience: "cejef",
        resources: [
          {
            title: "Qu'est-ce qu'Edulog ?",
            url: "https://www.edulog.ch/fr/quest-ce-quedulog",
            source: "Edulog",
            type: "link"
          }
        ]
      },
      {
        id: "gestion-comptes-donnees-sen",
        title: "Gestion des comptes et des données",
        icon: "i-lucide-database",
        description: "Grâce à Information Barrier, l'accès aux données et aux communications est séparé en trois segments : personnel administratif ; enseignants et élèves par école ; enseignants et utilisateurs externes par école.",
        audience: "sen",
        resources: []
      },
      {
        id: "gestion-comptes-donnees-cejef",
        title: "Gestion des comptes et des données",
        icon: "i-lucide-database",
        description: "Grâce à Information Barrier, l'accès aux données et aux communications est séparé en trois segments : tous les enseignants et le personnel administratif ; enseignants et élèves par école ; enseignants et utilisateurs externes par école.",
        audience: "cejef",
        resources: []
      },
      {
        id: "controle-documents-partages-sen",
        title: "Contrôle des documents partagés",
        icon: "i-lucide-folder-lock",
        description: "Le partage via SharePoint ou Teams est préconisé pour limiter les duplications et garder le contrôle sur les données. Données cryptées, suppression annuelle des équipes, labels de durée de vie et de confidentialité.",
        audience: "sen",
        resources: []
      },
      {
        id: "controle-documents-partages-cejef",
        title: "Contrôle des documents partagés",
        icon: "i-lucide-folder-lock",
        description: "L'envoi de pièces jointes par courriel engendre des duplications non maîtrisées des documents. Le partage via SharePoint ou Teams est préconisé pour conserver un meilleur contrôle sur les données et leur cycle de vie. Toutes les données de SharePoint et Teams sont cryptées. Par défaut, toutes les équipes Teams sont supprimées chaque année. Depuis 2025, il est possible d'apposer des labels pour définir la durée de vie d'un document et son degré de confidentialité.",
        audience: "cejef",
        resources: []
      }
    ]
  },

  // ─── Thème 4 : Services associés ───
  {
    id: "services-associes",
    title: "Services associés",
    shortTitle: "Services",
    icon: "i-lucide-puzzle",
    description: "Applications et plateformes utilisées dans le cadre scolaire.",
    audience: "both",
    subThemes: [
      {
        id: "cloee2-sen",
        title: "CLOEE2",
        icon: "i-lucide-clipboard-list",
        description: "CLOEE2 permet la gestion des profils scolaires des élèves (inscription, notes, promotion, absences, parcours, édition de documents officiels) et des enseignants. L'accès aux données est limité aux personnes autorisées. Les données sont conservées pour une durée déterminée, puis supprimées ou archivées de manière sécurisée.",
        audience: "sen",
        resources: [
          {
            title: "Registre des traitements — SFP",
            url: "https://www.ppdt-june.ch/fr/Registre/Traitement-JU/Fichiers/Service-de-la-formation-postobligatoire-SFP.html",
            source: "PPDT JUNE",
            type: "link"
          }
        ]
      },
      {
        id: "cloee2-cejef",
        title: "CLOEE2",
        icon: "i-lucide-clipboard-list",
        description: "CLOEE2 permet principalement à l'école jurassienne de gérer les profils scolaires des élèves. Il est utilisé comme progiciel standard de gestion de l'école jurassienne pour la gestion des élèves (inscription, notes, promotion, absences, parcours, édition des documents officiels) et des enseignants.",
        audience: "cejef",
        resources: []
      },
      {
        id: "educlasse-edulog-sen",
        title: "Educlasse / Edulog",
        icon: "i-lucide-graduation-cap",
        description: "Educlasse est une plateforme pédagogique (centre MITIC interjurassien). Données minimisées (prénom, nom, identifiant technique pour les enseignants ; prénom et TechID pour les élèves). Hébergement en Suisse. Authentification Edulog.",
        audience: "sen",
        resources: [
          {
            title: "Centre MITIC interjurassien",
            url: "https://cmij.ch/a-propos-2/",
            source: "CMIJ",
            type: "link"
          }
        ]
      },
      {
        id: "educlasse-edulog-cejef",
        title: "Educlasse / Edulog",
        icon: "i-lucide-graduation-cap",
        description: "Educlasse est une plateforme pédagogique (centre MITIC interjurassien). Les données personnelles y sont réduites au minimum (identité de base, identifiant technique) et hébergées en Suisse. L'authentification passe par Edulog.",
        audience: "cejef",
        resources: [
          {
            title: "Centre MITIC interjurassien",
            url: "https://cmij.ch/a-propos-2/",
            source: "CMIJ",
            type: "link"
          }
        ]
      },
      {
        id: "webuntis-sen",
        title: "WebUntis",
        icon: "i-lucide-calendar-clock",
        description: "WebUntis permet de planifier les horaires, suivre les absences, réserver salles et matériel, planifier travaux écrits et devoirs, communiquer avec les élèves et informer les parents. Un contrat garantit la sécurité des données ; des administrateurs d'établissement gèrent les accès.",
        audience: "sen",
        resources: []
      },
      {
        id: "webuntis-cejef",
        title: "WebUntis",
        icon: "i-lucide-calendar-clock",
        description: "WebUntis permet de planifier les horaires des enseignants et des élèves, de gérer les absences, de réserver des salles et du matériel, de planifier des travaux écrits et des devoirs, de communiquer avec les élèves et aux parents de s'informer sur les horaires. Un contrat signé entre les écoles et WebUntis garantit la sécurité des données sensibles. Chaque école possède des administrateurs qui définissent les accès et fonctionnalités.",
        audience: "cejef",
        resources: []
      }
    ]
  },

  // ─── Thème 5 : Formation ───
  {
    id: "formation",
    title: "Formation",
    shortTitle: "Formation",
    icon: "i-lucide-book-open-check",
    description: "Formation des coordinateurs numériques et sensibilisation à la protection des données.",
    audience: "both",
    subThemes: [
      {
        id: "coordinateurs-numeriques-sen",
        title: "Coordinateurs numériques",
        icon: "i-lucide-users",
        description: "Un diplôme particulier est requis pour exercer la fonction de coordinateur numérique en établissement. Le Canton du Jura a collaboré avec la HEP-BEJUNE pour le CAS CNE ; un axe entier porte sur la protection des données et la sécurité informatique. Une intervention régulière sur ces enjeux est proposée lors des rencontres cantonales.",
        audience: "sen",
        resources: [
          {
            title: "CAS Coordinateur numérique en établissement",
            url: "https://www.hep-bejune.ch/fr/Formations-continues/Formations-postgrades/CAS/Coordinateur-numerique-en-etablissement/CAS-Coordinateur-ou-coordinatrice-numerique-en-etablissement.html",
            source: "HEP-BEJUNE",
            type: "link"
          }
        ]
      },
      {
        id: "coordinateurs-numeriques-cejef",
        title: "Coordinateurs numériques",
        icon: "i-lucide-users",
        description: "Un diplôme particulier est requis pour exercer la fonction de coordinateur numérique en établissement. Le Canton du Jura a collaboré avec la HEP-BEJUNE à l'élaboration du CAS CNE. Un axe entier de cette formation est consacré à la protection des données et à la sécurité informatique. Lors des rencontres entre coordinateurs numériques, une intervention régulière traite des enjeux de la protection des données.",
        audience: "cejef",
        resources: [
          {
            title: "CAS Coordinateur numérique en établissement",
            url: "https://www.hep-bejune.ch/fr/Formations-continues/Formations-postgrades/CAS/Coordinateur-numerique-en-etablissement/CAS-Coordinateur-ou-coordinatrice-numerique-en-etablissement.html",
            source: "HEP-BEJUNE",
            type: "link"
          }
        ]
      },
      {
        id: "cahier-charges-cne",
        title: "Cahier des charges du coordinateur numérique",
        icon: "i-lucide-file-check",
        description: "Document de référence définissant les responsabilités et missions du coordinateur numérique en établissement.",
        audience: "both",
        resources: [
          {
            title: "Cahier des charges CNE",
            url: "https://drive.google.com/file/d/1YyuXqpJ59Ph64L0F7miRTBarj8SWVxG5/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          }
        ]
      }
    ]
  },

  // ─── Thème 6 : Enseignants ───
  {
    id: "enseignants",
    title: "Enseignants",
    shortTitle: "Enseignants",
    icon: "i-lucide-presentation",
    description: "Ressources et formations pour sensibiliser les enseignants à la protection des données.",
    audience: "both",
    subThemes: [
      {
        id: "diagnophish-sen",
        title: "Diagnophish",
        icon: "i-lucide-fish",
        description: "Campagne de sensibilisation à la sécurité informatique et au hameçonnage. Le SFP organise également une conférence annuelle sur ces thématiques.",
        audience: "sen",
        resources: [
          {
            title: "Diagnophish",
            url: "https://www.diagnophish.ch",
            source: "Diagnophish",
            type: "link"
          }
        ]
      },
      {
        id: "diagnophish-cejef",
        title: "Diagnophish",
        icon: "i-lucide-fish",
        description: "Après le personnel administratif du Canton, les enseignants de l'école obligatoire et de la formation postobligatoire ont pris part à une opération de sensibilisation à la sécurité informatique et au hameçonnage. Le SFP organise aussi une conférence annuelle, par exemple en 2024 sur la gestion des mots de passe et la protection des données.",
        audience: "cejef",
        resources: [
          {
            title: "Diagnophish",
            url: "https://www.diagnophish.ch",
            source: "Diagnophish",
            type: "link"
          }
        ]
      },
      {
        id: "hep-bejune-formations-sen",
        title: "HEP-BEJUNE / formations",
        icon: "i-lucide-school",
        description: "Des conférences ont été organisées sur la sécurité informatique et la protection des données (PPDT JUNE, juristes, etc.).",
        audience: "sen",
        resources: [
          {
            title: "Formations continues CEJEF",
            url: "https://www.esig-ju.ch/cejef/fc/FC-printemps26_resume.pdf",
            source: "ESIG-JU",
            type: "document"
          }
        ]
      },
      {
        id: "hep-bejune-cejef",
        title: "HEP-BEJUNE",
        icon: "i-lucide-school",
        description: "Des conférences ont été organisées sur la sécurité informatique et la protection des données (PPDT JUNE, juristes, etc.).",
        audience: "cejef",
        resources: []
      },
      {
        id: "avenir-formation",
        title: "Avenir Formation",
        icon: "i-lucide-rocket",
        description: "Programme de formation continue proposé par le CEJEF pour les enseignants de la formation postobligatoire.",
        audience: "cejef",
        resources: [
          {
            title: "Formations continues CEJEF",
            url: "https://www.esig-ju.ch/cejef/fc/FC-printemps26_resume.pdf",
            source: "ESIG-JU",
            type: "document"
          }
        ]
      },
      {
        id: "donnees-ecole",
        title: "Les données à l'école",
        icon: "i-lucide-file-search",
        description: "Classement des données pédagogiques, personnelles et sensibles.",
        audience: "both",
        resources: [
          {
            title: "Classification des données scolaires",
            url: "https://view.genially.com/681afb1591ccbf218602e8ae/interactive-content-protection-des-donnees-dans-lenseignement",
            source: "Genially",
            type: "link"
          }
        ]
      },
      {
        id: "competences-fondamentales-sen",
        title: "Compétences fondamentales",
        icon: "i-lucide-list-checks",
        description: "Reconnaître le type de données ; traiter les données selon leur type ; être vigilant avec les travaux d'élèves ; travailler avec les données personnelles.",
        audience: "sen",
        resources: [
          {
            title: "Guide des compétences fondamentales",
            url: "https://drive.google.com/file/d/1LOjjgCu-L5W7lx2Jb0phHYmI2MvconU_/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          }
        ]
      },
      {
        id: "competences-fondamentales-cejef",
        title: "Compétences fondamentales",
        icon: "i-lucide-list-checks",
        description: "Reconnaître avec quel type de données ils travaillent ; traiter les données d'après leur type ; être vigilants avec les travaux d'élèves ; travailler avec les données personnelles.",
        audience: "cejef",
        resources: [
          {
            title: "Guide des compétences fondamentales",
            url: "https://drive.google.com/file/d/1LOjjgCu-L5W7lx2Jb0phHYmI2MvconU_/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          }
        ]
      }
    ]
  },

  // ─── Thème 7 : Élèves (identique SEN/CEJEF) ───
  {
    id: "eleves",
    title: "Élèves",
    shortTitle: "Élèves",
    icon: "i-lucide-backpack",
    description: "Chartes, contrats et informations destinés aux élèves et à leurs parents.",
    audience: "both",
    subThemes: [
      {
        id: "charte-numerique",
        title: "Charte numérique cantonale",
        icon: "i-lucide-scroll-text",
        description: "Charte numérique cantonale définissant les droits et devoirs des élèves en matière d'usage des outils numériques.",
        audience: "both",
        resources: [
          {
            title: "Charte numérique cantonale (PDF)",
            url: "https://drive.google.com/file/d/1E9ihMJm6v1GsoxlIxK51bczVcsHvbH7c/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          },
          {
            title: "Charte numérique cantonale (visuel)",
            url: "https://www.canva.com/design/DAGjBCyvf9E/0QKSqVhhiOKAxasxUJCDWA/edit",
            source: "Canva",
            type: "image"
          }
        ]
      },
      {
        id: "m365-info-parents",
        title: "Espace M365 : informations aux parents et enseignants",
        icon: "i-lucide-mail",
        description: "Document d'information destiné aux parents d'élèves et aux enseignants concernant l'utilisation de l'espace M365.",
        audience: "both",
        resources: [
          {
            title: "Informations parents et enseignants (PDF)",
            url: "https://drive.google.com/file/d/1jCthIZA0xLGng47YZq8i4lSf_u-ZJF2m/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          }
        ]
      },
      {
        id: "m365-contrat-eleve",
        title: "Espace M365 : contrat élève",
        icon: "i-lucide-file-signature",
        description: "Contrat d'utilisation de l'espace M365 signé par les élèves.",
        audience: "both",
        resources: [
          {
            title: "Contrat élève M365 (PDF)",
            url: "https://drive.google.com/file/d/1i5JFyyT9zgQKwS2_0tmqcRm5iNFL_OVE/view?usp=sharing",
            source: "CEJEF",
            type: "document"
          }
        ]
      }
    ]
  }
]
