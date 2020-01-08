
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import SignupViewSet, TabletViewSet, LoginViewSet, \
    SweepstakeViewSet, SweepCheckInViewSet, SurveyViewSet, \
    HomePageViewSet, CustomTextViewSet, SettingsViewSet, SweepwinnerViewSet, \
    MyUserViewSet, SurveyDetailsCheckInViewSet, SweepTabletRemoveViewSet, \
    SweepAdminRemoveViewSet, MyUploadView, AdminUserViewSet, \
    SweepDetailsCheckInViewSet, SweepUserViewSet, SweepUserIDViewSet

router = DefaultRouter()
router.register('signup', SignupViewSet, 'signup')
router.register('login', LoginViewSet, 'login')
router.register('customtext', CustomTextViewSet)
router.register('homepage', HomePageViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
    # url(r'^tablets/$', TabletViewSet.as_view()),
    # url(r'^tablets/(?P<pk>\d+)/$', TabletViewSet.as_view()),

    # url(r'^sweepusers/$', SweepUserViewSet.as_view()),
    # url(r'^sweepusers/(?P<pk>\d+)/$', SweepUserViewSet.as_view()),
    # url(r'^sweepuser/(?P<pk>\d+)/$', SweepUserIDViewSet.as_view()),
    # url(r'^settings/$', SettingsViewSet.as_view()),
    # url(r'^generatewinner/$', SweepwinnerViewSet.as_view()),
    # url(r'^sweepstakes/$', SweepstakeViewSet.as_view()),
    # url(r'^sweepstakes/(?P<pk>\d+)/$', SweepstakeViewSet.as_view()),
    # url(r'^sweepcheckin/$', SweepCheckInViewSet.as_view()),
    # url(r'^sweepcheckin/(?P<pk>\d+)/$', SweepCheckInViewSet.as_view()),
    # url(r'^myusers/$', MyUserViewSet.as_view()),
    # url(r'^myusers/(?P<pk>\d+)/$', MyUserViewSet.as_view()),
    # url(r'^getsweepdetailslist/$', SweepDetailsCheckInViewSet.as_view()),
    # url(r'^getsurveydetailslist/$', SurveyDetailsCheckInViewSet.as_view()),
    # url(r'^removesweep_tablet/$', SweepTabletRemoveViewSet.as_view()),
    # url(r'^removeadminuser/$', SweepAdminRemoveViewSet.as_view()),
    # url(r'^savesurvey/$', SurveyViewSet.as_view()),
    # url(r'^savesurvey/(?P<pk>\d+)/$', SurveyViewSet.as_view()),
    # url(r'^fileupload/$', MyUploadView.as_view()),
    # url(r'^saveadmin_user/$', AdminUserViewSet.as_view()),
    # url(r'^saveadmin_user/(?P<pk>\d+)/$', AdminUserViewSet.as_view()),
]
