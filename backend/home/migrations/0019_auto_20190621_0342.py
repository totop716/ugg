# Generated by Django 2.1.7 on 2019-06-21 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0018_auto_20190620_1312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sweepuser',
            name='email',
            field=models.EmailField(blank=True, max_length=255, verbose_name='email address'),
        ),
    ]
