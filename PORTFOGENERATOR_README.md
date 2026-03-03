# 🎨 Portfolio Generator CLI

Un **générateur de portfolio personnel interactif** basé sur Angular. Créez votre portfolio en quelques minutes sans écrire une ligne de code !

## 🚀 Démarrage Rapide

### 1️⃣ Installation des dépendances
```bash
npm install
```

### 2️⃣ Configuration du portfolio
```bash
npm run cli init
```

Cette commande vous posera des questions interactives :
- 📸 **Votre photo**
- 👤 **Nom et prénom**
- 👨‍💼 **Titre professionnel**
- 📧 **Email et téléphone**
- 🏠 **Adresse**
- 💼 **Réseaux sociaux** (LinkedIn, GitHub, Twitter, etc.)
- 📊 **Statistiques** (années d'expérience, projets réalisés, etc.)

### 3️⃣ Lancer le serveur
```bash
npm start
```

Votre portfolio sera disponible sur `http://localhost:4200`

---

## 📚 Commandes disponibles

### CLI (Générateur)
```bash
npm run cli init              # Initialiser/Configurer le portfolio
npm run cli setup             # Alias pour init
npm run cli help              # Afficher l'aide
npm run cli version           # Afficher la version
```

### Développement
```bash
npm start                     # Lancer le serveur de développement
npm run build                 # Construire pour la production
npm run watch                 # Build en mode watch
npm test                      # Exécuter les tests
```

### Ancien setup (toujours disponible)
```bash
npm run setup                 # Ancien script de configuration
npm run init                  # Setup + start
```

---

## 🎯 Fonctionnalités

✅ **Configuration Interactive**
- Interface CLI élégante avec emojis
- Validation des entrées
- Valeurs par défaut suggérées

✅ **Gestion de la photo**
- Upload automatique de votre photo de profil
- Redimensionnement et optimisation
- Support des formats courants (JPG, PNG, WebP)

✅ **Portfolio Dynamique**
- Affichage dynamique basé sur vos données
- Thème responsive et moderne
- Plusieurs sections : À propos, Portefeuille, Expérience, Contact, etc.

✅ **Réseaux Sociaux**
- Support de multiples plateformes
- Liens cliquables dans le footer
- Icônes professionnelles

✅ **Responsive Design**
- Adapté aux mobiles, tablettes et desktop
- Bootstrap 4 intégré
- Animations fluides

---

## 📂 Structure du projet

```
portfolio-angular/
├── src/
│   ├── app/
│   │   ├── home/              # Page d'accueil du portfolio
│   │   │   ├── components/    # Sections (About, Contact, Portfolio, etc.)
│   │   │   └── home.ts        # Composant principal
│   │   ├── shared/            # Composants partagés
│   │   │   ├── components/    # Header, Footer, Preloader
│   │   │   ├── models/        # Interfaces TypeScript
│   │   │   └── services/      # Services (ProfileService, etc.)
│   │   └── profile.service.ts # Service de gestion du profil
│   ├── assets/
│   │   ├── data/
│   │   │   ├── config.json    # 📄 VOTRE CONFIGURATION (générée par CLI)
│   │   │   └── pj-config.json # Configuration thème
│   │   ├── img/
│   │   │   └── profile_pic.jpg # 📸 VOTRE PHOTO (uploadée par CLI)
│   │   └── css/               # Styles Bootstrap et custom
│   └── styles.scss            # Styles globaux
├── cli.js                     # 🔧 Générateur CLI principal
├── setup.js                   # Setup amélioré
├── angular.json               # Configuration Angular
├── package.json               # Dépendances npm
└── tsconfig.json             # Configuration TypeScript
```

---

## 🔧 Configuration manuelle

Si vous préférez éditer manuellement, modifiez le fichier :
```
src/assets/data/config.json
```

Exemple de configuration :
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "jobTitle": "Développeur Full Stack",
  "email": "jean.dupont@email.com",
  "phone": "+33 6 XX XX XX XX",
  "address": "Paris, France",
  "aboutMe": "Développeur passionné par les technologies web",
  "expYears": "5",
  "happyClients": "50",
  "projectsDone": "25",
  "downloads": "10000",
  "socialLinkedin": "https://linkedin.com/in/jeandupont",
  "socialGithub": "https://github.com/jeandupont",
  "socialFacebook": "",
  "socialPinterest": "",
  "socialTwitter": "https://twitter.com/jeandupont",
  "photoPath": "assets/img/profile_pic.jpg"
}
```

---

## 🎨 Personnalisation avancée

### Changer le thème
Modifiez `src/assets/data/pj-config.json` pour changer :
- Couleurs
- Police de caractères
- Layouts

### Ajouter une section
1. Créez un nouveau composant dans `src/app/home/components/`
2. Ajoutez-le à `home.ts`
3. Incluez-le dans le template `home.html`

### Modifier les styles
- Styles globaux : `src/styles.scss`
- Styles Angular : `src/app/app.scss`
- Thèmes : `src/assets/css/`

---

## 🚀 Déploiement

### Build production
```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`

### Déployer sur Vercel
```bash
npm install -g vercel
vercel
```

### Déployer sur GitHub Pages
```bash
npm run build
# Poussez le contenu de dist/ sur gh-pages
```

---

## 📱 Résultats

Votre portfolio inclura :

- ✨ Section d'accueil élégante
- 👤 Section À Propos
- 📊 Statistiques (expérience, clients, projets)
- 🛠️ Section Services
- 🎯 Portfolio (vos projets)
- 📜 Résumé/CV
- 💬 Témoignages
- 📧 Formulaire de contact
- 🌐 Liens réseaux sociaux
- 📱 Design responsive
- ⚡ Performance optimisée

---

## 🛠️ Technologie

- **Framework** : Angular 21
- **Language** : TypeScript
- **Styling** : SCSS + Bootstrap 4
- **CLI** : Node.js
- **Build** : Angular CLI
- **Testing** : Vitest

---

## 📞 Support

Avez des questions ? Consultez la documentation Angular :
- [Angular Docs](https://angular.dev)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Bootstrap Docs](https://getbootstrap.com/)

---

## 📄 Licence

MIT - Libre d'utilisation

---

## 🎉 Résumé

```bash
# Une seule commande pour démarrer :
npm run cli init && npm start
```

C'est tout ! Votre portfolio personnel est maintenant en ligne ! 🚀
