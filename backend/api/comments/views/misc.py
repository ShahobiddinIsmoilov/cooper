from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Comment
from ..serializers import CreateCommentSerializer, UpdateCommentSerializer
from api.convert import from_36_to_10_post, from_36_to_10_comment


# Create comment
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def commentCreate(request):
    data = request.data.copy()
    post = from_36_to_10_post(data['post'])
    data['post'] = post
    parent = from_36_to_10_comment(data['parent'])
    data['parent'] = parent
    serializer = CreateCommentSerializer(data=data)
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
