from django import template
import datetime
import pytz
import math
import dateutil.parser
from django.utils import timezone
from django.db.models import Q, Max, F, Count
import dateutil.parser
register = template.Library()

from home.models import Sweepstakes, Tablet, SweepWinner, SweepUser, SweepCheckIn

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
def gettablets_fromsweepid(id, key, pagenumber):
  checkin_tablet = SweepCheckIn.objects.select_related('tablet_id')
  checkin_winner = SweepWinner.objects.select_related('checkIn_id')
  winners = SweepWinner.objects.filter(Q(sweep_id_id=id) & Q(windate__gt=datetime.datetime.now()-datetime.timedelta(days=1)))
  winner_ids = []
  for winner in winners:
    winner_ids.append(winner.checkIn_id_id)
  page_number = 0
  if pagenumber != '':
    page_number = int(pagenumber)
  if len(winner_ids) > 0:
    tablets = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key)).exclude(id__in=winner_ids).order_by('check_time')[page_number*100:(page_number+1)*100]
  else:
    tablets = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key)).order_by('check_time')[page_number*100:(page_number+1)*100]

  if len(winner_ids) > 0:
    tablets1 = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key)).exclude(id__in=winner_ids).order_by('check_time')
  else:
    tablets1 = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key)).order_by('check_time')
  
  tablet_ids = []
  tabletsData = []
  for tablet in tablets:
    user = SweepUser.objects.filter(Q(id=tablet.user_id_id))
    tablet_data = Tablet.objects.filter(Q(id=tablet.tablet_id_id))
    tablet.user = user[0]
    tablet.tablet_info = tablet_data[0]
    tabletsData.append(tablet)

  for tablet in tablets1:
    tablet_ids.append(tablet.id)
  return {'data':tabletsData, 'ids':tablet_ids}

@register.simple_tag
def getcheckincount_fromarray(id, key, pagenumber):
  checkin_tablet = SweepCheckIn.objects.select_related('tablet_id')
  checkin_winner = SweepWinner.objects.select_related('checkIn_id')
  winners = SweepWinner.objects.filter(Q(sweep_id_id=id) & Q(windate__gt=datetime.datetime.now()-datetime.timedelta(days=1)))
  winner_ids = []
  for winner in winners:
    winner_ids.append(winner.checkIn_id_id)
  if len(winner_ids) > 0:
    tablets = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key)).exclude(id__in=winner_ids)
  else:
    tablets = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key))

  if len(tablets)%100 == 0:
    pagecount = list(range(0, math.floor(len(tablets)/100)))
  else:
    pagecount = list(range(0, math.floor(len(tablets)/100)+1))
  
  pagecount1 = []
  counter = 0
  page_number = 0
  if pagenumber != '':
    page_number = int(pagenumber)
  for page in pagecount:
    if page > page_number - 3 and page < page_number + 3 or page > len(pagecount) - 2 or page < 2:
      counter = 0
      pagecount1.append(page)
    else:
      counter = counter + 1
      if counter == 1:
        pagecount1.append("sis")
  return {'pagecount': pagecount1, 'totalcount': len(tablets)}

@register.simple_tag
def getcheckinindexes(tabletscount, page):
  pagenumber = 0
  if page != '':
    pagenumber = int(page)

  if pagenumber*100+100 > tabletscount:
    page_max = tabletscount
  else:
    page_max = pagenumber*100+100

  checkinIndexes = [pagenumber*100+1, page_max]
  return checkinIndexes

@register.simple_tag
def getsweepwinners(id):
  winners = SweepWinner.objects.filter(Q(sweep_id_id=id))
  
  for winner in winners:
    checkin = SweepCheckIn.objects.filter(Q(id=winner.checkIn_id_id))
    tablet = Tablet.objects.filter(Q(id=checkin[0].tablet_id_id))
    winner.name = tablet[0].name
    user = SweepUser.objects.filter(Q(id=checkin[0].user_id_id))
    winner.user = user[0]
    if checkin[0].check_time != '':
      winner.checktime = checkin[0].check_time
    else:
      winner.checktime = ''
    winner.wintime = winner.windate
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

@register.simple_tag
def getdata_by_index(l, i, p):
  if p:
    return l[i+int(p)*20]
  else:
    return l[i]
