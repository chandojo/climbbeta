# Generated by Django 2.1.9 on 2019-06-24 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('areas', '0007_auto_20190624_1750'),
    ]

    operations = [
        migrations.AddField(
            model_name='city_town',
            name='busted',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='city_town',
            name='camping',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='city_town',
            name='nearby_food',
            field=models.BooleanField(default=False),
        ),
    ]
