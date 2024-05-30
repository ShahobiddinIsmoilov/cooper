from django.apps import apps
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Post
from ..serializers import CreatePostSerializer, UpdatePostSerializer
from api.convert import encode_post_id


# Create new post
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def postCreate(request):
    serializer = CreatePostSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        post = serializer.save(user=request.user)
        permalink = encode_post_id(post.id)
        return Response(permalink, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Update post
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def postUpdate(request, pk):
    post = Post.objects.get(pk=pk)
    serializer = UpdatePostSerializer(instance=post, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(edited=True, edited_at=timezone.now())

    return Response(status=status.HTTP_200_OK)


# Delete post
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def postDelete(request, pk):
    post = Post.objects.get(pk=pk)
    post.deleted = True
    post.save()
    
    Community = apps.get_model("communities", "Community")
    community = Community.objects.get(id=post.community_id)
    comments_to_subtract = post.comments
    if community.comments >= comments_to_subtract:
        community.comments -= comments_to_subtract
    if community.posts > 0:
        community.posts -= 1
    community.save()

    return Response(status=status.HTTP_204_NO_CONTENT)
