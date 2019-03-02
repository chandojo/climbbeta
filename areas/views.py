import datetime
import pytz
import requests

from rest_framework import viewsets
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView
from django.template import loader
from django.db.models import Q
from areas.models import *
from api.google.geolocator.requests import *

from weather.api.get_weather import *
from video.models import Videos


def index(request):
    state_list = State.objects.all()
    template = 'areas/index.html'
    context = {'state_list': state_list}
    return render(request, template, context)


class API_State_View(viewsets.ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer


class API_CityTown_View(viewsets.ModelViewSet):
    queryset = City_Town.objects.all()
    serializer_class = CityTownSerializer
#    filter_backends = (DjangoFilterBackend,)
#    filterset_fields = ('state',)


class State_View(ListView):
    template_name = 'areas/state.html'

    def get_queryset(self):
        self.state = get_object_or_404(State, slug=self.kwargs['slug'])
        return City_Town.objects.filter(state__name=self.state)

    def get_weather_data(self, **kwargs):
        self.cities = City_Town.objects.filter(state__name=self.state)
        kwargs = {'cities': self.cities}
        return get_list_weather_data(self, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['state'] = self.state
        context['cities'] = self.get_queryset
        context['weather_data'] = self.get_weather_data
        return context


class City_View(ListView):
    template_name = 'areas/city.html'

    def get_queryset(self):
        self.city = get_object_or_404(
            City_Town, slug=self.kwargs['slug'], state__slug=self.kwargs['state__slug'])
        return self.city

    def get_videos(self):
        city_name = str(self.city.name)
        self.videos = Videos.objects.filter(
            Q(name__contains=city_name) | Q(description__contains=city_name))
        print(len(self.videos))
        return self.videos

    def get_weather_data(self, **kwargs):
        kwargs = {'city': self.city}
        return get_city_weather_data(self, **kwargs)

    def get_forecast_data(self, **kwargs):
        kwargs = {'city': self.city}
        return get_city_forecast_data(self, **kwargs)

    def get_embed_map(self, **kwargs):
        kwargs = {'city': self.city}
        return embed_map(self, **kwargs)

    def get_time(self, **kwargs):
        dt = datetime.datetime.now()
        tz = pytz.timezone(self.city.timezone)
        local_dt = dt.astimezone(tz)
        return local_dt

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['city'] = self.city
        context['city_weather'] = self.get_weather_data
        context['videos'] = self.get_videos
        context['forecast'] = self.get_forecast_data
        context['map'] = self.get_embed_map
        context['datetime'] = self.get_time
        return context
