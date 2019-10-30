from django.http import QueryDict

from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from django.core import serializers
from django.http import HttpResponse

from home.api.v1.serializers import UserSerializer, CustomTextSerializer, HomePageSerializer, MyUserSerializer, SweepstakesSerializer, TabletSerializer, SweepwinnerSerializer, SweepUserSerializer, SettingsSerializer, SweepCheckInSerializer
from home.models import CustomText, HomePage
from django.db.models import Q
from django.contrib.auth.models import User
from customauth.models import MyUser
from home.models import Sweepstakes, Tablet, SweepWinner, SweepUser, Settings, SweepCheckIn
import datetime

class SignupViewSet(ModelViewSet):
    serializer_class = SweepUserSerializer
    http_method_names = ['post']

class LoginViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def login(self, request):
        return Response({"username": request.get('username')})

    def create(self, request):
        return ObtainAuthToken().post(request)

class UserLoginViewSet(APIView):
    def post(self, request): 
        data = request.query_params
        username = data.get('username')
        password = data.get('password')
        user = User.objects.filter(Q(username=username))
        if(len(user) > 0):
            if user[0].check_password(password):
                serializer = UserSerializer(user, many=True)
                return Response({"user": serializer.data})
            else:
                return Response({"error": "Password is not correct!"})
        else:
            return Response({"error": "The user with current username does not exist!"})

class TabletViewSet(APIView):
    def get(self, request, pk=None):
        data = request.query_params
        if data.get('tablet_id'):
            if data.get('password'):
                tablet = Tablet.objects.filter(Q(name=data.get('tablet_id')) & Q(password = data.get('password')))
            else:
                tablet = Tablet.objects.filter(Q(name=data.get('tablet_id')) & Q(password = ''))
            serializer = TabletSerializer(tablet, many=True)
            return Response({"tablet": serializer.data})
        elif data.get('tablet_id_code'):
            tablet = Tablet.objects.filter(Q(tablet_id_code=data.get('tablet_id_code')) & Q(login_status = True))
            serializer = TabletSerializer(tablet, many=True)
            return Response({"tablet": serializer.data})
        tablets = Tablet.objects.all()
        serializer = TabletSerializer(tablets, many=True)
        return Response({"tablets": serializer.data})

    def post(self, request):
        data = request.query_params
        tablet = Tablet.objects.create(name = data.get('name'),
            user_id_id = data.get('user_id_id'), tablet_id_code=data.get('tablet_id_code'), password=data.get('password'), confirm_password=data.get('password'), login_status=1)
        tablet.save()

        return Response({"success": "Tablet '{}' created successfully".format(data)})
        
    def put(self, request, pk):
        saved_tablet = get_object_or_404(Tablet.objects.all(), id=pk)
        data = request.query_params
        if data.get('name') != None:
            saved_tablet.name = data.get('name')
        if data.get('user_id_id') != None:
            saved_tablet.user_id_id = data.get('user_id_id')
        if data.get('sweep_ids') != None:
            saved_tablet.sweep_ids = data.get('sweep_ids')
        if data.get('active_sweep') != None:
            saved_tablet.active_sweep = data.get('active_sweep')
        if data.get('login_status') == '1':
            saved_tablet.login_status = True
        elif data.get('login_status') == '0':
            saved_tablet.login_status = False
        if data.get('tablet_id_code') != None:
            saved_tablet.tablet_id_code = data.get('tablet_id_code')
        if data.get('password') != None:
            saved_tablet.password = data.get('password')
            saved_tablet.confirm_password = data.get('password')
        saved_tablet.save()
        return Response({"success": "Tablet '{}' updated successfully".format(data)})


    def delete(self, request, pk):
        # Get object with this pk
        tablet = get_object_or_404(Tablet.objects.all(), id=pk)
        tablet.delete()
        return Response({"message": "Tablet with id `{}` has been deleted.".format(pk)},status=204)

class SettingsViewSet(APIView):
    def get(self, request, pk=None):
        users = Settings.objects.all()
        serializer = SettingsSerializer(users, many=True)
        return Response({"settings": serializer.data})

    def post(self, request):
        data = request.query_params
        settings = Settings.objects.create(device_code = data.get('device_code'))
        settings.save()

        return Response({"success": "Setting '{}' created successfully".format(data)})

    def put(self, request, pk=None):
        saved_setting = Settings.objects.all()
        data = request.query_params
        serializer = SettingsSerializer(instance=saved_setting[0], data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            saved_setting = serializer.save()
        return Response({"success": "Setting '{}' updated successfully".format(data)})

class SweepCheckInViewSet(APIView):
    def get(self, request, pk=None):
        data = request.query_params
        checkin = SweepCheckIn.objects.filter(Q(user_id_id=data.get('user_id')) & Q(tablet_id_id=data.get('tablet_id')) & Q(sweep_id_id=data.get('sweep_id'))).order_by('-check_time').first()
        serializer = SweepCheckInSerializer(checkin)
        return Response({"checkin": serializer.data})

    def post(self, request):
        data = request.query_params
        checkin = SweepCheckIn.objects.create(user_id_id=data.get('user_id'), tablet_id_id=data.get('tablet_id'), sweep_id_id=data.get('sweep_id'), check_time=data.get('check_time'))
        checkin.save()

        return Response({"success": "CheckIn '{}' created successfully".format(data)})

    def put(self, request, pk=None):
        data = request.query_params
        checkin = SweepCheckIn.objects.filter(user_id_id=data.get('user_id'), tablet_id_id=data.get('tablet_id'), sweep_id_id=data.get('sweep_id')).first()
        checkin.check_time = data.get('check_time')
        checkin.save()

        return Response({"success": "CheckIn '{}' updated successfully".format(data)})


class SweepstakeViewSet(APIView):
    def get(self, request, pk=None):
        if pk:
            sweepstake = get_object_or_404(Sweepstakes.objects.all(), id=pk)
            serializer = SweepstakesSerializer(sweepstake)
            return Response({"sweepstake": serializer.data})
        sweepstakes = Sweepstakes.objects.all()
        serializer = SweepstakesSerializer(sweepstakes, many=True)
        return Response({"sweepstakes": serializer.data})

class SweepwinnerViewSet(APIView):
    def post(self, request, pk=None):
        data = request.query_params
        sweep=Sweepstakes.objects.filter(id=data.get('sweep_id'))
        wintablet=SweepCheckIn.objects.filter(id=data.get('winner_id'))
        tablet=Tablet.objects.filter(id=wintablet[0].tablet_id_id)
        user=SweepUser.objects.filter(id=wintablet[0].user_id_id)
        winItem = SweepWinner.objects.create(
            windate=datetime.datetime.now(),
            sweep_id_id=data.get('sweep_id'),
            checkIn_id_id=data.get('winner_id'))
        winItem.save()
        return Response({"success": "{} from {} won in {}".format(user[0].first_name, tablet[0].name, sweep[0].name)})

class MyUserViewSet(APIView):
    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(MyUser.objects.all(), phone=pk)
            serializer = MyUserSerializer(user)
            return Response({"user": serializer.data})
        users = MyUser.objects.all()
        serializer = MyUserSerializer(users, many=True)
        return Response({"users": serializer.data})

    def put(self, request, pk):
        saved_user = get_object_or_404(MyUser.objects.all(), phone=pk)
        data = request.query_params
        serializer = MyUserSerializer(instance=saved_user, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            saved_user = serializer.save()
        return Response({"success": "User '{}' updated successfully".format(data)})


    def delete(self, request, pk):
        # Get object with this pk
        user = get_object_or_404(MyUser.objects.all(), phone=pk)
        user.delete()
        return Response({"message": "User with phone `{}` has been deleted.".format(pk)},status=204)

class SweepDetailsCheckInViewSet(APIView):
    def get(self, request, pk=None):
        query_data = request.query_params
        id = query_data.get('sweep_id')
        key = query_data.get('sweep_key')
        checkin_tablet = SweepCheckIn.objects.select_related('tablet_id')
        checkin_winner = SweepWinner.objects.select_related('checkIn_id')
        winners = SweepWinner.objects.filter(Q(sweep_id_id=id) & Q(windate__gt=datetime.datetime.now()-datetime.timedelta(days=1)))
        winner_ids = []
        for winner in winners:
            winner_ids.append(winner.checkIn_id_id)
        if len(winner_ids) > 0:
            tablets = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key)).exclude(id__in=winner_ids).order_by('check_time')
        else:
            tablets = SweepCheckIn.objects.filter(Q(sweep_id_id=id) & Q(tablet_id__name__icontains= key)).order_by('check_time')
        
        tablet_ids = []
        tabletsData = []
        for tablet in tablets:
            user = SweepUser.objects.filter(Q(id=tablet.user_id_id))
            tablet_data = Tablet.objects.filter(Q(id=tablet.tablet_id_id))
            tablet.user = user[0]
            tablet.tablet_info = tablet_data[0]
            tablet_ids.append(tablet.id)
            tabletsData.append(tablet)

        response=serializers.serialize("json", tabletsData)

        return HttpResponse(response, content_type="application/json")

class SweepUserIDViewSet(APIView):
    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(SweepUser.objects.all(), pk=pk)
            serializer = SweepUserSerializer(user)
            return Response({"user": serializer.data})
        users = SweepUser.objects.all()
        serializer = SweepUserSerializer(users, many=True)
        return Response({"users": serializer.data})

class SweepUserViewSet(APIView):
    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(SweepUser.objects.all(), phone=pk)
            serializer = SweepUserSerializer(user)
            return Response({"user": serializer.data})
        users = SweepUser.objects.all()
        serializer = SweepUserSerializer(users, many=True)
        return Response({"users": serializer.data})

    def put(self, request, pk):
        saved_user = get_object_or_404(SweepUser.objects.all(), phone=pk)
        data = request.query_params
        serializer = SweepUserSerializer(instance=saved_user, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            saved_user = serializer.save()
        return Response({"success": "User '{}' updated successfully".format(data)})


    def delete(self, request, pk):
        # Get object with this pk
        user = get_object_or_404(SweepUser.objects.all(), phone=pk)
        user.delete()
        return Response({"message": "User with phone `{}` has been deleted.".format(pk)},status=204)

class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    http_method_names = ['get', 'put', 'patch']

class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    http_method_names = ['get', 'put', 'patch']