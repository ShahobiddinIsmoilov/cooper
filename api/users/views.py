from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.apps import apps
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import (RegistrationSerializer,
                          UserSerializer,
                          UserDetailSerializer,
                          UserUpdateSerializer)

User = get_user_model()

    
class UserList(generics.ListAPIView):
    """
    Getting the list of users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    
@api_view(['GET'])
def userDetail(request, username):
    """
    Retrieving the details about a user
    """
    user = get_object_or_404(User, username=username)
    data = UserDetailSerializer(user, many=False).data
    
    Notification = apps.get_model('inbox', 'Notification')
    notifications = Notification.objects.filter(parent_user=user.id, is_read=False)
    
    data['notifications'] = len(notifications)
    
    return Response(data)


class RegistrationView(generics.GenericAPIView):
    """
    Registering users
    """
    serializer_class = RegistrationSerializer
    
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_201_CREATED)
    

@api_view(['PUT', 'PATCH'])
def userUpdate(request, pk):
    """
    Updating user settings
    """
    user = get_object_or_404(User, pk=pk)
    serializer = UserUpdateSerializer(instance=user, data=request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def userDelete(request, pk):
    """
    Deleting a user
    """
    user = get_object_or_404(User, pk=pk)
    user.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)
