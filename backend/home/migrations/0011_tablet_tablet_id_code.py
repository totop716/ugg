# Generated by Django 2.1.7 on 2019-06-13 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_auto_20190610_1841'),
    ]

    operations = [
        migrations.AddField(
            model_name='tablet',
            name='tablet_id_code',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]