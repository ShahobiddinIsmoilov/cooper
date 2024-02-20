from django.urls import path

from . import views


urlpatterns = [
    path('', views.api_root, name='community-root'),
    path('list/', views.ListCommunityView.as_view(), name='community-list'),
    path('create/', views.CreateCommunityView.as_view(), name='community-create')
]
