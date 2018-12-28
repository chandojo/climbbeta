import json

from ..keys import *


#requests_cache.install_cache('vimeo_cache', backend='sqlite', expire_after=600)
def read_youtube_data(self, **kwargs):
    youtube_response = 'api/google/youtube/response/' + str(self.city) + ' ' + str(self.city.state.abbrv) + '-youtube-response.json'

    with open(youtube_response, 'r') as read_file:
        data = json.load(read_file)

    return data
