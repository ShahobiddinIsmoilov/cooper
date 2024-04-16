from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('', views.api_root, name='user-root'),
    path('notes/', views.getNotes, name="notes-list"),
    path('register/', views.RegistrationView.as_view(), name="register"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutView.as_view(), name="logout"),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh-token'),
    path('users/', views.UserList.as_view(), name="user-list"),
    path('detail/<str:username>/', views.UserDetail, name="user-detail"),
]