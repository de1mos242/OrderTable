import uuid

from django.contrib.auth.models import User
from django.db import models

from order_events.enums import OrderEventStatus


class RateCard(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='rate_cards', on_delete=models.CASCADE)

    class Meta:
        ordering = ('name',)


class RateCardPosition(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rate_card = models.ForeignKey('order_events.RateCard', related_name='positions', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=10)

    class Meta:
        ordering = ('name',)


class OrderEvent(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='order_events', on_delete=models.CASCADE)
    rate_cards = models.ManyToManyField(RateCard, related_name='orders')
    participants = models.ManyToManyField(User, related_name='paricipated_orders')
    invitation_token = models.CharField(max_length=50, default=uuid.uuid4)
    status = models.IntegerField(default=OrderEventStatus.PREPARE, choices=OrderEventStatus.STATUS_CHOICES)

    class Meta:
        ordering = ('-created_at',)


class OrderPosition(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rate_card_position = models.ForeignKey('order_events.RateCardPosition', related_name='position',
                                           on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    customer = models.ForeignKey('auth.User', related_name='order_positions', on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=0, max_digits=4)
    order_event = models.ForeignKey('order_events.OrderEvent', related_name='positions', on_delete=models.CASCADE)

    class Meta:
        ordering = ('customer', 'name',)

class OrderPayment(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    customer = models.ForeignKey('auth.User', related_name='order_payments', on_delete=models.CASCADE)
    paid_sum = models.DecimalField(decimal_places=2, max_digits=10)
    order_event = models.ForeignKey('order_events.OrderEvent', related_name='payments', on_delete=models.CASCADE)

    class Meta:
        ordering = ('customer', )
