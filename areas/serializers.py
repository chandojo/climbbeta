from rest_framework import serializers
from .models import State

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('id','name', 'abbrv', 'slug', 'img')
