from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from api.users.models import User
from api.communities.models import Community
from api.comments.models import Comment
from api.posts.models import Post
from .models import Notification
from .serializers import ListNotificationSerializer
from api.convert import from_10_to_36_post


# Getting the list of notifications
@api_view(['GET'])
def notificationList(request):
    filter = request.GET.get('filter')
    
    if filter == 'user':
        parent_user = request.GET.get('parent_user')
        notifs = Notification.objects.filter(parent_user=parent_user).order_by('-created_at')
    else:
        notifs = Notification.objects.all().order_by('-created_at')
        
    data = ListNotificationSerializer(notifs, many=True).data
    
    for i, notif in enumerate(notifs):
        user = get_object_or_404(User, pk=notif.user)
        community = get_object_or_404(Community, pk=notif.community)
        comment = get_object_or_404(Comment, pk=notif.comment.pk)
        post = from_10_to_36_post(notif.parent_post)
        
        data[i]['user_avatar'] = str(user.avatar)
        data[i]['community_link'] = community.link
        data[i]['community_name'] = community.name
        data[i]['comment_body'] = comment.body
        data[i]['parent_post'] = post
        
    return Response(data)


# Updating notification "is_read" state
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def notificationAction(request):
    parent_user = request.user.id
    action = request.data.get('action')
    
    if action == 'read_one':
        pk = request.data.get('id')
        notification = Notification.objects.get(pk=pk)
        notification.is_read = True
        notification.save()
    elif action == 'read_all':
        notifications = Notification.objects.filter(parent_user=parent_user, is_read=False)
        print(notifications)
        for notification in notifications:
            notification.is_read = True
            notification.save()
        
    return Response(status=status.HTTP_200_OK)