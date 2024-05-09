from django.db import models
from django.contrib.auth import get_user_model

from api.comments.models import Comment
from api.communities.models import Community

User = get_user_model()


class Notification(models.Model):
    TYPES = [
        ("post_reply", "Post reply"),
        ("comment_reply", "Comment reply"),
        ("other", "Other"),
    ]

    type = models.CharField(max_length=15, default="other", null=True, choices=TYPES)
    receiver = models.ForeignKey(
        User, default=None, null=True, on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        User,
        default=None,
        null=True,
        related_name="notif_sender",
        on_delete=models.SET_NULL,
    )
    comment = models.ForeignKey(
        Comment, default=None, null=True, on_delete=models.CASCADE
    )
    community = models.ForeignKey(
        Community, default=None, null=True, on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    post_permalink = models.CharField(max_length=15, default=None, null=True)
    parent_permalink = models.CharField(max_length=15, default=None, null=True)
    is_read = models.BooleanField(default=False, null=True)

    def __str__(self):
        return "Notification object"
