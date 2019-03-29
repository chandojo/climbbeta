# Generated by Django 2.1.7 on 2019-03-17 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City_Town',
            fields=[
                ('name', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('longitude', models.FloatField(blank=True)),
                ('latitude', models.FloatField(blank=True)),
                ('timezone', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('abbrv', models.CharField(max_length=2)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('img', models.ImageField(blank=True, null=True, upload_to='areas/media/')),
            ],
        ),
        migrations.AddField(
            model_name='city_town',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='cities', to='areas.State'),
        ),
    ]
