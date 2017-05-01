from rest_framework import permissions

from order_events.models import OrderEvent


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: OrderEvent):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user
