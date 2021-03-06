# Generated by Django 2.1.7 on 2019-04-05 18:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('areas', '0003_auto_20190325_1821'),
    ]

    operations = [
        migrations.CreateModel(
            name='Videos',
            fields=[
                ('uri', models.CharField(max_length=10)),
                ('created', models.DateTimeField()),
                ('name', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('author', models.CharField(max_length=100)),
                ('thumbnail', models.URLField()),
                ('description', models.TextField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, null=True, unique=True)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='areas.City_Town')),
            ],
            options={
                'verbose_name_plural': 'Videos',
                'db_table': 'videos',
            },
        ),
    ]
