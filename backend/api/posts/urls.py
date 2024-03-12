from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_root, name='post-root'),
    path('list/all/', views.postListAll, name='post-list-all'),
    path('list/<str:name>/', views.postList, name='post-list'),
    path('<int:pk>/', views.postDetail, name='post-detail'),
    path('create/', views.postCreate, name='post-create'),
    path('update/<int:pk>/', views.postUpdate, name='post-update'),
    path('delete/<int:pk>/', views.postDelete, name='post-delete'),
]