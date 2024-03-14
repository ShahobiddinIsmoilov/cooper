from django.shortcuts import redirect
from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view

from .models import Comment
from .serializers import (CreateCommentSerializer,
                          ListCommentSerializer,
                          UpdateCommentSerializer)


@api_view(['GET', 'DELETE'])
def commentListAll(request):
    """
    Gets the list of all the posts and returns it
    """
    posts = Comment.objects.order_by('-created_at')
    serializer = ListCommentSerializer(posts, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def commentList(request, post):
    """
    Gets the list of all the posts associated with the community
    name and returns it
    """
    posts = Comment.objects.filter(post=post).order_by('-created_at')
    serializer = ListCommentSerializer(posts, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def commentCreate(request):
    """
    Creates a new post
    """
    serializer = CreateCommentSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def commentUpdate(request, pk):
    """
    Updates the post
    """
    post = Comment.objects.get(pk=pk)
    serializer = UpdateCommentSerializer(instance=post, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


# @api_view(['DELETE'])
# def commentDelete(request, pk):
#     """
#     Deletes the post
#     """
#     post = Post.objects.get(pk=pk)
#     post.delete()

#     return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'all comments': reverse('comment-list-all', request=request, format=None),
        'create new': reverse('comment-create', request=request, format=None),
    })