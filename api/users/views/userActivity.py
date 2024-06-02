from itertools import chain
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import User
from api.posts.models import Post, UpvotePost, DownvotePost, SavePost
from api.posts.serializers import PostSerializer
from api.comments.models import Comment, UpvoteComment, DownvoteComment
from api.comments.serializers import ListCommentSerializer
from api.convert import encode_post_id, encode_comment_id


@api_view(["GET"])
def activityList(request, username):
    activity_user = get_object_or_404(User, username__iexact=username)
    comments = Comment.objects.filter(user=activity_user)
    posts = Post.objects.filter(user=activity_user)

    activity_raw = list(chain(comments, posts))

    sort_by = request.GET.get("sort", "")

    if sort_by == "top":
        activity = sorted(
            activity_raw, key=lambda x: (x.votes, x.created_at), reverse=True
        )
    elif sort_by == "best":
        activity = sorted(
            activity_raw, key=lambda x: (x.ratio, x.created_at), reverse=True
        )
    else:
        activity = sorted(activity_raw, key=lambda x: x.created_at, reverse=True)

    user = request.GET.get("user")
    data = []

    for item in activity:
        if hasattr(item, "title"):
            serialized = PostSerializer(item, many=False).data
            if user != "undefined":
                upvote = UpvotePost.objects.filter(post=item, user=user)
                serialized["upvoted"] = upvote.exists()
                downvote = DownvotePost.objects.filter(post=item, user=user)
                serialized["downvoted"] = downvote.exists()
                save = SavePost.objects.filter(post=item, user=user)
                serialized["saved"] = save.exists()
            permalink = encode_post_id(serialized["id"])
            serialized["permalink"] = permalink
        else:
            serialized = ListCommentSerializer(item, many=False).data
            if user != "undefined":
                upvote = UpvoteComment.objects.filter(comment=item, user=user)
                serialized["upvoted"] = upvote.exists()
                downvote = DownvoteComment.objects.filter(comment=item, user=user)
                serialized["downvoted"] = downvote.exists()
            comment_permalink = encode_comment_id(serialized["id"])
            serialized["comment_permalink"] = comment_permalink
            if serialized["post"] != None:
                post_permalink = encode_post_id(serialized["post"])
            else:
                post_permalink = None
            serialized["post_permalink"] = post_permalink
        data.append(serialized)

    return Response(data)
