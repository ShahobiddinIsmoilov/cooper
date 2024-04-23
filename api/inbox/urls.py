from django.urls import path

from .views import notificationList, notificationAction

# Notification urls
urlpatterns = [
    path('list/', notificationList, name='notification-list'),
    path('action/', notificationAction, name='notification-action'),
]