import datetime
import pytz
import requests

from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView
from django.template import loader
from areas.models import *
from api.vimeo.requests import *
from api.google.youtube.requests import *
from api.weather.requests import *
from api.google.geolocator.requests import *
from api.videos.request import *

# Create your views here.
def index(request):
    state_list = State.objects.all()

    template = 'areas/index.html'

    context = {'state_list':state_list}

    return render(request, template, context)

class State_View(ListView):
    template_name = 'areas/state.html'

    def get_queryset(self):
        self.state = get_object_or_404(State, slug=self.kwargs['slug'])
        return City_Town.objects.filter(state__name=self.state)

    def get_weather_data(self, **kwargs):
        self.cities = City_Town.objects.filter(state__name=self.state)
        kwargs = {'cities':self.cities}
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
        self.city = get_object_or_404(City_Town, slug=self.kwargs['slug'], state__slug=self.kwargs['state__slug'])
        return Area.objects.filter(city_town__name=self.city)

    def get_weather_data(self, **kwargs):
        kwargs = {'city':self.city}
        return get_city_weather_data(self, **kwargs)

    def get_forecast_data(self, **kwargs):
        kwargs = {'city':self.city}
        return get_city_forecast_data(self, **kwargs)

#    def read_weather_forecast(self, **kwargs):
#        kwargs = {'city':self.city}
#        return read_forecast_data(self, **kwargs)

    def vimeo_read_data(self, **kwargs):
        kwargs = {'city':self.city}
        return read_vimeo_data(self, **kwargs)

    def youtube_read_data(self, **kwargs):
        kwargs = {'city':self.city}
        return read_youtube_data(self, **kwargs)

    def read_all_videos(self, **kwargs):
        kwargs = {'city':self.city}
        return read_combined_video_data(self, **kwargs)

    def get_embed_map(self, **kwargs):
        kwargs = {'city':self.city}
        return embed_map(self, **kwargs)

    def get_time(self, **kwargs):
        dt = datetime.datetime.now()
        tz = pytz.timezone(self.city.timezone)
        local_dt = dt.astimezone(tz)
        return local_dt

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['city'] = self.city
        context['areas'] = self.get_queryset
        context['city_weather'] = self.get_weather_data
#        context['vimeo_videos'] = self.vimeo_read_data
#        context['youtube_videos'] = self.youtube_read_data
        context['videos'] = self.read_all_videos
        context['forecast'] = self.get_forecast_data
#        context['forecast'] = self.read_weather_forecast
        context['map'] = self.get_embed_map
        context['datetime'] = self.get_time
        return context
