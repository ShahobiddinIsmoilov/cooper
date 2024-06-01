import dateutil.parser as dp
from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.apps import apps

from api.convert import encode_post_id

User = get_user_model()


class Post(models.Model):
    POST_TYPES = [
        ("text", "Text"),
        ("image", "Image"),
        ("link", "Link"),
    ]

    user = models.ForeignKey(User, default=None, null=True, on_delete=models.SET_NULL)
    community = models.ForeignKey(
        "communities.Community", default=None, null=True, on_delete=models.CASCADE
    )
    type = models.CharField(max_length=5, default="text", null=True, choices=POST_TYPES)
    title = models.CharField(max_length=200, default=None, null=True)
    body_text = models.TextField(max_length=10000, default=None, null=True, blank=True)
    body = models.TextField(max_length=10000, default=None, null=True)
    image = models.ImageField(upload_to="media/post/", default=None, null=True)
    link = models.URLField(max_length=10000, default=None, null=True)
    edited = models.BooleanField(default=False, null=True)
    deleted = models.BooleanField(default=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(null=True, blank=True)
    visits = models.IntegerField(default=0, null=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    comments = models.IntegerField(default=0, null=True)

    @property
    def permalink(self):
        return encode_post_id(self.id)

    @property
    def votes(self):
        return self.upvotes - self.downvotes

    @property
    def ratio(self):
        upvotes, downvotes = self.upvotes, self.downvotes
        if not upvotes:
            upvotes = 1
        if not downvotes:
            downvotes = 1
        return upvotes / downvotes

    @property
    def score(self):
        created_at_in_seconds = dp.parse(str(self.created_at)).timestamp()
        now_in_seconds = dp.parse(str(datetime.now())).timestamp()
        elapsed_time_in_seconds = round(now_in_seconds - created_at_in_seconds) + 1
        visit_score = self.visits * 1000
        comment_score = self.comments * 20000
        vote_score = (self.upvotes + self.downvotes) * 10000
        score_before_time = visit_score + comment_score + vote_score
        final_score = score_before_time / elapsed_time_in_seconds
        return final_score

    class Meta:
        indexes = [models.Index(fields=["created_at"])]

    def __str__(self):
        return self.title


@receiver(post_save, sender=Post)
def increment_posts(sender, instance, created, **kwargs):
    if created:
        Community = apps.get_model("communities", "Community")
        community = Community.objects.get(id=instance.community_id)
        community.posts += 1
        community.save()


@receiver(post_delete, sender=Post)
def decrement_posts(sender, instance, **kwargs):
    Community = apps.get_model("communities", "Community")
    community = Community.objects.get(id=instance.community_id)
    if community.posts > 0:
        community.posts -= 1
    community.save()


class UpvotePost(models.Model):
    user = models.ForeignKey("users.User", default=1, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=1, on_delete=models.CASCADE)

    @property
    def post_id(self):
        return self.post.id

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return "Post upvote object"


class DownvotePost(models.Model):
    user = models.ForeignKey("users.User", default=1, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=1, on_delete=models.CASCADE)

    @property
    def post_id(self):
        return self.post.id

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return "Post downvote object"


class SavePost(models.Model):
    user = models.ForeignKey("users.User", default=1, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=1, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "post")

    @property
    def post_id(self):
        return self.post.id

    def __str__(self):
        return "Post save object"
