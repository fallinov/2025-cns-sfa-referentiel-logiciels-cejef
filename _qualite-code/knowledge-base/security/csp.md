# Sécurité — Content Security Policy (CSP)

- Définir des directives CSP strictes  
- Éviter `unsafe-inline` et `unsafe-eval` dans le JS  
- Restreindre les sources externes (scripts, styles, images, fonts)  
- Tester la politique CSP en mode `Report-Only` avant déploiement complet  
- Exemple de base (à adapter) : `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'`
- Passer de `Report-Only` à `Enforce` après validation et collecte des rapports
