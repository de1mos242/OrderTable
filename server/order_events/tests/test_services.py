from django.test import TestCase

from order_events.enums import OrderEventStatus
from order_events.services import is_state_change_acceptable


class OrderStatusChangeTestCase(TestCase):
    def test_transitions(self):
        self.assertEqual(True, is_state_change_acceptable(OrderEventStatus.PREPARE, OrderEventStatus.BUILD))
        self.assertEqual(True, is_state_change_acceptable(OrderEventStatus.CLOSE, OrderEventStatus.PAY))
        self.assertEqual(False, is_state_change_acceptable(OrderEventStatus.PREPARE, OrderEventStatus.SEND))
