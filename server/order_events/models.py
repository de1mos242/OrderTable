from django.db import models


class OrderEvent(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='order_events', on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created',)
