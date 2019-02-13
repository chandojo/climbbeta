from django.db import models
from areas.models import City_Town

class Todays_Weather(models.Model):
    city = models.ForeignKey(City_Town, on_delete=models.PROTECT)
    date = models.IntegerField()
    main = models.CharField(max_length=100)
    temp = models.FloatField()
    max_temp = models.FloatField()
    min_temp = models.FloatField()
    humidity = models.IntegerField()
    pressure = models.IntegerField()
    wind_speed = models.FloatField()
    desc = models.CharField(max_length=100)
    icon = models.CharField(max_length=10)

class Weather_Forecast(models.Model):
    city = models.ForeignKey(City_Town, on_delete=models.PROTECT)
    daytime = models.DateTimeField()
    temp = models.FloatField()
    desc = models.CharField(max_length=100)
    icon = models.CharField(max_length=10)
