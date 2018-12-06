import datetime
import requests
import vimeo

from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView
from django.template import loader
from areas.models import *
from api import weather
from api import vimeo

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
        cities = City_Town.objects.filter(state__name=self.state)
        self.weather_data = []

        for city in cities:
            r = requests.get(weather.url.format(city)).json()

            city_weather = {
                "city": city.name,
                "temperature": r['main']['temp'],
                "description": r['weather'][0]['description'],
                "icon": r['weather'][0]['icon'],
            }

            self.weather_data.append(city_weather)
        return self.weather_data

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

    def get_videos(self):
        q = str(self.city) + ' bouldering'
        response = vimeo.client.get(vimeo.video_uri.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()

        self.beta_videos = []

        for i in range(len(response['data'])):
            video_data = {
                'uri':response['data'][i]['uri'],
                'name':response['data'][i]['name'],
                'user':response['data'][i]['user']['name'],
                'description':response['data'][i]['description'],
                'embed':response['data'][i]['embed']['html'],
                'picture':response['data'][i]['pictures']['sizes'][2]['link'],
            }

            self.beta_videos.append(video_data)

        return self.beta_videos

    def get_weather_data(self, **kwargs):
        r = requests.get(weather.url.format(self.city)).json()

        self.city_weather = {
            "temperature": r['main']['temp'],
            "description": r['weather'][0]['description'],
            "icon": r['weather'][0]['icon'],
            "date": r['dt'],
        }

        return self.city_weather

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['city'] = self.city
        context['areas'] = self.get_queryset
        context['videos'] = self.get_videos
        context['city_weather'] = self.get_weather_data
        return context

#class Area_View(ListView):
#    template_name = 'areas/area.html'
#
#    def get_queryset(self):
#        self.area = get_object_or_404(Area, slug=self.kwargs['slug'], city_town__slug=self.kwargs['city_town__slug'],state__slug=self.kwargs['state__slug'])
#        return Boulder_Wall.objects.filter(area__name=self.area)
#
#    def get_videos(self):
#        response = vimeo.client.get(vimeo.video_uri.format(self.area), params={"fields": "uri, name, description, embed, pictures, user" }).json()
#
#        self.beta_videos = []
#
#        for i in range(0, len(response['data'])):
#            video_data = {
#                'uri':response['data'][i]['uri'],
#                'name':response['data'][i]['name'],
#                'user':response['data'][i]['user']['name'],
#                'description':response['data'][i]['description'],
#                'embed':response['data'][i]['embed']['html'],
#                'picture':response['data'][i]['pictures']['sizes'][2]['link'],
#            }
#
#            beta_videos.append(video_data)
#
#        return self.beta_videos
#
#    def get_context_data(self, **kwargs):
#        context = super().get_context_data(**kwargs)
#        context['area'] = self.area
#        context['boulders'] = self.get_queryset
#        context['videos'] = self.get_videos
#        return context
