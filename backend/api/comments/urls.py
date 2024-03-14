from django.urls import path

from . import views


urlpatterns = [
    path('', views.api_root, name='post-root'),
    path('list/all/', views.commentListAll, name='comment-list-all'),
    path('list/<int:post_id>/', views.commentList, name='comment-list'),
    # path('<int:pk>/', views.commentDetail, name='comment-detail'),
    path('create/', views.commentCreate, name='comment-create'),
    # path('update/<int:pk>/', views.commentUpdate, name='comment-update'),
    # path('delete/<int:pk>/', views.commentDelete, name='comment-delete'),
]