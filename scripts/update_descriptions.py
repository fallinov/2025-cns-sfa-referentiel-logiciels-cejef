import re

file_path = "app/data/software-list.ts"

# Dictionary of known descriptions
descriptions = {
    "ADOBE ACROBAT": "Adobe Acrobat est la référence mondiale pour la création, l'édition et la gestion de documents PDF. Il permet aux enseignants de créer des supports de cours inaltérables, de corriger des copies numérisées avec des outils d'annotation avancés, et de sécuriser des documents administratifs. Ses fonctionnalités incluent la conversion de fichiers, la signature électronique et la reconnaissance de texte (OCR).",
    "ATLASSIAN (JIRA, CONFLUENCE, TRELLO)": "La suite Atlassian offre des outils puissants pour la gestion de projet et la collaboration. Trello est idéal pour organiser des tâches visuellement (Kanban), Jira pour le suivi de projets complexes, et Confluence pour créer une base de connaissances collaborative. Ces outils favorisent le travail d'équipe et l'organisation pédagogique.",
    "CANVA": "Canva est un outil de design graphique en ligne extrêmement intuitif. Il permet aux enseignants et aux élèves de créer facilement des présentations, des affiches, des infographies et des vidéos éducatives. Avec sa vaste bibliothèque de modèles et d'images, il stimule la créativité sans nécessiter de compétences techniques avancées.",
    "ANTIGRAVITY": "Antigravity est un assistant IA de nouvelle génération conçu pour le développement logiciel. Il agit comme un binôme virtuel, capable de comprendre le contexte du projet, de générer du code, de refactoriser et d'expliquer des concepts complexes. C'est un outil précieux pour l'apprentissage de la programmation et la productivité des développeurs.",
    "MICROSOFT COPILOT": "Microsoft Copilot est un assistant d'intelligence artificielle intégré à l'écosystème Microsoft 365. Il aide à rédiger des documents Word, analyser des données Excel, créer des présentations PowerPoint et gérer les emails Outlook. Pour les enseignants, c'est un gain de temps considérable pour la préparation de cours et l'administration.",
    "CODE.ORG": "Code.org est une plateforme éducative dédiée à l'apprentissage de l'informatique pour tous les âges. Elle propose des cours interactifs, des activités ludiques (comme l'Heure de Code) et des ressources pour les enseignants. C'est l'outil idéal pour initier les élèves à la logique de programmation de manière engageante.",
    "KAHOOT!": "Kahoot! est une plateforme d'apprentissage ludique basée sur le jeu. Elle permet de créer des quiz interactifs, des sondages et des défis pour dynamiser la classe. Les élèves participent en temps réel via leur smartphone ou ordinateur, ce qui favorise l'engagement et permet une évaluation formative instantanée.",
    "QUIZLET": "Quizlet est un outil d'étude mondialement connu pour ses cartes mémo (flashcards). Il permet aux élèves de mémoriser du vocabulaire, des dates ou des concepts clés grâce à divers modes d'apprentissage (jeux, tests, écriture). Les enseignants peuvent créer leurs propres listes ou utiliser celles partagées par la communauté.",
    "PADLET": "Padlet est un mur virtuel collaboratif où l'on peut épingler des textes, images, vidéos et liens. C'est un outil polyvalent pour le brainstorming, la collecte de ressources, la présentation de travaux d'élèves ou la création de portfolios numériques. Sa simplicité d'utilisation en fait un incontournable de la classe numérique.",
    "GENIALLY": "Genially permet de créer des contenus interactifs et animés : présentations, infographies, dossiers, jeux d'évasion (escape games), etc. Contrairement à un diaporama classique, Genially encourage l'exploration active du contenu par l'élève, rendant l'apprentissage plus dynamique et visuel."
}

with open(file_path, "r") as f:
    content = f.read()

# Function to replace/add description
def replace_description(match):
    full_match = match.group(0)
    name_match = re.search(r'name:\s*"([^"]+)"', full_match)
    short_desc_match = re.search(r'shortDescription:\s*"([^"]+)"', full_match)
    
    if not name_match:
        return full_match
        
    name = name_match.group(1)
    short_desc = short_desc_match.group(1) if short_desc_match else ""
    
    # Determine description
    description = descriptions.get(name)
    if not description:
        # Generate generic description
        description = f"{short_desc}. Cet outil est conçu pour faciliter les tâches pédagogiques et administratives, offrant des fonctionnalités adaptées au contexte éducatif."

    # Check if description field already exists
    if "description:" in full_match:
        return re.sub(r'description:\s*(null|"[^"]*")', f'description: "{description}"', full_match)
    else:
        # Add description after shortDescription
        return full_match.replace(f'shortDescription: "{short_desc}"', f'shortDescription: "{short_desc}",\n    description: "{description}"')

# Regex to match each software object
# This is tricky because of nested objects. We'll iterate line by line or use a simpler approach.
# Let's try line by line with state.

lines = content.split('\n')
new_lines = []
current_software = {}
in_software = False
buffer = []

for i, line in enumerate(lines):
    if "id:" in line:
        in_software = True
        
    if "name:" in line:
        match = re.search(r'name:\s*"([^"]+)"', line)
        if match:
            current_software['name'] = match.group(1)
            
    if "shortDescription:" in line:
        match = re.search(r'shortDescription:\s*"([^"]+)"', line)
        if match:
            current_software['shortDesc'] = match.group(1)
            new_lines.append(line)
            
            # Decide description
            name = current_software.get('name', '')
            short_desc = current_software.get('shortDesc', '')
            
            desc = descriptions.get(name)
            if not desc:
                 desc = f"{short_desc}. Cet outil est conçu pour faciliter les tâches pédagogiques et administratives, offrant des fonctionnalités adaptées au contexte éducatif."
            
            # Check if next line is description (to avoid duplicate if re-running)
            if i + 1 < len(lines) and "description:" in lines[i+1]:
                continue # Skip next line as we will overwrite it or it's already there
            else:
                # Add description
                indent = line[:line.find("shortDescription")]
                new_lines.append(f'{indent}description: "{desc}",')
        else:
             new_lines.append(line)
             
    elif "description:" in line and in_software:
        # Skip existing description line as we handled it above (or will handle it)
        # Wait, if we didn't handle it above (because shortDescription was processed), we should skip it here.
        # But if shortDescription was processed, we added the new description.
        # So we just skip this line.
        pass
    else:
        new_lines.append(line)

with open(file_path, "w") as f:
    f.write('\n'.join(new_lines))
