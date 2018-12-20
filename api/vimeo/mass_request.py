import json

from .keys import *
from areas.models import *

def get_all_city_videos(request):
    cities = City_Town.objects.all()

    for city in cities:
        get_city = str(city.name)
        q = get_city + ' bouldering | ' + get_city + ' ' + str(city.state.name) + ' bouldering'
        response = client.get(video_url.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()
        vimeo_response = 'api/vimeo/response/' + get_city + ' ' + str(city.state.abbrv) + '-vimeo-response.json'

        with open(vimeo_response, 'w') as f:
            json.dump(response, f)
