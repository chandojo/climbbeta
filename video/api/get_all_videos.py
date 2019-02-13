# python manage.py shell

import json
import requests

from datetime import date
from video.api.keys import *
from areas.models import *

def get_all_city_videos():
    cities = City_Town.objects.all()
    today = str(date.today())
    for city in cities:
        get_city = str(city.name)
        no_space_city = get_city.replace(' ', '')
        q = get_city + ' bouldering | ' + get_city + ' ' + str(city.state.name) + ' bouldering'
        vimeo_response = client.get(video_url.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()
        youtube_response = requests.get(keys.youtube_search_url.format(q)).json()
        video_response = 'video/fixtures/' + today + no_space_city + '-' + str(city.state.abbrv) + '.json'
        video_results = []

        for video in vimeo_response['data']:
            vimeo_video = {
                'model': 'video.Videos',
                'fields': {
                    'name': video['name'],
                    'author': video['user']['name'],
                    'thumbnail': video['pictures']['sizes'][2]['link'],
                    'embed': video['embed']['html'],
                    'description': video['description'],
                }
            }
            video_results.append(vimeo_video)
        for video in youtube_response['items']:
            youtube_video = {
                'model': 'video.Videos',
                'fields': {
                    'name': video['snippet']['title'],
                    'author': video['snippet']['channelTitle'],
                    'thumbnail': video['snippet']['thumbnails']['medium']['url'],
                    'embed': video['id']['videoId'],
                    'description': video['snippet']['description'],
                }
            }
            video_results.append(youtube_video)
        with open(video_response, 'w') as f:
            json.dump(video_results, f)

def compile_videos():
    cities = City_Town.objects.all()
    today = str(date.today())

    for city in cities:
        compiled_file = 'video/fixtures/' + today + '.json'
        get_city = str(city.name)
        no_space_city = get_city.replace(' ', '')
        video_response = 'video/fixtures/' + today + no_space_city + '-' + str(city.state.abbrv) + '.json'
        concat_videos = []
        with open(video_response) as f:
            video_file = json.load(f)
            for video in video_file:
                concat_videos.append(video)
        with open(compiled_file, 'w') as f:
            json.dump(concat_videos, f)
