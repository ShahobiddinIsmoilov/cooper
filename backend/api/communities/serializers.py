from rest_framework import serializers

from .models import Community


class ListCommunitySerializer(serializers.ModelSerializer):
    """
    Community List Serializer
    """
    class Meta:
        model = Community
        fields = ['name',
                  'title',
                  'description',
                  'members']

class DetailCommunitySerializer(serializers.ModelSerializer):
    """
    Community Detail Serializer
    """
    number_of_posts = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = ['owner',
                  'name',
                  'title',
                  'bio',
                  'description',
                  'created_at',
                  'upvotes',
                  'downvotes',
                  'rules',
                  'members',
                  'number_of_posts']

    def get_number_of_posts(self, obj):
        return self.context['number_of_posts']


class CreateCommunitySerializer(serializers.ModelSerializer):
    """
    Community Create Serializer
    """
    class Meta:
        model = Community
        fields = ['name', 'description']