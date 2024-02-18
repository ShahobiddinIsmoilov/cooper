from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.response import Response

from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer

User = get_user_model()

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

        return Response(serializer.data, status=status.HTTP_200_OK)
    

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