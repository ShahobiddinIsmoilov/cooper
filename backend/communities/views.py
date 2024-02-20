from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

from .models import Community
from .serializers import (ListCommunitySerializer,
                          CreateCommunitySerializer)


class ListCommunityView(generics.ListAPIView):
    """
    List of communities
    """
    queryset = Community.objects.all()
    serializer_class = ListCommunitySerializer


class CreateCommunityView(generics.CreateAPIView):
    """
    Create a community
    """
    serializer_class = CreateCommunitySerializer


@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'communities': reverse('community-list', request=request, format=None),
        'create': reverse('community-create', request=request, format=None),
    })