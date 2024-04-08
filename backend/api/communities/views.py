from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.reverse import reverse

from api.users.models import User
from .models import Community, UserCommunity
from .serializers import (ListCommunitySerializer,
                          DetailCommunitySerializer,
                          CreateCommunitySerializer)


@api_view(['GET'])
def communityListJoined(request):
    """
    Function to get and return the list of a user's joined communities
    """
    relationships = UserCommunity.objects.filter(user=request.GET.get('user', ''))
    communities = [item.community for item in relationships]
    serializer = ListCommunitySerializer(communities, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def communityListDiscover(request):
    """
    Function to get and return the list of communities a user hasn't joined
    """
    relationships = UserCommunity.objects.filter(user=request.GET.get('user', ''))
    joined = [item.community for item in relationships]
    all = Community.objects.all()
    communities = list(set(all) - set(joined))
    serializer = ListCommunitySerializer(communities, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def communityListAll(request):
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
    serializer = DetailCommunitySerializer(community, many=False)
    
    exists = False
    authenticated = request.GET.get('auth', '')
    if authenticated == 'true':
        user = request.GET.get('user', '')
        exists = UserCommunity.objects.filter(user=user, community=community).exists()
            
    response = {'is_joined': exists, **serializer.data}
    
    return Response(response)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def communityAction(request, pk):
    """
    Handles user join and leave actions
    """
    action = request.GET.get('action', '')
    user = request.user
    community = Community.objects.get(pk=pk)
    
    if action == 'join':
        new_instance = UserCommunity.objects.create(user=user, community=community)
        new_instance.save()
    elif action == 'leave':
        existing_instance = UserCommunity.objects.get(user=user, community=community)
        existing_instance.delete()
    
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def communityCreate(request):
    """
    Creates a new community with the given details
    """
    serializer = CreateCommunitySerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        community = serializer.save(owner=request.user)
        return Response(community.link, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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