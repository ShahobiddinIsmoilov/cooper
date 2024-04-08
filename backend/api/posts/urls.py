from django.urls import path

from .views import (postList, postDetail, postAction, postCreate,
                    postUpdate, postDelete, getLinkData)

urlpatterns = [
    path('list/', postList.postList, name='post-list'),
    path('detail/<int:pk>/', postDetail.postDetail, name='post-detail'),
    path('action/', postAction.postAction, name='post-action'),
    path('create/', postCreate.postCreate, name='post-create'),
    path('update/<int:pk>/', postUpdate.postUpdate, name='post-update'),
    path('delete/<int:pk>/', postDelete.postDelete, name='post-delete'),
    path('utils/getLinkData/', getLinkData.getLinkData, name='post-get-linkdata'),
]