from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Post, SavePost, UpvotePost, DownvotePost
from ..serializers import ListPostSerializer
from api.communities.models import Community, UserCommunity


@api_view(['GET'])
def postList(request):
    filter = request.GET.get('filter', 'home')
    is_list = False

    if filter == 'home':
        user = request.GET.get('user', '')
        posts_raw = getHomePosts(user)
    elif filter == 'explore':
        user = request.GET.get('user', '')
        posts_raw = getExplorePosts(user)
    elif filter == 'all':
        posts_raw = Post.objects.all()
    elif filter == 'community':
        community = request.GET.get('community', '')
        posts_raw = Post.objects.filter(community=community)
    elif filter == 'user':
        username = request.GET.get('username', '')
        posts_raw = Post.objects.filter(username=username)
    elif filter == 'saved':
        user = request.GET.get('user', '')
        posts_raw = getSavedPosts(user)
        is_list = True
    elif filter == 'upvoted':
        user = request.GET.get('user', '')
        posts_raw = getUpvotedPosts(user)
        is_list = True
    elif filter == 'downvoted':
        user = request.GET.get('user', '')
        posts_raw = getDownvotedPosts(user)
        is_list = True
        
    sort_by = request.GET.get('sort', '')
    
    if sort_by == 'hot':
        posts = posts_raw.order_by('-score', '-created_at')
    elif sort_by == 'top':
        if is_list:
            posts = sorted(posts_raw, key=lambda x: (x.votes, x.created_at), reverse=True)
        else:
            posts = posts_raw.order_by('-votes', '-created_at')
    elif sort_by == 'best':
        if is_list:
            posts = sorted(posts_raw, key=lambda x: (x.ratio, x.created_at), reverse=True)
        else:
            posts = posts_raw.order_by('-ratio', '-created_at')
    else:
        if is_list:
            posts = sorted(posts_raw, key=lambda x: x.created_at, reverse=True)
        else:
            posts = posts_raw.order_by('-created_at')
    
    serializer = ListPostSerializer(posts, many=True)
    
    return Response(serializer.data)

def getHomePosts(user):
    relationships = UserCommunity.objects.filter(user=user)
    communities = [item.community for item in relationships]
    return Post.objects.filter(community__in=list(communities))

def getExplorePosts(user):
    relationships = UserCommunity.objects.filter(user=user)
    joined_communities = [item.community for item in relationships]
    all_communities = Community.objects.all()
    communities = list(set(all_communities) - set(joined_communities))
    return Post.objects.filter(community__in=list(communities))

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
