# Generated by Django 2.1.9 on 2019-06-24 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('areas', '0005_auto_20190503_1722'),
    ]

    operations = [
        migrations.AddField(
            model_name='city_town',
            name='permit_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='city_town',
            name='permit_required',
            field=models.BooleanField(default=1),
            preserve_default=False,
        ),
    ]
