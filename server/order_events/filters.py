from django_filters import CharFilter, NumberFilter
from django_filters.rest_framework import FilterSet

from order_events.models import RateCard


class RateCardFilter(FilterSet):
    name = CharFilter(name="name", lookup_expr="icontains")
    order_id = NumberFilter(name="orders__id")
    exclude_order_id = NumberFilter(name="orders__id", exclude=True)

    class Meta:
        model = RateCard
        fields = ['name', 'order_id', 'exclude_order_id']