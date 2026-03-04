from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from rest_framework.parsers import MultiPartParser, FormParser # type: ignore
from django.conf import settings
from django.http import FileResponse
import shutil
import tempfile
import zipfile
import os

from .models import Utilisateur, Projet
from .serializers import UtilisateurCreateSerializer, ProjetCreateSerializer, ProjetListSerializer, UtilisateurDetailSerializer


class UtilisateurCreateView(APIView):
    """
    POST /api/v1/users/
    Crée un nouveau profil utilisateur
    Payload attendu : { "First name": "...", "Last name": "...", "email": "...", ... }
    """
    # accept multipart/form-data for image upload
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = UtilisateurCreateSerializer(data=request.data)
        if serializer.is_valid():
            utilisateur = serializer.save()
            # return fresh representation from instance
            out = UtilisateurCreateSerializer(utilisateur)
            return Response(out.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjetCreateView(APIView):
    """
    POST /api/v1/projets/
    Crée un projet lié à un utilisateur via "UserId"
    """

    def post(self, request):
        serializer = ProjetCreateSerializer(data=request.data)
        if serializer.is_valid():
            projet = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjetListView(APIView):
    """GET /api/v1/projets/ → liste tous les projets (temporaire pour test)"""

    def get(self, request):
        projets = Projet.objects.all()
        serializer = ProjetListSerializer(projets, many=True)
        return Response(serializer.data)


class GeneratePortfolioView(APIView):
    """POST /api/v1/generate/
    Attends: { "user_id": <id>, "template": "template_name" }
    Cherche un dossier de template dans `templates/angular_templates/<template>`
    Remplace des placeholders simples et renvoie un ZIP prêt à télécharger.
    """

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user_id = request.data.get('user_id') or request.data.get('UserId')
        template = request.data.get('template', 'default')
        if not user_id:
            return Response({'detail': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Utilisateur.objects.get(pk=user_id)
        except Utilisateur.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        template_dir = os.path.join(settings.BASE_DIR, 'templates', 'angular_templates', template)
        if not os.path.exists(template_dir):
            return Response({'detail': 'Template not found on server'}, status=status.HTTP_404_NOT_FOUND)

        tmpdir = tempfile.mkdtemp()
        try:
            dest = os.path.join(tmpdir, 'project')
            shutil.copytree(template_dir, dest)

            placeholders = {
                '__FIRST_NAME__': user.prenom or '',
                '__LAST_NAME__': user.nom or '',
                '__EMAIL__': user.email or '',
            }

            for root, _, files in os.walk(dest):
                for fname in files:
                    path = os.path.join(root, fname)
                    try:
                        with open(path, 'rb') as f:
                            data = f.read()
                        try:
                            text = data.decode('utf-8')
                        except UnicodeDecodeError:
                            continue
                        for k, v in placeholders.items():
                            text = text.replace(k, v)
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(text)
                    except Exception:
                        continue

            zip_path = os.path.join(tmpdir, f'{user.prenom or "user"}_{user.nom or "portfolio"}_portfolio.zip')
            with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
                for root, _, files in os.walk(dest):
                    for fname in files:
                        full = os.path.join(root, fname)
                        zf.write(full, arcname=os.path.relpath(full, dest))

            return FileResponse(open(zip_path, 'rb'), as_attachment=True, filename=os.path.basename(zip_path))
        finally:
            shutil.rmtree(tmpdir, ignore_errors=True)

class UtilisateurDetailView(APIView):
    """
    GET /api/v1/users/<id>/
    Récupère un utilisateur + tous ses projets (et plus tard on pourra ajouter expériences, etc.)
    """

    def get(self, request, pk):
        try:
            utilisateur = Utilisateur.objects.get(pk=pk)
        except Utilisateur.DoesNotExist:
            return Response({"detail": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UtilisateurDetailSerializer(utilisateur)
        return Response(serializer.data)