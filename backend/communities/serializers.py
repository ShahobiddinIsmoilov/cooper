from rest_framework import serializers

from .models import Community


class ListCommunitySerializer(serializers.ModelSerializer):
    """
    Community List Serializer
    """
    url = serializers.HyperlinkedIdentityField(
        view_name='community-detail',
        lookup_field='name'
    )

    class Meta:
        model = Community
        fields = ['name', 'members', 'url']


class DetailCommunitySerializer(serializers.ModelSerializer):
    """
    Community Detail Serializer
    """
    number_of_posts = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = '__all__'

    def get_number_of_posts(self, obj):
        return self.context['number_of_posts']


class CreateCommunitySerializer(serializers.ModelSerializer):
    """
    Community Create Serializer
    """
    class Meta:
        model = Community
        fields = ['name', 'description']