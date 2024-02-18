from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .import views

urlpatterns = [
    path('', views.api_root, name='user'),
    path('register/', views.RegistrationView.as_view(), name="register"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutView.as_view(), name="logout"),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', views.UserList.as_view(), name="user-list"),
    path('users/<int:pk>/', views.UserDetail.as_view(), name="user-detail"),
]