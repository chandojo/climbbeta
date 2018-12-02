import requests

def locationWeather(request):
    url = "http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&APPID=5f14a9e6503b7e9ccad869971588e4c5"

    city = 'Gold Bar'

    r = requests.get(url.format(city)).json()

    city_weather = {
        "city": city.name,
        "temperature": r['main']['temp'],
        "description": r['weather'][0]['description'],
        "icon": r['weather'][0]['icon'],
    }

    context = {'city_weather':city_weather}

    return(request, context)
