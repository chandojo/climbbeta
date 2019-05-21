from rest_framework import serializers
from .models import *


class StateSerializer(serializers.ModelSerializer):
    cities = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = State
        fields = ('id', 'name', 'cities', 'abbrv', 'slug', 'img')


class CityTownSerializer(serializers.ModelSerializer):
    state_name = serializers.ReadOnlyField(source='state.name')

    class Meta:
        model = City_Town
        fields = ('name', 'state', 'state_name', 'slug',
                  'longitude', 'latitude', 'timezone')
