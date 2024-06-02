from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import User
from api.communities.models import Community, UserCommunity
from ..models import Post, SavePost, UpvotePost, DownvotePost
from ..serializers import PostSerializer


@api_view(["GET"])
def postList(request):
    filter = request.GET.get("filter", "home")
    user = request.GET.get("user")

    if filter == "home":
        posts_raw = getHomePosts(user)
    elif filter == "explore":
        posts_raw = getExplorePosts(user)
    elif filter == "all":
        posts_raw = Post.objects.all()
    elif filter == "community":
        community = request.GET.get("community", "")
        posts_raw = Post.objects.filter(community=community)
    else:
        username = request.GET.get("username", "")
        posts_user = get_object_or_404(User, username__iexact=username)
        posts_raw = Post.objects.filter(user=posts_user)

    sort_by = request.GET.get("sort", "")

    if sort_by == "hot":
        posts = sorted(posts_raw, key=lambda x: (x.score, x.created_at), reverse=True)
    elif sort_by == "top":
        posts = sorted(posts_raw, key=lambda x: (x.votes, x.created_at), reverse=True)
    elif sort_by == "best":
        posts = sorted(posts_raw, key=lambda x: (x.ratio, x.created_at), reverse=True)
    else:
        posts = posts_raw.order_by("-created_at")

    serializer = PostSerializer(posts, many=True)
    data = serializer.data

    if user != "undefined" and user != None:
        for i in range(len(data)):
            data[i]["upvoted"] = UpvotePost.objects.filter(
                post=posts[i], user=user
            ).exists()
            data[i]["downvoted"] = DownvotePost.objects.filter(
                post=posts[i], user=user
            ).exists()
            data[i]["saved"] = SavePost.objects.filter(
                post=posts[i], user=user
            ).exists()

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
