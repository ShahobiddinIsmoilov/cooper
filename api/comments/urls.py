from django.urls import path

from .views import activityList, commentList, commentAction, misc

# Comment urls
urlpatterns = [
    path('list/', commentList.commentList, name='comment-list'),
    path('useractivity/<str:username>/', activityList.activityList, name='activity-list'),
    path('action/', commentAction.commentAction, name='comment-action'),
    path('create/', misc.commentCreate, name='comment-create'),
    path('update/<int:pk>/', misc.commentUpdate, name='comment-update'),
    path('delete/<int:pk>/', misc.commentDelete, name='comment-delete'),
]