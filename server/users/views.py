from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import list_route
from rest_framework.response import Response

from users.serializers import UserSerializer


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
