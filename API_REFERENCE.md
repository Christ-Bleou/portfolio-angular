# API Reference & Examples

## 📚 Documentation complète des endpoints API

### 🔑 Authentication

Pour le moment, l'API n'a pas d'authentification. Toutes les routes sont publiques.

**À implémenter dans le futur :**
- Token Authentication
- JWT Authentication
- OAuth2

---

## 👤 UTILISATEURS (Users)

### POST /api/v1/users/ - Créer un utilisateur

Crée un nouveau profil utilisateur.

**Request Format:** `multipart/form-data`

**Requête :**
```bash
curl -X POST http://localhost:8000/api/v1/users/ \
  -F "firstName=Jean" \
  -F "lastName=Dupont" \
  -F "email=jean.dupont@example.com" \
  -F "telephone=+33123456789" \
  -F "bio=Développeur web passionné" \
  -F "age=28" \
  -F "photo_profil=@/path/to/photo.jpg" \
  -F "lien_cv=https://example.com/cv.pdf"
```

**Champs obligatoires :**
- `firstName` (string) - Prénom
- `lastName` (string) - Nom
- `email` (string) - Email (unique)

**Champs optionnels :**
- `telephone` (string)
- `bio` (text)
- `age` (integer) - Entre 16 et 120
- `photo_profil` (file) - Image JPG/PNG
- `lien_cv` (URL)

**Réponse (201 Created) :**
```json
{
  "id": 1,
  "prenom": "Jean",
  "nom": "Dupont",
  "email": "jean.dupont@example.com",
  "telephone": "+33123456789",
  "bio": "Développeur web passionné",
  "age": 28,
  "photo_profil": "/media/photos_profil/photo_123.jpg",
  "lien_cv": "https://example.com/cv.pdf",
  "date_creation": "2026-03-04T10:30:00Z"
}
```

**Erreurs possibles :**
- `400 Bad Request` - Données invalides ou manquantes
- `409 Conflict` - Email déjà utilisé

---

## 📂 PROJETS (Projects)

### POST /api/v1/projets/ - Créer un projet

Crée un projet lié à un utilisateur.

**Request Format:** `multipart/form-data`

**Requête :**
```bash
curl -X POST http://localhost:8000/api/v1/projets/ \
  -F "UserId=1" \
  -F "titre=Mon Portfolio Web" \
  -F "resume=Un portfolio web moderne et responsive" \
  -F "image=@/path/to/project.jpg" \
  -F "lien=https://myportfolio.com"
```

**Champs obligatoires :**
- `UserId` (integer) - ID de l'utilisateur
- `titre` (string) - Titre du projet
- `resume` (text) - Description/pitch

**Champs optionnels :**
- `image` (file) - Image du projet
- `lien` (URL) - Lien vers le projet

**Réponse (201 Created) :**
```json
{
  "id": 1,
  "UserId": 1,
  "titre": "Mon Portfolio Web",
  "resume": "Un portfolio web moderne et responsive",
  "image": "/media/projets/project_456.jpg",
  "lien": "https://myportfolio.com",
  "date_creation": "2026-03-04T11:00:00Z"
}
```

### GET /api/v1/projets/list/ - Lister les projets

Récupère tous les projets.

**Requête :**
```bash
curl http://localhost:8000/api/v1/projets/list/
```

**Réponse (200 OK) :**
```json
[
  {
    "id": 1,
    "titre": "Mon Portfolio Web",
    "resume": "Un portfolio web moderne et responsive",
    "image": "/media/projets/project_456.jpg",
    "lien": "https://myportfolio.com",
    "date_creation": "2026-03-04T11:00:00Z"
  },
  {
    "id": 2,
    "titre": "Application Mobile",
    "resume": "Application de productivité",
    "image": "/media/projets/project_789.jpg",
    "lien": "https://app.example.com",
    "date_creation": "2026-03-05T09:30:00Z"
  }
]
```

---

## 🎁 GÉNÉRATION DE PORTFOLIO

### POST /api/v1/generate/ - Générer un portfolio ZIP

Génère un portfolio complet à partir d'un template.

**Request Format:** `multipart/form-data`

**Requête :**
```bash
curl -X POST http://localhost:8000/api/v1/generate/ \
  -F "user_id=1" \
  -F "template=default" \
  --output jean_portfolio.zip
```

**Champs obligatoires :**
- `user_id` (integer) - ID de l'utilisateur
- `template` (string) - Nom du template (ex: "default", "modern", "minimal")

**Réponse (200 OK) :**
```
[Fichier ZIP en téléchargement]
jean_dupont_portfolio.zip (1.2 MB)
```

**Templates disponibles :**
- `default` - Template moderne standard
- `minimal` - Design minimaliste
- `dark` - Thème sombre
- (Ajouter vos propres templates dans `templates/angular_templates/`)

**Contenu du ZIP :**
```
jean_dupont_portfolio/
├── package.json
├── angular.json
├── src/
│   ├── app/
│   ├── assets/
│   └── index.html
├── .gitignore
└── README.md
```

**Placeholders remplacés automatiquement :**
- `__FIRST_NAME__` → Prénom de l'utilisateur
- `__LAST_NAME__` → Nom de l'utilisateur
- `__EMAIL__` → Email de l'utilisateur

**Erreurs possibles :**
- `400 Bad Request` - `user_id` ou `template` manquant
- `404 Not Found` - Utilisateur ou template inexistant

---

## 💬 MESSAGES DE CONTACT (Contact)

### À implémenter

```
POST /api/v1/contact/
```

**Permet aux visiteurs d'envoyer un message.**

**Requête :**
```json
{
  "nom_complet": "Dupont Jean",
  "email": "visitor@example.com",
  "objet": "Demande de collaboration",
  "message": "Intéressé par vos services..."
}
```

---

## 🏢 EXPÉRIENCES (Experiences)

### À implémenter

```
GET /api/v1/experiences/
POST /api/v1/experiences/
```

**Requête POST :**
```json
{
  "UserId": 1,
  "poste": "Développeur Full Stack",
  "entreprise": "TechCorp",
  "date_debut": "2023-01-15",
  "date_fin": "2024-12-31",
  "description": "Développement d'applications Django/React",
  "type_contrat": "CDI"
}
```

---

## 🔧 SERVICES

### À implémenter

```
GET /api/v1/services/
POST /api/v1/services/
```

**Requête POST :**
```json
{
  "UserId": 1,
  "nom": "Développement Web",
  "details": "Services de création de sites web modernes",
  "type_service": "Web Development",
  "outils": "Django, Angular, PostgreSQL, Docker"
}
```

---

## 🌐 RÉSEAUX SOCIAUX

### À implémenter

```
GET /api/v1/reseaux/
POST /api/v1/reseaux/
```

**Requête POST :**
```json
{
  "UserId": 1,
  "plateforme": "GitHub",
  "lien": "https://github.com/username"
}
```

---

## 🛠️ CODES D'ERREUR

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Requête réussie |
| 201 | Created | Ressource créée avec succès |
| 204 | No Content | Suppression réussie |
| 400 | Bad Request | Données invalides ou manquantes |
| 401 | Unauthorized | Authentification requise |
| 403 | Forbidden | Accès refusé |
| 404 | Not Found | Ressource non trouvée |
| 409 | Conflict | Ressource existe déjà (ex: email) |
| 500 | Server Error | Erreur serveur |

---

## 🧪 TESTS avec cURL

### Test complet - Créer utilisateur et générer portfolio

```bash
#!/bin/bash

# 1. Créer un utilisateur
echo "1️⃣ Création d'utilisateur..."
USER_RESPONSE=$(curl -s -X POST http://localhost:8000/api/v1/users/ \
  -F "firstName=Jean" \
  -F "lastName=Dupont" \
  -F "email=jean.test@example.com")

USER_ID=$(echo $USER_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo "User ID: $USER_ID"

# 2. Ajouter un projet
echo -e "\n2️⃣ Création d'un projet..."
curl -s -X POST http://localhost:8000/api/v1/projets/ \
  -F "UserId=$USER_ID" \
  -F "titre=Portfolio Demo" \
  -F "resume=Mon premier portfolio généré" \
  -F "lien=https://example.com"

# 3. Générer le porfolio
echo -e "\n3️⃣ Génération du portfolio..."
curl -X POST http://localhost:8000/api/v1/generate/ \
  -F "user_id=$USER_ID" \
  -F "template=default" \
  --output "${USER_ID}_portfolio.zip"

echo -e "\n✅ Portfolio généré : ${USER_ID}_portfolio.zip"
```

---

## 🔐 À venir

- **Authentification JWT**
- **Rate Limiting**
- **Pagination des listes**
- **Filtrage avancé**
- **Recherche textuelle**

---

**Documentation générée :** Mars 2026
