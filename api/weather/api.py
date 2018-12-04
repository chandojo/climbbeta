#import requests
#from areas.models import *
#
#def cityWeather(request, **kwargs):
url = "http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&APPID=5f14a9e6503b7e9ccad869971588e4c5"
#
#    cities = City_Town.objects.filter(state__name=self.state)
#    weather_data = []
#
#    for city in cities:
#        r = requests.get(url.format(city)).json()
#
#        city_weather = {
#            "city": city.name,
#            "temperature": r['main']['temp'],
#            "description": r['weather'][0]['description'],
#            "icon": r['weather'][0]['icon'],
#        }
#
#        weather_data.append(city_weather)
#
#    print(weather_data)
#    context = {'weather_data':weather_data}
#
#    return(request, context)
