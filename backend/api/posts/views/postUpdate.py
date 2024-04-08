from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from ..models import Post
from ..serializers import UpdatePostSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postUpdate(request, pk):
    post = Post.objects.get(pk=pk)
    serializer = UpdatePostSerializer(instance=post, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)
