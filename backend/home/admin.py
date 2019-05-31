from django.contrib import admin

# Register your models here.

from django.contrib.sites.models import Site
from django.contrib.auth.models import User

from .models import Entry, Lottery, Sweepstakes, Tablet

class SweepstakesAdmin(admin.ModelAdmin):
    fields =  ('name','startdate','enddate','logo','background','disclaimer','current')
    list_display = ('name','startdate','enddate','logo','background','disclaimer','current')
    search_fields = ('name','startdate','enddate','logo','background','disclaimer','current')

admin.site.register(Sweepstakes, SweepstakesAdmin)

class TabletAdmin(admin.ModelAdmin):
    fields =  ('name','address','city','state','zipcode','user_id')
    list_display = ('name','address','city','state','zipcode')
    search_fields = ('name','address','city','state','zipcode')

admin.site.register(Tablet, TabletAdmin)

admin.site.unregister(Site)
admin.site.unregister(User)
