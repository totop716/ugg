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
    user_id = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True)
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
    