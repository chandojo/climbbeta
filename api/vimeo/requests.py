import requests_cache
import json

from .keys import *

requests_cache.install_cache('vimeo_cache', backend='sqlite', expire_after=600)

def get_video_data(self, **kwargs):
    q = str(self.city) + ' ' + str(self.city.state.name) + ' bouldering'
    response = client.get(video_url.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()
    vimeo_response = 'api/vimeo/' + str(self.city) + '-vimeo-response.json'

    with open(vimeo_response, 'w') as f:
        json.dump(response, f)

    beta_videos = []

    for i in range(len(response['data'])):
        video_data = {
            'uri':response['data'][i]['uri'],
            'name':response['data'][i]['name'],
            'user':response['data'][i]['user']['name'],
            'description':response['data'][i]['description'],
            'embed':response['data'][i]['embed']['html'],
            'picture':response['data'][i]['pictures']['sizes'][2]['link'],
        }
        beta_videos.append(video_data)

    return beta_videos
