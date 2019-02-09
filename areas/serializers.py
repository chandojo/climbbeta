from rest_framework import serializers
from .models import *

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('id','name', 'abbrv', 'slug', 'img')

class CityTownSerializer(serializers.ModelSerializer):
    class Meta:
        model = City_Town
        fields = ('id', 'name', 'state', 'slug', 'longitude', 'latitude', 'timezone')
