# Nuxt — Sécurité & bonnes pratiques

- Ne jamais exposer de secrets dans le frontend
- Utiliser `server/api` pour la logique sensible
- Sanitiser les données utilisateur avant rendu
- Éviter `v-html` sauf cas très contrôlés
- Préférer les cookies sécurisés (HttpOnly, SameSite=Lax/Strict) pour l’authentification
- Toujours valider/sanitiser les entrées côté serveur avant réponse
- Appliquer une CSP stricte (voir `security/csp.md`), tester en `Report-Only` puis activer
