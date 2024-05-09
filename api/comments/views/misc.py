from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Comment
from ..serializers import CreateCommentSerializer, UpdateCommentSerializer


# Create comment
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def commentCreate(request):
    serializer = CreateCommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
    return Response(status=status.HTTP_201_CREATED)


# Update comment
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def commentUpdate(request, pk):
    comment = Comment.objects.get(pk=pk)
    serializer = UpdateCommentSerializer(instance=comment, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(status=status.HTTP_200_OK)


# Delete comment
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def commentDelete(request, pk):
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
