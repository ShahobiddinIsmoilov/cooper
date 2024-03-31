from rest_framework import serializers

from .models import Community


class ListCommunitySerializer(serializers.ModelSerializer):
    """
    Community List Serializer
    """
    class Meta:
        model = Community
        fields = ['name',
                  'link',
                  'description',
                  'members',
                  'avatar_url']


class DetailCommunitySerializer(serializers.ModelSerializer):
    """
    Community Detail Serializer
    """
    class Meta:
        model = Community
        fields = '__all__'


class CreateCommunitySerializer(serializers.ModelSerializer):
    """
    Community Create Serializer
    """
    class Meta:
        model = Community
        fields = ['owner',
                  'owner_username',
                  'name',
                  'link',
                  'description',
                  'avatar_url',
                  'banner_url']
        

class UpdateCommunitySerializer(serializers.ModelSerializer):
    """
    Community Update Serializer
    """
    class Meta:
        model = Community
        fields = ['description',
                  'rules',
                  'avatar_url',
                  'banner_url']