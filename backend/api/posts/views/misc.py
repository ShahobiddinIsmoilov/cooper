from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Post
from ..serializers import CreatePostSerializer, UpdatePostSerializer
from api.convert import from_10_to_36_post, from_36_to_10_post


# Create new post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postCreate(request):
    serializer = CreatePostSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        post = serializer.save(user=request.user)
        post_id = from_10_to_36_post(post.id)
        return Response(post_id, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Update post
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def postUpdate(request, pk):
    post_id = from_36_to_10_post(pk)
    post = Post.objects.get(pk=post_id)
    serializer = UpdatePostSerializer(instance=post, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(status=status.HTTP_200_OK)


# Delete post
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def postDelete(request, pk):
    post_id = from_36_to_10_post(pk)
    post = Post.objects.get(pk=post_id)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
