from django_filters import rest_framework
from rest_framework import permissions, viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from order_events.filters import RateCardFilter, OrderPositionFilter, RateCardPositionFilter
from order_events.models import OrderEvent, RateCard, RateCardPosition, OrderPosition
from order_events.permissions import IsOwnerOrReadOnly
from order_events.serializers import OrderEventSerializer, RateCardSerializer, RateCardPositionSerializer, \
    OrderPositionSerializer, OrderGroupPositionSerializer, CustomerStatsSerializer


class OrderEventViewSet(viewsets.ModelViewSet):
    queryset = OrderEvent.objects.all()
    serializer_class = OrderEventSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def perform_create(self, serializer: OrderEventSerializer):
        serializer.save(owner=self.request.user)

    @detail_route(methods=['get'])
    def groued_positions(self, request, pk=None):
        serializer = OrderGroupPositionSerializer(self.get_object())
        return Response({'results': serializer.data})

    @detail_route(methods=['get'])
    def customers_stats(self, request, pk=None):
        serializer = CustomerStatsSerializer(self.get_object())
        return Response({'results': serializer.data})

class RateCardViewSet(viewsets.ModelViewSet):
    queryset = RateCard.objects.all()
    serializer_class = RateCardSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = RateCardFilter

    def perform_create(self, serializer: RateCardSerializer):
        serializer.save(owner=self.request.user)


class RateCardPositionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RateCardPosition.objects.all()
    serializer_class = RateCardPositionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = RateCardPositionFilter


class OrderPositionViewSet(viewsets.ModelViewSet):
    queryset = OrderPosition.objects.all()
    serializer_class = OrderPositionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = OrderPositionFilter

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
