import re

from rest_framework import permissions
from rest_framework.request import Request

from order_events.enums import OrderEventStatus
from order_events.models import OrderEvent


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        pattern = re.compile("^/api/order-events/(\d)+/invite/$")
        if pattern.match(request.path):
            return True

        return obj.owner == request.user


class NotDraftOrderPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.owner == request.user:
            return True
        return obj.status != OrderEventStatus.PREPARE


class OrderPositionPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.order_event.owner == request.user:
            return True

        if obj.order_event.status == OrderEventStatus.PREPARE:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        if obj.order_event.status != OrderEventStatus.BUILD:
            return False

        return obj.customer == request.user

    def has_permission(self, request: Request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if 'order_event' not in request.data:
            return True

        order_id = request.data['order_event']
        order_event = OrderEvent.objects.get(pk=order_id)

        if order_event.owner == request.user:
            return True

        if order_event.status != OrderEventStatus.BUILD:
            return False

        return order_event.participants.filter(id=request.user.id).count() > 0
