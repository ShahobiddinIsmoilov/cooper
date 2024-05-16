from random import randint
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import Code
from api.users.serializers import CodeSerializer


@api_view(["POST"])
def new_code(request):
    phone = request.data.get('phone', '')
    exists = True
    
    while exists:
        code = randint(100000, 999999)
        exists = Code.objects.filter(code=code)
        
    Code.objects.create(code=code, phone=phone)
    data = {
        'code': code
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
def check_code(request):
    code = request.data.get('code', '')
    serializer = CodeSerializer(get_object_or_404(Code, code=code), many=False)
    phone = serializer.data['phone']
    data = {
        'status': 'OK',
        'phone': phone
    }
    return Response(data, status=status.HTTP_200_OK)
