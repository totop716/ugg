# Generated by Django 2.1.7 on 2019-06-04 13:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_sweepuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tablet',
            name='user_id',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='home.SweepUser'),
        ),
    ]
