from django.contrib import auth
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.users.models import Code

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    """
    User registration serializer
    """
    password = serializers.CharField(max_length=64, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["username", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if len(username) < 3:
            raise serializers.ValidationError("username length cannot be less than 3")

        if username.lower() in password.lower() or password.lower() in username.lower():
            raise serializers.ValidationError("username and password cannot be similar")

        return attrs


class LoginSerializer(serializers.ModelSerializer):
    """
    User login serializer
    """
    username = serializers.CharField(max_length=40, min_length=3)
    password = serializers.CharField(max_length=64, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["username", "password"]

    def validate(self, attrs):
        username = attrs.get("username", "")
        password = attrs.get("password", "")

        user = auth.authenticate(username=username, password=password)

        if not user:
            raise AuthenticationFailed("Invalid Credentials, try again")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, please contact admin")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")

        return attrs


class LogoutSerializer(serializers.Serializer):
    """
    User logout serializer
    """
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            raise ValidationError(
                {"incorrect_token": "The token is either invalid or expired"}
            )


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to get the users list
    """
    class Meta:
        model = User
        fields = ["id", "username"]


class UserDetailSerializer(serializers.ModelSerializer):
    """
    Serializer to get specific user details
    """
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "phone",
            "display_name",
            "created_at",
            "votes",
            "avatar",
            "telegram",
            "instagram",
            "facebook",
            "twitter",
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer to update user settings
    """

    class Meta:
        model = User
        fields = [
            "avatar",
            "display_name",
            "phone",
            "telegram",
            "instagram",
            "facebook",
            "twitter",
        ]
        

class CodeSerializer(serializers.ModelSerializer):
    """
    Authentication code serializer
    """
    class Meta:
        model = Code
        fields = ["phone"]
    

# Customizing token claims. Settings.py is configured to use this serializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        # ...

        return token
