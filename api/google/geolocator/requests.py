import requests
from .. import keys
from timezonefinder import TimezoneFinder

def get_latitude(self, **kwargs):
    q = str(self.name) + ', ' + str(self.state.abbrv)
    r = requests.get(keys.map_url.format(q)).json()
    lat = r['results'][0]['geometry']['location']['lat']
    lat = float(lat)
    return lat

def get_longitude(self, **kwargs):
    q = str(self.name) + ', ' + str(self.state.abbrv)
    r = requests.get(keys.map_url.format(q)).json()
    long = r['results'][0]['geometry']['location']['lng']
    long = float(long)
    return long

def get_timezone(self, **kwargs):
    tf = TimezoneFinder()
    timezone = tf.timezone_at(lng=self.longitude, lat=self.latitude)
    return timezone

def embed_map(self, **kwargs):
    link = "https://www.google.com/maps/embed/v1/place?q=" + str(self.city) + ",+" + str(self.city.state.abbrv) + "&key=" + keys.api_key
    map_iframe = '<iframe width="100%" height="450" frameborder="0" style="border:0" src="' + link + '"allowfullscreen></iframe>'

    return map_iframe
