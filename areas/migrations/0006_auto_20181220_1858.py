# Generated by Django 2.1.3 on 2018-12-20 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('areas', '0005_auto_20181213_2026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city_town',
            name='latitude',
            field=models.FloatField(blank=True, default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='city_town',
            name='longitude',
            field=models.FloatField(blank=True, default=1),
            preserve_default=False,
        ),
    ]
