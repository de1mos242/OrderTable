# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-07 17:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order_events', '0003_auto_20170504_1636'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderevent',
            name='rate_cards',
            field=models.ManyToManyField(to='order_events.RateCard'),
        ),
    ]
