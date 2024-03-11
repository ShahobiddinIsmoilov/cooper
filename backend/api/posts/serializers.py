from rest_framework import serializers

from .models import Post


class ListPostSerializer(serializers.ModelSerializer):
    """
    List post serializer
    """
    url = serializers.HyperlinkedIdentityField(
        view_name="post-detail",
        lookup_field='pk'
    )

    class Meta:
        model = Post
        fields = ['title',
                  'votes',
                  'comments',
                  'user',
                  'community',
                  'url']
    

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
        fields = ['user', 'title', 'content', 'community']


class UpdatePostSerializer(serializers.ModelSerializer):
    """
    Update post serializer
    """
    class Meta:
        model = Post
        fields = '__all__'