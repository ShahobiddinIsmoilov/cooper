from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Comment
from ..serializers import ListCommentSerializer


@api_view(['GET'])
def commentList(request):
    filter = request.GET.get('filter', '')
    
    if filter == 'post':
        post = request.GET.get('post', '')
        comments_raw = Comment.objects.filter(post=post)
    else:
        username = request.GET.get('username', '')
        comments_raw = Comment.objects.filter(username=username)
    
    sort_by = request.GET.get('sort', '')

    if sort_by == 'top':
        comments = comments_raw.order_by('-votes', '-created_at')
    elif sort_by == 'best':
        comments = comments_raw.order_by('-votes', '-created_at')
    else:
        comments = comments_raw.order_by('-created_at')

    serializer = ListCommentSerializer(comments, many=True)
        
    return Response(serializer.data)
