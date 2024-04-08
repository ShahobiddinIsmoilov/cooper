from itertools import chain
from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Comment
from api.posts.models import Post
from api.posts.serializers import ListPostSerializer
from ..serializers import (ListCommentSerializer,
                          CreateCommentSerializer,
                          UpdateCommentSerializer)


# Create comment
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def commentCreate(request):
    serializer = CreateCommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
    return Response(serializer.data)


# Update comment
@api_view(['POST'])
def commentUpdate(request, pk):
    comment = Comment.objects.get(pk=pk)
    serializer = UpdateCommentSerializer(instance=comment, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data)


# Delete comment
@api_view(['DELETE'])
def commentDelete(request, pk):
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
