from rest_framework import serializers

from order_events.models import OrderEvent, RateCard, RateCardPosition
from users.serializers import UserSerializer


class OrderEventSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = OrderEvent
        fields = ('id', 'name', 'owner')


class RateCardPositionSerializer(serializers.ModelSerializer):
    # rate_card_id = serializers.PrimaryKeyRelatedField(source='rate_card.id', queryset=RateCard.objects.all())

    class Meta:
        model = RateCardPosition
        fields = ('id', 'name', 'price')


class RateCardSerializer(serializers.ModelSerializer):
    positions = RateCardPositionSerializer(many=True)

    class Meta:
        model = RateCard
        fields = ('id', 'name', 'positions')

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
