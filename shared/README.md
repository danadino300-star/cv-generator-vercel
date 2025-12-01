# ProCVBuilder - Professional CV Builder

Une application web moderne pour créer des CV professionnels avec un système de paiement PayPal intégré.

## 📁 Structure du Projet

```
ProCVBuilder/
├── client/              # Frontend React + Vite
│   ├── src/
│   │   ├── components/  # Composants UI réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   ├── hooks/       # Hooks React personnalisés
│   │   ├── lib/         # Utilitaires et configuration
│   │   └── data/        # Données statiques
│   ├── public/          # Assets statiques
│   └── index.html       # Point d'entrée HTML
├── server/              # Backend Node.js + Express
│   ├── app.ts           # Configuration Express
│   ├── routes.ts        # Routes API
│   ├── storage.ts       # Couche d'accès aux données
│   ├── paypal.ts        # Intégration PayPal
│   ├── index-dev.ts     # Point d'entrée développement
│   └── index-prod.ts    # Point d'entrée production
└── shared/              # Code partagé
    └── schema.ts        # Schémas de base de données et validation
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ et npm
- Une base de données PostgreSQL (Neon recommandé)
- Compte PayPal Developer (pour les paiements)

### Installation des dépendances

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install

# Shared
cd ../shared
npm install
```

### Configuration des variables d'environnement

Créez un fichier `.env` dans le dossier `server/`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_neon_database_url
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
```

### Démarrage en développement

```bash
# Terminal 1 - Démarrer le serveur
cd server
npm run dev

# Terminal 2 - Démarrer le client
cd client
npm run dev
```

Le client sera accessible sur `http://localhost:5173` et le serveur sur `http://localhost:5000`.

## 🏗️ Build pour Production

### Build du client
```bash
cd client
npm run build
```

Le build sera généré dans `client/dist/`.

### Build du serveur
```bash
cd server
npm run build
```

Le build sera généré dans `server/dist/`.

## 🌐 Déploiement

### Déploiement sur Vercel (Frontend)

1. **Connectez votre repository GitHub à Vercel**
2. **Configurez le projet:**
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Ajoutez les variables d'environnement** si nécessaire
4. **Déployez!**

### Déploiement du Backend

Le backend peut être déployé sur:
- **Vercel** (comme Serverless Functions)
- **Railway**
- **Render**
- **Heroku**
- Tout service supportant Node.js

**Variables d'environnement requises:**
- `DATABASE_URL`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_MODE`

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **TailwindCSS** - Framework CSS utilitaire
- **Radix UI** - Composants UI accessibles
- **Wouter** - Routage léger
- **TanStack Query** - Gestion d'état serveur
- **Lucide React** - Icônes

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Typage statique
- **Drizzle ORM** - ORM TypeScript-first
- **Neon Database** - PostgreSQL serverless
- **PayPal SDK** - Intégration paiements
- **Zod** - Validation de schémas

## 📊 Base de Données

Le projet utilise PostgreSQL avec Drizzle ORM. Le schéma comprend:

### Table `users`
- `id` - UUID (clé primaire)
- `email` - Email unique de l'utilisateur
- `cvCount` - Nombre de CV créés
- `hasPaid` - Statut de paiement
- `createdAt` - Date de création

### Table `cvs`
- `id` - UUID (clé primaire)
- `userId` - Référence à l'utilisateur
- `name` - Nom complet
- `role` - Titre professionnel
- `email` - Email
- `phone` - Téléphone
- `location` - Localisation
- `summary` - Résumé professionnel
- `createdAt` - Date de création

## 🔐 Sécurité

- Validation des données avec Zod
- Variables d'environnement pour les secrets
- CORS configuré
- Sanitisation des entrées utilisateur

## 📝 API Endpoints

### Utilisateurs
- `GET /api/user/:email` - Récupérer ou créer un utilisateur
- `POST /api/payment/complete` - Marquer le paiement comme complété

### CV
- `POST /api/cv` - Créer un nouveau CV

### PayPal
- `GET /setup` - Configuration PayPal
- `POST /order` - Créer une commande PayPal
- `POST /order/:orderID/capture` - Capturer un paiement

## 🤝 Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 🐛 Problèmes Connus

Si vous rencontrez des problèmes:
1. Vérifiez que toutes les dépendances sont installées
2. Vérifiez que les variables d'environnement sont correctement configurées
3. Vérifiez que la base de données est accessible
4. Consultez les logs pour plus de détails

## 📧 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

Fait avec ❤️ pour faciliter la création de CV professionnels
