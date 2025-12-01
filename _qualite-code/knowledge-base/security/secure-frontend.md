# Sécurité — Bonnes pratiques frontend

- Ne jamais injecter du HTML non filtré (attention à `v-html`)  
- Valider et sanitiser les inputs utilisateur côté serveur  
- Utiliser systématiquement HTTPS  
- Éviter d’exposer des configurations sensibles dans le bundle client  
- Gérer correctement l’authentification (tokens, cookies sécurisés, SameSite, HttpOnly)  
- Protéger contre le CSRF (SameSite, tokens anti-CSRF, en-têtes adéquats)
- Stocker les tokens côté serveur ou en cookies HttpOnly plutôt que localStorage
- Journaliser et surveiller les erreurs de sécurité sans divulguer d’informations sensibles au client
