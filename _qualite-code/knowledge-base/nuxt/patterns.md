# Nuxt — Patterns & anti-patterns

## À privilégier
- Composants UI vs composants métier  
- Composition API + composables  
- Séparation UI / logique / données  

## À éviter
- Pages « monolithiques »  
- Mélange logique métier + UI dans un même fichier massif  
- Code CSS/JS redondant ou non justifié  
- `v-html` non contrôlé (risque XSS)
- Bypass des composants Nuxt UI ou des utilitaires Tailwind sans raison documentée
