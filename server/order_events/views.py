from django_filters import rest_framework
from rest_framework import permissions, viewsets

from order_events.filters import RateCardFilter
from order_events.models import OrderEvent, RateCard, RateCardPosition
from order_events.permissions import IsOwnerOrReadOnly
from order_events.serializers import OrderEventSerializer, RateCardSerializer, RateCardPositionSerializer


class OrderEventViewSet(viewsets.ModelViewSet):
    queryset = OrderEvent.objects.all()
    serializer_class = OrderEventSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def perform_create(self, serializer: OrderEventSerializer):
        serializer.save(owner=self.request.user)


class RateCardViewSet(viewsets.ModelViewSet):
    queryset = RateCard.objects.all()
    serializer_class = RateCardSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = RateCardFilter

    def perform_create(self, serializer: RateCardSerializer):
        serializer.save(owner=self.request.user)


class RateCardPositionViewSet(viewsets.ModelViewSet):
    queryset = RateCardPosition.objects.all()
    serializer_class = RateCardPositionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
