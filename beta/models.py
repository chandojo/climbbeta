from django.db import models

from areas.models import Area, State

# Create your models here.
class Beta_Video(models.Model):
    name = models.CharField(max_length=255)
    video = models.URLField()
    area = models.ForeignKey(Area, on_delete=models.PROTECT)

    def __str__(self):
        return self.name
