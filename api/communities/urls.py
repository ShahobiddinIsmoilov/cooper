from django.urls import path

from . import views


urlpatterns = [
    path("list/all/", views.communityListAll, name="community-list-all"),
    path("list/joined/", views.communityListJoined, name="community-list-joined"),
    path("list/discover/", views.communityListDiscover, name="community-list-discover"),
    path("detail/<str:link>/", views.communityDetail, name="community-detail"),
    path("action/<int:pk>/", views.communityAction, name="community-action"),
    path("create/", views.communityCreate, name="community-create"),
    path("update/<int:pk>/", views.communityUpdate, name="community-update"),
    path("check-link/<str:link>/", views.check_link, name="check-community-link"),
]
