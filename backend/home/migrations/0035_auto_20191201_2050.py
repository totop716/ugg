# Generated by Django 2.1.7 on 2019-12-02 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0034_auto_20191125_0646'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sweepstakes',
            name='header_font_size',
            field=models.IntegerField(verbose_name='Header Font Size'),
        ),
    ]
