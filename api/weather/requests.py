import requests
from .keys import *

def get_city_weather_data(self, **kwargs):
    r = requests.get(weather_uri.format(self.city)).json()

    city_weather = {
        "long": r['coord']['lon'],
        "lat": r['coord']['lat'],
        "temperature": r['main']['temp'],
        "humidity": r['main']['humidity'],
        "description": r['weather'][0]['description'],
        "icon": r['weather'][0]['icon'],
        "date": r['dt'],
    }

    return city_weather

def get_list_weather_data(self, **kwargs):
    weather_data = []

    for city in self.cities:
        r = requests.get(weather_uri.format(city)).json()

        city_weather = {
            "city": city.name,
            "temperature": r['main']['temp'],
            "description": r['weather'][0]['description'],
            "icon": r['weather'][0]['icon'],
        }

        weather_data.append(city_weather)
    return weather_data
