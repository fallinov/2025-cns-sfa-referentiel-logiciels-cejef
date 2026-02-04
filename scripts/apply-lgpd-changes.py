#!/usr/bin/env python3
"""
Script pour appliquer automatiquement les classifications LGPD au fichier software-list.ts
"""

import re
import sys
from pathlib import Path

# Base de connaissances complète avec corrections
CLASSIFICATIONS = {
    # === NIVEAU 1 (VERT) ===
    "ADOBE ACROBAT": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Adobe Inc. (USA), certifié EU-US DPF",
        "remarque": "Niveau 2 : Adobe Inc. (USA), certifié EU-US DPF, hébergement US, Cloud Act applicable"
    },
    "ATLASSIAN (JIRA, CONFLUENCE, TRELLO)": {
        "level": 2,
        "dataLocation": "États-Unis/Australie",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Atlassian (Australie), certifié DPF",
        "remarque": "Niveau 2 : Atlassian (Australie), certifié EU-US DPF, options hébergement UE disponibles"
    },
    "AZENDOO (app)": {
        "level": 3,
        "dataLocation": "Inconnu",
        "personalData": True,
        "usageNotes": "INTERDIT - Service discontinué, politique confidentialité insuffisante",
        "remarque": "Niveau 3 : service apparemment discontinué, aucune politique RGPD claire",
        "toValidate": True
    },
    "BABBEL": {
        "level": 2,
        "dataLocation": "Union Européenne (AWS)",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise allemande, hébergement AWS (Cloud Act)",
        "remarque": "Niveau 2 : Lesson Nine GmbH (Berlin), conforme RGPD, utilise AWS en UE (soumis au Cloud Act US)"
    },
    "BDnF (Application)": {
        "level": 1,
        "dataLocation": "France",
        "personalData": False,
        "usageNotes": "Usage autorisé - Service public français, hébergement France",
        "remarque": "Niveau 1 : Bibliothèque nationale de France, institution publique, hébergement France"
    },
    "BLINKLEARNING": {
        "level": 1,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage autorisé - Entreprise espagnole (Madrid), hébergement UE",
        "remarque": "Niveau 1 : siège à Madrid (Espagne), données hébergées en UE, conforme RGPD"
    },
    "BLUEMAIL": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Collecte extensive de données emails, politique confidentialité problématique",
        "remarque": "Niveau 3 : Blix Inc. (USA), historique controverses collecte données, non certifié DPF"
    },
    "BOOK CREATOR": {
        "level": 2,
        "dataLocation": "Royaume-Uni/États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise UK, hébergement Google Cloud",
        "remarque": "Niveau 2 : Red Jumper Ltd (UK), conforme RGPD UK, utilise Google Cloud, certifié COPPA"
    },
    "BOOKILI": {
        "level": 1,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage autorisé - Éditeur français (Bayard/Milan), hébergement France",
        "remarque": "Niveau 1 : Bayard/Milan Presse (France), données hébergées en France, conforme RGPD"
    },
    "CALENDLY": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, certifié DPF",
        "remarque": "Niveau 2 : Calendly LLC (USA), certifié EU-US DPF, SOC 2 Type II, DPA disponible"
    },
    "CALENGOO": {
        "level": 1,
        "dataLocation": "Allemagne",
        "personalData": True,
        "usageNotes": "Usage autorisé - App allemande, synchronise avec calendriers existants",
        "remarque": "Niveau 1 : développeur allemand, app locale sans stockage propre de données"
    },
    "CANVA": {
        "level": 2,
        "dataLocation": "Australie/États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise australienne, certifiée DPF",
        "remarque": "Niveau 2 : Canva Pty Ltd (Australie), certifié DPF, SOC 2, Canva for Education conforme COPPA/FERPA"
    },
    "CAPCUT": {
        "level": 3,
        "dataLocation": "Chine",
        "personalData": True,
        "usageNotes": "INTERDIT - ByteDance (Chine), amende RGPD 530M€, transfert données vers Chine",
        "remarque": "Niveau 3 : propriété de ByteDance (Chine), condamné pour violations RGPD massives"
    },
    "CARD2BRAIN": {
        "level": 1,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage autorisé - Entreprise suisse, hébergement Suisse",
        "remarque": "Niveau 1 : entreprise suisse (Zurich), données hébergées en Suisse, conforme LPD/RGPD"
    },
    "CLARO SPEAK PLUS iOS et CLARO PDF PRO iOS": {
        "level": 1,
        "dataLocation": "Royaume-Uni",
        "personalData": False,
        "usageNotes": "Usage autorisé - Claro Software (UK), apps accessibilité",
        "remarque": "Niveau 1 : Claro Software (UK), applications accessibilité, pas de stockage données"
    },
    "CLASSCRAFT": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Collecte données comportementales extensive, acquis par HMH",
        "remarque": "Niveau 3 : Classcraft (Canada) acquis par HMH (USA), collecte données comportementales extensive"
    },
    "CLASSROOMSCREEN": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise NL, utilise services tiers US",
        "remarque": "Niveau 2 : Classroomscreen BV (Pays-Bas), hébergement UE mais services tiers US"
    },
    "CLASSTIME": {
        "level": 1,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage autorisé - Entreprise suisse, hébergement Suisse/UE",
        "remarque": "Niveau 1 : Classtime AG (Zurich), hébergement Suisse/UE, conforme RGPD"
    },
    "CODE.ORG": {
        "level": 1,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage autorisé - Organisation non-profit, engagement fort vie privée enfants",
        "remarque": "Niveau 1 : Code.org (USA), organisation à but non lucratif, certifié COPPA/FERPA, engagement vie privée"
    },
    "DICTALY": {
        "level": 2,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise française, analytics tiers",
        "remarque": "Niveau 2 : entreprise française, hébergement France, mais analytics tiers"
    },
    "DOODLE": {
        "level": 2,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise suisse, sous-traitants US",
        "remarque": "Niveau 2 : TX Group (Suisse), hébergement CH, mais sous-traitants US"
    },
    "DRIVE INFOMANIAK": {
        "level": 1,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage autorisé - Infomaniak (Genève), hébergement exclusivement Suisse",
        "remarque": "Niveau 1 : Infomaniak (Genève), hébergement exclusivement Suisse, conforme LPD/RGPD"
    },
    "DRUIDE, ANTIDOTE": {
        "level": 1,
        "dataLocation": "Canada",
        "personalData": True,
        "usageNotes": "Usage autorisé - Druide informatique (Québec), hébergement Canada",
        "remarque": "Niveau 1 : Druide informatique (Québec), Canada pays adéquat UE, conforme RGPD"
    },
    "DUOLINGO": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Collecte extensive, publicités ciblées, données mineurs",
        "remarque": "Niveau 3 : Duolingo Inc. (USA), collecte extensive, publicités ciblées version gratuite"
    },
    "DYNAMILIS": {
        "level": 1,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage autorisé - Entreprise française, hébergement France",
        "remarque": "Niveau 1 : entreprise française, hébergement France, conforme RGPD"
    },
    "ED.AI": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US EdTech, certifié DPF",
        "remarque": "Niveau 2 : entreprise US EdTech, certifié EU-US DPF"
    },
    "EDPUZZLE": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, certifiée DPF, COPPA/FERPA",
        "remarque": "Niveau 2 : Edpuzzle Inc. (USA), certifié EU-US DPF, conforme COPPA/FERPA"
    },
    "EDUBASE READER": {
        "level": 3,
        "dataLocation": "Hongrie",
        "personalData": True,
        "usageNotes": "INTERDIT - Politique confidentialité insuffisante",
        "remarque": "Niveau 3 : entreprise hongroise, politique confidentialité insuffisante"
    },
    "EDUCAPLAY": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise espagnole, analytics tiers",
        "remarque": "Niveau 2 : ADR Formación (Espagne), hébergement UE, analytics tiers"
    },
    "EXAM.NET": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise suédoise, hébergement UE",
        "remarque": "Niveau 2 : Exam.net AB (Suède), hébergement UE, conforme RGPD, quelques services tiers"
    },
    "FIZZIQ": {
        "level": 1,
        "dataLocation": "France",
        "personalData": False,
        "usageNotes": "Usage autorisé - Trapèze Digital (France), hébergement UE",
        "remarque": "Niveau 1 : Trapèze Digital (France), hébergement UE, pas de compte requis"
    },
    "FLORA INCOGNITA (app)": {
        "level": 1,
        "dataLocation": "Allemagne",
        "personalData": False,
        "usageNotes": "Usage autorisé - Projet de recherche allemand (TU Ilmenau)",
        "remarque": "Niveau 1 : TU Ilmenau (Allemagne), projet de recherche public, pas de compte requis"
    },
    "FOXIT READER": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, certifiée DPF",
        "remarque": "Niveau 2 : Foxit Software (USA), certifié EU-US DPF"
    },
    "FRAMASOFT": {
        "level": 1,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage autorisé - Association française, hébergement France",
        "remarque": "Niveau 1 : Framasoft, association française CHATONS, hébergement France, open source"
    },
    "GARMIN CONNECT": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Données santé sensibles, transferts pays tiers",
        "remarque": "Niveau 3 : Garmin Ltd (USA), données santé sensibles, transferts vers pays tiers"
    },
    "GENIALLY": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise espagnole, utilise AWS",
        "remarque": "Niveau 2 : Genially Web SL (Espagne), hébergement UE, utilise AWS"
    },
    "GEOGEBRA": {
        "level": 1,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage autorisé - Entreprise autrichienne (Linz), hébergement UE",
        "remarque": "Niveau 1 : GeoGebra GmbH (Linz, Autriche), hébergement UE, conforme RGPD"
    },
    "GIMKIT": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, COPPA/FERPA compliant",
        "remarque": "Niveau 2 : Gimkit Inc. (USA), conforme COPPA/FERPA"
    },
    "GLOSE": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Politique privacy incertaine après acquisition",
        "remarque": "Niveau 3 : Glose Education (France acquis USA), politique privacy incertaine"
    },
    "JSTOR": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Organisation non-profit US, DPF",
        "remarque": "Niveau 2 : ITHAKA (USA), organisation à but non lucratif, certifié DPF"
    },
    "JUNGLEAI": {
        "level": 3,
        "dataLocation": "Inconnu",
        "personalData": True,
        "usageNotes": "INTERDIT - Startup IA, politique confidentialité insuffisante",
        "remarque": "Niveau 3 : startup IA, politique confidentialité insuffisante",
        "toValidate": True
    },
    "KAHOOT": {
        "level": 2,
        "dataLocation": "Union Européenne/États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise norvégienne, hébergement AWS multi-région",
        "remarque": "Niveau 2 : Kahoot ASA (Norvège), hébergement AWS multi-région, certifié COPPA"
    },
    "KIALO EDU": {
        "level": 1,
        "dataLocation": "Allemagne",
        "personalData": True,
        "usageNotes": "Usage autorisé - Entreprise allemande (Berlin), hébergement UE",
        "remarque": "Niveau 1 : Kialo GmbH (Berlin), hébergement UE, DPA disponible, conforme RGPD"
    },
    "KNOWT": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Startup EdTech US",
        "remarque": "Niveau 2 : Knowt Inc. (USA), startup EdTech, politique privacy standard"
    },
    "LEARNINGAPPS": {
        "level": 2,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage avec précautions - PH Bern (Suisse), widgets tiers",
        "remarque": "Niveau 2 : PH Bern (Suisse), hébergement Suisse, mais intègre widgets tiers"
    },
    "LEARNINGVIEW.ORG": {
        "level": 1,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage autorisé - PH Schwyz (Suisse), hébergement Suisse",
        "remarque": "Niveau 1 : PH Schwyz (Suisse), hébergement Suisse, conforme LPD"
    },
    "LINGODEER": {
        "level": 3,
        "dataLocation": "Chine",
        "personalData": True,
        "usageNotes": "INTERDIT - Entreprise chinoise, transfert données vers Chine",
        "remarque": "Niveau 3 : entreprise chinoise, transfert données vers pays non adéquat"
    },
    "LINKEDIN": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Collecte extensive, profils professionnels mineurs déconseillés",
        "remarque": "Niveau 3 : Microsoft/LinkedIn (USA), collecte extensive, non adapté aux mineurs"
    },
    "LOCKEE.FR": {
        "level": 2,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Développeur français, analytics tiers",
        "remarque": "Niveau 2 : développeur français, hébergement UE, analytics tiers"
    },
    "LUCID": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Collecte analytics extensive, non certifié DPF",
        "remarque": "Niveau 3 : Lucid Software (USA), collecte analytics extensive, non certifié DPF"
    },
    "LYRICSTRAINING": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise espagnole, publicités tiers",
        "remarque": "Niveau 2 : entreprise espagnole, hébergement UE, publicités tiers"
    },
    "MAGICSCHOOL.AI": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - IA générative US, SOC 2 certifié",
        "remarque": "Niveau 2 : MagicSchool AI (USA), IA générative, SOC 2, FERPA compliant"
    },
    "MEMRISE": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Publicités invasives, IA controversée",
        "remarque": "Niveau 3 : Memrise Ltd (UK/USA), publicités invasives version gratuite"
    },
    "MINDMEISTER": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise allemande, utilise AWS UE",
        "remarque": "Niveau 2 : MeisterLabs (Munich), utilise AWS UE, conforme RGPD"
    },
    "MINE": {
        "level": 3,
        "dataLocation": "Israël",
        "personalData": True,
        "usageNotes": "INTERDIT - Pays non adéquat UE, service découverte données",
        "remarque": "Niveau 3 : Mine PrivacyOps (Israël), pays non adéquat UE"
    },
    "MINECRAFT : EDUCATION EDITION": {
        "level": 2,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Microsoft, certifié DPF, hébergement UE disponible",
        "remarque": "Niveau 2 : Microsoft (USA), certifié DPF, hébergement UE disponible, COPPA/FERPA"
    },
    "MIRO": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, certifiée DPF, SOC 2",
        "remarque": "Niveau 2 : Miro Inc. (USA), certifié EU-US DPF, SOC 2, options UE"
    },
    "MURAL": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Acquis par Microsoft, changements politique à venir",
        "remarque": "Niveau 3 : Mural (USA), acquis par Microsoft, politique privacy en transition",
        "toValidate": True
    },
    "NOTEBOOKLM": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Google (USA), certifié DPF",
        "remarque": "Niveau 2 : Google (USA), certifié EU-US DPF, IA générative"
    },
    "ONE CALENDAR": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Développeur US, synchronisation calendriers",
        "remarque": "Niveau 2 : développeur US, synchronisation avec services tiers"
    },
    "ORTHOHPHORE": {
        "level": 1,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage autorisé - Académie de Lille, service public français",
        "remarque": "Niveau 1 : Académie de Lille (France), service public, hébergement France"
    },
    "PADLET": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, certifiée DPF, COPPA",
        "remarque": "Niveau 2 : Padlet Inc. (USA), certifié EU-US DPF, conforme COPPA"
    },
    "PCLOUD": {
        "level": 1,
        "dataLocation": "Suisse/Luxembourg",
        "personalData": True,
        "usageNotes": "Usage autorisé - pCloud AG (Suisse), hébergement Suisse/Luxembourg",
        "remarque": "Niveau 1 : pCloud AG (Suisse), option hébergement Luxembourg ou Suisse"
    },
    "PDF EXPERT": {
        "level": 1,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage autorisé - Readdle (Ukraine), hébergement UE",
        "remarque": "Niveau 1 : Readdle (Ukraine/UE), hébergement UE, conforme RGPD"
    },
    "PHONOWRITER": {
        "level": 1,
        "dataLocation": "Suisse",
        "personalData": False,
        "usageNotes": "Usage autorisé - Développeur suisse, app locale",
        "remarque": "Niveau 1 : développeur suisse, application locale, pas de stockage cloud"
    },
    "PHOTOPEA": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Développeur tchèque, publicités Google",
        "remarque": "Niveau 2 : Ivan Kutskir (Tchéquie), hébergement UE, publicités Google"
    },
    "PHYPHOX": {
        "level": 1,
        "dataLocation": "Allemagne",
        "personalData": False,
        "usageNotes": "Usage autorisé - RWTH Aachen, université publique allemande",
        "remarque": "Niveau 1 : RWTH Aachen (Allemagne), université publique, pas de compte requis"
    },
    "PIXTON": {
        "level": 2,
        "dataLocation": "Canada",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise canadienne, hébergement AWS",
        "remarque": "Niveau 2 : Pixton Comics (Canada), hébergement AWS, COPPA compliant"
    },
    "PLANDECLASSE.CA": {
        "level": 2,
        "dataLocation": "Canada",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Développeur canadien",
        "remarque": "Niveau 2 : développeur canadien, politique privacy basique"
    },
    "PLICKERS": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, certifiée DPF",
        "remarque": "Niveau 2 : Plickers Inc. (USA), certifié EU-US DPF, COPPA"
    },
    "PREZI": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Collecte analytics extensive, non certifié DPF",
        "remarque": "Niveau 3 : Prezi Inc. (USA), collecte analytics extensive, non certifié DPF"
    },
    "PROJET VOLTAIRE": {
        "level": 1,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage autorisé - Woonoz SAS (France), hébergement France",
        "remarque": "Niveau 1 : Woonoz SAS (France), hébergement France, conforme RGPD"
    },
    "QUIZLET": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Entreprise US, certifiée DPF, COPPA",
        "remarque": "Niveau 2 : Quizlet Inc. (USA), certifié EU-US DPF, conforme COPPA"
    },
    "REMARKABLE INTEGRATION ONEDRIVE": {
        "level": 2,
        "dataLocation": "Union Européenne/États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - reMarkable (Norvège), intégration cloud",
        "remarque": "Niveau 2 : reMarkable AS (Norvège), intégration OneDrive, hébergement multi-région"
    },
    "SAMSUNG EMAIL": {
        "level": 2,
        "dataLocation": "Corée du Sud",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Samsung (Corée du Sud), collecte analytics",
        "remarque": "Niveau 2 : Samsung (Corée), pays adéquat UE, mais collecte analytics"
    },
    "SAMSUNG NOTES": {
        "level": 2,
        "dataLocation": "Corée du Sud",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Samsung (Corée du Sud), synchronisation cloud",
        "remarque": "Niveau 2 : Samsung (Corée), pays adéquat UE, synchronisation cloud"
    },
    "SCHOLARVOX": {
        "level": 2,
        "dataLocation": "France",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Cyberlibris (France), hébergement France",
        "remarque": "Niveau 2 : Cyberlibris (France), hébergement France, quelques trackers tiers"
    },
    "SCHOOL AI": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - IA générative US, FERPA compliant",
        "remarque": "Niveau 2 : SchoolAI (USA), IA générative, conforme FERPA"
    },
    "SMART TECH : LUMIO": {
        "level": 2,
        "dataLocation": "Canada/États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - SMART Technologies (Canada), hébergement AWS",
        "remarque": "Niveau 2 : SMART Technologies (Canada), hébergement AWS, DPA disponible"
    },
    "SODA PDF": {
        "level": 2,
        "dataLocation": "Canada",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Lulu Software (Canada), hébergement cloud",
        "remarque": "Niveau 2 : Lulu Software (Canada), hébergement cloud, politique privacy standard"
    },
    "SOUNDTRAP EDUCATION": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - Spotify/Soundtrap, hébergement US, collecte audio",
        "remarque": "Niveau 3 : Spotify/Soundtrap (Suède), hébergement US, collecte données audio"
    },
    "SPARK": {
        "level": 3,
        "dataLocation": "Ukraine",
        "personalData": True,
        "usageNotes": "INTERDIT - Client email, accès contenu côté serveur",
        "remarque": "Niveau 3 : Readdle/Spark (Ukraine), accès contenu emails côté serveur"
    },
    "SUNO.AI": {
        "level": 3,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "INTERDIT - IA générative, droits auteur incertains, politique privacy floue",
        "remarque": "Niveau 3 : Suno AI (USA), IA générative musicale, droits auteur incertains"
    },
    "TAPTOUCHE": {
        "level": 1,
        "dataLocation": "Canada",
        "personalData": True,
        "usageNotes": "Usage autorisé - De Marque (Québec), hébergement Canada",
        "remarque": "Niveau 1 : De Marque (Québec), Canada pays adéquat UE, conforme RGPD"
    },
    "TEAMVIEWER": {
        "level": 2,
        "dataLocation": "Allemagne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - TeamViewer AG (Allemagne), infrastructure mondiale",
        "remarque": "Niveau 2 : TeamViewer AG (Allemagne), infrastructure mondiale, certifié ISO 27001"
    },
    "THREEMA EDUCATION": {
        "level": 1,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage autorisé - Threema GmbH (Suisse), chiffrement E2E",
        "remarque": "Niveau 1 : Threema GmbH (Pfäffikon, Suisse), chiffrement E2E, hébergement Suisse"
    },
    "THUNDERBIRD": {
        "level": 1,
        "dataLocation": "Local",
        "personalData": False,
        "usageNotes": "Usage autorisé - Mozilla Foundation, client email local open source",
        "remarque": "Niveau 1 : Mozilla Foundation, open source, client email local"
    },
    "TRIMBLE INC.": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Trimble Inc. (USA), SketchUp, certifié DPF",
        "remarque": "Niveau 2 : Trimble Inc. (USA), SketchUp, certifié EU-US DPF"
    },
    "VOKAPI (app)": {
        "level": 2,
        "dataLocation": "Suisse",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Développeur suisse, synchronisation externe",
        "remarque": "Niveau 2 : développeur suisse, hébergement Suisse, synchronisation services tiers"
    },
    "WAKELET": {
        "level": 2,
        "dataLocation": "Royaume-Uni",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Wakelet Ltd (UK), hébergement cloud",
        "remarque": "Niveau 2 : Wakelet Ltd (UK), hébergement cloud, conforme RGPD UK"
    },
    "WAYGROUND (anc. QUIZIZZ)": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Quizizz Inc. (USA), certifié DPF, COPPA",
        "remarque": "Niveau 2 : Quizizz Inc. (USA), certifié EU-US DPF, conforme COPPA"
    },
    "WOOCLAP": {
        "level": 2,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Wooclap SA (Belgique), hébergement UE",
        "remarque": "Niveau 2 : Wooclap SA (Belgique), hébergement UE, quelques services tiers"
    },
    "WOOFLASH": {
        "level": 1,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage autorisé - Wooclap SA (Belgique), hébergement UE",
        "remarque": "Niveau 1 : Wooclap SA (Belgique), hébergement UE, conforme RGPD"
    },
    "WORDWALL": {
        "level": 2,
        "dataLocation": "Royaume-Uni",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Visual Education Ltd (UK), hébergement UK/US",
        "remarque": "Niveau 2 : Visual Education Ltd (UK), hébergement UK, conforme RGPD UK"
    },
    "ZAPIER Et ZAPIER OUTLOOK": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Zapier Inc. (USA), certifié DPF, SOC 2",
        "remarque": "Niveau 2 : Zapier Inc. (USA), certifié EU-US DPF, SOC 2 Type II"
    },
    # === Microsoft Products - Level 1 (DPA CEJEF) ===
    "Microsoft Word": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft Excel": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft PowerPoint": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft OneNote": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft Teams": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft Forms": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft Planner": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft Whiteboard": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft OneDrive": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft Outlook": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
    "Microsoft Clipchamp": {
        "level": 1,
        "dataLocation": "Union Européenne (option)",
        "personalData": True,
        "usageNotes": "Usage autorisé - Microsoft, contrat DPA CEJEF, hébergement UE",
        "remarque": "Niveau 1 : Microsoft (USA), contrat DPA institutionnel CEJEF, hébergement UE disponible, certifié DPF/ISO 27001"
    },
}


def apply_changes():
    """Applique les modifications au fichier software-list.ts"""
    file_path = Path(__file__).parent.parent / "app" / "data" / "software-list.ts"

    if not file_path.exists():
        print(f"Erreur: Fichier non trouvé: {file_path}")
        sys.exit(1)

    content = file_path.read_text(encoding="utf-8")
    original_content = content
    changes_made = 0

    for software_name, classification in CLASSIFICATIONS.items():
        # Chercher le bloc du logiciel
        # Pattern pour trouver le nom et les champs à modifier
        name_pattern = re.escape(f'name: "{software_name}"')

        if not re.search(name_pattern, content):
            print(f"⚠️  Non trouvé: {software_name}")
            continue

        # Construire le pattern pour trouver le bloc complet
        # On cherche du nom jusqu'aux champs à modifier

        # 1. Mettre à jour certificationLevel
        level = classification["level"]
        pattern = rf'(name: "{re.escape(software_name)}".*?certificationLevel:)\s*\d+'
        replacement = rf'\g<1> {level}'
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        if new_content != content:
            content = new_content

        # 2. Mettre à jour dataLocation
        data_location = classification["dataLocation"]
        pattern = rf'(name: "{re.escape(software_name)}".*?dataLocation:)\s*"[^"]*"'
        replacement = rf'\g<1> "{data_location}"'
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        if new_content != content:
            content = new_content

        # 3. Mettre à jour personalData
        personal_data = "true" if classification["personalData"] else "false"
        pattern = rf'(name: "{re.escape(software_name)}".*?personalData:)\s*(true|false)'
        replacement = rf'\g<1> {personal_data}'
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        if new_content != content:
            content = new_content

        # 4. Mettre à jour usageNotes
        usage_notes = classification["usageNotes"]
        pattern = rf'(name: "{re.escape(software_name)}".*?usageNotes:)\s*(?:null|"[^"]*")'
        replacement = rf'\g<1> "{usage_notes}"'
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        if new_content != content:
            content = new_content

        # 5. Ajouter ou mettre à jour remarque
        remarque = classification["remarque"]

        # Vérifier si remarque existe déjà
        remarque_pattern = rf'(name: "{re.escape(software_name)}".*?usageNotes:\s*"[^"]*"),?\s*\n(\s*)remarque:'
        if re.search(remarque_pattern, content, flags=re.DOTALL):
            # Mettre à jour remarque existant
            pattern = rf'(name: "{re.escape(software_name)}".*?)remarque:\s*"[^"]*"'
            replacement = rf'\g<1>remarque: "{remarque}"'
            new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        else:
            # Ajouter remarque après usageNotes
            pattern = rf'(name: "{re.escape(software_name)}".*?usageNotes:\s*"[^"]*")'
            replacement = rf'\g<1>,\n    remarque: "{remarque}"'
            new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

        if new_content != content:
            content = new_content

        # 6. Ajouter toValidate si présent
        if classification.get("toValidate"):
            # Vérifier si toValidate existe déjà
            tovalidate_pattern = rf'(name: "{re.escape(software_name)}".*?)toValidate:'
            if not re.search(tovalidate_pattern, content, flags=re.DOTALL):
                # Ajouter toValidate après remarque
                pattern = rf'(name: "{re.escape(software_name)}".*?remarque:\s*"[^"]*")'
                replacement = rf'\g<1>,\n    toValidate: true'
                new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
                if new_content != content:
                    content = new_content

        changes_made += 1
        print(f"✅ {software_name}: Niveau {level}")

    if content != original_content:
        file_path.write_text(content, encoding="utf-8")
        print(f"\n{'=' * 60}")
        print(f"✅ {changes_made} logiciels mis à jour")
        print(f"Fichier sauvegardé: {file_path}")
    else:
        print("\n⚠️  Aucune modification effectuée")


if __name__ == "__main__":
    apply_changes()
