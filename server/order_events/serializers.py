from django.contrib.auth.models import User
from django.db.models import Sum, F
from rest_framework import serializers
from rest_framework.fields import CharField
from rest_framework.relations import PrimaryKeyRelatedField

from order_events.models import OrderEvent, RateCard, RateCardPosition, OrderPosition
from users.serializers import UserSerializer


class OrderEventSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    rate_cards = PrimaryKeyRelatedField(allow_empty=True, many=True, queryset=RateCard.objects.all(), required=False)
    participants = PrimaryKeyRelatedField(allow_empty=True, many=True, queryset=User.objects.all(), required=False)
    invitation_token = CharField(read_only=True)

    class Meta:
        model = OrderEvent
        fields = ('id', 'name', 'owner', 'rate_cards', 'participants', 'invitation_token')
        depth = 1


class RateCardPositionSerializer(serializers.ModelSerializer):
    # rate_card_id = serializers.PrimaryKeyRelatedField(source='rate_card.id', queryset=RateCard.objects.all())

    class Meta:
        model = RateCardPosition
        fields = ('id', 'name', 'price')


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
    def to_representation(self, instance):
        grouped = User.objects.filter(order_positions__order_event=instance).annotate(
            total_sum=Sum(F('order_positions__amount') * F('order_positions__price')))
        result_list = []
        for item in grouped:
            result_list.append({
                'customer': UserSerializer(item).data,
                'total_sum': item.total_sum
            })
        return result_list
