from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import User
from ..models import Comment, UpvoteComment, DownvoteComment
from ..serializers import ListCommentSerializer


@api_view(["GET"])
def commentList(request):
    filter = request.GET.get("filter", "")
    user = request.GET.get("user")

    if filter == "post":
        post = request.GET.get("post", "")
        comments_raw = Comment.objects.filter(post=post)
    else:
        username = request.GET.get("username", "")
        comments_user = get_object_or_404(User, username__iexact=username)
        comments_raw = Comment.objects.filter(user=comments_user)

    sort_by = request.GET.get("sort", "")

    if sort_by == "top":
        comments = comments_raw.order_by("-votes", "-created_at")
    elif sort_by == "best":
        comments = comments_raw.order_by("-ratio", "-created_at")
    else:
        comments = comments_raw.order_by("-created_at")

    serializer = ListCommentSerializer(comments, many=True)
    data = serializer.data

    if user != "undefined" and user != None:
        for i in range(len(data)):
            upvoted = UpvoteComment.objects.filter(comment=comments[i], user=user)
            data[i]["upvoted"] = upvoted.exists()
            downvoted = DownvoteComment.objects.filter(comment=comments[i], user=user)
            data[i]["downvoted"] = downvoted.exists()

    return Response(data)
