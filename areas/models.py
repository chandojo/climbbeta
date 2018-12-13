from django.db import models
from django.urls import reverse
from django.utils.text import slugify

from api.geolocator.requests import *
#from climbs.models import Problem
#from geopy.geocoders import Nominatim
#from timezonefinder import TimezoneFinder

class State(models.Model):
    name = models.CharField(max_length=200)
    abbrv = models.CharField(max_length=2)
    slug = models.SlugField(blank=True, unique=True)
    img = models.ImageField(blank=True, null=True, upload_to='areas/media/')

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(State, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('states', kwargs={'slug':self.slug})

    def __str__(self):
        return self.name

class City_Town(models.Model):
    name = models.CharField(max_length=200)
    state = models.ForeignKey(State, on_delete=models.PROTECT)
    slug = models.SlugField(blank=True, unique=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    timezone = models.CharField(max_length=200, blank=True, null=True)

    def get_long(self, **kwargs):
        kwargs = {'city':self.name, 'state':self.state}
        lat = get_location(self, **kwargs)
        self.latitude = lat['geo_data']['lat']
        return self.latitude

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
            self.latitude = self.get_long()
        super(City_Town, self).save(*args, **kwargs)

#    def save_longitude(self, *args, **kwargs):
#        if not self.longitude:
#            kwargs = {'city':self.name}
#            self.longitude = get_longitude(self, **kwargs)


    def get_absolute_url(self):
        return reverse('cities', kwargs={'slug':self.slug, 'state_slug':self.state.slug })

    def __str__(self):
        return self.name

class Area(models.Model):
    name = models.CharField(max_length=200)
    city_town = models.ForeignKey(City_Town, on_delete=models.PROTECT)
    slug = models.SlugField(blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Area, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class Boulder_Wall(models.Model):
    name = models.CharField(max_length=200)
    area = models.ForeignKey(Area, on_delete=models.PROTECT)
    slug = models.SlugField(blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Boulder_Wall, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
