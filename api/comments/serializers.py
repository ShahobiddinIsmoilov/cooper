from rest_framework import serializers

from .models import Comment


class ListCommentSerializer(serializers.ModelSerializer):
    """
    List comments serializer
    """
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
                  'post_permalink',
                  'post_title',
                  'community',
                  'community_name',
                  'community_link',
                  'username',
                  'parent',
                  'parent_user',
                  'parent_username',
                  'body']


class UpdateCommentSerializer(serializers.ModelSerializer):
    """
    Update comment serializer
    """
    class Meta:
        model = Comment
        fields = ['body']