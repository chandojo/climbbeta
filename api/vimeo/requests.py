import json
import requests_cache

from .keys import *

requests_cache.install_cache('vimeo_cache', backend='sqlite', expire_after=600)

# def get_video_data(self, **kwargs):
#     get_city = str(self.city)
#
#     q = get_city + ' bouldering | ' + get_city + ' ' + str(self.city.state.name) + ' bouldering'
#     response = client.get(video_url.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()
#
#     vimeo_response = 'api/vimeo/response/' + get_city + ' ' + str(self.city.state.abbrv) + '-vimeo-response.json'
#
#     with open(vimeo_response, 'w') as f:
#         json.dump(response, f)
#
#     beta_videos = []
#
#     for i in range(len(response['data'])):
#         video_data = {
#             'uri':response['data'][i]['uri'],
#             'name':response['data'][i]['name'],
#             'user':response['data'][i]['user']['name'],
#             'description':response['data'][i]['description'],
#             'embed':response['data'][i]['embed']['html'],
#             'picture':response['data'][i]['pictures']['sizes'][2]['link'],
#         }
#         beta_videos.append(video_data)
#
#     print(q)
#     return beta_videos


def read_video_data(self, **kwargs):
    vimeo_response = 'api/vimeo/response/' + str(self.city) + ' ' + str(self.city.state.abbrv) + '-vimeo-response.json'

    with open(vimeo_response, 'r') as read_file:
        data = json.load(read_file)

    return data


#    beta_videos = []
#
#    for i in range(len(data['data'])):
#        video_data = {
#            'uri':data['data'][i]['uri'],
#            'name':data['data'][i]['name'],
#            'user':data['data'][i]['user']['name'],
#            'description':data['data'][i]['description'],
#            'embed':data['data'][i]['embed']['html'],
#            'picture':data['data'][i]['pictures']['sizes'][2]['link'],
#        }
#        beta_videos.append(video_data)
#
#    return beta_videos
