#!/usr/bin/env python3
"""
Script pour appliquer les classifications LGPD restantes (recherchées par agents Sonnet)
"""

import re
import sys
from pathlib import Path

# Classifications des agents Sonnet
REMAINING_CLASSIFICATIONS = {
    # === BROWSERS ===
    "Apple Safari": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Apple Inc. (USA), non certifié DPF, bonnes protections vie privée",
        "remarque": "Niveau 2 : Apple Inc. (USA), non certifié DPF mais bonnes protections vie privée intégrées (ITP)"
    },
    "Brave": {
        "level": 1,
        "dataLocation": "Local/États-Unis",
        "personalData": False,
        "usageNotes": "Usage autorisé - Navigateur axé vie privée, pas de stockage historique",
        "remarque": "Niveau 1 : Brave Software Inc. (USA), conforme RGPD, bloque trackers par défaut, pas de stockage historique"
    },
    "Google Chrome": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Google (USA), certifié DPF, collecte télémétrie",
        "remarque": "Niveau 2 : Google LLC (USA), certifié EU-US DPF, collecte télémétrie significative"
    },
    "Mozilla Firefox": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Mozilla (USA), non certifié DPF, télémétrie configurable",
        "remarque": "Niveau 2 : Mozilla Corporation (USA), non certifié DPF, protection tracking par défaut mais télémétrie"
    },
    "Microsoft Edge": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Microsoft (USA), certifié DPF, télémétrie importante",
        "remarque": "Niveau 2 : Microsoft (USA), certifié EU-US DPF, télémétrie importante (48 connexions)"
    },

    # === AI TOOLS ===
    "ChatGPT": {
        "level": 2,
        "dataLocation": "États-Unis (option UE Enterprise)",
        "personalData": True,
        "usageNotes": "Usage avec précautions - OpenAI (USA), certifié DPF, option résidence UE (Enterprise)",
        "remarque": "Niveau 2 : OpenAI (USA), certifié DPF, résidence données UE disponible pour Enterprise/API depuis fév 2025"
    },
    "Claude": {
        "level": 2,
        "dataLocation": "États-Unis/Global",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Anthropic (USA), SOC 2/ISO 27001, Cloud Act applicable",
        "remarque": "Niveau 2 : Anthropic (USA), certifications SOC 2/ISO 27001/ISO 42001, traitement US/UE/Asie"
    },
    "Gemini": {
        "level": 2,
        "dataLocation": "États-Unis (centres UE disponibles)",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Google (USA), certifié DPF, centres données UE",
        "remarque": "Niveau 2 : Google (USA), certifié EU-US DPF, conforme RGPD/HIPAA pour Workspace"
    },
    "Microsoft Copilot": {
        "level": 2,
        "dataLocation": "États-Unis (option UE/CH)",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Microsoft (USA), certifié DPF, traitement CH prévu 2026",
        "remarque": "Niveau 2 : Microsoft (USA), certifié DPF, traitement in-country CH annoncé pour 2026"
    },
    "Mistral Le Chat": {
        "level": 1,
        "dataLocation": "France/Union Européenne",
        "personalData": True,
        "usageNotes": "Usage autorisé - Mistral AI (France), hébergement UE, conforme RGPD",
        "remarque": "Niveau 1 : Mistral AI (Paris, France), entreprise UE, hébergement UE, souveraineté données européenne"
    },
    "Perplexity": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Perplexity AI (USA), conforme DPF, SOC 2",
        "remarque": "Niveau 2 : Perplexity AI (USA), conforme EU-US DPF, SOC 2, trackers tiers"
    },

    # === DEV TOOLS ===
    "Cursor": {
        "level": 2,
        "dataLocation": "États-Unis (SCCs UE)",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Anysphere (USA), SOC 2, Privacy Mode disponible",
        "remarque": "Niveau 2 : Anysphere Inc. (USA), SOC 2 certifié, Privacy Mode avec rétention zéro disponible"
    },
    "PhpStorm": {
        "level": 1,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage autorisé - JetBrains (Tchéquie), hébergement UE, conforme RGPD",
        "remarque": "Niveau 1 : JetBrains s.r.o. (Tchéquie, UE), données traitées en UE, télémétrie opt-in"
    },
    "WebStorm": {
        "level": 1,
        "dataLocation": "Union Européenne",
        "personalData": True,
        "usageNotes": "Usage autorisé - JetBrains (Tchéquie), hébergement UE, conforme RGPD",
        "remarque": "Niveau 1 : JetBrains s.r.o. (Tchéquie, UE), données traitées en UE, télémétrie opt-in"
    },
    "Sublime Text": {
        "level": 2,
        "dataLocation": "Australie/États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Sublime HQ (Australie), sync cloud optionnel US",
        "remarque": "Niveau 2 : Sublime HQ (Australie), sync cloud optionnel (US), peut être utilisé hors-ligne"
    },
    "Zed": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Zed Industries (USA), télémétrie opt-in, mode hors-ligne",
        "remarque": "Niveau 2 : Zed Industries Inc. (USA), télémétrie opt-in, rétention zéro pour IA, mode hors-ligne possible"
    },
    "Bruno": {
        "level": 1,
        "dataLocation": "Local",
        "personalData": False,
        "usageNotes": "Usage autorisé - Open source, aucun cloud, données locales uniquement",
        "remarque": "Niveau 1 : open source, application locale sans cloud ni télémétrie, collections API stockées localement"
    },
    "Ghostty": {
        "level": 1,
        "dataLocation": "Local",
        "personalData": False,
        "usageNotes": "Usage autorisé - Open source, terminal local, aucune collecte données",
        "remarque": "Niveau 1 : open source (Hack Club), terminal local sans télémétrie ni fonctionnalités cloud"
    },

    # === MISC APPS ===
    "Notion": {
        "level": 2,
        "dataLocation": "États-Unis (UE Enterprise)",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Notion Labs (USA), résidence UE uniquement Enterprise",
        "remarque": "Niveau 2 : Notion Labs (USA), hébergement AWS US par défaut, résidence UE uniquement pour Enterprise"
    },
    "Todoist": {
        "level": 1,
        "dataLocation": "Union Européenne/Global",
        "personalData": True,
        "usageNotes": "Usage autorisé - Doist (USA), conforme RGPD, SOC 2, hébergement UE disponible",
        "remarque": "Niveau 1 : Doist (USA), conforme RGPD, SOC 2 certifié, Google Cloud avec options UE, pas de tracking invasif"
    },
    "MongoDB Atlas": {
        "level": 1,
        "dataLocation": "Union Européenne (configurable)",
        "personalData": True,
        "usageNotes": "Usage autorisé - MongoDB Inc. (USA), résidence données UE configurable",
        "remarque": "Niveau 1 : MongoDB Inc. (USA), permet sélection région UE (Frankfurt, Ireland), DPA disponible, conforme RGPD"
    },
    "Antigravity": {
        "level": 2,
        "dataLocation": "États-Unis",
        "personalData": True,
        "usageNotes": "Usage avec précautions - Google (USA), plateforme IA, cadre RGPD Google",
        "remarque": "Niveau 2 : Google (USA), plateforme dev IA (Gemini 3), infrastructure Google Cloud, cadre RGPD Google",
        "toValidate": True
    },
    "Gravity Designer": {
        "level": 3,
        "dataLocation": "Canada/Chine",
        "personalData": True,
        "usageNotes": "INTERDIT - Corel (Canada), transferts données vers Chine mentionnés",
        "remarque": "Niveau 3 : Corel (Canada/Cascade Parent Ltd), politique confidentialité mentionne transferts vers Chine"
    },
    "Dia": {
        "level": 1,
        "dataLocation": "Local",
        "personalData": False,
        "usageNotes": "Usage autorisé - Open source GNOME, application locale, aucune collecte",
        "remarque": "Niveau 1 : open source (GPL-2.0, projet GNOME), application locale, aucun cloud ni télémétrie"
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

    for software_name, classification in REMAINING_CLASSIFICATIONS.items():
        # Chercher le bloc du logiciel
        name_pattern = re.escape(f'name: "{software_name}"')

        if not re.search(name_pattern, content):
            print(f"⚠️  Non trouvé: {software_name}")
            continue

        level = classification["level"]

        # 1. Mettre à jour certificationLevel
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
        remarque_pattern = rf'(name: "{re.escape(software_name)}".*?usageNotes:\s*"[^"]*"),?\s*\n(\s*)remarque:'
        if re.search(remarque_pattern, content, flags=re.DOTALL):
            pattern = rf'(name: "{re.escape(software_name)}".*?)remarque:\s*"[^"]*"'
            replacement = rf'\g<1>remarque: "{remarque}"'
            new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        else:
            pattern = rf'(name: "{re.escape(software_name)}".*?usageNotes:\s*"[^"]*")'
            replacement = rf'\g<1>,\n    remarque: "{remarque}"'
            new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

        if new_content != content:
            content = new_content

        # 6. Ajouter toValidate si présent
        if classification.get("toValidate"):
            tovalidate_pattern = rf'(name: "{re.escape(software_name)}".*?)toValidate:'
            if not re.search(tovalidate_pattern, content, flags=re.DOTALL):
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
