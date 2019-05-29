
from django.conf.urls import url, include
from .views import home
from home.api.v1.viewsets import MyUserViewSet, TabletViewSet

urlpatterns = [
    url(r'^$', home, name="home"),
    url(r'^tablets/$', TabletViewSet.as_view()),
    url(r'^tablets/(?P<pk>\d+)/$', TabletViewSet.as_view()),
    url(r'^myusers/$', MyUserViewSet.as_view()),
    url(r'^myusers/(?P<pk>\d+)/$', MyUserViewSet.as_view()),
]
