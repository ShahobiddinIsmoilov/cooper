from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.apps import apps

User = get_user_model()


class Post(models.Model):
    POST_TYPES = [
        ('text', 'Text'),
        ('image', 'Image'),
        ('link', 'Link'),
    ]
    
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.CASCADE)
    community = models.ForeignKey('communities.Community', default=1, null=True,
                                  on_delete=models.CASCADE)
    username = models.CharField(max_length=32, default=None, null=True)
    community_name = models.CharField(max_length=32, default=None, null=True)
    community_link = models.CharField(max_length=32, default=None, null=True)
    title = models.CharField(max_length=200, default=None, null=True)
    type = models.CharField(max_length=5, default='text', null=True, choices=POST_TYPES)
    body = models.TextField(max_length=10000, default=None, null=True)
    image = models.ImageField(upload_to='post/', default='post/gordon.png', null=True)
    link = models.URLField(max_length=10000, default="", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    visits = models.IntegerField(default=0, null=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    comments = models.IntegerField(default=0, null=True)
    votes = models.IntegerField(default=0, null=True)
    ratio = models.FloatField(default=1.0, null=True)
    score = models.FloatField(default=1.0, null=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['community']),
            models.Index(fields=['created_at'])
        ]
        
    def save(self, *args, **kwargs):
        self.votes = self.calculateVotes(self.upvotes, self.downvotes)
        self.ratio = self.calculateRatio(self.upvotes, self.downvotes)
        self.score = self.calculateScore(self.upvotes,
                                         self.downvotes,
                                         self.comments,
                                         self.visits,
                                         self.created_at)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title
    
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
    
    @staticmethod
    def calculateScore(upvotes, downvotes, comments, visits, created_at):
        timeframe = (1) / 60
        return ((upvotes + downvotes) * 10 + comments * 20 + visits) / timeframe


@receiver(post_save, sender=Post)
def increment_posts(sender, instance, created, **kwargs):
    if created:
        Community = apps.get_model('communities', 'Community')
        community = Community.objects.get(id=instance.community_id)
        community.posts += 1
        community.save()

        
@receiver(post_delete, sender=Post)
def decrement_posts(sender, instance, **kwargs):
    Community = apps.get_model('communities', 'Community')
    community = Community.objects.get(id=instance.community_id)
    if community.posts > 0:
        community.posts -= 1
    community.save()
    

class UpvotePost(models.Model):
    user = models.ForeignKey('users.User', default=1, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=1, on_delete=models.CASCADE)
    
    # class Meta:
    #     unique_together = ('user', 'post')
        
    def __str__(self):
        return str(self.user) + ' - ' + str(self.post)
    
    
class DownvotePost(models.Model):
    user = models.ForeignKey('users.User', default=1, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=1, on_delete=models.CASCADE)
    
    # class Meta:
    #     unique_together = ('user', 'post')
        
    def __str__(self):
        return str(self.user) + ' - ' + str(self.post)
    
    
class SavePost(models.Model):
    user = models.ForeignKey('users.User', default=1, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=1, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'post')
        
    def __str__(self):
        return str(self.user) + ' - ' + str(self.post)