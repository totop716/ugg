# Generated by Django 2.1.7 on 2019-05-30 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_tablet_state'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tablet',
            options={'verbose_name_plural': 'Tablets'},
        ),
        migrations.RemoveField(
            model_name='tablet',
            name='tablet_id',
        ),
        migrations.AddField(
            model_name='tablet',
            name='name',
            field=models.CharField(default='', max_length=100, verbose_name='Tablet ID'),
            preserve_default=False,
        ),
    ]
