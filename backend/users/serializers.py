from django.contrib import auth
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    """
    User registration serializer
    """
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class LoginSerializer(serializers.ModelSerializer):
    """
    User login serializer
    """
    username = serializers.CharField(max_length=40, min_length=6)
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    token = serializers.CharField(max_length=68, min_length=8, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'token']

    def validate(self, attrs):
        username = attrs.get('username', '')
        password = attrs.get('password', '')

        user = auth.authenticate(username=username, password=password)

        if not user:
            raise AuthenticationFailed('Invalid Credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, please contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
        
        return {
            'username': user.username,
            'token': user.get_tokens
        }
    

# .. other serializers
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to get the users list
    """
    class Meta:
        model = User
        fields = ["id", "username", "is_active", "is_staff"]