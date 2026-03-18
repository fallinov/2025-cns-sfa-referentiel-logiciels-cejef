import type { DataProtectionTheme } from "~~/types/data-protection"

export const dataProtectionThemes: DataProtectionTheme[] = [
  {
    id: "loi-protection-donnees",
    title: "Nouvelle loi fédérale sur la protection des données",
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
  {
    id: "ordonnances-recommandations",
    title: "Ordonnances et recommandations",
    icon: "i-lucide-file-text",
    description: "Directives cantonales et règlements pour les pratiques pédagogiques numériques.",
    audience: "both",
    subThemes: [
      {
        id: "directives-cantonales",
        title: "Directives cantonales",
        icon: "i-lucide-landmark",
        description: "Plusieurs directives liées à la protection des données ont déjà été édictées par le ministre de la Formation. Elles définissent des lignes directrices concernant les pratiques pédagogiques numériques et l'usage encadré d'outils technologiques dans les établissements de formation postobligatoire.",
        audience: "both",
        resources: []
      },
      {
        id: "telephone-portable",
        title: "Téléphone portable",
        icon: "i-lucide-smartphone",
        description: "Utilisation du téléphone portable dans les écoles du CEJEF. Règlement propre à chaque division.",
        audience: "both",
        resources: []
      },
      {
        id: "prises-de-vue",
        title: "Prises de vue et enregistrements sonores",
        icon: "i-lucide-camera",
        description: "Prises de vue et enregistrements sonores dans le cadre d'activités pédagogiques dans les écoles du CEJEF. Règlement propre à chaque division.",
        audience: "both",
        resources: []
      },
      {
        id: "droit-image-voix",
        title: "Droit à l'image et à la voix",
        icon: "i-lucide-user-check",
        description: "Le droit à l'image et à la voix des élèves doit être respecté dans tous les contextes éducatifs. Des formulaires adaptables sont mis à disposition. Règlement propre à chaque division.",
        audience: "both",
        resources: []
      },
      {
        id: "ia-recommandations",
        title: "Intelligence artificielle",
        icon: "i-lucide-bot",
        description: "Intelligence artificielle générative — Recommandations dans les écoles du CEJEF. Règlement propre à chaque division.",
        audience: "both",
        resources: []
      }
    ]
  },
  {
    id: "environnement-travail",
    title: "Environnement de travail",
    icon: "i-lucide-monitor",
    description: "Infrastructure, sécurité réseau et gestion des systèmes d'information scolaires.",
    audience: "both",
    subThemes: [
      {
        id: "infrastructure",
        title: "Infrastructure",
        icon: "i-lucide-server",
        description: "La LEO prévoit la mise en place par l'État d'un système de gestion et d'information et d'un système de communication. Tous les établissements scolaires ainsi que le SEN et le SFP sont rattachés à ces systèmes.",
        audience: "both",
        resources: []
      },
      {
        id: "securite-reseau",
        title: "Sécurité du réseau",
        icon: "i-lucide-shield",
        description: "Le SDI est responsable de la gestion des infrastructures informatiques cantonales. Maintenance, sécurisation, politiques de sécurité. Les communes sont encouragées à adopter des stratégies de cybersécurité ; chaque école peut développer son propre concept de sécurité.",
        audience: "both",
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
        id: "securite-m365",
        title: "Sécurité sur M365",
        icon: "i-lucide-lock",
        description: "Éléments entrés en vigueur en 2024 : contrat EDUCA avec Microsoft ; licences A5 avec Defender P2 ; authentification à double facteur pour les enseignants ; limitation territoriale de l'accès à M365 (Suisse et pays limitrophes) ; redirection des courriels interdite ; contrôle strict des invités ; partage en intranet uniquement.",
        audience: "both",
        resources: []
      },
      {
        id: "edu-jura-ch",
        title: "edu.jura.ch",
        icon: "i-lucide-at-sign",
        description: "@edu.jura.ch est un domaine M365 construit en 2020. Sécurité renforcée, séparation des données, protocole d'accès. Adresse e-mail fournie aux élèves et personnels ; accès aux ressources via Edulog.",
        audience: "both",
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
        id: "gestion-comptes-donnees",
        title: "Gestion des comptes et des données",
        icon: "i-lucide-database",
        description: "Grâce à Information Barrier, l'accès aux données et aux communications est séparé en trois segments : personnel administratif ; enseignants et élèves par école ; enseignants et utilisateurs externes par école.",
        audience: "both",
        resources: []
      },
      {
        id: "controle-documents-partages",
        title: "Contrôle des documents partagés",
        icon: "i-lucide-folder-lock",
        description: "Le partage via SharePoint ou Teams est préconisé pour limiter les duplications et garder le contrôle sur les données. Données cryptées, suppression annuelle des équipes, labels de durée de vie et de confidentialité.",
        audience: "both",
        resources: []
      }
    ]
  },
  {
    id: "services-associes",
    title: "Services associés",
    icon: "i-lucide-puzzle",
    description: "Applications et plateformes utilisées dans le cadre scolaire.",
    audience: "both",
    subThemes: [
      {
        id: "cloee2",
        title: "CLOEE2",
        icon: "i-lucide-clipboard-list",
        description: "CLOEE2 permet la gestion des profils scolaires des élèves (inscription, notes, promotion, absences, parcours, édition de documents officiels) et des enseignants. L'accès aux données est limité aux personnes autorisées. Les données sont conservées pour une durée déterminée, puis supprimées ou archivées de manière sécurisée.",
        audience: "both",
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
        id: "educlasse-edulog",
        title: "Educlasse / Edulog",
        icon: "i-lucide-graduation-cap",
        description: "Educlasse est une plateforme pédagogique (centre MITIC interjurassien). Données minimisées (prénom, nom, identifiant technique pour les enseignants ; prénom et TechID pour les élèves). Hébergement en Suisse. Authentification Edulog.",
        audience: "both",
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
        id: "webuntis",
        title: "WebUntis",
        icon: "i-lucide-calendar-clock",
        description: "WebUntis permet de planifier les horaires, suivre les absences, réserver salles et matériel, planifier travaux écrits et devoirs, communiquer avec les élèves et informer les parents. Un contrat garantit la sécurité des données ; des administrateurs d'établissement gèrent les accès.",
        audience: "both",
        resources: []
      }
    ]
  },
  {
    id: "formation",
    title: "Formation",
    icon: "i-lucide-book-open-check",
    description: "Formation des coordinateurs numériques et sensibilisation à la protection des données.",
    audience: "both",
    subThemes: [
      {
        id: "coordinateurs-numeriques",
        title: "Coordinateurs numériques",
        icon: "i-lucide-users",
        description: "Un diplôme particulier est requis pour exercer la fonction de coordinateur numérique en établissement. Le Canton du Jura a collaboré avec la HEP-BEJUNE pour le CAS CNE ; un axe entier porte sur la protection des données et la sécurité informatique. Une intervention régulière sur ces enjeux est proposée lors des rencontres cantonales.",
        audience: "both",
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
  {
    id: "enseignants",
    title: "Enseignants",
    icon: "i-lucide-presentation",
    description: "Ressources et formations pour sensibiliser les enseignants à la protection des données.",
    audience: "both",
    subThemes: [
      {
        id: "diagnophish",
        title: "Diagnophish",
        icon: "i-lucide-fish",
        description: "Campagne de sensibilisation à la sécurité informatique et au hameçonnage. Le SFP organise également une conférence annuelle sur ces thématiques.",
        audience: "both",
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
        id: "hep-bejune-formations",
        title: "HEP-BEJUNE / formations",
        icon: "i-lucide-school",
        description: "Des conférences ont été organisées sur la sécurité informatique et la protection des données (PPDT JUNE, juristes, etc.).",
        audience: "both",
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
        id: "competences-fondamentales",
        title: "Compétences fondamentales",
        icon: "i-lucide-list-checks",
        description: "Reconnaître le type de données ; traiter les données selon leur type ; être vigilant avec les travaux d'élèves ; travailler avec les données personnelles.",
        audience: "both",
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
  {
    id: "eleves",
    title: "Élèves",
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
