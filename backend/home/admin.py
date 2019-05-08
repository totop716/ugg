from django.contrib import admin

# Register your models here.

from django.contrib.auth.models import Group
from django.contrib.sites.models import Site

from .models import Entry, Lottery

admin.site.register(Entry)
admin.site.register(Lottery)

admin.site.unregister(Group)
admin.site.unregister(Site)