from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


@api_view(["GET"])
def OK(request):
    return Response("HALF-LIFE 2 IS THE BEST GAME EVER MADE", status=status.HTTP_200_OK)
