from django.urls import path

from . import views


urlpatterns = [
    path('', views.api_root, name='community-root'),
    path('list/', views.communityList, name='community-list'),
    path('list/<str:link>/', views.communityDetail, name='community-detail'),
    path('create/', views.communityCreate, name='community-create'),
    path('update/<str:name>/', views.communityUpdate, name='community-update'),
    path('delete/<str:name>/', views.communityDelete, name='community-delete'),
]
