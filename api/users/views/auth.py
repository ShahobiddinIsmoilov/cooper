from random import randint
from django.utils import timezone
from datetime import timedelta
from datetime import datetime
from dateutil import parser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import User, Code
from api.users.serializers import CodeSerializer, UserDetailSerializer


@api_view(["POST"])
def new_code(request):
    phone = request.data.get('phone')
    
    if not phone:
        data = {'status': 'ERROR', 'message': 'Phone number not provided'}
        return Response(data, status=status.HTTP_200_OK)
    
    current_time = timezone.now()
    one_minute_ago = current_time - timedelta(minutes=1)
    recent = Code.objects.filter(phone=phone, created_at__gte=one_minute_ago).exists()
    
    if recent:
        data = {'status': 'ERROR', 'message': 'Last code is still valid'}
        return Response(data, status=status.HTTP_200_OK)
    
    Code.objects.filter(phone=phone).delete()
    
    exists = True
    while exists:
        code = randint(100000, 999999)
        exists = Code.objects.filter(code=code).exists()
        
    Code.objects.create(code=code, phone=phone)
    data = {
        'status': 'OK',
        'code': code
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
def check_code(request):
    if not request.data.get('code'):
        data = {'status': 'ERROR', 'message': 'Code not provided'}
        return Response(data, status=status.HTTP_200_OK)
        
    code = Code.objects.filter(code=request.data.get('code')).first()
    
    if not code:
        data = {'status': 'ERROR', 'message': 'Invalid code'}
        return Response(data, status=status.HTTP_200_OK)
    
    serializer = CodeSerializer(code, many=False)
    created_at = parser.parse(serializer.data['created_at']).timestamp()
    now = parser.parse(str(datetime.now())).timestamp()
    passed_seconds = now - created_at
    
    if passed_seconds > 60:
        code.delete()
        data = {'status': 'ERROR', 'message': 'Expired code'}
        return Response(data, status=status.HTTP_200_OK)
    
    code.delete()
    phone = serializer.data['phone']
    
    registered_before = User.objects.filter(phone=phone).exists()
    
    if registered_before:
        data = {'status': 'ERROR', 'message': 'Phone number registered before'}
        return Response(data, status=status.HTTP_200_OK)
    
    data = {
        'status': 'OK',
        'phone': phone
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
def check_username(request):
    if not request.data.get('username'):
        data = {'status': 'ERROR', 'message': 'Username not provided'}
        return Response(data, status=status.HTTP_200_OK)
        
    username = request.data.get('username')
    exists = User.objects.filter(username__iexact=username).exists()
    
    if exists:
        data = {'status': 'ERROR', 'message': 'Username taken'}
        return Response(data, status=status.HTTP_200_OK)
    
    data = {'status': 'OK', 'message': 'All good'}
    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
def my_username(request):
    if not request.data.get('phone'):
        data = {'status': 'ERROR', 'message': 'Phone not provided'}
        return Response(data, status=status.HTTP_200_OK)
        
    user = User.objects.filter(phone=request.data.get('phone')).first()
    
    if not user:
        data = {'status': 'ERROR', 'message': 'Not registered'}
        return Response(data, status=status.HTTP_200_OK)
    
    username = UserDetailSerializer(user, many=False).data['username']
    data = {'status': 'OK', 'username': username}
    return Response(data, status=status.HTTP_200_OK)
