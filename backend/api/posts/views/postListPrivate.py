from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import SavePost, UpvotePost, DownvotePost
from ..serializers import ListPostSerializer


@api_view(['GET'])
def postListPrivate(request):
    filter = request.GET.get('filter', '')

    if filter == 'saved':
        user = request.GET.get('user', '')
        posts_raw = getSavedPosts(user)
    elif filter == 'upvoted':
        user = request.GET.get('user', '')
        posts_raw = getUpvotedPosts(user)
    elif filter == 'downvoted':
        user = request.GET.get('user', '')
        posts_raw = getDownvotedPosts(user)
        
    sort_by = request.GET.get('sort', '')
    
    if sort_by == 'top':
        posts = sorted(posts_raw, key=lambda x: (x.votes, x.created_at), reverse=True)
    elif sort_by == 'best':
        posts = sorted(posts_raw, key=lambda x: (x.ratio, x.created_at), reverse=True)
    else:
        posts = sorted(posts_raw, key=lambda x: x.created_at, reverse=True)
        
    serializer = ListPostSerializer(posts, many=True)
    
    return Response(serializer.data)

def getSavedPosts(user):
    relationships = SavePost.objects.filter(user=user)
    posts = [item.post for item in relationships]
    return posts

def getUpvotedPosts(user):
    relationships = UpvotePost.objects.filter(user=user)
    posts = list(set([item.post for item in relationships]))
    return posts

def getDownvotedPosts(user):
    relationships = DownvotePost.objects.filter(user=user)
    posts = list(set([item.post for item in relationships]))
    return posts
