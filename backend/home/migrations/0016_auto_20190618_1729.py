# Generated by Django 2.1.7 on 2019-06-18 17:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_auto_20190617_1902'),
    ]

    operations = [
        migrations.CreateModel(
            name='SweepCheckIn',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('check_time', models.CharField(max_length=200)),
                ('sweep_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='home.Sweepstakes')),
                ('tablet_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='home.Tablet')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='home.SweepUser')),
            ],
            options={
                'verbose_name_plural': 'SweepCheckIn',
            },
        ),
        migrations.RemoveField(
            model_name='sweepwinner',
            name='tablet_id',
        ),
        migrations.AlterField(
            model_name='sweepwinner',
            name='sweep_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='home.Sweepstakes'),
        ),
        migrations.AddField(
            model_name='sweepwinner',
            name='checkIn_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='home.SweepCheckIn'),
        ),
    ]
