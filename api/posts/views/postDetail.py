from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.communities.models import Community
from api.communities.serializers import DetailCommunitySerializer
from ..models import Post, SavePost, UpvotePost, DownvotePost
from ..serializers import PostSerializer
from api.convert import decode_post_id, encode_post_id


@api_view(['GET'])
def postDetail(request, permalink):
    post_id = decode_post_id(permalink)
    post = get_object_or_404(Post, pk=post_id)
    post_serializer = PostSerializer(post, many=False)

    community = Community.objects.get(pk=post_serializer.data['community'])
    community_serializer = DetailCommunitySerializer(community, many=False)
    
    data = {'post_detail': {**post_serializer.data},
            'community_detail': {**community_serializer.data}}

    user = request.GET.get('user')
    if user != 'undefined' and user != None:
        data['post_detail']['upvoted'] = UpvotePost.objects.filter(post=post, user=user).exists()
        data['post_detail']['downvoted'] = DownvotePost.objects.filter(post=post, user=user).exists()
        data['post_detail']['saved'] = SavePost.objects.filter(post=post, user=user).exists()
    
    return Response(data)
