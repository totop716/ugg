# Generated by Django 2.1.7 on 2019-05-30 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customauth', '0007_auto_20190530_1156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='po_box_unit_number',
            field=models.CharField(max_length=50, verbose_name='PO Box(Unit Number)'),
        ),
    ]
