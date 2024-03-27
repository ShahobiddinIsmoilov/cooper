from rest_framework import serializers

from .models import Post


class ListPostSerializer(serializers.ModelSerializer):
    """
    List post serializer
    """
    class Meta:
        model = Post
        fields = ['id',
                  'title',
                  'votes',
                  'comments',
                  'user_id',
                  'body',
                  'username',
                  'community',
                  'created_at']
    

class DetailPostSerializer(serializers.ModelSerializer):
    """
    Detailed post serializer
    """
    class Meta:
        model = Post
        fields = '__all__'


class CreatePostSerializer(serializers.ModelSerializer):
    """
    Create post serializer
    """
    class Meta:
        model = Post
        fields = ['title', 'body', 'community', 'username']


class UpdatePostSerializer(serializers.ModelSerializer):
    """
    Update post serializer
    """
    class Meta:
        model = Post
        fields = '__all__'