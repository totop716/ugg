# Generated by Django 2.1.7 on 2019-06-13 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_tablet_tablet_id_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tablet',
            name='user_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.SweepUser'),
        ),
    ]
