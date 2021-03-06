# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-28 05:07
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('order_events', '0011_orderevent_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderPayment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('paid_sum', models.DecimalField(decimal_places=2, max_digits=10)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_payments', to=settings.AUTH_USER_MODEL)),
                ('order_event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to='order_events.OrderEvent')),
            ],
            options={
                'ordering': ('customer',),
            },
        ),
    ]
