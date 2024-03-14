from django.urls import path, include


urlpatterns = [
    path('community/', include('api.communities.urls')),
    path('post/', include('api.posts.urls')),
    path('user/', include('api.users.urls')),
    path('comment/', include('api.comments.urls')),
]