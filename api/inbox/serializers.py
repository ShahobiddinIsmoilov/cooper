from rest_framework import serializers

from .models import Notification


class ListNotificationSerializer(serializers.ModelSerializer):
    """
    List comments serializer
    """
    class Meta:
        model = Notification
        fields = '__all__'