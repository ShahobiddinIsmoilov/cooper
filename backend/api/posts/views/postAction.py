from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Post, UpvotePost, DownvotePost, SavePost


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postAction(request):
    user = request.user
    post = Post.objects.get(pk=request.data.get('post'))
    action = request.data.get('action')
    
    if action == 'upvote':
        UpvotePost.objects.create(user=user, post=post).save()
        DownvotePost.objects.filter(user=user, post=post).delete()
        post.upvotes += 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'downvote':
        DownvotePost.objects.create(user=user, post=post).save()
        UpvotePost.objects.filter(user=user, post=post).delete()
        post.downvotes += 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'undo_upvote':
        UpvotePost.objects.filter(user=user, post=post).delete()
        post.upvotes -= 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'undo_downvote':
        DownvotePost.objects.filter(user=user, post=post).delete()
        post.downvotes -= 1
        post.save()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)
