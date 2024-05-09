from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Comment, UpvoteComment, DownvoteComment


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def commentAction(request):
    user = request.user
    comment = Comment.objects.get(pk=request.data.get("comment"))
    action = request.data.get("action")

    if action == "upvote":
        UpvoteComment.objects.create(user=user, comment=comment).save()
        downvote = DownvoteComment.objects.filter(user=user, comment=comment)
        if downvote.exists():
            downvote.delete()
            comment.downvotes -= 1
        comment.upvotes += 1
        comment.save()
        return Response(status=status.HTTP_200_OK)
    elif action == "undo_upvote":
        upvote = UpvoteComment.objects.filter(user=user, comment=comment)
        if upvote.exists():
            upvote.delete()
            comment.upvotes -= 1
        comment.save()
        return Response(status=status.HTTP_200_OK)
    elif action == "downvote":
        DownvoteComment.objects.create(user=user, comment=comment).save()
        upvote = UpvoteComment.objects.filter(user=user, comment=comment)
        if upvote.exists():
            upvote.delete()
            comment.upvotes -= 1
        comment.downvotes += 1
        comment.save()
        return Response(status=status.HTTP_200_OK)
    elif action == "undo_downvote":
        downvote = DownvoteComment.objects.filter(user=user, comment=comment)
        if downvote.exists():
            downvote.delete()
            comment.downvotes -= 1
        comment.save()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)
