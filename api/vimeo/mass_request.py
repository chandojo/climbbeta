# python manage.py shell

import json

from api.vimeo.keys import *
from areas.models import *

def get_all_city_videos(request):
cities = City_Town.objects.all()

for city in cities:
    get_city = str(city.name)
    q = get_city + ' bouldering | ' + get_city + ' ' + str(city.state.name) + ' bouldering'
    response = client.get(video_url.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()
    vimeo_response = 'api/vimeo/response/' + get_city + ' ' + str(city.state.abbrv) + '-vimeo-response.json'
    vimeo_results = []
    for video in response['data']:
        vimeo_video = {
            'name': video['name'],
            'author': video['user']['name'],
            'thumbnail': video['pictures']['sizes'][2]['link'],
            'embed': video['embed']['html'],
            'description': video['description']
        }
        vimeo_results.append(vimeo_video)
    with open(vimeo_response, 'w') as f:
        json.dump(vimeo_results, f)
