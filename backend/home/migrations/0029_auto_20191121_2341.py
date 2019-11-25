# Generated by Django 2.1.7 on 2019-11-22 05:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0028_survey_question_count'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='survey',
            options={'verbose_name_plural': 'survey'},
        ),
        migrations.AddField(
            model_name='survey',
            name='question_type',
            field=models.CharField(default=django.utils.timezone.now, max_length=100, verbose_name='Question'),
            preserve_default=False,
        ),
    ]