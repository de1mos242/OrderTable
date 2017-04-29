from order_events.models import OrderEvent
from order_events.serializers import OrderEventSerializer
from rest_framework import generics


class OrderEventList(generics.ListCreateAPIView):
    queryset = OrderEvent.objects.all()
    serializer_class = OrderEventSerializer


class OrderEventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderEvent.objects.all()
    serializer_class = OrderEventSerializer
