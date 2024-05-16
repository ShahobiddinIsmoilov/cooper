from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):

    def create_user(self, username, password, **extra_fields):
        """
        Use username, password, and the additional fields to create and save user objects.
        """
        if not username:
            raise TypeError("Please enter username")

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
    username = models.CharField(max_length=24, unique=True)
    phone = models.CharField(max_length=20, default=None, null=True, blank=True)
    is_verified = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    is_warned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    votes = models.IntegerField(default=0, null=True)
    display_name = models.CharField(max_length=32, default=None, null=True)
    avatar = models.ImageField(
        upload_to="media/user/",
        default="media/user/trollface.png",
        null=True,
        blank=True,
    )
    telegram = models.URLField(default=None, null=True, blank=True)
    instagram = models.URLField(default=None, null=True, blank=True)
    facebook = models.URLField(default=None, null=True, blank=True)
    twitter = models.URLField(default=None, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["username"]),
        ]

    USERNAME_FIELD = "username"

    objects = UserManager()

    def __str__(self):
        return self.username

    def get_tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    @property
    def phone_number(self):
        phone = self.phone
        if phone == None or phone == "":
            return "-"
        if len(phone) != 12:
            return phone
        country = f"+{phone[:3]}"
        code = f" ({phone[3:5]})"
        number = f" {phone[5:8]}-{phone[8:10]}-{phone[10:12]}"
        pretty = country + code + number
        return pretty


class Code(models.Model):
    phone = models.CharField(default=None, null=True, blank=True)
    code = models.CharField(max_length=6, default=None, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "Authentication code"
