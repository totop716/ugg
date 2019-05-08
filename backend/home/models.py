from django.db import models

# Create your models here.

from django.db import models


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
    