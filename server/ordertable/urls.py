"""ordertable URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
# Serializers define the API representation.
from rest_framework import routers
# Routers provide an easy way of automatically determining the URL conf.
from rest_framework.authtoken import views
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.views import get_swagger_view
from order_events.views import OrderEventViewSet, RateCardViewSet, RateCardPositionViewSet, OrderPositionViewSet
from users.views import UserViewSet, SecurityUserViewSet

schema_view = get_schema_view(title='Pastebin API')
swagger_schema_view = get_swagger_view(title="Order table API")

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'security-users', SecurityUserViewSet)
router.register(r'order-events', OrderEventViewSet, 'order-event')
router.register(r'rate-cards', RateCardViewSet, 'rate-card')
router.register(r'rate-cards-positions', RateCardPositionViewSet, 'rate-card-position')
router.register(r'order-positions', OrderPositionViewSet, 'order-position')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^schema/swagger/$', swagger_schema_view),
    url(r'^schema/$', schema_view),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', views.obtain_auth_token),
]

