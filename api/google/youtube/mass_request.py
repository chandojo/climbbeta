import json
import requests

from api.google.keys import *
from areas.models import *

#python manage.py shell
def get_youtube_videos(request):
    cities = City_Town.objects.all()

    for city in cities:
        get_city = str(city.name)
        q = get_city + ' bouldering | ' + get_city + ' ' + str(city.state.name) + ' bouldering'
        response = requests.get(keys.youtube_search_url.format(q)).json()
        youtube_response = 'api/google/youtube/response/' + get_city + ' ' + str(city.state.abbrv) + '-youtube-response.json'
        youtube_results = []
        for video in response['items']:
            youtube_video = {
                'name': video['snippet']['title'],
                'author': video['snippet']['channelTitle'],
                'thumbnail': video['snippet']['thumbnails']['medium']['url'],
                'embed': video['id']['videoId'],
                'description': video['snippet']['description']
            }
            youtube_results.append(youtube_video)
        with open(youtube_response, 'w') as f:
            json.dump(youtube_results, f)
