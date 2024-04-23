from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.apps import apps

User = get_user_model()


class Comment(models.Model):
    user = models.ForeignKey(User, default=None, null=True, on_delete=models.CASCADE)
    post = models.ForeignKey('posts.Post', default=None, null=True, on_delete=models.CASCADE)
    community = models.ForeignKey('communities.Community', default=None, null=True,
                                                           on_delete=models.CASCADE)
    username = models.CharField(max_length=32, default=None, null=True)
    post_title = models.CharField(max_length=200, default=None, null=True)
    community_name = models.CharField(max_length=32, default=None, null=True)
    community_link = models.CharField(max_length=32, default=None, null=True)
    parent = models.IntegerField(default=0, null=True)
    parent_user = models.IntegerField(default=0, null=True)
    parent_username = models.TextField(max_length=32, default=None, null=True)
    body = models.TextField(max_length=10000, default=None, null=True)
    upvotes = models.IntegerField(default=0, null=True)
    downvotes = models.IntegerField(default=0, null=True)
    votes = models.IntegerField(default=0, null=True)
    ratio = models.FloatField(default=0, null=True)
    ratio = models.FloatField(default=0, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['votes']),
            models.Index(fields=['ratio']),
            models.Index(fields=['created_at'])
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
        Post = apps.get_model('posts', 'Post')
        post = Post.objects.get(id=instance.post_id)
        post.comments += 1
        post.save()
        
        Community = apps.get_model('communities', 'Community')
        community = Community.objects.get(id=instance.community_id)
        community.comments += 1
        community.save()
        
        Notification = apps.get_model('inbox', 'Notification')
        parent_user = User.objects.get(pk=instance.parent_user)
        Notification.objects.create(
            parent_user=parent_user,
            parent_comment=instance.parent,
            comment=instance,
            user=instance.user_id,
            username=instance.username,
            parent_post=instance.post_id,
            community=instance.community_id,
            type='reply'
        ).save()

        
@receiver(post_delete, sender=Comment)
def decrement_comments(sender, instance, **kwargs):
    Post = apps.get_model('posts', 'Post')
    post = Post.objects.get(id=instance.post_id)
    if post.comments > 0:
        post.comments -= 1
    post.save()
    
    Community = apps.get_model('communities', 'Community')
    community = Community.objects.get(id=instance.community_id)
    if community.comments > 0:
        community.comments -= 1
    community.save()
    
    Notification = apps.get_model('inbox', 'Notification')
    notification = Notification.objects.filter(comment=instance.pk)
    if notification.exists():
        notification.delete()
    
    
class UpvoteComment(models.Model):
    user = models.ForeignKey('users.User', default=1, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, default=1, on_delete=models.CASCADE)
    
    # class Meta:
    #     unique_together = ('user', 'post')
        
    def __str__(self):
        return str(self.user) + ' - ' + str(self.comment)
    
    
class DownvoteComment(models.Model):
    user = models.ForeignKey('users.User', default=1, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, default=1, on_delete=models.CASCADE)
    
    # class Meta:
    #     unique_together = ('user', 'post')
        
    def __str__(self):
        return str(self.user) + ' - ' + str(self.comment)