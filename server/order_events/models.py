from django.db import models


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

    class Meta:
        ordering = ('-created_at',)
