from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

User = get_user_model()


class Community(models.Model):
    owner = models.ForeignKey(User, default=None, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=32, default=None, null=True, blank=True)
    link = models.CharField(
        max_length=24, default=None, null=True, blank=True, unique=True
    )
    description = models.TextField(
        max_length=1000,
        default=None,
        null=True,
        blank=True,
    )
    members = models.IntegerField(
        default=0,
        null=True,
        blank=True,
    )
    posts = models.IntegerField(
        default=0,
        null=True,
        blank=True,
    )
    comments = models.IntegerField(
        default=0,
        null=True,
        blank=True,
    )
    rules = models.TextField(
        max_length=5000,
        default=None,
        null=True,
        blank=True,
    )
    avatar = models.ImageField(
        upload_to="media/community/",
        default="media/community/default_avatar.png",
        null=True,
        blank=True,
    )
    banner = models.ImageField(
        upload_to="media/community/",
        default="media/community/default_banner.png",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["name"]),
            models.Index(fields=["link"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return self.name


class UserCommunity(models.Model):
    user = models.ForeignKey("users.User", default=1, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, default=1, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "community")

    def __str__(self):
        return "User-community relationship object"


@receiver(post_save, sender=UserCommunity)
def increment_members(sender, instance, created, **kwargs):
    if created:
        community = Community.objects.get(id=instance.community_id)
        community.members += 1
        community.save()


@receiver(post_delete, sender=UserCommunity)
def decrement_members(sender, instance, **kwargs):
    community = Community.objects.get(id=instance.community_id)
    if community.members > 0:
        community.members -= 1
    community.save()
