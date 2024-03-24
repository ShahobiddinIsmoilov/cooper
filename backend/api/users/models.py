from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser, PermissionsMixin)
from rest_framework_simplejwt.tokens import RefreshToken

class UserManager(BaseUserManager):
    
    def create_user(self, username, password, **extra_fields):
        """
        Use username, password, and the additional fields to create and save user objects.
        """
        if not username:
            raise TypeError('Please enter username')

        user = self.model(username=username, **extra_fields)
        user.set_password(password)

        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):

        """
        Use username, password, and the additional fields to create and save superuser objects.
        """
        user = self.create_user(username, password, **extra_fields)
        user.is_superuser = True
        user.is_active = True
        user.is_verified = True
        user.is_staff = True

        user.save()
        return user
    

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=32, unique=True, db_index=True)
    phone_number = models.CharField(max_length=12, default=None, null=True)
    is_verified = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)

    USERNAME_FIELD = 'username'

    objects = UserManager()

    def __str__(self):
        return self.username

    def get_tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    
    def __str__(self):
        return self.body