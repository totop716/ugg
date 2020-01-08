from django.http import QueryDict

from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser

from django.core import serializers
from django.http import HttpResponse

from home.api.v1.serializers import UserSerializer, CustomTextSerializer, HomePageSerializer, MyUserSerializer, SweepstakesSerializer, TabletSerializer, SweepwinnerSerializer, SweepUserSerializer, SettingsSerializer, SweepCheckInSerializer, SurveyAnswerImageSerializer, SurveyAnswerTextSerializer, SurveySerializer, SurveyQuestionsSerializer
from home.models import CustomText, HomePage
from django.db.models import Q
from django.contrib.auth.models import User
from customauth.models import MyUser
from home.models import Sweepstakes, Tablet, SweepWinner, SweepUser, Settings, SweepCheckIn, Survey, SurveyQuestions, SurveyAnswerText, SurveyAnswerImage
from datetime import date
import base64 

class MyUploadView(APIView):
    parser_class = (FileUploadParser,)

    def put(self, request, format=None):
        f = request.FILES

        survey_answer_images = SurveyAnswerImage.objects.filter(survey_id=request.query_params.get('survey_id'))
        i = 0
        for survey_answer_image in survey_answer_images:
            i = i+1
            if 'question_'+survey_answer_image.question_number+'_question_answer_image_'+str(i) in f:
                survey_answer_image.option_image = f['question_'+survey_answer_image.question_number+'_question_answer_image_'+str(i)]
                survey_answer_image.save()
        return Response({'message': 'sucessfully updated'})

class SignupViewSet(ModelViewSet):
    serializer_class = SweepUserSerializer
    http_method_names = ['post']


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                "email": user.email
            }
        })


class LoginViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def login(self, request):
        return Response({"username": request.get('username')})

    def create(self, request):
        return CustomAuthToken().post(request)

class SweepTabletRemoveViewSet(APIView):
    def get(self, request): 
        data = request.query_params
        sweep_id = data.get('sweep_id')
        tablet_id = data.get('tablet_id')
        tablet = Tablet.objects.filter(Q(id=tablet_id))[0]
        sweep_ids = tablet.sweep_ids
        sweep_ids = sweep_ids.replace(sweep_id+',', '')
        tablet.sweep_ids = sweep_ids
        tablet.active_sweep = ''
        tablet.save()
        return Response({'message': 'successfully removed'})

class SweepAdminRemoveViewSet(APIView):
    def get(self, request): 
        data = request.query_params
        user_id = data.get('user_id')
        user = get_object_or_404(User.objects.all(), id=user_id)
        user.delete()
        return Response({'message': 'successfully removed'})

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

class SurveyViewSet(APIView):
    def get(self, request, pk=None):
        saved_survey = Survey.objects.filter(pk=pk)
        survey_questions = []
        if saved_survey[0].question_1 != None:
            survey_questions.append(saved_survey[0].question_1)
        if saved_survey[0].question_2 != None:
            survey_questions.append(saved_survey[0].question_2)
        if saved_survey[0].question_3 != None:
            survey_questions.append(saved_survey[0].question_3)
        if saved_survey[0].question_4 != None:
            survey_questions.append(saved_survey[0].question_4)
        if saved_survey[0].question_5 != None:
            survey_questions.append(saved_survey[0].question_5)
        if saved_survey[0].question_6 != None:
            survey_questions.append(saved_survey[0].question_6)
        if saved_survey[0].question_7 != None:
            survey_questions.append(saved_survey[0].question_7)
        if saved_survey[0].question_8 != None:
            survey_questions.append(saved_survey[0].question_8)
        if saved_survey[0].question_9 != None:
            survey_questions.append(saved_survey[0].question_9)
        if saved_survey[0].question_10 != None:
            survey_questions.append(saved_survey[0].question_10)
        
        answers_text_array = []
        answers_image_array = []
        for question in survey_questions:
            if question.question_type == "1":
                survey_answers_text = SurveyAnswerText.objects.filter(option_question_id=question.id)
                for answer in survey_answers_text:
                    answers_text_array.append(answer)
            else:
                survey_answers_image = SurveyAnswerImage.objects.filter(option_question_id=question.id)
                for answer in survey_answers_image:
                    answers_image_array.append(answer)
            
        return Response({"surveys": SurveySerializer(saved_survey, many=True).data, "questions": SurveyQuestionsSerializer(survey_questions, many=True).data, "answer_text": SurveyAnswerTextSerializer(answers_text_array, many=True).data, "answer_image": SurveyAnswerImageSerializer(answers_image_array, many=True).data })

    def post(self, request):
        questions_data = []
        for i in range(0, int(request.data.get('questions_count'))):
            if request.data.get('question_'+str(i+1)+'_choice') == '1':
                option_count = request.data.get('question_'+str(i+1)+'_number_of_options')
            else:
                option_count = request.data.get('question_'+str(i+1)+'_question_answer_image_number')

            survey_question = SurveyQuestions.objects.create(question_type = request.data.get('question_'+str(i+1)+'_choice'), question_text=request.data.get('question_'+str(i+1)+'_question_text'), options_count = option_count)
            survey_question.save()
            questions_data.append(survey_question)
            if request.data.get('question_'+str(i+1)+'_choice') == '1':
                for j in range(0, int(option_count)):
                    survey_answer_text = SurveyAnswerText.objects.create(option_text = request.data.get('question_'+str(i+1)+'_question_answer_text_'+str(j+1)), option_complete = request.data.get('question_'+str(i+1)+'_question_answer_complete_'+str(j+1)), option_goquestion=request.data.get('question_'+str(i+1)+'_question_answer_option_'+str(j+1)), option_question=survey_question)
                    survey_answer_text.save()
            else:
                for j in range(0, int(option_count)):
                    survey_answer_image = SurveyAnswerImage.objects.create(option_image = request.data.get('question_'+str(i+1)+'_question_answer_image_'+str(j+1)), option_tag = request.data.get('question_'+str(i+1)+'_question_answer_image_text_'+str(j+1)), option_complete = request.data.get('question_'+str(i+1)+'_question_answer_image_complete_'+str(j+1)), option_goquestion=request.data.get('question_'+str(i+1)+'_question_answer_image_option_'+str(j+1)), option_question=survey_question)
                    survey_answer_image.save()

        survey = Survey.objects.create(name = request.data.get('name'), questions_count = request.data.get('questions_count'), created_date = date.today(), question_1=questions_data[0] if len(questions_data) >= 1 else None, question_2=questions_data[1] if len(questions_data) >= 2 else None, question_3=questions_data[2] if len(questions_data) >= 3 else None, question_4=questions_data[3] if len(questions_data) >= 4 else None, question_5=questions_data[4] if len(questions_data) >= 5 else None, question_6=questions_data[5] if len(questions_data) >= 6 else None, question_7=questions_data[6] if len(questions_data) >= 7 else None, question_8=questions_data[7] if len(questions_data) >= 8 else None, question_9=questions_data[8] if len(questions_data) >= 9 else None, question_10=questions_data[9] if len(questions_data) >= 10 else None)
        survey.save()

        return Response({"success": "Survey '{}' created successfully".format(survey)})
    
    def put(self, request, pk=None):
        saved_survey = Survey.objects.filter(id=pk).first()
        for i in range(0, int(request.data.get('questions_count'))):
            if request.data.get('question_'+str(i+1)+'_choice') == '1':
                option_count = request.data.get('question_'+str(i+1)+'_number_of_options')
            else:
                option_count = request.data.get('question_'+str(i+1)+'_question_answer_image_number')

            if i < int(saved_survey.questions_count):
                if i == 0:
                    survey_question = saved_survey.question_1
                elif i == 1:
                    survey_question = saved_survey.question_2
                elif i == 2:
                    survey_question = saved_survey.question_3
                elif i == 3:
                    survey_question = saved_survey.question_4
                elif i == 4:
                    survey_question = saved_survey.question_5
                elif i == 5:
                    survey_question = saved_survey.question_6
                elif i == 6:
                    survey_question = saved_survey.question_7
                elif i == 7:
                    survey_question = saved_survey.question_8
                elif i == 8:
                    survey_question = saved_survey.question_9
                elif i == 9:
                    survey_question = saved_survey.question_10
                survey_question.question_type = request.data.get('question_'+str(i+1)+'_choice')
                survey_question.question_text = request.data.get('question_'+str(i+1)+'_question_text')
                survey_question.options_count = option_count
                survey_question.save()
            else:
                survey_question = SurveyQuestions.objects.create(question_type = request.data.get('question_'+str(i+1)+'_choice'), question_text=request.data.get   ('question_'+str(i+1)+'_question_text'), options_count = option_count)
                survey_question.save()
                if i == 0:
                    saved_survey.question_1 = survey_question
                elif i == 1:
                    saved_survey.question_2 = survey_question
                elif i == 2:
                    saved_survey.question_3 = survey_question
                elif i == 3:
                    saved_survey.question_4 = survey_question
                elif i == 4:
                    saved_survey.question_5 = survey_question
                elif i == 5:
                    saved_survey.question_6 = survey_question
                elif i == 6:
                    saved_survey.question_7 = survey_question
                elif i == 7:
                    saved_survey.question_8 = survey_question
                elif i == 8:
                    saved_survey.question_9 = survey_question
                elif i == 9:
                    saved_survey.question_10 = survey_question

            survey_answer_texts = SurveyAnswerText.objects.filter(option_question_id=survey_question.id)
            for answer_text in survey_answer_texts:
                answer_text.delete()
            survey_answer_images = SurveyAnswerImage.objects.filter(option_question_id=survey_question.id)
            for answer_image in survey_answer_images:
                answer_image.delete()
            
            if request.data.get('question_'+str(i+1)+'_choice') == '1':
                for j in range(0, int(option_count)):
                    survey_answer_text = SurveyAnswerText.objects.create(option_text = request.data.get('question_'+str(i+1)+'_question_answer_text_'+str(j+1)), option_complete = request.data.get('question_'+str(i+1)+'_question_answer_complete_'+str(j+1)), option_goquestion=request.data.get('question_'+str(i+1)+'_question_answer_option_'+str(j+1)), option_question=survey_question)
                    survey_answer_text.save()
            else:
                for j in range(0, int(option_count)):
                    survey_answer_image = SurveyAnswerImage.objects.create(option_image = request.data.get('question_'+str(i+1)+'_question_answer_imagename_'+str(j+1)), option_tag = request.data.get('question_'+str(i+1)+'_question_answer_image_text_'+str(j+1)), option_complete = request.data.get('question_'+str(i+1)+'_question_answer_image_complete_'+str(j+1)), option_goquestion=request.data.get('question_'+str(i+1)+'_question_answer_image_option_'+str(j+1)), option_question=survey_question, survey_id=saved_survey.id, question_number=i+1)
                    survey_answer_image.save()

        for i in range(int(request.data.get('questions_count')), 10):
            if i == 0:
                saved_survey.question_1 = None
            elif i == 1:
                saved_survey.question_2 = None
            elif i == 2:
                saved_survey.question_3 = None
            elif i == 3:
                saved_survey.question_4 = None
            elif i == 4:
                saved_survey.question_5 = None
            elif i == 5:
                saved_survey.question_6 = None
            elif i == 6:
                saved_survey.question_7 = None
            elif i == 7:
                saved_survey.question_8 = None
            elif i == 8:
                saved_survey.question_9 = None
            elif i == 9:
                saved_survey.question_10 = None

        saved_survey.name = request.data.get('name')
        saved_survey.questions_count=request.data.get('questions_count')
        saved_survey.save()

        return Response({"success": "Survey updated successfully"})
    
    def delete(self, request, pk):
        # Get object with this pk
        saved_survey = get_object_or_404(Survey.objects.all(), pk=pk)
        saved_survey.delete()
        return Response({"message": "Survey has been deleted."},status=204)

class SweepCheckInViewSet(APIView):
    def get(self, request, pk=None):
        data = request.query_params
        checkin = SweepCheckIn.objects.filter(Q(user_id_id=data.get('user_id')) & Q(tablet_id_id=data.get('tablet_id')) & Q(sweep_id_id=data.get('sweep_id'))).order_by('-check_time').first()
        
        # add end sweepstakes logic
        if checkin is not None:
            return Response({"message": "You have already checked into The Office today. Come back and check in again tomorrow!"},status=422)
        
        serializer = SweepCheckInSerializer(checkin)
        return Response({"checkin": serializer.data})

    def post(self, request):
        data = request.query_params
        checkin = SweepCheckIn.objects.create(user_id_id=data.get('user_id'), tablet_id_id=data.get('tablet_id'), sweep_id_id=data.get('sweep_id'), check_time=data.get('check_time'), survey_enter_time=data.get('survey_enter_time'))
        checkin.survey_question_1 = data.get('survey_question_1')
        checkin.survey_question_2 = data.get('survey_question_2')
        checkin.survey_question_3 = data.get('survey_question_3')
        checkin.survey_question_4 = data.get('survey_question_4')
        checkin.survey_question_5 = data.get('survey_question_5')
        checkin.survey_question_6 = data.get('survey_question_6')
        checkin.survey_question_7 = data.get('survey_question_7')
        checkin.survey_question_8 = data.get('survey_question_8')
        checkin.survey_question_9 = data.get('survey_question_9')
        checkin.survey_question_10 = data.get('survey_question_10')
        checkin.save()

        return Response({"success": "CheckIn '{}' created successfully".format(data)})

    def put(self, request, pk=None):
        data = request.query_params
        checkins = SweepCheckIn.objects.filter(user_id_id=data.get('user_id'), tablet_id_id=data.get('tablet_id'), sweep_id_id=data.get('sweep_id'))
        if len(checkins) >= 1:
            checkin = checkins[0]
            if data.get('check_time') != None:
                checkin.check_time = data.get('check_time')
            if data.get('survey_enter_time') != None:
                checkin.survey_enter_time = data.get('survey_enter_time')
        else:
            checkin = SweepCheckIn.objects.create(user_id_id=data.get('user_id'), tablet_id_id=data.get('tablet_id'), sweep_id_id=data.get('sweep_id'), check_time=data.get('check_time'), survey_enter_time=data.get('survey_enter_time'))
        checkin.survey_question_1 = data.get('survey_question_1')
        checkin.survey_question_2 = data.get('survey_question_2')
        checkin.survey_question_3 = data.get('survey_question_3')
        checkin.survey_question_4 = data.get('survey_question_4')
        checkin.survey_question_5 = data.get('survey_question_5')
        checkin.survey_question_6 = data.get('survey_question_6')
        checkin.survey_question_7 = data.get('survey_question_7')
        checkin.survey_question_8 = data.get('survey_question_8')
        checkin.survey_question_9 = data.get('survey_question_9')
        checkin.survey_question_10 = data.get('survey_question_10')
        checkin.save()

        return Response({"success": "CheckIn '{}' updated successfully".format(data)})

class AdminUserViewSet(APIView):
    def post(self, request):
        adminuser = User.objects.create(username=request.data.get('admin_username'), email="admin@example.com")
        adminuser.set_password(request.data.get('admin_password'))
        adminuser.save()

        return Response({"success": "Admin User created successfully"})

    def put(self, request, pk=None):
        data = request.query_params
        adminuser = User.objects.filter(id=data.get('user_id'))[0]
        adminuser.username = request.data.get('admin_username')
        adminuser.set_password(request.data.get('admin_password'))
        adminuser.save()

        return Response({"success": "Admin User updated successfully"})


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

class SurveyDetailsCheckInViewSet(APIView):
    def get(self, request, pk=None):
        query_data = request.query_params
        survey_id = query_data.get('survey_id')
        sweepstakes = Sweepstakes.objects.filter(Q(survey1_name_id=survey_id) | Q(survey2_name_id=survey_id))
        survey_checkin = []
        for sweepstake in sweepstakes:
            checkins = SweepCheckIn.objects.filter(Q(sweep_id_id=sweepstake.id))
            for checkin in checkins:
                survey_checkin.append(checkin)

        response=serializers.serialize("json", survey_checkin)

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
    
    def delete(self, request, pk=None):
        user = get_object_or_404(SweepUser.objects.all(), pk=pk)
        user.delete()
        return Response({"message": "User with ID `{}` has been deleted.".format(pk)},status=204)

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