# Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer votre application CV Generator sur Vercel gratuitement.

## Prérequis

1. Un compte GitHub (pour connecter votre repo)
2. Un compte Vercel (gratuit sur vercel.com)
3. Une base de données PostgreSQL (Neon gratuit recommandé)
4. Les clés PayPal (depuis developer.paypal.com)

## Étape 1 : Préparer la Base de Données

### Option A : Utiliser Neon (Recommandé - Gratuit)

1. Allez sur **neon.tech** et créez un compte gratuit
2. Créez un nouveau projet PostgreSQL
3. Copiez la chaîne de connexion (DATABASE_URL)
4. Gardez-la pour l'étape 3

### Option B : Utiliser votre base de données existante

Si vous avez déjà une base de données, récupérez simplement la chaîne de connexion.

## Étape 2 : Préparer votre Repository Git

1. Assurez-vous que votre code est dans un repository GitHub
2. Poussez tous vos changements vers GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

## Étape 3 : Déployer sur Vercel

### Via Vercel Dashboard (Méthode Recommandée)

1. Allez sur **vercel.com** et connectez-vous
2. Cliquez sur **"Add New..." > "Project"**
3. Sélectionnez votre repository GitHub
4. Dans les paramètres du projet:
   - **Framework**: Auto-Detect (ou laissez vide)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Start Command**: `node dist/index.js`

5. Cliquez sur **"Environment Variables"** et ajoutez:
   - `DATABASE_URL` : Votre URL PostgreSQL (de Neon)
   - `PAYPAL_CLIENT_ID` : Votre client ID PayPal
   - `PAYPAL_CLIENT_SECRET` : Votre secret PayPal
   - `NODE_ENV` : `production`

6. Cliquez sur **"Deploy"**

Vercel construira et déploiera automatiquement votre application ! 🚀

### Via Vercel CLI (Alternative)

```bash
npm install -g vercel
vercel
```

Suivez les instructions interactives et fournissez les variables d'environnement quand demandé.

## Étape 4 : Configurer votre Domaine (Optionnel)

1. Après le déploiement, allez dans **Project Settings**
2. Cliquez sur **"Domains"**
3. Ajoutez un domaine personnalisé (gratuit avec un sous-domaine vercel.app)

## Variables d'Environnement Essentielles

Pour que l'application fonctionne, assurez-vous que ces variables sont définies dans Vercel:

| Variable | Valeur | Exemple |
|----------|--------|---------|
| `DATABASE_URL` | URL PostgreSQL | `postgresql://user:password@host/db` |
| `PAYPAL_CLIENT_ID` | Votre Client ID PayPal | `ABc12...` |
| `PAYPAL_CLIENT_SECRET` | Votre Secret PayPal | `EFg34...` |
| `NODE_ENV` | `production` | `production` |

## Dépannage

### Erreur : "Could not find the build directory"

Assurez-vous que:
- `npm run build` a réussi
- Le répertoire `dist/public` existe avec les fichiers compilés

### Erreur : "Database connection refused"

Vérifiez que:
- `DATABASE_URL` est correct et accessible depuis Vercel
- Si vous utilisez Neon, assurez-vous que vous autorisez les connexions externes

### Erreur PayPal

Vérifiez que:
- `PAYPAL_CLIENT_ID` et `PAYPAL_CLIENT_SECRET` sont corrects
- Les clés correspondent à l'environnement de test (sandbox)

## Test Local Avant Déploiement

Pour tester localement en mode production:

```bash
npm run build
npm run start
```

Puis accédez à `http://localhost:3000`

## Mise à Jour de l'Application

Pour mettre à jour votre application en production:

1. Faites les modifications locales
2. Poussez vers GitHub:
   ```bash
   git add .
   git commit -m "Update CV generator"
   git push
   ```
3. Vercel redéploiera automatiquement! 🔄

## Support

- Documentation Vercel: https://vercel.com/docs
- Documentation Neon: https://neon.tech/docs
- PayPal Dev: https://developer.paypal.com

---

**Votre application est prête pour Vercel !** Suivez simplement les étapes ci-dessus. 🎉
