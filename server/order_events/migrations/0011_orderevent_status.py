# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-10 19:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order_events', '0010_orderevent_invitation_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderevent',
            name='status',
            field=models.IntegerField(choices=[(0, 'PREPARE'), (1, 'BUILD'), (2, 'SEND'), (3, 'PAY'), (4, 'CLOSE')], default=0),
        ),
    ]
