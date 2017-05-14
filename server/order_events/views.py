from uuid import uuid4

from django_filters import rest_framework
from rest_framework import permissions, viewsets
from rest_framework.decorators import detail_route
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from order_events import services
from order_events.enums import OrderEventStatus
from order_events.filters import RateCardFilter, OrderPositionFilter, RateCardPositionFilter
from order_events.models import OrderEvent, RateCard, RateCardPosition, OrderPosition
from order_events.permissions import IsOwnerOrReadOnly, OrderPositionPermissions, NotDraftOrderPermissions
from order_events.serializers import OrderEventSerializer, RateCardSerializer, RateCardPositionSerializer, \
    OrderPositionSerializer, OrderGroupPositionSerializer, CustomerStatsSerializer


class OrderEventViewSet(viewsets.ModelViewSet):
    serializer_class = OrderEventSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, NotDraftOrderPermissions,)

    def get_queryset(self):
        in_work_statuses = OrderEvent.objects.exclude(status=OrderEventStatus.PREPARE)
        if self.request.user.is_authenticated():
            return OrderEvent.objects.filter(owner=self.request.user) \
                   | in_work_statuses
        else:
            return in_work_statuses

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

    @detail_route(methods=['post'])
    def request_invitation_token(self, request, pk=None):
        order: OrderEvent = self.get_object()
        order.invitation_token = uuid4()
        order.save()
        return Response({'token': order.invitation_token})

    @detail_route(methods=['put'])
    def invite(self, request, pk=None):
        order: OrderEvent = self.get_object()
        if order.invitation_token == request.data['token']:
            order.participants.add(request.user)
            order.save()
        else:
            raise PermissionDenied("token not valid")
        return Response({'result': True})

    @detail_route(methods=['put'])
    def status(self, request, pk=None):
        order: OrderEvent = self.get_object()
        new_status = OrderEventStatus.get_by_name(request.data['status'])
        services.update_order_status(order, new_status)
        return Response(OrderEventSerializer(order).data)


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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, OrderPositionPermissions,)
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = OrderPositionFilter

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
