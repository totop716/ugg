# Generated by Django 2.1.7 on 2019-05-23 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customauth', '0002_auto_20190522_0917'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='po_box',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='myuser',
            name='suite',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='myuser',
            name='unit_number',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
