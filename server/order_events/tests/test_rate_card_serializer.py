from django.contrib.auth.models import User
from django.test import TestCase

from order_events.models import RateCardPosition, RateCard
from order_events.serializers import RateCardSerializer


class RateCardSerializerTests(TestCase):
    # https://github.com/de1mos242/OrderTable/issues/23
    def test_update_should_not_recreate_positions(self):
        user = User.objects.create_user('foo', 'myemail@test.com', 'bar')
        self.client.login(username='foo', password='bar')

        rate_card = RateCard()
        rate_card.owner = User.objects.first()
        rate_card.name = "test_rate_card"
        rate_card.save()

        pos = RateCardPosition()
        pos.name = "pos"
        pos.price = 100
        pos.rate_card = rate_card
        pos.save()

        old_pos_id = pos.id

        serializer = RateCardSerializer(rate_card)
        validated_data = serializer.data
        serializer.update(rate_card, validated_data)

        new_pos = rate_card.positions.first()
        self.assertEqual(old_pos_id, new_pos.id)
