from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import Post
from api.communities.models import Community
from api.communities.serializers import DetailCommunitySerializer
from .serializers import (CreatePostSerializer,
                          ListPostSerializer,
                          DetailPostSerializer,
                          UpdatePostSerializer)


# Get posts of a community
@api_view(['GET'])
def postListCommunity(request, community):
    posts_raw = Post.objects.filter(community=community)
    
    sort_by = request.GET.get('sort', '')
    
    if sort_by == '':
        posts = posts_raw.order_by('-created_at')
    elif sort_by == 'hot':
        posts = posts_raw.order_by('-score', '-created_at')
    elif sort_by == 'top':
        posts = posts_raw.order_by('-votes', '-created_at')
    elif sort_by == 'new':
        posts = posts_raw.order_by('-created_at')
    
    serializer = ListPostSerializer(posts, many=True)
    
    return Response(serializer.data)


# Get posts of a user
@api_view(['GET'])
def postListUser(request, username):
    posts_raw = Post.objects.filter(username=username)
    
    sort_by = request.GET.get('sort', '')
    
    if sort_by == '':
        posts = posts_raw.order_by('-created_at')
    elif sort_by == 'hot':
        posts = posts_raw.order_by('-score', '-created_at')
    elif sort_by == 'top':
        posts = posts_raw.order_by('-votes', '-created_at')
    elif sort_by == 'new':
        posts = posts_raw.order_by('-created_at')
        
    serializer = ListPostSerializer(posts, many=True)

    return Response(serializer.data)


# Get all posts -- for testing
@api_view(['GET'])
def postListAll(request):
    posts_raw = Post.objects.all()
    
    sort_by = request.GET.get('sort', '')
    
    if sort_by == '':
        posts = posts_raw.order_by('-created_at')
    elif sort_by == 'hot':
        posts = posts_raw.order_by('-score', '-created_at')
    elif sort_by == 'top':
        posts = posts_raw.order_by('-votes', '-created_at')
    elif sort_by == 'new':
        posts = posts_raw.order_by('-created_at')
    
    serializer = ListPostSerializer(posts, many=True)
    
    return Response(serializer.data)


# Get details of a post
@api_view(['GET'])
def postDetail(request, pk):
    post = Post.objects.get(pk=pk)
    post_serializer = DetailPostSerializer(post, many=False)

    community = Community.objects.get(pk=post_serializer.data['community'])
    community_serializer = DetailCommunitySerializer(community, many=False)
    
    data = {'post_detail': {**post_serializer.data},
            'community_detail': {**community_serializer.data}}
    
    return Response(data)


# Post actions
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def postAction(request, pk):
    post = Post.objects.get(pk=pk)
    
    action = request.GET.get('action', '')
    
    if action == 'upvote':
        post.upvotes += 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'downvote':
        post.downvotes += 1
        post.save()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)


# Create new post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postCreate(request):
    serializer = CreatePostSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        post = serializer.save()
        return Response(post.id, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Update post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postUpdate(request, pk):
    post = Post.objects.get(pk=pk)
    serializer = UpdatePostSerializer(instance=post, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


# Delete post
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def postDelete(request, pk):
    post = Post.objects.get(pk=pk)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


# API root
@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'list by community': reverse('post-list-community', request=request, format=None),
        'list by user': reverse('post-list-user', request=request, format=None),
        'list all': reverse('post-list-all', request=request, format=None),
    })