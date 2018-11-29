from django.contrib.auth.models import User
from django.db import models

class Member(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=50)
