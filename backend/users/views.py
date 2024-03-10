from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.reverse import reverse

from .serializers import NoteSerializer
from .models import Note


@api_view(['GET','HEAD'])
def api_root(request, format=None):
    return Response({
        # 'register': reverse('register', request=request, format=None),
        # 'login': reverse('login', request=request, format=None),
        'token': reverse('token', request=request, format=None),
        'refresh-token': reverse('refresh-token', request=request, format=None),
        # 'user-list': reverse('user-list', request=request, format=None),
        # 'logout': reverse('logout', request=request, format=None)
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)