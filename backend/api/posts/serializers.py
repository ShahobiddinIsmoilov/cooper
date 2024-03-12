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
                  'body',
                  'votes',
                  'comments',
                  'user',
                  'community',
                  'created_at',
                  'username']
    

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
        fields = ['user', 'title', 'body', 'community', 'username']


class UpdatePostSerializer(serializers.ModelSerializer):
    """
    Update post serializer
    """
    class Meta:
        model = Post
        fields = '__all__'