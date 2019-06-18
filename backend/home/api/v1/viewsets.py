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

from home.api.v1.serializers import CustomTextSerializer, HomePageSerializer, MyUserSerializer, SweepstakesSerializer, TabletSerializer, SweepwinnerSerializer, SweepUserSerializer, SettingsSerializer, SweepCheckInSerializer
from home.models import CustomText, HomePage
from django.db.models import Q
from customauth.models import MyUser
from home.models import Sweepstakes, Tablet, SweepWinner, SweepUser, Settings, SweepCheckIn
import datetime

class SignupViewSet(ModelViewSet):
    serializer_class = SweepUserSerializer
    http_method_names = ['post']

class LoginViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().post(request)

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
        tablets = Tablet.objects.all()
        serializer = TabletSerializer(tablets, many=True)
        return Response({"tablets": serializer.data})

    def post(self, request):
        data = request.query_params
        tablet = Tablet.objects.create(name = data.get('name'),
            user_id_id = data.get('user_id_id'), tablet_id_code=data.get('tablet_id_code'), password=data.get('password'), confirm_password=data.get('password'))
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
        winItem = SweepWinner.objects.create(
            windate=datetime.datetime.now(),
            sweep_id_id=data.get('sweep_id'),
            checkIn_id_id=data.get('winner_id'))
        winItem.save()
        return Response({"success": "'{}' won in '{}'".format(tablet[0].name, sweep[0].name)})

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

