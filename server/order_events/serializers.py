from django.contrib.auth.models import User
from django.db.models import Sum, F
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField

from order_events import services
from order_events.models import OrderEvent, RateCard, RateCardPosition, OrderPosition, OrderPayment
from users.serializers import UserSerializer


class OrderEventSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    rate_cards = PrimaryKeyRelatedField(allow_empty=True, many=True, queryset=RateCard.objects.all(), required=False)
    participants = PrimaryKeyRelatedField(allow_empty=True, many=True, queryset=User.objects.all(), required=False)
    status = SerializerMethodField()

    class Meta:
        model = OrderEvent
        fields = ('id', 'name', 'owner', 'rate_cards', 'participants', 'status')
        depth = 1

    def get_status(self, status) -> str:
        return status.get_status_display()


class RateCardPositionSerializer(serializers.ModelSerializer):
    # rate_card_id = serializers.PrimaryKeyRelatedField(source='rate_card.id', queryset=RateCard.objects.all())

    class Meta:
        model = RateCardPosition
        fields = ('id', 'name', 'price')

    def to_internal_value(self, data):
        obj = super(RateCardPositionSerializer, self).to_internal_value(data)
        instance_id = data.get('id', None)
        if instance_id:
            obj['id'] = instance_id
        return obj


class RateCardSerializer(serializers.ModelSerializer):
    positions = RateCardPositionSerializer(many=True)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = RateCard
        fields = ('id', 'name', 'positions', 'owner')

    def create(self, validated_data):
        positions_data = validated_data.pop('positions')
        card = RateCard.objects.create(**validated_data)
        for position_data in positions_data:
            RateCardPosition.objects.create(rate_card=card, **position_data)
        return card

    def update(self, instance: RateCard, validated_data):
        positions_data = validated_data.get('positions', [])
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        new_position_ids = [pos.get('id', None) for pos in positions_data]
        for old_position in instance.positions.all():
            if old_position.id not in new_position_ids:
                old_position.delete()

        for new_position_data in positions_data:
            position_id = new_position_data.get('id', None)
            if position_id:
                position_item: RateCardPosition = RateCardPosition.objects.get(id=position_id)
                position_item.name = new_position_data.get('name', position_item.name)
                position_item.price = new_position_data.get('price', position_item.price)
                position_item.save()
            else:
                RateCardPosition.objects.create(rate_card=instance, **new_position_data)

        return instance


class OrderPositionSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)

    class Meta:
        model = OrderPosition
        fields = ('id', 'name', 'price', 'customer', 'amount', 'order_event', 'rate_card_position',)
        # depth = 1


class OrderGroupPositionSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        grouped = RateCardPosition.objects.filter(position__order_event=obj).annotate(
            total_amount=Sum('position__amount')).values('name', 'price', 'total_amount')
        result_list = []
        for item in grouped:
            result_list.append({'name': item['name'],
                                'price': item['price'],
                                'total_amount': item['total_amount'],
                                'total_sum': item['price'] * item['total_amount']})
        return result_list


class CustomerStatsSerializer(serializers.BaseSerializer):
    def to_representation(self, order_event):
        grouped = User.objects.filter(order_positions__order_event=order_event).annotate(
            total_sum=Sum(F('order_positions__amount') * F('order_positions__price')))
        result_list = []
        for item in grouped:
            result_list.append({
                'customer': UserSerializer(item).data,
                'total_sum': item.total_sum,
                'paid_sum': services.get_paid_sum(order_event, item)
            })
        return result_list


class OrderPaymentsSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        payment, created = OrderPayment.objects.update_or_create(
            order_event=validated_data.get('order_event', None),
            customer=validated_data.get('customer', None),
            defaults={'paid_sum': validated_data.get('paid_sum', 0)}
        )
        return payment

    class Meta:
        model = OrderPayment
        fields = ('id', 'customer', 'paid_sum', 'order_event')
