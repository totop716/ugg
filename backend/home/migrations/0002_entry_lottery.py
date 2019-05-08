# Generated by Django 2.1.7 on 2019-05-08 15:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Entries',
            },
        ),
        migrations.CreateModel(
            name='Lottery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Entry')),
            ],
            options={
                'verbose_name_plural': 'Lotteries',
            },
        ),
    ]
