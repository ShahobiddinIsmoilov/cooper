from django.urls import path

from . import views


urlpatterns = [
    path('', views.api_root, name='community-root'),
    path('list/joined/', views.communityListJoined, name='community-list-joined'),
    path('list/discover/', views.communityListDiscover, name='community-list-discover'),
    path('list/all/', views.communityListAll, name='community-list-all'),
    path('detail/<str:link>/', views.communityDetail, name='community-detail'),
    path('create/', views.communityCreate, name='community-create'),
    path('update/<str:link>/', views.communityUpdate, name='community-update'),
    path('delete/<str:link>/', views.communityDelete, name='community-delete'),
    path('action/<int:pk>/', views.communityAction, name='community-action'),
]
