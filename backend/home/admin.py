from django.contrib import admin

# Register your models here.

from django.contrib.sites.models import Site
from django.contrib.auth.models import User

from .models import Entry, Lottery

admin.site.register(Entry)
admin.site.register(Lottery)

admin.site.unregister(Site)
admin.site.unregister(User)