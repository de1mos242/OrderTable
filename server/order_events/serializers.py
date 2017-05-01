from rest_framework import serializers

from order_events.models import OrderEvent
from users.serializers import UserSerializer


class OrderEventSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = OrderEvent
        fields = ('id', 'name', 'owner')
