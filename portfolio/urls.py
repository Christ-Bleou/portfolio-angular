from django.urls import path
from .views import (
    UtilisateurCreateView,
    ProjetCreateView,
    ProjetListView,
    GeneratePortfolioView,
    UtilisateurDetailView,
)

urlpatterns = [
    path('users/', UtilisateurCreateView.as_view(), name='create-utilisateur'),
    path('users/<int:pk>/', UtilisateurDetailView.as_view(), name='detail-utilisateur'),
    path('projets/', ProjetCreateView.as_view(), name='create-projet'),
    path('projets/list/', ProjetListView.as_view(), name='list-projets'),
    path('generate/', GeneratePortfolioView.as_view(), name='generate-portfolio'),
]