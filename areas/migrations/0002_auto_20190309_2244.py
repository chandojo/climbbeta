# Generated by Django 2.1.7 on 2019-03-09 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('areas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='state',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='state',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]
