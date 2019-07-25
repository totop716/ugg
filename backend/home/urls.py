
from django.conf.urls import url, include
from .views import home
from home.api.v1.viewsets import MyUserViewSet, TabletViewSet, SweepstakeViewSet, SweepwinnerViewSet, SweepUserViewSet, SettingsViewSet, SweepCheckInViewSet, SweepDetailsCheckInViewSet

urlpatterns = [
    url(r'^$', home, name="home"),
    url(r'^sweepusers/$', SweepUserViewSet.as_view()),
    url(r'^sweepusers/(?P<pk>\d+)/$', SweepUserViewSet.as_view()),
    url(r'^tablets/$', TabletViewSet.as_view()),
    url(r'^tablets/(?P<pk>\d+)/$', TabletViewSet.as_view()),
    url(r'^settings/$', SettingsViewSet.as_view()),
    url(r'^generatewinner/$', SweepwinnerViewSet.as_view()),
    url(r'^sweepstakes/$', SweepstakeViewSet.as_view()),
    url(r'^sweepstakes/(?P<pk>\d+)/$', SweepstakeViewSet.as_view()),
    url(r'^sweepcheckin/$', SweepCheckInViewSet.as_view()),
    url(r'^sweepcheckin/(?P<pk>\d+)/$', SweepCheckInViewSet.as_view()),
    url(r'^myusers/$', MyUserViewSet.as_view()),
    url(r'^myusers/(?P<pk>\d+)/$', MyUserViewSet.as_view()),
    url(r'^getsweepdetailslist/$', SweepDetailsCheckInViewSet.as_view()),
]