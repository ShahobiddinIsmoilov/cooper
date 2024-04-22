from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import User
from api.communities.models import Community
from api.communities.serializers import DetailCommunitySerializer
from ..models import Post, SavePost, UpvotePost, DownvotePost
from ..serializers import DetailPostSerializer
from api.convert import decode_post_id, encode_post_id


@api_view(['GET'])
def postDetail(request, permalink):
    post_id = decode_post_id(permalink)
    post = get_object_or_404(Post, pk=post_id)
    post_serializer = DetailPostSerializer(post, many=False)

    community = Community.objects.get(pk=post_serializer.data['community'])
    community_serializer = DetailCommunitySerializer(community, many=False)
    
    data = {'post_detail': {**post_serializer.data},
            'community_detail': {**community_serializer.data}}

    user = request.GET.get('user')
    data['post_detail']['upvoted'] = UpvotePost.objects.filter(post=post, user=user).exists()
    data['post_detail']['downvoted'] = DownvotePost.objects.filter(post=post, user=user).exists()
    data['post_detail']['saved'] = SavePost.objects.filter(post=post, user=user).exists()
    
    permalink = encode_post_id(data['post_detail']['id'])
    data['post_detail']['permalink'] = permalink
    
    return Response(data)
