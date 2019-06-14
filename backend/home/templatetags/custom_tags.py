from django import template
import datetime
import pytz
import dateutil.parser
from django.utils import timezone
from django.db.models import Q
import dateutil.parser
register = template.Library()

from customauth.models import MyUser
from home.models import Sweepstakes, Tablet, SweepWinner

@register.simple_tag
def gettablets(id):
  tablets = Tablet.objects.filter(Q(name__icontains=id) | Q(address__icontains=id) | Q(city__icontains=id) | Q(state__icontains=id) | Q(zipcode__icontains=id)).order_by('-id')
    
  for tablet in tablets:
    if tablet.sweep_ids != '':
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
    tablets = Tablet.objects.filter(Q(sweep_ids__contains = filter_str) & Q(name__contains = key))
  else:
    tablets = Tablet.objects.filter(Q(sweep_ids__contains = filter_str))

  winners = SweepWinner.objects.filter(Q(sweep_id_id=id) & Q(windate__gt=datetime.datetime.now()-datetime.timedelta(days=1)))
  winner_ids = []
  for winner in winners:
    winner_ids.append(winner.tablet_id_id)
  
  tablet_ids = []
  tabletsData = []
  for tablet in tablets:
    if tablet.id not in winner_ids:
      if tablet.user_id_id != None:
        user = MyUser.objects.filter(Q(id=tablet.user_id_id))
        tablet.user = user[0]
      tablet_ids.append(tablet.id)
      tabletsData.append(tablet)
  return {'data': tabletsData, 'ids': tablet_ids}

@register.simple_tag
def getsweepwinners(id):
  winners = SweepWinner.objects.filter(Q(sweep_id_id=id))
  
  for winner in winners:
    tablet = Tablet.objects.filter(Q(id=winner.tablet_id_id))
    winner.name = tablet[0].name
    user = MyUser.objects.filter(Q(id=tablet[0].user_id_id))
    winner.user = user[0]
    if winner.user.check_time != '':
      winner.checktime = dateutil.parser.parse(winner.user.check_time)
    else:
      winner.checktime = ''
    winner.wintime = dateutil.parser.parse(winner.windate)
  return {'data': winners }

@register.simple_tag
def get_sweepstakedata(id):
  sweepstake = Sweepstakes.objects.filter(Q(id = id))
  return sweepstake[0]

@register.simple_tag
def getsweepstakes(id, current):
  if current:
    sweepstakes = Sweepstakes.objects.filter((Q(name__icontains=id) | Q(disclaimer__icontains=id)) & Q(current=current)).order_by('-id')
  else:
    sweepstakes = Sweepstakes.objects.filter(Q(name__icontains=id) | Q(disclaimer__icontains=id)).order_by('-id')
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
  tablet = Tablet.objects.filter(id = id)
  return tablet[0]

@register.simple_tag
def getselectedsweep(id):
  tablet = Tablet.objects.filter(id = id)
  sweep_ids = tablet[0].sweep_ids[:-1].split(",")
  return sweep_ids

@register.filter
def getdata_by_index(l, i):
    return l[i]
