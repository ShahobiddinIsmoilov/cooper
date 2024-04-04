from django.urls import path

from . import views

# Comment urls
urlpatterns = [
    path('', views.api_root, name='comment-root'),
    path('post/<int:post>/', views.commentListPost, name='comment-list-post'),
    path('user/<str:username>/', views.commentListUser, name='comment-list-user'),
    path('useractivity/<str:username>/', views.activityListUser, name='user-activity-list'),
    path('all/', views.commentListAll, name='comment-list-all'),
    path('action/<int:pk>/', views.commentAction, name='comment-action'),
    path('create/', views.commentCreate, name='comment-create'),
    path('update/<int:pk>/', views.commentUpdate, name='comment-update'),
    path('delete/<int:pk>/', views.commentDelete, name='comment-delete'),
]