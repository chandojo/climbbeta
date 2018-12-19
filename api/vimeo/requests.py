import requests_cache
import json

from .keys import *

requests_cache.install_cache('vimeo_cache', backend='sqlite', expire_after=600)

def get_video_data(self, **kwargs):
    get_city = str(self.city)

    q = get_city + ' ' + str(self.city.state.name) + ' bouldering'
    response = client.get(video_url.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()

    vimeo_response = 'api/vimeo/response/' + get_city + ' ' + str(self.city.state.abbrv) + '-vimeo-response.json'

    with open(vimeo_response, 'w') as f:
        json.dump(response, f)

def read_video_data(self, **kwargs):
    vimeo_response = 'api/vimeo/response/' + str(self.city) + ' ' + str(self.city.state.abbrv) + '-vimeo-response.json'

    with open(vimeo_response, 'r') as read_file:
        data = json.load(read_file)

    beta_videos = []

    for i in range(len(data['data'])):
        video_data = {
            'uri':data['data'][i]['uri'],
            'name':data['data'][i]['name'],
            'user':data['data'][i]['user']['name'],
            'description':data['data'][i]['description'],
            'embed':data['data'][i]['embed']['html'],
            'picture':data['data'][i]['pictures']['sizes'][2]['link'],
        }
        beta_videos.append(video_data)

    return beta_videos
