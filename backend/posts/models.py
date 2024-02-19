from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Post(models.Model):
    user = models.ForeignKey(User, default=12, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=128)
    content = models.TextField(max_length=4096)
    created_at = models.DateTimeField(auto_now_add=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    comments = models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.title