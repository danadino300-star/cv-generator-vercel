# 🚀 Guide de Déploiement ProCVBuilder - SIMPLIFIÉ

## ✅ Problèmes Résolus

Tous les problèmes de configuration ont été corrigés :
- ✅ Fichiers de configuration créés (package.json, tsconfig.json, etc.)
- ✅ Dépendances installées et compatibles
- ✅ Code autonome (pas de dépendances croisées complexes)
- ✅ Configuration Vercel prête

## 🌐 Déploiement sur Vercel (RECOMMANDÉ)

### Option 1 : Déployer le Frontend Seul (Plus Simple)

C'est la méthode la plus simple et rapide :

1. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub

2. **Importez votre projet**
   - Cliquez sur "Add New Project"
   - Sélectionnez votre repository GitHub

3. **Configurez le déploiement**
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Déployez**
   - Cliquez sur "Deploy"
   - Attendez quelques minutes

Votre site sera en ligne sur `https://votre-projet.vercel.app` ! 🎉

### Option 2 : Déployer Frontend + Backend

Si vous voulez aussi le backend (API + PayPal) :

#### A. Déployer le Backend

1. Créez un nouveau projet Vercel pour le backend
2. **Root Directory:** `server`
3. Ajoutez les variables d'environnement dans Vercel :
   ```
   DATABASE_URL=votre_url_neon
   PAYPAL_CLIENT_ID=votre_id
   PAYPAL_CLIENT_SECRET=votre_secret
   PAYPAL_MODE=sandbox
   ```

#### B. Connecter le Frontend au Backend

1. Une fois le backend déployé, notez son URL (ex: `https://votre-backend.vercel.app`)
2. Modifiez `client/vercel.json` :
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://votre-backend.vercel.app/api/$1"
       }
     ]
   }
   ```
3. Redéployez le frontend

## 📊 Base de Données (Optionnel - Pour le Backend)

Si vous déployez le backend, vous aurez besoin d'une base de données :

1. **Créez une base de données sur Neon**
   - Allez sur [neon.tech](https://neon.tech)
   - Créez un compte gratuit
   - Créez un nouveau projet
   - Copiez la connection string

2. **Créez les tables**
   Exécutez ce SQL dans la console Neon :
   ```sql
   CREATE TABLE users (
     id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT NOT NULL UNIQUE,
     cv_count INTEGER NOT NULL DEFAULT 0,
     has_paid BOOLEAN NOT NULL DEFAULT false,
     created_at TIMESTAMP NOT NULL DEFAULT NOW()
   );

   CREATE TABLE cvs (
     id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id VARCHAR NOT NULL REFERENCES users(id),
     name TEXT NOT NULL,
     role TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     location TEXT NOT NULL,
     summary TEXT NOT NULL,
     created_at TIMESTAMP NOT NULL DEFAULT NOW()
   );
   ```

3. **Ajoutez l'URL dans Vercel**
   - Dans les paramètres du projet backend sur Vercel
   - Ajoutez `DATABASE_URL` avec votre connection string

## 🔧 Configuration PayPal (Optionnel)

1. Créez un compte développeur sur [developer.paypal.com](https://developer.paypal.com)
2. Créez une application sandbox
3. Copiez le Client ID et Secret
4. Ajoutez-les dans les variables d'environnement Vercel

## ✨ C'est Tout !

Votre site sera automatiquement redéployé à chaque push sur GitHub.

## 🐛 Dépannage

### Le build échoue
- Vérifiez les logs dans Vercel
- Assurez-vous que toutes les dépendances sont dans `package.json`

### Le site ne se charge pas
- Vérifiez que le Root Directory est correct (`client`)
- Vérifiez que le Build Command est `npm run build`

### Erreur 404 sur les routes
- Vérifiez que `vercel.json` existe dans le dossier client

## 📝 Notes Importantes

- Le frontend peut fonctionner SANS le backend
- Le backend n'est nécessaire que pour :
  - Sauvegarder les CV dans une base de données
  - Gérer les paiements PayPal
- Pour un site vitrine/portfolio, le frontend seul suffit

---

**Besoin d'aide ?** Consultez `TROUBLESHOOTING.md` pour plus de solutions.
