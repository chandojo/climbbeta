from django.db import models
from django.urls import reverse
from django.utils.text import slugify

from geopy.geocoders import Nominatim
#from climbs.models import Problem

class State(models.Model):
    name = models.CharField(max_length=200)
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
    longitude = models.BigIntegerField(blank=True, null=True)
    latitude = models.BigIntegerField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)

            geolocator = Nominatim(user_agent="climbbeta")
            location = geolocator.geocode(self.name + ", " + self.state.name)

            self.longitude = location.longitude

            self.latitude = location.latitude

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
