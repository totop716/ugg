from django.db import models

# Create your models here.

from django.db import models
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

class SweepUser(models.Model):
    first_name = models.CharField("First Name", max_length =50)
    last_name = models.CharField("Last Name", max_length =50)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        blank=True
    )
    address = models.CharField(max_length =200)
    city = models.CharField(max_length =50)
    state = models.CharField(max_length =50)
    zipcode = models.CharField(max_length =50)
    phone = models.CharField(max_length =50, unique=True, help_text="Please input Phone No in this format ( ex: 12345667889 or 2345678890)")
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    check_time = models.CharField(max_length =200)
    po_box_unit_number = models.CharField("PO Box/Unit Number", max_length =50, blank=True)
    suite = models.CharField(max_length =50, blank=True)
    label = models.CharField(max_length = 100, default="Added by Admin")
    password = models.CharField(max_length = 100, blank=True)

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
    startdate = models.DateTimeField()
    enddate = models.DateTimeField()
    logo = models.ImageField()
    background = models.ImageField()
    disclaimer = models.TextField()
    current = models.BooleanField()

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
    user_id = models.ForeignKey(SweepUser, on_delete=models.CASCADE, blank=True)
    address = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    sweep_ids = models.CharField(max_length = 100)
    active_sweep = models.CharField(max_length = 10)

    class Meta:
        verbose_name_plural = 'Tablets'
    
    def __str__(self):
        return self.name

    @property
    def api(self):
        return f'/api/v1/sweepstakes/{self.id}/'
    @property
    def field(self):
        return 'name'

class SweepWinner(models.Model):
    windate = models.CharField(max_length=100)
    sweep_id = models.ForeignKey(Sweepstakes, on_delete=models.CASCADE)
    tablet_id = models.ForeignKey(Tablet, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'SweepstakesWinner'
    
    def __str__(self):
        return self.windate

    @property
    def api(self):
        return f'/api/v1/sweepwinner/{self.id}/'
    @property
    def field(self):
        return 'id'
    