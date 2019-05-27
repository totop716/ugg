from django.contrib import admin

# Register your models here.

from django.contrib.sites.models import Site
from django.contrib.auth.models import User

from .models import Entry, Lottery, Sweepstakes

class SweepstakesAdmin(admin.ModelAdmin):
    fields =  ('name','startdate','enddate','logo','background','disclaimer','current')
    list_display = ('name','startdate','enddate','logo','background','disclaimer','current')
    search_fields = ('name','startdate','enddate','logo','background','disclaimer','current')

admin.site.register(Sweepstakes, SweepstakesAdmin)

admin.site.unregister(Site)
admin.site.unregister(User)
