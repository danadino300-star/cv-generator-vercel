# 🐛 Guide de Résolution des Erreurs

Ce document liste les erreurs courantes et leurs solutions.

## Erreurs de Build

### ❌ "Cannot find module 'vite'"

**Cause:** Les dépendances ne sont pas installées.

**Solution:**
```bash
cd client
npm install
```

### ❌ "Unknown at rule @tailwind"

**Cause:** TailwindCSS n'est pas installé ou mal configuré.

**Solution:**
```bash
cd client
npm install -D tailwindcss postcss autoprefixer
```

Vérifiez que `tailwind.config.js` et `postcss.config.js` existent.

### ❌ "Module not found: Error: Can't resolve '@/components/...'"

**Cause:** Les alias de chemins ne sont pas configurés.

**Solution:**
Vérifiez `vite.config.ts`:
```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
}
```

## Erreurs de Serveur

### ❌ "Cannot find module 'express'"

**Cause:** Les dépendances du serveur ne sont pas installées.

**Solution:**
```bash
cd server
npm install
```

### ❌ "Database connection failed"

**Cause:** La variable d'environnement DATABASE_URL n'est pas définie ou incorrecte.

**Solution:**
1. Créez un fichier `.env` dans `server/`:
```env
DATABASE_URL=postgresql://user:password@host/database
```
2. Vérifiez que l'URL est correcte
3. Vérifiez que la base de données est accessible

### ❌ "relation 'users' does not exist"

**Cause:** Les tables de la base de données n'existent pas.

**Solution:**
Exécutez le SQL suivant dans votre base de données:
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

## Erreurs PayPal

### ❌ "PayPal authentication failed"

**Cause:** Credentials PayPal invalides.

**Solution:**
1. Vérifiez vos credentials sur [developer.paypal.com](https://developer.paypal.com)
2. Mettez à jour `.env`:
```env
PAYPAL_CLIENT_ID=votre_client_id
PAYPAL_CLIENT_SECRET=votre_client_secret
PAYPAL_MODE=sandbox
```

### ❌ "Order creation failed"

**Cause:** Configuration PayPal incorrecte.

**Solution:**
1. Vérifiez que PAYPAL_MODE est "sandbox" pour les tests
2. Vérifiez que votre compte PayPal sandbox est actif
3. Consultez les logs pour plus de détails

## Erreurs de Déploiement Vercel

### ❌ "Build failed: Command failed with exit code 1"

**Cause:** Erreur lors du build.

**Solutions:**
1. Vérifiez les logs de build sur Vercel
2. Testez le build localement:
```bash
cd client
npm run build
```
3. Corrigez les erreurs TypeScript/ESLint

### ❌ "Root Directory not found"

**Cause:** La configuration Vercel pointe vers le mauvais dossier.

**Solution:**
Dans les paramètres Vercel:
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

### ❌ "Module not found in production"

**Cause:** Dépendance dans devDependencies au lieu de dependencies.

**Solution:**
Déplacez la dépendance dans `dependencies`:
```bash
npm install --save nom-du-package
```

## Erreurs Runtime

### ❌ "Failed to fetch"

**Cause:** Le client ne peut pas se connecter au serveur.

**Solutions:**
1. Vérifiez que le serveur est démarré
2. Vérifiez l'URL de l'API dans le client
3. Vérifiez la configuration CORS sur le serveur

### ❌ "CORS error"

**Cause:** Le serveur bloque les requêtes du client.

**Solution:**
Ajoutez dans `server/app.ts`:
```typescript
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'https://votre-domaine.vercel.app'],
  credentials: true
}));
```

N'oubliez pas d'installer cors:
```bash
npm install cors
npm install -D @types/cors
```

### ❌ "Cannot read property of undefined"

**Cause:** Données non chargées ou structure incorrecte.

**Solution:**
1. Ajoutez des vérifications null:
```typescript
if (!data) return null;
```
2. Utilisez optional chaining:
```typescript
data?.property?.subProperty
```

## Erreurs TypeScript

### ❌ "Type 'X' is not assignable to type 'Y'"

**Cause:** Types incompatibles.

**Solution:**
1. Vérifiez les types dans `shared/schema.ts`
2. Utilisez le bon type:
```typescript
const user: User = ...
```
3. Si nécessaire, utilisez un type assertion:
```typescript
const data = response as User;
```

### ❌ "Cannot find name '__dirname'"

**Cause:** __dirname n'existe pas en mode ESM.

**Solution:**
Utilisez `import.meta.dirname` (Node.js 20+) ou:
```typescript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## Erreurs Git/GitHub

### ❌ "Git is not recognized"

**Cause:** Git n'est pas installé.

**Solution:**
1. Téléchargez Git: [git-scm.com](https://git-scm.com)
2. Installez-le
3. Redémarrez votre terminal

### ❌ "Permission denied (publickey)"

**Cause:** Clé SSH non configurée.

**Solution:**
1. Générez une clé SSH:
```bash
ssh-keygen -t ed25519 -C "votre@email.com"
```
2. Ajoutez-la à GitHub: Settings > SSH and GPG keys
3. Ou utilisez HTTPS au lieu de SSH

## Erreurs de Performance

### ❌ "Page loads slowly"

**Solutions:**
1. Optimisez les images
2. Utilisez le lazy loading:
```typescript
const Component = lazy(() => import('./Component'));
```
3. Vérifiez les requêtes réseau dans DevTools

### ❌ "Memory leak detected"

**Solutions:**
1. Nettoyez les event listeners:
```typescript
useEffect(() => {
  const handler = () => {};
  window.addEventListener('event', handler);
  return () => window.removeEventListener('event', handler);
}, []);
```
2. Annulez les requêtes en cours lors du démontage

## Commandes de Diagnostic

### Vérifier les versions
```bash
node --version
npm --version
git --version
```

### Nettoyer et réinstaller
```bash
# Client
cd client
rm -rf node_modules package-lock.json
npm install

# Server
cd ../server
rm -rf node_modules package-lock.json
npm install
```

### Vérifier les logs
```bash
# Logs Vercel
vercel logs

# Logs locaux
npm run dev 2>&1 | tee debug.log
```

## Obtenir de l'Aide

Si vous rencontrez une erreur non listée ici:

1. **Consultez les logs** - Ils contiennent souvent la solution
2. **Recherchez l'erreur** - Google/Stack Overflow
3. **Vérifiez la documentation** - Vite, React, Express, etc.
4. **Ouvrez une issue** - Sur le repository GitHub

---

**Astuce:** Gardez toujours vos dépendances à jour:
```bash
npm outdated
npm update
```
