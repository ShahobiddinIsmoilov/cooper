from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_root, name='post-root'),
    path('list/', views.postList, name='post-list'),
    path('list/<int:pk>/', views.postDetail, name='post-detail'),
    path('create/', views.postCreate, name='post-create'),
    path('update/<int:pk>/', views.postUpdate, name='post-update'),
    path('delete/<int:pk>/', views.postDelete, name='post-delete'),
]