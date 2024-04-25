from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import User
from api.users.serializers import UserDetailSerializer
from api.communities.models import Community, UserCommunity
from api.communities.serializers import DetailCommunitySerializer
from ..models import Post, SavePost, UpvotePost, DownvotePost
from ..serializers import ListPostSerializer
from api.convert import encode_post_id


@api_view(['GET'])
def postList(request):
    filter = request.GET.get('filter', 'home')
    user = request.GET.get('user')

    if filter == 'home':
        posts_raw = getHomePosts(user)
    elif filter == 'explore':
        posts_raw = getExplorePosts(user)
    elif filter == 'all':
        posts_raw = Post.objects.all()
    elif filter == 'community':
        community = request.GET.get('community', '')
        posts_raw = Post.objects.filter(community=community)
    else:
        username = request.GET.get('username', '')
        posts_user = get_object_or_404(User, username=username)
        posts_raw = Post.objects.filter(user=posts_user)
        
    sort_by = request.GET.get('sort', '')
    
    if sort_by == 'hot':
        posts = posts_raw.order_by('-score', '-created_at')
    elif sort_by == 'top':
        posts = posts_raw.order_by('-votes', '-created_at')
    elif sort_by == 'best':
        posts = posts_raw.order_by('-ratio', '-created_at')
    else:
        posts = posts_raw.order_by('-created_at')
    
    serializer = ListPostSerializer(posts, many=True)
    data = serializer.data
    
    for i in range(len(data)):
        post_user = getattr(posts[i], 'user')
        user_serializer = UserDetailSerializer(post_user, many=False)
        data[i]['user_avatar'] = user_serializer.data['avatar']
        
        post_community = getattr(getattr(posts[i], 'community'), 'avatar')
        community_serializer = DetailCommunitySerializer(post_community, many=False)
        data[i]['community_avatar'] = community_serializer.data['avatar']
        
        if user != 'undefined' and user != None:
            data[i]['upvoted'] = UpvotePost.objects.filter(post=posts[i], user=user).exists()
            data[i]['downvoted'] = DownvotePost.objects.filter(post=posts[i], user=user).exists()
            data[i]['saved'] = SavePost.objects.filter(post=posts[i], user=user).exists()
            
        post_id = data[i]['id']
        data[i]['permalink'] = encode_post_id(post_id)
    
    return Response(data)

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
