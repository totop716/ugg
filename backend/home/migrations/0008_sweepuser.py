# Generated by Django 2.1.7 on 2019-06-04 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_auto_20190531_1432'),
    ]

    operations = [
        migrations.CreateModel(
            name='SweepUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50, verbose_name='First Name')),
                ('last_name', models.CharField(max_length=50, verbose_name='Last Name')),
                ('email', models.EmailField(blank=True, max_length=255, unique=True, verbose_name='email address')),
                ('address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=50)),
                ('zipcode', models.CharField(max_length=50)),
                ('phone', models.CharField(help_text='Please input Phone No in this format ( ex: 12345667889 or 2345678890)', max_length=50, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('check_time', models.CharField(max_length=200)),
                ('po_box_unit_number', models.CharField(max_length=50, verbose_name='PO Box/Unit Number')),
                ('suite', models.CharField(max_length=50)),
                ('label', models.CharField(default='Added by Admin', max_length=100)),
                ('password', models.CharField(blank=True, default='', max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Users',
            },
        ),
    ]
