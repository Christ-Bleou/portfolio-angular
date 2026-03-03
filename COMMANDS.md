# 🛠️ Scripts et Commandes disponibles

Document de référence pour toutes les commandes disponibles et leurs usages.

---

## 📋 Tableau récapitulatif

| Commande | Description | Usage |
|----------|------------|-------|
| `npm run cli init` | Initialiser/configurer le portfolio | **Principal** |
| `npm run cli setup` | Alias pour init | Alternatif |
| `npm run cli help` | Afficher l'aide CLI | Référence |
| `npm run cli version` | Afficher la version | Info |
| `npm start` | Démarrer serveur dev | Développement |
| `npm run build` | Build production | Déploiement |
| `npm run watch` | Build watch mode | Dev continu |
| `npm test` | Exécuter tests | Tests |
| `npm run setup` | Config simple (ancien) | Legacy |
| `npm run init` | Setup + start (ancien) | Legacy |

---

## 🚀 Commandes principales

### 1. Initialiser le portfolio (RECOMMANDÉ)

```bash
npm run cli init
```

**Qu'est-ce que ça fait :**
- Lance une interface interactive
- Demande vos infos (nom, email, réseaux, etc.)
- Traite votre photo
- Crée `src/assets/data/config.json`
- Valide les entrées

**Durée :** ~2 minutes

---

### 2. Lancer le serveur de développement

```bash
npm start
```

**Qu'est-ce que ça fait :**
- Démarre Angular sur localhost:4200
- Compilation automatique en temps réel
- Hot reload des modifications

**Accès :** http://localhost:4200

---

### 3. Construire pour la production

```bash
npm run build
```

**Qu'est-ce que ça fait :**
- Compile le projet en mode production
- Minification et optimisation
- Génère le dossier `dist/`
- Réduit la taille des fichiers

**Durée :** ~1 minute

**Résultat :** Dossier `dist/` prêt pour deployment

---

### 4. Mode watch (développement continu)

```bash
npm run watch
```

**Qu'est-ce que ça fait :**
- Compile le projet continuellement
- Pas de serveur, output dans `dist/`
- Parfait pour CI/CD

---

### 5. Exécuter les tests

```bash
npm test
```

**Qu'est-ce que ça fait :**
- Lance Vitest
- Exécute les fichiers `.spec.ts`
- Affiche le coverage

---

## 🔧 Commandes alternatives

### Ancien setup (toujours supporté)

```bash
npm run setup   # Ancien script Node.js
npm run init    # setup + npm start automatically
```

### Afficher l'aide CLI

```bash
npm run cli help
npm run cli --help
npm run cli -h
```

---

## 🎯 Workflows courants

### Workflow 1 : Mise en place initiale

```bash
npm install          # Installer les dépendances
npm run cli init     # Configurer votre portfolio
npm start            # Lancer le serveur
```

### Workflow 2 : Développement

```bash
npm start                      # Terminal 1 : serveur dev
# Dans un autre terminal
code .                         # Ouvrir VS Code
# Éditez les fichiers, le serveur se met à jour automatiquement
```

### Workflow 3 : Déploiement

```bash
npm run build               # Créer la version production
# Le dossier dist/ est prêt
# Uploadez dist/ sur un serveur ou Vercel
```

### Workflow 4 : Mise à jour de configuration

```bash
npm run cli init    # Reconfigurer
npm start           # Voir les changements en direct
```

---

## 📁 Fichiers affectés par les commandes

### `npm run cli init`

**Crée/Modifie :**
- ✏️ `src/assets/data/config.json` - Votre configuration
- 🖼️ `src/assets/img/profile_pic.jpg` - Votre photo

**Logs :**
```
✅ PORTFOLIO CONFIGURÉ !
📝 Configuration sauvegardée dans : src/assets/data/config.json
```

---

### `npm start`

**Utilise :**
- ✅ `src/` - Fichiers source
- ✅ `src/assets/` - Ressources
- ✅ `angular.json` - Configuration

**Génère :**
- 📦 `.angular/cache/` - Cache temporaire
- 🌐 Serveur sur localhost:4200

---

### `npm run build`

**Génère :**
- 📦 `dist/` - Dossier de production
  - `dist/portfolio/` - Fichiers compilés
  - `dist/portfolio/index.html` - Page d'accueil
  - `dist/portfolio/assets/` - Ressources
  - `dist/portfolio/*.js` - Code JavaScript compilé

**Taille typique :** 1-3 MB (gzippé)

---

## ⚡ Performance

### Temps d'exécution moyens

| Commande | Temps | Notes |
|----------|-------|-------|
| `npm install` | 2-5 min | Une seule fois |
| `npm run cli init` | 1-2 min | Interactif |
| `npm start` | 10-20 sec | Puis ~instant reload |
| `npm run build` | 30-60 sec | Dépend de la machine |
| `npm run watch` | 10-20 sec | Puis ~instant recompile |

---

## 🐛 Dépannage des commandes

### Problème : "npm: command not found"

```bash
# Installer Node.js : https://nodejs.org/
node --version    # Vérifier l'installation
npm --version
```

---

### Problème : "Port 4200 already in use"

```bash
# Utiliser un autre port
npm start -- --port 4201

# Ou tuer le processus existant
# Linux/Mac
lsof -i :4200
kill -9 <PID>

# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

---

### Problème : "Module not found"

```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
npm start
```

---

### Problème : "Cannot find module @angular/core"

```bash
# Même solution
npm install
npm start
```

---

## 📦 Installation et environnement

### Vérifier votre environnement

```bash
node --version        # Node.js version (requis: v18+)
npm --version         # npm version (requis: v10+)
ng version            # Angular CLI version
```

### Mettre à jour npm

```bash
npm install -g npm@latest
```

### Mettre à jour Angular CLI

```bash
npm install -g @angular/cli@latest
```

---

## 🔐 Authentification / Secrets

Pour des variables d'environnement sensibles, créez `.env.local` :

```bash
# .env.local
API_KEY=votre_clé_secrète
EMAIL_SERVICE=votre_email
```

Utilisez dans le code :

```typescript
import { environment } from './environments/environment';
const apiKey = environment.apiKey;
```

---

## 📤 Déploiement après build

### Après `npm run build`, vous avez :

```
dist/portfolio/
├── index.html
├── assets/
│   ├── img/
│   ├── css/
│   ├── js/
│   └── data/
│       └── config.json
└── [fichiers compiled JS/CSS]
```

### Déployer sur :

- **Vercel** : Drag & drop le dossier `dist/`
- **Netlify** : Drag & drop le dossier `dist/`
- **GitHub Pages** : Push vers `gh-pages` branch
- **Firebase** : `firebase deploy`
- **AWS S3** : Upload `dist/` contents
- **Azure Static Web Apps** : Push vers GitHub et link

---

## 🎓 Scripts additionnels personnalisés

Pour **ajouter une nouvelle commande**, modifiez `package.json` :

```json
{
  "scripts": {
    "mon-script": "node mon-script.js",
    "mon-autre-script": "echo 'Hello!'"
  }
}
```

Puis exécutez :

```bash
npm run mon-script
```

---

## 📚 Ressources

- [NPM Docs](https://docs.npmjs.com/)
- [Angular CLI Docs](https://angular.dev/tools/cli)
- [Node.js Docs](https://nodejs.org/docs/)

---

**Besoin d'aide ?** Consultez [GETTING_STARTED.md](./GETTING_STARTED.md)

**Buon lavoro !** 🚀
