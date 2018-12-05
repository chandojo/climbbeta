import requests

from django import forms
from django.shortcuts import render
from .models import City
from .forms import CityForm

def index(request):
    url = "http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&APPID=5f14a9e6503b7e9ccad869971588e4c5"
    form = CityForm()

    if request.method == "POST":
        form = CityForm(request.POST)
        if form.is_valid():
            form.save()
            form = CityForm()

    cities = City.objects.all()
    weather_data = []

    for city in cities:

        r = requests.get(url.format(city)).json()

        city_weather = {
            "city": city.name,
            "temperature": r['main']['temp'],
            "description": r['weather'][0]['description'],
            "icon": r['weather'][0]['icon'],
        }

        weather_data.append(city_weather)

    print(r)

    context = {'weather_data': weather_data, 'form':form}
    return render(request, 'weather/index.html', context)
