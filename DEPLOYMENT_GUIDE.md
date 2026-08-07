# BeatMarket - Guide Deployment Vercel 🚀

## 📋 Vue d'ensemble
Application React + Vite déployée sur Vercel avec Supabase comme backend.

---

## 🔧 Configuration locale

### 1. Installation des dépendances
```bash
npm install
```

### 2. Variables d'environnement
```bash
# Copie le fichier template
cp .env.example .env.local

# Remplis avec tes clés Supabase
# URL: https://app.supabase.com/project/YOUR_PROJECT/settings/api
```

### 3. Développement local
```bash
npm run dev
# L'app ouvre automatiquement sur http://localhost:5173
```

---

## 🌐 Déploiement sur Vercel

### Étape 1: Connecter ton repo
1. Va sur [vercel.com](https://vercel.com)
2. Clique "New Project"
3. Sélectionne ton repo `beatmarket`
4. Vercel détecte automatiquement Vite ✅

### Étape 2: Variables d'environnement Vercel
Dans les settings du projet Vercel, ajoute:
```
VITE_SUPABASE_URL = https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY = your_anon_key_here
```

⚠️ **IMPORTANT**: Ces valeurs sont **publiques** (clé anon), c'est normal!

### Étape 3: Deploy
- Clique "Deploy"
- Vercel exécute `npm run build` → génère `/dist`
- Ton app est en ligne! 🎉

---

## 📁 Structure du build

```
beatmarket/
├── vercel.json          ← Config Vercel (rewrites, cache, headers)
├── vite.config.js       ← Config Vite (build optimisé)
├── package.json         ← Scripts npm
├── .env.example         ← Template env vars
├── .gitignore           ← Fichiers à ignorer
├── index.html           ← Point d'entrée
├── src/
│   ├── main.jsx         ← Initialisation React
│   ├── App.jsx          ← Composant principal
│   └── config.js        ← Config Supabase
└── dist/                ← Build output (après npm run build)
```

---

## 🚀 Optimisations Vercel appliquées

✅ **Rewrites SPA**: Les routes React fonctionnent sans `#`  
✅ **Cache intelligente**: Assets immuables en cache long terme  
✅ **Minification**: Code compressé (terser)  
✅ **Code splitting**: Vendors React + Supabase séparés  
✅ **Headers sécurité**: Protection XSS, clickjacking, etc.

---

## 🔄 CI/CD Automatique

À chaque push sur `main`:
1. ✅ Vercel déclenche le build
2. ✅ `npm run build` crée `/dist`
3. ✅ Deploy automatique
4. ✅ URL de preview générée

---

## 🐛 Troubleshooting

### Build échoue?
```bash
# Test local
npm run build
npm run preview
```

### Variables env non trouvées?
- Vérifier que les vars commencent par `VITE_`
- Vérifier dans Vercel > Settings > Environment Variables
- Redeploy après ajout de vars

### CORS avec Supabase?
- Les clés anon Supabase autorisent le frontend
- Vérifier les URL autorisées dans Supabase settings

---

## 📚 Ressources

- [Vercel Docs](https://vercel.com/docs)
- [Vite Guide](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)

---

**Status**: ✅ Configuration complète et prête au déploiement!
