from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..serializers import CreatePostSerializer


# Create new post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postCreate(request):
    serializer = CreatePostSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        post = serializer.save()
        return Response(post.id, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
