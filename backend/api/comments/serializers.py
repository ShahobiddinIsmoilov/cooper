from rest_framework import serializers

from .models import Comment


class ListCommentSerializer(serializers.ModelSerializer):
    """
    Serializer to get comments assocciated with a post
    """
    class Meta:
        model = Comment
        fields = '__all__'
        # fields = ['id',
        #           'user',
        #           'username',
        #           'community',
        #           'post',
        #           'body',
        #           'parent',
        #           'votes',
        #           'upvotes',
        #           'downvotes',
        #           'created_at']
        
class CreateCommentSerializer(serializers.ModelSerializer):
    """
    Create post serializer
    """
    class Meta:
        model = Comment
        fields = ['username', 'post', 'parent', 'body', 'community']


class UpdateCommentSerializer(serializers.ModelSerializer):
    """
    Update post serializer
    """
    class Meta:
        model = Comment
        fields = '__all__'