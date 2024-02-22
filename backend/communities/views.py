from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

from posts.models import Post
from posts.serializers import DetailPostSerializer
from .models import Community
from .serializers import (ListCommunitySerializer,
                          DetailCommunitySerializer,
                          CreateCommunitySerializer)


@api_view(['GET', 'DELETE'])
def communityList(request):
    """
    Function to get and return the list of all communities
    """
    communities = Community.objects.all()
    serializer_context = {'request': request}
    serializer = ListCommunitySerializer(communities,
                                         context=serializer_context,
                                         many=True)
    
    return Response(serializer.data)


# -------------------------------------------------------------------
@api_view(['GET', 'POST', 'DELETE'])
def communityDetail(request, name: str):
    """
    Retrieves the details of a community with the name parameter
    provided in the request and returns it
    """
    community = Community.objects.get(name=name)
    posts = Post.objects.filter(community=community.id)
    post_serializer = DetailPostSerializer(posts, many=True)

    if request.method == 'GET':
        context = {"number_of_posts": len(posts)}
        community_serializer = DetailCommunitySerializer(community,
                                                         context=context,
                                                         many=False)
        return Response(community_serializer.data)
    elif request.method == 'POST':
        community_serializer = DetailCommunitySerializer(instance=community,
                                                         data=request.data)
        if community_serializer.is_valid(raise_exception=True):
            community_serializer.save()
        return Response(community_serializer.data)
    elif request.method == 'DELETE':
        community.delete()
        return redirect(communityList)
# -------------------------------------------------------------------


@api_view(['POST'])
def communityCreate(request):
    """
    Creates a new community with the given details
    """
    serializer = CreateCommunitySerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
    
    return Response(serializer.data)


@api_view(['POST'])
def communityUpdate(request, name):
    """
    Updates the community with specified changes
    """
    community = Community.objects.get(name=name)
    serializer = DetailCommunitySerializer(instance=community, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
    
    return Response(serializer.data)


@api_view(['DELETE'])
def communityDelete(request, name):
    """
    Deletes the community with the given name
    """
    community = Community.objects.get(name=name)
    community.delete()
    

@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'communities': reverse('community-list', request=request, format=None),
        'create': reverse('community-create', request=request, format=None),
    })