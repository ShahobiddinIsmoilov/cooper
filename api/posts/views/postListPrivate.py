from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import SavePost, UpvotePost, DownvotePost
from ..serializers import ListPostSerializer
from api.convert import encode_post_id


@api_view(['GET'])
def postListPrivate(request):
    filter = request.GET.get('filter', '')
    user = request.GET.get('user', '')

    if filter == 'saved':
        posts_raw = getSavedPosts(user)
    elif filter == 'upvoted':
        posts_raw = getUpvotedPosts(user)
    elif filter == 'downvoted':
        posts_raw = getDownvotedPosts(user)
        
    sort_by = request.GET.get('sort', '')
    
    if sort_by == 'top':
        posts = sorted(posts_raw, key=lambda x: (x.votes, x.created_at), reverse=True)
    elif sort_by == 'best':
        posts = sorted(posts_raw, key=lambda x: (x.ratio, x.created_at), reverse=True)
    else:
        posts = sorted(posts_raw, key=lambda x: x.created_at, reverse=True)
        
    data = ListPostSerializer(posts, many=True).data
    
    for i in range(len(data)):
        data[i]['upvoted'] = UpvotePost.objects.filter(post=posts[i], user=user).exists()
        data[i]['downvoted'] = DownvotePost.objects.filter(post=posts[i], user=user).exists()
        data[i]['saved'] = SavePost.objects.filter(post=posts[i], user=user).exists()
        
        post_id = data[i]['id']
        data[i]['permalink'] = encode_post_id(post_id)
    
    return Response(data)

def getUpvotedPosts(user):
    relationships = UpvotePost.objects.filter(user=user)
    posts = list(set([item.post for item in relationships]))
    return posts

def getDownvotedPosts(user):
    relationships = DownvotePost.objects.filter(user=user)
    posts = list(set([item.post for item in relationships]))
    return posts

def getSavedPosts(user):
    relationships = SavePost.objects.filter(user=user)
    posts = [item.post for item in relationships]
    return posts