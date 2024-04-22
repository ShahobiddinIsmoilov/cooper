from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Post, UpvotePost, DownvotePost, SavePost
from api.convert import from_36_to_10_post


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postAction(request):
    user = request.user
    post_id = from_36_to_10_post(request.data.get('post'))
    post = Post.objects.get(pk=post_id)
    action = request.data.get('action')
    
    if action == 'upvote':
        UpvotePost.objects.create(user=user, post=post).save()
        downvote = DownvotePost.objects.filter(user=user, post=post)
        if downvote.exists():
            downvote.delete()
            post.downvotes -= 1
        post.upvotes += 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'undo_upvote':
        upvote = UpvotePost.objects.filter(user=user, post=post)
        if upvote.exists():
            upvote.delete()
            post.upvotes -= 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'downvote':
        DownvotePost.objects.create(user=user, post=post).save()
        upvote = UpvotePost.objects.filter(user=user, post=post)
        if upvote.exists():
            upvote.delete()
            post.upvotes -= 1
        post.downvotes += 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'undo_downvote':
        downvote = DownvotePost.objects.filter(user=user, post=post)
        if downvote.exists():
            downvote.delete()
            post.downvotes -= 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == "save":
        SavePost.objects.create(user=user, post=post).save()
        return Response(status=status.HTTP_200_OK)
    elif action == "undo_save":
        SavePost.objects.filter(user=user, post=post).delete()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)
