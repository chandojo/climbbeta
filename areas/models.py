from django.db import models
from django.urls import reverse
from django.utils.text import slugify

from api.vimeo import *

from api.google.geolocator.requests import *

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
    longitude = models.FloatField(blank=True)
    latitude = models.FloatField(blank=True)
    timezone = models.CharField(max_length=200, blank=True, null=True)

    def get_lat(self, **kwargs):
        lat = get_latitude(self, **kwargs)
        return lat

    def get_long(self, **kwargs):
        long = get_longitude(self, **kwargs)
        return long

    def get_time(self, **kwargs):
        time = get_timezone(self, **kwargs)
        return time

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if not self.latitude:
            self.latitude = self.get_lat()
        if not self.longitude:
            self.longitude = self.get_long()
        if not self.timezone:
            self.timezone = self.get_time()

        super(City_Town, self).save(*args, **kwargs)

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
