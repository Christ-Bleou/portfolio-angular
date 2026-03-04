# 🎨 Portfolio Django

Une application Django REST Framework pour gérer et générer des portfolios web dynamiques.

## 📖 Description

**Portfolio Django** est un backend API complet qui permet aux utilisateurs de :
- ✅ Créer et gérer leurs profils utilisateur avec photo
- ✅ Ajouter des projets, expériences professionnelles et services
- ✅ Gérer localisations et réseaux sociaux
- ✅ Générer des portfolios complets à partir de templates Angular
- ✅ Télécharger les portfolios générés en ZIP prêt à utiliser
- ✅ Recevoir et gérer les messages de contact

## 🚀 Fonctionnalités principales

- ✨ **API REST complète** avec Django REST Framework
- 📸 **Gestion des médias** (images de profil, photos de projets)
- 🌐 **Support CORS** pour Angular et autres frontends
- 📦 **Génération dynamique** de portfolios avec remplacement de placeholders
- 🏢 **Gestion complète** des expériences, projets et services
- 🗺️ **Localisation géographique** avec coordonnées lat/long
- 🤝 **Réseaux sociaux** (LinkedIn, GitHub, etc.)

## 📋 Prérequis

- **Python 3.8+**
- **pip** ou **conda**
- **Git**

## 🛠️ Installation

### 1️⃣ Cloner le repository

```bash
git clone <votre-repo-url>
cd P_portfolio_django
```

### 2️⃣ Créer et activer l'environnement virtuel

**Windows (PowerShell ou CMD):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (Git Bash):**
```bash
python -m venv venv
source venv/Scripts/activate
```

**Linux/macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3️⃣ Installer les dépendances

```bash
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

**Dépendances principales :**
- `django~=5.1.0`
- `djangorestframework~=3.15.0`
- `django-cors-headers`
- `pillow` (traitement d'images)
- `python-decouple` (variables d'environnement)

### 4️⃣ Configurer la base de données

```bash
python manage.py migrate
```

### 5️⃣ Créer un superutilisateur (optionnel)

```bash
python manage.py createsuperuser
```

### 6️⃣ Lancer le serveur de développement

```bash
python manage.py runserver
```

🎉 Le serveur sera disponible à `http://127.0.0.1:8000/`
- API : `http://127.0.0.1:8000/api/v1/`
- Admin : `http://127.0.0.1:8000/admin/`

## 📁 Structure du projet

```
P_portfolio_django/
├── portfolio/                     # 📦 Application principale
│   ├── models.py                 # 💾 Modèles (Utilisateur, Projet, etc.)
│   ├── serializers.py            # 🔄 Serializers DRF
│   ├── views.py                  # 🔌 Vues API
│   ├── urls.py                   # 🛣️ Routes API
│   ├── admin.py                  # 🔑 Configuration admin Django
│   ├── apps.py                   # ⚙️ Configuration app
│   └── migrations/               # 📊 Migrations de BDD
│
├── portfolio_backend/            # 🏠 Configuration Django
│   ├── settings.py               # ⚙️ Paramètres globaux
│   ├── urls.py                   # 🛣️ URLs racine
│   ├── wsgi.py                   # 🚀 WSGI
│   └── asgi.py                   # 🚀 ASGI
│
├── templates/                    # 🎨 Templates Angular (à créer)
│   └── angular_templates/
│       └── default/              # Template par défaut
│
├── media/                        # 📸 Fichiers uploadés (photos, CV)
├── Autres/                       # 📚 Documentation supplémentaire
├── manage.py                     # 🖥️ CLI Django
├── db.sqlite3                    # 🗄️ Base de données (dev)
├── requirements.txt              # 📦 Dépendances
├── README.md                     # 📖 Ce fichier
├── LICENSE                       # 📜 Licence MIT
└── .env.example                  # 🔐 Variables d'environnement exemple
```

## 🔌 Endpoints API

### 👤 Utilisateurs
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/v1/users/` | Créer un nouvel utilisateur |
| `GET` | `/api/v1/users/{id}/` | Récupérer un utilisateur |

**Exemple de requête :**
```bash
curl -X POST http://localhost:8000/api/v1/users/ \
  -F "firstName=Jean" \
  -F "lastName=Dupont" \
  -F "email=jean@example.com" \
  -F "photo_profil=@photo.jpg"
```

### 📂 Projets
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/v1/projets/` | Créer un projet |
| `GET` | `/api/v1/projets/list/` | Lister tous les projets |

### 🎁 Génération de Portfolio
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/v1/generate/` | Générer un portfolio en ZIP |

**Exemple :**
```bash
curl -X POST http://localhost:8000/api/v1/generate/ \
  -F "user_id=1" \
  -F "template=default" \
  --output jean_portfolio.zip
```

## 📚 Modèles de données

### 👤 Utilisateur
```python
- id: BigAutoField (primary key)
- prenom: CharField (max_length=100)
- nom: CharField (max_length=100)
- email: EmailField (unique)
- telephone: CharField (max_length=30)
- bio: TextField
- age: PositiveIntegerField (16-120)
- photo_profil: ImageField (optionnel)
- lien_cv: URLField (optionnel)
- date_creation: DateTimeField (auto)
- date_modif: DateTimeField (auto)
```

### 📂 Projet
```python
- id: BigAutoField (primary key)
- utilisateur: ForeignKey → Utilisateur
- titre: CharField (max_length=200)
- resume: TextField
- image: ImageField (optionnel)
- lien: URLField (optionnel)
- date_creation: DateTimeField
- date_modif: DateTimeField
```

### 💼 Expérience
```python
- id: BigAutoField (primary key)
- utilisateur: ForeignKey → Utilisateur
- poste: CharField (max_length=150)
- entreprise: CharField (max_length=200)
- date_debut: DateField
- date_fin: DateField (optionnel)
- description: TextField
- type_contrat: CharField (CDI, CDD, Stage, Freelance, Alternance)
```

### 🗺️ Localisation
```python
- id: BigAutoField (primary key)
- utilisateur: ForeignKey → Utilisateur
- pays: CharField (max_length=100)
- ville: CharField (max_length=100)
- quartier: CharField (optionnel)
- latitude: DecimalField (optionnel)
- longitude: DecimalField (optionnel)
```

### 🛠️ Service
```python
- id: BigAutoField (primary key)
- utilisateur: ForeignKey → Utilisateur
- nom: CharField (max_length=150)
- details: TextField
- type_service: CharField (optionnel)
- outils: CharField (ex: "Angular, Django, Figma")
```

### 💬 Message de Contact
```python
- id: BigAutoField (primary key)
- nom_complet: CharField (max_length=150)
- email: EmailField
- objet: CharField (max_length=200)
- message: TextField
- date_envoi: DateTimeField (auto)
- lu: BooleanField (default=False)
```

### 🌐 Réseau Social
```python
- id: BigAutoField (primary key)
- utilisateur: ForeignKey → Utilisateur
- plateforme: CharField (LinkedIn, GitHub, etc.)
- lien: URLField
```

## 🔐 Configuration CORS

La configuration est dans [portfolio_backend/settings.py](portfolio_backend/settings.py) :
```python
# Temporairement permissive en développement
CORS_ALLOW_ALL_ORIGINS = True

# À restreindre en production :
# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:4200',
#     'http://127.0.0.1:4200',
#     'https://votredomaine.com',
# ]
```

## 🖥️ Commandes utiles

```bash
# 🔄 Migrations
python manage.py makemigrations      # Créer les migrations
python manage.py migrate             # Appliquer les migrations

# 👤 Admin
python manage.py createsuperuser     # Créer un admin
python manage.py changepassword      # Changer le mot de passe

# 🚀 Serveur
python manage.py runserver           # Lancer le serveur
python manage.py runserver 0.0.0.0:8000  # Accès réseau

# 🧪 Tests
python manage.py test portfolio       # Lancer les tests
python manage.py test portfolio.tests.test_views  # Test spécifique

# 🐚 Shell
python manage.py shell               # Console Python interactive
python manage.py dbshell             # Shell de la BDD

# 🧹 Maintenance
python manage.py collectstatic        # Collecter les fichiers statiques
python manage.py clearsessions        # Nettoyer les sessions
```

## 🔑 Variables d'environnement

Créez un fichier `.env` à la racine (voir `.env.example`) :

```env
# Django
DEBUG=True
SECRET_KEY=votre-clé-secrète-très-longue
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# CORS (pour Angular)
CORS_ALLOWED_ORIGINS=http://localhost:4200,https://yourdomain.com

# Base de données (SQLite par défaut)
DATABASE_URL=sqlite:///db.sqlite3

# Fichiers médias et statiques
MEDIA_URL=/media/
STATIC_URL=/static/
```

## 🧪 Tests

```bash
# Lancer tous les tests
python manage.py test

# Avec verbose
python manage.py test -v 2

# Tests spécifiques
python manage.py test portfolio.tests.test_views.UtilisateurCreateViewTest
```

## 📦 Déploiement

### ⚠️ Avant la production

1. **Générer une nouvelle SECRET_KEY :**
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

2. **Mettre DEBUG = False dans settings.py**

3. **Configurer ALLOWED_HOSTS**

4. **Utiliser une base de données plus robuste** (PostgreSQL, MySQL)

5. **Mettre en place HTTPS et un reverse proxy** (Nginx)

6. **Utiliser un serveur WSGI** (Gunicorn, uWSGI)

### Déploiement avec Gunicorn

```bash
pip install gunicorn
gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:8000
```

### Docker (optionnel)

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "portfolio_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Procédure :

1. **Fork** le projet
2. **Créer une branche** (`git checkout -b feature/MaFeature`)
3. **Commiter** vos changements (`git commit -m 'Ajouter MaFeature'`)
4. **Pusher** la branche (`git push origin feature/MaFeature`)
5. **Ouvrir une Pull Request**

## 📄 Licence

Ce projet est licencié sous la **Licence MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

- **M. Cannel** - Année 2025/2026

## 📞 Support & Signalement de bugs

Pour toute question, problème ou suggestion :
- 📧 Ouvrir une **issue** sur le repository
- 💬 Créer une **discussion**
- 🐛 Signaler un **bug** avec reproduction steps

## 🎓 Ressources pédagogiques

- [Django Official Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Angular Official Guide](https://angular.io/docs)
- [CORS in Django](https://github.com/adamchainz/django-cors-headers)

## 📊 Historique des versions

| Version | Date | Notes |
|---------|------|-------|
| **1.0.0** | 2026-03 | Première version - API REST complète |
| **0.1.0** | 2026-02 | Version initiale de développement |

---

**Dernière mise à jour :** March 2026
