from rest_framework import serializers

from .models import Comment


class ListCommentSerializer(serializers.ModelSerializer):
    """
    List comments serializer
    """
    permalink = serializers.CharField(read_only=True)
    post_title = serializers.CharField(source='post.title', read_only=True)
    post_permalink = serializers.CharField(read_only=True)
    community_name = serializers.CharField(source='community.name', read_only=True)
    community_link = serializers.CharField(source='community.link', read_only=True)
    community_avatar = serializers.ImageField(source='community.avatar', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    avatar = serializers.ImageField(source='user.avatar', read_only=True)
    parent = serializers.IntegerField(source='parent_comment_id', read_only=True)
    parent_username = serializers.CharField(source='parent.user.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
        
class CreateCommentSerializer(serializers.ModelSerializer):
    """
    Create comment serializer
    """
    class Meta:
        model = Comment
        fields = ['post',
                  'community',
                  'parent',
                  'body']


class UpdateCommentSerializer(serializers.ModelSerializer):
    """
    Update comment serializer
    """
    class Meta:
        model = Comment
        fields = ['body']