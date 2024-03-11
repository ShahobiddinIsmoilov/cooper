from django.contrib.auth import get_user_model
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
                          UserSerializer)

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
        user_data = serializer.data
        
        return Response(user_data, status=status.HTTP_201_CREATED)
    

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


class UserDetail(generics.RetrieveAPIView):
    """
    Retrieving the details about a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
