from order_events.models import OrderEvent
from rest_framework import serializers


class OrderEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderEvent
        fields = ('id', 'name')
