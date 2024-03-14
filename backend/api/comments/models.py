from django.db import models
from django.contrib.auth import get_user_model

from api.posts.models import Post


User = get_user_model()

class Comment(models.Model):
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=1, null=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=32, null=True, default="admin")
    community = models.CharField(max_length=32, null=True, default="cars")
    parent = models.IntegerField(default=0, null=True)
    body = models.TextField(max_length=2048, null=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['post']),
            models.Index(fields=['created_at'])
        ]
        
    def __str__(self):
        return self.body
    
    @property
    def votes(self):
        return self.upvotes - self.downvotes