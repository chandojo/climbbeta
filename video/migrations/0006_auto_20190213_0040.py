# Generated by Django 2.0.6 on 2019-02-13 00:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0005_auto_20190213_0002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videos',
            name='city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='areas.City_Town'),
        ),
        migrations.AlterField(
            model_name='videos',
            name='embed',
            field=models.TextField(),
        ),
    ]
