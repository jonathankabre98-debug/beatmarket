# BeatMarket — Next.js migration (Phase 2 starter)

Ce dépôt contient la migration initiale vers une application Next.js (Phase 2).
L'objectif de cette PR est de rendre le projet prêt pour une mise en production sur Vercel,
avec des API serverless et une structure plus facile à faire évoluer.

Remarques importantes
- L'application frontend originale (index.html) a été conservée dans `/public/index.html` pour assurer une transition rapide.
- Un endpoint serverless `GET /api/config` a été ajouté pour fournir l'URL Supabase et la clé publique (anon).
  - Par défaut, s'il n'y a pas de variables d'environnement configurées, il retourne les valeurs présentes dans le fichier d'origine (si vous souhaitez garder la clé dans le code, elle reste utilisable).
  - Recommandation de sécurité : placer `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans les Environment Variables de Vercel.
  - NE PAS committer de clefs sensibles (service_role). Les actions sensibles doivent être faites côté serveur via des variables d'environnement secrètes (ex: `SUPABASE_SERVICE_ROLE`).

Fichiers ajoutés
- package.json — configuration Next.js + dépendances
- next.config.js — configuration Next.js basique
- pages/index.js — redirection vers `/index.html` (la SPA statique conservée)
- pages/api/config.js — API qui expose SUPABASE_URL et SUPABASE_ANON_KEY publics
- vercel.json — configuration de build/routage

Déploiement sur Vercel (étapes rapides)
1. Dans l'UI Vercel, importez le repo `jonathankabre98-debug/beatmarket`.
2. Dans Settings > Environment Variables, ajoutez (si vous le souhaitez) :
   - NEXT_PUBLIC_SUPABASE_URL = https://zwftcovxxirzzqdmkymc.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_NTyCZ4iyHpO7kzvZRVGa6A_YEjsXPhU
   - (Pour opérations serveur seulement) SUPABASE_SERVICE_ROLE = <votre-service-role-key>
3. Déployez — Vercel détectera Next.js et lancera la build.

Prochaines étapes recommandées (optionnel)
- Migrer le contenu de `public/index.html` vers un vrai app React (pages/components) utilisant `supabase-js` (dans /lib) et supprimer Babel-standalone et les bundles UMD.
- Ajouter des API serverless pour uploads (Génération de signed URLs) et actions admin (utilisant la clé service_role côté serveur).
- Remplacer les assets lourds et optimiser la performance (images, lazy-loading, etc.).

Notes
- Tu m'as demandé de ne pas ajouter l'interface admin ici — je laisse cela pour un repo/app séparé.
- Si tu veux que je continue et que je transforme `public/index.html` en pages React (composants modulaires), je peux le faire dans une PR suivante. Cela permettra:
  - Retirer Babel standalone et les UMD (meilleure perf),
  - Intégrer supabase-js proprement,
  - Ajouter auth et uploads sécurisés.

Si tu veux que je continue maintenant, dis "Continue migration" et je vais transformer progressivement l'application statique en une app Next.js complète (je préparerai des commits étape par étape et je documenterai chaque changement).
