from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_root, name='post'),
    path('posts/', views.ListPostView.as_view(), name='posts'),
    path('posts/<int:pk>/', views.DetailPostView.as_view(), name='detail'),
    path('create/', views.CreatePostView.as_view(), name='create'),
    path('update/<int:pk>/', views.UpdatePostView.as_view(), name='update'),
]