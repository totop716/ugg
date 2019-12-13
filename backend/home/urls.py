
from django.conf.urls import url, include
from .views import home
from home.api.v1.viewsets import UserLoginViewSet, MyUserViewSet, TabletViewSet, SweepstakeViewSet, MyUploadView, SweepwinnerViewSet, SweepUserViewSet, SettingsViewSet, SweepCheckInViewSet, SweepUserIDViewSet, SweepDetailsCheckInViewSet, SurveyViewSet, SweepTabletRemoveViewSet, SweepAdminRemoveViewSet, AdminUserViewSet

urlpatterns = [
    url(r'^$', home, name="home"),
    url(r'^login/$', UserLoginViewSet.as_view()),
    url(r'^sweepusers/$', SweepUserViewSet.as_view()),
    url(r'^sweepusers/(?P<pk>\d+)/$', SweepUserViewSet.as_view()),
    url(r'^sweepuser/(?P<pk>\d+)/$', SweepUserIDViewSet.as_view()),
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
    url(r'^removesweep_tablet/$', SweepTabletRemoveViewSet.as_view()),
    url(r'^removeadminuser/$', SweepAdminRemoveViewSet.as_view()),
    url(r'^savesurvey/$', SurveyViewSet.as_view()),
    url(r'^savesurvey/(?P<pk>\d+)/$', SurveyViewSet.as_view()),
    url(r'^fileupload/$', MyUploadView.as_view()),
    url(r'^saveadmin_user/$', AdminUserViewSet.as_view()),
    url(r'^saveadmin_user/(?P<pk>\d+)/$', AdminUserViewSet.as_view()),
]