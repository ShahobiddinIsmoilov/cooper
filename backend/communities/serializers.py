from rest_framework import serializers
from .models import Community


class ListCommunitySerializer(serializers.ModelSerializer):
    """
    Community List Serializer
    """
    class Meta:
        model = Community
        fields = '__all__'


class CreateCommunitySerializer(serializers.ModelSerializer):
    """
    Create a Community Serializer
    """
    class Meta:
        model = Community
        fields = ['name', 'description']