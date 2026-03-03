# 🖥️ Utilisation de la CLI - Guide interactif

Comment utiliser le Portfolio Generator CLI pas à pas.

---

## 🚀 Démarrage de la CLI

### Sur Windows (PowerShell ou CMD)

```powershell
npm run cli init
```

### Sur Mac/Linux (Terminal/Bash)

```bash
npm run cli init
```

---

## 📋 Questions posées par la CLI

La CLI vous posera les questions suivantes, **dans cet ordre** :

### 1️⃣ Informations personnelles (OBLIGATOIRES)

```
📝 Prénom: Jean
📝 Nom: Dupont
👨‍💼 Titre professionnel: Développeur Full Stack
📧 Email: jean.dupont@email.com
📱 Téléphone: +33 6 12 34 56 78
🏠 Adresse: Paris, 75001, France
💡 À propos de vous (optionnel): [ENTRÉE pour ignorer]
```

**💡 Conseils :**
- Prénom/Nom : Votre vrai nom
- Email : Un email valide et accessible
- Téléphone : Format complet avec code pays
- Adresse : Ville, Région, Pays
- À propos : Optionnel, peut être laissé vide

---

### 2️⃣ Réseaux sociaux (OPTIONNELS)

```
💼 LinkedIn (optionnel): https://linkedin.com/in/jeandupont
🐙 GitHub (optionnel): https://github.com/jeandupont
👥 Facebook (optionnel): [ENTRÉE pour ignorer]
📌 Pinterest (optionnel): [ENTRÉE pour ignorer]
🐦 Twitter/X (optionnel): https://twitter.com/jeandupont
```

**💡 Format des URLs :**
- LinkedIn : `https://linkedin.com/in/USERNAME`
- GitHub : `https://github.com/USERNAME`
- Facebook : `https://facebook.com/USERNAME`
- Pinterest : `https://pinterest.com/USERNAME/`
- Twitter : `https://twitter.com/USERNAME`

**✅ Vous pouvez laisser vides les réseaux que vous n'utilisez pas**

---

### 3️⃣ Statistiques (AVEC DÉFAUTS)

```
📅 Années d'expérience [5]: 8
😊 Clients satisfaits [50]: 100
🎯 Projets réalisés [25]: 50
💾 Lignes de code [10000]: 50000
```

**💡 Utilisation :**
- Appuyez sur ENTRÉE pour accepter le défaut (entre crochets `[...]`)
- Ou tapez un nombre différent et appuyez sur ENTRÉE
- Les nombres peuvent être des chiffres ou du texte (ex: "50+", "100K")

---

### 4️⃣ Photo de profil (OPTIONNELLE)

```
--- 📷 VOTRE PHOTO ---

Chemin complet du fichier (ex: C:\Users\John\photo.jpg)
📸 Chemin de votre photo (optionnel): C:\Users\Jean\Pictures\profile.jpg
```

**💡 Comment obtenir le chemin :**

#### Sur Windows :
1. Clic droit sur votre image
2. Sélectionnez "Copier comme chemin d'accès"
3. Collez dans la CLI (Ctrl+V)
4. Appuyez sur ENTRÉE

#### Sur Mac :
1. Clic droit sur l'image
2. Sélectionnez "Copier"
3. Ou glissez-déposez l'image dans le terminal

#### Formats acceptés :
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

---

## 📝 Exemple complet

Voici une session CLI complète :

```
┌─────────────────────────────────────┐
│  🎨 PORTFOLIO GENERATOR CLI 🎨      │
│  v1.0.0                             │
└─────────────────────────────────────┘

📋 CONFIGURATION DE VOTRE PORTFOLIO PERSONNEL

📝 Prénom: Jean
📝 Nom: Dupont
👨‍💼 Titre professionnel: Développeur Full Stack
📧 Email: jean.dupont@email.com
📱 Téléphone: +33 6 12 34 56 78
🏠 Adresse: Paris, France
💡 À propos de vous (optionnel): Développeur web passionné

--- RÉSEAUX SOCIAUX ---

💼 LinkedIn (optionnel): https://linkedin.com/in/jeandupont
🐙 GitHub (optionnel): https://github.com/jeandupont
👥 Facebook (optionnel):
📌 Pinterest (optionnel):
🐦 Twitter/X (optionnel): https://twitter.com/jeandupont

--- STATISTIQUES ---

📅 Années d'expérience [5]: 8
😊 Clients satisfaits [50]: 75
🎯 Projets réalisés [25]: 40
💾 Lignes de code [10000]: 50000

--- 📷 VOTRE PHOTO ---

Chemin complet du fichier (ex: C:\Users\John\photo.jpg)
📸 Chemin de votre photo (optionnel): C:\Users\Jean\Pictures\profil.jpg

✅ Photo copiée avec succès: src/assets/img/profile_pic.jpg

┌─────────────────────────────────────┐
│  ✅ PORTFOLIO CONFIGURÉ ! 🎉        │
└─────────────────────────────────────┘

📝 Configuration sauvegardée dans : src/assets/data/config.json

🚀 Commandes disponibles:
   npm start     → Lancer le serveur de développement
   npm run build → Construire pour la production
```

---

## 🆘 Erreurs courantes et solutions

### ❌ "Le fichier photo n'existe pas"

```
⚠️ Erreur lors de la copie: Fichier source non trouvé
```

**Solution :**
1. Vérifiez que le chemin est correct
2. Essayez de glisser-déposer le fichier dans le terminal
3. Laissez vide pour ignorer (appuyez sur ENTRÉE)

---

### ❌ "Réponse invalide"

```
❌ Réponse invalide. Réessaye.
```

**Solution :**
- Tapez une réponse valide
- Consultez les exemples ci-dessus

---

### ❌ "Port déjà utilisé"

```
❌ Port 4200 is already in use
```

**Solution :**
```bash
# Terminez votre serveur actuel (Ctrl+C)
# Puis relancez
npm start
```

---

## 🔧 Options supplémentaires

### Réinitialiser la configuration

```bash
# Relancer la CLI
npm run cli init

# ou
npm run cli setup
```

### Afficher l'aide

```bash
npm run cli help
npm run cli --help
npm run cli -h
```

### Voir la version

```bash
npm run cli version
npm run cli --version
npm run cli -v
```

---

## 📂 Fichiers créés/modifiés

Après la CLI, ces fichiers sont créés :

| Fichier | Créé | Modifié |
|---------|------|---------|
| `src/assets/data/config.json` | ✅ | ✅ |
| `src/assets/img/profile_pic.jpg` | ✅ | - |
| `src/assets/data/` | ✅ | - |
| `src/assets/img/` | ✅ | - |

---

## 🎬 Après la CLI

### Immédiatement après

Votre configuration JSON est sauvegardée. Lancez le serveur :

```bash
npm start
```

Ouvrez : http://localhost:4200

### Modifications

Pour modifier votre portfolio :

**Option 1 : Relancer la CLI**
```bash
npm run cli init
```

**Option 2 : Éditer le fichier JSON**

Modifiez : `src/assets/data/config.json`

```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  // ... modification directe
}
```

---

## 💾 Sauvegarde et backup

### Sauvegarder votre configuration

Localisez :
- `src/assets/data/config.json` - Configuration
- `src/assets/img/profile_pic.jpg` - Photo

Ces fichiers sont importants ! Faites des backups !

---

## 🚀 Prochaines étapes

Après la configuration :

```bash
# 1. Lancer le serveur
npm start

# 2. Ouvrir le navigateur
# Allez à http://localhost:4200

# 3. Modifier si nécessaire
# Éditez src/assets/data/config.json

# 4. Construire pour production
npm run build

# 5. Déployer
# Uploadez le dossier dist/ sur un serveur
```

---

## 📞 Support

Besoin d'aide ?

- 📖 Consultez : [GETTING_STARTED.md](./GETTING_STARTED.md)
- 🛠️ Consultez : [COMMANDS.md](./COMMANDS.md)
- 📚 Consultez : [DOCS_INDEX.md](./DOCS_INDEX.md)

---

**Bon développement ! 🚀✨**
