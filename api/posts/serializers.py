from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Post serializer
    """

    username = serializers.CharField(source="user.username", read_only=True)
    user_avatar = serializers.ImageField(source="user.avatar", read_only=True)
    community_name = serializers.CharField(source="community.name", read_only=True)
    community_link = serializers.CharField(source="community.link", read_only=True)
    community_avatar = serializers.ImageField(source="community.avatar", read_only=True)
    permalink = serializers.CharField(read_only=True)
    votes = serializers.IntegerField(read_only=True)
    ratio = serializers.FloatField(read_only=True)
    score = serializers.FloatField(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"


class CreatePostSerializer(serializers.ModelSerializer):
    """
    Create post serializer
    """

    body = serializers.CharField(required=False)

    class Meta:
        model = Post
        fields = ["community", "title", "type", "body", "body_text", "image", "link"]


class UpdatePostSerializer(serializers.ModelSerializer):
    """
    Update post serializer
    """

    class Meta:
        model = Post
        fields = ["body", "body_text", "edited"]
