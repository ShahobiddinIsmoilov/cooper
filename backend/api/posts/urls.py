from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_root, name='post-root'),
    path('list/community/<str:community_link>/', views.postListCommunity, name='post-list-community'),
    path('list/user/<str:username>/', views.postListUser, name='post-list-user'),
    path('list/all/', views.postListAll, name='post-list-all'),
    path('list/<int:pk>/', views.postDetail, name='post-detail'),
    path('create/', views.postCreate, name='post-create'),
    path('update/<int:pk>/', views.postUpdate, name='post-update'),
    path('delete/<int:pk>/', views.postDelete, name='post-delete'),
]