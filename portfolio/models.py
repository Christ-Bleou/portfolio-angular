from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Utilisateur(models.Model):
    """
    Entité centrale du portfolio (toi).
    Pas d'authentification intégrée ici (pas de password) → simple profil public.
    """
    prenom       = models.CharField(max_length=100, verbose_name="Prénom")
    nom          = models.CharField(max_length=100, verbose_name="Nom")
    photo_profil = models.ImageField(upload_to='photos_profil/', blank=True, null=True, verbose_name="Photo de profil")
    bio          = models.TextField(verbose_name="Description / Bio", blank=True)
    age          = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(16), MaxValueValidator(120)]
    )
    email        = models.EmailField(unique=True)
    telephone    = models.CharField(max_length=30, blank=True, verbose_name="Téléphone")
    lien_cv      = models.URLField(max_length=500, blank=True, null=True, verbose_name="Lien vers le CV")

    date_creation = models.DateTimeField(auto_now_add=True)
    date_modif    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"

    class Meta:
        verbose_name = "Utilisateur principal"
        verbose_name_plural = "Utilisateurs principaux"


class UserImage(models.Model):
    """Images supplémentaires / galerie pour l'utilisateur"""
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='images_supplementaires')
    image       = models.ImageField(upload_to='user_images/')
    legende     = models.CharField(max_length=200, blank=True)
    ordre       = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return f"Image {self.legende or self.pk} – {self.utilisateur}"

    class Meta:
        ordering = ['ordre', 'pk']
        verbose_name = "Image utilisateur"
        verbose_name_plural = "Images utilisateur"


class Localisation(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='localisations')
    pays        = models.CharField(max_length=100)
    ville       = models.CharField(max_length=100)
    quartier    = models.CharField(max_length=150, blank=True)
    latitude    = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude   = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)

    def __str__(self):
        return f"{self.ville or '?'} – {self.pays} ({self.utilisateur})"


class Projet(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='projets')
    titre       = models.CharField(max_length=200)
    resume      = models.TextField(verbose_name="Résumé / Pitch du projet")
    image       = models.ImageField(upload_to='projets/', blank=True, null=True)
    lien        = models.URLField(max_length=500, blank=True, null=True, verbose_name="Lien vers le projet/site")

    date_creation = models.DateTimeField(auto_now_add=True)
    date_modif    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titre


class Experience(models.Model):
    TYPES_CONTRAT = (
        ('CDI', 'CDI'),
        ('CDD', 'CDD'),
        ('Stage', 'Stage'),
        ('Freelance', 'Freelance'),
        ('Alternance', 'Alternance'),
        ('Autre', 'Autre'),
    )

    utilisateur     = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='experiences')
    date_debut      = models.DateField()
    date_fin        = models.DateField(null=True, blank=True, verbose_name="Date de fin (laisser vide si en cours)")
    poste           = models.CharField(max_length=150, verbose_name="Rôle / Poste occupé")
    entreprise      = models.CharField(max_length=200)
    description     = models.TextField(verbose_name="Missions & réalisations")
    type_contrat    = models.CharField(max_length=20, choices=TYPES_CONTRAT, default='CDI')

    def __str__(self):
        return f"{self.poste} – {self.entreprise}"


class Service(models.Model):
    utilisateur   = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='services')
    nom           = models.CharField(max_length=150, verbose_name="Nom du service proposé")
    details       = models.TextField()
    type_service  = models.CharField(max_length=120, blank=True)
    outils        = models.CharField(max_length=300, blank=True, help_text="Ex: Angular, Django, Figma, AWS...")

    def __str__(self):
        return self.nom


class MessageContact(models.Model):
    """Messages entrants via le formulaire de contact – pas lié directement à un Utilisateur"""
    nom_complet = models.CharField(max_length=150)
    email       = models.EmailField()
    objet       = models.CharField(max_length=200)
    message     = models.TextField()
    date_envoi  = models.DateTimeField(auto_now_add=True)

    lu          = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.objet} – {self.nom_complet} ({self.date_envoi.date()})"


class ReseauSocial(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='reseaux_sociaux')
    plateforme  = models.CharField(max_length=80, verbose_name="Plateforme (LinkedIn, GitHub, etc.)")
    lien        = models.URLField(max_length=500)

    def __str__(self):
        return f"{self.plateforme} – {self.utilisateur}"