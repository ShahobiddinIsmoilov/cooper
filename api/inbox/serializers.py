from rest_framework import serializers

from .models import Notification


class ListNotificationSerializer(serializers.ModelSerializer):
    """
    List comments serializer
    """

    sender = serializers.CharField(source="sender.username", read_only=True)
    sender_avatar = serializers.ImageField(source="sender.avatar", read_only=True)
    sender_deleted = serializers.BooleanField(read_only=True)
    community_name = serializers.CharField(source="community.name", read_only=True)
    community_link = serializers.CharField(source="community.link", read_only=True)
    comment = serializers.CharField(source="comment.body", read_only=True)
    comment_deleted = serializers.BooleanField(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"
