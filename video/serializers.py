from rest_framework import serializers
from .models import *


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = ('uri', 'created', 'name', 'city', 'author', 'thumbnail', 'description', 'slug')
