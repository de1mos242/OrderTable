from django_filters import CharFilter, NumberFilter, BaseInFilter
from django_filters.rest_framework import FilterSet

from order_events.models import RateCard, OrderPosition, RateCardPosition, OrderPayment


class RateCardFilter(FilterSet):
    name = CharFilter(name="name", lookup_expr="icontains")
    order_id = NumberFilter(name="orders__id")
    exclude_order_id = NumberFilter(name="orders__id", exclude=True)

    class Meta:
        model = RateCard
        fields = ['name', 'order_id', 'exclude_order_id']


class RateCardPositionFilter(FilterSet):
    rate_card_ids = BaseInFilter(name="rate_card__id", lookup_expr="in", label="rateCardIds")

    class Meta:
        model = RateCardPosition
        fields = ['rate_card_ids']


class OrderPositionFilter(FilterSet):
    order_id = NumberFilter(name="order_event__id", label="orderId")
    customer_id = NumberFilter(name="customer__id", label="customerId")

    class Meta:
        model = OrderPosition
        fields = ['order_id', 'customer_id']


class OrderPaymentFilter(FilterSet):
    order_id = NumberFilter(name="order_event__id", label="orderId")
    customer_id = NumberFilter(name="customer__id", label="customerId")

    class Meta:
        model = OrderPayment
        fields = ['order_id', 'customer_id']
