from ordertable.settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DATABASE_NAME', ''),
        'USER': os.environ.get('DATABASE_USER', ''),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD', ''),
        'HOST': os.environ.get('DATABASE_HOST', ''),
        'PORT': os.environ.get('DATABASE_PORT', ''),
    }
}
DEBUG = False
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*')

SECRET_KEY = os.environ.get('SECRET_KEY', '')

# Facebook configuration
SOCIAL_AUTH_FACEBOOK_KEY = os.environ.get('SOCIAL_AUTH_FACEBOOK_KEY', '')
SOCIAL_AUTH_FACEBOOK_SECRET = os.environ.get('SOCIAL_AUTH_FACEBOOK_SECRET', '')

SOCIAL_AUTH_GOOGLE_KEY = os.environ.get('SOCIAL_AUTH_GOOGLE_KEY', '')
SOCIAL_AUTH_GOOGLE_SECRET = os.environ.get('SOCIAL_AUTH_GOOGLE_SECRET', '')
