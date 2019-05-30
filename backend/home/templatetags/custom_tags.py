from django import template
import datetime
import pytz
from django.db.models import Q
register = template.Library()

from customauth.models import MyUser
from home.models import Sweepstakes

@register.simple_tag
def gettablets(id):
  if id:
    tablets = MyUser.objects.filter(Q(tablet_id__contains=id) | Q(address__contains=id) | Q(city__contains=id) | Q(state__contains=id) | Q(zipcode__contains=id)).order_by('id')
  else:
    tablets = MyUser.objects.filter(~Q(tablet_id = '')).order_by('id')
    
  for tablet in tablets:
    if tablet.sweep_ids != ',' and tablet.sweep_ids != '':
      sweep_ids = tablet.sweep_ids[:-1].split(',')
      sweeps = []
      sweeps_id = []
      for sweep_id in sweep_ids:
        sweep = Sweepstakes.objects.filter(id = sweep_id)
        sweeps_id.append(sweep[0].id)
        sweeps.append(sweep[0])
      tablet.sweeps = sweeps
      tablet.sweeps_id = sweeps_id
  return tablets

@register.simple_tag
def gettablets_fromsweepid(id, key):
  filter_str = id+','
  if key:
    tablets = MyUser.objects.filter(Q(sweep_ids__contains = filter_str) & Q(tablet_id__contains = key))
  else:
    tablets = MyUser.objects.filter(Q(sweep_ids__contains = filter_str))
  return tablets

@register.simple_tag
def get_sweepstakedata(id):
  sweepstake = Sweepstakes.objects.filter(id = id)
  return sweepstake[0]

@register.simple_tag
def getsweepstakes():
  sweepstakes = Sweepstakes.objects.all().order_by('-id')
  utc=pytz.UTC
  for sweepstake in sweepstakes:
    if(sweepstake.enddate.replace(tzinfo=pytz.UTC) < datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)):
      Sweepstakes.objects.filter(id = sweepstake.id).update(current=False)
  return sweepstakes

@register.simple_tag
def getcurrentsweepstakes():
  sweepstakes = Sweepstakes.objects.filter(current = 1).order_by('-id')
  return sweepstakes

@register.simple_tag
def gettabletData(id):
  tablet = MyUser.objects.filter(id = id)
  return tablet[0]

@register.simple_tag
def getselectedsweep(id):
  tablet = MyUser.objects.filter(id = id)
  sweep_ids = tablet[0].sweep_ids[:-1].split(",")
  return sweep_ids

@register.filter
def getdata_by_index(l, i):
    return l[i]
