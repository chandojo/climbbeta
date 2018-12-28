import json
#import requests_cache

from .keys import *


#requests_cache.install_cache('vimeo_cache', backend='sqlite', expire_after=600)
def read_vimeo_data(self, **kwargs):
    vimeo_response = 'api/vimeo/response/' + str(self.city) + ' ' + str(self.city.state.abbrv) + '-vimeo-response.json'

    with open(vimeo_response, 'r') as read_file:
        data = json.load(read_file)

    return data
