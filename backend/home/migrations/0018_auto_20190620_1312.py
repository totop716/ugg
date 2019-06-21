# Generated by Django 2.1.7 on 2019-06-20 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0017_auto_20190619_2157'),
    ]

    operations = [
        migrations.AddField(
            model_name='sweepuser',
            name='checkEmail',
            field=models.BooleanField(default=0, verbose_name='Email'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sweepuser',
            name='checkSMS',
            field=models.BooleanField(default=0, verbose_name='SMS'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='sweepstakes',
            name='fontsize',
            field=models.IntegerField(),
        ),
    ]