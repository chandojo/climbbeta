import datetime
import json
import pytz
import requests
import requests_cache


from .keys import *

requests_cache.install_cache(
    'weather_cache', backend='sqlite', expire_after=30)


def get_city_weather_data(self, **kwargs):
    r = requests.get(weather_url.format(self.city)).json()

    city_weather = {
        "main": r['weather'][0]['main'],
        "temperature": r['main']['temp'],
        "max_temp": r['main']['temp_max'],
        "min_temp": r['main']['temp_min'],
        "humidity": r['main']['humidity'],
        "pressure": r['main']['pressure'],
        "wind": r['wind']['speed'],
        "description": r['weather'][0]['description'],
        "icon": r['weather'][0]['icon'],
        "date": r['dt'],
    }
    return city_weather


def get_city_forecast_data(self, **kwargs):
    r = requests.get(forecast_url.format(self.city)).json()

    forecast_data = []

    for day in r['list']:
        daytime = day['dt']
        utc = datetime.datetime.utcfromtimestamp(daytime)
        tz = pytz.timezone(self.city.timezone)
        time = utc.astimezone(tz)

        day_weather = {
            "dt": str(time),
            "temp": day['main']['temp'],
            "desc": day['weather'][0]['description'],
            "icon": day['weather'][0]['icon'],
        }

        forecast_data.append(day_weather)

    data = {}

    for i in range(len(forecast_data)):
        idt = forecast_data[i]['dt']
        key = idt[:10]
        if not data.get(key):
            data.update({key: []})
        data[key].append(forecast_data[i])

    return data


def get_list_weather_data(self, **kwargs):
    weather_data = []

    for city in self.cities:
        r = requests.get(weather_url.format(city)).json()

        city_weather = {
            "city": city.name,
            "temperature": r['main']['temp'],
            "description": r['weather'][0]['description'],
            "icon": r['weather'][0]['icon'],
        }

        weather_data.append(city_weather)
    return weather_data
