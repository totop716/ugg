from django.db import models

# Create your models here.

from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from customauth.models import MyUser


class CustomText(models.Model):
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title

    @property
    def api(self):
        return f'/api/v1/customtext/{self.id}/'

    @property
    def field(self):
        return 'title'


class HomePage(models.Model):
    body = models.TextField()

    @property
    def api(self):
        return f'/api/v1/homepage/{self.id}/'

    @property
    def field(self):
        return 'body'

class Entry(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        verbose_name_plural = 'Entries'
    
    def __str__(self):
        return self.name

    @property
    def api(self):
        return f'/api/v1/entry/{self.id}/'
    @property
    def field(self):
        return 'name'

class Lottery(models.Model):
    name = models.CharField(max_length=100)
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'Lotteries'
    
    def __str__(self):
        return self.name

    @property
    def api(self):
        return f'/api/v1/lottery/{self.id}/'
    @property
    def field(self):
        return 'name'

class Settings(models.Model):
    device_code = models.CharField(max_length=100)
    class Meta:
        verbose_name_plural = 'Settings'
    
    def __str__(self):
        return self.device_code

    @property
    def api(self):
        return f'/api/v1/settings/{self.id}/'
    @property
    def field(self):
        return 'device_code'

class Participants(models.Model):
    name = models.CharField(max_length=100)
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'Lotteries'
    
    def __str__(self):
        return self.name

    @property
    def api(self):
        return f'/api/v1/lottery/{self.id}/'
    @property
    def field(self):
        return 'name'

class SurveyQuestions(models.Model):
    question_type = models.CharField('Question 1', choices=(('type_1', 'Multiple Choice'), ('type_2', 'Multiple Choice (Images)')), max_length=10)
    question_text = models.TextField("Question")
    options_count = models.CharField('Number of Options', choices=((2, 2), (3, 3), (4, 4), (5, 5), (6, 6)), max_length=10)

    class Meta:
        verbose_name_plural = 'surveyquestion'
    
    def __str__(self):
        return self.question_text

class SurveyAnswerText(models.Model):
    option_text = models.TextField()
    option_complete = models.CharField('', choices=(('goto', 'If selected, go to question '), ('complete', 'If selected, complete survey')), max_length=10)
    option_goquestion = models.CharField('', choices=((2, 2), (3, 3), (4, 4), (5, 5), (6, 6)), max_length=10)
    option_question = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'surveyanswertext'
    
    def __str__(self):
        return self.option_text

class SurveyAnswerImage(models.Model):
    option_image = models.ImageField()
    option_tag = models.CharField(max_length = 100)
    option_complete = models.CharField('', choices=(('goto', 'If selected, go to question '), ('complete', 'If selected, complete survey')), max_length=10)
    option_goquestion = models.CharField('', choices=((2, 2), (3, 3), (4, 4), (5, 5), (6, 6)), max_length=10)
    option_question = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE)
    question_number = models.CharField('', max_length=2, null=True, blank=True)
    survey_id = models.CharField('', max_length=10, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'surveyanswerimage'
    
    def __str__(self):
        return self.option_tag

class Survey(models.Model):
    name = models.CharField('Survey Name', max_length=100)
    questions_count = models.CharField('Number of Questions', choices=(('1', '1'),('2', '2'),('3', '3'),('4', '4'),('5', '5'),('6', '6'),('7', '7'),('8', '8'),('9', '9'),('10', '10')), default=1, max_length=2)
    created_date = models.CharField('Date Created', max_length = 100)
    question_1 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_1', blank=True, null=True)
    question_2 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_2', blank=True, null=True)
    question_3 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_3', blank=True, null=True)
    question_4 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_4', blank=True, null=True)
    question_5 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_5', blank=True, null=True)
    question_6 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_6', blank=True, null=True)
    question_7 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_7', blank=True, null=True)
    question_8 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_8', blank=True, null=True)
    question_9 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_9', blank=True, null=True)
    question_10 = models.ForeignKey(SurveyQuestions, on_delete=models.CASCADE, related_name='question_10', blank=True, null=True)

    class Meta:
        verbose_name_plural = 'survey'
    
    def __str__(self):
        return self.name

    @property
    def api(self):
        return f'/api/v1/survey/{self.id}/'
    @property
    def field(self):
        return 'name'

class SweepUser(models.Model):
    first_name = models.CharField("First Name", max_length =50)
    last_name = models.CharField("Last Name", max_length =50)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        blank=True
    )
    USStates = (
        ("AL", "Alabama" ),
        ("AK", "Alaska"),
        ("AS", "American Samoa"),
        ("AZ", "Arizona"),
        ("AR", "Arkansas"),
        ("CA", "California"),
        ("CO", "Colorado"),
        ("CT", "Connecticut"),
        ("DE", "Delaware"),
        ("DC", "District Of Columbia"),
        ("FM", "Federated States Of Micronesia"),
        ("FL", "Florida"),
        ("GA", "Georgia"),
        ("GU", "Guam"),
        ("HI", "Hawaii"),
        ("ID", "Idaho"),
        ("IL", "Illinois"),
        ("IN", "Indiana"),
        ("IA", "Iowa"),
        ("KS", "Kansas"),
        ("KY", "Kentucky"),
        ("LA", "Louisiana"),
        ("ME", "Maine"),
        ("MH", "Marshall Islands"),
        ("MD", "Maryland"),
        ("MA", "Massachusetts"),
        ("MI", "Michigan"),
        ("MN", "Minnesota"),
        ("MS", "Mississippi"),
        ("MO", "Missouri"),
        ("MT", "Montana"),
        ("NE", "Nebraska"),
        ("NV", "Nevada"),
        ("NH", "New Hampshire"),
        ("NJ", "New Jersey"),
        ("NM", "New Mexico"),
        ("NY", "New York"),
        ("NC", "North Carolina"),
        ("ND", "North Dakota"),
        ("MP", "Northern Mariana Islands"),
        ("OH", "Ohio"),
        ("OK", "Oklahoma"),
        ("OR", "Oregon"),
        ("PW", "Palau"),
        ("PA", "Pennsylvania"),
        ("PR", "Puerto Rico"),
        ("RI", "Rhode Island"),
        ("SC", "South Carolina"),
        ("SD", "South Dakota"),
        ("TN", "Tennessee"),
        ("TX", "Texas"),
        ("UT", "Utah"),
        ("VT", "Vermont"),
        ("VI", "Virgin Islands"),
        ("VA", "Virginia"),
        ("WA", "Washington"),
        ("WV", "West Virginia"),
        ("WI", "Wisconsin"),
        ("WY", "Wyoming"))
    address = models.CharField(max_length =200)
    city = models.CharField(max_length =50)
    state = models.CharField(max_length =50, choices=USStates, default="IL")
    zipcode = models.CharField(max_length =5)
    phone = models.CharField(max_length =50, unique=True, help_text="Please input Phone No in this format ( ex: 12345667889 or 2345678890)")
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    check_time = models.CharField(max_length =200, null=True)
    suite_po_box = models.CharField("Suite/PO Box", max_length =50, default='')
    label = models.CharField(max_length = 100, default="Added by Admin")
    password = models.CharField(max_length = 100, default='', blank=True)
    checkSMS = models.BooleanField('SMS', default=False)
    checkEmail = models.BooleanField('Email', default=False)

    class Meta:
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.email

    @property
    def api(self):
        return f'/api/v1/sweepusers/{self.phone}/'
    @property
    def field(self):
        return 'email'

class Sweepstakes(models.Model):
    name = models.CharField(max_length=100)
    startdate = models.DateTimeField(help_text="Time is in UTC - 5")
    enddate = models.DateTimeField(help_text="Time is in UTC - 5")
    logo = models.ImageField()
    background = models.ImageField()
    disclaimer = models.TextField()
    fontsize = models.IntegerField()
    current = models.BooleanField()
    disclaimer_color = models.CharField("Disclaimer Font Color", max_length=7)
    header_text = models.CharField("Header Text", max_length=100)
    header_font_size = models.IntegerField("Header Font Size")
    header_hex_color = models.CharField("Header Hex Color", max_length=7)
    button_header_hex_color = models.CharField("Button/Header Hex Color", max_length=7)
    button_header_font_color = models.CharField("Button/Header Font Hex Color", max_length=7)
    can_generate_winner_multiple_times = models.CharField(max_length = 5)
    generate_winner_for_each_tabletid = models.CharField(max_length = 5)
    background_image_after_sweepstake_check = models.CharField(max_length = 5)
    background_image_after_sweepstake = models.ImageField(null= True, blank = True)
    survey1_check = models.CharField(max_length = 5)
    survey1_name = models.ForeignKey(Survey, related_name='survey1_name', on_delete=models.CASCADE, blank=True, null=True)
    survey2_check = models.CharField(max_length = 5)
    survey2_name = models.ForeignKey(Survey, related_name='survey2_name', on_delete=models.CASCADE, blank=True, null=True)
    border_hightlight_hex_color = models.CharField("Border/Highlight Hex Color", max_length=7)
    primary_hex_color = models.CharField("Primary Hex Color", max_length=7)
    prioritize_sweepstakes = models.CharField(max_length = 5)
    customer_checkin_frequency = models.CharField(max_length = 5)

    class Meta:
        verbose_name_plural = 'Sweepstakes'
    
    def __str__(self):
        return self.name

    @property
    def api(self):
        return f'/api/v1/sweepstakes/{self.id}/'
    @property
    def field(self):
        return 'name'

class Tablet(models.Model):
    name = models.CharField('Tablet ID', max_length=100)
    user_id = models.ForeignKey(SweepUser, on_delete=models.CASCADE, blank=True, null=True)
    address = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    sweep_ids = models.CharField(max_length = 100)
    active_sweep = models.CharField(max_length = 10)
    tablet_id_code = models.CharField(max_length = 100)
    password = models.CharField('Password', max_length = 100)
    confirm_password = models.CharField('Confirm Password', max_length = 100)
    login_status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'tablet'
    
    def __str__(self):
        return self.name

    @property
    def api(self):
        return f'/api/v1/tablet/{self.id}/'
    @property
    def field(self):
        return 'name'

class SweepCheckIn(models.Model):
    user_id = models.ForeignKey(SweepUser, on_delete=models.CASCADE, null=True)
    sweep_id = models.ForeignKey(Sweepstakes, on_delete=models.CASCADE, null=True)
    tablet_id = models.ForeignKey(Tablet, on_delete=models.CASCADE, null=True)
    check_time = models.DateTimeField()

    class Meta:
        verbose_name_plural = 'SweepCheckIn'

    @property
    def api(self):
        return f'/api/v1/sweepcheckin/{self.id}/'
    @property
    def field(self):
        return 'id'

class SweepWinner(models.Model):
    windate = models.DateTimeField()
    sweep_id = models.ForeignKey(Sweepstakes, on_delete=models.CASCADE, null=True)
    checkIn_id = models.ForeignKey(SweepCheckIn, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name_plural = 'SweepstakesWinner'

    @property
    def api(self):
        return f'/api/v1/sweepwinner/{self.id}/'
    @property
    def field(self):
        return 'id'
    