from django.db import models
from django.apps import apps
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from api.convert import encode_post_id, encode_comment_id

User = get_user_model()


class Comment(models.Model):
    user = models.ForeignKey(User, default=None, null=True, on_delete=models.SET_NULL)
    post = models.ForeignKey(
        "posts.Post", default=None, null=True, on_delete=models.SET_NULL
    )
    community = models.ForeignKey(
        "communities.Community", default=None, null=True, on_delete=models.CASCADE
    )
    parent = models.ForeignKey(
        "comments.Comment", default=None, null=True, on_delete=models.CASCADE
    )
    body = models.TextField(max_length=10000, default=None, null=True)
    body_text = models.TextField(max_length=10000, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited = models.BooleanField(default=False, null=True)
    edited_at = models.DateTimeField(null=True, blank=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    votes = models.IntegerField(default=0, null=True)
    ratio = models.FloatField(default=0, null=True)
    deleted = models.BooleanField(default=False, null=True)

    @property
    def permalink(self):
        return encode_comment_id(self.id)

    @property
    def post_permalink(self):
        if self.post_id:
            return encode_post_id(self.post_id)
        return self.post_id

    @property
    def parent_comment_id(self):
        if self.parent == None:
            return 0
        return self.parent_id
    
    @property
    def post_deleted(self):
        if self.post:
            return self.post.deleted
        return True
    
    @property
    def parent_deleted(self):
        if self.parent:
            return self.parent.deleted
        return True
    
    @property
    def parent_user_deleted(self):
        if self.parent.user:
            return self.parent.user.deleted
        return True

    class Meta:
        indexes = [
            models.Index(fields=["votes"]),
            models.Index(fields=["ratio"]),
            models.Index(fields=["created_at"]),
        ]

    def save(self, *args, **kwargs):
        self.votes = self.calculateVotes(self.upvotes, self.downvotes)
        self.ratio = self.calculateRatio(self.upvotes, self.downvotes)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.body

    @staticmethod
    def calculateVotes(upvotes, downvotes):
        return upvotes - downvotes

    @staticmethod
    def calculateRatio(upvotes, downvotes):
        if not upvotes:
            upvotes = 1
        if not downvotes:
            downvotes = 1
        return upvotes / downvotes


@receiver(post_save, sender=Comment)
def increment_comments(sender, instance, created, **kwargs):
    if created:
        Post = apps.get_model("posts", "Post")
        post = Post.objects.get(id=instance.post_id)
        post.comments += 1
        post.save()

        Community = apps.get_model("communities", "Community")
        community = Community.objects.get(id=instance.community_id)
        community.comments += 1
        community.save()

        Notification = apps.get_model("inbox", "Notification")

        if instance.parent_id == None:
            receiver = instance.post.user
            parent_permalink = None
            notification_type = "post_reply"
        else:
            receiver = instance.parent.user
            parent_permalink = encode_comment_id(instance.parent_id)
            notification_type = "comment_reply"

        post_permalink = encode_post_id(instance.post_id)

        Notification.objects.create(
            type=notification_type,
            receiver=receiver,
            sender=instance.user,
            comment=instance,
            community=instance.community,
            post_permalink=post_permalink,
            parent_permalink=parent_permalink,
        ).save()


@receiver(post_delete, sender=Comment)
def decrement_comments(sender, instance, **kwargs):
    Post = apps.get_model("posts", "Post")
    post = Post.objects.get(id=instance.post_id)
    if post.comments > 0:
        post.comments -= 1
    post.save()

    Community = apps.get_model("communities", "Community")
    community = Community.objects.get(id=instance.community_id)
    if community.comments > 0:
        community.comments -= 1
    community.save()

    Notification = apps.get_model("inbox", "Notification")
    notification = Notification.objects.filter(comment=instance.pk)
    if notification.exists():
        notification.delete()


class UpvoteComment(models.Model):
    user = models.ForeignKey("users.User", default=1, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, default=1, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return "Comment upvote object"


class DownvoteComment(models.Model):
    user = models.ForeignKey("users.User", default=1, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, default=1, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return "Comment downvote object"
