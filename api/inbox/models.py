from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.apps import apps

from api.comments.models import Comment

User = get_user_model()


class Notification(models.Model):
    TYPES = [
        ('reply', 'Reply'),
        ('other', 'Other'),
    ]
    
    type = models.CharField(max_length=13, default='other', null=True, choices=TYPES)
    parent_user = models.ForeignKey(User, default=None, null=True, on_delete=models.CASCADE)
    parent_post = models.IntegerField(default=None, null=True)
    parent_comment = models.IntegerField(default=None, null=True)
    user = models.IntegerField(default=None, null=True)
    username = models.CharField(max_length=32, default=None, null=True)
    comment = models.ForeignKey(Comment, default=None, null=True, on_delete=models.CASCADE)
    community = models.IntegerField(default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False, null=True)
    
    def __str__(self):
        if self.type == 'reply':
            return 'Reply: ' + str(self.username) + ' -> ' + str(self.parent_user)
        return self.type
