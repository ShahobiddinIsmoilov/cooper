from django.urls import path

from .views import (postList, postListPrivate, postDetail, postAction, getLinkData, misc)


# Post urls
urlpatterns = [
    path('list/', postList.postList, name='post-list'),
    path('privatelist/', postListPrivate.postListPrivate, name='post-list-private'),
    path('detail/<str:permalink>/', postDetail.postDetail, name='post-detail'),
    path('action/', postAction.postAction, name='post-action'),
    path('create/', misc.postCreate, name='post-create'),
    path('update/<int:pk>/', misc.postUpdate, name='post-update'),
    path('delete/<int:pk>/', misc.postDelete, name='post-delete'),
    path('getmetadata/', getLinkData.getLinkData, name='post-get-linkdata'),
]