from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.apps import apps
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.reverse import reverse

from api.users.models import Note

from .serializers import (NoteSerializer,
                          RegistrationSerializer,
                          LoginSerializer,
                          LogoutSerializer,
                          UserSerializer,
                          UserDetailSerializer,
                          UserUpdateSerializer)

User = get_user_model()


@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'register': reverse('register', request=request, format=None),
        'login': reverse('login', request=request, format=None),
        'token': reverse('token', request=request, format=None),
        'refresh-token': reverse('refresh-token', request=request, format=None),
        'user-list': reverse('user-list', request=request, format=None),
        'logout': reverse('logout', request=request, format=None)
    })
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    # notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

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
    

class LoginView(generics.GenericAPIView):
    """
    Logging in users
    """
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        state = {
            'username': serializer.data['username'],
            'status': 'successfully logged in'
        }

        return Response(state, status=status.HTTP_200_OK)
    

class LogoutView(generics.GenericAPIView):
    """
    Logging out users
    """
    serializer_class = LogoutSerializer
 
    # permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'success': True, 'message':'Logged out successfully'}, status=status.HTTP_200_OK)
    

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
