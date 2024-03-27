from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from api.users.serializers import UserDetailSerializer

from .models import Post, User
from .serializers import (CreatePostSerializer,
                          ListPostSerializer,
                          DetailPostSerializer,
                          UpdatePostSerializer)

@api_view(['GET', 'DELETE'])
def postListAll(request):
    """
    Gets the list of all the posts and returns it
    """
    posts = Post.objects.order_by('-created_at')
    serializer = ListPostSerializer(posts, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def postList(request, name):
    """
    Gets the list of all the posts associated with the community
    name and returns it
    """
    posts = Post.objects.filter(community=name).order_by('-created_at')
    serializer = ListPostSerializer(posts, many=True)

    return Response(serializer.data)


# -------------------------------------------------------------------
@api_view(['GET', 'POST', 'DELETE'])
def postDetail(request, pk):
    """
    Retrieves the details of a particular post
    """
    post = Post.objects.get(pk=pk)

    if request.method == 'GET':
        post_serializer = DetailPostSerializer(post, many=False)
        return Response(post_serializer.data)
    elif request.method == 'POST':
        post_serializer = DetailPostSerializer(instance=post, data=request.data)
        if post_serializer.is_valid(raise_exception=True):
            post_serializer.save()
        return Response(post_serializer.data)
    elif request.method == 'DELETE':
        post.delete()
        return redirect(postList)
# -------------------------------------------------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postCreate(request):
    """
    Creates a new post
    """
    serializer = CreatePostSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        post = serializer.save()
        return Response(post.id, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def postUpdate(request, pk):
    """
    Updates the post
    """
    post = Post.objects.get(pk=pk)
    serializer = UpdatePostSerializer(instance=post, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def postDelete(request, pk):
    """
    Deletes the post
    """
    post = Post.objects.get(pk=pk)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'posts': reverse('post-list-all', request=request, format=None),
        'create': reverse('post-create', request=request, format=None),
    })