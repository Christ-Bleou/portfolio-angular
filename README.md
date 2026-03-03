# 🎨 Portfolio Generator - Créez votre portfolio en 3 minutes !

Un **générateur de portfolio personnel interactif** basé sur Angular. Créez un portfolio professionnel sans écrire une ligne de code !

---

## 🚀 Démarrage ultra-rapide

```bash
npm install
npm run cli init   # Configuration interactive
npm start          # Lancer le serveur
```

Ouvrez **http://localhost:4200** 🎉

---

## 📖 Documentation complète

Consultez la **[Documentation Complète](./DOCS_INDEX.md)** pour :

- **[🎯 GETTING_STARTED.md](./GETTING_STARTED.md)** ← **COMMENCEZ PAR LÀ**
  - Installation détaillée
  - Configuration pas à pas
  - Troubleshooting

- **[💻 CLI_GUIDE.md](./CLI_GUIDE.md)** - Utiliser la CLI
  - Questions posées
  - Exemples concrets
  - Erreurs courantes

- **[🛠️ COMMANDS.md](./COMMANDS.md)** - Toutes les commandes
  - npm start, build, test, etc.
  - Workflows courants
  - Dépannage

- **[🎨 CONTRIBUTE.md](./CONTRIBUTE.md)** - Personnaliser
  - Créer des composants
  - Modifier les styles
  - Ajouter des données

- **[📚 DOCS_INDEX.md](./DOCS_INDEX.md)** - Vue d'ensemble
  - Tous les guides
  - Parcours selon votre besoin
  - Ressources

---

## ⚡ Commandes principales

| Commande | Description |
|----------|-------------|
| `npm install` | Installer les dépendances |
| `npm run cli init` | **Configurer votre portfolio (PRINCIPAL)** |
| `npm start` | Lancer le serveur de développement |
| `npm run build` | Construire pour la production |
| `npm test` | Exécuter les tests |

---

## ✨ Fonctionnalités

- ✅ **CLI interactive** pour configurer votre portfolio
- ✅ **Design responsive** et moderne
- ✅ **Photo de profil** - Upload automatique
- ✅ **Réseaux sociaux** intégrés
- ✅ **Sections prêtes** (À propos, Portfolio, Contact, etc.)
- ✅ **Modification en temps réel** - Compilation automatique
- ✅ **Production-ready** - Build optimisé
- ✅ **Facile à déployer** - Vercel, Netlify, GitHub Pages, etc.

---

## 📋 Sections incluses

Votre portfolio inclura automatiquement :

- 🏠 **Accueil** - Introduction élégante
- 👤 **À propos** - Présentation personnelle
- 📊 **Statistiques** - Expérience, clients, projets
- 🛠️ **Services** - Vos domaines de compétence
- 🎯 **Portfolio** - Galerie de vos projets
- 📜 **Résumé** - Votre expérience professionnelle
- 💬 **Témoignages** - Retours de clients
- 📧 **Contact** - Formulaire de contact
- 🌐 **Liens sociaux** - LinkedIn, GitHub, Twitter, etc.

---

## 🎓 Scénarios d'utilisation

### 👤 Je suis développeur/designer

Je veux un portfolio pour :
- Montrer mes projets
- Obtenir des clients
- Impressionner les recruteurs

**[→ Aller à GETTING_STARTED.md](./GETTING_STARTED.md)**

---

### 📚 Je suis étudiant

Je veux :
- Un portfolio simple et moderne
- Sans configuration complexe
- Facile à modifier

**[→ Aller à GETTING_STARTED.md](./GETTING_STARTED.md)**

---

### 🎨 Je veux personnaliser

Je veux :
- Ajouter des sections custom
- Changer les styles
- Modifier les données

**[→ Aller à CONTRIBUTE.md](./CONTRIBUTE.md)**

---

### 🚀 Je veux mettre en ligne

Je veux :
- Construire pour la production
- Déployer sur internet
- Obtenir une URL publique

**[→ Aller à GETTING_STARTED.md#déploiement](./GETTING_STARTED.md#déploiement)**

---

## 🛠️ Technologies

- **Framework** : Angular 21
- **Langage** : TypeScript
- **Styling** : SCSS + Bootstrap 4
- **CLI** : Node.js
- **Build** : Angular CLI
- **Testing** : Vitest

---

## 📁 Structure du projet

```
portfolio-angular/
├── 📚 Documentation/
│   ├── DOCS_INDEX.md           ← Index de la documentation
│   ├── GETTING_STARTED.md      ← Guide complet (⭐ COMMENCEZ ICI)
│   ├── CLI_GUIDE.md            ← Comment utiliser la CLI
│   ├── COMMANDS.md             ← Toutes les commandes
│   ├── CONTRIBUTE.md           ← Personnalisation avancée
│   └── PORTFOGENERATOR_README.md
│
├── 🔧 Configuration/
│   ├── cli.js                  ← CLI principal
│   ├── setup.js                ← Script de setup amélioré
│   ├── angular.json            ← Configuration Angular
│   ├── package.json            ← Dépendances npm
│   └── tsconfig.json           ← Configuration TypeScript
│
├── 💻 Code source/
│   └── src/
│       ├── app/
│       │   ├── home/           ← Page principale
│       │   │   └── components/ ← Sections du portfolio
│       │   ├── shared/         ← Composants partagés
│       │   └── profile.service.ts ← Gestion de la config
│       └── assets/
│           ├── data/
│           │   ├── config.json ← ⭐ VOTRE CONFIGURATION
│           │   └── config.default.json
│           └── img/
│               └── profile_pic.jpg ← ⭐ VOTRE PHOTO
│
└── 📦 Build/
    └── dist/                   ← Production ready
```

---

## 🎯 Étapes principales

### Étape 1️⃣ : Installation (2 min)
```bash
npm install
```

### Étape 2️⃣ : Configuration (5 min)
```bash
npm run cli init
```

### Étape 3️⃣ : Prévisualisation (instant)
```bash
npm start
```
Allez à http://localhost:4200

### Étape 4️⃣ : Déploiement (optionnel)
```bash
npm run build
# Uploadez dist/ sur Vercel/Netlify/GitHub Pages
```

---

## ❓ Questions fréquentes

**Q: Je dois avoir Node.js ?**  
✅ Oui, téléchargez depuis https://nodejs.org/

**Q: Je dois connaître Angular ?**  
❌ Non ! La CLI fait tout.

**Q: Comment ajouter ma photo ?**  
✅ La CLI vous la demande interactivement.

**Q: Comment modifier mon portfolio ?**  
✅ Éditez `src/assets/data/config.json` ou relancez `npm run cli init`

**Q: Puis-je le personnaliser complètement ?**  
✅ Oui ! Consultez [CONTRIBUTE.md](./CONTRIBUTE.md)

**Q: Où puis-je le publier ?**  
✅ Vercel, Netlify, GitHub Pages, AWS, Google Cloud...

---

## 🚀 Déploiement rapide

### Vercel (30 secondes)
```bash
npm run build
# Drag & drop le dossier dist/ sur Vercel
```

### Netlify (1 minute)
```bash
npm run build
# Drag & drop le dossier dist/ sur Netlify
```

### GitHub Pages (5 minutes)
```bash
npm run build
# Push dist/ vers la branche gh-pages
```

[Voir guide complet →](./GETTING_STARTED.md#déploiement)

---

## 📞 Besoin d'aide ?

### Documentation
- 📖 [GETTING_STARTED.md](./GETTING_STARTED.md) - Guide complet
- 🛠️ [COMMANDS.md](./COMMANDS.md) - Commandes disponibles
- 🎨 [CONTRIBUTE.md](./CONTRIBUTE.md) - Personnalisation
- 💻 [CLI_GUIDE.md](./CLI_GUIDE.md) - Utiliser la CLI

### Ressources externes
- [Angular Docs](https://angular.dev)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Bootstrap Docs](https://getbootstrap.com/)

---

## 🎉 Résumé

En **3 commandes**, vous avez un portfolio professionnel :

```bash
npm install                    # Installer (une fois)
npm run cli init              # Configurer (interactive)
npm start                     # Lancer (résultat immédiat)
```

**Visitez http://localhost:4200** 🎨

---

## 📄 Licence

MIT - Libre d'utilisation, modification et distribution.

---

**Créé avec ❤️ pour les développeurs et designers.**

**Prêt à commencer ? [→ Allez à GETTING_STARTED.md](./GETTING_STARTED.md)**
