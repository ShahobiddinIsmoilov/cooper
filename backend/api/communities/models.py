from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Community(models.Model):
    owner = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=32, unique=True)
    title = models.CharField(max_length=64, null=True)
    bio = models.TextField(max_length=128, null=True)
    description = models.TextField(max_length=1024, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.IntegerField(default=0, null=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    rules = models.TextField(max_length=4096, null=True)
    profile_url = models.CharField(max_length=1024, null=True)

    def __str__(self):
        return self.name