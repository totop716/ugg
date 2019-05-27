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
      sweep_ids = tablet.sweep_ids.split(',')
      sweeps = []
      for sweep_id in sweep_ids:
        sweep = Sweepstakes.objects.filter(id = sweep_id)
        sweeps.append(sweep[0])
      tablet.sweeps = sweeps
  return tablets