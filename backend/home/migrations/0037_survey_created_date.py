# Generated by Django 2.1.7 on 2019-12-03 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0036_auto_20191202_2125'),
    ]

    operations = [
        migrations.AddField(
            model_name='survey',
            name='created_date',
            field=models.CharField(default='', max_length=100, verbose_name='Date Created'),
            preserve_default=False,
        ),
    ]