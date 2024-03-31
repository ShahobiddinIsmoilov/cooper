from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

from api.posts.models import Post
from .models import Community
from .serializers import (ListCommunitySerializer,
                          DetailCommunitySerializer,
                          CreateCommunitySerializer)


@api_view(['GET'])
def communityList(request):
    """
    Function to get and return the list of all communities
    """
    communities = Community.objects.all()
    serializer = ListCommunitySerializer(communities, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def communityDetail(request, link: str):
    """
    Retrieves the details of a community with the name parameter
    provided in the request and returns it
    """
    community = Community.objects.get(link=link)
    community_serializer = DetailCommunitySerializer(community, many=False)
    
    return Response(community_serializer.data)


@api_view(['POST'])
def communityCreate(request):
    """
    Creates a new community with the given details
    """
    serializer = CreateCommunitySerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(owner=request.user)
    
    return Response(serializer.data)


@api_view(['POST'])
def communityUpdate(request, pk):
    """
    Updates the community with specified changes
    """
    community = Community.objects.get(pk=pk)
    serializer = DetailCommunitySerializer(instance=community, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
    
    return Response(serializer.data)


@api_view(['DELETE'])
def communityDelete(request, pk):
    """
    Deletes the community with the given name
    """
    community = Community.objects.get(pk=pk)
    community.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'communities': reverse('community-list', request=request, format=None),
    })