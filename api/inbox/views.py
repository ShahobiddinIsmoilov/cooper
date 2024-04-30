from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import Notification
from .serializers import ListNotificationSerializer


# Getting the list of notifications
@api_view(['GET'])
def notificationList(request):
    filter = request.GET.get('filter')
    
    if filter == 'user':
        receiver = request.GET.get('receiver')
        notifs = Notification.objects.filter(receiver=receiver).order_by('-created_at')
    else:
        notifs = Notification.objects.all().order_by('-created_at')
        
    data = ListNotificationSerializer(notifs, many=True).data
    
    return Response(data)


# Updating notification "is_read" state
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def notificationAction(request):
    receiver = request.user.id
    action = request.data.get('action')
    
    if action == 'read_one':
        pk = request.data.get('id')
        notification = Notification.objects.get(pk=pk)
        notification.is_read = True
        notification.save()
    elif action == 'read_all':
        notifications = Notification.objects.filter(receiver=receiver, is_read=False)
        print(notifications)
        for notification in notifications:
            notification.is_read = True
            notification.save()
        
    return Response(status=status.HTTP_200_OK)