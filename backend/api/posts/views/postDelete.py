from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Post


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def postDelete(request, pk):
    post = Post.objects.get(pk=pk)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
