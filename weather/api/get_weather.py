import datetime
import json
import pytz
import requests

from weather.api.keys import *
from areas.models import City_Town

def get_todays_weather():
    today = str(datetime.date.today())
    cities = City_Town.objects.all()
    daily_weather = []
    weather_response = 'weather/fixtures/daily-weather-' + today + '.json'

    for city in cities:
        get_city = str(city.name)
        r = requests.get(weather_url.format(get_city)).json()
        day = r['dt']
        utc = datetime.datetime.utcfromtimestamp(day)
        tz = pytz.timezone(city.timezone)
        date = utc.astimezone(tz)

        city_weather = {
            "model": "weather.Todays_Weather",
            "fields": {
                "city": city.name,
                "date": str(date),
                "main": r['weather'][0]['main'],
                "temp": r['main']['temp'],
                "max_temp": r['main']['temp_max'],
                "min_temp": r['main']['temp_min'],
                "humidity": r['main']['humidity'],
                "pressure": r['main']['pressure'],
                "wind_speed": r['wind']['speed'],
                "desc": r['weather'][0]['description'],
                "icon": r['weather'][0]['icon'],
            }
        }
        daily_weather.append(city_weather)

        with open(weather_response, 'w') as f:
            json.dump(daily_weather, f)


def get_forecast_data():
    today = str(datetime.date.today())
    cities = City_Town.objects.all()
    forecast_weather = []
    data = {}
    forecast_response = 'weather/fixtures/week-forecast-' + today + '.json'

    for city in cities:
        get_city = str(city.name)
        r = requests.get(forecast_url.format(get_city)).json()
        for day in r['list']:
            daytime = day['dt']
            utc = datetime.datetime.utcfromtimestamp(daytime)
            tz = pytz.timezone(city.timezone)
            time = utc.astimezone(tz)
            day_weather = {
                "model": "weather.Weather_Forecast",
                "fields": {
                    "city": city.name,
                    "daytime": str(time),
                    "temp": day['main']['temp'],
                    "desc": day['weather'][0]['description'],
                    "icon": day['weather'][0]['icon'],
                    }
            }
            forecast_weather.append(day_weather)
#    for i in range(len(forecast_weather)):
#        idt = forecast_weather[i]['fields']['daytime']
#        key = idt[:10]
#        if not data.get(key):
#            data.update({key:[]})
#        data[key].append(forecast_weather[i])

    with open(forecast_response, 'w') as f:
        json.dump(forecast_weather, f)
