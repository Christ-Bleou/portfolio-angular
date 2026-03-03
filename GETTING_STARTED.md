# 🚀 GUIDE DE DÉMARRAGE - Générateur de Portfolio

Bienvenue ! Ce guide vous explique comment créer **rapidement et facilement** votre portfolio personnel en quelques minutes.

---

## 📋 Table des matières

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Lancement du serveur](#lancement)
4. [Personnalisation](#personnalisation)
5. [Déploiement](#déploiement)
6. [Troubleshooting](#troubleshooting)

---

## 💻 Installation

### Étape 1 : Cloner ou télécharger le projet

```bash
git clone https://github.com/Christ-Bleou/portfolio-angular.git
cd portfolio-angular
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

💡 **Qu'est-ce qui se passe ?**
- Node.js télécharge tous les packages requis
- Cela peut prendre 2-5 minutes selon votre connexion internet

---

## ⚙️ Configuration

### Méthode 1 : Avec la CLI interactive (RECOMMANDÉ)

C'est la façon la plus facile ! Une interface vous pose des questions et crée automatiquement votre configuration.

```bash
npm run cli init
```

**Vous serez invité à entrer :**

| Question | Exemple | Obligatoire |
|----------|---------|-------------|
| 📝 Prénom | Jean | ✅ Oui |
| 📝 Nom | Dupont | ✅ Oui |
| 👨‍💼 Titre professionnel | Développeur Web | ✅ Oui |
| 📧 Email | jean@example.com | ✅ Oui |
| 📱 Téléphone | +33 6 XX XX XX XX | ✅ Oui |
| 🏠 Adresse | Paris, France | ✅ Oui |
| 💡 À propos de vous | Un peu de texte... | ❌ Optionnel |
| 💼 LinkedIn | https://linkedin.com/in/jean | ❌ Optionnel |
| 🐙 GitHub | https://github.com/jean | ❌ Optionnel |
| 👥 Facebook | https://facebook.com/jean | ❌ Optionnel |
| 📌 Pinterest | https://pinterest.com/jean | ❌ Optionnel |
| 🐦 Twitter/X | https://twitter.com/jean | ❌ Optionnel |
| 📅 Années d'expérience | 5 | ✅ Oui (défaut: 5) |
| 😊 Clients satisfaits | 50 | ✅ Oui (défaut: 50) |
| 🎯 Projets réalisés | 25 | ✅ Oui (défaut: 25) |
| 💾 Lignes de code | 10000 | ✅ Oui (défaut: 10000) |
| 📸 Votre photo | C:\Users\Jean\photo.jpg | ❌ Optionnel |

---

### Méthode 2 : Configuration manuelle

Si vous préférez éditer directement, modifiez le fichier :

```
src/assets/data/config.json
```

**Exemple de configuration complète :**

```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "jobTitle": "Développeur Full Stack",
  "email": "jean.dupont@email.com",
  "phone": "+33 6 XX XX XX XX",
  "address": "Paris, France",
  "aboutMe": "Développeur passionné par Angular et les technologies web modernes",
  "expYears": "5",
  "happyClients": "50",
  "projectsDone": "25",
  "downloads": "10000",
  "socialLinkedin": "https://linkedin.com/in/jeandupont",
  "socialGithub": "https://github.com/jeandupont",
  "socialFacebook": "https://facebook.com/jeandupont",
  "socialPinterest": "https://pinterest.com/jeandupont",
  "socialTwitter": "https://twitter.com/jeandupont",
  "photoPath": "assets/img/profile_pic.jpg"
}
```

💡 **Comment ajouter votre photo :**
1. Placez votre photo JPG/PNG dans `src/assets/img/`
2. Renommez-la en `profile_pic.jpg`
3. La CLI le fera automatiquement pour vous !

---

## 🎬 Lancement du serveur

### Démarrer le serveur de développement

```bash
npm start
```

**Résultat attendu :**
```
✔ Compiled successfully.
✔ Server running at http://localhost:4200
```

Ouvrez maintenant votre navigateur et allez sur : **http://localhost:4200**

🎉 Votre portfolio est en ligne !

### Arrêter le serveur

Appuyez sur `Ctrl + C` dans le terminal

---

## 🎨 Personnalisation

### 1️⃣ Changer votre configuration

Modifiez `src/assets/data/config.json` et le portfolio se met à jour **automatiquement** !

### 2️⃣ Ajouter / Modifier des sections

Les sections visibles sont dans : `src/app/home/components/`

**Sections disponibles :**
- `introduction/` - Accueil principal
- `about/` - Section À propos
- `facts/` - Statistiques
- `services/` - Vos services
- `movie/` - Section vidéo
- `portfolio/` - Galerie de projets
- `projet/` - Autre projet
- `resume/` - CV / Expérience
- `testimonial/` - Témoignages
- `blog/` - Blog
- `contact/` - Formulaire de contact

Pour **masquer une section**, modifiez `src/app/home/home.html` et commentez la ligne correspondante :

```html
<!-- <app-blog /> -->  ← Voilà, section cachée !
```

### 3️⃣ Changer les styles

- **Styles globaux** : `src/styles.scss`
- **Styles du composant** : `src/app/app.scss`
- **CSS Bootstrap** : `src/assets/css/`

### 4️⃣ Changer le thème (couleurs)

Les thèmes sont dans : `src/assets/css/`

Thèmes disponibles :
- `default.css` - Défaut
- `blue.css` - Bleu
- `green.css` - Vert
- `pink.css` - Rose
- `red.css` - Rouge
- `violet.css` - Violet
- `mono.css` - Monochrome
- `dark.theme.css` - Mode sombre

Pour changer le thème, modifiez `angular.json` dans la section `"styles"` et remplacez le thème :

```json
"styles": [
  "src/styles.scss",
  "src/assets/css/blue.css",  ← Changez ceci
  ...
]
```

---

## 🚀 Déploiement (Mettre en ligne)

### 📦 1. Créer une version production

```bash
npm run build
```

Cela crée un dossier `dist/` avec votre portfolio optimisé.

### 🌐 2. Publier sur Internet

#### Option A : Vercel (RECOMMANDÉ - Le plus facile)

```bash
npm install -g vercel
vercel
```

Suivez les instructions. Votre portfolio sera live en 1 minute !

#### Option B : GitHub Pages

1. Poussez votre code sur GitHub
2. Allez dans les paramètres du repo
3. Allez à "Pages"
4. Sélectionnez la branche et le dossier `/dist`
5. ✨ Votre portfolio est en ligne !

#### Option C : Netlify

```bash
npm run build
# Glissez-déposez le dossier dist/ sur Netlify
```

#### Option D : Heroku / Google Cloud / AWS

Consultez la documentation de chaque plateforme pour Angular.

---

## 🆘 Troubleshooting (Problèmes courants)

### ❌ "npm: command not found"

**Cause** : Node.js n'est pas installé

**Solution** :
1. Téléchargez Node.js : https://nodejs.org/
2. Installez-le
3. Redémarrez votre terminal
4. Réessayez `npm install`

---

### ❌ "Module not found: @angular/core"

**Cause** : Les dépendances ne sont pas installées

**Solution** :
```bash
npm install
```

---

### ❌ "Port 4200 is already in use"

**Cause** : Un autre serveur utilise port 4200

**Solution** :
```bash
npm start -- --port 4201
```

Ou fermez l'autre application.

---

### ❌ "erreur lors du chargement de config.json"

**Cause** : Le fichier config.json n'existe pas ou est vide

**Solution** :
```bash
npm run cli init
```

Ou copiez le contenu de `config.default.json` dans `config.json`

---

### ❌ "La photo ne s'affiche pas"

**Cause** : Le chemin n'est pas correct ou le fichier n'existe pas

**Solution** :
1. Vérifiez que `profile_pic.jpg` existe dans `src/assets/img/`
2. Vérifiez que `photoPath` dans `config.json` est : `"assets/img/profile_pic.jpg"`
3. Redémarrez le serveur : `npm start`

---

### ❌ "Port 4200 affiche une page blanche"

**Cause** : La compilation a échoué
**Solution** :
1. Vérifiez la console du terminal pour les erreurs
2. Vérifiez la console du navigateur (F12 → Console)
3. Redémarrez : `Ctrl+C` puis `npm start`

---

### ❌ Autres erreurs ?

**Commandes de dépannage :**

```bash
# Nettoyer le cache Angular
rm -rf .angular/cache

# Réinstaller les dépendances
rm -rf node_modules
npm install

# Redémarrer le serveur
npm start
```

---

## 📚 Commandes complètes

```bash
# Configuration
npm run cli init              # Initialiser votre portfolio (PRINCIPAL)
npm run cli help              # Afficher l'aide

# Développement
npm start                     # Lancer le serveur local
npm run build                 # Construire pour production
npm run watch                 # Build en continu (watch mode)
npm test                      # Exécuter les tests

# Anciens scripts (encore disponibles)
npm run setup                 # Configuration simple
npm run init                  # Setup + démarrage automatique
```

---

## 🎓 Pour aller plus loin

- 📖 [Documentation Angular](https://angular.dev)
- 📖 [Documentation TypeScript](https://www.typescriptlang.org/)
- 📖 [Bootstrap Documentation](https://getbootstrap.com/)
- 🎨 [Icônes Font Awesome](https://fontawesome.com/)
- 🌐 [Git & GitHub](https://git-scm.com/)

---

## ✨ Quelques astuces

### 1. Activer le mode watch

Pour que le projet se recompile automatiquement lors de chaque modification :

```bash
npm run watch
```

### 2. Ouvrir dans VS Code

```bash
code .
```

### 3. Exécuter les tests

```bash
npm test
```

---

## 🎉 Vous êtes prêt !

**Résumé en 3 commandes :**

```bash
npm install        # Installer (une seule fois)
npm run cli init   # Configurer votre portfolio
npm start          # Lancer le serveur
```

**C'est tout !** Votre portfolio personnel est maintenant en ligne. 🚀

---

Besoin d'aide ? Consultez le fichier [PORTFOGENERATOR_README.md](./PORTFOGENERATOR_README.md) pour plus de détails.

**Bon développement ! 👨‍💻🎨**
