from rest_framework import serializers # type: ignore
from .models import (
    Utilisateur, Projet, Experience, Service,
    MessageContact, ReseauSocial, Localisation, UserImage
)


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ['id', 'image', 'legende', 'ordre']


class UtilisateurCreateSerializer(serializers.ModelSerializer):
    """
    Serializer pour POST /api/v1/users/
    Accepte les clés JSON en anglais : "First name", "Last name"
    """
    firstName = serializers.CharField(source='prenom', write_only=True)
    lastName  = serializers.CharField(source='nom', write_only=True)

    class Meta:
        model = Utilisateur
        fields = [
            'id',
            'firstName', 'lastName',      # reçus en écriture
            'prenom', 'nom',                # renvoyés en lecture
            'photo_profil', 'bio', 'age',
            'email', 'telephone', 'lien_cv',
            'date_creation',
        ]
        # Keep `firstName`/`lastName` as write-only aliases while
        # returning the actual `prenom`/`nom` values in responses.
        read_only_fields = ['id', 'date_creation']

    def create(self, validated_data):
        # Les sources 'prenom' et 'nom' ont déjà été mappées via source=...
        return super().create(validated_data)


class ProjetCreateSerializer(serializers.ModelSerializer):
    """
    Serializer pour POST /api/v1/projets/
    Accepte "UserId" → mappe vers utilisateur
    """
    UserId = serializers.PrimaryKeyRelatedField(
        queryset=Utilisateur.objects.all(),
        source='utilisateur',
        write_only=True
    )

    class Meta:
        model = Projet
        fields = [
            'id',
            'UserId',
            'titre', 'resume', 'image', 'lien',
            'date_creation',
        ]
        read_only_fields = ['id', 'date_creation']


class ProjetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = ['id', 'titre', 'resume', 'image', 'lien', 'date_creation']