from rest_framework import serializers

from .models import Post


class ListPostSerializer(serializers.ModelSerializer):
    """
    List post serializer
    """
    class Meta:
        model = Post
        fields = '__all__'
    

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
    body = serializers.CharField(required=False)
    
    class Meta:
        model = Post
        fields = ['community',
                  'username',
                  'community_name',
                  'community_link',
                  'title',
                  'type',
                  'body',
                  'image',
                  'link']


class UpdatePostSerializer(serializers.ModelSerializer):
    """
    Update post serializer
    """
    class Meta:
        model = Post
        fields = ['body']