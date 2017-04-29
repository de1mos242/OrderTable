from django.conf.urls import url

from order_events import views

urlpatterns = [
    url(r'^order-event/$', views.OrderEventList.as_view()),
    url(r'^order-event/(?P<pk>[0-9]+)/$', views.OrderEventDetail.as_view())
]
