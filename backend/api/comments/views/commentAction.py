from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Comment


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def commentAction(request, pk):
    comment = Comment.objects.get(pk=pk)
    
    action = request.GET.get('action', '')
    
    if action == 'upvote':
        comment.upvotes += 1
        comment.save()
        return Response(status=status.HTTP_200_OK)
    elif action == 'downvote':
        comment.downvotes += 1
        comment.save()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)
