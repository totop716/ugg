
from django.conf.urls import url, include
from .views import home
from home.api.v1.viewsets import MyUserViewSet, TabletViewSet, SweepstakeViewSet

urlpatterns = [
    url(r'^$', home, name="home"),
    url(r'^tablets/$', TabletViewSet.as_view()),
    url(r'^sweepstakes/$', SweepstakeViewSet.as_view()),
    url(r'^sweepstakes/(?P<pk>\d+)/$', SweepstakeViewSet.as_view()),
    url(r'^myusers/$', MyUserViewSet.as_view()),
    url(r'^myusers/(?P<pk>\d+)/$', MyUserViewSet.as_view()),
]
