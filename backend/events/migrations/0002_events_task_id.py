# Generated by Django 3.0.8 on 2020-07-30 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='task_id',
            field=models.CharField(default='', max_length=50),
        ),
    ]
