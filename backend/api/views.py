from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def getData(request):
    game = {'game': 'Half-Life 2', 'description': 'Best game ever made'}
    return Response(game)