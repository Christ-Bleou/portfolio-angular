from django.urls import path
from .views import (
    UtilisateurCreateView,
    ProjetCreateView,
    ProjetListView,
    GeneratePortfolioView,
)

urlpatterns = [
    path('users/', UtilisateurCreateView.as_view(), name='create-utilisateur'),
    path('projets/', ProjetCreateView.as_view(), name='create-projet'),
    path('projets/list/', ProjetListView.as_view(), name='list-projets'),
    path('generate/', GeneratePortfolioView.as_view(), name='generate-portfolio'),
]