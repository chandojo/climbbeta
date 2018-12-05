import requests

from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView
from django.views import View
from django.http import HttpResponse
from django.template import loader
from areas.models import *
from api.weather import url

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
            r = requests.get(url.format(city)).json()

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

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['areas'] = self.get_queryset
        return context
