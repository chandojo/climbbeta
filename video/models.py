from django.db import models
from django.utils.text import slugify
from areas.models import City_Town

# Create your models here.
class Videos(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=100)
    thumbnail = models.URLField(max_length=200)
    embed = models.CharField(max_length=255)
    description = models.TextField()
    city = models.ForeignKey(City_Town, on_delete=models.PROTECT)
    slug = models.SlugField(blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.id)

    class Meta:
        db_table='videos'
