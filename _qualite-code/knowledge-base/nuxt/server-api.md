# Nuxt — Backend / API (server-side)

- Mettre les routes API dans `server/api`  
- Valider et sanitiser toutes les données entrantes  
- Ne jamais retourner des données sensibles (mots de passe, tokens…) côté client  
- Gestion des erreurs : réponses structurées, messages neutres côté client (pas d’infos sensibles)
- Utiliser les variables d’environnement côté serveur uniquement (runtime, pas dans le bundle client)
