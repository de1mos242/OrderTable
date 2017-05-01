from rest_framework import permissions, viewsets

from order_events.models import OrderEvent
from order_events.permissions import IsOwnerOrReadOnly
from order_events.serializers import OrderEventSerializer


class OrderEventViewSet(viewsets.ModelViewSet):
    queryset = OrderEvent.objects.all()
    serializer_class = OrderEventSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def perform_create(self, serializer: OrderEventSerializer):
        serializer.save(owner=self.request.user)

