from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_root, name='post-root'),
    path('list/', views.ListPostView.as_view(), name='post-list'),
    path('posts/<int:pk>/', views.DetailPostView.as_view(), name='post-detail'),
    path('create/', views.CreatePostView.as_view(), name='post-create'),
    path('update/<int:pk>/', views.UpdatePostView.as_view(), name='post-update'),
]