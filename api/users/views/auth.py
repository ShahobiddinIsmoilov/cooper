from random import randint
from django.utils import timezone
from datetime import timedelta
from datetime import datetime
from dateutil import parser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import Code
from api.users.serializers import CodeSerializer


@api_view(["POST"])
def new_code(request):
    phone = request.data.get('phone')
    
    if not phone:
        message = {"error": "Phone number not provided"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    current_time = timezone.now()
    one_minute_ago = current_time - timedelta(minutes=1)
    recent = Code.objects.filter(phone=phone, created_at__gte=one_minute_ago).exists()
    
    if recent:
        message = {"error": "Last code is still valid"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
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
        message = {"error": "Code not provided"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
    code = Code.objects.filter(code=request.data.get('code')).first()
    
    if not code:
        message = {"error": "Invalid code"}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    
    serializer = CodeSerializer(code, many=False)
    created_at = parser.parse(serializer.data['created_at']).timestamp()
    now = parser.parse(str(datetime.now())).timestamp()
    passed_seconds = now - created_at
    print(passed_seconds)
    
    if passed_seconds > 60:
        code.delete()
        message = {"error": "Expired code"}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    
    code.delete()
    phone = serializer.data['phone']
    
    data = {
        'status': 'OK',
        'phone': phone
    }
    return Response(data, status=status.HTTP_200_OK)
