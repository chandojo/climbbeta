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
        q = get_city + ' bouldering | ' + get_city + \
            ' ' + str(city.state.name) + ' bouldering'
        vimeo_response = client.get(video_url.format(
            q), params={"fields": "uri, name, description, embed, pictures, user"}, headers={"content-type": "application/json"}).json()
        youtube_response = requests.get(
            keys.youtube_search_url.format(q), headers={"content-type": "application/json"}).json()
        video_response = 'video/fixtures/' + today +
        no_space_city + '-' + str(city.state.abbrv) + '.json'
        video_results = []

        if vimeo_response.status_code == 200:
            for video in vimeo_response['data']:
                vimeo_video = {
                    'model': 'video.Videos',
                    'fields': {
                        'name': video['name'],
                        'city': get_city,
                        'author': video['user']['name'],
                        'thumbnail': video['pictures']['sizes'][2]['link'],
                        'embed': video['embed']['html'],
                        'description': video['description'],
                    }
                }
                video_results.append(vimeo_video)
        else:
            print("There has been an error with the Vimeo call")

        if youtube_response.status_code == 200:
            for video in youtube_response['items']:
                youtube_video = {
                    'model': 'video.Videos',
                    'fields': {
                        'name': video['snippet']['title'],
                        'city': get_city,
                        'author': video['snippet']['channelTitle'],
                        'thumbnail': video['snippet']['thumbnails']['medium']['url'],
                        'embed': video['id']['videoId'],
                        'description': video['snippet']['description'],
                    }
                }
                video_results.append(youtube_video)
        else:
            print("There has been an error with the YouTube call")

        with open(video_response, 'w') as f:
            json.dump(video_results, f)


def compile_videos():
    cities = City_Town.objects.all()
    today = str(date.today())
    compiled_file = 'video/fixtures/' + today + '.json'
    concat_videos = []

    for city in cities:
        get_city = str(city.name)
        no_space_city = get_city.replace(' ', '')
        video_response = 'video/fixtures/' + today +
        no_space_city + '-' + str(city.state.abbrv) + '.json'
        with open(video_response) as f:
            video_file = json.load(f)
            for video in video_file:
                concat_videos.append(video)

    with open(compiled_file, 'w') as f:
        json.dump(concat_videos, f)
