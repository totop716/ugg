from django import template
from django.db.models import Q
register = template.Library()

from customauth.models import MyUser
from home.models import Sweepstakes

@register.simple_tag
def gettablets():
  tablets = MyUser.objects.filter(~Q(tablet_id = ''))
  for tablet in tablets:
    if tablet.sweep_ids != '':
      sweep_ids = tablet.sweep_ids[:-1].split(',')
      sweeps = []
      for sweep_id in sweep_ids:
        sweep = Sweepstakes.objects.filter(id = sweep_id)
        sweeps.append(sweep[0])
      tablet.sweeps = sweeps
  return tablets

@register.simple_tag
def gettablets_fromsweepid(id):
  filter_str = id+','
  tablets = MyUser.objects.filter(Q(sweep_ids__contains = filter_str))
  return tablets

@register.simple_tag
def get_sweepstakedata(id):
  sweepstake = Sweepstakes.objects.filter(id = id)
  return sweepstake[0]

@register.simple_tag
def getsweepstakes():
  sweepstakes = Sweepstakes.objects.all().order_by('-id')
  return sweepstakes

@register.filter
def getid_by_index(l, i):
    return l[i].id