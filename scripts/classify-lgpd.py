#!/usr/bin/env python3
"""
Script de classification LGPD automatique pour le référentiel logiciels CEJEF.
Basé sur les critères GCN 2026:
- Niveau 1 (Vert): CH/UE hébergement + conforme RGPD + pas de tracking invasif
- Niveau 2 (Orange): Entreprise US avec DPF OU analytics tiers
- Niveau 3 (Rouge): Non conforme RGPD OU hébergement pays non adéquat (Chine, etc.)
"""

import json
import re
import sys
from pathlib import Path

# Base de connaissances des éditeurs et leurs caractéristiques
COMPANY_DATABASE = {
    # === NIVEAU 1 - VERT (CH/UE, conforme RGPD) ===
    "level_1": {
        "BDnF": {"country": "France", "location": "France", "reason": "Bibliothèque nationale de France, institution publique française"},
        "BlinkLearning": {"country": "Espagne", "location": "Union Européenne", "reason": "Entreprise espagnole (Madrid), hébergement UE"},
        "Bookili": {"country": "France", "location": "France", "reason": "Bayard/Milan Presse, éditeur français"},
        "Calengoo": {"country": "Allemagne", "location": "Allemagne", "reason": "Développeur allemand, app locale"},
        "Card2Brain": {"country": "Suisse", "location": "Suisse", "reason": "Entreprise suisse (Zurich), hébergement Suisse"},
        "Classtime": {"country": "Suisse", "location": "Suisse", "reason": "Classtime AG (Zurich), hébergement Suisse/UE"},
        "Code.org": {"country": "USA", "location": "États-Unis", "reason": "Organisation à but non lucratif, engagement fort vie privée enfants, COPPA/FERPA"},
        "Claro": {"country": "Royaume-Uni", "location": "Royaume-Uni", "reason": "Claro Software (UK), applications accessibilité"},
        "Druide": {"country": "Canada", "location": "Canada", "reason": "Druide informatique (Québec), hébergement Canada"},
        "Drive Infomaniak": {"country": "Suisse", "location": "Suisse", "reason": "Infomaniak (Genève), hébergement exclusivement Suisse"},
        "Dynamilis": {"country": "France", "location": "France", "reason": "Entreprise française, hébergement France"},
        "FizziQ": {"country": "France", "location": "France", "reason": "Trapèze Digital (France), hébergement UE"},
        "Flora Incognita": {"country": "Allemagne", "location": "Allemagne", "reason": "TU Ilmenau (Allemagne), projet de recherche public"},
        "Framasoft": {"country": "France", "location": "France", "reason": "Association française CHATONS, hébergement France"},
        "GeoGebra": {"country": "Autriche", "location": "Union Européenne", "reason": "GeoGebra GmbH (Linz, Autriche), hébergement UE"},
        "Kialo Edu": {"country": "Allemagne", "location": "Allemagne", "reason": "Kialo GmbH (Berlin), hébergement UE, DPA disponible"},
        "LearningView": {"country": "Suisse", "location": "Suisse", "reason": "PH Schwyz (Suisse), hébergement Suisse"},
        "Orthophore": {"country": "France", "location": "France", "reason": "Académie de Lille (France), service public"},
        "pCloud": {"country": "Suisse", "location": "Suisse", "reason": "pCloud AG (Suisse), option hébergement Luxembourg/Suisse"},
        "PDF Expert": {"country": "Ukraine", "location": "Union Européenne", "reason": "Readdle (Ukraine/UE), hébergement UE, conforme RGPD"},
        "Phonowriter": {"country": "Suisse", "location": "Suisse", "reason": "Développeur suisse, app locale"},
        "Phyphox": {"country": "Allemagne", "location": "Allemagne", "reason": "RWTH Aachen (Allemagne), université publique, pas de compte requis"},
        "Projet Voltaire": {"country": "France", "location": "France", "reason": "Woonoz SAS (France), hébergement France"},
        "Taptouche": {"country": "Canada", "location": "Canada", "reason": "De Marque (Québec), hébergement Canada"},
        "Threema": {"country": "Suisse", "location": "Suisse", "reason": "Threema GmbH (Pfäffikon, Suisse), chiffrement E2E, hébergement Suisse"},
        "Thunderbird": {"country": "USA", "location": "Local", "reason": "Mozilla Foundation, open source, client email local"},
        "Wooflash": {"country": "Belgique", "location": "Union Européenne", "reason": "Wooclap SA (Belgique), hébergement UE, conforme RGPD"},
    },

    # === NIVEAU 2 - ORANGE (US avec DPF, analytics tiers, Cloud Act) ===
    "level_2": {
        "Adobe Acrobat": {"country": "USA", "location": "États-Unis", "reason": "Adobe Inc. (USA), certifié EU-US DPF, hébergement US"},
        "Atlassian": {"country": "Australie", "location": "États-Unis/Australie", "reason": "Atlassian (Australie), certifié DPF, options hébergement UE"},
        "Babbel": {"country": "Allemagne", "location": "Union Européenne (AWS)", "reason": "Lesson Nine GmbH (Berlin), utilise AWS (Cloud Act)"},
        "Book Creator": {"country": "Royaume-Uni", "location": "Royaume-Uni/États-Unis", "reason": "Red Jumper Ltd (UK), utilise Google Cloud"},
        "Calendly": {"country": "USA", "location": "États-Unis", "reason": "Calendly LLC (USA), certifié DPF, SOC 2"},
        "Canva": {"country": "Australie", "location": "Australie/États-Unis", "reason": "Canva Pty Ltd (Australie), certifié DPF, hébergement AWS"},
        "Classroomscreen": {"country": "Pays-Bas", "location": "Union Européenne", "reason": "Classroomscreen BV (NL), utilise services tiers US"},
        "Dictaly": {"country": "France", "location": "France", "reason": "Entreprise française, mais analytics tiers"},
        "Doodle": {"country": "Suisse", "location": "Suisse", "reason": "TX Group (Suisse), mais sous-traitants US"},
        "Ed.AI": {"country": "USA", "location": "États-Unis", "reason": "Entreprise US EdTech, certifié DPF"},
        "Edpuzzle": {"country": "USA", "location": "États-Unis", "reason": "Edpuzzle Inc. (USA), certifié DPF, COPPA/FERPA"},
        "Educaplay": {"country": "Espagne", "location": "Union Européenne", "reason": "ADR Formación (Espagne), analytics tiers"},
        "Exam.net": {"country": "Suède", "location": "Union Européenne", "reason": "Exam.net AB (Suède), hébergement UE, conforme RGPD"},
        "Foxit": {"country": "USA", "location": "États-Unis", "reason": "Foxit Software (USA), certifié DPF"},
        "Genially": {"country": "Espagne", "location": "Union Européenne", "reason": "Genially Web SL (Espagne), utilise AWS"},
        "Gimkit": {"country": "USA", "location": "États-Unis", "reason": "Gimkit Inc. (USA), COPPA/FERPA compliant"},
        "JSTOR": {"country": "USA", "location": "États-Unis", "reason": "ITHAKA (USA), organisation à but non lucratif, DPF"},
        "Kahoot": {"country": "Norvège", "location": "Union Européenne/États-Unis", "reason": "Kahoot ASA (Norvège), hébergement AWS multi-région"},
        "Knowt": {"country": "USA", "location": "États-Unis", "reason": "Knowt Inc. (USA), startup EdTech"},
        "LearningApps": {"country": "Suisse", "location": "Suisse", "reason": "PH Bern (Suisse), mais widgets tiers"},
        "Lockee": {"country": "France", "location": "France", "reason": "Développeur français, hébergement UE, analytics"},
        "LyricsTraining": {"country": "Espagne", "location": "Union Européenne", "reason": "Empresa espagnole, publicités tiers"},
        "MagicSchool": {"country": "USA", "location": "États-Unis", "reason": "MagicSchool AI (USA), IA générative, SOC 2"},
        "MindMeister": {"country": "Allemagne", "location": "Union Européenne", "reason": "MeisterLabs (Munich), utilise AWS UE"},
        "Minecraft Education": {"country": "USA", "location": "États-Unis/Union Européenne", "reason": "Microsoft (USA), certifié DPF, options UE"},
        "Miro": {"country": "USA", "location": "États-Unis/Union Européenne", "reason": "Miro Inc. (USA), certifié DPF, SOC 2"},
        "NotebookLM": {"country": "USA", "location": "États-Unis", "reason": "Google (USA), certifié DPF"},
        "One Calendar": {"country": "USA", "location": "États-Unis", "reason": "Développeur US, synchronisation calendriers"},
        "Padlet": {"country": "USA", "location": "États-Unis", "reason": "Padlet Inc. (USA), certifié DPF, COPPA"},
        "Photopea": {"country": "Tchéquie", "location": "Union Européenne", "reason": "Ivan Kutskir (Tchéquie), publicités Google"},
        "Pixton": {"country": "Canada", "location": "Canada", "reason": "Pixton Comics (Canada), hébergement AWS"},
        "Plandeclasse": {"country": "Canada", "location": "Canada", "reason": "Développeur canadien"},
        "Plickers": {"country": "USA", "location": "États-Unis", "reason": "Plickers Inc. (USA), certifié DPF"},
        "Quizlet": {"country": "USA", "location": "États-Unis", "reason": "Quizlet Inc. (USA), certifié DPF, COPPA"},
        "Remarkable": {"country": "Norvège", "location": "Union Européenne", "reason": "reMarkable AS (Norvège), intégration cloud"},
        "Samsung Email": {"country": "Corée du Sud", "location": "Corée du Sud", "reason": "Samsung (Corée), pays adéquat, mais collecte analytics"},
        "Samsung Notes": {"country": "Corée du Sud", "location": "Corée du Sud", "reason": "Samsung (Corée), synchronisation cloud"},
        "Scholarvox": {"country": "France", "location": "France", "reason": "Cyberlibris (France), hébergement France"},
        "SchoolAI": {"country": "USA", "location": "États-Unis", "reason": "SchoolAI (USA), IA générative, FERPA"},
        "SMART Lumio": {"country": "Canada", "location": "Canada/États-Unis", "reason": "SMART Technologies (Canada), hébergement AWS"},
        "Soda PDF": {"country": "Canada", "location": "Canada", "reason": "Lulu Software (Canada), hébergement cloud"},
        "TeamViewer": {"country": "Allemagne", "location": "Allemagne", "reason": "TeamViewer AG (Allemagne), infrastructure mondiale"},
        "Trimble": {"country": "USA", "location": "États-Unis", "reason": "Trimble Inc. (USA), SketchUp, certifié DPF"},
        "Vokapi": {"country": "Suisse", "location": "Suisse", "reason": "Développeur suisse, synchronisation externe"},
        "Wakelet": {"country": "Royaume-Uni", "location": "Royaume-Uni", "reason": "Wakelet Ltd (UK), hébergement cloud"},
        "Wayground": {"country": "USA", "location": "États-Unis", "reason": "Quizizz Inc. (USA), certifié DPF, COPPA"},
        "Wooclap": {"country": "Belgique", "location": "Union Européenne", "reason": "Wooclap SA (Belgique), hébergement UE"},
        "Wordwall": {"country": "Royaume-Uni", "location": "Royaume-Uni", "reason": "Visual Education Ltd (UK), hébergement UK/US"},
        "Zapier": {"country": "USA", "location": "États-Unis", "reason": "Zapier Inc. (USA), certifié DPF, SOC 2"},
    },

    # === NIVEAU 3 - ROUGE (non conforme RGPD, Chine, etc.) ===
    "level_3": {
        "Azendoo": {"country": "France", "location": "Inconnu", "reason": "Service apparemment discontinué, politique confidentialité insuffisante"},
        "BlueMail": {"country": "USA", "location": "États-Unis", "reason": "Blix Inc. (USA), controverses collecte données emails, non certifié DPF"},
        "CapCut": {"country": "Chine", "location": "Chine", "reason": "ByteDance (Chine), amende RGPD 530M€, transfert données vers Chine"},
        "Classcraft": {"country": "Canada", "location": "États-Unis", "reason": "Classcraft Studios (Canada), acquis par HMH, collecte données comportementales extensive"},
        "Duolingo": {"country": "USA", "location": "États-Unis", "reason": "Duolingo Inc. (USA), collecte extensive, publicités ciblées version gratuite"},
        "Edubase Reader": {"country": "Hongrie", "location": "Hongrie", "reason": "Entreprise hongroise, politique confidentialité insuffisante"},
        "Garmin Connect": {"country": "USA", "location": "États-Unis", "reason": "Garmin Ltd (USA), données santé sensibles, transferts vers pays tiers"},
        "Glose": {"country": "USA", "location": "États-Unis", "reason": "Glose Education (France acquis USA), politique privacy incertaine"},
        "JungleAI": {"country": "Inconnu", "location": "Inconnu", "reason": "Startup IA, politique confidentialité insuffisante"},
        "LingoDeer": {"country": "Chine", "location": "Chine", "reason": "Entreprise chinoise, transfert données vers Chine"},
        "LinkedIn": {"country": "USA", "location": "États-Unis", "reason": "Microsoft/LinkedIn (USA), collecte extensive, profils professionnels mineurs déconseillés"},
        "Lucid": {"country": "USA", "location": "États-Unis", "reason": "Lucid Software (USA), collecte analytics extensive"},
        "Memrise": {"country": "Royaume-Uni", "location": "États-Unis", "reason": "Memrise Ltd (UK), IA controversée, publicités invasives version gratuite"},
        "Mine": {"country": "Israël", "location": "Israël", "reason": "Mine PrivacyOps (Israël), service découverte données, pays non adéquat UE"},
        "Mural": {"country": "USA", "location": "États-Unis", "reason": "Mural (USA), acquis par Microsoft, changements politique à venir"},
        "Prezi": {"country": "USA", "location": "États-Unis", "reason": "Prezi Inc. (USA), collecte analytics extensive, non certifié DPF"},
        "Soundtrap": {"country": "Suède", "location": "États-Unis", "reason": "Spotify/Soundtrap (Suède), hébergement US, collecte audio"},
        "Spark": {"country": "Ukraine", "location": "Ukraine", "reason": "Readdle (Ukraine), client email, accès contenu emails côté serveur"},
        "Suno.AI": {"country": "USA", "location": "États-Unis", "reason": "Suno AI (USA), IA générative, droits auteur incertains, politique privacy floue"},
    }
}

# Patterns pour identifier les logiciels par leur nom
NAME_PATTERNS = {
    "Adobe": "Adobe Acrobat",
    "Atlassian": "Atlassian",
    "Jira": "Atlassian",
    "Confluence": "Atlassian",
    "Trello": "Atlassian",
    "Azendoo": "Azendoo",
    "Babbel": "Babbel",
    "BDnF": "BDnF",
    "BlinkLearning": "BlinkLearning",
    "BlueMail": "BlueMail",
    "Book Creator": "Book Creator",
    "Bookili": "Bookili",
    "Calendly": "Calendly",
    "Calengoo": "Calengoo",
    "Canva": "Canva",
    "CapCut": "CapCut",
    "Card2Brain": "Card2Brain",
    "Claro": "Claro",
    "Classcraft": "Classcraft",
    "Classroomscreen": "Classroomscreen",
    "Classtime": "Classtime",
    "Code.org": "Code.org",
    "Dictaly": "Dictaly",
    "Doodle": "Doodle",
    "Drive Infomaniak": "Drive Infomaniak",
    "Druide": "Druide",
    "Antidote": "Druide",
    "Duolingo": "Duolingo",
    "Dynamilis": "Dynamilis",
    "Ed.AI": "Ed.AI",
    "Edpuzzle": "Edpuzzle",
    "Edubase": "Edubase Reader",
    "Educaplay": "Educaplay",
    "Exam.net": "Exam.net",
    "FizziQ": "FizziQ",
    "Flora Incognita": "Flora Incognita",
    "Foxit": "Foxit",
    "Framasoft": "Framasoft",
    "Garmin": "Garmin Connect",
    "Genially": "Genially",
    "GeoGebra": "GeoGebra",
    "Gimkit": "Gimkit",
    "Glose": "Glose",
    "JSTOR": "JSTOR",
    "JungleAI": "JungleAI",
    "Kahoot": "Kahoot",
    "Kialo": "Kialo Edu",
    "Knowt": "Knowt",
    "LearningApps": "LearningApps",
    "LearningView": "LearningView",
    "LingoDeer": "LingoDeer",
    "LinkedIn": "LinkedIn",
    "Lockee": "Lockee",
    "Lucid": "Lucid",
    "LyricsTraining": "LyricsTraining",
    "MagicSchool": "MagicSchool",
    "Memrise": "Memrise",
    "MindMeister": "MindMeister",
    "Mine": "Mine",
    "Minecraft": "Minecraft Education",
    "Miro": "Miro",
    "Mural": "Mural",
    "NotebookLM": "NotebookLM",
    "One Calendar": "One Calendar",
    "Orthophore": "Orthophore",
    "Padlet": "Padlet",
    "pCloud": "pCloud",
    "PDF Expert": "PDF Expert",
    "Phonowriter": "Phonowriter",
    "Photopea": "Photopea",
    "Phyphox": "Phyphox",
    "Pixton": "Pixton",
    "Plandeclasse": "Plandeclasse",
    "Plickers": "Plickers",
    "Prezi": "Prezi",
    "Projet Voltaire": "Projet Voltaire",
    "Voltaire": "Projet Voltaire",
    "Quizlet": "Quizlet",
    "Remarkable": "Remarkable",
    "Samsung Email": "Samsung Email",
    "Samsung Notes": "Samsung Notes",
    "Scholarvox": "Scholarvox",
    "SchoolAI": "SchoolAI",
    "School AI": "SchoolAI",
    "SMART": "SMART Lumio",
    "Lumio": "SMART Lumio",
    "Soda PDF": "Soda PDF",
    "Soundtrap": "Soundtrap",
    "Spark": "Spark",
    "Suno": "Suno.AI",
    "Taptouche": "Taptouche",
    "TeamViewer": "TeamViewer",
    "Threema": "Threema",
    "Thunderbird": "Thunderbird",
    "Trimble": "Trimble",
    "SketchUp": "Trimble",
    "Vokapi": "Vokapi",
    "Wakelet": "Wakelet",
    "Wayground": "Wayground",
    "Quizizz": "Wayground",
    "Wooclap": "Wooclap",
    "Wooflash": "Wooflash",
    "Wordwall": "Wordwall",
    "Zapier": "Zapier",
}

# Microsoft products - Level 1 (special DPA with education institutions)
MICROSOFT_PRODUCTS = ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft OneNote",
                      "Microsoft Teams", "Microsoft Forms", "Microsoft Planner", "Microsoft Whiteboard",
                      "OneDrive", "SharePoint", "Outlook", "Clipchamp"]


def find_software_key(name: str) -> tuple[str, int] | None:
    """Trouve la clé de base de données pour un nom de logiciel."""
    name_lower = name.lower()

    # Check Microsoft products first
    for ms_product in MICROSOFT_PRODUCTS:
        if ms_product.lower() in name_lower:
            return ("Microsoft", 1)

    # Check patterns
    for pattern, key in NAME_PATTERNS.items():
        if pattern.lower() in name_lower:
            # Find level
            for level, data in [("level_1", 1), ("level_2", 2), ("level_3", 3)]:
                if key in COMPANY_DATABASE.get(level, {}):
                    return (key, level)

    return None


def get_classification(name: str) -> dict | None:
    """Obtient la classification pour un logiciel."""
    result = find_software_key(name)
    if not result:
        return None

    key, level = result

    # Microsoft special case
    if key == "Microsoft":
        return {
            "level": 1,
            "country": "USA",
            "location": "Union Européenne (option)",
            "reason": "Microsoft (USA), contrat DPA CEJEF, hébergement UE disponible, certifié DPF, ISO 27001"
        }

    level_key = f"level_{level}" if isinstance(level, int) else level
    if level_key in COMPANY_DATABASE and key in COMPANY_DATABASE[level_key]:
        data = COMPANY_DATABASE[level_key][key]
        return {
            "level": int(level_key.split("_")[1]),
            "country": data["country"],
            "location": data["location"],
            "reason": data["reason"]
        }

    return None


def generate_usage_notes(level: int, reason: str) -> str:
    """Génère les notes d'utilisation selon le niveau."""
    if level == 1:
        return f"Usage autorisé - {reason}"
    elif level == 2:
        return f"Usage avec précautions - {reason}"
    else:
        return f"INTERDIT - {reason}"


def process_software_file():
    """Traite le fichier software-list.ts et génère les classifications."""
    file_path = Path(__file__).parent.parent / "app" / "data" / "software-list.ts"

    if not file_path.exists():
        print(f"Erreur: Fichier non trouvé: {file_path}")
        sys.exit(1)

    content = file_path.read_text(encoding="utf-8")

    # Extraire tous les noms de logiciels
    name_pattern = r'name:\s*"([^"]+)"'
    names = re.findall(name_pattern, content)

    print(f"Trouvé {len(names)} logiciels dans le fichier")
    print("=" * 60)

    # Classifications par niveau
    by_level = {1: [], 2: [], 3: [], "unknown": []}

    for name in names:
        classification = get_classification(name)
        if classification:
            by_level[classification["level"]].append({
                "name": name,
                **classification
            })
        else:
            by_level["unknown"].append(name)

    # Afficher les résultats
    print(f"\n=== NIVEAU 1 (VERT) - {len(by_level[1])} logiciels ===")
    for sw in sorted(by_level[1], key=lambda x: x["name"]):
        print(f"  - {sw['name']}: {sw['reason']}")

    print(f"\n=== NIVEAU 2 (ORANGE) - {len(by_level[2])} logiciels ===")
    for sw in sorted(by_level[2], key=lambda x: x["name"]):
        print(f"  - {sw['name']}: {sw['reason']}")

    print(f"\n=== NIVEAU 3 (ROUGE) - {len(by_level[3])} logiciels ===")
    for sw in sorted(by_level[3], key=lambda x: x["name"]):
        print(f"  - {sw['name']}: {sw['reason']}")

    print(f"\n=== NON CLASSIFIÉS - {len(by_level['unknown'])} logiciels ===")
    for name in sorted(by_level["unknown"]):
        print(f"  - {name}")

    # Générer les modifications à appliquer
    print("\n" + "=" * 60)
    print("MODIFICATIONS À APPLIQUER")
    print("=" * 60)

    modifications = []
    for level in [1, 2, 3]:
        for sw in by_level[level]:
            usage_notes = generate_usage_notes(sw["level"], sw["reason"])
            modifications.append({
                "name": sw["name"],
                "certificationLevel": sw["level"],
                "dataLocation": sw["location"],
                "usageNotes": usage_notes,
                "remarque": f"Niveau {sw['level']} : {sw['reason']}"
            })

    # Sauvegarder les modifications dans un fichier JSON
    output_path = Path(__file__).parent / "lgpd-classifications.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({
            "total": len(names),
            "classified": len(names) - len(by_level["unknown"]),
            "unclassified": by_level["unknown"],
            "modifications": modifications
        }, f, ensure_ascii=False, indent=2)

    print(f"\nClassifications sauvegardées dans: {output_path}")
    print(f"Total: {len(names)}")
    print(f"Classifiés: {len(names) - len(by_level['unknown'])}")
    print(f"À vérifier manuellement: {len(by_level['unknown'])}")

    return modifications, by_level["unknown"]


if __name__ == "__main__":
    process_software_file()
