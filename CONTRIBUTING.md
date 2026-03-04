# CONTRIBUTING.md

Merci de l'intérêt que vous portez au projet Portfolio Django ! 👋

Ce document fournit les directives pour contribuer au projet.

## 📋 Code de Conduite

Nous nous engageons à maintenir un environnement respectueux et inclusif pour tous les contributeurs.

## 🐛 Signaler un Bug

Avant de signaler un bug, veuillez vérifier que celui-ci n'a pas déjà été rapporté.

**Lors de la création d'un rapport de bug, incluez :**
- Titre clair et descriptif
- Description exacte du comportement attendu vs observé
- Étapes pour reproduire le problème
- Exemples spécifiques pour démontrer les étapes
- Environnement (OS, Python version, Django version, etc.)

## 💡 Proposer une Amélioration

Les suggestions d'amélioration sont toujours bienvenues !

**Pour proposer une amélioration :**
1. Utilisez un titre clair et descriptif
2. Expliquez le cas d'utilisation
3. Fournissez des exemples concrets
4. Listez les alternatives envisagées

## 🔧 Processus de Contribution

### 1. Fork le repository

```bash
git clone https://github.com/your-username/P_portfolio_django.git
cd P_portfolio_django
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-feature
# ou pour un bug fix
git checkout -b fix/nom-du-bug
```

**Convention de nommage pour les branches :**
- `feature/description` - pour une nouvelle fonctionnalité
- `fix/description` - pour une correction de bug
- `docs/description` - pour une documentation
- `refactor/description` - pour du refactoring

### 3. Faire les modifications

```bash
# Assurez-vous que l'environnement virtuel est activé
source venv/bin/activate  # ou .\venv\Scripts\activate (Windows)

# Installer les dépendances de développement
pip install -r requirements.txt

# Effectuer vos modifications
# ...

# Lancer les tests
python manage.py test

# Vérifier le style de code
black portfolio/
flake8 portfolio/
isort portfolio/
```

### 4. Commiter vos changements

```bash
git add .
git commit -m "feat: description claire de la modification"
```

**Convention de commit :**
- `feat:` une nouvelle fonctionnalité
- `fix:` correction d'un bug
- `docs:` changements de documentation
- `style:` formatage, points-virgules manquants, etc.
- `refactor:` refactoring du code (pas de feat ou fix)
- `perf:` amélioration de performance
- `test:` ajout de tests

### 5. Pousser vers la branche

```bash
git push origin feature/ma-nouvelle-feature
```

### 6. Créer une Pull Request

1. Allez sur le repository original
2. Cliquez sur "New Pull Request"
3. Sélectionnez votre branche
4. Remplissez le modèle de PR avec :
   - Description des changements
   - Référence aux issues liées (ex: "Closes #123")
   - Tests effectués
   - Screenshots (si applicable)

## 📝 Directives de Codage

### Style Python

- Utiliser **Black** pour le formatage (`pip install black && black .`)
- Utiliser **isort** pour les imports (`pip install isort && isort .`)
- Vérifier avec **flake8** (`pip install flake8 && flake8 .`)

### Python (PEP 8)

```python
# ✅ Bon
def create_user(firstname, lastname):
    """Crée un nouvel utilisateur."""
    user = Utilisateur(prenom=firstname, nom=lastname)
    user.save()
    return user

# ❌ Mauvais
def createUser(FN,LN):
    u=Utilisateur(prenom=FN,nom=LN)
    u.save()
    return u
```

### Docstrings

```python
def generate_portfolio(user_id, template):
    """
    Génère un portfolio pour un utilisateur.
    
    Args:
        user_id (int): ID de l'utilisateur
        template (str): Nom du template
    
    Returns:
        FileResponse: ZIP du portfolio
    
    Raises:
        Utilisateur.DoesNotExist: Si l'utilisateur n'existe pas
    """
    # ...
```

## 🧪 Tests

Tous les PRs doivent incluire des tests.

```bash
# Lancer les tests
python manage.py test

# Tests avec coverage
coverage run --source='.' manage.py test
coverage report
coverage html

# Tests spécifiques
python manage.py test portfolio.tests.test_views
```

### Exemple de test

```python
from django.test import TestCase
from portfolio.models import Utilisateur

class UtilisateurTestCase(TestCase):
    def setUp(self):
        self.user = Utilisateur.objects.create(
            prenom="Jean",
            nom="Dupont",
            email="jean@example.com"
        )
    
    def test_user_creation(self):
        self.assertEqual(self.user.prenom, "Jean")
        self.assertEqual(self.user.email, "jean@example.com")
```

## 📖 Documentation

- Mettez à jour le README.md si necessaire
- Documentez les nouvelles fonctionnalités dans les docstrings
- Incluez des exemples d'utilisation pour les nouvelles APIs

## ✅ Checklist avant de soumettre un PR

- [ ] Code testé localement
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Code formaté avec Black et isort
- [ ] Pas d'erreurs flake8
- [ ] Docstrings ajoutées/mises à jour
- [ ] README/docs mise à jour si applicable
- [ ] Pas de fichiers de debug (print, pdb, etc.)
- [ ] Commit messages clairs et explicites

## 🚀 Processus de Révision

1. **Un mainteneur** examinera votre PR
2. **Modifications demandées** : vous pouvez faire des changements et les pousser
3. **Approbation** : une fois approuvée, votre PR sera fusionnée 🎉

## 📞 Questions ?

N'hésitez pas à :
- Ouvrir une issue
- Créer une discussion
- Me contacter directement

## 💖 Merci !

Merci d'avoir contribué à Portfolio Django ! Vos efforts font une différence.
