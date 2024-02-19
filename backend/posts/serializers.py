from rest_framework import serializers

from .models import Post


class ListPostSerializer(serializers.ModelSerializer):
    """
    List post serializer
    """
    url = serializers.HyperlinkedIdentityField(
        view_name="detail",
        lookup_field='pk'
    )

    class Meta:
        model = Post
        fields = ['title',
                  'upvotes',
                  'downvotes',
                  'comments',
                  'user',
                  'url']


class DetailPostSerializer(serializers.ModelSerializer):
    """
    Detailed post serializer
    """
    class Meta:
        model = Post
        fields = ['title',
                  'content',
                  'upvotes',
                  'downvotes',
                  'comments',
                  'user',
                  'created_at']


class CreatePostSerializer(serializers.ModelSerializer):
    """
    Create post serializer
    """
    class Meta:
        model = Post
        fields = ['title', 'content']


class UpdatePostSerializer(serializers.ModelSerializer):
    """
    Update post serializer
    """
    class Meta:
        model = Post
        fields = ['title', 'content']