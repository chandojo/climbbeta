import requests
from .keys import *
from timezonefinder import TimezoneFinder

def get_latitude(self, **kwargs):
    q = str(self.name) + ', ' + str(self.state.abbrv)
    r = requests.get(map_url.format(q)).json()
    lat = r['results'][0]['geometry']['location']['lat']
    lat = float(lat)
    return lat

def get_longitude(self, **kwargs):
    q = str(self.name) + ', ' + str(self.state.abbrv)
    r = requests.get(map_url.format(q)).json()
    long = r['results'][0]['geometry']['location']['lng']
    long = float(long)
    return long

def get_timezone(self, **kwargs):
    tf = TimezoneFinder()
    timezone = tf.timezone_at(lng=self.longitude, lat=self.latitude)
    return timezone
