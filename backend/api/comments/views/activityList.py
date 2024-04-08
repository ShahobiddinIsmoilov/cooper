from itertools import chain
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Comment
from api.posts.models import Post
from api.posts.serializers import ListPostSerializer
from ..serializers import ListCommentSerializer


@api_view(['GET'])
def activityList(request, username):
    comments = Comment.objects.filter(username=username)
    posts = Post.objects.filter(username=username)
    
    activity_raw = list(chain(comments, posts))

    sort_by = request.GET.get('sort', '')
    
    if sort_by == 'top':
        activity = sorted(activity_raw, key=lambda x: (x.votes, x.created_at), reverse=True)
    elif sort_by == 'best':
        activity = sorted(activity_raw, key=lambda x: (x.votes, x.created_at), reverse=True)
    else:
        activity = sorted(activity_raw, key=lambda x: x.created_at, reverse=True)
    
    activity_serializer = []
    for item in activity:
        if hasattr(item, 'title'):
            serializer = ListPostSerializer(item, many=False)
        else:
            serializer = ListCommentSerializer(item, many=False)
        activity_serializer.append(serializer.data)

    return Response(activity_serializer)
