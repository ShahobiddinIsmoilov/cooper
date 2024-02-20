from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view

from .models import Post
from .serializers import (CreatePostSerializer,
                          ListPostSerializer,
                          DetailPostSerializer,
                          UpdatePostSerializer)

# @api_view(['GET'])
# def postList(request):
#     posts = Post.objects.all()
#     serializer = DetailPostSerializer(posts, many=True)
#     return Response(serializer.data)


class ListPostView(generics.ListAPIView):
    """
    Getting the list of posts
    """
    queryset = Post.objects.all()
    serializer_class = ListPostSerializer


class DetailPostView(generics.RetrieveAPIView):
    """
    Retrieving a detailed post
    """
    queryset = Post.objects.all()
    serializer_class = DetailPostSerializer
    lookup_field = 'pk'


class CreatePostView(generics.CreateAPIView):
    """
    Creating a new post
    """
    serializer_class = CreatePostSerializer
    # permission_classes = (permissions.IsAuthenticated,)


class UpdatePostView(generics.RetrieveUpdateAPIView):
    """
    Updating a post
    """
    queryset = Post.objects.all()
    serializer_class = UpdatePostSerializer
    lookup_field = 'pk'
    # permission_classes = (permissions.IsAuthenticated,)


@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        'posts': reverse('post-list', request=request, format=None),
        'create': reverse('post-create', request=request, format=None),
    })