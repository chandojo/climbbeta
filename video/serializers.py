from rest_framework import serializers
from .models import *

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = ('name', 'author', 'thumbnail', 'embed', 'description', 'slug')
