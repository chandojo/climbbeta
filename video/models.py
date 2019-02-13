from django.db import models
from django.utils.text import slugify
from areas.models import City_Town

# Create your models here.
class Videos(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    author = models.CharField(max_length=100)
    thumbnail = models.URLField(max_length=200)
    embed = models.TextField()
    description = models.TextField()
    slug = models.SlugField(blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Videos, self).save(*args, **kwargs)

    class Meta:
        db_table='videos'
        verbose_name_plural = 'Videos'

    def __str__(self):
        return self.name
