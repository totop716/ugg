# Generated by Django 2.1.7 on 2019-11-22 05:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0029_auto_20191121_2341'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='survey',
            name='question_type',
        ),
    ]
