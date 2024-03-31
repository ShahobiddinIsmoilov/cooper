from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Community(models.Model):
    owner = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    owner_username = models.CharField(max_length=32, default=None, null=True)
    name = models.CharField(max_length=32, default=None, null=True, unique=True)
    link = models.CharField(max_length=32, default=None, null=True, unique=True)
    description = models.TextField(max_length=1000, default=None, null=True)
    members = models.IntegerField(default=0, null=True)
    posts = models.IntegerField(default=0, null=True)
    comments = models.IntegerField(default=0, null=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    rules = models.TextField(max_length=5000, default=None, null=True)
    avatar_url = models.URLField(max_length=10000, default=None, null=True)
    banner_url = models.URLField(max_length=10000, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['link']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return self.name