from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


def serialize_user(user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'name': user.first_name or user.username,
    }


@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_obj = User.objects.get(email=email)
        username = user_obj.username
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            'message': 'Login successful!',
            'user': serialize_user(user)
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def register_view(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response({'error': 'Name, email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(Q(email__iexact=email) | Q(username__iexact=email)).exists():
        return Response({'error': 'A user with that email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name,
    )

    return Response({
        'message': 'Registration successful!',
        'user': serialize_user(user)
    }, status=status.HTTP_201_CREATED)