# Generated by Django 2.1.7 on 2019-05-03 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0002_auto_20190405_1831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videos',
            name='uri',
            field=models.CharField(max_length=255),
        ),
    ]
