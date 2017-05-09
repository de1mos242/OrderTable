#!/usr/bin/env bash

export DJANGO_SETTINGS_MODULE=ordertable.settings_prod
echo Run migrations.
/code/manage.py migrate
echo Self check.
/code/manage.py check
echo Starting Orders table server.
/code/manage.py runserver "0.0.0.0:8000"