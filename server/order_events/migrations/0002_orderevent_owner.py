# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-29 18:09
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('order_events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderevent',
            name='owner',
            field=models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='order_events',
                                    to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
