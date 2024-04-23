from django.contrib import admin
from django.urls import path, include
from .mainview import OK


urlpatterns = [
    path('', OK),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
