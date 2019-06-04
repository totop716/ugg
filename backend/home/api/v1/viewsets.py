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

from home.api.v1.serializers import CustomTextSerializer, HomePageSerializer, MyUserSerializer, SweepstakesSerializer, TabletSerializer, SweepwinnerSerializer, SweepUserSerializer
from home.models import CustomText, HomePage
from django.db.models import Q
from customauth.models import MyUser
from home.models import Sweepstakes, Tablet, SweepWinner, SweepUser
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
        if pk:
            user = get_object_or_404(Tablet.objects.all(), user_id_id=pk)
            serializer = TabletSerializer(user)
            return Response({"tablet": serializer.data})
        data = request.query_params
        tablets = Tablet.objects.all()
        serializer = TabletSerializer(tablets, many=True)
        return Response({"tablets": serializer.data})

    def post(self, request):
        data = request.query_params
        tablet = Tablet.objects.create(name = data.get('name'),
            user_id_id = data.get('user_id_id'))
        tablet.save()

        return Response({"success": "Tablet '{}' created successfully".format(data)})
        
    def put(self, request, pk):
        saved_tablet = get_object_or_404(Tablet.objects.all(), id=pk)
        data = request.query_params
        serializer = TabletSerializer(instance=saved_tablet, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            saved_tablet = serializer.save()
        return Response({"success": "Tablet '{}' updated successfully".format(data)})


    def delete(self, request, pk):
        # Get object with this pk
        tablet = get_object_or_404(Tablet.objects.all(), id=pk)
        tablet.delete()
        return Response({"message": "Tablet with id `{}` has been deleted.".format(pk)},status=204)

class SweepUserViewSet(APIView):
    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(SweepUser.objects.all(), phone=pk)
            serializer = SweepUserSerializer(user)
            return Response({"user": serializer.data})
        data = request.query_params
        users = SweepUser.objects.all()
        serializer = SweepUserSerializer(users, many=True)
        return Response({"users": serializer.data})

    def put(self, request, pk):
        saved_user = get_object_or_404(SweepUser.objects.all(), id=pk)
        data = request.query_params
        serializer = SweepUserSerializer(instance=saved_user, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            saved_user = serializer.save()
        return Response({"success": "User '{}' updated successfully".format(data)})


    def delete(self, request, pk):
        # Get object with this pk
        user = get_object_or_404(SweepUser.objects.all(), id=pk)
        user.delete()
        return Response({"message": "User with id `{}` has been deleted.".format(pk)},status=204)

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
        wintablet=Tablet.objects.filter(id=data.get('winner_id'))
        winItem = SweepWinner.objects.create(
            windate=datetime.datetime.now(),
            sweep_id_id=data.get('sweep_id'),
            tablet_id_id=data.get('winner_id'))
        winItem.save()
        return Response({"success": "'{}' won in '{}'".format(wintablet[0].name, sweep[0].name)})

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

