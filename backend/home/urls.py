
from django.conf.urls import url, include
from .views import home
from home.api.v1.viewsets import MyUserViewSet

urlpatterns = [
    url(r'^$', home, name="home"),
    url(r'^myusers/$', MyUserViewSet.as_view()),
    url(r'^myusers/(?P<pk>\d+)/$', MyUserViewSet.as_view()),
]
