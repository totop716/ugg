# Generated by Django 2.1.7 on 2019-05-28 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customauth', '0004_auto_20190525_0312'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='active_sweep',
            field=models.CharField(default='', max_length=10),
            preserve_default=False,
        ),
    ]
