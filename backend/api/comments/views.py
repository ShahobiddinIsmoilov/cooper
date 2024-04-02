from itertools import chain
from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import Comment
from api.posts.models import Post
from api.posts.serializers import ListPostSerializer
from .serializers import (ListCommentSerializer,
                          CreateCommentSerializer,
                          UpdateCommentSerializer)

# Get comments of a post
@api_view(['GET'])
def commentListPost(request, post):
    comments_raw = Comment.objects.filter(post=post)

    sort_by = request.GET.get('sort', '')

    if sort_by == '':
        comments = comments_raw.order_by('-created_at')
    elif sort_by == 'top':
        comments = comments_raw.order_by('-votes', '-created_at')
    elif sort_by == 'new':
        comments = comments_raw.order_by('-created_at')

    serializer = ListCommentSerializer(comments, many=True)
        
    return Response(serializer.data)

# Get comments of a user
@api_view(['GET'])
def commentListUser(request, username):
    comments_raw = Comment.objects.filter(username=username)

    sort_by = request.GET.get('sort', '')

    if sort_by == '':
        comments = comments_raw.order_by('-created_at')
    elif sort_by == 'top':
        comments = comments_raw.order_by('-votes', '-created_at')
    elif sort_by == 'new':
        comments = comments_raw.order_by('-created_at')

    serializer = ListCommentSerializer(comments, many=True)
        
    return Response(serializer.data)

# Get activity of a user
@api_view(['GET'])
def activityListUser(request, username):
    comments = Comment.objects.filter(username=username)
    posts = Post.objects.filter(username=username)
    
    activity_raw = list(chain(comments, posts))

    sort_by = request.GET.get('sort', '')
    
    if sort_by == '':
        activity = sorted(activity_raw, key=lambda x: x.created_at, reverse=True)
    elif sort_by == 'top':
        activity = sorted(activity_raw, key=lambda x: x.votes, reverse=True)
    elif sort_by == 'new':
        activity = sorted(activity_raw, key=lambda x: x.created_at, reverse=True)
    
    activity_serializer = []
    for item in activity:
        if hasattr(item, 'title'):
            serializer = ListPostSerializer(item, many=False)
        else:
            serializer = ListCommentSerializer(item, many=False)
        activity_serializer.append(serializer.data)

    return Response(activity_serializer)

# Get all comments -- for testing
@api_view(['GET'])
def commentListAll(request):
    comments_raw = Comment.objects.all()

    sort_by = request.GET.get('sort', '')

    if sort_by == '':
        comments = comments_raw.order_by('-created_at')
    elif sort_by == 'top':
        comments = comments_raw.order_by('-votes', '-created_at')
    elif sort_by == 'new':
        comments = comments_raw.order_by('-created_at')

    serializer = ListCommentSerializer(comments, many=True)

    return Response(serializer.data)

# Create comment
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def commentCreate(request):
    serializer = CreateCommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
    return Response(serializer.data)

# Update comment
@api_view(['POST'])
def commentUpdate(request, pk):
    comment = Comment.objects.get(pk=pk)
    serializer = UpdateCommentSerializer(instance=comment, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data)

# Delete comment
@api_view(['DELETE'])
def commentDelete(request, pk):
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# API root
@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'list by post': reverse('comment-list-post', request=request, format=None),
        'list by user': reverse('comment-list-user', request=request, format=None),
        'list all': reverse('comment-list-all', request=request, format=None),
    })