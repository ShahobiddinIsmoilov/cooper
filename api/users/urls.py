from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views, userActivity

urlpatterns = [
    path('list/', views.UserList.as_view(), name="user-list"),
    path('detail/<str:username>/', views.userDetail, name="user-detail"),
    path('activity/<str:username>/', userActivity.activityList, name="user-activity"),
    path('register/', views.RegistrationView.as_view(), name="register"),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh-token'),
    path('update/<int:pk>/', views.userUpdate, name="user-update"),
    path('delete/<int:pk>/', views.userDelete, name="user-delete"),
]