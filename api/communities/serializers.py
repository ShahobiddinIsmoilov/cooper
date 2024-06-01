from rest_framework import serializers

from .models import Community


class ListCommunitySerializer(serializers.ModelSerializer):
    """
    Community List Serializer
    """

    class Meta:
        model = Community
        fields = ["id", "name", "link", "members", "avatar"]


class DetailCommunitySerializer(serializers.ModelSerializer):
    """
    Community Detail Serializer
    """

    class Meta:
        model = Community
        fields = "__all__"


class CreateCommunitySerializer(serializers.ModelSerializer):
    """
    Community Create Serializer
    """

    class Meta:
        model = Community
        fields = ["name", "link", "description"]


class UpdateCommunitySerializer(serializers.ModelSerializer):
    """
    Community Update Serializer
    """

    class Meta:
        model = Community
        fields = ["name", "description", "avatar", "banner"]
