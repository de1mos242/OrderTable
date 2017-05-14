from django.contrib.auth.models import User
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import list_route
from rest_framework.request import Request
from rest_framework.response import Response

from users.permissions import IsSelfOrReadOnly
from users.serializers import UserSerializer, SecurityUserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @list_route(methods=['get'], url_path='by-username/(?P<username>[a-zA-Z0-9]+)')
    def get_by_username(self, request, username):
        user = User.objects.get_by_natural_key(username)
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def current_user(self, request: Request):
        user = request.user
        if not user.is_authenticated():
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class SecurityUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SecurityUserSerializer
    permission_classes = (permissions.AllowAny, IsSelfOrReadOnly,)
