from rest_framework import permissions, viewsets
from rest_framework.decorators import detail_route

from order_events.models import OrderEvent, RateCard, RateCardPosition
from order_events.permissions import IsOwnerOrReadOnly
from order_events.serializers import OrderEventSerializer, RateCardSerializer, RateCardPositionSerializer


class OrderEventViewSet(viewsets.ModelViewSet):
    queryset = OrderEvent.objects.all()
    serializer_class = OrderEventSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def perform_create(self, serializer: OrderEventSerializer):
        serializer.save(owner=self.request.user)

    @detail_route(methods=['put'])
    def set_menus(self, request, pk=None):
        order_event = self.get_object()
        self.get_serializer()
        serializer = OrderEventSerializer(data=request.data)



class RateCardViewSet(viewsets.ModelViewSet):
    queryset = RateCard.objects.all()
    serializer_class = RateCardSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def perform_create(self, serializer: RateCardSerializer):
        serializer.save(owner=self.request.user)


class RateCardPositionViewSet(viewsets.ModelViewSet):
    queryset = RateCardPosition.objects.all()
    serializer_class = RateCardPositionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
