# Generated by Django 2.1.7 on 2019-11-25 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0033_auto_20191124_0753'),
    ]

    operations = [
        migrations.AddField(
            model_name='sweepstakes',
            name='can_generate_winner_multiple_times',
            field=models.CharField(default='', max_length=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sweepstakes',
            name='generate_winner_for_each_tabletid',
            field=models.CharField(default='', max_length=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='sweepstakes',
            name='header_font_size',
            field=models.IntegerField(max_length=6, verbose_name='Header Font Size'),
        ),
    ]
