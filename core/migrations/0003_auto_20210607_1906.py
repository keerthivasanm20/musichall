# Generated by Django 3.1.7 on 2021-06-07 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20210607_1855'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='user',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]