# 🚀 Guide de Déploiement

Ce guide vous aide à déployer Portfolio Django en production.

## ⚠️ Pré-requis de Production

### 1. Sécurité Django

Avant tout déploiement, mettez à jour `portfolio_backend/settings.py` :

```python
# ❌ À SUPPRIMER :
DEBUG = True
SECRET_KEY = 'votre-clé-insecure'

# ✅ À AJOUTER :
DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY')  # Générez une nouvelle clé !

# Ajouter votre domaine
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
```

### 2. Générer une nouvelle SECRET_KEY

```bash
python manage.py shell
>>> from django.core.management.utils import get_random_secret_key
>>> print(get_random_secret_key())
# Copiez la clé et sauvegardez-la dans votre .env
```

### 3. Sécurité HTTPS

```python
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000  # 1 an
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
```

## 📦 Choix du serveur

### Option 1 : Heroku (Gratuit/Facile)

```bash
# Installer Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Se connecter
heroku login

# Créer l'app
heroku create votre-app-name

# Ajouter une BDD PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Déployer
git push heroku main

# Migrer la BDD
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

### Option 2 : PythonAnywhere

1. Créer un compte sur [pythonanywhere.com](https://www.pythonanywhere.com)
2. Faire un "Add a new web app"
3. Configuration web app → Web framework → Django
4. Clone le repository
5. Configurer le virtualenv
6. Mettre à jour les settings

### Option 3 : VPS (DigitalOcean, Linode, AWS)

#### Avec Gunicorn + Nginx

```bash
# Sur le serveur
ssh root@your-vps-ip

# Mettre à jour le système
apt update && apt upgrade -y

# Installer les dépendances
apt install python3-pip python3-venv nginx supervisor

# Cloner le projet
git clone <repo-url>
cd P_portfolio_django

# Créer l'environnement virtuel
python3 -m venv venv
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
pip install gunicorn

# Tester gunicorn
gunicorn portfolio_backend.wsgi:application --bind 127.0.0.1:8000

# Créer un service systemd pour Gunicorn
cat > /etc/systemd/system/portfolio.service << EOF
[Unit]
Description=Portfolio Django
After=network.target

[Service]
User=www-data
WorkingDirectory=/root/P_portfolio_django
Environment="PATH=/root/P_portfolio_django/venv/bin"
ExecStart=/root/P_portfolio_django/venv/bin/gunicorn \
    --workers 3 \
    --bind unix:/root/P_portfolio_django/portfolio.sock \
    portfolio_backend.wsgi:application

[Install]
WantedBy=multi-user.target
EOF

# Démarrer le service
systemctl start portfolio
systemctl enable portfolio
```

#### Configuration Nginx

```nginx
# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirection vers HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # Certificats SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Configuration SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logs
    access_log /var/log/nginx/portfolio_access.log;
    error_log /var/log/nginx/portfolio_error.log;

    # Taille max upload
    client_max_body_size 10M;

    # Fichiers statiques
    location /static/ {
        alias /root/P_portfolio_django/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Fichiers médias
    location /media/ {
        alias /root/P_portfolio_django/media/;
        expires 7d;
    }

    # API Django
    location / {
        proxy_pass http://unix:/root/P_portfolio_django/portfolio.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
}
```

#### SSL avec Let's Encrypt

```bash
# Installer certbot
apt install certbot python3-certbot-nginx

# Générer le certificat
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Renouvellement automatique
certbot renew --dry-run
```

### Option 4 : Docker

#### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Dépendances système
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Code source
COPY . .

# Collecter les fichiers statiques
RUN python manage.py collectstatic --noinput

# Créer l'utilisateur non-root
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Port
EXPOSE 8000

# Démarrer Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "portfolio_backend.wsgi:application"]
```

#### Docker Compose

```yaml
version: '3.9'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: portfolio
      POSTGRES_USER: portfolio
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  web:
    build: .
    command: gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:8000
    ports:
      - "8000:8000"
    environment:
      DEBUG: "False"
      DATABASE_URL: postgresql://portfolio:secure_password@db:5432/portfolio
    depends_on:
      - db
    volumes:
      - ./media:/app/media

volumes:
  postgres_data:
```

Démarrer :
```bash
docker-compose up -d
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser
```

## 🗄️ Migration de Base de Données

### De SQLite vers PostgreSQL

```bash
# Exporter les données SQLite
python manage.py dumpdata > data.json

# Configurer PostgreSQL dans .env
DATABASE_URL=postgresql://user:password@localhost/portfolio

# Migrer
python manage.py migrate
python manage.py loaddata data.json
```

## 🔄 Sauvegardes

### Automatisé avec Cron

```bash
# Sauvegarder la BDD quotidiennement
0 2 * * * pg_dump portfolio > /backup/portfolio_$(date +\%Y-\%m-\%d).sql

# Sauvegarder les fichiers médias
0 3 * * * tar -czf /backup/media_$(date +\%Y-\%m-\%d).tar.gz /app/media/
```

## 📊 Monitoring

### Avec Sentry (Error Tracking)

```bash
pip install sentry-sdk
```

```python
# settings.py
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[DjangoIntegration()],
    traces_sample_rate=0.1,
)
```

### Logs

```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/debug.log',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'INFO',
    },
}
```

## 🔒 Checklist de Sécurité

- [ ] `DEBUG = False`
- [ ] `SECRET_KEY` complexe et secret
- [ ] `ALLOWED_HOSTS` configuré
- [ ] HTTPS activé
- [ ] CORS restreint
- [ ] CSRF protection activée
- [ ] SQL Injection protéger (ORM Django)
- [ ] CORS_ALLOWED_ORIGINS restreint
- [ ] Sauvegardes automatiques
- [ ] Logs de sécurité activés
- [ ] Firewall configuré
- [ ] SSH key-based auth
- [ ] Mises à jour de sécurité appliquées

## 🆘 Dépannage

### Erreur 502 Bad Gateway

```bash
# Vérifier si Gunicorn tourne
systemctl status portfolio

# Voir les logs
journalctl -u portfolio -n 50
```

### Erreur 404 sur /static/

```bash
python manage.py collectstatic --noinput
systemctl restart portfolio
```

### Erreur de BDD

```bash
# Vérifier la connexion BDD
python manage.py dbshell

# Migrer
python manage.py migrate --run-syncdb
```

## 📱 CI/CD avec GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: python manage.py test
      - name: Deploy to server
        run: |
          # Votre script de déploiement
```

---

**Besoin d'aide ?** Consultez la [documentation Django](https://docs.djangoproject.com/en/5.1/howto/deployment/)
